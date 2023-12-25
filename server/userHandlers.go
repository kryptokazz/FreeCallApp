package main

import (
    "encoding/json"
    "golang.org/x/crypto/bcrypt"
    "net/http"
    "crypto/rand"
    "encoding/base64"
    "github.com/gorilla/mux"
    "database/sql"

)


func generateRandomSalt() (string, error) {
    const saltSize = 16
    bytes := make([]byte, saltSize)
    if _, err := rand.Read(bytes); err != nil {
        return "", err
    }
    return base64.StdEncoding.EncodeToString(bytes), nil
}





func getUsers(w http.ResponseWriter, r *http.Request) {
    db := connectDB()     
    defer db.Close()

    rows, err := db.Query("SELECT user_id, username, profile_name, email FROM users")
    if err != nil {
        http.Error(w, err.Error(), http.StatusInternalServerError)
        return
    }
    defer rows.Close()

    var users []User
    for rows.Next() {
        var u User
        if err := rows.Scan(&u.UserID, &u.Username, &u.ProfileName, &u.Email); err != nil {
            http.Error(w, err.Error(), http.StatusInternalServerError)
            return
        }
        users = append(users, u)
    }

    if err := rows.Err(); err != nil {
        http.Error(w, err.Error(), http.StatusInternalServerError)
        return
    }

    respondJSON(w, users)
}


func createUser(w http.ResponseWriter, r *http.Request) {
    var newUser UserRegisterType
    if err := json.NewDecoder(r.Body).Decode(&newUser); err != nil {
        http.Error(w, err.Error(), http.StatusBadRequest)
        return
    }

    // Generate a random salt
    salt, err := generateRandomSalt()
    if err != nil {
        http.Error(w, err.Error(), http.StatusInternalServerError)
        return
    }

    // Hash the password with the salt
    hashedPassword, err := bcrypt.GenerateFromPassword([]byte(newUser.Password+salt), bcrypt.DefaultCost)
    if err != nil {
        http.Error(w, err.Error(), http.StatusInternalServerError)
        return
    }

    db := connectDB()
    defer db.Close()

    var userID int

    // Insert into 'users' table
    err = db.QueryRow("INSERT INTO users (username, password, profile_name, email) VALUES ($1, $2, $3, $4) RETURNING user_id",
        newUser.Username, hashedPassword, newUser.ProfileName, newUser.Email).Scan(&userID)
    if err != nil {
        http.Error(w, err.Error(), http.StatusInternalServerError)
        return
    }

    // Insert into 'UserAuth' table
    _, err = db.Exec("INSERT INTO UserAuth (user_id, username, password, salt) VALUES ($1, $2, $3, $4)",
        userID, newUser.Username, string(hashedPassword), salt)
    if err != nil {
        http.Error(w, err.Error(), http.StatusInternalServerError)
        return
    }

    respondJSON(w, userID)
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
    userID := r.URL.Query().Get("userId")

    db := connectDB()
    defer db.Close()

    _, err := db.Exec("DELETE FROM Users WHERE user_id = $1", userID)
    if err != nil {
        http.Error(w, err.Error(), http.StatusInternalServerError)
        return
    }

    w.WriteHeader(http.StatusOK)

}


func respondJSON(w http.ResponseWriter, data interface{}) {
    w.Header().Set("Content-Type", "application/json")
    if err := json.NewEncoder(w).Encode(data); err != nil {
        http.Error(w, err.Error(), http.StatusInternalServerError)
    }
}
