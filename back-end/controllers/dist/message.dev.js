"use strict";

var jwt = require('jsonwebtoken');

var models = require('../models'); //Create a message


exports.createMessage = function (req, res, next) {
  //body request
  var title = req.body.title;
  var content = req.body.content;
  var userId = req.body.userId; // const token = req.headers.authorization.split(' ')[1]
  // const decodedToken = jwt.decode(token)
  // const userId = decodedToken.userId

  var newMessage = {
    userId: userId,
    title: title,
    content: content
  };

  try {
    models.Message.create(newMessage).then(function () {
      return res.status(201).json({
        message: 'Message created !'
      });
    })["catch"](function (error) {
      return res.status(400).json({
        error: error
      });
    });
  } catch (error) {
    res.status(500).json({
      error: error
    });
  }
}; //Find all Messages


exports.getAllMessages = function (req, res, next) {
  try {
    models.Message.findAll().then(function (messages) {
      return res.status(200).json({
        messages: messages
      });
    })["catch"](function (error) {
      return res.status(400).json({
        error: error
      });
    });
  } catch (error) {
    res.status(500).json({
      error: error
    });
  }
};