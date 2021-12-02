const express = require('express')
const router = express.Router()

const commentCtrl = require('../controllers/comment')
const auth = require('../middlewares/auth')

router.get('/', auth, commentCtrl.getAllComment)
router.post('/', auth, commentCtrl.createComment)
router.put('/:id', auth, commentCtrl.modifyComment)
router.delete('/:id', auth, commentCtrl.deleteComment)


module.exports = router