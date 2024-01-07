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
	"os" // Add the missing import for "os"
)

// Assuming you have a global DB connection
var db *sql.DB
var store = sessions.NewCookieStore([]byte(os.Getenv("SESSION_KEY")))

func main() {
	r := mux.NewRouter()

	if err := godotenv.Load(); err != nil {
		log.Println("No .env file found")
	}

	// Initialize the database connection
	db = connectDB()
	defer db.Close()

	// Serve static files
	staticDir := "/static/"
	r.PathPrefix(staticDir).Handler(http.StripPrefix(staticDir, http.FileServer(http.Dir("assets"))))

	// Register routes
	registerRoutes(r)

	// CORS configuration
	corsObj := handlers.CORS(
		handlers.AllowedOrigins([]string{"*"}),
		handlers.AllowedMethods([]string{"GET", "POST", "OPTIONS", "PUT", "DELETE"}),
		handlers.AllowedHeaders([]string{"Content-Type", "X-Requested-With", "Authorization"}),
		handlers.AllowCredentials(),
	)

	// Start the server
	log.Println("Server is running on port 5000")
	log.Fatal(http.ListenAndServe(":5000", corsObj(r)))
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


}



func serveStaticFile(w http.ResponseWriter, r *http.Request, fileName, contentType string) {
    filePath := "static/" + fileName
    w.Header().Set("Content-Type", contentType+"; charset=utf-8")
    http.ServeFile(w, r, filePath)
}





