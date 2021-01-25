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

func CreateSchedule(c *gin.Context) {
	var input models.CreateSchedule
	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	fmt.Println(input.Day)
	schedule := models.Schedule{Title: input.Title, Content: input.Content, Day: input.Day, StartTime: input.StartTime, EndTime: input.EndTime}
	models.Db.Create(&schedule)

	c.JSON(http.StatusOK, gin.H{"data": schedule})
}
