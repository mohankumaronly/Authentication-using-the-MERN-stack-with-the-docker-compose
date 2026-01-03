import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { forgotPassword } from '../services/api.service';
import Loader from '../components/Loader';

const ForgotPasswordPage = () => {

  const navigate = useNavigate();
  const [Loading, setLoading] = useState(false)
  const [email, setEmail] = useState("");

  const onChange = (e) => {
    setEmail(e.target.value);
  }
  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await forgotPassword({ email });
      setEmail('');
      alert(res.data.message)
      navigate('/check-email');
    } catch (error) {
      alert(error?.response?.message || "Something went wrong");
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      {Loading && <Loader />}
      <div className="flex flex-col items-center mt-10">
        <div className="w-72">
          <h1 className="text-xl font-bold mb-4">Forgot Password</h1>
          <form onSubmit={onSubmit} className="flex flex-col gap-3">
            <div className="flex flex-col">
              <label className="text-sm">Enter your Email</label>
              <input
                type="email"
                required
                className="border border-black p-1"
                name='email'
                value={email}
                onChange={onChange}
              />
            </div>
            <button type="submit" className="border border-black bg-gray-100 py-1 mt-2">
              Send Reset Link
            </button>
          </form>
          <div className="mt-6 text-center">
            <span className='font-bold text-xs hover:underline cursor-pointer'
              onClick={() => navigate('/login')}
            >Back to Login</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default ForgotPasswordPage;