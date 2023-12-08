package main

import (
    "database/sql"
    "time"
)


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

type Set struct {
    SetID     int    `json:"set_id"`
    SetName   string `json:"set_name"`
    TopicID   int    `json:"topic_id"`
    CreatedAt string `json:"created_at,omitempty"`
    UpdatedAt string `json:"updated_at,omitempty"`
    UserID sql.NullInt64 `json:"user_id"`
}


type Word struct {
    WordID   int    `json:"word_id"`
    WordName string `json:"word_name"`
    SetID    int    `json:"set_id"`
}

type Field struct {
    FieldID    int       `json:"field_id"`
    FieldName  string    `json:"field_name" validate:"required"`
    FieldType  string    `json:"field_type" validate:"required"`
    SetID      int       `json:"set_id" validate:"required"`
    CreatedAt  time.Time `json:"created_at"`
    UpdatedAt  time.Time `json:"updated_at"`
}

// UserLoginRequest represents the request body for login
type UserLoginType struct {
    Username string `json:"username"`
    Password string `json:"password"`
}


// UserRegisterRequest represents the request body for user registration
type UserRegisterType struct {
    Username    string `json:"username"`
    Password    string `json:"password"`
    Email       string `json:"email"`
    ProfileName string `json:"profile_name,omitempty"` // Optional, depending on your requirements
}

