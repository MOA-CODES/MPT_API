const express = require('express');
const router = express.Router()

const {register, login, verify_token} = require('../controllers/auth_C')

router.post('/login', login )
router.post('/register', register )
router.post('/verify_token', verify_token)

module.exports = router
