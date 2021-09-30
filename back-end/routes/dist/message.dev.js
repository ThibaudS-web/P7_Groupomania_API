"use strict";

var express = require('express');

var router = express.Router();

var messageCtrl = require('../controllers/message');

var auth = require('../middlewares/auth');

var multerMessage = require('../middlewares/multer-config-mess');

router.get('/', auth, messageCtrl.getAllMessages);
router.post('/', auth, multerMessage, messageCtrl.createMessage);
router.put('/:id', auth, messageCtrl.modfifyMessageUser);
module.exports = router;