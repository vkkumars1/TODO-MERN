'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Eye, EyeOff, Lock, Mail, User } from 'lucide-react'
import axios from 'axios'
import toast, { Toaster } from 'react-hot-toast'
import { baseURL } from '../utils/constant'

export default function Signup() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [agreeTerms, setAgreeTerms] = useState(false)
  const [error, setError] = useState('')

  const getPasswordStrength = (password) => {
    const minLength = 8
    const hasUppercase = /[A-Z]/.test(password)
    const hasLowercase = /[a-z]/.test(password)
    const hasNumber = /\d/.test(password)
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password)

    if (password.length < minLength) return 'Weak'
    if (hasUppercase && hasLowercase && hasNumber && hasSpecialChar) return 'Strong'
    return 'Medium'
  }

  const passwordStrength = getPasswordStrength(password)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!name || !email || !password || !confirmPassword) {
      setError('Please fill in all fields')
      return
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match')
      return
    }
    if (!agreeTerms) {
      setError('Please agree to the terms and conditions')
      return
    }

    setError('')
    try {
      const response = await axios.post(
        `${baseURL}/user/signup`,
        {
          fullName: name,
          email,
          password,
          confirmPassword,
        },
        { withCredentials: true }
      )

      toast.success(response.data.message)
      localStorage.setItem("userInfo", JSON.stringify(response.data))
      setName("")
      setEmail("")
      setPassword("")
      setConfirmPassword("")
      setAgreeTerms(false)
      setTimeout(() => {
        window.location.href = '/login'
      }, 1000)
    } catch (error) {
      if (error.response && error.response.data) {
        setError(error.response.data.message)
        toast.error(error.response.data.message)
      } else {
        setError('An unexpected error occurred')
        toast.error('An unexpected error occurred')
      }
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 to-indigo-600 flex items-center justify-center p-4">
      <Toaster position="bottom-center" reverseOrder={false} />
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-xl shadow-2xl p-8 max-w-md w-full"
      >
        <h2 className="text-4xl font-bold text-center text-white mb-8">Create an Account</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <InputField
            id="name"
            label="Full Name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="John Doe"
            icon={<User className="w-5 h-5 text-white opacity-70" />}
          />
          <InputField
            id="email"
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            icon={<Mail className="w-5 h-5 text-white opacity-70" />}
          />
          <PasswordField
            id="password"
            label="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            showPassword={showPassword}
            setShowPassword={setShowPassword}
          />
          <div className="text-sm text-white">
            Password strength:{' '}
            <span
              className={`font-medium ${
                passwordStrength === 'Weak'
                  ? 'text-red-300'
                  : passwordStrength === 'Medium'
                  ? 'text-yellow-300'
                  : 'text-green-300'
              }`}
            >
              {passwordStrength}
            </span>
          </div>
          <PasswordField
            id="confirmPassword"
            label="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            showPassword={showConfirmPassword}
            setShowPassword={setShowConfirmPassword}
          />
          <div className="flex items-center">
            <input
              id="agree-terms"
              type="checkbox"
              checked={agreeTerms}
              onChange={(e) => setAgreeTerms(e.target.checked)}
              className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
            />
            <label htmlFor="agree-terms" className="ml-2 block text-sm text-white">
              I agree to the{' '}
              <a href="#" className="font-medium text-purple-300 hover:text-purple-200">
                Terms and Conditions
              </a>
            </label>
          </div>
          {error && <div className="text-red-500 text-sm">{error}</div>}
          <motion.button
            type="submit"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full bg-purple-500 hover:bg-purple-600 text-white font-semibold py-3 rounded-md transition duration-200 shadow-lg"
          >
            Sign Up
          </motion.button>
        </form>
      </motion.div>
    </div>
  )
}

const InputField = ({ id, label, type, value, onChange, placeholder, icon }) => (
  <div className="space-y-2">
    <label htmlFor={id} className="text-sm font-medium text-white block">
      {label}
    </label>
    <div className="relative">
      <div className="absolute left-3 top-1/2 transform -translate-y-1/2">{icon}</div>
      <motion.input
        whileFocus={{ scale: 1.02 }}
        type={type}
        id={id}
        value={value}
        onChange={onChange}
        className="pl-10 w-full px-3 py-3 bg-white bg-opacity-20 border border-white border-opacity-30 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 text-white placeholder-white placeholder-opacity-70"
        placeholder={placeholder}
        required
      />
    </div>
  </div>
)

const PasswordField = ({ id, label, value, onChange, showPassword, setShowPassword }) => (
  <div className="space-y-2">
    <label htmlFor={id} className="text-sm font-medium text-white block">
      {label}
    </label>
    <div className="relative">
      <Lock className="w-5 h-5 text-white opacity-70 absolute left-3 top-1/2 transform -translate-y-1/2" />
      <motion.input
        whileFocus={{ scale: 1.02 }}
        type={showPassword ? "text" : "password"}
        id={id}
        value={value}
        onChange={onChange}
        className="pl-10 w-full px-3 py-3 bg-white bg-opacity-20 border border-white border-opacity-30 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 text-white placeholder-white placeholder-opacity-70"
        placeholder="••••••••"
        required
      />
      <button
        type="button"
        onClick={() => setShowPassword(!showPassword)}
        className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-transparent hover:bg-transparent"
      >
        {showPassword ? (
          <EyeOff className="w-5 h-5 text-white opacity-70" />
        ) : (
          <Eye className="w-5 h-5 text-white opacity-70" />
        )}
      </button>
    </div>
  </div>
)