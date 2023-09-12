const mongoose = require('mongoose');

const playlistSchema = new mongoose.model({

    s_pid:{
        type: String,
    },
    name:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    public:{
        type:Boolean,
        default:true,
    },
    collaborative:{
        type:Boolean,
        default:false,
    },
    madeBy:{
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true,
    }

},{timestamps:true})

module.exports = mongoose.model('Playlist', playlistSchema)