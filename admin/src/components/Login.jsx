import React, { useState } from 'react';
import axios from 'axios';
import { backendURL } from '../App';
import { toast } from 'react-toastify';

const Login = ({setToken}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onSubmitHandler = async (e) => {
    try {
      e.preventDefault();
      const response = await axios.post(backendURL + '/api/user/admin', { email, password });
      if (response.data.success) {
        setToken(response.data.token);
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message)
    }
  }

  return (
    <div className='min-h-screen flex items-center justify-center w-full bg-gray-50 px-4'>
      <div className='bg-white shadow-md rounded-lg px-4 py-6 sm:px-6 sm:py-8 md:px-8 md:py-10 w-full max-w-sm sm:max-w-md md:max-w-lg'>
        <h1 className='text-2xl sm:text-3xl md:text-4xl font-bold mb-4 text-center'>Admin Panel</h1>
        <form onSubmit={onSubmitHandler}>
          <div className='mb-3'>
            <p className='text-sm sm:text-base md:text-lg font-medium text-gray-700 mb-2'>Email Address</p>
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              type="email"
              placeholder='your@email.com'
              required
              className='rounded-md w-full px-3 py-2 sm:px-4 sm:py-3 md:px-5 md:py-4 border border-gray-300 outline-none'
            />
          </div>

          <div className='mb-3'>
            <p className='text-sm sm:text-base md:text-lg font-medium text-gray-700 mb-2'>Password</p>
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              type="password"
              placeholder='Enter your password'
              required
              className='rounded-md w-full px-3 py-2 sm:px-4 sm:py-3 md:px-5 md:py-4 border border-gray-300 outline-none'
            />
          </div>

          <button
            type='submit'
            className='mt-2 w-full px-4 py-2 sm:px-5 sm:py-3 md:px-6 md:py-4 rounded-md text-white bg-black cursor-pointer text-sm sm:text-base md:text-lg hover:bg-gray-800 active:bg-gray-900 active:scale-95 transition-colors duration-150'
          >
            Login
          </button>
        </form>
      </div>
    </div>
  )
}

export default Login;
