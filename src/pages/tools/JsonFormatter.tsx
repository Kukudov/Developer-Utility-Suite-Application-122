import React, { useState } from 'react'
import { motion } from 'framer-motion'
import * as Icons from 'lucide-react'
import ToolLayout from '@/components/ToolLayout'

const JsonFormatter: React.FC = () => {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [error, setError] = useState('')
  const [indentSize, setIndentSize] = useState(2)

  const formatJson = () => {
    try {
      const parsed = JSON.parse(input)
      const formatted = JSON.stringify(parsed, null, indentSize)
      setOutput(formatted)
      setError('')
    } catch (err) {
      setError('Invalid JSON: ' + (err as Error).message)
      setOutput('')
    }
  }

  const minifyJson = () => {
    try {
      const parsed = JSON.parse(input)
      const minified = JSON.stringify(parsed)
      setOutput(minified)
      setError('')
    } catch (err) {
      setError('Invalid JSON: ' + (err as Error).message)
      setOutput('')
    }
  }

  const validateJson = () => {
    try {
      JSON.parse(input)
      setError('')
      setOutput('✅ Valid JSON')
    } catch (err) {
      setError('❌ Invalid JSON: ' + (err as Error).message)
      setOutput('')
    }
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(output)
  }

  const clearAll = () => {
    setInput('')
    setOutput('')
    setError('')
  }

  return (
    <ToolLayout
      title="JSON Formatter"
      description="Format, minify, and validate JSON data with syntax highlighting"
    >
      <div className="space-y-6">
        {/* Controls */}
        <div className="flex flex-wrap gap-4 items-center">
          <div className="flex items-center gap-2">
            <label className="text-sm text-gray-300">Indent Size:</label>
            <select
              value={indentSize}
              onChange={(e) => setIndentSize(Number(e.target.value))}
              className="px-3 py-1 bg-dark-700 border border-dark-600 rounded text-white text-sm"
            >
              <option value={2}>2 spaces</option>
              <option value={4}>4 spaces</option>
              <option value={1}>1 tab</option>
            </select>
          </div>
          
          <div className="flex gap-2">
            <button
              onClick={formatJson}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
            >
              <Icons.Code size={16} />
              Format
            </button>
            
            <button
              onClick={minifyJson}
              className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors"
            >
              <Icons.Minimize2 size={16} />
              Minify
            </button>
            
            <button
              onClick={validateJson}
              className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
            >
              <Icons.CheckCircle size={16} />
              Validate
            </button>
            
            <button
              onClick={clearAll}
              className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
            >
              <Icons.Trash2 size={16} />
              Clear
            </button>
          </div>
        </div>

        {/* Input/Output */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-medium text-white">Input JSON</h3>
            </div>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Paste your JSON here..."
              className="w-full h-96 p-4 bg-dark-700 border border-dark-600 rounded-lg text-white font-mono text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-medium text-white">Output</h3>
              {output && (
                <button
                  onClick={copyToClipboard}
                  className="flex items-center gap-1 px-3 py-1 bg-dark-600 hover:bg-dark-500 text-white rounded text-sm transition-colors"
                >
                  <Icons.Copy size={14} />
                  Copy
                </button>
              )}
            </div>
            <div className="relative">
              <textarea
                value={output}
                readOnly
                className="w-full h-96 p-4 bg-dark-700 border border-dark-600 rounded-lg text-white font-mono text-sm resize-none focus:outline-none"
              />
              {!output && !error && (
                <div className="absolute inset-0 flex items-center justify-center text-gray-500">
                  <div className="text-center">
                    <Icons.FileJson size={48} className="mx-auto mb-2 opacity-50" />
                    <p>Formatted JSON will appear here</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Error Display */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 bg-red-900/50 border border-red-500 rounded-lg text-red-200"
          >
            <div className="flex items-center gap-2">
              <Icons.AlertCircle size={16} />
              <span className="font-medium">Error:</span>
            </div>
            <p className="mt-1 text-sm">{error}</p>
          </motion.div>
        )}

        {/* JSON Info */}
        {output && !error && input && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 bg-green-900/20 border border-green-500/30 rounded-lg"
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div>
                <span className="text-gray-400">Characters:</span>
                <div className="text-white font-mono">{output.length.toLocaleString()}</div>
              </div>
              <div>
                <span className="text-gray-400">Lines:</span>
                <div className="text-white font-mono">{output.split('\n').length}</div>
              </div>
              <div>
                <span className="text-gray-400">Size:</span>
                <div className="text-white font-mono">{(new Blob([output]).size / 1024).toFixed(2)} KB</div>
              </div>
              <div>
                <span className="text-gray-400">Status:</span>
                <div className="text-green-400 font-medium">✅ Valid</div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </ToolLayout>
  )
}

export default JsonFormatter