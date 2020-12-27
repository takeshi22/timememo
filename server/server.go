package main

import (
	"database/sql"
	"fmt"
	"os"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	_ "github.com/lib/pq"
)

var Db *sql.DB

func init() {
	var err error
	Db, err = sql.Open("postgres", fmt.Sprintf("user=%s dbname=%s password=%s", os.Getenv("USER_NAME"), os.Getenv("DB_NAME"), os.Getenv("PASSWORD")))
	if err != nil {
		panic(err)
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
