const { sendEmail } = require('../services/emailService');

const testEmail = async (req, res) => {
  try{
    const info = await sendEmail({
      to: 'lehieunghia2402@gmail.com',
      subject: 'Test Email',
      text: 'This is a test email',
    });
    res.status(200).json({ message: 'Email sent successfully', info });
  }catch(error)
  {
    res.status(500).json({ message: 'Error sending email', error: error.message });
}
}
module.exports = {
  testEmail,
};

