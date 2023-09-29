const customError = require('../middleware/customError')
const User = require('../models/user_M') 
const jwt = require('jsonwebtoken')
const querystring = require('querystring')
const {StatusCodes} = require('http-status-codes')

const register = async (req, res) => {    
    if (!req.body) {
        throw new customError('Provide name, email and password', StatusCodes.BAD_REQUEST)
    }

    req.body.s_uid = "replace with "+req.body.name+"'s spotify ID"

    const user = await User.create({...req.body})

    const token = user.createJWT()
    res.status(StatusCodes.CREATED).json({user:{userId:user._id, name: user.name, token}})
}

const login = async (req, res) => {
    const {email, password} = req.body

    if(!email || !password){
        throw new customError('Provide email and password', StatusCodes.BAD_REQUEST)
    }

    const user = await User.findOne({email})
    if(!user){
        throw new customError('Invalid Credentials', StatusCodes.UNAUTHORIZED)
    }
 
    const passwordCheck = await user.comparePassword(password)
    if(!passwordCheck){
        throw new customError('Invalid Credentials', StatusCodes.UNAUTHORIZED)
    }

    const token = user.createJWT()
    res.status(StatusCodes.OK).json({user:{_id: user._id, msg:`${user.name}, logged in sucessfully`, token}})
}

const getAuthorization_spotify = async (req, res) => {
    const client_id = process.env.CLIENT_ID
    const redirect_uri = process.env.redirect_uri
    const state = createState(10)
    const scope = 'user-read-private user-read-email'
    const stateKey = 'spotify_auth_state';

    res.cookie(stateKey, state)

    res.redirect('https://accounts.spotify.com/authorize?' +
        querystring.stringify({
          response_type: 'code',
          client_id: client_id,
          scope: scope,
          redirect_uri: redirect_uri,
          state:state  
        })
    )
}

const refresh_token_spotify = async (req, res) => {

}

const verify_token = async (req, res)=>{ //my user token
    const authHeader = req.headers.authorization
    if(!authHeader || !authHeader.startsWith('Bearer ')){
        throw new customError('Invalid Authentication', StatusCodes.UNAUTHORIZED)
    }

    const token = authHeader.split(' ')[1]

    try{
        const payload = jwt.verify(token, process.env.SECRET_KEY)

        res.status(StatusCodes.OK).json({data:{msg:'valid',payload}})

    }catch(err){
        throw new customError('Invalid Authentication', StatusCodes.UNAUTHORIZED)
    }
}

function createState(length){
    let state = ""
    const values = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ01234567890_!@#$%^&*()'

    for(let i =0; i < length; i++){
        state +=values.charAt(Math.floor(Math.random()*values.length))
    }

    return state
}

module.exports = {register, verify_token, login, refresh_token_spotify, getAuthorization_spotify}