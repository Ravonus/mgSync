"use strict";
const nodemailer = require("nodemailer"),
  base64 = require('node-base64-image'),
  fs = require('fs');

// async..await is not allowed in global scope, must use a wrapper
async function mailer(options, template) {

  if (template) {

    let contents = await fs.readFileSync(`${__dirname}/templates/${template}/template.html`, "utf8");

    let imgs = contents.match(/(<img \S([^>]+)>)/g);
    let matches = []
    if (Array.isArray(imgs)) {
      imgs.forEach(img => {
        let src = img.match(/src=[\"|\'](?!https?:\/\/)([^\/].+?)[\"|\']/)[0];
        src = src.substring(5, src.length - 1);
        matches.push({
          tag: img,
          src
        });
      });
      console.log(matches)
    }


  }

  // create reusable transporter object using the default SMTP transport
  // let auth;
  // if(config.mail.user) {
  //  auth = {
  //     user: config.mail.user, 
  //     pass: config.mail.pass 
  //   }
  // }
  // let transporter = nodemailer.createTransport({
  //   host: config.mail.host,
  //   port: config.mail.port,
  //   secure: config.mail.secure, // true for 465, false for other ports
  //   auth
  // });

  // // setup email data with unicode symbols
  // let mailOptions = {
  //   from: options.from, // sender address
  //   to: options.to, // list of receivers
  //   subject: options.from, // Subject line
  //   text: options.text,
  //   html: config.mail.templates.passwordVerification // html body
  // };

  // // send mail with defined transport object
  // let info = await transporter.sendMail(mailOptions)

  // console.log("Message sent: %s", info.messageId);
  // // Preview only available when sending through an Ethereal account
  // console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

  // // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
  // // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}

// main().catch(console.error);

module.exports = mailer;