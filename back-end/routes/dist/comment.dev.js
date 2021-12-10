"use strict";

var express = require('express');

var router = express.Router();

var commentCtrl = require('../controllers/comment');

var _require = require('../middlewares/auth'),
    authUser = _require.authUser;

router.get('/', authUser, commentCtrl.getAllComment);
router.post('/', authUser, commentCtrl.createComment);
router.put('/:id', authUser, commentCtrl.modifyComment);
router["delete"]('/:id', authUser, commentCtrl.deleteComment);
module.exports = router;