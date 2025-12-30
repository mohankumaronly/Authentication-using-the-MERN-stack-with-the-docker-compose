const express = require('express');
const validate = require('../validators/auth.validate');
const { register, login, logOut } = require('../controllers/auth.controller');
const { registerSchema, loginSchema, resetPasswordSchema, forgotPasswordSchema } = require('../validators/auth.validators');
const { resetPassword, forgotPassword } = require('../controllers/auth.forgot.controller');
const tokenVerification = require('../middlewares/token.verification');

const authRouter = express.Router();
authRouter.post('/register', validate(registerSchema), register);
authRouter.post('/login', validate(loginSchema), login);
authRouter.post('/forgot-password', validate(forgotPasswordSchema), forgotPassword);
authRouter.post('/reset-password/:token', validate(resetPasswordSchema), resetPassword);
authRouter.post('/logout', logOut);
// this router is just for checking
authRouter.get("/me", tokenVerification, (req, res) => {
    res.json({
        success: true,
        user: req.user,
    });
});


module.exports = authRouter;

