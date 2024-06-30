package handlers

import (
	"net/http"

	"github.com/naqet/company-management-system/internal/db"
	"github.com/naqet/company-management-system/internal/middlewares"
	"github.com/naqet/company-management-system/pkg/chttp"
	vcomponents "github.com/naqet/company-management-system/views/components"
	"gorm.io/gorm"
)

type componentsHandler struct {
	db *gorm.DB
}

func NewComponentsHandler(app *chttp.App) {
	route := app.Group("/components")

	route.Use(middlewares.Auth)

	h := &componentsHandler{db: app.Db}

	route.Get("/sprint-select", h.sprintSelect)
}

func (c *componentsHandler) sprintSelect(w http.ResponseWriter, r *http.Request) error {
    sprints := []db.Sprint{}
    key := r.URL.Query().Get("projectKey")

    err := c.db.Where("project_key = ?", key).Find(&sprints).Error

    if err != nil {
        return err
    }
    
    return vcomponents.SprintSelect(sprints).Render(r.Context(), w)
}
