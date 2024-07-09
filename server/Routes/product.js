import express from 'express'
import { isAuthentic, isAdmin } from '../utils/checkAuth.js'
import { createProduct, getListedProduct, getSingleProduct ,getProductPhoto, createPayment, getProduct, updateProduct, deleteProduct, getRelatedProduct, getProductCount } from '../controller/product.js'
import formidable from 'express-formidable'

const router = express.Router()

router.post('/create-product', formidable(), isAuthentic, isAdmin , createProduct)
router.get('/get-listed-product/:skip/:limit', getListedProduct)
router.get('/get-product', getProduct)
router.get('/get-single-product/:pid', getSingleProduct)
router.get('/get-product-photo/:pid', getProductPhoto)
router.get('/get-related-product/:pid/:cid', getRelatedProduct)
router.get('/get-product-count', getProductCount)
router.put('/update-product/:pid', isAuthentic, isAdmin, updateProduct)
router.delete('/delete-product/:pid', isAuthentic, isAdmin, deleteProduct)

//Payment route
router.post('/create-checkout/session', isAuthentic, createPayment)

export default router