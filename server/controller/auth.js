import bcryptjs from 'bcryptjs'
import User from '../model/User.js'
import Order from '../model/Order.js'
import Token from '../model/Token.js'
import fs from 'fs'
import jwt  from 'jsonwebtoken'
import crypto from 'crypto'
import errorHandler from '../utils/errorHandler.js'
import mailSender from '../utils/sendEmail.js'


const register = async (req,res,next) => {
    const { name, email, password, address, bio, phone  } = req.fields
    const { profilePic } = req.files

    switch (true) {
        case !name: 
            throw errorHandler(500, 'Name is required!')
        case !email: 
            throw errorHandler(500, 'Email is required!')
        case !password: 
            throw errorHandler(500, 'Password is required!')
        case !address: 
            throw errorHandler(500, 'Address is required!')
        case !phone: 
            throw errorHandler(500, 'Phone is required!')
        case !bio: 
            throw errorHandler(500, 'Bio is required!')
        case profilePic && profilePic.size > 2000000:
            throw errorHandler(500, 'Profile photo is required and should be less than 2mb')
    }

    try {
        const salt = await bcryptjs.genSalt(10)
        const hashedPass = await bcryptjs.hash(password, salt)
        let newUser = new User({ name, email, password: hashedPass, address, bio, phone, verification: false })
        if (profilePic) {
            newUser.profilePic.data = fs.readFileSync(profilePic.path)
            newUser.profilePic.contentType = profilePic.type
        }
        const savedUser = await newUser.save()

        const token = await new Token({
            userId: savedUser._id,
            token: crypto.randomBytes(32).toString("hex")
        }).save()

        const url = `${process.env.BASE_URL}/users/${savedUser._id}/verify/${token.token}`

        const text = `Hi ${savedUser.name},

        Welcome to HASS. ! We're excited to have you on board.
        
        Please verify your account by clicking the link below to complete your registration:
        
        ${url}
        
        If you did not request this, please ignore this email. This link will expire in 24 hours for your security.
        
        If you have any questions, feel free to contact our support team.
        
        Thanks for joining us!
        
        Best regards,
        The HASS. Team
        Support: support@yourapp.com
        `
    
        const html = `
          <p>Hi ${savedUser.name},</p>
        
          <p>Welcome to <strong>HASS.</strong>! We're excited to have you on board.</p>
        
          <p>Please verify your account by clicking the link below to complete your registration:</p>
        
          <p style="text-align: center;">
            <a href="${url}" style="background-color: #4CAF50; color: white; padding: 10px 20px; text-decoration: none; margin: 10px 0px; border-radius: 5px;">Verify Your Account</a>
          </p>
        
          <p>If you did not request this, please ignore this email. This link will expire in 24 hours for your security.</p>
        
          <p>If you have any questions, feel free to contact our support team.</p>
        
          <p>Thanks for joining us!</p>
        
          <p>Best regards,<br>
          The HASS. Team<br>
        `
        

        await mailSender(savedUser.email, "Verify Your Email", text, html)

        return res.status(201).json(savedUser)
    } catch(err) {
        console.log(err.message)
        return next(err)
    }
}

const verifyToken = async (req, res, next) => {
    try {
        const user = await User.findOne({ _id: req.params.id })

        if (!user) {
            const err = errorHandler(400, 'Invalid Link')
            return next(err)
        }

        const token = await Token.findOne({
            userId: user._id,
            token: req.params.token
        })

        if (!token) {
            console.error("Token doesn't exist!")
            return res.status(400).send({ message: "Invalid or expired token" })
        }

        // Update user verification status
        user.verification = true
        await user.save()

        // Delete the token
        await Token.findOneAndDelete({ _id: token._id })

        // Send success response
        return res.status(200).send({ message: "Email Verified Successfully!" })
    } catch (err) {
        console.error('Verification Error:', err.message, err.stack)
        const unexpectedErr = errorHandler(500, 'An unexpected error occurred')
        return next(unexpectedErr)
    }
}



