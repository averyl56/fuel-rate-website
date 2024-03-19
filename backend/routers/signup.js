const express = require('express');
const mysql = require('mysql');
const bcrypt = require('bcrypt');

require("dotenv").config();
const router = express.Router();

// signup route
app.post('/signup', (req, res) => {
    let username = req.body.username;
    let password = req.body.password;

    // check if username and password are within length and username doesnt have any spaces
    if (username.length > 255) {
        throw "Username is too long.";
    }
    if (username.includes(" ")) {
        throw "Username cannot include spaces.";
    }
    if (password.length > 255) {
        throw "Password is too long.";
    }

    // encrypt password
    let hashedPassword = bcrypt.hash(password,10);
    const db = mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
        port: process.env.DB_PORT
    });

    db.connect((err) => {
        if (err) throw (err);
        const sqlSearch = "SELECT * FROM users WHERE username = ?";
        const sqlInsert = "INSERT INTO users VALUES(0,?,?)"

        db.query(sqlSearch,[username], (err,result) => {
            if (err) throw (err);
            console.log("Search Results:");
            console.log(result.length);
            if (result.length != 0)  {
                console.log("Failed to create account. User already exists.")
                throw "User already exists.";
            }
            else {
                db.query(sqlInsert,[username,hashedPassword], (err,result) => {
                    if (err) throw (err);
                    console.log("Created new user.");
                    res.send("Sign up successful!");
                });
            }
        });
    });
});

module.exports = router;