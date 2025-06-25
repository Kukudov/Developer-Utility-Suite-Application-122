import React from 'react'
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from '@/contexts/AuthContext'
import { SettingsProvider } from '@/contexts/SettingsContext'
import AuthLayout from '@/components/AuthLayout'
import Sidebar from '@/components/Sidebar'
import Home from '@/pages/Home'
import Settings from '@/pages/Settings'
import JsonFormatter from '@/pages/tools/JsonFormatter'
import PasswordGenerator from '@/pages/tools/PasswordGenerator'
import AIRegexGenerator from '@/pages/tools/AIRegexGenerator'
import './App.css'

const AppContent: React.FC = () => {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div className="min-h-screen bg-dark-950 flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    )
  }

  if (!user) {
    return <AuthLayout />
  }

  return (
    <div className="min-h-screen bg-dark-950 flex">
      <Sidebar />
      <main className="flex-1 ml-80 transition-all duration-300">
        <div className="p-6">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/tools/json-formatter" element={<JsonFormatter />} />
            <Route path="/tools/password-generator" element={<PasswordGenerator />} />
            <Route path="/tools/ai-regex" element={<AIRegexGenerator />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </main>
    </div>
  )
}

const App: React.FC = () => {
  return (
    <SettingsProvider>
      <AuthProvider>
        <Router>
          <AppContent />
        </Router>
      </AuthProvider>
    </SettingsProvider>
  )
}

export default App