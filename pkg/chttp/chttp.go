package chttp

import "net/http"

type HandlerFunc func(w http.ResponseWriter, r *http.Request) error
type App struct {
	path string
	mux  *http.ServeMux
}

func New() *App {
	return &App{
		path: "",
		mux:  http.NewServeMux(),
	}
}

func (a *App) Route(path string, fn HandlerFunc) {
	a.mux.HandleFunc(path, withErrorHandling(fn))
}

func (a *App) ServeDir(pattern, dir string) {
	a.mux.Handle(pattern, http.StripPrefix(pattern, http.FileServer(http.Dir(dir))))
}

func (a *App) ListenAndServe(addr string) error {
    return http.ListenAndServe(addr, a.mux)
}
