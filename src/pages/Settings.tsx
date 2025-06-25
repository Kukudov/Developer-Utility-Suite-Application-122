import React, { useState } from 'react'
import { motion } from 'framer-motion'
import * as Icons from 'lucide-react'
import { useSettings } from '@/contexts/SettingsContext'
import ToolLayout from '@/components/ToolLayout'

const Settings: React.FC = () => {
  const { settings, updateSettings } = useSettings()
  const [formData, setFormData] = useState(settings)
  const [saved, setSaved] = useState(false)

  const handleSave = () => {
    updateSettings(formData)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  const aiModels = [
    { id: 'anthropic/claude-3-haiku', name: 'Claude 3 Haiku', provider: 'Anthropic' },
    { id: 'meta-llama/llama-3.1-8b-instruct:free', name: 'Llama 3.1 8B', provider: 'Meta' },
    { id: 'microsoft/wizardlm-2-8x22b', name: 'WizardLM 2 8x22B', provider: 'Microsoft' },
    { id: 'google/gemma-7b-it:free', name: 'Gemma 7B', provider: 'Google' },
    { id: 'mistralai/mixtral-8x7b-instruct:free', name: 'Mixtral 8x7B', provider: 'Mistral AI' }
  ]

  return (
    <ToolLayout
      title="Settings"
      description="Configure your API keys and preferences"
    >
      <div className="space-y-8">
        {/* API Configuration */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <Icons.Key size={20} />
            API Configuration
          </h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                OpenRouter API Key
              </label>
              <div className="relative">
                <input
                  type="password"
                  value={formData.openRouterApiKey}
                  onChange={(e) => setFormData({ ...formData, openRouterApiKey: e.target.value })}
                  placeholder="Enter your OpenRouter API key"
                  className="w-full px-4 py-3 bg-dark-700 border border-dark-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-12"
                />
                <Icons.Eye size={16} className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
              <p className="text-xs text-gray-400 mt-2">
                Get your free API key from{' '}
                <a
                  href="https://openrouter.ai/keys"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:text-blue-300"
                >
                  OpenRouter
                </a>
              </p>
            </div>
          </div>
        </div>

        {/* AI Model Selection */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <Icons.Brain size={20} />
            AI Model Preferences
          </h3>
          
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Preferred AI Model
            </label>
            <select
              value={formData.preferredAiModel}
              onChange={(e) => setFormData({ ...formData, preferredAiModel: e.target.value })}
              className="w-full px-4 py-3 bg-dark-700 border border-dark-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {aiModels.map((model) => (
                <option key={model.id} value={model.id}>
                  {model.name} ({model.provider})
                </option>
              ))}
            </select>
            <p className="text-xs text-gray-400 mt-2">
              This model will be used by default for AI-powered tools
            </p>
          </div>
        </div>

        {/* Theme Settings */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <Icons.Palette size={20} />
            Appearance
          </h3>
          
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Theme
            </label>
            <div className="flex gap-4">
              <button
                onClick={() => setFormData({ ...formData, theme: 'dark' })}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-colors ${
                  formData.theme === 'dark'
                    ? 'bg-blue-600 border-blue-500 text-white'
                    : 'bg-dark-700 border-dark-600 text-gray-300 hover:border-dark-500'
                }`}
              >
                <Icons.Moon size={16} />
                Dark
              </button>
              <button
                onClick={() => setFormData({ ...formData, theme: 'light' })}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-colors ${
                  formData.theme === 'light'
                    ? 'bg-blue-600 border-blue-500 text-white'
                    : 'bg-dark-700 border-dark-600 text-gray-300 hover:border-dark-500'
                }`}
              >
                <Icons.Sun size={16} />
                Light
              </button>
            </div>
          </div>
        </div>

        {/* Usage Statistics */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <Icons.BarChart3 size={20} />
            Usage Statistics
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-dark-700 rounded-lg p-4">
              <div className="text-2xl font-bold text-blue-400 mb-1">0</div>
              <div className="text-sm text-gray-400">Tools Used</div>
            </div>
            <div className="bg-dark-700 rounded-lg p-4">
              <div className="text-2xl font-bold text-purple-400 mb-1">0</div>
              <div className="text-sm text-gray-400">AI Requests</div>
            </div>
            <div className="bg-dark-700 rounded-lg p-4">
              <div className="text-2xl font-bold text-green-400 mb-1">0</div>
              <div className="text-sm text-gray-400">Favorites</div>
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end pt-6 border-t border-dark-700">
          <motion.button
            onClick={handleSave}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-colors ${
              saved
                ? 'bg-green-600 text-white'
                : 'bg-blue-600 hover:bg-blue-700 text-white'
            }`}
            whileScale={{ scale: saved ? 1.05 : 1 }}
            transition={{ duration: 0.1 }}
          >
            {saved ? (
              <>
                <Icons.Check size={16} />
                Saved!
              </>
            ) : (
              <>
                <Icons.Save size={16} />
                Save Settings
              </>
            )}
          </motion.button>
        </div>
      </div>
    </ToolLayout>
  )
}

export default Settings