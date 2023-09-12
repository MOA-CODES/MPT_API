const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
    s_uid:{
        type:String,
        unique:true,
    },
    name:{
        type: String,
        required: [true, 'Provide a name'],
        minlength: 3,
        maxlength: 20,
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
            'Password must at least one lowercase and uppercase character and one special character'
        ],
        unique:true,
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
    return jwt.sign({userId:this.id, password:this.password}, process.env.SECRET_KEY,{expiresIn:process.env.SECRET_TIME})
}

module.exports = mongoose.model('user', userSchema)