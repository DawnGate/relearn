const nodemailer = require("nodemailer");

const asyncHandler = require("express-async-handler");

const sendEmail = asyncHandler(async (data, req, res) => {
  let transport = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.MAIL_ID,
      pass: process.env.MAIL_PASSWORD,
    },
  });

  let info = transport.sendMail({
    from: `"Hey this is" ${process.env.MAIL_ID}`,
    to: data.to, // list of receivers  "bar@example.com, baz@example.com"
    subject: data.subject, // subject line
    text: data.text, // plain text body
    html: data.html, // html body
  });

  console.log("Message sent: %s", info.messageId);
});

module.exports = { sendEmail };
