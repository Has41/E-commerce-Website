import express from 'express'
import { register, login, logout, isloggedin, getOrders, getAllOrders, updateOrdersStatus, verifyToken, forgotPassword, resetPassword } from '../controller/auth.js'
import { isAdmin, isAuthentic } from '../utils/checkAuth.js'
import formidable from 'express-formidable'

const router = express.Router()

router.post('/register', formidable() ,register)
router.get('/:id/verify/:token', verifyToken)
router.post('/login', login)
router.post('/forgot-password', forgotPassword)
router.put('/:id/reset-password/:token', resetPassword)
router.post('/logout', logout)
router.get('/isloggedin', isloggedin)
router.get('/orders', isAuthentic, getOrders)
router.get('/get-orders', isAuthentic, getAllOrders)
router.put('/update-orders/:orderId', isAuthentic, isAdmin, updateOrdersStatus)

export default router