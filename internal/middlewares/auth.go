package middlewares

import (
	"context"
	"errors"
	"net/http"
	"os"
	"strings"

	"github.com/golang-jwt/jwt/v5"
	"github.com/naqet/company-management-system/pkg/chttp"
)

func authorize(r *http.Request) (*http.Request, error) {
	cookie, err := r.Cookie("Authorization")

	if err != nil || cookie == nil {
		return nil, chttp.UnauthorizedError()
	}

	tokenString := cookie.Value

	secret := os.Getenv("SECRET")
	if secret == "" {
		return nil, errors.New("JWT secret is not set")
	}

	token, err := jwt.Parse(tokenString, func(t *jwt.Token) (interface{}, error) {
		if _, ok := t.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, chttp.UnauthorizedError("Invalid JWT token")
		}
		return []byte(secret), nil
	})

	if err != nil {
		return nil, err
	}

	if !token.Valid {
		return nil, chttp.UnauthorizedError()
	}

	claims, ok := token.Claims.(jwt.MapClaims)

	if !ok {
		return nil, chttp.UnauthorizedError("Invalid JWT token")
	}

	email, err := claims.GetSubject()

	if err != nil {
		return nil, chttp.UnauthorizedError("Invalid JWT token")
	}

	ctx := context.WithValue(r.Context(), "email", email)

	return r.WithContext(ctx), nil
}

func Auth(next http.Handler, path string) chttp.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) error {
		if !strings.HasPrefix(r.URL.Path, path) {
			next.ServeHTTP(w, r)
			return nil
		}
		req, err := authorize(r)

		if err != nil {
			return err
		}

		next.ServeHTTP(w, req)
		return nil
	}
}

func AuthFunc(next chttp.HandlerFunc) chttp.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) error {
        req, err := authorize(r)

        if err != nil {
            return err
        }

		return next(w, req)
	}
}
