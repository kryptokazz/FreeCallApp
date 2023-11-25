// models.go

package main

// User struct to map your user data
type User struct {
    UserID       int    `json:"user_id"`
    Username string `json:"username"`
    ProfileName string `json:"profile_name"`
}

