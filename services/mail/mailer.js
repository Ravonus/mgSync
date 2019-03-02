"use strict";
const nodemailer = require("nodemailer"),
  asyncForEach = require('../../functions/asyncForEach'),
  fs = require('fs');

let config = {
  mail: require('../../config/mail.json')
}

// async..await is not allowed in global scope, must use a wrapper
async function mailer(options, template) {
  let newTemplate;
  let contents;
  let attachments = []
  let templateName;
  if (template) {

    if (typeof template === "string") {
      templateName = template;
    } else {
      templateName = template.name;
    }

    contents = await fs.readFileSync(`${__dirname}/templates/${templateName}/template.html`, "utf8");
    let regEx = [];
    let replaceValues = {};
    if (typeof template === "object") {
      await asyncForEach(template.replace, (obj, index) => {
        regEx.push(`{{${Object.keys(obj)}}}`);
        replaceValues[`{{${Object.keys(obj)}}}`] = obj[Object.keys(obj)]
      });
    }

    contents = await contents.replace(new RegExp(regEx.join('|'), 'g'), (matched) => {
      return replaceValues[matched];
    });

    //Grab img tags and convert into base64. Plan to eventually check base64 variable and let people decide between hosting and or base64. (This way will send much more data via email.);
    let imgs = contents.match(/(<img \S([^>]+)>)/g);
    let matches = []
    if (Array.isArray(imgs)) {
      imgs.forEach(img => {
        let src = img.match(/src=[\"|\'](?!https?:\/\/)([^\/].+?)[\"|\']/)[0];
        src = src.substring(5, src.length - 1);
        let filename = src;
        let path = `${__dirname}/templates/${templateName}/${src}`;
        matches.push({
          tag: img,
          filename,
          path,
          src
        });
      });
      let array = [];
      await asyncForEach(matches, async (img, index) => {

        matches[index].cid = img.tag.replace(/src=[\"|\'](?!https?:\/\/)([^\/].+?)[\"|\']/, `src="cid:email-${index}"`);
        attachments.push({
          filename: matches[index].filename,
          path: matches[index].path,
          cid: `email-${index}`
        });

        array.push(matches[index].cid);

      });

      let mapObj = {};
      let mapArr = contents.match(/(<img \S([^>]+)>)/g);

      await Functions.asyncForEach(array, (value, index) => {
        mapObj[mapArr[index]] = value;
      });

      let newContent = contents.replace(/(<img \S([^>]+)>)/g, (matched) => {
        return mapObj[matched];
      });

      await asyncForEach(matches, async (img, index) => {

      });

      newTemplate = newContent;

    }

  }

  // create reusable transporter object using the default SMTP transport
  let auth;
  if (config.mail.user) {
    auth = {
      user: config.mail.user,
      pass: config.mail.pass
    }
  }
  let transporter = nodemailer.createTransport({
    host: config.mail.host,
    port: config.mail.port,
    secure: config.mail.secure, // true for 465, false for other ports
    auth
  });

  // setup email data with unicode symbols
  let mailOptions = {
    from: options.from, // sender address
    to: options.to, // list of receivers
    subject: options.from, // Subject line
    text: options.text,
    html: newTemplate ? newTemplate : contents, // html body
    attachments
  };

  // send mail with defined transport object
  let info = await transporter.sendMail(mailOptions)

  console.log("Message sent: %s", info.messageId);
  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}

// main().catch(console.error);

module.exports = mailer;