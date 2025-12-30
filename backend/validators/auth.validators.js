const Joi = require('joi');

const registerSchema = Joi.object({
    firstName: Joi.string().trim().required(),
    lastName: Joi.string().trim().required(),
    email: Joi.string().email().required(),
    password: Joi.string().trim().min(6).max(20).required()
});

const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().trim().min(6).max(20).required(),
    rememberMe: Joi.boolean().optional()
});

const forgotPasswordSchema = Joi.object({
    email: Joi.string().email().required(),
});

const resetPasswordSchema = Joi.object({
    password: Joi.string().trim().min(6).max(20).required(),
});

module.exports = {
    registerSchema,
    loginSchema,
    forgotPasswordSchema,
    resetPasswordSchema
}