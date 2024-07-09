import mongoose, { mongo } from 'mongoose';

const tokenSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        unique: true
    },
    token: {
        type: String,
        required: true,
    }
}, { timestamps: true })

const Token = mongoose.model('Token', tokenSchema)

export default Token