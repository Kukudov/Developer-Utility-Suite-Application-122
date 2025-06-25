import React, { useState } from 'react'
import { motion } from 'framer-motion'
import * as Icons from 'lucide-react'
import ToolLayout from '@/components/ToolLayout'
import { useSettings } from '@/contexts/SettingsContext'

const AIRegexGenerator: React.FC = () => {
  const [description, setDescription] = useState('')
  const [regex, setRegex] = useState('')
  const [explanation, setExplanation] = useState('')
  const [testString, setTestString] = useState('')
  const [matches, setMatches] = useState<string[]>([])
  const [loading, setLoading] = useState(false)
  const [selectedModel, setSelectedModel] = useState('')
  const { settings } = useSettings()

  const aiModels = [
    { id: 'anthropic/claude-3-haiku', name: 'Claude 3 Haiku' },
    { id: 'meta-llama/llama-3.1-8b-instruct:free', name: 'Llama 3.1 8B' },
    { id: 'microsoft/wizardlm-2-8x22b', name: 'WizardLM 2 8x22B' },
    { id: 'google/gemma-7b-it:free', name: 'Gemma 7B' },
    { id: 'mistralai/mixtral-8x7b-instruct:free', name: 'Mixtral 8x7B' }
  ]

  React.useEffect(() => {
    if (!selectedModel && settings.preferredAiModel) {
      setSelectedModel(settings.preferredAiModel)
    }
  }, [settings.preferredAiModel, selectedModel])

  const generateRegex = async () => {
    if (!description.trim()) return
    if (!settings.openRouterApiKey) {
      alert('Please set your OpenRouter API key in Settings')
      return
    }

    setLoading(true)
    try {
      const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${settings.openRouterApiKey}`,
          'Content-Type': 'application/json',
          'HTTP-Referer': window.location.origin,
          'X-Title': 'Dev Toolkit'
        },
        body: JSON.stringify({
          model: selectedModel || settings.preferredAiModel,
          messages: [
            {
              role: 'system',
              content: 'You are a regex expert. Generate a regular expression based on the user\'s description. Respond with JSON in this exact format: {"regex": "your_regex_here", "explanation": "detailed explanation of what the regex does and how it works"}. Do not include any other text or formatting.'
            },
            {
              role: 'user',
              content: `Generate a regular expression for: ${description}`
            }
          ],
          max_tokens: 500,
          temperature: 0.3
        })
      })

      if (!response.ok) {
        throw new Error(`API request failed: ${response.status}`)
      }

      const data = await response.json()
      const content = data.choices[0]?.message?.content

      try {
        const parsed = JSON.parse(content)
        setRegex(parsed.regex)
        setExplanation(parsed.explanation)
      } catch {
        // Fallback parsing if JSON is not perfect
        const regexMatch = content.match(/"regex":\s*"([^"]+)"/);
        const explanationMatch = content.match(/"explanation":\s*"([^"]+)"/);
        
        if (regexMatch && explanationMatch) {
          setRegex(regexMatch[1])
          setExplanation(explanationMatch[1])
        } else {
          throw new Error('Unable to parse AI response')
        }
      }
    } catch (error) {
      console.error('Error generating regex:', error)
      alert('Failed to generate regex. Please check your API key and try again.')
    } finally {
      setLoading(false)
    }
  }

  const testRegex = () => {
    if (!regex || !testString) return
    
    try {
      const regexObj = new RegExp(regex, 'g')
      const foundMatches = testString.match(regexObj) || []
      setMatches(foundMatches)
    } catch (error) {
      console.error('Invalid regex:', error)
      setMatches([])
    }
  }

  const copyRegex = () => {
    navigator.clipboard.writeText(regex)
  }

  React.useEffect(() => {
    if (regex && testString) {
      testRegex()
    }
  }, [regex, testString])

  return (
    <ToolLayout
      title="AI Regex Generator"
      description="Generate regular expressions using AI by describing what you want to match"
    >
      <div className="space-y-6">
        {/* API Key Check */}
        {!settings.openRouterApiKey && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 bg-yellow-900/50 border border-yellow-500 rounded-lg text-yellow-200"
          >
            <div className="flex items-center gap-2">
              <Icons.AlertTriangle size={16} />
              <span className="font-medium">API Key Required</span>
            </div>
            <p className="mt-1 text-sm">
              Please set your OpenRouter API key in the Settings page to use AI features.
            </p>
          </motion.div>
        )}

        {/* Model Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            AI Model
          </label>
          <select
            value={selectedModel}
            onChange={(e) => setSelectedModel(e.target.value)}
            className="w-full px-4 py-3 bg-dark-700 border border-dark-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {aiModels.map((model) => (
              <option key={model.id} value={model.id}>
                {model.name}
              </option>
            ))}
          </select>
        </div>

        {/* Description Input */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Describe what you want to match
          </label>
          <div className="flex gap-2">
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="e.g., Email addresses, phone numbers, URLs, dates in MM/DD/YYYY format..."
              className="flex-1 px-4 py-3 bg-dark-700 border border-dark-600 rounded-lg text-white resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={3}
            />
            <button
              onClick={generateRegex}
              disabled={loading || !description.trim() || !settings.openRouterApiKey}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg transition-colors flex items-center gap-2"
            >
              {loading ? (
                <>
                  <Icons.Loader2 size={16} className="animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Icons.Zap size={16} />
                  Generate
                </>
              )}
            </button>
          </div>
        </div>

        {/* Generated Regex */}
        {regex && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-medium text-gray-300">
                  Generated Regular Expression
                </label>
                <button
                  onClick={copyRegex}
                  className="flex items-center gap-1 px-3 py-1 bg-dark-600 hover:bg-dark-500 text-white rounded text-sm transition-colors"
                >
                  <Icons.Copy size={14} />
                  Copy
                </button>
              </div>
              <input
                type="text"
                value={regex}
                readOnly
                className="w-full px-4 py-3 bg-dark-700 border border-dark-600 rounded-lg text-white font-mono focus:outline-none"
              />
            </div>

            {/* Explanation */}
            {explanation && (
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Explanation
                </label>
                <div className="p-4 bg-dark-700 border border-dark-600 rounded-lg text-gray-300">
                  {explanation}
                </div>
              </div>
            )}
          </motion.div>
        )}

        {/* Test Section */}
        {regex && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Test String
              </label>
              <textarea
                value={testString}
                onChange={(e) => setTestString(e.target.value)}
                placeholder="Enter text to test against the regex..."
                className="w-full px-4 py-3 bg-dark-700 border border-dark-600 rounded-lg text-white resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={4}
              />
            </div>

            {/* Matches */}
            {testString && (
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Matches ({matches.length})
                </label>
                <div className="p-4 bg-dark-700 border border-dark-600 rounded-lg min-h-[100px]">
                  {matches.length > 0 ? (
                    <div className="space-y-2">
                      {matches.map((match, index) => (
                        <div
                          key={index}
                          className="px-3 py-2 bg-green-900/30 border border-green-500/30 rounded text-green-200 font-mono text-sm"
                        >
                          {match}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-gray-500 text-center">
                      {testString ? 'No matches found' : 'Enter test string to see matches'}
                    </div>
                  )}
                </div>
              </div>
            )}
          </motion.div>
        )}

        {/* Examples */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 bg-blue-900/20 border border-blue-500/30 rounded-lg"
        >
          <h4 className="text-blue-400 font-medium mb-2 flex items-center gap-2">
            <Icons.Lightbulb size={16} />
            Example Descriptions
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-gray-300">
            <button
              onClick={() => setDescription('Email addresses')}
              className="text-left p-2 hover:bg-dark-700 rounded transition-colors"
            >
              • Email addresses
            </button>
            <button
              onClick={() => setDescription('Phone numbers in (123) 456-7890 format')}
              className="text-left p-2 hover:bg-dark-700 rounded transition-colors"
            >
              • Phone numbers in (123) 456-7890 format
            </button>
            <button
              onClick={() => setDescription('URLs starting with http or https')}
              className="text-left p-2 hover:bg-dark-700 rounded transition-colors"
            >
              • URLs starting with http or https
            </button>
            <button
              onClick={() => setDescription('Dates in MM/DD/YYYY format')}
              className="text-left p-2 hover:bg-dark-700 rounded transition-colors"
            >
              • Dates in MM/DD/YYYY format
            </button>
          </div>
        </motion.div>
      </div>
    </ToolLayout>
  )
}

export default AIRegexGenerator