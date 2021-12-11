const express = require('express')
const router = express.Router()

const commentCtrl = require('../controllers/comment')
const { authUser } = require('../middlewares/auth')

router.get('/', authUser, commentCtrl.getAllComment)
router.post('/', authUser, commentCtrl.createComment)
router.put('/:id', authUser, commentCtrl.modifyComment)
router.delete('/:id', authUser, commentCtrl.deleteComment)


module.exports = router