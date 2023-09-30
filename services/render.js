const axios = require('axios')

exports.index = (req, res) =>{
    res.render('index')
}

exports.login = (req, res) =>{
    res.render('login')
}

exports.register = (req, res) =>{
    res.render('register')
}

exports.home = (req, res) =>{
    res.render('home')
}

exports.callback = (req, res) =>{
    const stateKey = 'spotify_auth_state';

        const code = req.query.code || null; 
        const state = req.query.state || null;
        // const storedState = req.cookies ? req.cookies[stateKey] : null; // cant access the cookie now from here

    res.render('callback', {S_reponse:{code, state}});
}