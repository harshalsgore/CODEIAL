const Comment = require('../models/comment')
const Post = require('../models/post')

module.exports.create = function(req, res){
    Post.findById(req.body.post)
    .then((post)=>{
        Comment.create({
            content: req.body.content,
            user: req.user._id,
            post: req.body.post
        })
        .then((comment) => {
            post.comments.push(comment);
            post.save();
            return res.redirect('/');
        })
        .catch((err) => {
            console.log("Error in adding comment",err);
            return;
        })
    })
    .catch((err)=>{
        console.log("Post Not Found");
    })
} 