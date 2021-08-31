"use strict";

var jwt = require('jsonwebtoken');

var models = require('../models');

exports.createMessage = function (req, res, next) {
  //body request
  var title = req.body.title;
  var content = req.body.content;
  var token = req.headers.authorization.split(' ')[1];
  var decodedToken = jwt.decode(token);
  var userId = decodedToken.userId;
  var newMessage = {
    userId: userId,
    title: title,
    content: content
  };
  models.Message.create(newMessage).then(function () {
    return res.status(201).json({
      message: 'Message created !'
    });
  })["catch"](function (error) {
    return res.status(400).json({
      error: error
    });
  });
};

exports.getAllMessages = function _callee(req, res, next) {
  var messages, readAllMessage;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(models.Message.findAll());

        case 2:
          messages = _context.sent;
          readAllMessage = messages.every(function (messages) {
            return messages instanceof Message;
          });
          res.status(200).json({
            readAllMessage: readAllMessage
          });

        case 5:
        case "end":
          return _context.stop();
      }
    }
  });
}; // // Find all users
// const users = await User.findAll();
// console.log(users.every(user => user instanceof User)); // true
// console.log("All users:", JSON.stringify(users, null, 2));