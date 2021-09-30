const express = require('express')
const router = express.Router()

const messageCtrl = require('../controllers/message')
const auth = require('../middlewares/auth')
const multerMessage = require('../middlewares/multer-config-mess')

router.get('/', auth, messageCtrl.getAllMessages)
router.post('/', auth, multerMessage, messageCtrl.createMessage)
router.put('/:id', auth, messageCtrl.modfifyMessageUser)

module.exports = router 