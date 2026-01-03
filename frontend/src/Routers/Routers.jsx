import React from 'react'
import RegisterPage from '../pages/RegisterPage'
import { Route, Routes } from 'react-router-dom'
import LoginPage from '../pages/LoginPage'
import ForgotPasswordPage from '../pages/ForgotPasswordPage'
import ResetPasswordPage from '../pages/ResetPasswordPage'
import HomePage from '../pages/HomePage'
import VerifyEmailPage from '../pages/VerifyEmailPage'
import CheckMainToChange from '../pages/CheckMainToChange'

const Routers = () => {
    return (
        <Routes>
            <Route path='/' element={<RegisterPage />} />
            <Route path='/login' element={<LoginPage />} />
            <Route path='/forgot-password' element={<ForgotPasswordPage />} />
            <Route path='/home' element={<HomePage />} />
            <Route path='/check-email' element={<CheckMainToChange />} />
            <Route path='/verify-email/:token' element={<VerifyEmailPage />} />
            <Route path='/reset-password/:token' element={<ResetPasswordPage />} />
        </Routes>
    )
}

export default Routers