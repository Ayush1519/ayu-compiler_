import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  ArrowRight,
  Sparkles,
  Play,
  Share2,
  Maximize2,
  CheckCircle2,
  Terminal,
  FileCode,
  Layers,
  Send,
  Sliders,
  ExternalLink,
  ChevronRight,
  Code2
} from 'lucide-react';

interface HeroSectionProps {
  onExploreTemplates: () => void;
}

export const HeroSection = ({ onExploreTemplates }: HeroSectionProps) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'index.js' | 'styles.css'>('index.js');
  const [interactiveMode, setInteractiveMode] = useState(true);
  const [mockAiInput, setMockAiInput] = useState('');
  const [mockAiMessages, setMockAiMessages] = useState<Array<{ role: 'ai' | 'user'; text: string }>>([
    { role: 'ai', text: 'How can I help you debug?' },
  ]);

  const handleMockAiSend = (text: string) => {
    if (!text.trim()) return;
    setMockAiMessages(prev => [
      ...prev,
      { role: 'user', text },
      { role: 'ai', text: 'Analyzing code structure: Everything looks optimal! Clean syntax with 0 runtime errors.' }
    ]);
    setMockAiInput('');
  };

  return (
    <section className="relative overflow-hidden pt-8 pb-20 lg:pt-14 lg:pb-28">
      {/* Background Radial Glow Effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[450px] bg-gradient-to-tr from-cyan-500/15 via-blue-600/15 to-purple-600/10 blur-[120px] pointer-events-none rounded-full" />
      <div className="absolute top-12 left-10 w-72 h-72 bg-cyan-500/10 blur-[90px] pointer-events-none rounded-full" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-blue-600/10 blur-[100px] pointer-events-none rounded-full" />

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b0f_1px,transparent_1px),linear-gradient(to_bottom,#1e293b0f_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,#000_70%,transparent_100%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Headline, Badge, Description, CTAs, Benefits */}
          <div className="lg:col-span-5 flex flex-col items-start text-left space-y-6">
            {/* Badge (Pill with sparkle) */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-card/80 border border-border/80 shadow-sm backdrop-blur-sm">
              <Sparkles className="w-4 h-4 text-cyan-400 animate-pulse" />
              <span className="text-xs sm:text-sm font-medium text-foreground/90">
                Your Browser-Based Coding Workspace
              </span>
            </div>

            {/* Headline: 64px desktop, 44px tablet, 36px mobile; font weight 800 */}
            <h1 className="text-[36px] sm:text-[44px] lg:text-[64px] font-extrabold tracking-tight text-foreground leading-[1.08]">
              Write Code. <br />
              Run Instantly. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-400 to-blue-500">
                Build Without Limits.
              </span>
            </h1>

            {/* Description: 18px on landing page, ~1.8 line height */}
            <p className="text-[17px] sm:text-[18px] text-muted-foreground leading-[1.8] max-w-xl">
              An all-in-one online coding workspace to write code, experiment with ideas, preview projects, and bring your next creation to life — all from your browser.
            </p>

            {/* Primary & Secondary Action Buttons: 16px, font weight 600 */}
            <div className="flex flex-wrap items-center gap-4 pt-2 w-full sm:w-auto">
              <Button
                onClick={() => navigate('/playground')}
                size="lg"
                className="h-12 px-7 rounded-xl font-semibold bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-all duration-200 group text-base"
              >
                <span>Start Coding</span>
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>

              <Button
                onClick={onExploreTemplates}
                size="lg"
                variant="outline"
                className="h-12 px-6 rounded-xl font-semibold bg-card/60 hover:bg-card border-border/80 text-foreground transition-all duration-200 text-base"
              >
                Explore Templates
              </Button>
            </div>

            {/* Three Benefit Highlights */}
            <div className="flex flex-wrap items-center gap-y-2 gap-x-5 pt-3 text-[13.5px] sm:text-[14px] text-muted-foreground font-medium">
              <div className="flex items-center gap-1.5">
                <span className="text-cyan-400 font-bold">✦</span>
                <span>No complex setup</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-cyan-400 font-bold">✦</span>
                <span>Instant code execution</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-cyan-400 font-bold">✦</span>
                <span>One workspace, endless possibilities</span>
              </div>
            </div>
          </div>

          {/* Right Column: Realistic AyuCompiler IDE Workspace Preview (exact match to image) */}
          <div className="lg:col-span-7 relative">
            <div className="relative mx-auto max-w-full lg:max-w-none rounded-2xl p-1 bg-gradient-to-br from-cyan-500/30 via-blue-600/20 to-purple-600/30 shadow-2xl shadow-cyan-500/10">
              {/* Window Container */}
              <div className="w-full bg-[#0a0f1d] border border-cyan-500/20 rounded-xl overflow-hidden shadow-2xl font-mono text-xs text-slate-300">
                {/* macOS Style Window Titlebar */}
                <div className="h-10 bg-[#070b14] border-b border-slate-800/80 px-4 flex items-center justify-between">
                  {/* Traffic Light Dots */}
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-[#ff5f56] border border-[#e0443e]" />
                    <div className="w-3 h-3 rounded-full bg-[#ffbd2e] border border-[#dea123]" />
                    <div className="w-3 h-3 rounded-full bg-[#27c93f] border border-[#1aab29]" />
                    <div className="hidden sm:flex items-center gap-1 ml-3 text-slate-500 text-[11px]">
                      <span>&lt;</span>
                      <span>&gt;</span>
                    </div>
                  </div>

                  {/* Address bar */}
                  <div className="flex items-center justify-center bg-[#0d1424] border border-slate-700/60 rounded-md px-3 py-1 text-[11px] text-slate-300 font-sans shadow-inner">
                    <img src="/ayucompiler-icon.png" alt="AyuCompiler" className="w-3.5 h-3.5 mr-1.5 object-contain" />
                    <span>AyuCompiler</span>
                  </div>

                  {/* Right Window Controls */}
                  <div className="flex items-center gap-2 text-slate-400">
                    <Share2 className="w-3.5 h-3.5 hover:text-white cursor-pointer transition-colors" />
                    <ExternalLink className="w-3.5 h-3.5 hover:text-white cursor-pointer transition-colors" />
                  </div>
                </div>

                {/* Main Workspace Frame */}
                <div className="grid grid-cols-12 min-h-[380px] sm:min-h-[420px] bg-[#0a0e1a]">
                  {/* Left Mini Sidebar: FILES */}
                  <div className="col-span-3 sm:col-span-2.5 bg-[#080d1a] border-r border-slate-800/80 p-2.5 flex flex-col justify-between select-none">
                    <div>
                      <div className="text-[10px] font-bold tracking-wider text-slate-400 uppercase mb-2 px-1 flex items-center gap-1">
                        <FileCode className="w-3 h-3 text-cyan-400" />
                        <span>Files</span>
                      </div>
                      <div className="space-y-1">
                        <div
                          onClick={() => setActiveTab('index.js')}
                          className={`flex items-center gap-1.5 px-2 py-1.5 rounded text-[11px] cursor-pointer transition-colors ${
                            activeTab === 'index.js'
                              ? 'bg-cyan-500/15 text-cyan-300 font-medium border border-cyan-500/30'
                              : 'text-slate-400 hover:bg-slate-800/50 hover:text-slate-200'
                          }`}
                        >
                          <span className="text-amber-400 font-bold text-xs">JS</span>
                          <span className="truncate">index.js</span>
                        </div>

                        <div
                          onClick={() => setActiveTab('styles.css')}
                          className={`flex items-center gap-1.5 px-2 py-1.5 rounded text-[11px] cursor-pointer transition-colors ${
                            activeTab === 'styles.css'
                              ? 'bg-cyan-500/15 text-cyan-300 font-medium border border-cyan-500/30'
                              : 'text-slate-400 hover:bg-slate-800/50 hover:text-slate-200'
                          }`}
                        >
                          <span className="text-sky-400 font-bold text-xs">#</span>
                          <span className="truncate">styles.css</span>
                        </div>

                        <div className="flex items-center gap-1.5 px-2 py-1.5 rounded text-[11px] text-slate-400 hover:bg-slate-800/50 cursor-pointer">
                          <span className="text-orange-400 font-bold text-xs">&lt;&gt;</span>
                          <span className="truncate">index.html</span>
                        </div>
                      </div>
                    </div>

                    <div className="text-[9px] text-slate-500 px-1 pt-2 border-t border-slate-800/60 flex items-center justify-between">
                      <span>AyuCompiler</span>
                      <span className="text-emerald-400">● Live</span>
                    </div>
                  </div>

                  {/* Center Code Editor Area */}
                  <div className="col-span-9 sm:col-span-9.5 flex flex-col relative bg-[#090d18]">
                    {/* Top Editor Toolbar */}
                    <div className="h-9 bg-[#070b14] border-b border-slate-800/80 px-3 flex items-center justify-between">
                      {/* File Tabs */}
                      <div className="flex items-center gap-1">
                        <div className={`flex items-center gap-1 px-3 py-1 text-[11px] rounded-t border-t-2 ${
                          activeTab === 'index.js'
                            ? 'bg-[#090d18] border-cyan-400 text-slate-200 font-medium'
                            : 'text-slate-500 hover:text-slate-300 border-transparent'
                        }`}>
                          <span className="text-amber-400">🟨</span>
                          <span>index.js</span>
                        </div>
                        <div className={`flex items-center gap-1 px-3 py-1 text-[11px] rounded-t border-t-2 ${
                          activeTab === 'styles.css'
                            ? 'bg-[#090d18] border-sky-400 text-slate-200 font-medium'
                            : 'text-slate-500 hover:text-slate-300 border-transparent'
                        }`}>
                          <span className="text-sky-400">🎨</span>
                          <span>styles.css</span>
                        </div>
                      </div>

                      {/* Action buttons (Run & Export) */}
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => navigate('/playground')}
                          className="flex items-center gap-1 bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-black font-semibold px-3 py-1 rounded shadow-md shadow-emerald-500/20 text-[11px] transition-all"
                        >
                          <Play className="w-3 h-3 fill-current" />
                          <span>Run</span>
                        </button>
                        <button
                          onClick={() => navigate('/playground')}
                          className="px-2.5 py-1 text-[11px] text-slate-300 bg-slate-800 hover:bg-slate-700 rounded border border-slate-700 transition-colors"
                        >
                          Export
                        </button>
                      </div>
                    </div>

                    {/* Editor Code Body with Line Numbers */}
                    <div className="flex-1 p-3 overflow-hidden font-mono text-[11px] sm:text-xs leading-5 relative">
                      <div className="grid grid-cols-12 gap-2">
                        {/* Line Numbers */}
                        <div className="col-span-1 text-slate-600 select-none text-right pr-2 space-y-0.5">
                          {Array.from({ length: 18 }).map((_, i) => (
                            <div key={i}>{i + 1}</div>
                          ))}
                        </div>

                        {/* Code Lines */}
                        <div className="col-span-11 text-slate-300 space-y-0.5">
                          {activeTab === 'index.js' ? (
                            <>
                              <div><span className="text-purple-400">import</span> React <span className="text-purple-400">from</span> <span className="text-emerald-300">'react'</span>;</div>
                              <div><span className="text-purple-400">import</span> &#123; createClient &#125; <span className="text-purple-400">from</span> <span className="text-emerald-300">'@ayu/core'</span>;</div>
                              <div className="text-slate-600">// AyuCompiler Fast Workspace</div>
                              <div><span className="text-purple-400">export default</span> () =&gt; &#123;</div>
                              <div className="pl-4"><span className="text-blue-400">const</span> [status, setStatus] = React.<span className="text-yellow-300">useState</span>(<span className="text-emerald-300">'ready'</span>);</div>
                              <div className="pl-4"><span className="text-blue-400">const</span> workspace = &#123;</div>
                              <div className="pl-8 text-slate-400">name: <span className="text-emerald-300">'AyuCompiler'</span>,</div>
                              <div className="pl-8 text-slate-400">speed: <span className="text-amber-300">'34ms'</span>,</div>
                              <div className="pl-8 text-slate-400">active: <span className="text-cyan-400">true</span></div>
                              <div className="pl-4">&#125;;</div>
                              <div><br /></div>
                              <div className="pl-4"><span className="text-purple-400">return</span> (</div>
                              <div className="pl-8 text-cyan-300">&lt;<span className="text-pink-400">Dashboard</span> data=&#123;workspace&#125;&gt;</div>
                              <div className="pl-12 text-slate-300">&lt;<span className="text-pink-400">LivePreview</span> mode=<span className="text-emerald-300">"interactive"</span> /&gt;</div>
                              <div className="pl-8 text-cyan-300">&lt;/<span className="text-pink-400">Dashboard</span>&gt;</div>
                              <div className="pl-4">);</div>
                              <div>&#125;;</div>
                            </>
                          ) : (
                            <>
                              <div><span className="text-pink-400">.ayu-workspace</span> &#123;</div>
                              <div className="pl-4"><span className="text-sky-300">display</span>: flex;</div>
                              <div className="pl-4"><span className="text-sky-300">background</span>: <span className="text-emerald-300">#0a0f1d</span>;</div>
                              <div className="pl-4"><span className="text-sky-300">color</span>: <span className="text-emerald-300">#38bdf8</span>;</div>
                              <div className="pl-4"><span className="text-sky-300">border-radius</span>: <span className="text-amber-300">12px</span>;</div>
                              <div>&#125;</div>
                            </>
                          )}
                        </div>
                      </div>

                      {/* Collaborative Cursor Badge: User #31 */}
                      <div className="absolute top-24 left-44 hidden sm:flex items-center gap-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-[10px] px-2 py-0.5 rounded shadow-lg animate-bounce pointer-events-none z-20">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                        <span>User #31</span>
                      </div>

                      {/* Floating Preview Pane Card (matches screenshot) */}
                      <div className="absolute right-2 top-8 w-60 sm:w-72 bg-[#0e1628]/95 border border-cyan-500/30 rounded-xl p-3 shadow-2xl backdrop-blur-md z-20 transition-transform hover:scale-[1.02]">
                        <div className="flex items-center justify-between border-b border-slate-700/80 pb-2 mb-2">
                          <div className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-200">
                            <Layers className="w-3.5 h-3.5 text-cyan-400" />
                            <span>Preview Pane</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <span className="text-[10px] text-slate-400">Interactive</span>
                            <button
                              onClick={() => setInteractiveMode(!interactiveMode)}
                              className={`w-7 h-4 rounded-full p-0.5 transition-colors ${
                                interactiveMode ? 'bg-cyan-500' : 'bg-slate-700'
                              }`}
                            >
                              <div className={`w-3 h-3 rounded-full bg-white transition-transform ${
                                interactiveMode ? 'translate-x-3' : 'translate-x-0'
                              }`} />
                            </button>
                          </div>
                        </div>

                        {/* Mini Dashboard Preview in Card */}
                        <div className="bg-[#080d1a] border border-slate-800 rounded-lg p-2.5 space-y-2">
                          <div className="flex justify-between items-center text-[10px]">
                            <span className="font-semibold text-slate-200">Ayu Dashboard</span>
                            <span className="text-cyan-400 font-mono text-[9px] bg-cyan-950/80 px-1.5 py-0.5 rounded border border-cyan-800">99.8%</span>
                          </div>
                          <div className="grid grid-cols-2 gap-1.5">
                            <div className="bg-slate-900/90 p-1.5 rounded border border-slate-800 text-[9px]">
                              <span className="text-slate-400 block">Speed</span>
                              <span className="text-emerald-400 font-bold font-mono">34ms</span>
                            </div>
                            <div className="bg-slate-900/90 p-1.5 rounded border border-slate-800 text-[9px]">
                              <span className="text-slate-400 block">Memory</span>
                              <span className="text-cyan-400 font-bold font-mono">14.2 MB</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Floating Ayu AI Panel on the right (matches screenshot) */}
                      <div className="absolute right-0 bottom-0 sm:-right-4 sm:-bottom-4 w-64 sm:w-72 bg-[#090e1d]/95 border-2 border-cyan-400/60 rounded-xl p-3 shadow-2xl backdrop-blur-xl z-30 transition-all">
                        <div className="flex items-center justify-between border-b border-slate-800 pb-2 mb-2">
                          <div className="flex items-center gap-1.5 text-xs font-bold text-cyan-300">
                            <Sparkles className="w-4 h-4 text-cyan-400" />
                            <span>Ayu AI</span>
                          </div>
                          <span className="text-[9px] bg-cyan-950 text-cyan-400 px-1.5 py-0.5 rounded border border-cyan-800">Active</span>
                        </div>

                        {/* Chat Messages */}
                        <div className="space-y-2 max-h-28 overflow-y-auto pr-1 text-[11px]">
                          {mockAiMessages.map((m, idx) => (
                            <div
                              key={idx}
                              className={`p-2 rounded-lg ${
                                m.role === 'ai'
                                  ? 'bg-cyan-950/40 border border-cyan-800/40 text-cyan-200'
                                  : 'bg-blue-600/30 border border-blue-500/40 text-slate-100 text-right'
                              }`}
                            >
                              {m.text}
                            </div>
                          ))}
                        </div>

                        {/* Prompt Suggestions */}
                        <div className="mt-2 pt-2 border-t border-slate-800/80">
                          <button
                            onClick={() => handleMockAiSend('Explain this React code')}
                            className="w-full text-left text-[10px] text-slate-400 hover:text-cyan-300 hover:bg-cyan-950/30 p-1 rounded border border-slate-800 truncate transition-colors"
                          >
                            💡 Automated code suggestions for prompt
                          </button>
                        </div>

                        {/* Input */}
                        <div className="mt-2 flex gap-1">
                          <input
                            type="text"
                            placeholder="Ask Ayu AI..."
                            value={mockAiInput}
                            onChange={(e) => setMockAiInput(e.target.value)}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter') handleMockAiSend(mockAiInput);
                            }}
                            className="flex-1 bg-slate-900 border border-slate-700 rounded px-2 py-1 text-[10px] text-slate-200 focus:outline-none focus:border-cyan-400"
                          />
                          <button
                            onClick={() => handleMockAiSend(mockAiInput)}
                            className="p-1.5 bg-cyan-500 hover:bg-cyan-400 text-black rounded text-[10px] transition-colors"
                          >
                            <Send className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Bottom Console Drawer */}
                    <div className="h-20 bg-[#060913] border-t border-slate-800 px-3 py-1.5 font-mono text-[10px] text-slate-400 flex flex-col justify-between">
                      <div className="flex items-center justify-between text-slate-500 border-b border-slate-900 pb-1">
                        <span className="flex items-center gap-1 text-slate-400 font-semibold">
                          <Terminal className="w-3 h-3 text-cyan-400" />
                          Console
                        </span>
                        <span className="text-[9px]">Terminal active</span>
                      </div>
                      <div className="space-y-0.5 text-[10px] overflow-hidden">
                        <div className="text-emerald-400">✔ Bundled in 45ms</div>
                        <div className="text-slate-300">▶ Live Server active on port 5173</div>
                        <div className="text-cyan-400">▶ Ready for execution</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};


