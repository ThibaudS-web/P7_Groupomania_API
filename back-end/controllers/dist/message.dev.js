"use strict";

var jwt = require('jsonwebtoken');

var models = require('../models');

var fs = require('fs');

var user = require('../models/user'); //Create a message


exports.createMessage = function (req, res, next) {
  //body request
  var title = req.body.title;
  var content = req.body.content;
  var userId = res.locals.userId;
  var newMessage = req.file ? {
    userId: userId,
    title: title,
    content: content,
    attachment: "".concat(req.protocol, "://").concat(req.get('host'), "/images-mess/").concat(req.file.filename)
  } : {
    userId: userId,
    title: title,
    content: content,
    attachment: null
  };

  try {
    models.Message.create(newMessage).then(function (newMessage) {
      return res.status(201).json(newMessage);
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


exports.modifyMessageUser = function (req, res, next) {
  var userId = res.locals.userId;
  var content = req.body.content;
  models.Message.findOne({
    where: {
      id: req.params.id
    }
  }).then(function (foundMessage) {
    if (userId == foundMessage.userId) {
      try {
        models.Message.update({
          content: content
        }, {
          where: {
            id: req.params.id
          }
        }).then(function (messageUpdated) {
          return res.status(201).json(messageUpdated);
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
      res.status(401).json({
        message: 'You can\'t modify this message!'
      });
    }
  })["catch"](function (error) {
    return res.status(404).json({
      error: error
    });
  });
}; //delete message


exports.deleteMessage = function (req, res, next) {
  var userId = res.locals.userId;

  try {
    models.Message.findOne({
      where: {
        id: req.params.id
      }
    }).then(function (foundMessage) {
      var filename = foundMessage.attachment ? foundMessage.attachment.split('/images-mess/')[1] : null;

      if (userId == foundMessage.userId && filename !== null) {
        fs.unlink("images-mess/".concat(filename), function () {
          models.Message.destroy({
            where: {
              id: req.params.id
            }
          }).then(function () {
            return res.status(200).json({
              message: 'Message Deleted !'
            });
          })["catch"](function (error) {
            return res.status(400).json({
              error: error
            });
          });
        });
      } else if (userId == foundMessage.userId && filename === null) {
        models.Message.destroy({
          where: {
            id: req.params.id
          }
        }).then(function () {
          return res.status(200).json({
            message: 'Message Deleted !'
          });
        })["catch"](function (error) {
          return res.status(400).json({
            error: error
          });
        });
      } else {
        res.status(401).json({
          message: 'You can\'t delete this message!'
        });
      }
    })["catch"](function (error, text) {
      return res.status(404).json({
        error: error
      });
    });
  } catch (error) {
    res.status(500).json({
      error: error
    });
  }
};

exports.getAllMessages = function (req, res, next) {
  try {
    models.Message.findAll({
      include: {
        model: models.User,
        attributes: ['username', 'picture']
      }
    }).then(function (messages) {
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