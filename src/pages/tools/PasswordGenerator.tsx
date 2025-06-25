import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import * as Icons from 'lucide-react'
import ToolLayout from '@/components/ToolLayout'

const PasswordGenerator: React.FC = () => {
  const [password, setPassword] = useState('')
  const [length, setLength] = useState(16)
  const [includeUppercase, setIncludeUppercase] = useState(true)
  const [includeLowercase, setIncludeLowercase] = useState(true)
  const [includeNumbers, setIncludeNumbers] = useState(true)
  const [includeSymbols, setIncludeSymbols] = useState(true)
  const [excludeSimilar, setExcludeSimilar] = useState(false)
  const [strength, setStrength] = useState(0)
  const [copied, setCopied] = useState(false)

  const generatePassword = () => {
    let charset = ''
    
    if (includeUppercase) charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    if (includeLowercase) charset += 'abcdefghijklmnopqrstuvwxyz'
    if (includeNumbers) charset += '0123456789'
    if (includeSymbols) charset += '!@#$%^&*()_+-=[]{}|;:,.<>?'
    
    if (excludeSimilar) {
      charset = charset.replace(/[0O1lI]/g, '')
    }
    
    if (!charset) return
    
    let result = ''
    for (let i = 0; i < length; i++) {
      result += charset.charAt(Math.floor(Math.random() * charset.length))
    }
    
    setPassword(result)
    calculateStrength(result)
  }

  const calculateStrength = (pwd: string) => {
    let score = 0
    
    // Length
    if (pwd.length >= 8) score += 1
    if (pwd.length >= 12) score += 1
    if (pwd.length >= 16) score += 1
    
    // Character types
    if (/[a-z]/.test(pwd)) score += 1
    if (/[A-Z]/.test(pwd)) score += 1
    if (/[0-9]/.test(pwd)) score += 1
    if (/[^a-zA-Z0-9]/.test(pwd)) score += 1
    
    // Complexity
    if (pwd.length >= 20) score += 1
    
    setStrength(Math.min(score, 5))
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(password)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const getStrengthColor = () => {
    if (strength <= 2) return 'text-red-400'
    if (strength <= 3) return 'text-yellow-400'
    return 'text-green-400'
  }

  const getStrengthText = () => {
    if (strength <= 2) return 'Weak'
    if (strength <= 3) return 'Medium'
    if (strength <= 4) return 'Strong'
    return 'Very Strong'
  }

  useEffect(() => {
    generatePassword()
  }, [length, includeUppercase, includeLowercase, includeNumbers, includeSymbols, excludeSimilar])

  return (
    <ToolLayout
      title="Password Generator"
      description="Generate secure passwords with customizable options"
    >
      <div className="space-y-6">
        {/* Generated Password */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Generated Password
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={password}
              readOnly
              className="flex-1 px-4 py-3 bg-dark-700 border border-dark-600 rounded-lg text-white font-mono text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={copyToClipboard}
              className={`px-4 py-3 rounded-lg font-medium transition-colors ${
                copied
                  ? 'bg-green-600 text-white'
                  : 'bg-blue-600 hover:bg-blue-700 text-white'
              }`}
            >
              {copied ? <Icons.Check size={20} /> : <Icons.Copy size={20} />}
            </button>
            <button
              onClick={generatePassword}
              className="px-4 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors"
            >
              <Icons.RefreshCw size={20} />
            </button>
          </div>
          
          {/* Strength Indicator */}
          <div className="mt-3 flex items-center gap-4">
            <div className="flex-1">
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className={`h-2 flex-1 rounded ${
                      i < strength ? getStrengthColor().replace('text-', 'bg-') : 'bg-dark-600'
                    }`}
                  />
                ))}
              </div>
            </div>
            <span className={`text-sm font-medium ${getStrengthColor()}`}>
              {getStrengthText()}
            </span>
          </div>
        </div>

        {/* Options */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-medium text-white mb-4">Length</h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm text-gray-300 mb-2">
                  <span>Password Length</span>
                  <span>{length} characters</span>
                </div>
                <input
                  type="range"
                  min="4"
                  max="128"
                  value={length}
                  onChange={(e) => setLength(Number(e.target.value))}
                  className="w-full h-2 bg-dark-600 rounded-lg appearance-none cursor-pointer"
                />
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium text-white mb-4">Character Types</h3>
            <div className="space-y-3">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={includeUppercase}
                  onChange={(e) => setIncludeUppercase(e.target.checked)}
                  className="w-4 h-4 text-blue-600 bg-dark-700 border-dark-600 rounded focus:ring-blue-500"
                />
                <span className="text-gray-300">Uppercase (A-Z)</span>
              </label>
              
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={includeLowercase}
                  onChange={(e) => setIncludeLowercase(e.target.checked)}
                  className="w-4 h-4 text-blue-600 bg-dark-700 border-dark-600 rounded focus:ring-blue-500"
                />
                <span className="text-gray-300">Lowercase (a-z)</span>
              </label>
              
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={includeNumbers}
                  onChange={(e) => setIncludeNumbers(e.target.checked)}
                  className="w-4 h-4 text-blue-600 bg-dark-700 border-dark-600 rounded focus:ring-blue-500"
                />
                <span className="text-gray-300">Numbers (0-9)</span>
              </label>
              
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={includeSymbols}
                  onChange={(e) => setIncludeSymbols(e.target.checked)}
                  className="w-4 h-4 text-blue-600 bg-dark-700 border-dark-600 rounded focus:ring-blue-500"
                />
                <span className="text-gray-300">Symbols (!@#$%...)</span>
              </label>
              
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={excludeSimilar}
                  onChange={(e) => setExcludeSimilar(e.target.checked)}
                  className="w-4 h-4 text-blue-600 bg-dark-700 border-dark-600 rounded focus:ring-blue-500"
                />
                <span className="text-gray-300">Exclude similar (0, O, 1, l, I)</span>
              </label>
            </div>
          </div>
        </div>

        {/* Password Tips */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 bg-blue-900/20 border border-blue-500/30 rounded-lg"
        >
          <h4 className="text-blue-400 font-medium mb-2 flex items-center gap-2">
            <Icons.Shield size={16} />
            Password Security Tips
          </h4>
          <ul className="text-sm text-gray-300 space-y-1">
            <li>• Use at least 12 characters for better security</li>
            <li>• Include a mix of uppercase, lowercase, numbers, and symbols</li>
            <li>• Avoid using personal information or common words</li>
            <li>• Use a unique password for each account</li>
            <li>• Consider using a password manager</li>
          </ul>
        </motion.div>
      </div>
    </ToolLayout>
  )
}

export default PasswordGenerator