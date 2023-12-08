package main

import (
    "database/sql"
    "encoding/json"
    "fmt"
    "net/http"
    "golang.org/x/crypto/bcrypt"
)

// Assuming you have a global DB connection
var db *sql.DB

// UserLogin handles user login requests
func UserLogin(w http.ResponseWriter, r *http.Request) {
    var req UserLoginType
    err := json.NewDecoder(r.Body).Decode(&req)
    if err != nil {
        http.Error(w, err.Error(), http.StatusBadRequest)
        return
    }

    // Retrieve the user from the UserAuth table
    var passwordHash, salt string
    err = db.QueryRow("SELECT password_hash, salt FROM UserAuth WHERE username = ?", req.Username).Scan(&passwordHash, &salt)
    if err == sql.ErrNoRows {
        http.Error(w, "Invalid username or password", http.StatusUnauthorized)
        return
    } else if err != nil {
        http.Error(w, "Server error", http.StatusInternalServerError)
        return
    }

    // Compare the provided password with the stored hash
    err = bcrypt.CompareHashAndPassword([]byte(passwordHash), []byte(req.Password+salt))
    if err != nil {
        http.Error(w, "Invalid username or password", http.StatusUnauthorized)
        return
    }

    // Authentication successful
    fmt.Fprintln(w, "User authenticated successfully")
}

// UserRegister handles user registration requests
func UserRegister(w http.ResponseWriter, r *http.Request) {
    var req UserRegisterType
    err := json.NewDecoder(r.Body).Decode(&req)
    if err != nil {
        http.Error(w, "Invalid request body", http.StatusBadRequest)
        return
    }

    // Validate the request data
    if req.Username == "" || req.Password == "" || req.Email == "" {
        http.Error(w, "Missing required fields", http.StatusBadRequest)
        return
    }

    // Check if the username or email already exists
    if usernameOrEmailExists(req.Username, req.Email) {
        http.Error(w, "Username or email already exists", http.StatusBadRequest)
        return
    }

    // Hash the password
    hashedPassword, err := bcrypt.GenerateFromPassword([]byte(req.Password), bcrypt.DefaultCost)
    if err != nil {
        http.Error(w, "Server error", http.StatusInternalServerError)
        return
    }

    // Create the user in the database
    _, err = db.Exec("INSERT INTO users (username, password, email, profile_name) VALUES (?, ?, ?, ?)",
                     req.Username, string(hashedPassword), req.Email, req.ProfileName)
    if err != nil {
        http.Error(w, "Failed to create user", http.StatusInternalServerError)
        return
    }

    // If everything is successful
    w.WriteHeader(http.StatusCreated)
    w.Write([]byte("User created successfully"))
}


// usernameOrEmailExists checks if a username or email already exists in the database
func usernameOrEmailExists(username, email string) bool {
    var exists bool
    err := db.QueryRow("SELECT EXISTS(SELECT 1 FROM users WHERE username = ? OR email = ?)", username, email).Scan(&exists)
    if err != nil {
        return false // or handle error appropriately
    }
    return exists

 }
