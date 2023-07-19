const Friendship = require("../models/friendship");
const User = require("../models/user");

module.exports.create = async function(req, res){
    try{

        let friendship = await Friendship.create({
            to_user: req.params.id,
            from_user: req.user._id
        })

        let to_user = await User.findById(req.params.id)
        let from_user = await User.findById(req.user._id)

        to_user.friendship.push(from_user);
        to_user.save();
        from_user.friendship.push(to_user);
        from_user.save();


        // if(req.xhr){
            
        //     post = await post.populate('user', 'name');

        //     return res.status(200).json({
        //         data:{
        //             post:post
        //         },
        //         message: "Post Created!"
        //     });
        // }

        req.flash('success','Friend Added!');
        return res.redirect('back');
    }
    catch(err){
        req.flash('error',err);
        console.log(err);
        return res.redirect('back');
    }
}

module.exports.destroy = async function(req, res){
    try{

        await Friendship.deleteMany({to_user: req.params.id});
        await Friendship.deleteMany({from_user: req.params.id});

        req.flash('success','Friend Removed!');
        return res.redirect('back');
    }   
    catch(err){
        req.flash('error',err);
        console.log(err);
        return res.redirect('back');
    }
}