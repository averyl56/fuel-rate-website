const express = require('express');
const router = express.Router();

// login route
router.post('/login', (req, res) => {
    let username = req.body.username;
    res.send(username);
});

module.exports = router;