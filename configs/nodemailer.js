const nodemailer = require('nodemailer');
const ejs = require('ejs');
const path = require('path');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: 'harshalsgore',
        pass: '1234'
    } 
});

let renderTemplate = (data, relativePath) =>{
    let mailHTML;
    ejs.renderFile(
        path.join(__dirname, '../views/mailers', relativePath),
        data,
        function(err, template){
            if(err){
                console.log("Error in rendering the template");
                return;
            }
            mailHTML = template;
        }
    )
    return;
}

module.exports = {
    transporter: transporter,
    renderTemplate: renderTemplate
}