const passport = require('passport');
const User = require('../models/user');

module.exports.profile = function(req, res){
    return res.render('user_profile',{
        title: "User Profile"
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
    return res.redirect('/');
}

module.exports.destroySession = function(req, res){
    req.logout(function(err) {
        if (err) { return next(err); }
        return res.redirect('/');
      });
}