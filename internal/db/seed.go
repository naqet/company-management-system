package db

import (
	"log/slog"

	"golang.org/x/crypto/bcrypt"
	"gorm.io/gorm"
)

func initSeed(db *gorm.DB) {
	seedUsers(db)
	seedProjects(db)
	seedIssueTypes(db)
	seedIssues(db)
}

func seedProjects(db *gorm.DB) {
	projects := []*Project{
		{
			Title:      "Hello world",
			Key:        "HW",
			OwnerEmail: "test@gmail.com",
		},
		{
			Title:      "Another Project",
			Key:        "AP",
			OwnerEmail: "test@gmail.com",
		},
	}

	db.Create(&projects)
}

func seedIssueTypes(db *gorm.DB) {
	types := []*Type{
		{
			Name: "Epic",
		},
		{
			Name: "User Story",
		},
		{
			Name: "Task",
		},
	}

	db.Create(&types)
}

func seedIssues(db *gorm.DB) {
	issues := []*Issue{
		{
			ProjectKey:  "HW",
			Title:       "First task",
			Type:        Type{Name: "Task"},
		},
		{
			ProjectKey:  "HW",
			Title:       "First epic",
			Type:        Type{Name: "Epic"},
		},
		{
			ProjectKey:  "HW",
			Title:       "First user story",
			Type:        Type{Name: "User Story"},
		},
	}

	db.Create(&issues)
}

func seedUsers(db *gorm.DB) {
	users := []*User{
		{
			Name:              "Test",
			Email:             "test@gmail.com",
			Password:          "123",
			PasswordConfirmed: false,
		},
		{
			Name:              "Another",
			Email:             "test123@gmail.com",
			Password:          "123",
			PasswordConfirmed: false,
		},
		{
			Name:              "Kobe",
			Email:             "123@gmail.com",
			Password:          "123",
			PasswordConfirmed: false,
		},
	}

	for _, user := range users {
		pass, err := bcrypt.GenerateFromPassword([]byte(user.Password), 10)

		if err != nil {
			slog.Error("Error while seeding users: " + err.Error())
			return
		}
		user.Password = string(pass)
	}

	db.Create(&users)
}
