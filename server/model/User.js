import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    address: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: 'user',
        enum: ['user', 'admin']
    },
    bio: {
        type: String,
    },
    verification: {
        type: Boolean,
        default: false
    },
    profilePic: {
        data: Buffer,
        contentType: String
    },
    taskList: [
        {
            task: {
                type: String,
            },
            completed: {
                type: Boolean,
                default: false
            }
        }
    ]
},{ timestamps: true })

const User = mongoose.model(`User`, userSchema)

export default User