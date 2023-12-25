package main

import (
    "database/sql"
    "encoding/json"
    "fmt"
    "log"
    "net/http"
    "golang.org/x/crypto/bcrypt"
)

// UserLogin handles user login requests
func UserLogin(w http.ResponseWriter, r *http.Request, db *sql.DB) {
	var req UserLoginType
	err := json.NewDecoder(r.Body).Decode(&req)
	if err != nil {
		log.Println("Error decoding request:", err)
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	// Retrieve the user from the UserAuth table
	var passwordHash, salt string
	err = db.QueryRow("SELECT password, salt FROM UserAuth WHERE username = $1", req.Username).Scan(&passwordHash, &salt)
	if err == sql.ErrNoRows {
		log.Println("User not found")
		http.Error(w, "Invalid username or password", http.StatusUnauthorized)
		return
	} else if err != nil {
		log.Println("Error querying database:", err)
		http.Error(w, "Server error", http.StatusInternalServerError)
		return
	}

	// Compare the provided password with the stored hash using the retrieved salt
	err = bcrypt.CompareHashAndPassword([]byte(passwordHash), []byte(req.Password+salt))
	if err != nil {
		log.Println("Password comparison failed:", err)
		http.Error(w, "Invalid username or password", http.StatusUnauthorized)
		return
	}

	// Authentication successful
	fmt.Fprintln(w, "User authenticated successfully")
}



// usernameOrEmailExists checks if a username or email already exists in the database
func usernameOrEmailExists(username, email string, db *sql.DB) bool {
    var exists bool
    err := db.QueryRow("SELECT EXISTS(SELECT 1 FROM users WHERE username = $1  OR email = $2)", username, email).Scan(&exists)
    if err != nil {
        return false // or handle error appropriately
    }
    return exists
}

