import api from "./api"

export const userRegister = async (data) => {
    return await api.post('/auth/register', data)
}

export const emailVerification = async (token) => {
    return await api.post(`/auth/verify-email/${token}`);
}

export const userLogin = async (data) => {
    return await api.post('/auth/login', data)
}

export const forgotPassword = async (data) => {
    return await api.post('/auth/forgot-password', data)
}

export const resetPassword = async (data, token) => {
    return await api.post(`/auth/reset-password/${token}`, data)
}