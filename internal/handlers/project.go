package handlers

import (
	"net/http"

	"github.com/naqet/company-management-system/internal/db"
	"github.com/naqet/company-management-system/internal/middlewares"
	"github.com/naqet/company-management-system/internal/utils"
	"github.com/naqet/company-management-system/pkg/chttp"
	vproject "github.com/naqet/company-management-system/views/project"
	"gorm.io/gorm"
)

type projectHandler struct {
	db *gorm.DB
}

func NewProjectHandler(app *chttp.App) {
	route := app.Group("/project")

    route.Use(middlewares.Auth)

	h := &projectHandler{db: app.Db}

	route.Get("/create", h.createPage)
    route.Post("", h.create)
}

func (h *projectHandler) createPage(w http.ResponseWriter, r *http.Request) error {
	return vproject.CreatePage().Render(r.Context(), w)
}

func (h *projectHandler) create(w http.ResponseWriter, r *http.Request) error {
	title := r.FormValue("title")

	if len(title) < 1 {
		return chttp.BadRequestError("Title is required")
	}

	email, err := utils.GetEmailFromContext(r)

	if err != nil {
		return err
	}

    err = h.db.Create(&db.Project{Title: title, OwnerEmail: email}).Error

    if err != nil {
        return err
    }

	if utils.IsHtmxRequest(r) {
		utils.AddHtmxRedirect(w, "/")
	}

	w.WriteHeader(http.StatusCreated)
	return nil
}
