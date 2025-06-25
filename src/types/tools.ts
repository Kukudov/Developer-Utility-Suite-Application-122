export interface Tool {
  id: string
  name: string
  description: string
  category: string
  path: string
  icon: string
}

export interface ToolCategory {
  id: string
  name: string
  icon: string
  tools: Tool[]
}

export const toolCategories: ToolCategory[] = [
  {
    id: 'text',
    name: 'Text & String Tools',
    icon: 'Type',
    tools: [
      { id: 'ascii-art', name: 'ASCII Art Generator', description: 'Convert text to ASCII art', category: 'text', path: '/tools/ascii-art', icon: 'Hash' },
      { id: 'case-converter', name: 'Case Converter', description: 'Convert string cases', category: 'text', path: '/tools/case-converter', icon: 'ToggleLeft' },
      { id: 'string-inspector', name: 'String Inspector', description: 'Analyze string properties', category: 'text', path: '/tools/string-inspector', icon: 'Search' },
      { id: 'lorem-ipsum', name: 'Lorem Ipsum Generator', description: 'Generate placeholder text', category: 'text', path: '/tools/lorem-ipsum', icon: 'FileText' },
      { id: 'text-diff', name: 'Text Diff', description: 'Compare text differences', category: 'text', path: '/tools/text-diff', icon: 'GitCompare' },
      { id: 'html-to-text', name: 'HTML To Text', description: 'Strip HTML tags', category: 'text', path: '/tools/html-to-text', icon: 'Code' },
      { id: 'markdown-to-html', name: 'Markdown To HTML', description: 'Convert Markdown to HTML', category: 'text', path: '/tools/markdown-to-html', icon: 'FileCode' },
      { id: 'html-to-markdown', name: 'HTML To Markdown', description: 'Convert HTML to Markdown', category: 'text', path: '/tools/html-to-markdown', icon: 'FileCode' }
    ]
  },
  {
    id: 'encoding',
    name: 'Encoding & Decoding',
    icon: 'Lock',
    tools: [
      { id: 'base58', name: 'Base58 Encoder/Decoder', description: 'Encode/decode Base58', category: 'encoding', path: '/tools/base58', icon: 'Binary' },
      { id: 'uri-encoder', name: 'URI Encoder/Decoder', description: 'Encode/decode URIs', category: 'encoding', path: '/tools/uri-encoder', icon: 'Link' },
      { id: 'html-entities', name: 'HTML Entities', description: 'Encode/decode HTML entities', category: 'encoding', path: '/tools/html-entities', icon: 'Code' },
      { id: 'url-parser', name: 'URL Parser', description: 'Parse and analyze URLs', category: 'encoding', path: '/tools/url-parser', icon: 'Globe' },
      { id: 'query-parser', name: 'Query String Parser', description: 'Parse query strings', category: 'encoding', path: '/tools/query-parser', icon: 'Search' }
    ]
  },
  {
    id: 'formatter',
    name: 'Formatter & Validator',
    icon: 'Code2',
    tools: [
      { id: 'json-formatter', name: 'JSON Formatter', description: 'Format and validate JSON', category: 'formatter', path: '/tools/json-formatter', icon: 'Braces' },
      { id: 'json-viewer', name: 'JSON Viewer', description: 'View JSON in tree format', category: 'formatter', path: '/tools/json-viewer', icon: 'Eye' },
      { id: 'json-explorer', name: 'JSON Explorer', description: 'Explore JSON structure', category: 'formatter', path: '/tools/json-explorer', icon: 'FolderTree' },
      { id: 'xml-formatter', name: 'XML Formatter', description: 'Format XML documents', category: 'formatter', path: '/tools/xml-formatter', icon: 'FileCode' },
      { id: 'yaml-formatter', name: 'YAML Formatter', description: 'Format YAML documents', category: 'formatter', path: '/tools/yaml-formatter', icon: 'FileText' },
      { id: 'css-formatter', name: 'CSS Formatter', description: 'Format CSS code', category: 'formatter', path: '/tools/css-formatter', icon: 'Palette' },
      { id: 'html-formatter', name: 'HTML Formatter', description: 'Format HTML code', category: 'formatter', path: '/tools/html-formatter', icon: 'Code' },
      { id: 'sql-formatter', name: 'SQL Formatter', description: 'Format SQL queries', category: 'formatter', path: '/tools/sql-formatter', icon: 'Database' }
    ]
  },
  {
    id: 'generators',
    name: 'Generators',
    icon: 'Zap',
    tools: [
      { id: 'password-generator', name: 'Password Generator', description: 'Generate secure passwords', category: 'generators', path: '/tools/password-generator', icon: 'Key' },
      { id: 'uuid-generator', name: 'UUID Generator', description: 'Generate UUIDs', category: 'generators', path: '/tools/uuid-generator', icon: 'Hash' },
      { id: 'ulid-generator', name: 'ULID Generator', description: 'Generate ULIDs', category: 'generators', path: '/tools/ulid-generator', icon: 'Hash' },
      { id: 'qr-code', name: 'QR Code Generator', description: 'Generate QR codes', category: 'generators', path: '/tools/qr-code', icon: 'QrCode' },
      { id: 'hash-generator', name: 'Hash Generator', description: 'Generate hashes', category: 'generators', path: '/tools/hash-generator', icon: 'Hash' },
      { id: 'hmac-generator', name: 'HMAC Generator', description: 'Generate HMAC', category: 'generators', path: '/tools/hmac-generator', icon: 'Shield' },
      { id: 'jwt-decoder', name: 'JWT Decoder', description: 'Decode JWT tokens', category: 'generators', path: '/tools/jwt-decoder', icon: 'Key' }
    ]
  },
  {
    id: 'crypto',
    name: 'Cryptography',
    icon: 'Shield',
    tools: [
      { id: 'bcrypt', name: 'BCrypt', description: 'Hash and verify passwords', category: 'crypto', path: '/tools/bcrypt', icon: 'Lock' },
      { id: 'bip39', name: 'BIP39 Passphrase', description: 'Generate BIP39 passphrases', category: 'crypto', path: '/tools/bip39', icon: 'Key' },
      { id: 'pgp-key', name: 'PGP Key Generator', description: 'Generate PGP keys', category: 'crypto', path: '/tools/pgp-key', icon: 'Shield' },
      { id: 'rsa-key', name: 'RSA Key Pair', description: 'Generate RSA key pairs', category: 'crypto', path: '/tools/rsa-key', icon: 'Key' },
      { id: 'data-encryptor', name: 'Data Encryptor', description: 'Encrypt/decrypt data', category: 'crypto', path: '/tools/data-encryptor', icon: 'Lock' },
      { id: 'basic-auth', name: 'Basic Auth Generator', description: 'Generate Basic Auth headers', category: 'crypto', path: '/tools/basic-auth', icon: 'User' }
    ]
  },
  {
    id: 'utilities',
    name: 'Utilities',
    icon: 'Wrench',
    tools: [
      { id: 'regexp-tester', name: 'RegExp Tester', description: 'Test regular expressions', category: 'utilities', path: '/tools/regexp-tester', icon: 'Search' },
      { id: 'cron-parser', name: 'CRON Parser', description: 'Parse CRON expressions', category: 'utilities', path: '/tools/cron-parser', icon: 'Clock' },
      { id: 'unix-time', name: 'Unix Time Converter', description: 'Convert Unix timestamps', category: 'utilities', path: '/tools/unix-time', icon: 'Calendar' },
      { id: 'unit-converter', name: 'Unit Converter', description: 'Convert units', category: 'utilities', path: '/tools/unit-converter', icon: 'Calculator' },
      { id: 'number-base', name: 'Number Base Converter', description: 'Convert number bases', category: 'utilities', path: '/tools/number-base', icon: 'Hash' },
      { id: 'chmod-calculator', name: 'Chmod Calculator', description: 'Calculate file permissions', category: 'utilities', path: '/tools/chmod-calculator', icon: 'Settings' },
      { id: 'keycode-info', name: 'Keycode Info', description: 'Get keyboard key info', category: 'utilities', path: '/tools/keycode-info', icon: 'Keyboard' }
    ]
  },
  {
    id: 'web-dev',
    name: 'Web Development',
    icon: 'Globe',
    tools: [
      { id: 'color-palette', name: 'Color Palette Generator', description: 'Generate color palettes', category: 'web-dev', path: '/tools/color-palette', icon: 'Palette' },
      { id: 'color-contrast', name: 'Color Contrast Calculator', description: 'Check color contrast', category: 'web-dev', path: '/tools/color-contrast', icon: 'Eye' },
      { id: 'css-shadow', name: 'CSS Shadow Generator', description: 'Generate CSS shadows', category: 'web-dev', path: '/tools/css-shadow', icon: 'Box' },
      { id: 'css-triangle', name: 'CSS Triangle Generator', description: 'Generate CSS triangles', category: 'web-dev', path: '/tools/css-triangle', icon: 'Triangle' },
      { id: 'favicon-generator', name: 'Favicon Generator', description: 'Generate favicons', category: 'web-dev', path: '/tools/favicon-generator', icon: 'Image' },
      { id: 'placeholder-image', name: 'Placeholder Image', description: 'Generate placeholder images', category: 'web-dev', path: '/tools/placeholder-image', icon: 'ImageIcon' },
      { id: 'data-url', name: 'Data URL Generator', description: 'Generate data URLs', category: 'web-dev', path: '/tools/data-url', icon: 'Link' }
    ]
  },
  {
    id: 'ai-tools',
    name: 'AI-Powered Tools',
    icon: 'Brain',
    tools: [
      { id: 'ai-regex', name: 'AI Regex Generator', description: 'Generate regex with AI', category: 'ai-tools', path: '/tools/ai-regex', icon: 'Zap' },
      { id: 'ai-code-explainer', name: 'AI Code Explainer', description: 'Explain code with AI', category: 'ai-tools', path: '/tools/ai-code-explainer', icon: 'MessageCircle' },
      { id: 'ai-commit-msg', name: 'AI Commit Message', description: 'Generate commit messages', category: 'ai-tools', path: '/tools/ai-commit-msg', icon: 'GitCommit' },
      { id: 'ai-cron-describer', name: 'AI CRON Describer', description: 'Describe CRON expressions', category: 'ai-tools', path: '/tools/ai-cron-describer', icon: 'Clock' },
      { id: 'markdown-slides', name: 'Markdown to Slides', description: 'Convert Markdown to slides', category: 'ai-tools', path: '/tools/markdown-slides', icon: 'Presentation' }
    ]
  }
]