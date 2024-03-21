const express = require('express');
const mysql = require('mysql');

require("dotenv").config();

const router = express.Router();

// pricing router
router.post('/', (req, res) => {
    let userId = req.body.userId;
    let gallonsRequested = req.body.gallonsRequested;
    let deliveryDate = req.body.deliveryDate;
    let state = req.body.state;

    const db = mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
        port: process.env.DB_PORT
    });

    let historyFactor = 0;

    db.connect((err) => {
        if (err) {
            console.log(err);
            throw new Error("Error connecting to database.");
        }

        // find if user has fuel quote history
        const sqlHistoryCount = "SELECT COUNT(*) FROM FuelQuote WHERE userId = ?";
        db.query(sqlHistoryCount,[userId], (err,result) => {
            if (err) {
                console.log(err);
                throw new Error("Error searching user's fuel quote history.");
            }
            historyFactor = (result[0]['COUNT(*)'] > 0) ? 0.01 : 0;
        });

    });
    let locationFactor = (state == "TX") ? 0.02 : 0.04;
    let gallonsRequestedFactor = (gallonsRequested > 1000) ? 0.02 : 0.03;
    let companyProfitFactor = 0.1;
    let currentPrice = 1.5;
    let margin = currentPrice * (locationFactor - historyFactor + gallonsRequestedFactor + companyProfitFactor);
    let suggestedPrice = currentPrice + margin;
    let totalAmount = suggestedPrice * gallonsRequested;
    res.send({suggestedPrice: suggestedPrice.toFixed(2), totalAmount: totalAmount.toFixed(2)});
});

module.exports = router;


// Gallons Requested (numeric, requried)
// Delivery Address (Non-editable, comes from client profile)
// Delivery Date (Calender, date picker)
// Suggested Price / gallon (numeric non-editable)
// Total Amount Due (numeric non-editable, calculated (gallons * price))