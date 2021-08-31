const express = require('express')
const router = express.Router()
const messageCtrl = require('../controllers/message')

const auth = require('../middlewares/auth')

router.get('/', auth, messageCtrl.getAllMessages)
router.post('/', auth, messageCtrl.createMessage)

module.exports = router 