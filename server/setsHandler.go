package main

import (
    "encoding/json"
    "github.com/gorilla/mux"
    "strconv"
    "net/http"
)

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
        if err := rows.Scan(&s.SetID, &s.SetName, &s.TopicID, &s.CreatedAt, &s.UpdatedAt, &s.UserID ); err != nil {
            http.Error(w, err.Error(), http.StatusInternalServerError)
            return
        }
        sets = append(sets, s)
    }
    
    if sets == nil {
	    sets = []Set{}
    }

    if err := rows.Err(); err != nil {
        http.Error(w, err.Error(), http.StatusInternalServerError)
        return
    }
    w.Header().Set("Content-Type", "application/json")    
    json.NewEncoder(w).Encode(sets)
}

func CreateSet(w http.ResponseWriter, r *http.Request) {
    var set Set
    if err := json.NewDecoder(r.Body).Decode(&set); err != nil {
        http.Error(w, err.Error(), http.StatusBadRequest)
        return
    }

    db := connectDB()
    defer db.Close()

    stmt, err := db.Prepare("INSERT INTO sets (set_name, topic_id) VALUES ($1, $2) RETURNING set_id, set_name, topic_id, created_at, updated_at,user_id")
    if err != nil {
        http.Error(w, err.Error(), http.StatusInternalServerError)
        return
    }
    defer stmt.Close()

    err = stmt.QueryRow(set.SetName, set.TopicID).Scan(&set.SetID, &set.SetName, &set.TopicID, &set.CreatedAt, &set.UpdatedAt, &set.UserID)
    if err != nil {
        http.Error(w, err.Error(), http.StatusInternalServerError)
        return
    }

    json.NewEncoder(w).Encode(set)
}

// PutSet updates an existing set
func PutSet(w http.ResponseWriter, r *http.Request) {
    vars := mux.Vars(r)
    setId, err := strconv.Atoi(vars["setId"])
    if err != nil {
        http.Error(w, "Invalid set ID", http.StatusBadRequest)
        return
    }

    var updatedSet Set
    err = json.NewDecoder(r.Body).Decode(&updatedSet)
    if err != nil {
        http.Error(w, "Error decoding request body", http.StatusBadRequest)
        return
    }

    db := connectDB()
    defer db.Close()

    _, err = db.Exec("UPDATE sets SET set_name = $1, topic_id = $2 WHERE set_id = $3", updatedSet.SetName, updatedSet.TopicID, setId)
    if err != nil {
        http.Error(w, "Error updating set: "+err.Error(), http.StatusInternalServerError)
        return
    }

    w.WriteHeader(http.StatusOK)
    json.NewEncoder(w).Encode(updatedSet)
}
// DeleteSet removes a set
func DeleteSet(w http.ResponseWriter, r *http.Request) {
    vars := mux.Vars(r)
    setId, err := strconv.Atoi(vars["setId"])
    if err != nil {
        http.Error(w, "Invalid set ID", http.StatusBadRequest)
        return
    }

    db := connectDB()
    defer db.Close()

    _, err = db.Exec("DELETE FROM sets WHERE set_id = $1", setId)
    if err != nil {
        http.Error(w, "Error deleting set: "+err.Error(), http.StatusInternalServerError)
        return
    }

    w.WriteHeader(http.StatusOK)
    w.Write([]byte("Set deleted successfully"))
}

