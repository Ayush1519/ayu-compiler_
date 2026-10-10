import { LayoutTemplate, Play, DownloadCloud, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const HowItWorksSection = () => {
  const navigate = useNavigate();

  const steps = [
    {
      step: '01',
      title: 'Choose Language or Template',
      description: 'Select from 14+ supported languages or launch directly from pre-configured starters like React, Python, or Web Portfolios.',
      icon: <LayoutTemplate className="w-6 h-6 text-cyan-400" />,
      accent: 'border-cyan-500/30'
    },
    {
      step: '02',
      title: 'Write, Run & Inspect Output',
      description: 'Code in a professional Monaco editor with syntax highlighting, pass standard input, and execute instantly with clear stdout/stderr logs.',
      icon: <Play className="w-6 h-6 text-emerald-400" />,
      accent: 'border-emerald-500/30'
    },
    {
      step: '03',
      title: 'Preview & Export Workspace',
      description: 'Test interactive web projects in live iframe previews and download your complete file tree as a structured ZIP archive.',
      icon: <DownloadCloud className="w-6 h-6 text-blue-400" />,
      accent: 'border-blue-500/30'
    }
  ];

  return (
    <section className="py-24 bg-card/40 border-y border-border/60 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold uppercase tracking-wider">
            Streamlined Workflow
          </div>

          <h2 className="text-[28px] sm:text-[32px] lg:text-[40px] font-extrabold tracking-tight text-foreground">
            How AyuCompiler Works
          </h2>

          <p className="text-base sm:text-[18px] text-muted-foreground leading-relaxed">
            From zero to running code in three straightforward steps.
          </p>
        </div>

        {/* 3 Steps Container (Horizontal on desktop, stacked on mobile) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {steps.map((item, index) => (
            <div
              key={index}
              className={`relative rounded-2xl border ${item.accent} bg-card p-8 shadow-sm hover:shadow-lg transition-all flex flex-col justify-between`}
            >
              {/* Step Number Top Badge */}
              <div className="flex items-center justify-between mb-6">
                <div className="w-12 h-12 rounded-xl bg-muted/80 border border-border flex items-center justify-center">
                  {item.icon}
                </div>
                <span className="font-mono text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
                  {item.step}
                </span>
              </div>

              <div>
                <h3 className="text-[23px] font-bold text-foreground mb-3 leading-snug">
                  {item.title}
                </h3>
                <p className="text-[15.5px] text-muted-foreground leading-[1.6]">
                  {item.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-border/60 text-xs text-muted-foreground flex items-center justify-between font-mono">
                <span>Step {item.step} of 03</span>
                <span className="text-cyan-400 font-bold">●</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};


