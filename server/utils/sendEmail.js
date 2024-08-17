import nodemailer from 'nodemailer'
import errorHandler from '../utils/errorHandler.js'

const mailSender = async (email, subject, text, html) => {
  try{
    const transporter = nodemailer.createTransport({
        host: process.env.SMP_HOST,
        service: process.env.SERVICE,
        port: process.env.SMP_PORT, 
        secure: process.env.SECURE === 'true',
        auth: {
          user: process.env.EMAIL,
          pass: process.env.PASSWORD
        }
      })

    // Verify the transporter configuration
    transporter.verify((error, success) => {
      if (error) {
        console.error(error)
        throw errorHandler(500, 'Error establishing connection.')
      } else {
        console.log("Server is ready to take our messages", success)
      }
    })
    
    await transporter.sendMail({
      from: process.env.EMAIL,
      to: email,
      subject: subject,
      text: text,
      html: html
    })

  } catch (mailError) {
    if (mailError.code === 'EAUTH') {
      console.error('Invalid email authentication credentials. Please check your email configuration.');
      throw errorHandler(500, 'Invalid email authentication credentials.');
    } else if (mailError.code === 'EENVELOPE') {
      console.error('Invalid email address provided.');
      throw errorHandler(400, 'Invalid email address provided.');
    } else if (mailError.responseCode === 550 && mailError.response.includes('5.1.1')) {
      console.error('The email account does not exist.');
      throw errorHandler(404, 'The email account does not exist.')
    } else {
      console.error('Error sending verification email:', mailError)
      throw errorHandler(500, 'Error sending verification email.')
    }
  }

}

export default mailSender