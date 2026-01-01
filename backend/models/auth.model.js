const mongoose = require('mongoose');

const authSchema = mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true },
    rememberMe: { type: Boolean, default: false },
    resetPasswordToken: { type: String },
    resetPasswordExpire: { type: Date },
    isEmailVerified: {type: Boolean,default: false},
    emailVerificationToken: {type: String},
    emailVerificationExpire: {type: Date,},
}, { timestamps: true });

const User = mongoose.model('User', authSchema);
module.exports = User;