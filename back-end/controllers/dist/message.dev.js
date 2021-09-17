"use strict";

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var jwt = require('jsonwebtoken');

var models = require('../models'); //Create a message


exports.createMessage = function (req, res, next) {
  //body request
  var title = req.body.title;
  var content = req.body.content;
  var userId = req.body.userId;
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
}; //Modify the user message 


exports.modfifyMessageUser = function (req, res, next) {
  var userId = req.body.userId;
  models.Message.findOne({
    where: {
      id: req.params.id
    }
  }).then(function (message) {
    if (userId == message.userId) {
      try {
        models.Message.update({
          content: req.body.content
        }, {
          where: {
            id: req.params.id
          }
        }).then(function (message) {
          return res.status(201).json(_defineProperty({
            message: message
          }, "message", 'Message updated ! '));
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
    } else {
      return res.status(401).json({
        message: 'You can\'t modify this message, userId not match !'
      });
    }
  })["catch"](function (error) {
    return res.status(404).json({
      error: error
    });
  });
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