import express from 'express'
// import nodemailer from 'nodemailer'
import mailSender from '../controller/mail.js'

const router = express.Router()

router.post('/send-mail', mailSender)

export default router