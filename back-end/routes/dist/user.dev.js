"use strict";

var express = require('express');

var router = express.Router();

var userCtrl = require('../controllers/user');

var auth = require('../middlewares/auth'); //All user routes


router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);
router.get('/myProfil', auth, userCtrl.getMyProfil);
module.exports = router;