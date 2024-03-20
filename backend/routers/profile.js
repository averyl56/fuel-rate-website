const express = require('express');
const mysql = require('mysql');

require("dotenv").config();

const router = express.Router();

// profile route
router.get('/:userId', (req,res) => {
    let id = req.params.userId;

    const db = mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
        port: process.env.DB_PORT
    });

    db.connect((err) => {
        if (err) {
            console.log(err);
            throw new Error("Error connecting to database.");
        }
        const sqlSearch = "SELECT name, address1, address2, city, state, zipcode FROM users WHERE userId = ?";

        db.query(sqlSearch,[id],(err,result) => {
            if (err) {
                console.log(err);
                throw new Error("Error searching database.");
            }
            console.log(result[0]);
            res.send(result[0]);
        });
    });
});

router.post('/', (req,res) => {
    let id = req.body.userId;
    let name = req.body.name;
    let address1 = req.body.address1;
    let address2 = req.body.address2;
    let city = req.body.city;
    let state = req.body.state;
    let zipcode = req.body.zipcode;

    if (name.length > 50) {
        throw new Error("Name cant be over 50 characters.");
    }
    if (address1.length > 100) {
        throw new Error("Address1 cant be over 100 characters.");
    }
    if (address2.length > 100) {
        throw new Error("Address2 cant be over 100 characters.");
    }
    if (city.length > 100) {
        throw new Error("City cant be over 100 characters.");
    }
    if (zipcode.length > 9 || zipcode.length < 5) {
        throw new Error("Zipcode must be within 5 to 9 characters.");
    }
    if (isNaN(zipcode)) {
        throw new Error("Zipcode can only contain digits.");
    }

    const db = mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
        port: process.env.DB_PORT
    });

    db.connect((err) => {
        if (err) {
            console.log(err);
            throw new Error("Error connecting to database.");
        }
        const sqlUpdate = "UPDATE users SET name = ?, address1 = ?, address2 = ?, city = ?, state = ?, zipcode = ? WHERE userId = ?";

        db.query(sqlUpdate,[name,address1,address2,city,state,zipcode,id],(err,result) => {
            if (err) {
                console.log(err);
                throw new Error("Error updating user info in database.");
            }
            console.log("Updated user profile.");
            res.send("Updated profile.");
        });
    });

});

module.exports = router;