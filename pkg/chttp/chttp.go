package chttp

import (
	"net/http"

	"gorm.io/gorm"
)

type HandlerFunc func(w http.ResponseWriter, r *http.Request) error
type Middleware func(next http.Handler, path string) HandlerFunc
type FuncMiddleware func(next HandlerFunc) HandlerFunc

type App struct {
	path        string
	mux         *http.ServeMux
	Db          *gorm.DB
	middlewares map[string][]Middleware
}

func New(db *gorm.DB) *App {
	return &App{
		path:        "",
		mux:         http.NewServeMux(),
		Db:          db,
		middlewares: map[string][]Middleware{},
	}
}

func (a *App) Group(path string) *App {
	return &App{
		path: a.path + path,
		mux:  a.mux,
		Db:   a.Db,
        middlewares: a.middlewares,
	}
}

func (a *App) Use(middleware Middleware) {
    a.middlewares[a.path] = append(a.middlewares[a.path], middleware)
}

func (a *App) Get(path string, fn HandlerFunc) {
	a.mux.HandleFunc("GET "+a.path+path, withErrorHandling(fn))
}

func (a *App) Post(path string, fn HandlerFunc) {
	a.mux.HandleFunc("POST "+a.path+path, withErrorHandling(fn))
}

func (a *App) Put(path string, fn HandlerFunc) {
	a.mux.HandleFunc("PUT "+a.path+path, withErrorHandling(fn))
}

func (a *App) ServeDir(pattern, dir string) {
	a.mux.Handle(pattern, http.StripPrefix(pattern, http.FileServer(http.Dir(dir))))
}

func (a *App) ListenAndServe(addr string) error {
    var handler http.Handler = a.mux;
    for path, middlewares := range a.middlewares {
        for _, middleware := range middlewares {
            handler = withErrorHandling(middleware(handler, path))
        }
    }

	return http.ListenAndServe(addr, handler)
}
