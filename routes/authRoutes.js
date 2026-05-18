const {registerUser, loginUser, changePassword} = require('../controllers/authController')
const authMiddleware = require('../middleware/authMiddleware')
const express = require('express')
const router = express.Router()

router.post('/register', registerUser)
router.post('/login', loginUser)
router.post('/changePassword', authMiddleware,  changePassword)


module.exports = router;


