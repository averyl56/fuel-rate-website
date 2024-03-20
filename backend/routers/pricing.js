const express = require('express');
const router = express.Router();

// pricing route
router.post('/', (req, res) => {
    let gallons_req = req.body.gallons_req;
    // res.send(gallons_req);
    let address1 = req.body.address1;
    // res.send(address1);
    let delivery_date = req.body.delivery_date;
    // res.send(delivery_date);
    let suggestedPrice = req.body.suggestedPrice;
    res.send(suggestedPrice);
    res.send(totalAmount);
});

module.exports = router;


// Gallons Requested (numeric, requried)
// Delivery Address (Non-editable, comes from client profile)
// Delivery Date (Calender, date picker)
// Suggested Price / gallon (numeric non-editable)
// Total Amount Due (numeric non-editable, calculated (gallons * price))