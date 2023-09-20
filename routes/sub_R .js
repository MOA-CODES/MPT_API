const express = require('express');
const router = express.Router();

const services = require('../services/render')

router.get('/home', services.register)

module.exports = router