package db

import (
	"flag"
	"fmt"
	"os"

	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

var seed bool

func init() {
    reset := flag.Bool("r", false, "Reset DB")
    flag.BoolVar(&seed, "s", false, "Seed DB")

    flag.Parse()

    if *reset {
        os.Remove("./internal/db/sqlite.db")
        fmt.Println("DB reseted")
    }
}

func Init() *gorm.DB {
	dbConfig := &gorm.Config{
		TranslateError: true,
	}

	db, err := gorm.Open(sqlite.Open("./internal/db/sqlite.db"), dbConfig)

	if err != nil {
		panic("Error connecting to the database")
	}

	db.AutoMigrate(
        &User{},
    )

    if seed {
        //TODO: seed DB
        fmt.Println("DB seeded")
    }

    return db
}

