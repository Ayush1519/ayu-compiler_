import { CheckCircle2, Zap, ShieldCheck, FolderTree, Cpu, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

export const WhyAyuCompilerSection = () => {
  const navigate = useNavigate();

  const benefits = [
    {
      title: 'Zero Local Setup Required',
      description: 'Open your browser and start coding immediately without installing runtimes, node packages, compilers, or local IDE dependencies.'
    },
    {
      title: 'Hierarchical Multi-File Workspaces',
      description: 'Create folders, manage nested file trees, duplicate assets, and organize multi-module projects effortlessly.'
    },
    {
      title: 'Real-Time Web & Execution Feedback',
      description: 'Inspect live HTML/CSS/JS rendering side-by-side or analyze console logs, errors, and execution timings.'
    },
    {
      title: 'Ayu AI Coding Intelligence',
      description: 'Get contextual error explanations, automated syntax suggestions, and performance refactoring right when you need it.'
    },
    {
      title: 'Local-First Data Ownership & ZIP Export',
      description: 'Your workspace persists in your browser storage with instant single-file and full project ZIP export whenever you want.'
    }
  ];

  return (
    <section className="py-24 bg-muted/20 border-t border-border/60 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Visual IDE Card with Real Code Metrics */}
          <div className="lg:col-span-6 relative">
            <div className="rounded-2xl border border-border bg-[#090d19] p-6 shadow-2xl font-mono text-xs text-slate-300">
              {/* Header */}
              <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                  <span className="text-slate-400 ml-2 font-sans font-medium text-xs">workspace.benchmark.ts</span>
                </div>
                <span className="text-[10px] text-cyan-400 bg-cyan-950 px-2 py-0.5 rounded border border-cyan-800">
                  AyuCompiler vs Desktop IDE
                </span>
              </div>

              {/* Code Snippet */}
              <div className="space-y-1 text-slate-300 leading-5">
                <div><span className="text-purple-400">const</span> benchmark = &#123;</div>
                <div className="pl-4 text-slate-400">startupTime: <span className="text-emerald-400">&ldquo;&lt; 150ms (Browser Instant)&rdquo;</span>,</div>
                <div className="pl-4 text-slate-400">dependenciesInstalled: <span className="text-emerald-400">&ldquo;Zero Setup&rdquo;</span>,</div>
                <div className="pl-4 text-slate-400">liveWebPreview: <span className="text-cyan-400">true</span>,</div>
                <div className="pl-4 text-slate-400">multiFileZipExport: <span className="text-cyan-400">true</span>,</div>
                <div className="pl-4 text-slate-400">builtInAiAssistant: <span className="text-cyan-400">true</span></div>
                <div>&#125;;</div>
                <div className="text-slate-600 mt-2">// Result: Maximum development agility with 0 friction</div>
                <div className="text-emerald-400 font-semibold mt-2">✔ Status: Ready to build anything in one tab</div>
              </div>

              {/* Mini Stats Card */}
              <div className="grid grid-cols-3 gap-3 mt-6 pt-4 border-t border-slate-800">
                <div className="bg-slate-900/80 p-3 rounded-lg border border-slate-800 text-center">
                  <div className="text-xl font-bold text-cyan-400">14+</div>
                  <div className="text-[10px] text-slate-400 mt-0.5">Languages</div>
                </div>
                <div className="bg-slate-900/80 p-3 rounded-lg border border-slate-800 text-center">
                  <div className="text-xl font-bold text-emerald-400">&lt; 50ms</div>
                  <div className="text-[10px] text-slate-400 mt-0.5">Execution</div>
                </div>
                <div className="bg-slate-900/80 p-3 rounded-lg border border-slate-800 text-center">
                  <div className="text-xl font-bold text-indigo-400">100%</div>
                  <div className="text-[10px] text-slate-400 mt-0.5">In-Browser</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Key Benefits */}
          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold uppercase tracking-wider">
                Why AyuCompiler
              </div>
              <h2 className="text-[28px] sm:text-[32px] lg:text-[40px] font-extrabold tracking-tight text-foreground">
                Engineered for Fluid, Frictionless Coding
              </h2>
              <p className="text-muted-foreground text-base sm:text-[18px] leading-relaxed">
                Whether you are prototyping a quick algorithm, testing modern React components, or learning a new language, AyuCompiler gives you an immediate playground.
              </p>
            </div>

            <div className="space-y-4 pt-2">
              {benefits.map((benefit, bIdx) => (
                <div key={bIdx} className="flex items-start gap-3.5">
                  <div className="w-6 h-6 rounded-full bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shrink-0 mt-0.5">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground text-base">
                      {benefit.title}
                    </h4>
                    <p className="text-[14.5px] text-muted-foreground mt-0.5 leading-relaxed">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-4">
              <Button
                onClick={() => navigate('/playground')}
                size="lg"
                className="h-12 px-7 rounded-xl font-semibold bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white shadow-lg shadow-blue-500/20 text-base"
              >
                Launch AyuCompiler Workspace
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};


