package main

import (
    "encoding/json"
    "net/http"
    "database/sql"
    "github.com/gorilla/mux"
)
// GetTopics retrieves all topics
func GetTopics(w http.ResponseWriter, r *http.Request) {
    db := connectDB()
    defer db.Close()

    rows, err := db.Query("SELECT topic_id, topic_name, user_id FROM Topics")
    if err != nil {
        http.Error(w, err.Error(), http.StatusInternalServerError)
        return
    }
    defer rows.Close()

    var topics []Topic
    for rows.Next() {
        var t Topic
        if err := rows.Scan(&t.TopicID, &t.TopicName, &t.UserID); err != nil {
            http.Error(w, err.Error(), http.StatusInternalServerError)
            return
        }
        topics = append(topics, t)
    }

    if err := rows.Err(); err != nil {
        http.Error(w, err.Error(), http.StatusInternalServerError)
        return
    }

    if topics == nil {
	    topics = []Topic{}
    }
    w.Header().Set("Content-Type", "application/json")
    json.NewEncoder(w).Encode(topics)
}


func GetTopicByID(w http.ResponseWriter, r *http.Request) {
    vars := mux.Vars(r)
    topicID := vars["topicId"]

    db := connectDB()
    defer db.Close()

    var topic Topic
    err := db.QueryRow("SELECT topic_id, topic_name, user_id FROM Topics WHERE topic_id = $1", topicID).Scan(&topic.TopicID, &topic.TopicName, &topic.UserID)
    if err != nil {
        if err == sql.ErrNoRows {
            http.NotFound(w, r)
            return
        }
        http.Error(w, err.Error(), http.StatusInternalServerError)
        return
    }

    json.NewEncoder(w).Encode(topic)
}


// CreateTopic creates a new topic
func CreateTopic(w http.ResponseWriter, r *http.Request) {
    var newTopic Topic
    // Decode the JSON request body
    if err := json.NewDecoder(r.Body).Decode(&newTopic); err != nil {
        http.Error(w, err.Error(), http.StatusBadRequest)
        return
    }

    db := connectDB()
    defer db.Close()

    // Validate that the user with the provided ID exists
    var userExists bool
    err := db.QueryRow("SELECT EXISTS (SELECT 1 FROM Users WHERE user_id = $1)", newTopic.UserID).Scan(&userExists)
    if err != nil {
        http.Error(w, err.Error(), http.StatusInternalServerError)
        return
    }

    if !userExists {
        http.Error(w, "User with the provided ID does not exist", http.StatusBadRequest)
        return
    }

    // Insert the new topic into the database
    var topicID int
    err = db.QueryRow("INSERT INTO Topics (topic_name, user_id) VALUES ($1, $2) RETURNING topic_id", newTopic.TopicName, newTopic.UserID).Scan(&topicID)
    if err != nil {
        http.Error(w, err.Error(), http.StatusInternalServerError)
        return
    }

    // Respond with the newly created topic ID in JSON format
    response := map[string]int{"topic_id": topicID}
    w.Header().Set("Content-Type", "application/json")
    w.WriteHeader(http.StatusCreated)
    json.NewEncoder(w).Encode(response)
}

// UpdateTopic updates a topic by ID
func UpdateTopic(w http.ResponseWriter, r *http.Request) {
    vars := mux.Vars(r)
    topicID := vars["topicId"]

    var updatedTopic Topic
    err := json.NewDecoder(r.Body).Decode(&updatedTopic)
    if err != nil {
        http.Error(w, err.Error(), http.StatusBadRequest)
        return
    }

    db := connectDB()
    defer db.Close()

    _, err = db.Exec("UPDATE Topics SET topic_name = $1, user_id = $2 WHERE topic_id = $3", updatedTopic.TopicName, updatedTopic.UserID, topicID)
    if err != nil {
        http.Error(w, err.Error(), http.StatusInternalServerError)
        return
    }

    w.WriteHeader(http.StatusOK)
}

// DeleteTopic deletes a topic by ID
func DeleteTopic(w http.ResponseWriter, r *http.Request) {
    vars := mux.Vars(r)
    topicID := vars["topicId"]

    db := connectDB()
    defer db.Close()

    _, err := db.Exec("DELETE FROM Topics WHERE topic_id = $1", topicID)
    if err != nil {
        http.Error(w, err.Error(), http.StatusInternalServerError)
        return
    }

    w.WriteHeader(http.StatusOK)
}
