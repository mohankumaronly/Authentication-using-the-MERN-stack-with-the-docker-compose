const crypto = require('crypto');
const bcrypt = require('bcrypt');
const User = require("../models/auth.model");
const sendEmail = require('../utils/sendEmail');
const resetPasswordTemplate = require('../utils/Emails/resetPasswordTemplate');

const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;
        if (!email) {
            return res.status(400).json({
                success: false,
                message: "Email is required"
            });
        }
        const user = await User.findOne({ email: email.toLowerCase() });
        if (!user) {
            return res.status(200).json({
                success: true,
                message: "If the email exists, a reset link has been sent",
            });
        }
        const resetToken = crypto.randomBytes(32).toString('hex');

        const hashedToken = crypto
            .createHash("sha256")
            .update(resetToken)
            .digest("hex");

        user.resetPasswordToken = hashedToken;
        user.resetPasswordExpire = Date.now() + 15 * 60 * 1000;

        await user.save({ validateBeforeSave: false });

        const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;


        await sendEmail({
            to: user.email,
            subject: "Reset your password",
            html: resetPasswordTemplate(resetUrl),
            text: `Reset your password using this link: ${resetUrl}`,
        });

        return res.status(200).json({
            success: true,
            message: "If the email exists, a reset link has been sent",
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Server internal error"
        });
    }
}

const resetPassword = async (req, res) => {
    try {
        const { token } = req.params;
        const { password } = req.body;

        if (!password) {
            return res.status(400).json({
                success: false,
                message: "Password is required",
            });
        }

        const hashedToken = crypto
            .createHash("sha256")
            .update(token)
            .digest("hex");

        const user = await User.findOne({
            resetPasswordToken: hashedToken,
            resetPasswordExpire: { $gt: Date.now() },
        });

        if (!user) {
            return res.status(400).json({
                success: false,
                message: "Reset token is invalid or expired",
            });
        }

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        await user.save();

        return res.status(200).json({
            success: true,
            message: "Password reset successfully",
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Server internal error",
        });
    }
}

module.exports = {
    forgotPassword,
    resetPassword
}