// main.go

package main

import (
	"log"
	"net/http"
	"database/sql"
	"github.com/gorilla/handlers"
	"github.com/gorilla/mux"
	"github.com/gorilla/sessions"
	"github.com/joho/godotenv"
)

// Assuming you have a global DB connection
var db *sql.DB
var store *sessions.CookieStore

func main() {
	r := mux.NewRouter()

	if err := godotenv.Load(); err != nil {
		log.Println("No .env file found")
	}

	// Initialize the database connection
	db = connectDB()
	defer db.Close()

	store = sessions.NewCookieStore([]byte("18073a03-a37e-4563-832d-92304277d31a"))
	// Register routes
	registerRoutes(r)

	// CORS configuration
	corsObj := handlers.AllowedOrigins([]string{"*"})
	methodsObj := handlers.AllowedMethods([]string{"GET", "POST", "OPTIONS", "PUT", "DELETE"})
	headersObj := handlers.AllowedHeaders([]string{"Content-Type", "X-Requested-With", "Authorization"})

	// Start the server
	log.Println("Server is running on port 5000")
	log.Fatal(http.ListenAndServe(":5000", handlers.CORS(corsObj, methodsObj, headersObj)(r)))
}

// registerRoutes registers all the routes
func registerRoutes(r *mux.Router) {
	// User routes
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

	// Sets routes
	r.HandleFunc("/sets", GetSets).Methods("GET")
	r.HandleFunc("/sets", CreateSet).Methods("POST")
	r.HandleFunc("/sets/{setId}", UpdateSet).Methods("PUT")
	r.HandleFunc("/sets/{setId}", DeleteSet).Methods("DELETE")

	// Authentication routes
	r.HandleFunc("/login", func(w http.ResponseWriter, r *http.Request) {
		UserLogin(w, r, db, store)
	}).Methods("POST")

	r.HandleFunc("/logout", func(w http.ResponseWriter, r *http.Request) { 
		LogoutHandler(w, r, store)
	}).Methods("POST")
			

	// Other routes (words, fields, etc.)
	r.HandleFunc("/words", GetWords).Methods("GET")
	r.HandleFunc("/fields", CreateField).Methods("POST")
	r.HandleFunc("/fields/{fieldId}", UpdateField).Methods("PUT")
	r.HandleFunc("/fields/{fieldId}", DeleteField).Methods("DELETE")

	// Serve the index.html file on the root URL
	r.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		http.ServeFile(w, r, "static/welcome.html")
	})

	// Serve 404 page
	r.HandleFunc("/404", func(w http.ResponseWriter, r *http.Request) {
		http.ServeFile(w, r, "static/404.html")
	})

	// Serve other static files
	r.PathPrefix("/").Handler(http.StripPrefix("/", http.FileServer(http.Dir("./static/"))))
}

