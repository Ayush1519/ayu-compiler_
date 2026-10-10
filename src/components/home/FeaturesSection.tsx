import {
  Code2,
  Terminal,
  Globe,
  Sparkles,
  LayoutTemplate,
  Download,
  ArrowRight,
  ShieldCheck,
  Zap
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const FeaturesSection = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: <Code2 className="w-6 h-6 text-cyan-400" />,
      title: 'Online Code Editor',
      description: 'Write, organize, and edit code with full Monaco Editor power, syntax highlighting, minimap controls, and folder tree management.',
      badge: 'Monaco Core',
      linkText: 'Open Editor',
      linkAction: () => navigate('/playground')
    },
    {
      icon: <Terminal className="w-6 h-6 text-emerald-400" />,
      title: 'Run & Output',
      description: 'Execute supported code with instant output feedback, standard input (stdin) support, runtime duration tracking, and clear error logs.',
      badge: 'Multi-Lang',
      linkText: 'Test Execution',
      linkAction: () => navigate('/playground')
    },
    {
      icon: <Globe className="w-6 h-6 text-sky-400" />,
      title: 'Live Preview',
      description: 'Preview interactive HTML5, CSS3, and JavaScript projects in real-time with responsive viewport rendering and hot-reload.',
      badge: 'Hot-Reload',
      linkText: 'Preview Web Apps',
      linkAction: () => navigate('/playground')
    },
    {
      icon: <Sparkles className="w-6 h-6 text-indigo-400" />,
      title: 'Ayu AI Assistant',
      description: 'Get intelligent code explanations, automated bug fixes, performance optimization advice, and unit test generation on demand.',
      badge: 'AI Powered',
      linkText: 'Explore Ayu AI',
      linkAction: () => navigate('/playground')
    },
    {
      icon: <LayoutTemplate className="w-6 h-6 text-purple-400" />,
      title: 'Starter Templates',
      description: 'Jumpstart your creations with production-ready templates for JavaScript, Python, React, Web Portfolios, and Algorithms.',
      badge: '6 Pre-Built',
      linkText: 'Browse Templates',
      linkAction: () => navigate('/templates')
    },
    {
      icon: <Download className="w-6 h-6 text-amber-400" />,
      title: 'Import & Export',
      description: 'Export single files or download complete workspace folders as structured ZIP archives. Easily import existing archives anytime.',
      badge: 'Zip Support',
      linkText: 'Import Project',
      linkAction: () => navigate('/playground')
    }
  ];

  return (
    <section id="features" className="py-24 relative overflow-hidden">
      {/* Background Subtle Highlights */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-cyan-500/5 blur-[120px] pointer-events-none rounded-full" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-600/5 blur-[120px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold uppercase tracking-wider">
            <Zap className="w-3.5 h-3.5" />
            Developer-First Capabilities
          </div>

          <h2 className="text-[28px] sm:text-[32px] lg:text-[40px] font-extrabold tracking-tight text-foreground">
            Everything You Need to Build in One Tab
          </h2>

          <p className="text-base sm:text-[18px] text-muted-foreground leading-relaxed">
            Designed for seamless flow from your first line of code to full preview and export.
          </p>
        </div>

        {/* 6 Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className="group relative rounded-2xl border border-border/80 bg-card/60 p-7 hover:bg-card hover:border-cyan-500/40 hover:shadow-xl hover:shadow-cyan-500/5 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-5">
                  <div className="w-12 h-12 rounded-xl bg-muted/60 border border-border flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    {feature.icon}
                  </div>
                  <span className="text-[12.5px] font-semibold text-muted-foreground bg-muted/50 border border-border/80 px-2.5 py-1 rounded-full">
                    {feature.badge}
                  </span>
                </div>

                <h3 className="text-[23px] font-bold text-foreground mb-2.5 group-hover:text-cyan-400 transition-colors leading-snug">
                  {feature.title}
                </h3>

                <p className="text-[15.5px] text-muted-foreground leading-[1.6]">
                  {feature.description}
                </p>
              </div>

              <div className="pt-6 mt-4 border-t border-border/60">
                <button
                  onClick={feature.linkAction}
                  className="inline-flex items-center text-[14px] font-semibold text-primary hover:text-primary/80 group-hover:translate-x-0.5 transition-all"
                >
                  <span>{feature.linkText}</span>
                  <ArrowRight className="w-4 h-4 ml-1.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
