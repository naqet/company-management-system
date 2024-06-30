package handlers

import (
	"errors"
	"net/http"

	"github.com/naqet/company-management-system/internal/db"
	"github.com/naqet/company-management-system/internal/middlewares"
	"github.com/naqet/company-management-system/internal/utils"
	"github.com/naqet/company-management-system/pkg/chttp"
	vissue "github.com/naqet/company-management-system/views/issue"
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
	projects := []db.Project{}
	err := h.db.Find(&projects).Error
	if err != nil {
		return err
	}
	types := []db.Type{}
	err = h.db.Find(&types).Error
	if err != nil {
		return err
	}

	users := []db.User{}
	err = h.db.Find(&users).Error
	if err != nil {
		return err
	}

	return vissue.CreatePage(projects, types, users).Render(r.Context(), w)
}

func (h *issueHandler) create(w http.ResponseWriter, r *http.Request) error {
	type request struct {
		ProjectKey    string `json:"projectKey"`
		Sprint        string `json:"sprint"`
		Type          string `json:"type"`
		Name          string `json:"name"`
		Description   string `json:"description"`
		AssigneeEmail string `json:"assignee"`
	}

	var data request
	utils.GetDataFromBody(r.Body, &data)

	err := h.db.Create(&db.Issue{
		Name:          data.Name,
		TypeName:      data.Type,
		StatusName:    db.TO_DO,
		ProjectKey:    data.ProjectKey,
		AssigneeEmail: data.AssigneeEmail,
		SprintId:      data.Sprint,
		Description:   data.Description,
	}).Error

	if errors.Is(err, gorm.ErrDuplicatedKey) {
		return chttp.BadRequestError("Issue with such name already exists")
	} else if err != nil {
		return err
	}

	w.WriteHeader(http.StatusCreated)
	return nil
}
