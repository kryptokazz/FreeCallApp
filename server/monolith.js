// server.js
const express = require("express");
const cors = require("cors");
const app = express();
const { getAllData } = require("./controllers/alldataController");
const { loginUser, registerUser } = require("./controllers/authController");
const { getAllUsers, getUserById, deleteUserById } = require("./controllers/usersController");
const { getAllTopics, createTopic } = require("./controllers/topicsController");
const { getAllSets, createSet } = require("./controllers/setsController");
const { getAllFields, createField } = require("./controllers/fieldsController");
const { getAllWords, createWord } = require("./controllers/wordsController");
const { deleteRecord, updateRecord } = require("./controllers/commonController");

app.use(cors());
app.use(express.json());

// Routes
app.get('/alldata', getAllData);
app.post('/login', loginUser);
app.post('/register', registerUser);

// Users
app.get('/users', getAllUsers);
app.get('/users/:userId', getUserById);
app.delete('/users/:userId', deleteUserById);

// Topics
app.get('/topics', getAllTopics);
app.post('/topics', createTopic);

// Sets
app.get('/sets', getAllSets);
app.post('/sets', createSet);

// Fields
app.get('/fields', getAllFields);
app.post('/fields', createField);

// Words
app.get('/words', getAllWords);
app.post('/words', createWord);

// Common Routes for deleting and updating records
app.delete('/:tableName/:recordId', deleteRecord);
app.put('/:tableName/:recordId', updateRecord);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

