// models.go

package main

// User struct to map your user data
type User struct {
    UserID       int    `json:"user_id"`
    Username string `json:"username"`
    ProfileName string `json:"profile_name"`
}


type Topic struct {
    TopicID     int    `json:"topic_id"`
    TopicName   string `json:"topic_name"`
    UserID      int    `json:"user_id"`
    CreatedAt   string `json:"created_at"`
    UpdatedAt   string `json:"updated_at"`
}
