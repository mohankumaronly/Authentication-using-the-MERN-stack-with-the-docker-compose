const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const User = require("../models/auth.model");


const register = async (req, res) => {
    try {
        const {
            firstName,
            lastName,
            email,
            password,
        } = req.body;
        if (!firstName || !lastName || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            });
        }
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "User already exists",
            });
        }
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);
        const user = User({
            firstName,
            lastName,
            email,
            password: hashPassword,
        });
        await user.save()
        const { password: _, ...saveUserData } = user.toObject();
        return res.status(201).json({
            success: true,
            message: "user created successfully",
            data: saveUserData
        })
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Server internal error"
        });
    }
}

const login = async (req, res) => {
    try {
        const {
            email,
            password,
            rememberMe
        } = req.body;
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "All fields are require"
            })
        }
        const user = await User.findOne({ email: email.toLowerCase() });
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "Invalid credentials",
            })
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: "Invalid credentials"
            });
        }
        const expiresIn = rememberMe ? "7d" : "1d";
        const token = jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET_KEY,
            { expiresIn }
        );
        const { password: _, ...safeUserData } = user.toObject();
        const maxAge = rememberMe ? 7 * 24 * 60 * 60 * 1000 : 24 * 60 * 60 * 1000;
        return res
            .cookie("token", token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: 'lax',
                maxAge
            })
            .status(200)
            .json({
                success: true,
                message: "User logged in successfully",
                data: safeUserData
            });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Server internal error"
        });
    }
}

const logOut = async (_, res) => {
    try {
        return res
            .clearCookie("token", {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: 'lax',
            })
            .status(200)
            .json({
                success: true,
                message: "User logout successfully",
            });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Server internal error"
        });
    }
}



module.exports = {
    register,
    login,
    logOut
}