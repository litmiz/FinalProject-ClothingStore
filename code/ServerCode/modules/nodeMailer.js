require('dotenv').config()
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD
  }
});

exports.sendMail = function (to, subject, text, file) {
  const mailOptions = file ? {
    from: process.env.EMAIL,
    to: to,
    subject: subject,
    text: text,
    attachments: [{
      filename: file.originalname,
      content: file
    }]
  } : {
      from: process.env.EMAIL,
      to: to,
      subject: subject,
      text: text
    };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
}
