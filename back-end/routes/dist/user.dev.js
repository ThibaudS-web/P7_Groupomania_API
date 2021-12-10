"use strict";

var express = require('express');

var router = express.Router();

var userCtrl = require('../controllers/user');

var _require = require('../middlewares/auth'),
    authUser = _require.authUser,
    authAdmin = _require.authAdmin;

var multerProfil = require('../middlewares/multer-config-prof'); //All user routes


router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);
router.get('/profils/:id', authUser, userCtrl.findOneProfil);
router.put('/profils/myProfil/bio', authUser, userCtrl.modifyBioProfil);
router.put('/profils/myProfil/picture', authUser, multerProfil, userCtrl.modifyPictureProfil);
router["delete"]('/profils/myProfil/picture', authUser, multerProfil, userCtrl.deletePictureProfil); //ADMIN routes 

router.get('/profils', authUser, authAdmin, userCtrl.findAllProfils);
router["delete"]('/profils/:id', authUser, authAdmin, userCtrl.deleteOneProfil);
module.exports = router;