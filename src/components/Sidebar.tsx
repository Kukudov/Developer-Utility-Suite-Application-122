import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import * as Icons from 'lucide-react'
import { toolCategories } from '@/types/tools'
import { useAuth } from '@/contexts/AuthContext'

const Sidebar: React.FC = () => {
  const [expandedCategories, setExpandedCategories] = useState<string[]>(['text'])
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const location = useLocation()
  const { user, signOut } = useAuth()

  const toggleCategory = (categoryId: string) => {
    setExpandedCategories(prev =>
      prev.includes(categoryId)
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    )
  }

  const isToolActive = (toolPath: string) => location.pathname === toolPath

  return (
    <motion.div
      className={`fixed left-0 top-0 h-full bg-dark-900 border-r border-dark-700 transition-all duration-300 z-50 ${
        sidebarCollapsed ? 'w-16' : 'w-80'
      }`}
      initial={{ x: -320 }}
      animate={{ x: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="p-4 border-b border-dark-700">
          <div className="flex items-center justify-between">
            {!sidebarCollapsed && (
              <h1 className="text-xl font-bold text-white">Dev Toolkit</h1>
            )}
            <button
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="p-2 rounded-lg hover:bg-dark-800 text-gray-400 hover:text-white transition-colors"
            >
              <Icons.Menu size={20} />
            </button>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-dark-600 scrollbar-track-transparent">
          <div className="p-2">
            {/* Home Link */}
            <Link
              to="/"
              className={`flex items-center gap-3 p-3 rounded-lg mb-2 transition-colors ${
                location.pathname === '/' 
                  ? 'bg-blue-600 text-white' 
                  : 'text-gray-300 hover:bg-dark-800 hover:text-white'
              }`}
            >
              <Icons.Home size={20} />
              {!sidebarCollapsed && <span>Home</span>}
            </Link>

            {/* Settings Link */}
            <Link
              to="/settings"
              className={`flex items-center gap-3 p-3 rounded-lg mb-4 transition-colors ${
                location.pathname === '/settings' 
                  ? 'bg-blue-600 text-white' 
                  : 'text-gray-300 hover:bg-dark-800 hover:text-white'
              }`}
            >
              <Icons.Settings size={20} />
              {!sidebarCollapsed && <span>Settings</span>}
            </Link>

            {/* Tool Categories */}
            {toolCategories.map((category) => {
              const IconComponent = Icons[category.icon as keyof typeof Icons] as React.ComponentType<{ size: number }>
              const isExpanded = expandedCategories.includes(category.id)

              return (
                <div key={category.id} className="mb-2">
                  <button
                    onClick={() => !sidebarCollapsed && toggleCategory(category.id)}
                    className="w-full flex items-center gap-3 p-3 rounded-lg text-gray-300 hover:bg-dark-800 hover:text-white transition-colors"
                  >
                    <IconComponent size={20} />
                    {!sidebarCollapsed && (
                      <>
                        <span className="flex-1 text-left">{category.name}</span>
                        <Icons.ChevronDown
                          size={16}
                          className={`transition-transform ${isExpanded ? 'rotate-180' : ''}`}
                        />
                      </>
                    )}
                  </button>

                  <AnimatePresence>
                    {isExpanded && !sidebarCollapsed && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="ml-6 overflow-hidden"
                      >
                        {category.tools.map((tool) => {
                          const ToolIcon = Icons[tool.icon as keyof typeof Icons] as React.ComponentType<{ size: number }>
                          return (
                            <Link
                              key={tool.id}
                              to={tool.path}
                              className={`flex items-center gap-3 p-2 rounded-lg mb-1 transition-colors text-sm ${
                                isToolActive(tool.path)
                                  ? 'bg-blue-600 text-white'
                                  : 'text-gray-400 hover:bg-dark-800 hover:text-white'
                              }`}
                            >
                              <ToolIcon size={16} />
                              <span>{tool.name}</span>
                            </Link>
                          )
                        })}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )
            })}
          </div>
        </div>

        {/* User Info */}
        {user && !sidebarCollapsed && (
          <div className="p-4 border-t border-dark-700">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center">
                  <Icons.User size={16} className="text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-white truncate">
                    {user.email}
                  </p>
                </div>
              </div>
              <button
                onClick={signOut}
                className="p-2 rounded-lg hover:bg-dark-800 text-gray-400 hover:text-white transition-colors"
                title="Sign Out"
              >
                <Icons.LogOut size={16} />
              </button>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  )
}

export default Sidebar