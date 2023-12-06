package main

import (
    "encoding/json"
    "net/http"
    "fmt"
    "github.com/gorilla/mux"
    "strconv"
)

func GetFields(w http.ResponseWriter, r *http.Request) {
    db := connectDB()
    defer db.Close()

    rows, err := db.Query("SELECT field_id, field_name, field_type, set_id, created_at FROM fields")
    if err != nil {
        http.Error(w, "Error querying fields: "+err.Error(), http.StatusInternalServerError)
        return
    }
    defer rows.Close()

    var fields []Field // Use Field directly if it's in the same package
    for rows.Next() {
        var field Field
        if err := rows.Scan(&field.FieldID, &field.FieldName, &field.FieldType, &field.SetID, &field.CreatedAt, &field.UpdatedAt); err != nil {
            http.Error(w, "Error scanning fields: "+err.Error(), http.StatusInternalServerError)
            return
        }
        fields = append(fields, field)
    }

    if err := rows.Err(); err != nil {
        http.Error(w, "Error reading fields: "+err.Error(), http.StatusInternalServerError)
        return
    }

    w.Header().Set("Content-Type", "application/json")
    json.NewEncoder(w).Encode(fields)
}


// CreateField creates a new field
func CreateField(w http.ResponseWriter, r *http.Request) {
    var field Field
    if err := json.NewDecoder(r.Body).Decode(&field); err != nil {
        http.Error(w, err.Error(), http.StatusBadRequest)
        return
    }

    db := connectDB()
    defer db.Close()

    stmt, err := db.Prepare("INSERT INTO fields (field_name, field_type, set_id) VALUES ($1, $2, $3) RETURNING field_id")
    if err != nil {
        http.Error(w, err.Error(), http.StatusInternalServerError)
        return
    }
    defer stmt.Close()

    err = stmt.QueryRow(field.FieldName, field.FieldType, field.SetID).Scan(&field.FieldID)
    if err != nil {
        http.Error(w, err.Error(), http.StatusInternalServerError)
        return
    }

    w.WriteHeader(http.StatusCreated)
    json.NewEncoder(w).Encode(field)
}


// UpdateField updates an existing field
func UpdateField(w http.ResponseWriter, r *http.Request) {
    vars := mux.Vars(r)
    fieldId, err := strconv.Atoi(vars["fieldId"])
    if err != nil {
        http.Error(w, "Invalid field ID", http.StatusBadRequest)
        return
    }

    var updatedField Field
    err = json.NewDecoder(r.Body).Decode(&updatedField)
    if err != nil {
        http.Error(w, "Error decoding request body", http.StatusBadRequest)
        return
    }

    db := connectDB()
    defer db.Close()

    _, err = db.Exec("UPDATE fields SET field_name = $1, field_type = $2, set_id = $3 WHERE field_id = $4", updatedField.FieldName, updatedField.FieldType, updatedField.SetID, fieldId)
    if err != nil {
        http.Error(w, "Error updating field: "+err.Error(), http.StatusInternalServerError)
        return
    }

    w.WriteHeader(http.StatusOK)
    json.NewEncoder(w).Encode(updatedField)
}


// DeleteField removes a field
func DeleteField(w http.ResponseWriter, r *http.Request) {
    vars := mux.Vars(r)
    fieldId, err := strconv.Atoi(vars["fieldId"])
    if err != nil {
        http.Error(w, "Invalid field ID", http.StatusBadRequest)
        return
    }

    db := connectDB()
    defer db.Close()

    _, err = db.Exec("DELETE FROM fields WHERE field_id = $1", fieldId)
    if err != nil {
        http.Error(w, "Error deleting field: "+err.Error(), http.StatusInternalServerError)
        return
    }

    w.WriteHeader(http.StatusOK)
    fmt.Fprintln(w, "Field deleted successfully")
}



