package models

import (
	"fmt"
	"os"

	"github.com/joho/godotenv"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

var Db *gorm.DB

func init() {
	_, ok := os.LookupEnv("ENVIRONMENT")

	var err error
	if ok == true {
		err = godotenv.Load("../.env")
	} else {
		err = godotenv.Load(".env")
	}

	if err != nil {
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
		panic(err)
	}

	database.AutoMigrate(&Schedule{})
	Db = database
}
