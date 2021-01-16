package controllers

import (
	"fmt"
	"net/http"
	"timememo/models"

	"github.com/gin-gonic/gin"
)

func GetSchdules(c *gin.Context) {
	var schedules []models.Schedule
	fmt.Println("get!!")
	models.Db.Find(&schedules)
	c.JSON(http.StatusOK, gin.H{"data": schedules})
}
