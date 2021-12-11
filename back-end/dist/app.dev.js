"use strict";

var _require = require("sequelize"),
    Sequelize = _require.Sequelize,
    DataTypes = _require.DataTypes;

var express = require('express');

var bodyParser = require('body-parser');

var rateLimit = require("express-rate-limit");

var path = require('path'); //Limit request : 10 per sec


var limiter = rateLimit({
  windowMs: 1000,
  // 1 second
  max: 10 // limit each IP to 10 requests per seconds

}); //import routes

var userRoutes = require('./routes/user');

var messageRoutes = require('./routes/message');

var commentRoutes = require('./routes/comment');

var db = require('./models/index');

var user = require('./models/user');

var message = require('./models/message');

var comment = require('./models/comment');

var _require2 = require("./models/index"),
    sequelize = _require2.sequelize; //Test the connexion at the Database


(function _callee() {
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(db.sequelize.authenticate());

        case 3:
          console.log('Connection has been established successfully');
          _context.next = 9;
          break;

        case 6:
          _context.prev = 6;
          _context.t0 = _context["catch"](0);
          console.error('Unable to connect to the database:', _context.t0);

        case 9:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 6]]);
})();

var app = express(); //Setup headers

app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});
app.use('/images-mess', express["static"](path.join(__dirname, 'images-mess')));
app.use('/images-prof', express["static"](path.join(__dirname, 'images-prof'))); //Body Parser configuration

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
app.use('/api/comments', commentRoutes);
app.use('/api/auth', userRoutes);
app.use('/api/messages', messageRoutes);
app.use(limiter);
module.exports = app;