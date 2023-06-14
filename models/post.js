const { timeStamp } = require('console');
const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    content:{
        type: String,
        rquired: true
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
},{
    timeStamp:true
});

const Post = mongoose.model('Post',postSchema);

module.exports = Post