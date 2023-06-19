const mongoose = require('mongoose');

const commentSchema = mongoose.Schema({
    content:{
        type: String,
        rquired: true
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    post:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post'
    }
},{
    timeStamp:true
});

const Comment = mongoose.model('Comment',commentSchema);

module.exports = Comment