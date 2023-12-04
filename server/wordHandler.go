package main

import (
    "encoding/json"
    "net/http"
)


func GetWords(w http.ResponseWriter, r *http.Request) {
    db := connectDB()  // Ensure this function exists and correctly connects to your database
    defer db.Close()

    rows, err := db.Query("SELECT * FROM words")
    if err != nil {
        http.Error(w, err.Error(), http.StatusInternalServerError)
        return
    }
    defer rows.Close()

    var words []Word
    for rows.Next() {
        var word Word
        // Update the Scan to match the Word struct's fields
        if err := rows.Scan(&word.WordID, &word.WordName, &word.SetID); err != nil {
            http.Error(w, err.Error(), http.StatusInternalServerError)
            return
        }
        words = append(words, word)
    }

    if err := rows.Err(); err != nil {
        http.Error(w, err.Error(), http.StatusInternalServerError)
        return
    }

    json.NewEncoder(w).Encode(words)
}

