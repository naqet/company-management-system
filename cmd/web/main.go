package main

import (
	"net/http"

	vlayout "github.com/naqet/company-management-system/views/layout"
)

func main() {
	mux := http.NewServeMux()

	mux.Handle("/static/", http.StripPrefix("/static/", http.FileServer(http.Dir("./static"))))
	mux.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		vlayout.Base().Render(r.Context(), w)
	})

	http.ListenAndServe("localhost:3000", mux)
}
