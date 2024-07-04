package handlers

import (
	"errors"
	"net/http"

	"github.com/naqet/company-management-system/internal/db"
	"github.com/naqet/company-management-system/internal/middlewares"
	"github.com/naqet/company-management-system/internal/utils"
	"github.com/naqet/company-management-system/pkg/chttp"
	vprofile "github.com/naqet/company-management-system/views/profile"
	"gorm.io/gorm"
)

type profileHandler struct {
	db *gorm.DB
}

func NewProfileHandler(app *chttp.App) {
	route := app.Group("/profile")

	route.Use(middlewares.Auth)

	h := &profileHandler{db: app.Db}

	route.Get("", h.summaryPage)
	route.Put("", h.update)
}

func (h *profileHandler) summaryPage(w http.ResponseWriter, r *http.Request) error {
	email, err := utils.GetEmailFromContext(r)
	if err != nil {
		return err
	}

	user := db.User{}
	err = h.db.Where("email = ?", email).First(&user).Error

	if err != nil {
		return err
	}
	return vprofile.SummaryPage(user).Render(r.Context(), w)
}

func (h *profileHandler) update(w http.ResponseWriter, r *http.Request) error {
	type request struct {
		Name  string `json:"name"`
		Email string `json:"email"`
	}

    var data request
    err := utils.GetDataFromBody(r.Body, &data)

    if err != nil {
        return chttp.BadRequestError()
    }

    email, err := utils.GetEmailFromContext(r)

    if err != nil {
        return err
    }

    err = h.db.Model(&db.User{}).Where("email = ?", email).UpdateColumns(data).Error

    if errors.Is(err, gorm.ErrDuplicatedKey) {
        return chttp.BadRequestError("Cannot use this email")
    }

	return err
}
