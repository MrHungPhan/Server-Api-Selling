const nodemailer = require('nodemailer');
const config = require('../config/mailer');

const transport = nodemailer.createTransport({
    service : 'gmail',
    auth : {
        type : 'OAuth2',
       user : 'menshop789@gmail.com',
       clientId : config.CLIENT_ID,
       clientSecret : config.CLIENT_SECRET,
       refreshToken:   config.REFRESH_TOKEN,
       accessToken : config.ACCESS_TOKEN
    }
});

module.exports = {
    sendEmail(from, to , subject, html){
        return new Promise((resolve, reject) => {
            transport.sendMail({ from, subject, to, html}, (err, info) => {
                if(err) reject(err);

                resolve(info)
            });
        })
    }
}