const login = async (req, res, next) => {
    const { email, password } = req.body

    if (!email || !password) {
        const err = errorHandler(400, 'Email & Password are required')
        return next(err)
    }

    try {
        const user = await User.findOne({ email }).select('name email password role')

        if (!user) {
            const err = errorHandler(404, 'User not found')
            return next(err)
        }

        const isPasswordValid = await bcryptjs.compare(password, user.password)

        if (!isPasswordValid) {
            const err = errorHandler(401, 'Password incorrect')
            return next(err)
        }

        if (user.verification) {
            let token = await Token.findOne({ userId: user._id })
            if (!token) {
                await new Token({
                    userId: user._id,
                    token: crypto.randomBytes(32).toString("hex")
                }).save()
        
                const url = `${process.env.BASE_URL}/users/${user._id}/verify/${token.token}`
                try {
                    await sendMail(user.email, "Verify Your Email", url)
                    return res.status(400).json({ message: "An Email Has been sent to your account!" })
                } catch (emailError) {
                    console.error('Email Sending Error:', emailError.message)
                    return res.status(500).json({ error: 'Error sending verification email' })
                }
            }
            return res.status(400).json({ message: "An Email Has been sent to your account!" })
        }
        
        const payload = {
            id: user._id,
            name: user.name,
            role: user.role
        }
        
        try {
            const token = jwt.sign(payload, process.env.SECRET, { expiresIn: '1d' })
            return res.status(200).cookie('accessToken', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
                expiresIn: '1d'
            }).json('Login Success!')
            
        } catch (tokenError) {
            console.error('Token Signing Error:', tokenError.message)
            const err = errorHandler(500, 'Error signing token')
            return next(err)
        }
        
    } catch (err) {
        console.error('Login Error:', err.message, err.stack)
        const unexpectedErr = errorHandler(500, 'An unexpected error occurred')
        return next(unexpectedErr)
    }
}

const forgotPassword = async (req, res, next) => {
    try {
      const { email } = req.body
  
      const user = await User.findOne({ email })
  
      if (!user) {
        return res.status(404).send({ message: "User Not Found!" })
      }
  
      let token = await Token.findOne({ userId: user._id })
  
      if (!token) {
        // If no token exists, create a new one
        token = await new Token({
          userId: user._id,
          token: crypto.randomBytes(32).toString("hex")
        }).save()
      } else {
        // If a token exists, update the existing token
        token.token = crypto.randomBytes(32).toString("hex")
        await token.save()
      }
  
      const url = `${process.env.BASE_URL}/users/${user._id}/reset-password/${token.token}`
      await sendMail(user.email, "Reset Your Password", url)
  
      res.status(200).send("Verification email sent Successfully!")
    } catch (err) {
      return next(err)
    }
  }
  

  const resetPassword = async (req, res, next) => {
    try {
        const user = await User.findOne({ _id: req.params.id })

        if (!user) {
            const err = errorHandler(400, 'Invalid Link')
            return next(err)
        }

        let token = await Token.findOne({
            userId: user._id,
            token: req.params.token
        })

        if (!token) {
            console.error("Token doesn't exist!")
            token = await new Token({
                userId: user._id,
                token: crypto.randomBytes(32).toString("hex")
            }).save()
        }

        // Hash the new password
        const newPassword = req.body.newPassword
        const salt = await bcryptjs.genSalt(10)
        const hashedPass = await bcryptjs.hash(newPassword, salt)

        if(hashedPass) {
            await User.findByIdAndUpdate(user._id, { password: hashedPass })
            await Token.findOneAndDelete({ _id: token._id })
            return res.status(200).send("Password Updated Successfully!")
        } else {
            return res.status(400).send("Failed To Update Password!")
        }

    } catch (err) {
        return next(err)
    }
}


const logout = (req,res) => {
    res.clearCookie('accessToken', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax'
    })
    return res.status(200).json({ message: `Logout Success` })
}

//Check everytime when we login if token is avaliable
const isloggedin = (req,res) => {
    const token = req.cookies.accessToken
    if(!token) {
        return res.json(false)
    }
    jwt.verify(token, process.env.SECRET, (err) => {
        if(err) {
           return res.json(false)
        } else {
            return res.json(true)
        }
    })
}

const getOrders = async (req,res,next) => {
    try {
        const orders = await Order.find({ buyer: req.user.id }).populate("products", "-photo").populate("buyer", "name")
        res.json(orders)
    } catch (err) {
        return next(err)
    }
}

const getAllOrders = async (req,res,next) => {
    try {
        const orders = await Order.find({}).populate("products", "-photo").populate("buyer", "name").sort({ createdAt: -1 })
        res.json(orders)
    } catch (err) {
        return next(err)
    }
}

const updateOrdersStatus = async (req,res,next) => {
    try {
        const { orderId } = req.params
        const { status } = req.body

        const orders = await Order.findByIdAndUpdate(orderId, { status }, { new: true })
        res.json(orders)
    } catch (err) {
        return next(err)
    }
}

export { register, login, forgotPassword, resetPassword, verifyToken, logout, isloggedin, getOrders, getAllOrders, updateOrdersStatus }