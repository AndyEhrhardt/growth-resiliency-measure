require('dotenv').config();
const nodemailer = require('nodemailer');
const sgTransport = require('nodemailer-sendgrid-transport');
 
//function to send confirmation email
//takes an email and random string
const sendMail = (email, ranStr, verify) => {
    const Transport = nodemailer.createTransport(sgTransport({
        auth: {
            api_key: process.env.APIKEY,
        },
    }));
    let mailOptions;
    if (verify){
    mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: "Email confirmation",
        html: `Press <a href="http://localhost:3000/#/verify/${ranStr}" target="_blank"> here </a> to verify your email!`,
    };
    Transport.sendMail(mailOptions, function(error, response) {
        if (error) {
            console.log(error);
        } else {
            console.log("Email verification sent");
        }
    });
    } else {
        mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: "Growth Resiliency Assessment",
            html: `Press <a href="http://localhost:3000/#/assessment/${ranStr}" target="_blank"> here </a> to take the assessment`,
        };
        Transport.sendMail(mailOptions, function(error, response) {
            if (error) {
                console.log(error);
            } else {
                console.log("Email assessment sent");
            }
        });
    }
}

module.exports = {
    sendMail,
};