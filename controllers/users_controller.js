const User = require('../models/user');

module.exports.profile = function(req, res){
    console.log(req.cookies.user_id);
    if(req.cookies.user_id){
        User.findById(req.cookies.user_id)
        .then((user) => {
            if(user){
                return res.render('user_profile',{
                    title: "User Profile",
                    user: user
                })
            }
            else{
                console.log('User not found',err);
            }
        })
        .catch((err) => {
            console.log('Error in finding User',err);
            return res.redirect('/users/sign-in');
        })
    }
    else{
        console.log("User not logged in");
        return res.redirect('/users/sign-in');
    }
}

//Render SignUp page
module.exports.signUp = function(req, res){
    return res.render('user_sign_up',{
        title: "User SignUp"
    })
}

//Render SignIn page
module.exports.signIn = function(req, res){
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
    .then((user) => {
        if(!user){
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

//Get the SignIn data
module.exports.createSession = function(req, res){
    User.findOne({email: req.body.email})
    .then((user) => {
        if(user){
            if(user.password != req.body.password){
                return res.redirect('back');
            }else{
                res.cookie('user_id', user.id);
                return res.redirect('/users/profile')
            } 
        }else{
            return res.redirect('back');
        }
     })
}

module.exports.signOut = function(req, res){
    res.clearCookie('user_id');
    return res.render('user_sign_in',{
        title: "User SignIn"
    })
}