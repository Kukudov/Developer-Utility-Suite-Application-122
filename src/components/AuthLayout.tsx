import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useAuth } from '@/contexts/AuthContext'
import * as Icons from 'lucide-react'

const AuthLayout: React.FC = () => {
  const [mode, setMode] = useState<'signin' | 'signup' | 'reset'>('signin')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  const { signIn, signUp, resetPassword } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setMessage('')

    try {
      let result
      if (mode === 'signin') {
        result = await signIn(email, password)
      } else if (mode === 'signup') {
        result = await signUp(email, password)
        if (!result.error) {
          setMessage('Check your email for the confirmation link!')
        }
      } else {
        result = await resetPassword(email)
        if (!result.error) {
          setMessage('Check your email for the password reset link!')
        }
      }

      if (result.error) {
        setError(result.error.message)
      }
    } catch (err) {
      setError('An unexpected error occurred')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-dark-950 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="w-full max-w-md"
      >
        <div className="bg-dark-900 rounded-xl border border-dark-700 p-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-full mb-4">
              <Icons.Code2 size={32} className="text-white" />
            </div>
            <h1 className="text-2xl font-bold text-white mb-2">Dev Toolkit</h1>
            <p className="text-gray-400">
              {mode === 'signin' && 'Sign in to your account'}
              {mode === 'signup' && 'Create your account'}
              {mode === 'reset' && 'Reset your password'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 bg-dark-800 border border-dark-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter your email"
              />
            </div>

            {mode !== 'reset' && (
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full px-4 py-3 bg-dark-800 border border-dark-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your password"
                />
              </div>
            )}

            {error && (
              <div className="p-3 bg-red-900/50 border border-red-500 rounded-lg text-red-200 text-sm">
                {error}
              </div>
            )}

            {message && (
              <div className="p-3 bg-green-900/50 border border-green-500 rounded-lg text-green-200 text-sm">
                {message}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              {loading && <Icons.Loader2 size={16} className="animate-spin" />}
              {mode === 'signin' && 'Sign In'}
              {mode === 'signup' && 'Sign Up'}
              {mode === 'reset' && 'Send Reset Link'}
            </button>
          </form>

          <div className="mt-6 text-center space-y-2">
            {mode === 'signin' && (
              <>
                <button
                  onClick={() => setMode('reset')}
                  className="text-blue-400 hover:text-blue-300 text-sm"
                >
                  Forgot your password?
                </button>
                <div>
                  <span className="text-gray-400 text-sm">Don't have an account? </span>
                  <button
                    onClick={() => setMode('signup')}
                    className="text-blue-400 hover:text-blue-300 text-sm"
                  >
                    Sign up
                  </button>
                </div>
              </>
            )}

            {mode === 'signup' && (
              <div>
                <span className="text-gray-400 text-sm">Already have an account? </span>
                <button
                  onClick={() => setMode('signin')}
                  className="text-blue-400 hover:text-blue-300 text-sm"
                >
                  Sign in
                </button>
              </div>
            )}

            {mode === 'reset' && (
              <button
                onClick={() => setMode('signin')}
                className="text-blue-400 hover:text-blue-300 text-sm"
              >
                Back to sign in
              </button>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default AuthLayout