import React, { useState, useContext } from 'react';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Lock, Mail, Loader2 } from 'lucide-react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { baseURL } from '../utils/constant';
import { useNavigate, Link } from 'react-router-dom';
import { UserContext } from '../ContextApi/userContext';
import Cookies from 'js-cookie';
export default function Login() {
  const { setUserData } = useContext(UserContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }
    
    setError('');
    setIsLoading(true);
    try {
      const response = await axios.post(`${baseURL}/user/login`, {
        email,
        password,
      }, { withCredentials: true });

      toast.success(response.data.message);
      const token = Cookies.get('token'); // Get token from cookies
      const profileResponse = await axios.get(`${baseURL}/user/profile`,  {
        headers: {
          Authorization: `Bearer ${token}`, // Pass the token in the Authorization header
          'Content-Type': 'application/json',
        },
        withCredentials: true, // If you're sending cookies along with the request
      } );

      if (profileResponse.data) {
        setUserData(profileResponse.data);
        localStorage.setItem("userName", JSON.stringify(profileResponse.data.user.fullName));
        setTimeout(() => {
          window.location.href = '/welcome';
        }, 1000);
      }
     
    } catch (error) {
      if (error.response && error.response.data) {
        setError(error.response.data.message);
        toast.error(error.response.data.message);
      } else {
        setError('An unexpected error occurred');
        toast.error('An unexpected error occurred');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-500 to-indigo-600 flex items-center justify-center p-4 sm:p-6 md:p-8">
      <Toaster position="bottom-center" reverseOrder={false} />
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-3xl shadow-2xl p-6 sm:p-8 md:p-10 w-full max-w-md"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="mb-8 text-center"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-2">Welcome Back</h2>
          <p className="text-white text-opacity-80">Sign in to your account</p>
        </motion.div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="space-y-2"
          >
            <label htmlFor="email" className="text-sm font-medium text-white block">
              Email
            </label>
            <div className="relative">
              <Mail className="w-5 h-5 text-white opacity-70 absolute left-3 top-1/2 transform -translate-y-1/2" />
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10 w-full px-4 py-3 bg-white bg-opacity-20 border border-white border-opacity-30 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-white placeholder-white placeholder-opacity-70 transition-all duration-300"
                placeholder="you@example.com"
                required
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="space-y-2"
          >
            <label htmlFor="password" className="text-sm font-medium text-white block">
              Password
            </label>
            <div className="relative">
              <Lock className="w-5 h-5 text-white opacity-70 absolute left-3 top-1/2 transform -translate-y-1/2" />
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-10 w-full px-4 py-3 bg-white bg-opacity-20 border border-white border-opacity-30 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-white placeholder-white placeholder-opacity-70 transition-all duration-300"
                placeholder="••••••••"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 focus:outline-none bg-transparent hover:bg-transparent"
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5 text-white opacity-70" />
                ) : (
                  <Eye className="w-5 h-5 text-white opacity-70" />
                )}
              </button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="flex flex-col sm:flex-row items-center justify-between space-y-2 sm:space-y-0"
          >
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-white">
                Remember me
              </label>
            </div>
            <div className="text-sm">
              <Link to="/forgot-password" className="font-medium text-purple-300 hover:text-purple-200 transition-colors duration-300">
                Forgot your password?
              </Link>
            </div>
          </motion.div>

          {error && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-red-300 text-sm text-center bg-red-500 bg-opacity-10 p-2 rounded-lg"
            >
              {error}
            </motion.p>
          )}

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={isLoading}
            className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-all duration-300"
          >
            {isLoading ? (
              <Loader2 className="animate-spin h-5 w-5 text-white" />
            ) : (
              'Sign in'
            )}
          </motion.button>
        </form>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.5 }}
          className="mt-8 text-center text-sm text-white"
        >
          Don't have an account?{' '}
          <Link to="/signup" className="font-medium text-purple-300 hover:text-purple-200 transition-colors duration-300">
            Sign up now
          </Link>
        </motion.p>
      </motion.div>
    </div>
  );
}