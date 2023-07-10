const User = require('../models/user');
const fs = require('fs');
const path = require('path');

module.exports.profile = function(req, res){
    User.findById(req.params.id)
    .then((user)=>{
        return res.render('user_profile',{
            title: "User Profile",
            profile_user: user
        })
    })
}

//Render SignUp page
module.exports.signUp = function(req, res){
    if(req.isAuthenticated()){
        return res.redirect('/users/profile')
    }
    return res.render('user_sign_up',{
        title: "User SignUp"
    })
}

//Render SignIn page
module.exports.signIn = function(req, res){
    if(req.isAuthenticated()){
        return res.redirect('/users/profile')
    }
    return res.render('user_sign_in',{
        title: "User SignIn"
    })
}

//Get the SignUp data
module.exports.create = function(req, res){
    if(req.body.password!=req.body.Confirm_password){
        return res.redirect('back');
    }
    User.findOne({email: req.body.email})
    .then((result) => {
        if(!result){
            User.create(req.body)
            .then((result) => {
                return res.redirect('/users/sign-in');
            })
            .catch((err) => {
                console.log("Error in creating user", err);
                return;
            })
        }else{
            return res.redirect('back');
        }
     })
     .catch((err) => {
       console.log('Error in finding user',err);
       return;
     })

}

//SignIn and create session
module.exports.createSession = function(req, res){
    req.flash('success','Logged in Successfully');
    return res.redirect('/');
}

module.exports.destroySession = function(req, res){
    req.logout(function(err) {
        if (err) { return next(err); }
        req.flash('success','Logged out Successfully');
        return res.redirect('/users/sign-in');
      });
}

module.exports.update = async function(req, res){
    if(req.user.id == req.params.id){
        try{
            let user = await User.findById(req.params.id) 
            User.uploadedAvatar(req, res, function(err){
                if(err){
                    console.log('***MULTER ERROR*** ', err)
                }
                user.name = req.body.name;
                user.email = req.body.email;

                if(req.file){

                    if(user.avatar){
                        fs.unlinkSync(path.join(__dirname, '..', user.avatar));
                    }

                    //this is saving the path of uploaded file in avatar field of user schema
                    user.avatar = User.avatarPath + '/' + req.file.filename;
                }

                user.save();
                return res.redirect('back');
            })
        }
        catch(error){
            req.flash('error', error);
            return res.redirect('back')
        }
    }
    else{
        req.flash('error', 'Unauthorized!');
        return res.status(401).send('Unauthorized')
    }
}