package chttp

import (
	"log/slog"
	"net/http"

	"github.com/naqet/company-management-system/internal/utils"
)

const (
    INCORRECT_CREDENTIALS = "Incorrect email or password"
)

type HttpError interface {
	error
	Status() int
}

type StatusError struct {
	Code int
	Err  string
}

func (s StatusError) Error() string {
	return s.Err
}

func (s StatusError) Status() int {
	return s.Code
}

func NewError(code int, msg string) StatusError {
	return StatusError{code, msg}
}

func NotFoundError(args ...string) StatusError {
    msg := http.StatusText(http.StatusNotFound)
    if len(args) == 1 {
        msg = args[0]
    }
	return StatusError{http.StatusNotFound, msg}
}

func BadRequestError(args ...string) StatusError {
    msg := http.StatusText(http.StatusBadRequest)
    if len(args) == 1 {
        msg = args[0]
    }
	return StatusError{http.StatusBadRequest, msg}
}

func InternalServerError(args ...string) StatusError {
    msg := http.StatusText(http.StatusInternalServerError)
    if len(args) == 1 {
        msg = args[0]
    }
	return StatusError{http.StatusInternalServerError, msg}
}

func UnauthorizedError(args ...string) StatusError {
    msg := http.StatusText(http.StatusUnauthorized)
    if len(args) == 1 {
        msg = args[0]
    }
	return StatusError{http.StatusUnauthorized, msg}
}

func withErrorHandling(fn HandlerFunc) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		err := fn(w, r)

		if err != nil {
            slog.Error(err.Error())
			switch e := err.(type) {
			case HttpError:
                if e.Status() == http.StatusUnauthorized {
                    loginPagePath := "/auth/login"
                    utils.AddHtmxRedirect(w, loginPagePath)
                    http.Redirect(w, r, loginPagePath, http.StatusSeeOther)
                    return
                }
				http.Error(w, e.Error(), e.Status())
			default:
				http.Error(w, http.StatusText(http.StatusInternalServerError), http.StatusInternalServerError)
			}
		}
	}
}


