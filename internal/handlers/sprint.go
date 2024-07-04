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
		Name       string     `json:"name"`
		ProjectKey string     `json:"projectKey"`
		Start      utils.Time `json:"start"`
		End        utils.Time `json:"end"`
	}

	var data request
    err := utils.GetDataFromBody(r.Body, &data)

    if err != nil {
        return chttp.BadRequestError()
    }

	err = h.db.Create(&db.Sprint{Name: data.Name, Start: time.Time(data.Start), End: time.Time(data.End), ProjectKey: data.ProjectKey}).Error

	if errors.Is(err, gorm.ErrDuplicatedKey) {
		return chttp.BadRequestError("Sprint with such name already exists")
	} else if err != nil {
		return err
	}

	w.WriteHeader(http.StatusCreated)
	return nil
}
