# AyuCompiler

An all-in-one modern, high-performance online coding workspace to write code, experiment with ideas, preview web projects with hot reloading, and leverage Ayu AI assistance — directly inside your browser.

## Features

- **Monaco Code Editor**: Professional-grade syntax highlighting, autocomplete, line numbering, and bracket matching.
- **Multi-Language Support**: Run JavaScript, TypeScript, Python, C, C++, Java, Go, Rust, Ruby, C#, PHP, Swift, and more.
- **Live Interactive Web Preview**: Instant preview for HTML, CSS, and modern JavaScript applications.
- **Ayu AI Intelligence**: On-demand code explanation, debugging, optimization, and real-time coding assistance.
- **Workspace File Management**: Multi-file explorer, folder organization, starter templates, and full project import/export (ZIP).
- **Responsive & Modern Design**: Clean glassmorphism dark/light theme, built with Tailwind CSS and Radix UI primitives.

## Getting Started Locally

### Prerequisites
- Node.js (v18 or higher recommended)
- npm or bun

### Installation

```bash
# Clone the repository
git clone <YOUR_GIT_URL>

# Navigate into the project folder
cd ayu-workspace

# Install dependencies
npm install

# Start the local development server
npm run dev
```

### Production Build

```bash
npm run build
npm run preview
```

## Technologies Used

- **Framework**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS, PostCSS, Lucide Icons
- **UI Primitives**: Radix UI (shadcn/ui)
- **Editor**: Monaco Editor (`@monaco-editor/react`)
- **State & Utilities**: TanStack React Query, JSZip, Sonner
