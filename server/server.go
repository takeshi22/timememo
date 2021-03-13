package main

import (
	"timememo/controllers"
	"timememo/models"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func main() {
	r := gin.Default()

	config := cors.DefaultConfig()
	config.AllowOrigins = []string{"http://localhost:9000"}
	r.Use(cors.New(config))

	r.GET("/schedule", controllers.GetSchdules)
	r.POST("/schedule", controllers.CreateSchedule)

	r.POST("/signup", models.Signup)

	r.Run(":5050")
}
