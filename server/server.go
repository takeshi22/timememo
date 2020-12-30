package main

import (
	"fmt"
	"os"
	"time"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

type Schedule struct {
	gorm.Model
	Title     string
	Content   string
	Date      time.Time
	StartTime string
	EndTime   string
}

func init() {
	var err error
	err = godotenv.Load(".env")
	if err != nil {
		fmt.Println("fatal!!")
	}

	dsn := fmt.Sprintf("host=%s user=%s dbname=%s password=%s TimeZone=%s",
		os.Getenv("HOST_NAME"), os.Getenv("USER_NAME"), os.Getenv("DB_NAME"), os.Getenv("PASSWORD"), os.Getenv("TIME_ZONE"))
	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		panic(err)
	}
	if (!db.Migrator().HasTable(&Schedule{})) {
		fmt.Println("not exist!!")
	}
}

func main() {
	r := gin.Default()
	config := cors.DefaultConfig()
	config.AllowOrigins = []string{"http://localhost:9000"}
	r.Use(cors.New(config))
	r.GET("/schedule", func(c *gin.Context) {
		c.JSON(200, gin.H{
			"message": "hello world!!",
		})
	})
	r.Run(":5050")
}
