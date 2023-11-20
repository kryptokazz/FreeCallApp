// server.js
const express = require('express');
const cors = require('cors');
const app = express();
const pool = require('./db');

app.use(cors());
app.use(express.json());

const alldataRoutes = require('./routes/alldata');
const authRoutes = require('./routes/auth');
const usersRoutes = require('./routes/users');
const topicsRoutes = require('./routes/topics');
const setsRoutes = require('./routes/sets');
const fieldsRoutes = require('./routes/fields');
const wordsRoutes = require('./routes/words');
const commonRoutes = require('./routes/common');


app.use('/alldata', alldataRoutes);
app.use('/login', authRoutes);
app.use('/register', authRoutes);
app.use('/users', usersRoutes);
app.use('/topics', topicsRoutes);
app.use('/sets', setsRoutes);
app.use('/fields', fieldsRoutes);
app.use('/words', wordsRoutes);
app.use('/:tableName/:recordId', commonRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

