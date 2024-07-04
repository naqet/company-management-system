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

type teamHandler struct {
	db *gorm.DB
}

func NewTeamHandler(app *chttp.App) {
	route := app.Group("/team")

	route.Use(middlewares.Auth)

	h := &teamHandler{db: app.Db}

	route.Post("", h.create)
}

func (h *teamHandler) create(w http.ResponseWriter, r *http.Request) error {
	type request struct {
		Name        string          `json:"name"`
		LeaderEmail string          `json:"leaderEmail"`
		ProjectKey   string          `json:"projectKey"`
		Members     utils.StringArr `json:"members"`
	}

	var data request
    err := utils.GetDataFromBody(r.Body, &data)

    if err != nil {
        return chttp.BadRequestError()
    }

	team := db.Team{
		Name:        data.Name,
		LeaderEmail: data.LeaderEmail,
        ProjectKey: data.ProjectKey,
	}

	for _, member := range data.Members {
		team.Members = append(team.Members, db.User{Email: member})
	}

	err = h.db.Create(&team).Error

	if errors.Is(err, gorm.ErrDuplicatedKey) {
		return chttp.BadRequestError("Team with such name already exists")
	} else if err != nil {
		return err
	}

	w.WriteHeader(http.StatusCreated)
	return nil
}
