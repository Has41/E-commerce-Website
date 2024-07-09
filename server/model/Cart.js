import mongoose from 'mongoose';

const cartSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        min: [0, 'wrong min price'],
        max: [10000, 'wrong max price']
    },
    quantity: {
        type: Number,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true
    }
},{ timestamps: true })

const Cart = mongoose.model(`Cart`, cartSchema)

export default Cart