package models

import (
	"gorm.io/gorm"
)

type Schedule struct {
	gorm.Model
	Title     string `json:"title"`
	Content   string `json:"content"`
	Day       string `json:"day" gorm:"type:date"`
	StartTime string `json:"startTime"`
	EndTime   string `json:"endTime"`
}

type CreateSchedule struct {
	Title     string `json:"title" binding:"required"`
	Content   string `json:"content"`
	Day       string `json:"day"`
	StartTime string `json:"startTime"`
	EndTime   string `json:"endTime"`
}
