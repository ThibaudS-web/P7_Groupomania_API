const express = require('express')
const router = express.Router()
const userCtrl = require('../controllers/user')
const auth = require('../middlewares/auth')

//All user routes
router.post('/signup', userCtrl.signup)
router.post('/login', userCtrl.login)
router.get('/myProfil', auth,  userCtrl.getMyProfil)

module.exports = router 
