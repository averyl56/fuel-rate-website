const express = require('express');
const router = express.Router();

// signup route
app.post('/signup', (req, res) => {
    res.send("Sign up successful");
});

module.exports = router;