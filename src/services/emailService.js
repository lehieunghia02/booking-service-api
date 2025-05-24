const nodemailer = require('nodemailer'); 
const emailConfig = require('../config/email');

const transporter = nodemailer.createTransport(emailConfig);

transporter.verify().then(() =>{
  console.log('Email service is ready to send emails');
}).catch((err) => {
  console.log('Email service is not ready to send emails', err);
})

const sendEmail = async (options) => {
  try{
    const mailOptions = {
      from: emailConfig.from,
      to: options.to,
      subject: options.subject,
      text: options.text,
    };
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully');
    return info;
  }catch(error)
  {
    console.error('Error sending email:', error);
    throw error;
  }
}
module.exports = {
  sendEmail,
};

