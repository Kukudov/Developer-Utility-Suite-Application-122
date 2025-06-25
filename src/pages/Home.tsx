import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import * as Icons from 'lucide-react'
import { toolCategories } from '@/types/tools'
import { useAuth } from '@/contexts/AuthContext'

const Home: React.FC = () => {
  const { user } = useAuth()

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="max-w-7xl mx-auto p-6"
    >
      {/* Header */}
      <div className="text-center mb-12">
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl mb-6"
        >
          <Icons.Code2 size={40} className="text-white" />
        </motion.div>
        
        <motion.h1
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-4xl md:text-6xl font-bold text-white mb-4"
        >
          Developer Toolkit
        </motion.h1>
        
        <motion.p
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-xl text-gray-400 max-w-2xl mx-auto"
        >
          A comprehensive collection of developer tools and AI-powered utilities to streamline your workflow
        </motion.p>

        {user && (
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-6 p-4 bg-dark-800 rounded-lg border border-dark-700 inline-block"
          >
            <p className="text-green-400 font-medium">
              Welcome back, {user.email}!
            </p>
          </motion.div>
        )}
      </div>

      {/* Stats */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
      >
        <div className="bg-dark-800 rounded-xl border border-dark-700 p-6 text-center">
          <div className="text-3xl font-bold text-blue-400 mb-2">
            {toolCategories.reduce((acc, cat) => acc + cat.tools.length, 0)}
          </div>
          <div className="text-gray-400">Total Tools</div>
        </div>
        
        <div className="bg-dark-800 rounded-xl border border-dark-700 p-6 text-center">
          <div className="text-3xl font-bold text-purple-400 mb-2">
            {toolCategories.length}
          </div>
          <div className="text-gray-400">Categories</div>
        </div>
        
        <div className="bg-dark-800 rounded-xl border border-dark-700 p-6 text-center">
          <div className="text-3xl font-bold text-green-400 mb-2">
            {toolCategories.find(cat => cat.id === 'ai-tools')?.tools.length || 0}
          </div>
          <div className="text-gray-400">AI Tools</div>
        </div>
      </motion.div>

      {/* Tool Categories */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {toolCategories.map((category, index) => {
          const IconComponent = Icons[category.icon as keyof typeof Icons] as React.ComponentType<{ size: number }>
          
          return (
            <motion.div
              key={category.id}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 * index }}
              className="bg-dark-800 rounded-xl border border-dark-700 p-6 hover:border-blue-500 transition-colors group"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-blue-600 rounded-lg group-hover:bg-blue-500 transition-colors">
                  <IconComponent size={24} className="text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white">{category.name}</h3>
                  <p className="text-gray-400 text-sm">{category.tools.length} tools</p>
                </div>
              </div>
              
              <div className="space-y-2">
                {category.tools.slice(0, 3).map((tool) => (
                  <Link
                    key={tool.id}
                    to={tool.path}
                    className="block p-2 rounded-lg hover:bg-dark-700 transition-colors"
                  >
                    <div className="text-white text-sm font-medium">{tool.name}</div>
                    <div className="text-gray-400 text-xs">{tool.description}</div>
                  </Link>
                ))}
                
                {category.tools.length > 3 && (
                  <div className="text-gray-400 text-xs text-center pt-2">
                    +{category.tools.length - 3} more tools
                  </div>
                )}
              </div>
            </motion.div>
          )
        })}
      </div>

      {/* Quick Actions */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="mt-12 text-center"
      >
        <h2 className="text-2xl font-bold text-white mb-6">Popular Tools</h2>
        <div className="flex flex-wrap justify-center gap-4">
          {[
            { name: 'JSON Formatter', path: '/tools/json-formatter', icon: 'Braces' },
            { name: 'Password Generator', path: '/tools/password-generator', icon: 'Key' },
            { name: 'UUID Generator', path: '/tools/uuid-generator', icon: 'Hash' },
            { name: 'AI Regex Generator', path: '/tools/ai-regex', icon: 'Zap' },
            { name: 'Base58 Encoder', path: '/tools/base58', icon: 'Binary' },
            { name: 'QR Code Generator', path: '/tools/qr-code', icon: 'QrCode' }
          ].map((tool) => {
            const IconComponent = Icons[tool.icon as keyof typeof Icons] as React.ComponentType<{ size: number }>
            return (
              <Link
                key={tool.name}
                to={tool.path}
                className="inline-flex items-center gap-2 px-4 py-2 bg-dark-800 hover:bg-dark-700 border border-dark-600 hover:border-blue-500 rounded-lg text-white transition-colors"
              >
                <IconComponent size={16} />
                <span className="text-sm">{tool.name}</span>
              </Link>
            )
          })}
        </div>
      </motion.div>
    </motion.div>
  )
}

export default Home