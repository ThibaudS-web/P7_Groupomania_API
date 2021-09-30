"use strict";

var express = require('express');

var router = express.Router();

var userCtrl = require('../controllers/user');

var auth = require('../middlewares/auth');

var multerProfil = require('../middlewares/multer-config-prof'); //All user routes


router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);
router.get('/profils/:id', auth, userCtrl.findOneProfil);
router.put('/profils/myProfil', auth, multerProfil, userCtrl.modifyProfil);
module.exports = router;