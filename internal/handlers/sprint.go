package handlers

import (
	"errors"
	"net/http"
	"time"

	"github.com/naqet/company-management-system/internal/db"
	"github.com/naqet/company-management-system/internal/middlewares"
	"github.com/naqet/company-management-system/internal/utils"
	"github.com/naqet/company-management-system/pkg/chttp"
	"gorm.io/gorm"
)

type sprintHandler struct {
	db *gorm.DB
}

func NewSprintHandler(app *chttp.App) {
	route := app.Group("/sprint")

	route.Use(middlewares.Auth)

	h := &sprintHandler{db: app.Db}

	route.Post("", h.create)
}

func (h *sprintHandler) create(w http.ResponseWriter, r *http.Request) error {
	type request struct {
		Name      string     `json:"name"`
		ProjectId string     `json:"projectId"`
		Start     utils.Time `json:"start"`
		End       utils.Time `json:"end"`
	}

	var data request
	utils.GetDataFromBody(r.Body, &data)

	err := h.db.Create(&db.Sprint{Name: data.Name, Start: time.Time(data.Start), End: time.Time(data.End), ProjectId: data.ProjectId}).Error

	if errors.Is(err, gorm.ErrDuplicatedKey) {
		return chttp.BadRequestError("Sprint with such title already exists")
	} else if err != nil {
		return err
	}

	w.WriteHeader(http.StatusCreated)
	return nil
}
