const { Sequelize, DataTypes } = require("sequelize");
const express = require('express')
const bodyParser = require('body-parser')
const rateLimit = require("express-rate-limit")
const path = require ('path')


//Limit request : 10 per sec
const limiter = rateLimit({
    windowMs: 1000,  // 1 second
    max: 10 // limit each IP to 10 requests per seconds
});

//import routes
const userRoutes = require('./routes/user')
const messageRoutes = require('./routes/message')

const db = require('./models/index')
const user = require('./models/user')
const message = require('./models/message');
const comment = require('./models/comment')

//Test the connexion at the Database
try {
    db.sequelize.authenticate();
    console.log('Connection has been established successfully');
} catch (error) {
    console.error('Unable to connect to the database:', error);
}


const app = express()

//Setup headers
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS')
    next()
})

app.use('/images-mess', express.static(path.join(__dirname, 'images-mess')))
app.use('/images-prof', express.static(path.join(__dirname, 'images-prof')))

//Body Parser configuration
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use('/api/auth', userRoutes)
app.use('/api/messages', messageRoutes)

app.use(limiter)

module.exports = app