"use strict";

var _require = require("sequelize"),
    Sequelize = _require.Sequelize,
    DataTypes = _require.DataTypes;

var express = require('express');

var bodyParser = require('body-parser');

var rateLimit = require("express-rate-limit"); //Limit request : 10 per sec


var limiter = rateLimit({
  windowMs: 1000,
  // 1 second
  max: 10 // limit each IP to 10 requests per seconds

}); //import routes

var userRoutes = require('./routes/user');

var messageRoutes = require('./routes/message'); //Connexion at the database "groupomaniadb_development"
// const sequelize = new Sequelize("groupomaniadb_development", "root", "", {
//   host: "localhost",
//   dialect: "mysql",
// });


var db = require('./models/index');

var user = require('./models/user');

var message = require('./models/message'); //Test the connexion at the Database


try {
  db.sequelize.authenticate();
  console.log('Connection has been established successfully');
  db.sequelize.sync();
} catch (error) {
  console.error('Unable to connect to the database:', error);
}

var app = express(); //Setup headers

app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
}); //Body Parser configuration

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
app.use('/api/auth', userRoutes);
app.use('/api/messages', messageRoutes);
app.use(limiter);
module.exports = app;