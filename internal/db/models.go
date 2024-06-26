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
	Teams             []Team    `json:"teams" gorm:"many2many:team_members;foreignKey:Email;joinForeignKey:UserEmail"`
}

type Project struct {
	Base
	Title      string   `json:"title" gorm:"unique"`
	Key        string   `json:"key" gorm:"unique"`
	Owner      User     `json:"owner" gorm:"references:Email"`
	OwnerEmail string   `json:"ownerEmail"`
	Teams      []Team   `json:"team" gorm:"foreignKey:ProjectKey"`
	Sprints    []Sprint `json:"sprints" gorm:"foreignKey:ProjectKey"`
}

type Team struct {
	Base
	Name        string `json:"name" gorm:"unique"`
	ProjectKey  string `json:"projectKey"`
	Leader      User   `json:"leader" gorm:"references:Email"`
	LeaderEmail string `json:"leaderEmail"`
	Members     []User `json:"members" gorm:"many2many:team_members;references:Email"`
}

type Sprint struct {
	Base
	Name       string    `json:"name" gorm:"unique"`
	Start      time.Time `json:"start"`
	End        time.Time `json:"end"`
	ProjectKey string    `json:"projectKey"`
}

type Issue struct {
	ID          uint      `json:"id" gorm:"primaryKey;autoincrement"`
	Key         string    `json:"key"`
	Type        IssueType `json:"type"`
	CreatedAt   time.Time `json:"createdAt"`
	UpdatedAt   time.Time `json:"updatedAt"`
	ProjectKey  string    `json:"projectKey" gorm:"->"`
	Title       string    `json:"title"`
	Description string    `json:"description"`
}

type IssueType struct {
	Base
	Name string `json:"name" gorm:"unique:not null;check:title <> ''"`
}
