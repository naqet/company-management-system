package chttp

import (
	"net/http"

	"gorm.io/gorm"
)

type HandlerFunc func(w http.ResponseWriter, r *http.Request) error
type App struct {
	path string
	mux  *http.ServeMux
	Db   *gorm.DB
}

func New(db *gorm.DB) *App {
	return &App{
		path: "",
		mux:  http.NewServeMux(),
		Db:   db,
	}
}

func (a *App) Group(path string) *App {
	return &App{
		path: a.path + path,
		mux:  a.mux,
		Db:   a.Db,
	}
}

func (a *App) Get(path string, fn HandlerFunc) {
	a.mux.HandleFunc("GET "+a.path+path, withErrorHandling(fn))
}

func (a *App) Post(path string, fn HandlerFunc) {
	a.mux.HandleFunc("POST "+a.path+path, withErrorHandling(fn))
}

func (a *App) ServeDir(pattern, dir string) {
	a.mux.Handle(pattern, http.StripPrefix(pattern, http.FileServer(http.Dir(dir))))
}

func (a *App) ListenAndServe(addr string) error {
	return http.ListenAndServe(addr, a.mux)
}
