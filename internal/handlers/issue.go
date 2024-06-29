package handlers

import (
	"errors"
	"net/http"

	"github.com/naqet/company-management-system/internal/db"
	"github.com/naqet/company-management-system/internal/middlewares"
	"github.com/naqet/company-management-system/internal/utils"
	"github.com/naqet/company-management-system/pkg/chttp"
	"gorm.io/gorm"
)

type issueHandler struct {
	db *gorm.DB
}

func NewIssueHandler(app *chttp.App) {
	route := app.Group("/issue")

	route.Use(middlewares.Auth)

	h := &issueHandler{db: app.Db}

	route.Get("/create", h.createPage)
	route.Post("", h.create)
}

func (h *issueHandler) createPage(w http.ResponseWriter, r *http.Request) error {
	// TODO create page
	return nil
}

func (h *issueHandler) create(w http.ResponseWriter, r *http.Request) error {
	type request struct {
		Title      string `json:"title"`
		Type       string `json:"type"`
		ProjectKey string `json:"projectKey"`
	}

	var data request
	utils.GetDataFromBody(r.Body, &data)

	err := h.db.Create(&db.Issue{
		Title:      data.Title,
		Type:       db.Type{Name: data.Type},
		ProjectKey: data.ProjectKey,
	}).Error

	if errors.Is(err, gorm.ErrDuplicatedKey) {
		return chttp.BadRequestError("Issue with such title already exists")
	} else if err != nil {
		return err
	}

	w.WriteHeader(http.StatusCreated)
	return nil
}
