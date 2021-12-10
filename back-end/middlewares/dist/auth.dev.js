"use strict";

var jwt = require('jsonwebtoken');

var models = require('../models');

var user = require('../models/user'); //Middleware to require user authentication


function authUser(req, res, next) {
  try {
    var token = req.headers.authorization.split(' ')[1];

    try {
      var decodedToken = jwt.verify(token, "".concat(process.env.TOKENPASS)); //In params, the token and the secret key

      res.locals.userId = decodedToken.userId;
      next();
    } catch (err) {
      console.log(err);
      throw 'User ID not valid !';
    }
  } catch (error) {
    res.status(401).json({
      error: error | 'Request unauthenticated !'
    });
  }
}

function authAdmin(req, res, next) {
  models.User.findOne({
    where: {
      id: res.locals.userId
    }
  }).then(function (foundProfil) {
    if (!foundProfil.isAdmin) {
      return res.status(403).json({
        message: 'Not allowed!'
      });
    } else {
      next();
    }
  });
}

module.exports = {
  authUser: authUser,
  authAdmin: authAdmin
};