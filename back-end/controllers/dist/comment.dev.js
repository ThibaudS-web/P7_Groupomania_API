"use strict";

var models = require('../models');

exports.createComment = function (req, res, next) {
  var content = req.body.content;
  var userId = res.locals.userId;
  var messageId = req.body.messageId;
  var newComment = {
    userId: userId,
    messageId: messageId,
    content: content
  };

  try {
    models.Comment.create(newComment, {
      include: [{
        model: models.User,
        attributes: ['username', 'picture']
      }]
    }).then(function (newJoinComment) {
      return res.status(201).json(newJoinComment);
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

exports.modifyComment = function (req, res, next) {
  var content = req.body.content;
  var userId = res.locals.userId;
  models.Comment.findOne({
    where: {
      id: req.params.id
    }
  }).then(function (foundComment) {
    if (userId == foundComment.userId) {
      try {
        models.Comment.update({
          content: content
        }, {
          where: {
            id: req.params.id
          }
        }).then(function (updatedComment) {
          return res.status(201).json(updatedComment);
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
        message: 'You can\'t modify this Comment!'
      });
    }
  })["catch"](function (error) {
    return res.status(404).json({
      error: error
    });
  });
};

exports.deleteComment = function (req, res, next) {
  var userId = res.locals.userId;

  try {
    models.Comment.findOne({
      where: {
        id: req.params.id
      }
    }).then(function (foundComment) {
      if (foundComment.userId == userId) {
        models.Comment.destroy({
          where: {
            id: req.params.id
          }
        }).then(function () {
          return res.status(200).json({
            message: 'Comment Deleted !'
          });
        })["catch"](function (error) {
          return res.status(400).json({
            error: error
          });
        });
      } else {
        res.status(401).json({
          message: 'You can\'t delete this comment!'
        });
      }
    })["catch"](function (error) {
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

exports.getAllComment = function (req, res, next) {
  try {
    models.Comment.findAll({}).then(function (comments) {
      return res.status(200).json({
        comments: comments
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