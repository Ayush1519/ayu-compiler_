import { Link } from 'react-router-dom';
import { Github, Heart, MessageSquare, Shield, HelpCircle, FileText, Code2 } from 'lucide-react';
import { PolicyType } from '@/components/modals/PolicyModal';

interface HomeFooterProps {
  onOpenAbout: () => void;
  onOpenFeedback: () => void;
  onOpenPolicy: (type: PolicyType) => void;
}

export const HomeFooter = ({ onOpenAbout, onOpenFeedback, onOpenPolicy }: HomeFooterProps) => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="border-t border-border bg-card/60 pt-16 pb-12 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-2.5">
              <img
                src="/ayucompiler-icon.png"
                alt="AyuCompiler Logo"
                className="w-8 h-8 rounded-lg object-contain shadow-md shadow-cyan-500/20"
              />
              <span className="text-xl font-bold tracking-tight text-foreground">
                Ayu<span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Compiler</span>
              </span>
            </Link>

            <p className="text-[15px] text-muted-foreground max-w-sm leading-relaxed">
              Your Ideas. Your Code. One Workspace. An all-in-one browser development environment with multi-language execution, live preview, and Ayu AI.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-lg border border-border bg-muted/40 hover:bg-muted flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
                aria-label="GitHub Repository"
              >
                <Github className="w-4 h-4" />
              </a>
              <button
                onClick={onOpenFeedback}
                className="w-9 h-9 rounded-lg border border-border bg-muted/40 hover:bg-muted flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Send Feedback"
                title="Send Feedback"
              >
                <MessageSquare className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Navigation Column */}
          <div>
            <h4 className="text-[13px] font-bold uppercase tracking-wider text-foreground mb-4 font-mono">
              Product
            </h4>
            <ul className="space-y-3 text-[15px]">
              <li>
                <button
                  onClick={() => scrollToSection('features')}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Features
                </button>
              </li>
              <li>
                <Link to="/playground" className="text-muted-foreground hover:text-foreground transition-colors">
                  Playground (IDE)
                </Link>
              </li>
              <li>
                <Link to="/templates" className="text-muted-foreground hover:text-foreground transition-colors">
                  Starter Templates
                </Link>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('playground')}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Live Code Sandbox
                </button>
              </li>
            </ul>
          </div>

          {/* Resources Column */}
          <div>
            <h4 className="text-[13px] font-bold uppercase tracking-wider text-foreground mb-4 font-mono">
              Resources
            </h4>
            <ul className="space-y-3 text-[15px]">
              <li>
                <button
                  onClick={onOpenAbout}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  About AyuCompiler
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenPolicy('help')}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Help & Shortcuts
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenFeedback}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Send Feedback
                </button>
              </li>
            </ul>
          </div>

          {/* Legal Column */}
          <div>
            <h4 className="text-[13px] font-bold uppercase tracking-wider text-foreground mb-4 font-mono">
              Legal & Privacy
            </h4>
            <ul className="space-y-3 text-[15px]">
              <li>
                <button
                  onClick={() => onOpenPolicy('privacy')}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Privacy Policy
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenPolicy('terms')}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Terms of Service
                </button>
              </li>
              <li>
                <span className="text-xs text-muted-foreground/80 block mt-3">
                  Local-First Security Guaranteed
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Copyright & Status */}
        <div className="pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <div>
            © {new Date().getFullYear()} AyuCompiler. All rights reserved.
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>All Systems Operational</span>
          </div>
        </div>
      </div>
    </footer>
  );
};


