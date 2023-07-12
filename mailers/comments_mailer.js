const nodeMailer = require('../configs/nodemailer');

//another way of exporting function intead of using modules.export
exports.newComment = (comment) =>{
    console.log("Inside new comment mailer");
    nodeMailer.transporter.sendMail({
        from: 'harshalsgore@gmail.com',
        to: comment.user.email,
        subject: "New Comment Published",
        html: '<h1> Yup! Your comment is now published </h1>'
    },(err,info) => {
        if(err){
            console.log("Error in sending mail");
            return;
        }
        console.log("Message sent",info);
        return;
    });
}