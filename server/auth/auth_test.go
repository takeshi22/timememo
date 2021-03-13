package auth

import (
	"os"
	"testing"

	"github.com/stretchr/testify/assert"
)

func TestGerateToken(t *testing.T) {
	JwtWrapper := JwtWrapper{
		SecretKey:       "verysecret",
		Issuer:          "test",
		ExpirationHours: 24,
	}

	GenerateToken, err := JwtWrapper.GenerateToken("test@email.com")
	assert.NoError(t, err)

	os.Setenv("testToken", GenerateToken)
}

func TestValidateToken(t *testing.T) {
	encodeToken := os.Getenv("testToken")

	JwtWrapper := JwtWrapper{
		SecretKey: "verysecret",
		Issuer:    "test",
	}

	claims, err := JwtWrapper.ValidateToken(encodeToken)
	assert.NoError(t, err)

	assert.Equal(t, "test@email.com", claims.Email)
	assert.Equal(t, "test", claims.Issuer)
}
