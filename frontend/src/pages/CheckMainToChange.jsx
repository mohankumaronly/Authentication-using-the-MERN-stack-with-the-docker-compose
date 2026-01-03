import React from 'react'
import { useNavigate } from 'react-router-dom'

const CheckMainToChange = () => {

    const navigate = useNavigate();

    return (
        <div className='h-screen flex items-center justify-center flex-col text-center px-4'>
            <h1>check email reset link has been sent and change the password</h1>
            <button className='underline cursor-pointer text-blue-500'
                onClick={() => {
                    navigate('/login')
                }}
            >Back to register page</button>
        </div>
    )
}

export default CheckMainToChange