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