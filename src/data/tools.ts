export interface AITool {
  id: string
  name: string
  description: string
  url: string
  platform?: string
}

export const aiTools: AITool[] = [
  {
    id: 'cursor',
    name: 'Cursor',
    description: 'AI-first code editor. Built to make you extraordinarily productive.',
    url: 'https://cursor.com',
    platform: 'macOS, Windows, Linux',
  },
  {
    id: 'claude-code',
    name: 'Claude Code',
    description: 'Terminal-first AI coding assistant by Anthropic.',
    url: 'https://claude.ai/download',
    platform: 'macOS, Windows',
  },
  {
    id: 'opencode',
    name: 'OpenCode',
    description: 'Open-source AI coding agent. Free models, 75+ LLM providers, privacy-first.',
    url: 'https://opencode.ai/download',
    platform: 'macOS, Windows, Linux, VS Code',
  },
  {
    id: 'windsurf',
    name: 'Windsurf',
    description: 'AI coding IDE by Codeium. Cascade assistant, MCP support, turbo mode.',
    url: 'https://codeium.com/editor/download',
    platform: 'macOS, Windows, Linux',
  },
  {
    id: 'zed',
    name: 'Zed',
    description: 'Fast AI code editor. Agentic editing, edit prediction, inline assistant.',
    url: 'https://zed.dev',
    platform: 'macOS, Windows, Linux',
  },
  {
    id: 'continue',
    name: 'Continue',
    description: 'Open-source AI code agent. Chat, autocomplete, edit. Use your own API keys.',
    url: 'https://continue.dev',
    platform: 'VS Code, JetBrains, CLI',
  },
  {
    id: 'aider',
    name: 'Aider',
    description: 'AI pair programming in your terminal. Git integration, 100+ languages.',
    url: 'https://aider.chat',
    platform: 'Terminal, pip install',
  },
  {
    id: 'codeium',
    name: 'Codeium',
    description: 'Free AI coding assistant. Autocomplete, chat, 40+ languages.',
    url: 'https://codeium.com',
    platform: 'VS Code, JetBrains, Vim, Emacs',
  },
  {
    id: 'copilot',
    name: 'GitHub Copilot',
    description: 'AI pair programmer. Write code faster with autocomplete and agents.',
    url: 'https://github.com/features/copilot',
    platform: 'VS Code, JetBrains, Neovim',
  },
  {
    id: 'cody',
    name: 'Cody',
    description: 'AI coding assistant from Sourcegraph. Codebase-aware chat and completions.',
    url: 'https://cody.dev',
    platform: 'VS Code, JetBrains',
  },
  {
    id: 'ai-studio',
    name: 'Google AI Studio',
    description: 'Build with Gemini. Prototype and ship AI features with vibe coding.',
    url: 'https://aistudio.google.com',
    platform: 'Web',
  },
  {
    id: 'lovable',
    name: 'Lovable',
    description: 'Build full-stack web apps from a single prompt. GPT-powered.',
    url: 'https://lovable.dev',
    platform: 'Web',
  },
  {
    id: 'v0',
    name: 'v0 by Vercel',
    description: 'Generate UI with AI. Shadcn, Tailwind, React components.',
    url: 'https://v0.dev',
    platform: 'Web',
  },
  {
    id: 'replit',
    name: 'Replit',
    description: 'AI-powered IDE. Build, deploy, and collaborate in the browser.',
    url: 'https://replit.com',
    platform: 'Web',
  },
  {
    id: 'bolt',
    name: 'Bolt',
    description: 'Full-stack AI development. Build and deploy in minutes.',
    url: 'https://bolt.new',
    platform: 'Web',
  },
]
