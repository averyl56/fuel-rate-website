const express = require('express');
const mysql = require('mysql');
const bcrypt = require('bcrypt');

require("dotenv").config();
const router = express.Router();

// signup route
router.post('/', async (req, res) => {
    let username = req.body.username;
    let password = req.body.password;

    // check if username and password are within length and username doesnt have any spaces
    if (username.length > 255) {
        throw new Error("Username is too long.");
    }
    if (username.includes(" ")) {
        throw new Error("Username cannot include spaces.");
    }
    if (password.length > 255) {
        throw new Error("Password is too long.");
    }

    // encrypt password
    let hashedPassword = await bcrypt.hash(password,10);
    const db = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "password",
        database: "fuel",
        port: 3306
    });

    db.connect(async (err) => {
        if (err) {
            console.log(err);
            throw new Error("Error connecting to database."); 
        }
        const sqlSearch = "SELECT * FROM UserCredentials WHERE username = ?";
        const sqlInsert = "INSERT INTO UserCredentials VALUES(0,?,?)"

        await db.query(sqlSearch,[username], async (err,result) => {
            if (err) {
                console.log(err);
                throw new Error("Error searching database.");
            }
            console.log("Search Results:");
            console.log(result.length);
            if (result.length != 0)  {
                console.log("Failed to create account. User already exists.")
                throw new Error("User already exists.");
            }
            else {
                await db.query(sqlInsert,[username,hashedPassword], async (err,result) => {
                    if (err) {
                        console.log(err);
                        throw new Error("Error adding user to database.");  
                    }
                    console.log("Created new user.");
                    res.send("Sign up successful!");
                });
            }
        });
    });
});

module.exports = router;