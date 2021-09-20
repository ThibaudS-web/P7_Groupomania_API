"use strict";

var express = require('express');

var router = express.Router();

var messageCtrl = require('../controllers/message');

var auth = require('../middlewares/auth');

var multer = require('../middlewares/multer-config');

router.get('/', auth, messageCtrl.getAllMessages);
router.post('/', auth, multer, messageCtrl.createMessage);
router.put('/:id', auth, messageCtrl.modfifyMessageUser);
module.exports = router;