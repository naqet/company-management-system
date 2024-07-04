package handlers

import (
	"errors"
	"net/http"
	"strings"

	"github.com/naqet/company-management-system/internal/db"
	"github.com/naqet/company-management-system/internal/middlewares"
	"github.com/naqet/company-management-system/internal/utils"
	"github.com/naqet/company-management-system/pkg/chttp"
	vissue "github.com/naqet/company-management-system/views/issue"
	vproject "github.com/naqet/company-management-system/views/project"
	"gorm.io/gorm"
)

type issueHandler struct {
	db *gorm.DB
}

func NewIssueHandler(app *chttp.App) {
	route := app.Group("/issue")

	route.Use(middlewares.Auth)

	h := &issueHandler{db: app.Db}

    route.Get("/{key}", h.summaryPage)
	route.Get("/create", h.createPage)
	route.Post("", h.create)
	route.Put("/status", h.updateStatus)
}

func (h *issueHandler) summaryPage(w http.ResponseWriter, r *http.Request) error {
    key := r.PathValue("key")

	data := strings.Split(key, "-")

	if len(data) != 2 {
		return chttp.BadRequestError("Invalid key")
	}
	projectKey := data[0]
	id := data[1]

    issue := db.Issue{}

    err := h.db.Where("project_key = ? AND id = ?", projectKey, id).First(&issue).Error

    if err != nil {
        return err
    }

    return vissue.SummaryPage(issue).Render(r.Context(), w)
}

func (h *issueHandler) updateStatus(w http.ResponseWriter, r *http.Request) error {
	status := r.FormValue("status")
	key := r.FormValue("key")

	if status == "" || key == "" {
		return chttp.BadRequestError("Required status and key form fields")
	}

	data := strings.Split(key, "-")

	if len(data) != 2 {
		return chttp.BadRequestError("Invalid key")
	}
	projectKey := data[0]
	id := data[1]

	err := h.db.Where("name = ?", status).Find(&db.Status{}).Error

	if errors.Is(err, gorm.ErrRecordNotFound) {
		return chttp.BadRequestError("Invalid status")
	} else if err != nil {
		return err
	}

	err = h.db.Model(&db.Issue{}).Where("project_key = ? AND id = ?", projectKey, id).Update("status_name", status).Error

	if errors.Is(err, gorm.ErrRecordNotFound) {
		return chttp.BadRequestError("Issue with such key doesn't exist")
	} else if err != nil {
		return err
	}

	issue := db.Issue{}
	err = h.db.Where("id = ?", id).First(&issue).Error

	if err != nil {
		return err
	}

	return vproject.Issue(issue).Render(r.Context(), w)
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

	priorities := []db.Priority{}
	err = h.db.Find(&priorities).Error
	if err != nil {
		return err
	}

	return vissue.CreatePage(projects, types, users, priorities).Render(r.Context(), w)
}

func (h *issueHandler) create(w http.ResponseWriter, r *http.Request) error {
	type request struct {
		ProjectKey    string `json:"projectKey"`
		Sprint        string `json:"sprint"`
		Type          string `json:"type"`
		Priority      string `json:"priority"`
		Name          string `json:"name"`
		Description   string `json:"description"`
		AssigneeEmail string `json:"assignee"`
	}

	var data request
    err := utils.GetDataFromBody(r.Body, &data)

    if err != nil {
        return chttp.BadRequestError()
    }

	err = h.db.Create(&db.Issue{
		Name:          data.Name,
		TypeName:      data.Type,
		StatusName:    db.TO_DO,
		ProjectKey:    data.ProjectKey,
		AssigneeEmail: data.AssigneeEmail,
		PriorityName:  data.Priority,
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
