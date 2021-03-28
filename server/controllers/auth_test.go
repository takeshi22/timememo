package controllers

import (
	"timememo/models"
	"bytes"
	"encoding/json"
	"net/http"
	"net/http/httptest"
	"testing"

	"github.com/gin-gonic/gin"
	"github.com/stretchr/testify/assert"
)

func TestSignUp(t *testing.T) {
	var actualResult models.User

	user := models.User{
		Name: "Test User",
		Email: "test@email.com",
		Password: "secret",
	}

	payload, err := json.Marshal(&user)
	assert.NoError(t, err)

	request, err := http.NewRequest("POST", "/api/controllers/signup", bytes.NewBuffer(payload))

	w := httptest.NewRecorder()

	c, _ := gin.CreateTestContext(w)
	c.Request = request

	err = models.InitDatabase()
	assert.NoError(t, err)

	models.Db.AutoMigrate(&models.User{})

	Signup(c)

	assert.Equal(t, 200, w.Code)

	err = json.Unmarshal(w.Body.Bytes(), &actualResult)
	assert.NoError(t, err)

	assert.Equal(t, user.Name, actualResult.Name)
	assert.Equal(t, user.Email, actualResult.Email)
}

func TestSignUpInvalidJSON(t *testing.T) {
	user := "test"

	payload, err := json.Marshal(&user)
	assert.NoError(t, err)

	request, err := http.NewRequest("POST", "/api/controllers/signup", bytes.NewBuffer(payload))
	assert.NoError(t, err)

	w := httptest.NewRecorder()

	c, _ := gin.CreateTestContext(w)
	c.Request = request

	Signup(c)

	assert.Equal(t, 400, w.Code)
}

func TestLogin(t *testing.T) {
	user := LoginPayload{
		Email: "test@email.com",
		Password: "secret",
	}

	payload, err := json.Marshal(&user)
	assert.NoError(t, err)

	request, err := http.NewRequest("POST", "/api/controllers/login", bytes.NewBuffer(payload))
	assert.NoError(t, err)

	w := httptest.NewRecorder()

	c, _ := gin.CreateTestContext(w)
	c.Request = request

	err = models.InitDatabase()
	assert.NoError(t, err)

	models.Db.AutoMigrate(&models.User{})

	Login(c)

	assert.Equal(t, 200, w.Code)

}

func TestLoginInvalidJSON(t *testing.T) {
	user := "test"

	payload, err := json.Marshal(&user)
	assert.NoError(t, err)

	request, err := http.NewRequest("POST", "/api/controllers/login", bytes.NewBuffer(payload))
	assert.NoError(t, err)

	w := httptest.NewRecorder()

	c, _ := gin.CreateTestContext(w)
	c.Request = request

	Login(c)

	assert.Equal(t, 400, w.Code)
}

func TestLoginInvalidCredentials(t *testing.T) {
	user := LoginPayload{
		Email: "test@email.com",
		Password: "invalid",
	}

	payload, err := json.Marshal(&user)
	assert.NoError(t, err)

	request, err := http.NewRequest("POST", "/api/controllers/login", bytes.NewBuffer(payload))
	assert.NoError(t, err)

	w := httptest.NewRecorder()
	
	c, _ := gin.CreateTestContext(w)
	c.Request = request

	err = models.InitDatabase()
	assert.NoError(t, err)

	models.Db.AutoMigrate(&models.User{})

	Login(c)

	assert.Equal(t, 401, w.Code)

	models.Db.Unscoped().Where("email = ?", user.Email).Delete(&models.User{})
}