package models

import (
	"fmt"
	"os"
	"log"

	"github.com/joho/godotenv"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

var Db *gorm.DB

func InitDatabase() (err error) {
	_, ok := os.LookupEnv("ENVIRONMENT")

	var loadError error
	if ok == true {
		loadError = godotenv.Load("../.env")
	} else {
		loadError = godotenv.Load(".env")
	}

	if loadError != nil {
		fmt.Println("fatal!! not found .env file")
	}

	dsn := fmt.Sprintf("host=%s user=%s dbname=%s password=%s TimeZone=%s",
		os.Getenv("HOST_NAME"),
		os.Getenv("USER_NAME"),
		os.Getenv("DB_NAME"),
		os.Getenv("PASSWORD"),
		os.Getenv("TIME_ZONE"))

	database, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		log.Fatalln("Failed to connect to database")
	}

	database.AutoMigrate(&Schedule{})
	Db = database

	return
}
