import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  Play,
  RotateCcw,
  Copy,
  Check,
  ExternalLink,
  Code2,
  Terminal,
  Layers,
  Sparkles,
  Loader2
} from 'lucide-react';
import { toast } from 'sonner';
import { executeCode, ExecutionResult } from '@/utils/codeRunner';

type PlaygroundLang = 'javascript' | 'python' | 'html';

const initialCodes: Record<PlaygroundLang, string> = {
  javascript: `// ⚡ AyuCompiler — Instant JavaScript Playground
// Tweak the values below and press "Run Code"

const system = {
  name: "AyuCompiler Engine",
  version: "2.4.0",
  features: ["Zero Latency", "Monaco Editor", "Ayu AI", "Multi-Language"],
  activeUsers: 1420
};

console.log(\`🚀 Initializing \${system.name} v\${system.version}...\`);

function calculateThroughput(users) {
  const opsPerUser = 85;
  return (users * opsPerUser).toLocaleString();
}

console.log("📊 System Metrics:");
console.log("  • Active Developers:", system.activeUsers);
console.log("  • Operations/Sec:", calculateThroughput(system.activeUsers), "ops/s");
console.log("  • Ready modules:", system.features.join(", "));

console.log("\\n✨ All health checks passed in 12ms!");
`,

  python: `# 🐍 AyuCompiler — Python Data Engine
# Edit the list or calculations and click "Run Code"

developer_scores = [92, 85, 99, 78, 95, 88, 100, 91]

def analyze_performance(scores):
    average = sum(scores) / len(scores)
    top_score = max(scores)
    high_performers = [s for s in scores if s >= 90]
    
    print("=" * 40)
    print("📊 AyuCompiler Python Statistics")
    print("=" * 40)
    print(f"Total Submissions : {len(scores)}")
    print(f"Average Score     : {average:.2f}%")
    print(f"Top Score         : {top_score}%")
    print(f"High Performers (>=90%): {len(high_performers)} developers")
    print("=" * 40)

analyze_performance(developer_scores)
`,

  html: `<!DOCTYPE html>
<html>
<head>
  <style>
    body {
      margin: 0;
      padding: 24px;
      font-family: system-ui, sans-serif;
      background: radial-gradient(circle at top, #0f172a, #020617);
      color: #f8fafc;
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }
    .badge {
      background: rgba(14, 165, 233, 0.2);
      color: #38bdf8;
      border: 1px solid rgba(56, 189, 248, 0.3);
      padding: 6px 14px;
      border-radius: 9999px;
      font-size: 12px;
      font-weight: 600;
      margin-bottom: 16px;
    }
    h1 {
      margin: 0 0 8px 0;
      font-size: 28px;
      background: linear-gradient(135deg, #fff, #38bdf8);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
    p {
      color: #94a3b8;
      font-size: 14px;
      margin: 0 0 20px 0;
      text-align: center;
    }
    .card {
      background: rgba(30, 41, 59, 0.6);
      border: 1px solid rgba(148, 163, 184, 0.2);
      border-radius: 12px;
      padding: 20px;
      width: 100%;
      max-width: 320px;
      text-align: center;
    }
    .btn {
      background: #0284c7;
      color: white;
      border: none;
      padding: 10px 18px;
      border-radius: 8px;
      font-weight: 600;
      cursor: pointer;
      box-shadow: 0 4px 14px rgba(2, 132, 199, 0.4);
      transition: transform 0.15s;
    }
    .btn:hover { transform: scale(1.05); }
  </style>
</head>
<body>
  <div class="badge">✦ Live HTML/CSS Preview</div>
  <h1>AyuCompiler Web</h1>
  <p>Instant hot-reloading browser preview.</p>
  <div class="card">
    <button class="btn" onclick="alert('⚡ Real interactive JavaScript inside AyuCompiler Preview!')">
      Click for Alert
    </button>
  </div>
</body>
</html>`
};

