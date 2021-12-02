"use strict";

var express = require('express');

var router = express.Router();

var commentCtrl = require('../controllers/comment');

var auth = require('../middlewares/auth');

router.get('/', auth, commentCtrl.getAllComment);
router.post('/', auth, commentCtrl.createComment);
router.put('/:id', auth, commentCtrl.modifyComment);
router["delete"]('/:id', auth, commentCtrl.deleteComment);
module.exports = router;