package main

import (
	"github.com/naqet/company-management-system/internal/db"
	"github.com/naqet/company-management-system/internal/handlers"
	"github.com/naqet/company-management-system/pkg/cenv"
	"github.com/naqet/company-management-system/pkg/chttp"

	"log/slog"
)

func main() {
    cenv.Init()
    database := db.Init()
	app := chttp.New(database)

	app.ServeDir("/static/", "./static")

    handlers.NewAuthHandler(app)

    println("App running...")
	err := app.ListenAndServe("localhost:3000")

	if err != nil {
		slog.Error(err.Error())
		panic("App crashed")
	}
}
