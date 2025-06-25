import React from 'react'
import { motion } from 'framer-motion'

interface ToolLayoutProps {
  title: string
  description: string
  children: React.ReactNode
}

const ToolLayout: React.FC<ToolLayoutProps> = ({ title, description, children }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="max-w-6xl mx-auto p-6"
    >
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">{title}</h1>
        <p className="text-gray-400">{description}</p>
      </div>
      
      <div className="bg-dark-800 rounded-xl border border-dark-700 p-6">
        {children}
      </div>
    </motion.div>
  )
}

export default ToolLayout