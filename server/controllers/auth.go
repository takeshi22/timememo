package controllers

import (
	"log"
	"timememo/models"
	"timememo/auth"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

type LoginPayload struct {
	Email string `json:"email"`
	Password string `json:"password"`
}

type LoginResponse struct {
	Token string `json:"token"`
}

func Signup(c *gin.Context) {
	var user models.User

	err := c.ShouldBindJSON(&user)
	if err != nil {
		log.Println(err)

		c.JSON(400, gin.H{
			"msg": "could not bind user",
		})
		c.Abort()
		return
	}

	err = user.EncryptPassword(user.Password)
	if err != nil {
		log.Println(err.Error())

		c.JSON(500, gin.H{
			"msg": "error encrypt password",
		})
		c.Abort()
		return
	}


	err = user.CreateUser()
	if err != nil {
		log.Println(err)

		c.JSON(500, gin.H{
			"msg": "error creating user",
		})
		c.Abort()
		return
	}

	c.JSON(200, user)
}

func Login(c *gin.Context) {
	var payload LoginPayload
	var user models.User

	err := c.ShouldBindJSON(&payload)
	if err != nil {
		c.JSON(400, gin.H{
			"msg": "invalid login",
		})
		c.Abort()
		return
	}

	result := models.Db.Where("email = ?", payload.Email).First(&user)

	if result.Error == gorm.ErrRecordNotFound {
		c.JSON(401, gin.H{
			"msg": "invalid user credentials",
		})
		c.Abort()
		return
	}

	err = user.CheckPassword(payload.Password)
	if err != nil {
		log.Println(err)
		c.JSON(401, gin.H{
			"msg": "invalid user credentials",
		})
		c.Abort()
		return
	}

	jwtWrapper := auth.JwtWrapper{
		SecretKey:       "verysecretkey",
		Issuer:          "AuthService",
		ExpirationHours: 24,
	}

	signedToken, err := jwtWrapper.GenerateToken(user.Email)
	if err != nil {
		log.Println(err)
		c.JSON(500, gin.H{
			"msg": "error signin token",
		})
		c.Abort()
		return
	}

	tokenResponse := LoginResponse{
		Token: signedToken,
	}

	c.JSON(200, tokenResponse)
	return
}
