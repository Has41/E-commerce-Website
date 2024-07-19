import express from 'express'
import mongoose from 'mongoose'
import 'dotenv/config'
import cors from 'cors'
import morgan from 'morgan'
import cookieParser from 'cookie-parser'
import allRoutes from './Routes/index.js'

const app = express()
const PORT = process.env.PORT || 5000

const corsOrigin = process.env.BASE_URL

const corsOptions = {
    origin: corsOrigin,
    methods: ["GET", "POST", "PUT", "PATCH", "OPTIONS", "DELETE"],
    credentials: true
}
  
// Middlewares
app.use(cors(corsOptions))
app.use(morgan('dev'))
app.use(cookieParser())
app.use(express.json())


//All Routes!
app.use('/api', allRoutes)


//Error Handle!
app.use((err, req, res, next) => {
    console.error('Error:', err.message, err.stack)

    const status = err.statusCode || 500
    const msg = err.message || 'Internal Server Error!'
    return res.status(status).json({ msg, stack: err.stack })
})

//Connect the database!
const connectDB = async () => {
    try{
        await mongoose.connect(process.env.DB_CONNECT)
        console.log(`Database Connected!`)
    } catch(err) {
        console.error(err)
        process.exit(1)
    }
}

connectDB()

//Setting up port!
app.listen(PORT, () => {
    console.log(`Server running on: ${PORT}`)
})

export default app