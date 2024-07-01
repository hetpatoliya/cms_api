import mongoose from "mongoose";
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: Number,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: {
            values: ['viewer', 'editor', 'admin'],
            message: '{VALUE} is not valid role!'
        },
        default: 'viewer',
        required: true
    }
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

export { User };