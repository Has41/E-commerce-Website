import express from 'express'
import { createItem, removeItem, getCurrentUserItem } from '../controller/cart.js'

const router = express.Router()

router.post(`/add`, createItem)
router.get(`/current`, getCurrentUserItem)
router.delete(`/:cartId`, removeItem)

export default router