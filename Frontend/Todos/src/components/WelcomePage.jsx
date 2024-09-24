'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { CheckCircle, ArrowRight } from 'lucide-react'
import { useNavigate } from 'react-router-dom';

export default function WelcomePage() {
    // Get the userName from localStorage
const storedUserName = localStorage.getItem("userName");

// Parse the JSON string back to a JavaScript object
const userName = storedUserName ? JSON.parse(storedUserName) : null;
const navigate = useNavigate();
const handleClick = () => {
  // Navigate to the desired route, e.g., "/home"
  navigate('/task');
};
  const [username, setUsername] = useState('')

  useEffect(() => {
    // Simulating fetching the username
    setTimeout(() => setUsername(`${userName}`), 500)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-500 via-indigo-600 to-blue-700 flex flex-col items-center justify-center p-4 overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center relative z-10 max-w-4xl w-full"
      >
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 120 }}
          className="mb-8"
        >
          <CheckCircle className="w-24 h-24 md:w-32 md:h-32 text-white mx-auto drop-shadow-lg" />
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 tracking-tight drop-shadow-lg"
        >
          Welcome to GetItDone
        </motion.h1>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
        >
          {username && (
            <motion.p
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1, duration: 0.5 }}
              className="text-2xl md:text-3xl lg:text-4xl text-purple-100 mb-8"
            >
              Hello, <span className="font-semibold">{username}</span>!
            </motion.p>
          )}
          <p className="text-xl md:text-2xl text-purple-100 mb-12 max-w-2xl mx-auto leading-relaxed">
            Your personal task manager for maximum productivity and seamless organization. Let's make today count!
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.8 }}
        >
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: '0 0 25px rgba(255,255,255,0.5)' }}
            whileTap={{ scale: 0.95 }}
            onClick={handleClick}
            className="px-8 py-4 bg-white text-purple-600 rounded-full font-bold text-lg md:text-xl shadow-lg transition-all duration-300 hover:bg-purple-100 hover:text-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-opacity-50 flex items-center justify-center mx-auto"
          >
            Get Started
            <ArrowRight className="ml-2 w-5 h-5" />
          </motion.button>
        </motion.div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.1 }}
        transition={{ delay: 1.7, duration: 1.5 }}
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23FFFFFF" fill-opacity="0.4"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
        }}
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.8 }}
        className="absolute bottom-4 left-4 right-4 text-center text-purple-100 text-sm md:text-base"
      >
        <p>&copy; 2024 GetItDone. All rights reserved.</p>
      </motion.div>
    </div>
  )
}