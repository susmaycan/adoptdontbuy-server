const express = require('express')
const bodyParser = require('body-parser')
var cors = require('cors')
const dotenv = require('dotenv')
dotenv.config()

const app = express()

app.use(bodyParser.urlencoded({ extended: true }))

app.use(bodyParser.json())

app.use(function (req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*")
    res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE')
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
    next()
})

const uri = process.env.mongodburi
const mongoose = require('mongoose')

mongoose.Promise = global.Promise

mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Successfully connected to the database")
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err)
    process.exit()
})

app.use(cors())
require('./app/routes/animal.routes.js')(app)
require('./app/routes/user.routes.js')(app)
require('./app/routes/review.routes.js')(app)

const PORT = process.env.PORT || 3001


app.listen(PORT, () => {
    console.log("Server is listening on port 3001")
})
