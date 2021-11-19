const express = require('express')
const router = express.Router()
const userCtrl = require('../controllers/user')

const auth = require('../middlewares/auth')
const multerProfil = require('../middlewares/multer-config-prof')

//All user routes
router.post('/signup', userCtrl.signup)
router.post('/login', userCtrl.login)
router.get('/profils/:id', auth, userCtrl.findOneProfil)
// router.put('/profils/myProfil', auth, multerProfil, userCtrl.modifyProfil)
router.put('/profils/myProfil/bio', auth, userCtrl.modifyBioProfil)
router.put('/profils/myProfil/picture', auth, multerProfil, userCtrl.modifyPictureProfil)
router.delete('/profils/myProfil/picture', auth, multerProfil, userCtrl.deletePictureProfil)
module.exports = router 
