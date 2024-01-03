import mongoose from "mongoose";

const formDataSchema = mongoose.Schema({
    title: {
        type: String,
    },
    description: {
        type: String,
    },
    metadata: {
        type: String,
    }
}, { _id: false });

const processSchema = mongoose.Schema({
    owner: {
        type: String,
    },
    generatedBy: {
        type: String,
    },
    prompt: {
        type: String,
        required: true,
    },
    formData: [formDataSchema],
    createdAt: {
        type: Date,
        default: new Date(),
    },
    updatedAt: {
        type: Date,
        default: new Date(),
    },
});

export const Process = mongoose.model('Process', processSchema);