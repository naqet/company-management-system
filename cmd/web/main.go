package main

import (
	"github.com/naqet/company-management-system/pkg/chttp"

	"log/slog"
)

func main() {
	app := chttp.New()

	app.ServeDir("/static/", "./static")

    println("Running server...")
	err := app.ListenAndServe("localhost:3000")

	if err != nil {
		slog.Error(err.Error())
		panic("App crashed")
	}
}
