import express from 'express'
import authRoutes from './auth.js'
import userRoutes from './users.js'
import cartRoutes from './cart.js'
import productRoutes from './product.js'
import categoryRoutes from './category.js'
import { isAuthentic } from '../utils/checkAuth.js'
import mailRoute from './mail.js'

const router = express.Router()

//Authenticate the routes
router.use('/auth', authRoutes) 
router.use(`/users`, userRoutes)
router.use(`/cart`, isAuthentic, cartRoutes)
router.use('/products', productRoutes)
router.use('/category', categoryRoutes)
router.use('/mail', mailRoute)

export default router