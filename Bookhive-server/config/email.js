const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'bookhive02@gmail.com',
    pass: process.env.GMAIL_APP_PASSWORD
  }
});

const sendEmail = async (to, subject, text) => {
  try {
    await transporter.sendMail({
      from: 'bookhive02@gmail.com',
      to,
      subject,
      text
    });
    console.log('Email sent successfully');
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
};

module.exports = { sendEmail };
