const User = require('../../../models/user');
const jwt = require('jsonwebtoken');


module.exports.createSession = async function(req, res){
    try{
        let user = await User.findOne({email: req.body.email});

        if(!user || user.password != req.body.password){
            return res.json(422,{
                message:"User not found"
            });
        }
        return res.json(200,{
            message:"Signed in successfull and here is your token",
            data: {
                token: jwt.sign(user.toJSON(), 'codeial', {expiresIn: '100000' })
            }
        });
    }
    catch(err){
        return res.json(500,{
            message:"Internal error"
        });
    }
}