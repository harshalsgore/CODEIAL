const Comment = require('../models/comment');
const Post = require('../models/post');
const commentsMailer = require('../mailers/comments_mailer');
const Like = require('../models/like');

module.exports.create = async function(req, res){

    try{
        let post = await Post.findById(req.body.post)
        
        if(post){
            let comment = await Comment.create({
                content: req.body.content,
                user: req.user._id,
                post: req.body.post
            })
            
            post.comments.push(comment);
            post.save();

            // Similar for comments to fetch the user's id!
            comment = await comment.populate('user', 'name email');
            commentsMailer.newComment(comment);

            if (req.xhr){
                return res.status(200).json({
                    data: {
                        comment: comment
                    },
                    message: "Post created!"
                });
            }
            
            req.flash('success','Comment Added!');
            return res.redirect('/');
        }
    }
    catch(err){
        req.flash('error',err);
        return res.redirect('back');
    }
}


module.exports.destroy = async function(req, res){

    try{
        let comment = await Comment.findById(req.params.id)
        if(comment){
            if(comment.user == req.user.id){
                
                let postId = comment.post
                comment.deleteOne();
                
                await Post.findByIdAndUpdate(postId, {$pull:{comments: req.params.id}});

                // destroy the associated likes for this comment
                await Like.deleteMany({likeable: comment._id, onModel: 'Comment'});

                if (req.xhr){
                    return res.status(200).json({
                        data: {
                            comment_id: req.params.id
                        },
                        message: "Post deleted"
                    });
                }
                
                req.flash('success','Comment Deleted!');
                return res.redirect('back')

            }
            else{
                req.flash('error','You cannot delete this Comment');
                return res.redirect('back');
            }
        }
    }
    catch(err){     
        req.flash('error',err);
        return res.redirect('back');
    }
}