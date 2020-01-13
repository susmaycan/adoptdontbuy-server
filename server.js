const express = require('express');
const bodyParser = require('body-parser');
var cors = require('cors');
const path = require("path");

// create express app
const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse application/json
app.use(bodyParser.json())

app.use(function (req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// Configuring the database
const uri = "mongodb+srv://defaultuser:2WiI75ZCmEc037u8@adb-i6pvm.gcp.mongodb.net/test?retryWrites=true&w=majority";
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

// Connecting to the database
mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Successfully connected to the database");
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});

app.use(cors());
require('./app/routes/animal.routes.js')(app);
require('./app/routes/user.routes.js')(app);
// listen for requests
app.listen(3001, () => {
    console.log("Server is listening on port 3001");
});