const express = require('express');
const validate = require('../validators/auth.validate');
const { register, login, logOut } = require('../controllers/auth.controller');
const { registerSchema, loginSchema, resetPasswordSchema, forgotPasswordSchema } = require('../validators/auth.validators');
const { resetPassword, forgotPassword } = require('../controllers/auth.forgot.controller');
const limiter = require('../middlewares/rate.limiter');
const refreshTokenController = require('../controllers/auth.refreshToken.controller');
const protect = require('../middlewares/token.verification');
const verifyEmail = require('../controllers/verifyEmail.controller');

const authRouter = express.Router();
authRouter.post('/register', validate(registerSchema), register);
authRouter.post('/login', limiter, validate(loginSchema), login);
authRouter.post('/verify-email/:token', verifyEmail);
authRouter.post('/refresh-token', refreshTokenController);
authRouter.post('/forgot-password', limiter, validate(forgotPasswordSchema), forgotPassword);
authRouter.post('/reset-password/:token', validate(resetPasswordSchema), resetPassword);
authRouter.post('/logout', logOut);
// this router is just for checking
authRouter.get("/me", protect, (req, res) => {
    res.json({
        success: true,
        user: req.user,
    });
});


module.exports = authRouter;

