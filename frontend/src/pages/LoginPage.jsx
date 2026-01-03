import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { userLogin } from '../services/api.service';
import Loader from '../components/Loader';

const LoginPage = () => {

  const navigate = useNavigate();
  const [Loading, setLoading] = useState(false);
  const [FormData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  const onChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  }

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await userLogin(FormData);
      navigate('/home');
      setFormData({
        email: "",
        password: "",
        rememberMe: false,
      });
    } catch (error) {
      alert(error?.response?.data?.message)
    } finally {
      setLoading(false)
    }
  }


  return (
    <>
      {Loading && <Loader />}
      <div className="flex flex-col items-center mt-10">
        <div className="w-72">
          <h1 className="text-xl font-bold mb-4">Login</h1>
          <form
            className="flex flex-col gap-3"
            onSubmit={onSubmit}
          >
            <div className="flex flex-col">
              <label className="text-sm">Email</label>
              <input
                type="email"
                className="border border-black p-1"
                name='email'
                value={FormData.email}
                onChange={onChange}
              />
            </div>
            <div className="flex flex-col">
              <label className="text-sm">Password</label>
              <input
                type="password"
                className="border border-black p-1"
                name='password'
                value={FormData.password}
                onChange={onChange}
              />
            </div>
            <div className="flex justify-between items-center">
              <label className="flex items-center text-xs gap-1">
                <input
                  type="checkbox"
                  className="border border-black"
                  name='rememberMe'
                  checked={FormData.rememberMe}
                  onChange={onChange}
                />
                Remember me
              </label>
              <span className='hover:underline font-bold text-xs cursor-pointer'
                onClick={() => navigate('/forgot-password')}
              >
                Forgot password?
              </span>
            </div>
            <button type="submit" className="border border-black bg-gray-100 py-1 mt-2">
              Login
            </button>
          </form>
          <div className="mt-4 text-sm">
            <span>Don't have an account? </span>
            <span
              className='font-bold hover:underline cursor-pointer px-2'
              onClick={() => navigate('/')}
            >Register</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;