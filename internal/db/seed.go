package db

import (
	"log/slog"

	"golang.org/x/crypto/bcrypt"
	"gorm.io/gorm"
)

func initSeed(db *gorm.DB) {
	seedUsers(db)
	seedProjects(db)
	seedStatuses(db)
	seedIssueTypes(db)
	seedIssues(db)
}

func seedProjects(db *gorm.DB) {
	projects := []*Project{
		{
			Name:      "Hello world",
			Key:        "HW",
			OwnerEmail: "test@gmail.com",
		},
		{
			Name:      "Another Project",
			Key:        "AP",
			OwnerEmail: "test@gmail.com",
		},
	}

	db.Create(&projects)
}

func seedStatuses(db *gorm.DB) {
	statuses := []*Status{
		{
			Name: TO_DO,
		},
		{
			Name: IN_PROGRESS,
		},
		{
			Name: IN_REVIEW,
		},
		{
			Name: DONE,
		},
	}

	db.Create(&statuses)
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
			ProjectKey: "HW",
			Name:      "First task",
			Type:       Type{Name: "Task"},
			Status:     Status{Name: TO_DO},
		},
		{
			ProjectKey: "HW",
			Name:      "First epic",
			Type:       Type{Name: "Epic"},
			Status:     Status{Name: IN_PROGRESS},
		},
		{
			ProjectKey: "HW",
			Name:      "First user story",
			Type:       Type{Name: "User Story"},
			Status:     Status{Name: DONE},
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
