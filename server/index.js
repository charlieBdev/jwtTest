const express = require('express');
const app = express();
const cors = require('cors');

// middleware

app.use(express.json()); // req.body
app.use(cors());

// routes

// register and login routes
app.use('/auth', require('./routes/jwtAuth'));

// dashboard route
app.use('/dashboard', require('./routes/dashboard'));

module.exports = app;
