const jwt = require('jsonwebtoken');

const tokenVerification = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized"
            });
        }
        const decode = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.user = decode;
        next()
    } catch (error) {
        console.error(error);
        return res.status(401).json({
            success: false,
            message: "Invalid token"
        });
    }
}

module.exports = tokenVerification;