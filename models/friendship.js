const mongoose = require('mongoose');

const friendshipSchema = mongoose.Schema({
    //User who sents the request
    from_user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    //User who accepts the request
    to_user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
},{
    timeStamp:true
});

const Friendship = mongoose.model('Friendship',friendshipSchema);

module.exports = Friendship