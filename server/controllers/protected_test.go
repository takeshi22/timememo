package controllers

import (
	"timememo/models"
	"encoding/json"
	"log"
	"net/http"
	"net/http/httptest"
	"testing"

	"github.com/gin-gonic/gin"
	"github.com/stretchr/testify/assert"
)

func TestProfile(t *testing.T) {
	var profile models.User

	err := models.InitDatabase()
	assert.NoError(t, err)

	models.Db.AutoMigrate(&models.User{})

	user := models.User{
		Email: "jwt@email.com",
		Password: "secret",
		Name: "test user",
	}

	err = user.EncryptPassword(user.Password)
	assert.NoError(t, err)

	err = user.CreateUser()
	assert.NoError(t, err)

	request, err := http.NewRequest("GET", "/api/protected/profile", nil)
	assert.NoError(t, err)

	w := httptest.NewRecorder()

	c, _ := gin.CreateTestContext(w)
	c.Request = request

	c.Set("email", "jwt@email.com")

	Profile(c)

	err = json.Unmarshal(w.Body.Bytes(), &profile)
	assert.NoError(t, err)

	assert.Equal(t, 200, w.Code)

	log.Println(profile)

	assert.Equal(t, user.Email, profile.Email)
	assert.Equal(t, user.Name, profile.Name)
}

func TestProfileNoFound(t *testing.T) {
	var profile models.User

	err := models.InitDatabase()
	assert.NoError(t, err)

	request, err := http.NewRequest("GET", "/api/protected/profile", nil)
	assert.NoError(t, err)

	w := httptest.NewRecorder()

	c, _ := gin.CreateTestContext(w)
	c.Request = request

	c.Set("email", "not@email.com")

	Profile(c)

	err = json.Unmarshal(w.Body.Bytes(), &profile)
	assert.NoError(t, err)

	assert.Equal(t, 404, w.Code)
	models.Db.Unscoped().Where("email = ?", "jwt@email.com").Delete(&models.User{})
}