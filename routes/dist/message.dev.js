"use strict";

var express = require('express');

var router = express.Router();

var messageCtrl = require('../controllers/message');

var _require = require('../middlewares/auth'),
    authUser = _require.authUser;

var multerMessage = require('../middlewares/multer-config-mess');

router.get('/', authUser, messageCtrl.getAllMessages);
router.post('/', authUser, multerMessage, messageCtrl.createMessage);
router.put('/:id', authUser, messageCtrl.modifyMessageUser);
router["delete"]('/:id', authUser, messageCtrl.deleteMessage);
module.exports = router;