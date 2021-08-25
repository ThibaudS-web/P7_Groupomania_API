const express = require('express')
const router = express.Router()
const userCtrl = require('../controllers/user')

//All user routes
router.post('/users/signup', () => {
    userCtrl.signup
})
router.post('/users/login', () => {
    userCtrl.login
})

module.exports = router 
