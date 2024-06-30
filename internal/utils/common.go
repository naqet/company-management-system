package utils

import (
	"fmt"

	"github.com/naqet/company-management-system/internal/db"
)

const TimeFormat = "2006-01-02 15:04"

func GetKey(data db.Issue) string {
	return fmt.Sprintf("%s-%d", data.ProjectKey, data.ID)
}

func GetIssuesByStatus(issues []db.Issue, status string) []db.Issue {
    res := []db.Issue{}

    for _, issue := range issues {
        if issue.StatusName == status {
            res = append(res, issue)
        }
    }

    return res
}
