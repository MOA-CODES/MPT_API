const customError = require('../middleware/customError')
const User = require('../models/user_M') 
const {StatusCodes} = require('http-status-codes')

const register = async (req, res) => {    
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
    
}

const refresh_token_spotify = async (req, res) => {

}

module.exports = {register, login, refresh_token_spotify, getAuthorization_spotify}