const express = require('express')
const router = express.Router()

const messageCtrl = require('../controllers/message')
const auth = require('../middlewares/auth')
const multer = require('../middlewares/multer-config')

router.get('/', auth, messageCtrl.getAllMessages)
router.post('/', auth, multer, messageCtrl.createMessage)
router.put('/:id', auth, messageCtrl.modfifyMessageUser)

module.exports = router 