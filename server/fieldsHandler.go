package main

import (
    "encoding/json"
    "net/http"
    // If fieldsHandler.go is in a different package, import the models package here
    // "path/to/your/models"
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

