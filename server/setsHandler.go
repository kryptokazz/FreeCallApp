package main

import (
    "encoding/json"
    "net/http"
)
// GetTopics retrieves all topics
func GetSets(w http.ResponseWriter, r *http.Request) {
    db := connectDB()
    defer db.Close()

    rows, err := db.Query("SELECT * FROM sets")
    if err != nil {
        http.Error(w, err.Error(), http.StatusInternalServerError)
        return
    }
    defer rows.Close()

    var sets []Set
    for rows.Next() {
        var s Set
        if err := rows.Scan(&s.SetID, &s.SetName, &s.TopicID, &s.CreatedAt, &s.UpdatedAt); err != nil {
            http.Error(w, err.Error(), http.StatusInternalServerError)
            return
        }
        sets = append(sets, s)
    }

    if err := rows.Err(); err != nil {
        http.Error(w, err.Error(), http.StatusInternalServerError)
        return
    }

    json.NewEncoder(w).Encode(sets)
}


