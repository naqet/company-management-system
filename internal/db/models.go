package db

import (
	"time"

	"github.com/satori/go.uuid"
	"gorm.io/gorm"
)

type Base struct {
	ID        string    `json:"id" sql:"type:uuid;primaryKey"`
	CreatedAt time.Time `json:"createdAt"`
	UpdatedAt time.Time `json:"updatedAt"`
}

func (b *Base) BeforeCreate(tx *gorm.DB) error {
	b.ID = uuid.NewV4().String()
	return nil
}

type User struct {
	Base
	Name              string    `json:"name"`
	Email             string    `json:"email" gorm:"unique"`
	Password          string    `json:"password"`
	PasswordConfirmed bool      `json:"passwordConfirmed" gorm:"default:false"`
	OwnedProjects     []Project `json:"ownedProjects" gorm:"foreignKey:OwnerEmail;references:Email"`
}

type Project struct {
	Base
	Title      string `json:"title" gorm:"unique"`
	Key        string `json:"key" gorm:"unique"`
	OwnerEmail string `json:"ownerEmail"`
	Sprints    []Sprint
}

type Sprint struct {
	Base
	Name      string    `json:"name" gorm:"unique"`
	Start     time.Time `json:"start"`
	End       time.Time `json:"end"`
	ProjectId string    `json:"projectId"`
}
