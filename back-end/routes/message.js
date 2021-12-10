const express = require('express')
const router = express.Router()

const messageCtrl = require('../controllers/message')
const { authUser } = require('../middlewares/auth')
const multerMessage = require('../middlewares/multer-config-mess')

router.get('/', authUser, messageCtrl.getAllMessages)
router.post('/', authUser, multerMessage, messageCtrl.createMessage)
router.put('/:id', authUser, messageCtrl.modifyMessageUser)
router.delete('/:id', authUser, messageCtrl.deleteMessage)



module.exports = router