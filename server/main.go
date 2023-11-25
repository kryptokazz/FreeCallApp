// main.go

package main

import (
    "log"
    "net/http"
    "github.com/gorilla/mux"
   "github.com/joho/godotenv"
)

func main() {
    r := mux.NewRouter()

    if err := godotenv.Load(); err != nil {
        log.Println("No .env file found")
    }

    r.HandleFunc("/users", getUsers).Methods("GET")
    r.HandleFunc("/users", createUser).Methods("POST")
    r.HandleFunc("/users/{userId}", getUserByID).Methods("GET")
    r.HandleFunc("/users/{userId}", updateUser).Methods("PUT")
    r.HandleFunc("/users/{userId}", deleteUser).Methods("DELETE")
    // Add other routes here

    log.Println("Server is running on port 8080")
    log.Fatal(http.ListenAndServe(":8080", r))
}

