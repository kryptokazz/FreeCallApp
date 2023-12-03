func GetAllWords(db *sql.DB) ([]Word, error) {
    // Implementation to fetch all words from the database
}

func GetWordByID(db *sql.DB, id int) (Word, error) {
    // Implementation to fetch a single word by ID
}

func CreateWord(db *sql.DB, name string, setID int) (Word, error) {
    // Implementation to insert a new word into the database
}
