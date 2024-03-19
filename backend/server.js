const express = require('express');
const app = express();
const cors = require('cors');
const port = 5000;

app.use(cors());
/*app.use((req,res,next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    next();
});*/

// for parsing the data in POST requests
app.use(express.json());
app.use(express.urlencoded());

// routes:

// login route
app.post('/login', (req, res) => {
    let username = req.body.username;
    res.send(username);
});

// signup route
app.post('/signup', (req, res) => {
    res.send("Sign up successful");
});

app.listen(port, () => {
    console.log("Fuel Rate Website Server");
});