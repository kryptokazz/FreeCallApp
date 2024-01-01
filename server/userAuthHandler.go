package main

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"golang.org/x/crypto/bcrypt"
	"github.com/gorilla/sessions"
)
// UserLogin handles user login requests
func UserLogin(w http.ResponseWriter, r *http.Request, db *sql.DB, store *sessions.CookieStore) {
	var req UserLoginType
	err := json.NewDecoder(r.Body).Decode(&req)
	if err != nil {
		log.Println("Error decoding request:", err)
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	// Retrieve the user from the UserAuth table
	var userID int
	var passwordHash, salt string
	err = db.QueryRow("SELECT user_id, password, salt FROM UserAuth WHERE username = $1", req.Username).Scan(&userID, &passwordHash, &salt)
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

	// Create a session for the user
	session, err := store.Get(r, "user-session")
	if err != nil {
		log.Println("Error getting session:", err)
		http.Error(w, "Server error", http.StatusInternalServerError)
		return
	}

	// Set session values
	session.Values["authenticated"] = true
	session.Values["userID"] = userID
	session.Values["username"] = req.Username

	// Save the session
	err = session.Save(r, w)
	if err != nil {
		log.Println("Error saving session:", err)
		http.Error(w, "Server error", http.StatusInternalServerError)
		return
	}

	// Log session values for debugging
	log.Println("Session values after login:")
	log.Println("Authenticated:", session.Values["authenticated"])
	log.Println("UserID:", session.Values["userID"])
	log.Println("Username:", session.Values["username"])

	// Respond with a success message
	fmt.Fprintln(w, "User authenticated successfully")
}

// LogoutHandler handles user logout requests
func LogoutHandler(w http.ResponseWriter, r *http.Request, store *sessions.CookieStore) {
	session, err := store.Get(r, "user-session")
	if err != nil {
		log.Println("Error getting session:", err)
		http.Error(w, "Server error", http.StatusInternalServerError)
		return
	}

	// Clear session values
	for key := range session.Values {
		delete(session.Values, key)
	}

	// Save the empty session to clear it
	err = session.Save(r, w)
	if err != nil {
		log.Println("Error saving session:", err)
		http.Error(w, "Server error", http.StatusInternalServerError)
		return
	}

	// Respond with a success message
	fmt.Fprintln(w, "User logged out successfully")
}

