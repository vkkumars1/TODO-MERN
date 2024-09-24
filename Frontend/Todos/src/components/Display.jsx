'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { CheckCircle, Smartphone, Laptop, Tablet } from 'lucide-react'
import { useNavigate } from 'react-router-dom';
export default function Display() {

    const navigate = useNavigate();
    const Login = () => {
        // Navigate to the desired route, e.g., "/home"
        navigate('/login');
      };
    const Signup = () => {
        // Navigate to the desired route, e.g., "/home"
        navigate('/signup');
      };
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-500 via-indigo-600 to-blue-700 flex flex-col items-center justify-center p-4 overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center relative z-10"
      >
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 120 }}
          className="mb-8"
        >
          <CheckCircle className="w-32 h-32 text-white mx-auto drop-shadow-lg" />
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-6xl md:text-8xl font-bold text-white mb-6 tracking-tight drop-shadow-lg"
        >
          GetItDone
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="text-xl md:text-3xl text-purple-100 mb-12 max-w-xl mx-auto leading-relaxed"
        >
          Your personal task manager for maximum productivity and seamless organization
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.8 }}
          className="flex justify-center space-x-6"
        >
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: '0 0 25px rgba(255,255,255,0.5)' }}
            whileTap={{ scale: 0.95 }}
            onClick={Login}
            className="px-8 py-3 bg-white text-purple-600 rounded-full font-bold text-lg shadow-lg transition-all duration-300 hover:bg-purple-100 hover:text-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-opacity-50"
          >
            Login
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: '0 0 25px rgba(255,255,255,0.5)' }}
            whileTap={{ scale: 0.95 }}
            onClick={Signup}
            className="px-8 py-3 bg-purple-700 text-white rounded-full font-bold text-lg shadow-lg transition-all duration-300 hover:bg-purple-800 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-opacity-50"
          >
            Sign Up
          </motion.button>
        </motion.div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.8 }}
        className="mt-20 text-center"
      >
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.6, duration: 0.8 }}
          className="text-purple-100 mb-6 text-xl font-semibold"
        >
          Available on all devices
        </motion.p>
        <div className="flex justify-center space-x-8">
          <motion.div
            whileHover={{ y: -5, scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="text-white transition-all duration-300"
          >
            <Smartphone className="w-12 h-12" />
          </motion.div>
          <motion.div
            whileHover={{ y: -5, scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="text-white transition-all duration-300"
          >
            <Tablet className="w-12 h-12" />
          </motion.div>
          <motion.div
            whileHover={{ y: -5, scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="text-white transition-all duration-300"
          >
            <Laptop className="w-12 h-12" />
          </motion.div>
        </div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.1 }}
        transition={{ delay: 1.7, duration: 1.5 }}
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23FFFFFF" fill-opacity="0.4"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
        }}
      ></motion.div>
    </div>
  )
}