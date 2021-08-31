"use strict";

var jwt = require('jsonwebtoken'); //Middleware to require user authentication


module.exports = function (req, res, next) {
  try {
    var token = req.headers.authorization.split(' ')[1];
    var decodedToken = jwt.verify(token, "".concat(process.env.TOKENPASS)); //In params, the token and the secret key

    var userId = decodedToken.userId;

    if (req.body.userId && req.body.userId !== userId) {
      throw 'User ID not valid !';
    } else {
      //req.body.userId 
      next();
    }
  } catch (error) {
    res.status(401).json({
      error: error | 'Request unauthenticated !'
    });
  }
};