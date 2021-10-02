"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

//import bcrypt for hashing password in database 
var bcrypt = require('bcrypt');

var fs = require('fs');

var jwt = require('jsonwebtoken'); //Import user model


var models = require('../models'); //Controller for the POST sign up 


exports.signup = function _callee(req, res, next) {
  var email, username, password, EMAIL_REGEX, emailTest, PASSWORD_REGEX, passwordTest, userExist;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          //Body request
          email = req.body.email;
          username = req.body.username;
          password = req.body.password; //REGEX for mail

          EMAIL_REGEX = new RegExp('^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$', 'g');
          emailTest = EMAIL_REGEX.test(email); //REGEX for password # Min char : 6 / Max char : 12 / Min 1 lowercase / Min 1 uppercase / Min 1 number / Min 1 special char #

          PASSWORD_REGEX = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[ -/:-@\[-`{-~]).{6,12}$');
          passwordTest = PASSWORD_REGEX.test(password); //Return an error if password, email or username is an empty field

          if (!(password == undefined || email == undefined || username == undefined)) {
            _context.next = 9;
            break;
          }

          return _context.abrupt("return", res.status(400).json({
            error: 'required fields : password, email, username'
          }));

        case 9:
          if (!(username.length <= 2 || username.length >= 13)) {
            _context.next = 11;
            break;
          }

          return _context.abrupt("return", res.status(400).json({
            error: "username length should be between 3 and 12 characters"
          }));

        case 11:
          if (emailTest) {
            _context.next = 13;
            break;
          }

          return _context.abrupt("return", res.status(400).json({
            error: "Invalid email !"
          }));

        case 13:
          if (passwordTest) {
            _context.next = 15;
            break;
          }

          return _context.abrupt("return", res.status(400).json({
            error: "Invalid password : The password should be between 4 and 8 characters and must be include one number at least"
          }));

        case 15:
          _context.next = 17;
          return regeneratorRuntime.awrap(models.User.findOne({
            attributes: ['email'],
            where: {
              email: email
            }
          }));

        case 17:
          userExist = _context.sent;

          if (userExist) {
            _context.next = 22;
            break;
          }

          //Create newUser in database with bcrypt for hashing the password
          bcrypt.hash(password, 10).then(function (hash) {
            var newUser = {
              email: email,
              username: username,
              password: hash
            };
            models.User.create(newUser);
          }).then(function () {
            return res.status(201).json({
              message: 'User created !'
            });
          })["catch"](function (error) {
            return res.status(500).json({
              error: error
            });
          });
          _context.next = 23;
          break;

        case 22:
          return _context.abrupt("return", res.status(409).json({
            error: "User already exist !"
          }));

        case 23:
        case "end":
          return _context.stop();
      }
    }
  });
};

exports.login = function _callee2(req, res, next) {
  var email, password, user;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          //Body request
          email = req.body.email;
          password = req.body.password; //Return an error if password, email or username is an empty field

          if (!(password == undefined || email == undefined)) {
            _context2.next = 4;
            break;
          }

          return _context2.abrupt("return", res.status(400).json({
            error: 'required fields : password, email'
          }));

        case 4:
          _context2.next = 6;
          return regeneratorRuntime.awrap(models.User.findOne({
            where: {
              email: email
            }
          }));

        case 6:
          user = _context2.sent;

          if (!user) {
            _context2.next = 11;
            break;
          }

          bcrypt.compare(password, user.password).then(function (valid) {
            if (!valid) {
              return res.status(401).json({
                message: 'Wrong credentials !'
              });
            }

            var tokenUser = {
              userId: user.id,
              token: jwt.sign({
                userId: user.id
              }, "".concat(process.env.TOKENPASS), {
                expiresIn: '24h'
              })
            };
            res.status(200).json(tokenUser);
          });
          _context2.next = 12;
          break;

        case 11:
          return _context2.abrupt("return", res.status(401).json({
            message: 'User not found !'
          }));

        case 12:
        case "end":
          return _context2.stop();
      }
    }
  });
};

exports.findOneProfil = function (req, res, next) {
  var userId = req.params.id;
  models.User.findOne({
    attributes: ['id', 'bio', 'username', 'picture'],
    where: {
      id: userId
    }
  }).then(function (profil) {
    return res.status(200).json({
      profil: profil
    });
  })["catch"](function (error) {
    return res.status(404).json({
      error: error
    });
  });
};

exports.modifyProfil = function (req, res, next) {
  var userId = req.body.userId;
  var bio = req.body.bio;
  var username = req.body.username;
  var profilObject = req.file ? {
    bio: bio,
    username: username,
    picture: "".concat(req.protocol, "://").concat(req.get('host'), "/images-prof/").concat(req.file.filename)
  } : {
    bio: bio,
    username: username
  };

  if (req.file) {
    models.User.findOne({
      attributes: ['id', 'bio', 'username', 'picture'],
      where: {
        id: userId
      }
    }).then(function (profil) {
      if (userId == profil.id) {
        var filename = profil.picture.split('/images-prof/')[1];
        fs.unlink("images-prof/".concat(filename), function () {
          models.User.update(_objectSpread({}, profilObject), {
            where: {
              id: userId
            }
          }).then(function (profilObject) {
            return res.status(201).json({
              profilObject: profilObject,
              message: 'Profil was updated !'
            });
          })["catch"](function (error) {
            return res.status(400).json({
              error: error
            });
          });
        });
      } else {
        return res.status(401).json({
          message: 'You can\'t update this profil, userId not match !'
        });
      }
    })["catch"](function (error) {
      return res.status(400).json({
        error: error
      });
    });
  } else {
    models.User.update(_objectSpread({}, profilObject), {
      where: {
        id: userId
      }
    }).then(function (profil) {
      return res.status(201).json({
        profil: profil,
        message: 'Profil was updated !'
      });
    })["catch"](function (error) {
      return res.status(400).json({
        error: error
      });
    });
  }
}; //validation data node