const express = require('express');
const router = express.Router();

const services = require('../services/render')

router.get('/', services.index)
router.get('/login', services.login)
router.get('/register', services.register)
router.get('/home', services.home)
router.get('/home/callback', services.callback)



module.exports = router