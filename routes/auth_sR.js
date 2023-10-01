const express = require('express');
const router = express.Router()

const {refresh_token_spotify, getAccessToken_spotify, getAuthorization_spotify} = require('../controllers/auth_C')

router.get('/login', getAuthorization_spotify)
router.get('/access_token', getAccessToken_spotify)
router.post('/refresh_token', refresh_token_spotify)

module.exports = router
