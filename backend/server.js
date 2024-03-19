// server.js
const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
const port = 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded());

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'your-mysql-username',
    password: 'your-mysql-password',
    database: 'your-database-name'
});

connection.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        return;
    }
    console.log('Connected to MySQL');
});

// login route
app.post('/login', (req, res) => {
    let username = req.body.username;
    res.send(username);
});

// signup route
app.post('/signup', (req, res) => {
    res.send("Sign up successful");
});

// POST route to save quote data
app.post('/quote', (req, res) => {
    const { username, gallonsRequested, totalPrice, date } = req.body;
    const INSERT_QUOTE_QUERY = `INSERT INTO quotes (username, gallonsRequested, totalPrice, date) VALUES (?, ?, ?, ?)`;
    connection.query(INSERT_QUOTE_QUERY, [username, gallonsRequested, totalPrice, date], (error, results) => {
        if (error) {
            console.error('Error saving quote:', error);
            res.status(500).send('Error saving quote');
            return;
        }
        res.status(201).json({ message: 'Quote saved successfully' });
    });
});

app.listen(port, () => {
    console.log("Fuel Rate Website Server");
});
