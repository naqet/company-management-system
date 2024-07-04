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

type TimeStamps struct {
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
	TimeStamps
	Key        string   `json:"key" gorm:"primaryKey"`
	Name       string   `json:"name" gorm:"unique"`
	Owner      User     `json:"owner" gorm:"references:Email"`
	OwnerEmail string   `json:"ownerEmail"`
	Teams      []Team   `json:"team" gorm:"foreignKey:ProjectKey"`
	Sprints    []Sprint `json:"sprints" gorm:"foreignKey:ProjectKey"`
}

type Team struct {
	Base
	Name        string `json:"name" gorm:"unique"`
	ProjectKey  string `json:"projectKey" gorm:"not null;check:project_key <> ''"`
	Leader      User   `json:"leader" gorm:"references:Email"`
	LeaderEmail string `json:"leaderEmail"`
	Members     []User `json:"members" gorm:"many2many:team_members;references:Email"`
}

type Sprint struct {
	Base
	Name       string    `json:"name" gorm:"unique"`
	Issues     []Issue   `json:"issues"`
	Start      time.Time `json:"start"`
	End        time.Time `json:"end"`
	ProjectKey string    `json:"projectKey"`
}

type Issue struct {
	ID        uint      `json:"id" gorm:"primaryKey;autoincrement"`
	CreatedAt time.Time `json:"createdAt"`
	UpdatedAt time.Time `json:"updatedAt"`

	Name          string   `json:"name" gorm:"unique;not null;check:name <> ''"`
	Description   string   `json:"description"`
	ProjectKey    string   `json:"projectKey" gorm:"not null;check:project_key <> ''"`
	Sprint        Sprint   `json:"sprint"`
	SprintId      string   `json:"sprintId"`
	Type          Type     `json:"type"`
	TypeName      string   `json:"typeName"`
	Status        Status   `json:"status"`
	StatusName    string   `json:"statusName"`
	Assignee      User     `json:"assignee" gorm:"foreignKey:AssigneeEmail;references:Email"`
	AssigneeEmail string   `json:"assigneeEmail"`
	Priority      Priority `json:"priority"`
	PriorityName  string   `json:"priorityName"`
}

const (
	TASK       = "Task"
	EPIC       = "Epic"
	USER_STORY = "User story"
)

type Type struct {
	TimeStamps
	Name string `json:"name" gorm:"primaryKey"`
}

const (
	TO_DO       = "To Do"
	IN_PROGRESS = "In progress"
	IN_REVIEW   = "In review"
	DONE        = "Done"
)

type Status struct {
	TimeStamps
	Name string `json:"name" gorm:"primaryKey"`
}

const (
	MINOR    = "Minor"
	MAJOR    = "Major"
	CRITICAL = "Critical"
)

type Priority struct {
	TimeStamps
	Name string `json:"name" gorm:"primaryKey"`
}
