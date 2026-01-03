import React, { useEffect, useState } from 'react'
import { emailVerification } from '../services/api.service';
import Loader from '../components/Loader';
import { useNavigate, useParams } from 'react-router-dom';

const VerifyEmailPage = () => {

    const [status, setStatus] = useState("verifying");
    const [loading, setLoading] = useState(true);
    const { token } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const verifyEmail = async () => {
            try {
                await emailVerification(token)
                setStatus('success');
            } catch (error) {
                setStatus('failed')
            } finally {
                setLoading(false)
            }
        }
        verifyEmail();
    }, [token])

    if (loading) return <Loader />

    return (
        <div className="min-h-screen flex items-center justify-center">
            {status === "success" && (
                <div className="text-center">
                    <h1 className="text-xl font-bold text-green-600">
                        Email verified successfully
                    </h1>
                    <p className="mt-2 text-gray-600">
                        You can close this window and continue the login process.
                    </p>
                    <button
                        className="mt-4 underline text-blue-600"
                        onClick={() => navigate("/login")}
                    >
                        Go to Login
                    </button>
                </div>
            )}
            {status === "failed" && (
                <div className="text-center">
                    <h1 className="text-xl font-bold text-red-600">
                        Verification failed
                    </h1>
                    <p className="mt-2 text-gray-600">
                        This link may be expired or invalid.
                    </p>
                </div>
            )}
        </div >
    )
}

export default VerifyEmailPage