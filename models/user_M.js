const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
    
    name:{
        type: String,
        required: [true, 'Provide a name'],
        minlength: 3,
        maxlength: 20,
        unique:[true, 'That username is taken']
    },
    s_uid:{
        type:String,
        unique:true,
    },
    email:{
        type:String,
        required:[true, 'Provide a valid email address'],
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            'Provide a valid email address'
        ],
        unique: true,
    },
    password:{
        type:String,
        required:[true, 'Provide a valid password'],
        match:[
            /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{6,}$/,
            'Password length should be >6 & have at least one lowercase, uppercase & special character'
        ],
    }
    
},{timestamps:true})

userSchema.pre('save', async function (){

    const salt = await bcrypt.genSalt(8)
    this.password = await bcrypt.hash(this.password, salt)

})

userSchema.methods.comparePassword = async function(userPassword){
    const compare = await bcrypt.compare(userPassword, this.password)
    return compare
}

userSchema.methods.createJWT = function(){
    return jwt.sign({userId:this.id, s_uid:this.s_uid}, process.env.SECRET_KEY,{expiresIn:process.env.SECRET_TIME})
}

module.exports = mongoose.model('User', userSchema)