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



      // Topics routes
    r.HandleFunc("/topics", GetTopics).Methods("GET")
    r.HandleFunc("/topics", CreateTopic).Methods("POST")
    r.HandleFunc("/topics/{topicId}", UpdateTopic).Methods("PUT")
    r.HandleFunc("/topics/{topicId}", DeleteTopic).Methods("DELETE")  
    r.HandleFunc("/topics/{topicId}", GetTopicByID).Methods("GET")

      // Serve the index.html file on the root URL
    r.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
        http.ServeFile(w, r, "static/welcome.html")
    })

    // Serve other static files
    r.PathPrefix("/").Handler(http.StripPrefix("/", http.FileServer(http.Dir("./static/"))))




    log.Println("Server is running on port 8080")
    log.Fatal(http.ListenAndServe(":8080", r))
}

