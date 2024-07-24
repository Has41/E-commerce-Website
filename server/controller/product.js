import errorHandler from "../utils/errorHandler.js"
import Product from "../model/Product.js"
import Cart from "../model/Cart.js"
import Order from "../model/Order.js"
import fs from 'fs'
import mongoose from "mongoose"
import stripe from "stripe"

const stripeSecretKey = process.env.STRIPE_SECRET_KEY

const stripeInstance = stripe(stripeSecretKey)

const createProduct = async (req,res,next) => {
    try {
        const { name, description, price, category, quantity, shipping } = req.fields
        const { photo } = req.files

        switch (true) {
            case !name: 
                throw errorHandler(500, 'Name is required!')
            case !description: 
                throw errorHandler(500, 'Description is required!')
            case !price: 
                throw errorHandler(500, 'Price is required!')
            case !category: 
                throw errorHandler(500, 'Category is required!')
            case !quantity: 
                throw errorHandler(500, 'Quantity is required!')
            case photo && photo.size > 2000000:
                throw errorHandler(500, 'Photo is required and should be less than 2mb')
        }

        const newProduct = new Product({ name, description, price, category: new mongoose.Types.ObjectId(category), quantity, shipping })

        if (photo) {
            newProduct.photo.data = fs.readFileSync(photo.path)
            newProduct.photo.contentType = photo.type
        }

        const savedProduct = await newProduct.save()
        return res.status(201).json(savedProduct)

    } catch (err) {
        return next(err)
    }
}

const getProduct = async (req,res,next) => {
    try {
        const products = await Product.find({}).select("-photo").populate("category").limit(12).sort({ createdAt: -1 })
        return res.status(200).json(products)
    } catch (error) {
        return next(err)
    }
}

const getListedProduct = async (req,res,next) => {
    try {
        let skip = parseInt(req.params.skip);
        let limit = req.params.limit ? parseInt(req.params.limit) : 100;
        
        const products = await Product.find({}).select("-photo").populate("category").limit(limit).sort({ createdAt: -1 }).skip(skip)
        return res.status(200).json(products)
    } catch (err) {
        return next(err)
    }
}

const getProductPhoto = async (req,res,next) => {
    try {
        const productPhoto = await Product.findById(req.params.pid).select("photo")

        if (productPhoto.photo.data) {
            res.set('Content-type', productPhoto.photo.contentType)
            return res.status(200).send(productPhoto.photo.data)
        }
    } catch (err) {
        return next(err)
    }
}

const getSingleProduct = async (req,res,next) => {
    try {
        const product = await Product.findById(req.params.pid).select('-photo')
        return res.status(200).json(product)
    } catch (err) {
        return next(err)
    }
}

const getRelatedProduct = async (req,res,next) => {
    try {
        const { pid, cid } = req.params
            console.log('pid:', pid)
            console.log('cid:', cid)

        const products = await Product.find({
            category: cid,
            _id: { $ne: pid }
        }).select("-photo").limit(3).populate("category")
        res.status(200).json(products)
    } catch (err) {
        return next(err)
    }
}

const updateProduct = async (req,res,next) => {
    try {
        const { name, price, quantity } = req.body

        switch (true) {
            case !name: 
                throw errorHandler(500, 'Name is required!')
            case !price: 
                throw errorHandler(500, 'Price is required!')
            case !quantity: 
                throw errorHandler(500, 'Quantity is required!')
        }

        const products = await Product.findByIdAndUpdate(req.params.pid, { ...req.fields }, { new: true })

        const savedProduct = await products.save()
        return res.status(201).json(savedProduct)
    } catch (err) {
        return next(err)
    }
}

const deleteProduct = async (req,res,next) => {
    try {
        const products = await Product.findByIdAndDelete(req.params.pid)
        res.status(200).json(products)
    } catch (err) {
        return next(err)
    }
}

const getProductCount = async (req,res,next) => {
    try {
        const total = await Product.find({}).estimatedDocumentCount()
        res.status(200).json(total)
    } catch (err) {
        return next(err)
    }
}

const createPayment = async (req, res, next) => {
    try {
        const cartItems = await Cart.find({ user: req.user.id });

        const lineItems = cartItems.map((item) => ({
            price_data: {
                currency: "USD",
                product_data: {
                    name: item.title,
                },
                unit_amount: item.price * 100,
            },
            quantity: item.quantity,
        }));

        const totalAmount = cartItems.reduce((total, item) => total + item.price, 0);

        const session = await stripeInstance.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: lineItems,
            mode: "payment",
            success_url: `${process.env.BASE_URL}/success`,
            cancel_url: `${process.env.BASE_URL}/cancel`,
        });



        const order = new Order({
            products: cartItems.map((item) => ({
                title: item.title,
                price: item.price,
                quantity: item.quantity,
                image: item.image,
            })),
            payment: {
                stripe_session_id: session.id,
                amount: totalAmount
            },
            buyer: req.user.id,
        });

        const savedOrder = await order.save();

        if (savedOrder) {
            await Cart.deleteMany({ user: req.user.id });
        }

        res.json({ id: session.id });
    } catch (err) {
        return next(err);
    }
}



export { createProduct, getProduct, getListedProduct, getProductPhoto, getSingleProduct, createPayment, updateProduct, deleteProduct, getRelatedProduct, getProductCount }