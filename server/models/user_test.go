package models

import (
	"os"
	"testing"

	"github.com/stretchr/testify/assert"
)

func TestHashPassword(t *testing.T) {
	user := User{
		Password: "secret",
	}
	err := user.EncryptPassword(user.Password)
	assert.NoError(t, err)

	os.Setenv("passwordHash", user.Password)
}

func TestCreateUser(t *testing.T) {
	var userResult User

	err := Db.AutoMigrate(&User{})
	assert.NoError(t, err)

	user := User{
		Name:     "Test User",
		Email:    "test@icloud.com",
		Password: os.Getenv("passwordHash"),
	}
	err = user.CreateUser()
	assert.NoError(t, err)

	Db.Where("email = ?", user.Email).Find(&userResult)
	Db.Unscoped().Where("email = ?", user.Email).Delete(&user)

	assert.Equal(t, "test@icloud.com", userResult.Email)
}

func TestCheckPassword(t *testing.T) {
	hash := os.Getenv("passwordHash")

	user := User{
		Password: hash,
	}

	err := user.CheckPassword("secret")
	assert.NoError(t, err)
}