export const PlaygroundPreview = () => {
  const navigate = useNavigate();
  const [selectedLang, setSelectedLang] = useState<PlaygroundLang>('javascript');
  const [code, setCode] = useState<string>(initialCodes.javascript);
  const initialOutputs: Record<PlaygroundLang, string[]> = {
    javascript: [
      '🚀 Initializing AyuCompiler Engine v2.4.0...',
      '📊 System Metrics:',
      '  • Active Developers: 1420',
      '  • Operations/Sec: 120,700 ops/s',
      '  • Ready modules: Zero Latency, Monaco Editor, Ayu AI, Multi-Language',
      '',
      '✨ All health checks passed in 12ms!'
    ],
    python: [
      '========================================',
      '📊 AyuCompiler Python Statistics',
      '========================================',
      'Total Submissions : 8',
      'Average Score     : 91.00%',
      'Top Score         : 100%',
      'High Performers (>=90%): 5 developers',
      '========================================'
    ],
    html: [
      '✔ Live HTML/CSS web preview rendered successfully in preview panel.'
    ]
  };

  const [consoleLogs, setConsoleLogs] = useState<string[]>(initialOutputs.javascript);
  const [isRunning, setIsRunning] = useState(false);
  const [copied, setCopied] = useState(false);
  const [activeOutputTab, setActiveOutputTab] = useState<'console' | 'preview'>('console');
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // Switch language and update starter sample
  const handleLanguageChange = (lang: PlaygroundLang) => {
    setSelectedLang(lang);
    setCode(initialCodes[lang]);
    setConsoleLogs(initialOutputs[lang]);
    if (lang === 'html') {
      setActiveOutputTab('preview');
      if (iframeRef.current) {
        const blob = new Blob([initialCodes.html], { type: 'text/html' });
        iframeRef.current.src = URL.createObjectURL(blob);
      }
    } else {
      setActiveOutputTab('console');
    }
  };

  // Run the code
  const handleRun = async () => {
    setIsRunning(true);
    setConsoleLogs([`▶ Running ${selectedLang.toUpperCase()}...`]);

    try {
      if (selectedLang === 'html') {
        setActiveOutputTab('preview');
        if (iframeRef.current) {
          const blob = new Blob([code], { type: 'text/html' });
          iframeRef.current.src = URL.createObjectURL(blob);
        }
        setConsoleLogs(prev => [
          ...prev,
          '✔ Live HTML/CSS web preview rendered successfully in preview panel.'
        ]);
      } else {
        const result: ExecutionResult = await executeCode(selectedLang, code);
        const outputLines: string[] = [];

        if (result.stdout) {
          outputLines.push(result.stdout);
        }
        if (result.stderr) {
          outputLines.push(`❌ ${result.stderr}`);
        }
        if (result.compileError) {
          outputLines.push(`❌ Compile Error:\n${result.compileError}`);
        }
        if (result.statusMessage) {
          outputLines.push(`\n${result.statusMessage} (${result.executionTime}ms)`);
        }

        setConsoleLogs(outputLines.length > 0 ? outputLines : ['✔ Execution finished with no stdout.']);
      }
    } catch (err: any) {
      setConsoleLogs(prev => [...prev, `❌ Execution failed: ${err?.message || err}`]);
    } finally {
      setIsRunning(false);
    }
  };

  // Reset code
  const handleReset = () => {
    setCode(initialCodes[selectedLang]);
    setConsoleLogs([]);
    toast.info('Sample code reset');
  };

  // Copy code
  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    toast.success('Code copied to clipboard');
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="playground" className="py-20 bg-muted/30 border-y border-border/60 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            Interactive Code Sandbox
          </div>

          <h2 className="text-[28px] sm:text-[32px] lg:text-[40px] font-extrabold tracking-tight text-foreground">
            From Idea to Execution in Seconds
          </h2>

          <p className="text-base sm:text-[18px] text-muted-foreground leading-relaxed">
            Experience the speed and simplicity of AyuCompiler directly in your browser. Switch languages, tweak code, and run it live without leaving this page.
          </p>
        </div>

        {/* Interactive Playground Container */}
        <div className="rounded-2xl border border-border bg-card shadow-2xl overflow-hidden">
          {/* Top Bar: Language Selector & Action Controls */}
          <div className="h-14 bg-muted/60 border-b border-border px-4 flex flex-wrap items-center justify-between gap-3">
            {/* Language Switcher Tabs: 14px font size */}
            <div className="flex items-center bg-background/80 border border-border/80 rounded-lg p-1">
              <button
                onClick={() => handleLanguageChange('javascript')}
                className={`px-3.5 py-1 text-sm font-medium rounded-md transition-all ${
                  selectedLang === 'javascript'
                    ? 'bg-amber-400/15 text-amber-500 border border-amber-400/30 shadow-sm font-semibold'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                🟨 JavaScript
              </button>

              <button
                onClick={() => handleLanguageChange('python')}
                className={`px-3.5 py-1 text-sm font-medium rounded-md transition-all ${
                  selectedLang === 'python'
                    ? 'bg-blue-500/15 text-blue-400 border border-blue-500/30 shadow-sm font-semibold'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                🐍 Python
              </button>

              <button
                onClick={() => handleLanguageChange('html')}
                className={`px-3.5 py-1 text-sm font-medium rounded-md transition-all ${
                  selectedLang === 'html'
                    ? 'bg-orange-500/15 text-orange-400 border border-orange-500/30 shadow-sm font-semibold'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                🌐 HTML & CSS
              </button>
            </div>

            {/* Playground Controls: 14px font size */}
            <div className="flex items-center gap-2">
              <Button
                onClick={handleReset}
                size="sm"
                variant="ghost"
                className="h-8 px-3 text-sm font-medium text-muted-foreground hover:text-foreground"
                title="Reset Code"
              >
                <RotateCcw className="w-3.5 h-3.5 mr-1.5" />
                Reset
              </Button>

              <Button
                onClick={handleCopy}
                size="sm"
                variant="ghost"
                className="h-8 px-3 text-sm font-medium text-muted-foreground hover:text-foreground"
                title="Copy Code"
              >
                {copied ? <Check className="w-3.5 h-3.5 mr-1.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 mr-1.5" />}
                {copied ? 'Copied' : 'Copy'}
              </Button>

              <Button
                onClick={handleRun}
                disabled={isRunning}
                size="sm"
                className="h-8 px-4 font-semibold bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-black shadow-md shadow-emerald-500/20 text-sm"
              >
                {isRunning ? (
                  <Loader2 className="w-3.5 h-3.5 mr-1.5 animate-spin" />
                ) : (
                  <Play className="w-3.5 h-3.5 mr-1.5 fill-current" />
                )}
                {isRunning ? 'Running...' : 'Run Code'}
              </Button>
            </div>
          </div>

          {/* Body: Split Editor & Output/Preview */}
          <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[420px]">
            {/* Left Column: Editable Code Area */}
            <div className="lg:col-span-7 bg-[#0b0f19] p-4 flex flex-col border-b lg:border-b-0 lg:border-r border-border font-mono text-sm">
              <div className="flex items-center justify-between text-sm text-slate-400 pb-2 border-b border-slate-800 mb-3">
                <span className="flex items-center gap-1.5 font-semibold text-base text-slate-200">
                  <Code2 className="w-4 h-4 text-cyan-400" />
                  Code Editor
                </span>
                <span className="text-xs text-slate-500 font-sans">Live Editor</span>
              </div>

              <textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                spellCheck={false}
                className="flex-1 w-full bg-transparent text-slate-200 resize-none font-mono text-sm leading-6 focus:outline-none placeholder-slate-600 selection:bg-cyan-500/30"
                placeholder="Write your code here..."
              />
            </div>

            {/* Right Column: Console / Live Web Preview */}
            <div className="lg:col-span-5 bg-[#080d1a] flex flex-col font-mono text-sm">
              {/* Output Tab Header */}
              <div className="h-11 bg-[#060a14] border-b border-slate-800 px-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setActiveOutputTab('console')}
                    className={`flex items-center gap-1.5 px-3 py-1 rounded text-sm transition-colors ${
                      activeOutputTab === 'console'
                        ? 'bg-slate-800 text-cyan-300 font-semibold border border-slate-700'
                        : 'text-slate-400 hover:text-slate-200 font-medium'
                    }`}
                  >
                    <Terminal className="w-4 h-4 text-cyan-400" />
                    <span>Console</span>
                  </button>

                  <button
                    onClick={() => setActiveOutputTab('preview')}
                    className={`flex items-center gap-1.5 px-3 py-1 rounded text-sm transition-colors ${
                      activeOutputTab === 'preview'
                        ? 'bg-slate-800 text-cyan-300 font-semibold border border-slate-700'
                        : 'text-slate-400 hover:text-slate-200 font-medium'
                    }`}
                  >
                    <Layers className="w-4 h-4 text-cyan-400" />
                    <span>Live Preview</span>
                  </button>
                </div>

                <span className="text-xs text-slate-500 font-sans">Output Window</span>
              </div>

              {/* Output Content */}
              <div className="flex-1 p-3 overflow-y-auto">
                {activeOutputTab === 'console' ? (
                  <div className="space-y-1.5">
                    {consoleLogs.length === 0 ? (
                      <div className="text-slate-500 italic py-6 text-center">
                        Press &ldquo;Run Code&rdquo; above to execute and view stdout logs...
                      </div>
                    ) : (
                      consoleLogs.map((log, idx) => (
                        <div
                          key={idx}
                          className={`whitespace-pre-wrap break-words leading-5 ${
                            log.startsWith('❌')
                              ? 'text-rose-400 font-semibold'
                              : log.startsWith('✔')
                              ? 'text-emerald-400'
                              : log.startsWith('▶')
                              ? 'text-cyan-400 font-semibold'
                              : 'text-slate-300'
                          }`}
                        >
                          {log}
                        </div>
                      ))
                    )}
                  </div>
                ) : (
                  <div className="w-full h-full min-h-[320px] bg-white rounded-lg overflow-hidden border border-slate-700">
                    <iframe
                      ref={iframeRef}
                      title="Playground Live Preview"
                      sandbox="allow-scripts allow-modals"
                      className="w-full h-full border-0 min-h-[320px]"
                      srcDoc={code}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Bottom Bar: CTA to launch full workspace */}
          <div className="h-12 bg-card border-t border-border px-4 flex items-center justify-between text-xs text-muted-foreground">
            <span>Want multi-file workspaces, folder trees, and Ayu AI?</span>
            <Button
              onClick={() => navigate('/playground')}
              size="sm"
              variant="link"
              className="text-primary hover:text-primary/80 font-semibold p-0 h-auto"
            >
              Open in Full Workspace
              <ExternalLink className="w-3.5 h-3.5 ml-1" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};


