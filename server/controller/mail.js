import nodemailer from 'nodemailer'
import errorHandler from '../utils/errorHandler.js'

const mailSender = async (req,res,next) => {
    const { name, email, comment } = req.body

  const transporter = nodemailer.createTransport({
    host: process.env.SMP_HOST,
    port: process.env.SMP_PORT, 
    secure: false,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD
    }
  });

  const mailOptions = {
    from: email,
    to: process.env.EMAIL,
    subject: 'Any queries?',
    text: `Full Name: ${name}\n\nUser Email: ${email}\n\nComment: ${comment}`
  };
  

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.response)
    return res.json(201).json(info)
  } catch (err) {
    return next(err)
    return errorHandler(500, 'Failed to send email')
  }
}

export default mailSender;