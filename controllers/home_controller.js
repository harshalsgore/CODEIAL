const Post = require('../models/post')

module.exports.home = function(req, res){
    //console.log(req.cookies);

    Post.find({})
    .populate('user')
    .populate({
        path:'comments',
        populate: {
            path: 'user'
        }
    })
    .then((posts) => {
        return res.render('home',{
            title: "Home",
            posts: posts
        });
    })
    .catch((err) => {
        console.log("Error finding the post");
        return;
    });

}