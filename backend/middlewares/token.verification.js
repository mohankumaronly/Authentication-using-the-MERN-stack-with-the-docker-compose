const jwt = require('jsonwebtoken');

const protect  = async (req, res, next) => {
    try {
        const accessToken = req.cookies.accessToken;
        if (!accessToken) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized"
            });
        }
        const decode = jwt.verify(accessToken, process.env.JWT_SECRET_KEY);
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

module.exports = protect;