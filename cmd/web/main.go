package main

import (
	"net/http"

	"github.com/naqet/company-management-system/internal/db"
	"github.com/naqet/company-management-system/internal/handlers"
	"github.com/naqet/company-management-system/internal/middlewares"
	"github.com/naqet/company-management-system/pkg/cenv"
	"github.com/naqet/company-management-system/pkg/chttp"
	vhome "github.com/naqet/company-management-system/views/home"

	"log/slog"
)

func main() {
	cenv.Init()
	database := db.Init()
	app := chttp.New(database)

	app.ServeDir("/static/", "./static")

	app.Get("/{$}", middlewares.AuthFunc(func(w http.ResponseWriter, r *http.Request) error {
        projects := []db.Project{}
        database.Find(&projects)
		return vhome.Base(projects).Render(r.Context(), w)
	}))

	handlers.NewAuthHandler(app)
	handlers.NewProjectHandler(app)
	handlers.NewSprintHandler(app)
	handlers.NewTeamHandler(app)

	println("App running...")
	err := app.ListenAndServe("localhost:3000")

	if err != nil {
		slog.Error(err.Error())
		panic("App crashed")
	}
}
