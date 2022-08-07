const express = require('express')
const router = express.Router()

const loginController = require('../controllers/loginController')
const signupController = require('../controllers/signupController')

router.post('/signup', signupController)
router.post('/login', loginController)

module.exports = router
