// cors.go

package main

import (
	"github.com/gorilla/handlers"
	"net/http"
)

// CorsMiddleware adds CORS headers to the HTTP response.
func CorsMiddleware(next http.Handler) http.Handler {
	return handlers.CORS(
		handlers.AllowedOrigins([]string{"http://localhost:5173"}),
		handlers.AllowedMethods([]string{"GET", "POST", "OPTIONS", "PUT", "DELETE"}),
		handlers.AllowedHeaders([]string{"Content-Type", "X-Requested-With", "Authorization"}),
		handlers.AllowCredentials(),
	)(next)
}

