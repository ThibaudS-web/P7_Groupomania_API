"use strict";

var models = require('../models');

var fs = require('fs');

var destroyMessage = function destroyMessage(messageId, res) {
  return regeneratorRuntime.async(function destroyMessage$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(models.Message.destroy({
            where: {
              id: messageId
            }
          }));

        case 3:
          res.status(200).json({
            message: "Message Deleted!"
          });
          _context.next = 9;
          break;

        case 6:
          _context.prev = 6;
          _context.t0 = _context["catch"](0);
          res.status(400).json({
            error: _context.t0
          });

        case 9:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 6]]);
}; //Create a message


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
    models.Message.create(newMessage, {
      include: [{
        model: models.User,
        attributes: ['username', 'picture']
      }, {
        model: models.Comment
      }]
    }).then(function (newMessageJoinUser) {
      return res.status(201).json(newMessageJoinUser);
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


exports.deleteMessage = function _callee2(req, res, next) {
  var userId, currentUser, foundMessage, filename;
  return regeneratorRuntime.async(function _callee2$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          userId = res.locals.userId;
          _context3.prev = 1;
          _context3.next = 4;
          return regeneratorRuntime.awrap(models.User.findOne({
            attributes: ['isAdmin'],
            where: {
              id: userId
            }
          }));

        case 4:
          currentUser = _context3.sent;
          _context3.next = 7;
          return regeneratorRuntime.awrap(models.Message.findOne({
            where: {
              id: req.params.id
            }
          }));

        case 7:
          foundMessage = _context3.sent;
          filename = foundMessage.attachment ? foundMessage.attachment.split('/images-mess/')[1] : null;

          if (userId == foundMessage.userId || currentUser.isAdmin) {
            if (filename === null) {
              destroyMessage(foundMessage.id, res);
            } else {
              fs.unlink("images-mess/".concat(filename), function _callee() {
                return regeneratorRuntime.async(function _callee$(_context2) {
                  while (1) {
                    switch (_context2.prev = _context2.next) {
                      case 0:
                        destroyMessage(foundMessage.id, res);

                      case 1:
                      case "end":
                        return _context2.stop();
                    }
                  }
                });
              });
            }
          } else {
            res.status(401).json({
              message: 'You can\'t delete this message!'
            });
          }

          _context3.next = 15;
          break;

        case 12:
          _context3.prev = 12;
          _context3.t0 = _context3["catch"](1);
          res.status(500).json({
            error: _context3.t0
          });

        case 15:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[1, 12]]);
};

exports.getAllMessages = function (req, res, next) {
  try {
    models.Message.findAll({
      include: [{
        model: models.User,
        attributes: ['username', 'picture']
      }, {
        model: models.Comment,
        attributes: ['content', 'id', 'userId', 'createdAt'],
        include: [{
          model: models.User,
          attributes: ['username', 'picture', 'isAdmin']
        }]
      }],
      order: [['createdAt', 'DESC'], ['Comments', 'createdAt', 'ASC']]
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