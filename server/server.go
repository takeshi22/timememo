package main

import (
	"timememo/controllers"
	"timememo/models"
	"log"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func main() {
	r := gin.Default()

	config := cors.DefaultConfig()
	config.AllowOrigins = []string{"http://localhost:9000"}
	r.Use(cors.New(config))

	err := models.InitDatabase()
	if err != nil {
		log.Fatalln("could not create database", err)
	}

	r.GET("/schedule", controllers.GetSchdules)
	r.POST("/schedule", controllers.CreateSchedule)
	r.POST("/signup", controllers.Signup)
	r.POST("/login", controllers.Login)


	r.Run(":5050")
}
