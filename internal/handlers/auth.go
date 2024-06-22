package handlers

import (
	"net/http"

	"github.com/naqet/company-management-system/pkg/chttp"
	"github.com/naqet/company-management-system/views/auth"
)

type authHandler struct {
	app *chttp.App
}

func NewAuthHandler(app *chttp.App) {
    route := app.Group("/auth")

    h := &authHandler{app}

    route.Get("/login", h.loginPage)
    route.Get("/signup", h.signUpPage)
}

func (h *authHandler) loginPage(w http.ResponseWriter, r *http.Request) error {
    return vauth.LoginPage().Render(r.Context(), w)
}

func (h *authHandler) signUpPage(w http.ResponseWriter, r *http.Request) error {
    return vauth.SignUpPage().Render(r.Context(), w)
}
