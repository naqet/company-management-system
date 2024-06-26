package db

import (
	"log/slog"

	"golang.org/x/crypto/bcrypt"
	"gorm.io/gorm"
)

func initSeed(db *gorm.DB) {
    seedUsers(db)
    seedProjects(db)
    //seedEpics(db)
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

//func seedEpics(db *gorm.DB) {
//    epics := []*Epic{
//        {
//        	Issue:   Issue{
//        		ProjectKey:  "HW",
//        		Title:       "First epic",
//        		Description: "",
//        	},
//        },
//        {
//        	Issue:   Issue{
//        		ProjectKey:  "HW",
//        		Title:       "Second epic",
//        		Description: "",
//        	},
//        },
//    }
//
//    db.Create(&epics)
//}
//
//func seedStories(db *gorm.DB) {
//    stories := []*Story{
//        {
//        	Issue:   Issue{
//        		ProjectKey:  "HW",
//        		Title:       "First story",
//        		Description: "",
//        	},
//        },
//        {
//        	Issue:   Issue{
//        		ProjectKey:  "HW",
//        		Title:       "Second story",
//        		Description: "",
//        	},
//        },
//    }
//
//    db.Create(&stories)
//}

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
