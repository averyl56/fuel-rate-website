// main back end file

// to start server, run command in backend folder: "node server.js"

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

// for creating different routes:
// create a file in the router folder for each endpoint api
// create an express router object in the file that handles each api call
// for the profile router, create 2 routes: GET for retreiving the users info when the page is loaded and POST for changing their profile info
// for the GET routes (profile and quote history), look up how to read parameters in the route link for the username, ex: "/profile?=username" or "/profile/username"
// then import the router and use it down below
// use for database calls in your router file: const mysql = require('mysql');

// routes:

// login route
const login = require('./routers/login'); // import the login route from the routers folder
app.use('/login',login); // set the login router to the login call

// signup route
const signup = require('./routers/signup');
app.use('/signup',signup);

// pricing route
const pricing = require('./routers/pricing');
app.use('/pricing',pricing);

// profile route
const profile = require('./routers/profile');
app.use('./profile',profile);

// starts the server on port 5000
app.listen(port, () => {
    console.log("Fuel Rate Website Server");
});

