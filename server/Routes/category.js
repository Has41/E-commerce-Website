import express from 'express'
import { createCategory, editCategory, getCategory, deleteCategory } from '../controller/category.js'
import { isAdmin, isAuthentic } from '../utils/checkAuth.js'

const router = express.Router()

router.post('/create-category', isAuthentic, isAdmin, createCategory)
router.put('/edit-category/:id', editCategory)
router.get('/get-category', getCategory)
router.delete('/delete-category/:id', deleteCategory)

export default router