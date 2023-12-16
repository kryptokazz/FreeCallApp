// handlers.go

package main

import (
    "encoding/json"
    "net/http"
    "github.com/gorilla/mux"
    "database/sql"

)

func getUsers(w http.ResponseWriter, r *http.Request) {
    db := connectDB()
    defer db.Close()

    rows, err := db.Query("SELECT user_id, username FROM users")
    if err != nil {
        http.Error(w, err.Error(), http.StatusInternalServerError)
        return
    }
    defer rows.Close()

    var users []User
    for rows.Next() {
        var u User
        if err := rows.Scan(&u.UserID, &u.Username); err != nil {
            http.Error(w, err.Error(), http.StatusInternalServerError)
            return
        }
        users = append(users, u)
    }

    if err := rows.Err(); err != nil {
        http.Error(w, err.Error(), http.StatusInternalServerError)
        return
    }
    if users == nil {
	    users = []User{}
    }
    w.Header().Set("Content-Type", "application/json")
    json.NewEncoder(w).Encode(users)
}

func createUser(w http.ResponseWriter, r *http.Request) {
    var newUser struct {
        Username     string `json:"username"`
        ProfileName  string `json:"profile_name"`
    }
    err := json.NewDecoder(r.Body).Decode(&newUser)
    if err != nil {
        http.Error(w, err.Error(), http.StatusBadRequest)
        return
    }

    db := connectDB()
    defer db.Close()

    var userID int
    err = db.QueryRow("INSERT INTO Users (username, profile_name) VALUES ($1, $2) RETURNING user_id", newUser.Username, newUser.ProfileName).Scan(&userID)
    if err != nil {
        http.Error(w, err.Error(), http.StatusInternalServerError)
        return
    }

    json.NewEncoder(w).Encode(map[string]int{"user_id": userID})
}



func updateUser(w http.ResponseWriter, r *http.Request) {
    userID := r.URL.Query().Get("userId")

    var updateData struct {
        Username    string `json:"username"`
        ProfileName string `json:"profile_name"`
    }
    err := json.NewDecoder(r.Body).Decode(&updateData)
    if err != nil {
        http.Error(w, err.Error(), http.StatusBadRequest)
        return
    }

    db := connectDB()
    defer db.Close()

    _, err = db.Exec("UPDATE Users SET username = $1, profile_name = $2 WHERE user_id = $3", updateData.Username, updateData.ProfileName, userID)
    if err != nil {
        http.Error(w, err.Error(), http.StatusInternalServerError)
        return
    }

    w.WriteHeader(http.StatusOK)
}
func getUserByID(w http.ResponseWriter, r *http.Request) {
    vars := mux.Vars(r) // Using gorilla/mux to extract route variables
    userID := vars["userId"]
    db := connectDB()

    defer db.Close()

    var user User
    err := db.QueryRow("SELECT user_id, username, profile_name FROM Users WHERE user_id = $1", userID).Scan(&user.UserID, &user.Username, &user.ProfileName)
    if err != nil {
        if err == sql.ErrNoRows {
            http.NotFound(w, r)
            return
        }
        http.Error(w, err.Error(), http.StatusInternalServerError)
        return
    }

    json.NewEncoder(w).Encode(user)
}

func deleteUser(w http.ResponseWriter, r *http.Request) {
    vars := mux.Vars(r)
    userID := vars["userId"] // Correctly assign userId from vars

    db := connectDB()
    defer db.Close()

    _, err := db.Exec("DELETE FROM Users WHERE user_id = $1", userID)
    if err != nil {
        http.Error(w, err.Error(), http.StatusInternalServerError)
        return
    }

    w.WriteHeader(http.StatusOK)
}

