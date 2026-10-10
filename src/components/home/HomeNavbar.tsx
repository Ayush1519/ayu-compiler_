import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Moon, Sun, Menu, X, ArrowRight, Code2, Sparkles } from 'lucide-react';

interface HomeNavbarProps {
  isDark: boolean;
  onThemeToggle: () => void;
  onOpenAbout: () => void;
}

export const HomeNavbar = ({ isDark, onThemeToggle, onOpenAbout }: HomeNavbarProps) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-md bg-background/80 border-b border-border/50 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-2.5 group">
          <img
            src="/ayucompiler-icon.png"
            alt="AyuCompiler Logo"
            className="w-9 h-9 rounded-xl object-contain shadow-md shadow-cyan-500/20 group-hover:scale-105 transition-transform"
          />
          <span className="text-xl font-bold tracking-tight text-foreground flex items-center gap-1">
            Ayu <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Compiler</span>
          </span>
        </Link>

        {/* Center Navigation Pill Bar (as shown in reference image) */}
        <nav className="hidden md:flex items-center gap-1 bg-card/60 border border-border/80 rounded-full px-2 py-1 shadow-sm backdrop-blur-sm">
          <button
            onClick={() => scrollToSection('features')}
            className="px-4 py-1.5 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-full transition-colors"
          >
            Features
          </button>
          <Link
            to="/playground"
            className="px-4 py-1.5 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-full transition-colors"
          >
            Playground
          </Link>
          <Link
            to="/templates"
            className="px-4 py-1.5 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-full transition-colors"
          >
            Templates
          </Link>
          <button
            onClick={onOpenAbout}
            className="px-4 py-1.5 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-full transition-colors"
          >
            About
          </button>
        </nav>

        {/* Right CTA & Controls */}
        <div className="hidden md:flex items-center gap-3">
          <Button
            onClick={onThemeToggle}
            size="sm"
            variant="ghost"
            className="w-9 h-9 p-0 rounded-full text-muted-foreground hover:text-foreground"
            aria-label="Toggle Theme"
          >
            {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-700" />}
          </Button>

          <Button
            onClick={() => navigate('/playground')}
            className="h-10 rounded-xl font-semibold bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white shadow-md shadow-blue-500/25 hover:shadow-blue-500/40 transition-all duration-200 group px-5 text-base"
          >
            <span>Start Coding</span>
            <ArrowRight className="w-4 h-4 ml-1.5 group-hover:translate-x-0.5 transition-transform" />
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex md:hidden items-center gap-2">
          <Button
            onClick={onThemeToggle}
            size="sm"
            variant="ghost"
            className="w-8 h-8 p-0 rounded-full text-muted-foreground"
          >
            {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
          </Button>

          <Button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            size="sm"
            variant="ghost"
            className="w-9 h-9 p-0 rounded-lg"
            aria-label="Toggle Mobile Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-border bg-card/95 backdrop-blur-xl px-4 pt-3 pb-5 space-y-3 animate-accordion-down">
          <button
            onClick={() => scrollToSection('features')}
            className="block w-full text-left px-3 py-2 text-base font-medium text-muted-foreground hover:text-foreground hover:bg-muted/40 rounded-lg transition-colors"
          >
            Features
          </button>
          <Link
            to="/playground"
            onClick={() => setMobileMenuOpen(false)}
            className="block w-full text-left px-3 py-2 text-base font-medium text-muted-foreground hover:text-foreground hover:bg-muted/40 rounded-lg transition-colors"
          >
            Playground (Workspace)
          </Link>
          <Link
            to="/templates"
            onClick={() => setMobileMenuOpen(false)}
            className="block w-full text-left px-3 py-2 text-base font-medium text-muted-foreground hover:text-foreground hover:bg-muted/40 rounded-lg transition-colors"
          >
            Templates Gallery
          </Link>
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenAbout();
            }}
            className="block w-full text-left px-3 py-2 text-base font-medium text-muted-foreground hover:text-foreground hover:bg-muted/40 rounded-lg transition-colors"
          >
            About AyuCompiler
          </button>

          <div className="pt-2 border-t border-border">
            <Button
              onClick={() => {
                setMobileMenuOpen(false);
                navigate('/playground');
              }}
              className="w-full rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold shadow-lg shadow-blue-500/20"
            >
              Start Coding Now
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};


