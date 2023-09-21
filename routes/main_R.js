const express = require('express');
const router = express.Router();

const services = require('../services/render')

router.get('/', services.index)
router.get('/login', services.login)
router.get('/register', services.register)

module.exports = router