const Post = require('../models/post');
const User = require('../models/user');
const Friendship = require('../models/friendship');

module.exports.home = async function(req, res){

    try{
        // populate the user of each post
        let posts = await Post.find({})
        .sort('-createdAt')
        .populate('user')
        .populate({
            path: 'comments',
            populate: {
                path: 'user'
            },
            populate: {
                path: 'likes'
            }
        })
        .populate('comments')
        .populate('likes');

        let users = await User.find({});

        //console.log(req.user); //Getting blank value before first login so need a workaround

        FriendList = [];

        if(req.user){
            let List1 = await Friendship.find({to_user:req.user._id}).populate('from_user');
            let List2 = await Friendship.find({from_user:req.user._id}).populate('to_user');

            for(item in List1){
                FriendList.push(List1[item].from_user);
            }
            for(item in List2){
                FriendList.push(List2[item].to_user);
            }
        }

        return res.render('home', {
            title: "Codeial | Home",
            posts:  posts,
            all_users: users,
            FriendList: FriendList
        });

    }catch(err){
        console.log('Error', err);
        return;
    }
   
}