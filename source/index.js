// MIDDLEWARE IMPORTS
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// ROUTE IMPORT
const routes = require('./index.routes');

// INSTANCE OF EXPRESS
const server = express();

//  REQ/RES MIDDLEWARE
server.use(bodyParser.urlencoded({ extended: false }));
server.use(express.json());

// CUSTOME MIDDLEWARE
server.use(checkAuthentication);

// MOUNTING ROUTES TO API PATH
server.use('/api', routes);

// Port and db connection
const port = 3000;
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true });
server.listen(port, () => console.log('listening!'));

module.exports = server; 