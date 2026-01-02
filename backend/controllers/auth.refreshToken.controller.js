const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const User = require("../models/auth.model");
const RefreshToken = require("../models/auth.refreshToken");


const refreshTokenController = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
      return res.status(401).json({
        success: false,
        message: "Refresh token missing",
      });
    }

    const hashedToken = crypto
      .createHash("sha256")
      .update(refreshToken)
      .digest("hex");

    const storedToken = await RefreshToken.findOne({
      token: hashedToken,
      revoked: false,
      expiresAt: { $gt: Date.now() },
    });

    if (!storedToken) {
      return res.status(401).json({
        success: false,
        message: "Invalid or expired refresh token",
      });
    }

    const user = await User.findById(storedToken.userId);

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not found",
      });
    }

    const accessToken = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "15m" }
    );

    return res
      .cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 15 * 60 * 1000,
      })
      .status(200)
      .json({
        success: true,
        message: "Access token refreshed",
      });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Server internal error",
    });
  }
};

module.exports = refreshTokenController;
