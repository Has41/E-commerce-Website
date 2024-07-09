import mongoose from "mongoose";

const itemSchema = new mongoose.Schema({
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
});

const orderSchema = new mongoose.Schema({
    products : [itemSchema],
    payment: {},
    buyer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    status: {
        type: String,
        default: 'Not Processed',
        enum: ['Not Processed', 'Processing', 'Shipped', 'Delivered', 'Cancelled']
    }
}, { timestamps: true })

const Order = mongoose.model('Order', orderSchema)

export default Order