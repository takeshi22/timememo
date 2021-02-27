package models

import (
	"golang.org/x/crypto/bcrypt"
	"gorm.io/gorm"
)

type User struct {
	gorm.Model
	Name     string `json:"name"`
	Email    string `json:"email" gorm:"unique"`
	Password string `json:"password"`
}

func (user *User) CreateUser() error {
	item := User{Name: user.Name, Email: user.Email, Password: user.Password}
	result := Db.Create(&item)

	if result.Error != nil {
		return result.Error
	}

	return nil
}

func (user *User) EncryptPassword(plaintext string) error {
	bytes, err := bcrypt.GenerateFromPassword([]byte(plaintext), 14)
	if err != nil {
		return err
	}

	user.Password = string(bytes)

	return nil
}

func (user *User) CheckPassword(providedPassword string) error {
	err := bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(providedPassword))
	if err != nil {
		return err
	}

	return nil
}
