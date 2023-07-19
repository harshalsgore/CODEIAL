const mongoose = require('mongoose');

const likeSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.ObjectId,
    },
    //defines object if of liked object
    likeable:{
        type: mongoose.Schema.ObjectId,
        require: true,
        refPath: 'onModel',
    },
    // this field is use to define type of liked object since this is dynamic ref
    onModel:{
        type: String,
        required: true,
        enum: ['Post','Comment']
    }
},{
    timestamps: true,
});

const Like = mongoose.model('Like',likeSchema);
module.exports = Like