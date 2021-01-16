package models

import (
	"time"

	"gorm.io/gorm"
)

type Schedule struct {
	gorm.Model
	Title     string     `json:title`
	Content   string     `json:content`
	Day       *time.Time `json:day`
	StartTime time.Time  `json:startTime`
	EndTime   time.Time  `json:endTime`
}
