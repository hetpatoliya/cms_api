import mongoose from "mongoose";

const mediaSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    type: {
        type: String,
        enum: {
            values: ['article', 'pages', 'media'],
            message: '{VALUE} is required!'
        },
        required: true
    },
    description: {
        type: String,
        required: true
    },
    uploadedBy: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    url: {
        type: String,
        required: true
    }
}, { timestamps: true });

const Media = mongoose.model('Media', mediaSchema);

export { Media };