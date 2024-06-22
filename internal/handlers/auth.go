package handlers

import (
	"errors"
	"net/http"
	"os"
	"time"

	"github.com/golang-jwt/jwt/v5"
	"github.com/naqet/company-management-system/internal/db"
	"github.com/naqet/company-management-system/internal/utils"
	"github.com/naqet/company-management-system/pkg/chttp"
	"github.com/naqet/company-management-system/views/auth"
	"golang.org/x/crypto/bcrypt"
	"gorm.io/gorm"
)

type authHandler struct {
	db *gorm.DB
}

func NewAuthHandler(app *chttp.App) {
	route := app.Group("/auth")

	h := &authHandler{db: app.Db}

	route.Get("/login", h.loginPage)
	route.Get("/signup", h.signUpPage)
	route.Post("/login", h.login)
	route.Post("/logout", h.logout)
	route.Post("/signup", h.signUp)
}

func (h *authHandler) login(w http.ResponseWriter, r *http.Request) error {
	type request struct {
		Email    string `json:"email"`
		Password string `json:"password"`
	}

	var data request
	err := utils.GetDataFromBody(r.Body, &data)

	if err != nil {
		return err
	}

	var user db.User
	err = h.db.Where("email = ?", data.Email).First(&user).Error

	if errors.Is(err, gorm.ErrRecordNotFound) {
		return chttp.BadRequestError(chttp.INCORRECT_CREDENTIALS)
	} else if err != nil {
		return err
	}

	err = bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(data.Password))

	if err != nil {
		return chttp.BadRequestError(chttp.INCORRECT_CREDENTIALS)
	}

	expiration := time.Now().Add(time.Hour)

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"sub":  user.Email,
		"time": expiration.Unix(),
	})

	secret := os.Getenv("SECRET")

	if secret == "" {
		return errors.New("JWT secret is not set")
	}

	tokenString, err := token.SignedString([]byte(secret))

	if err != nil {
		return err
	}

	cookie := http.Cookie{
		Name:     "Authorization",
		Value:    tokenString,
		Path:     "/",
		Expires:  expiration,
		Secure:   true,
		HttpOnly: true,
		SameSite: http.SameSiteStrictMode,
	}

	http.SetCookie(w, &cookie)

	if utils.IsHtmxRequest(r) {
		utils.AddHtmxRedirect(w, "/")
	}

	w.Write([]byte(http.StatusText(http.StatusOK)))

	return nil
}

func (h *authHandler) signUp(w http.ResponseWriter, r *http.Request) error {
	type request struct {
		Name     string `json:"name"`
		Email    string `json:"email"`
		Password string `json:"password"`
	}

	var data request
	err := utils.GetDataFromBody(r.Body, &data)

	if err != nil {
		return err
	}

	pass, err := bcrypt.GenerateFromPassword([]byte(data.Password), bcrypt.DefaultCost)

	if err != nil {
		return err
	}

	user := db.User{Name: data.Name, Email: data.Email, Password: string(pass)}

	err = h.db.Create(&user).Error

	if errors.Is(err, gorm.ErrDuplicatedKey) {
		return chttp.BadRequestError("User with such email already exists")
	} else if err != nil {
		return err
	}

	if utils.IsHtmxRequest(r) {
		utils.AddHtmxRedirect(w, "/auth/login")
	}

	w.WriteHeader(http.StatusCreated)
	w.Write([]byte(http.StatusText(http.StatusCreated)))
	return nil
}

func (h *authHandler) logout(w http.ResponseWriter, r *http.Request) error {
	http.SetCookie(w, &http.Cookie{
		Name:     "Authorization",
		Value:    "",
		Path:     "/",
		MaxAge:   -1,
		Secure:   true,
		HttpOnly: true,
		SameSite: http.SameSiteStrictMode,
	})

	if utils.IsHtmxRequest(r) {
		utils.AddHtmxRedirect(w, "/auth/login")
	}

	return nil
}

func (h *authHandler) loginPage(w http.ResponseWriter, r *http.Request) error {
	return vauth.LoginPage().Render(r.Context(), w)
}

func (h *authHandler) signUpPage(w http.ResponseWriter, r *http.Request) error {
	return vauth.SignUpPage().Render(r.Context(), w)
}
