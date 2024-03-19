const express = require('express');
const mysql = require('mysql');
const bcrypt = require('bcrypt');

require("dotenv").config();

const router = express.Router();

// login route
router.post('/login', async (req, res) => {
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

        db.query(sqlSearch,[username],(err,result) => {
            if (err) throw (err);
            if (result.length == 0) {
                console.log("Couldn't log in. User doesn't exist.");
                throw "User does not exist.";
            }
            else {
                let hashedPassword = result[0].password;
                if (bcrypt.compare(password,hashedPassword)) {
                    console.log("Username and password match.");
                    res.send("Login successful!");
                }
                else {
                    console.log("Password does not match.");
                    res.send("Password is incorrect.");
                }
            }
        });
    });
});

module.exports = router;