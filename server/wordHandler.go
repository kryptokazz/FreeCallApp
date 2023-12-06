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

// CreateWord adds a new word to a set
func CreateWord(w http.ResponseWriter, r *http.Request) {
    var word Word
    if err := json.NewDecoder(r.Body).Decode(&word); err != nil {
        http.Error(w, err.Error(), http.StatusBadRequest)
        return
    }

    db := connectDB()
    defer db.Close()

    stmt, err := db.Prepare("INSERT INTO words (word_name, set_id) VALUES ($1, $2) RETURNING word_id")
    if err != nil {
        http.Error(w, err.Error(), http.StatusInternalServerError)
        return
    }
    defer stmt.Close()

    err = stmt.QueryRow(word.WordName, word.SetID).Scan(&word.WordID)
    if err != nil {
        http.Error(w, err.Error(), http.StatusInternalServerError)
        return
    }

    w.WriteHeader(http.StatusCreated)
    json.NewEncoder(w).Encode(word)
}

// UpdateWord updates an existing word
func UpdateWord(w http.ResponseWriter, r *http.Request) {
    vars := mux.Vars(r)
    wordId, err := strconv.Atoi(vars["wordId"])
    if err != nil {
        http.Error(w, "Invalid word ID", http.StatusBadRequest)
        return
    }

    var updatedWord Word
    err = json.NewDecoder(r.Body).Decode(&updatedWord)
    if err != nil {
        http.Error(w, "Error decoding request body", http.StatusBadRequest)
        return
    }

    db := connectDB()
    defer db.Close()

    _, err = db.Exec("UPDATE words SET word_name = $1, set_id = $2 WHERE word_id = $3", updatedWord.WordName, updatedWord.SetID, wordId)
    if err != nil {
        http.Error(w, "Error updating word: "+err.Error(), http.StatusInternalServerError)
        return
    }

    w.WriteHeader(http.StatusOK)
    json.NewEncoder(w).Encode(updatedWord)

}


// DeleteWord removes a word
func DeleteWord(w http.ResponseWriter, r *http.Request) {
    vars := mux.Vars(r)
    wordId, err := strconv.Atoi(vars["wordId"])
    if err != nil {
        http.Error(w, "Invalid word ID", http.StatusBadRequest)
        return
    }

    db := connectDB()
    defer db.Close()

    _, err = db.Exec("DELETE FROM words WHERE word_id = $1", wordId)
    if err != nil {
        http.Error(w, "Error deleting word: "+err.Error(), http.StatusInternalServerError)
        return
    }

    w.WriteHeader(http.StatusOK)
    fmt.Fprintln(w, "Word deleted successfully")
}

