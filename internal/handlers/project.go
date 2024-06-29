package handlers

import (
	"errors"
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

	route.Get("/{key}", h.summaryPage)
	route.Get("/create", h.createPage)
    route.Post("", h.create)
}

func (h *projectHandler) createPage(w http.ResponseWriter, r *http.Request) error {
	return vproject.CreatePage().Render(r.Context(), w)
}

func (h *projectHandler) summaryPage(w http.ResponseWriter, r *http.Request) error {
    key := r.PathValue("key")

    project := db.Project{}
    err := h.db.Preload("Sprints").Where("key = ?", key).First(&project).Error

    if errors.Is(err, gorm.ErrRecordNotFound) {
        return chttp.BadRequestError("Project with such key doesn't exist")
    } else if err != nil {
        return err
    }

    return vproject.Summary(project).Render(r.Context(), w)
}

func (h *projectHandler) create(w http.ResponseWriter, r *http.Request) error {
	title := r.FormValue("title")
	key := r.FormValue("key")

	if len(title) < 1 {
		return chttp.BadRequestError("Title is required")
	}

	if len(key) < 1 {
		return chttp.BadRequestError("Key is required")
	}

	email, err := utils.GetEmailFromContext(r)

	if err != nil {
		return err
	}

    err = h.db.Create(&db.Project{Title: title, Key: key, OwnerEmail: email}).Error

    if err != nil {
        return err
    }

	if utils.IsHtmxRequest(r) {
		utils.AddHtmxRedirect(w, "/")
	}

	w.WriteHeader(http.StatusCreated)
	return nil
}
