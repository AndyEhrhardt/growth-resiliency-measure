const nodemailer = require('nodemailer');
//function to send confirmation email
//takes an email and random string
const sendMail = (email, ranStr, verify) => {
    const Transport = nodemailer.createTransport({
        service: "Gmail",
        auth: {
            user: "anthonyvlynch5@gmail.com",
            pass: "nubgxjoqemedtziw"
        }
    });
    let mailOptions;
    let sender = "Anthony Lynch";
    if (verify){
    mailOptions = {
        from: sender,
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
            from: sender,
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