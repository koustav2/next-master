import mongoose, { Schema, Document } from "mongoose"


export interface User extends Document {
    name: string;
    email: string;
    password: string;
    isVerified: boolean;
    verifyCode: string;
    verifyCodeExpiration: Date;
    createdAt: Date;
    updatedAt: Date;
}

export interface Message extends Document {
    content: string;
    user: User;
    createdAt: Date;
}

const userSchema: Schema<User> = new Schema({
    name: {
        type: String,
        required: [
            true,
            "Username is required"
        ],
        trim: true,
        minlength: 4,
        maxlength: 30,
        unique: true
    },
    email: {
        type: String,
        required: [
            true,
            "Email is required"
        ],
        trim: true,
        unique: true,
        match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, " Please provide a vaild email"]
    },
    password: {
        type: String,
        required: [
            true,
            "Password is required"
        ]
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    verifyCode: {
        type: String,
        required: [
            true,
            "Verification code is required"
        ]
    },
    verifyCodeExpiration: {
        type: Date,
        default: Date.now,
        required: [
            true,
            "Verification code is required"
        ]
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },
});

const messageSchema: Schema<Message> = new Schema({
    content: String,
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    createdAt: {
        type: Date,
        default: Date.now,
        required: true,
    },
});

export const userModel = mongoose.model<User>("User", userSchema);
export const messageModel = mongoose.model<Message>("Message", messageSchema);