import { Moon, Sun, Play, Download, LayoutTemplate } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link, useNavigate } from 'react-router-dom';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { SupportedLanguage } from '@/types/file';
import { getLanguageDisplayName, getLanguageIcon } from '@/utils/languageTemplates';

interface HeaderProps {
  currentLanguage: SupportedLanguage;
  onLanguageChange: (language: SupportedLanguage) => void;
  onRun: () => void;
  onExport: () => void;
  isDark: boolean;
  onThemeToggle: () => void;
  isExecuting?: boolean;
}

const languages: SupportedLanguage[] = [
  'javascript',
  'typescript',
  'python',
  'java',
  'cpp',
  'c',
  'csharp',
  'go',
  'swift',
  'ruby',
  'rust',
  'php',
  'html',
  'css'
];

export const Header = ({
  currentLanguage,
  onLanguageChange,
  onRun,
  onExport,
  isDark,
  onThemeToggle,
  isExecuting = false
}: HeaderProps) => {
  const navigate = useNavigate();

  return (
    <header className="h-14 border-b border-border bg-card flex items-center justify-between px-3 sm:px-4 shadow-sm z-30">
      {/* Left: Brand Logo & Language Selector */}
      <div className="flex items-center gap-2 sm:gap-4">
        <Link to="/" className="flex items-center gap-2.5 group" title="Return to Home">
          <img
            src="/ayucompiler-icon.png"
            alt="AyuCompiler Logo"
            className="w-8 h-8 rounded-lg object-contain shadow-sm group-hover:scale-105 transition-transform"
          />
          {/* Section heading: 16px font size */}
          <span className="hidden sm:inline font-bold text-base tracking-tight text-foreground">
            Ayu <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Compiler</span>
          </span>
        </Link>

        <div className="h-4 w-px bg-border hidden sm:block" />

        {/* Toolbar & Select: 14px font size */}
        <Select value={currentLanguage} onValueChange={(value) => onLanguageChange(value as SupportedLanguage)}>
          <SelectTrigger className="w-[160px] sm:w-[190px] h-9 bg-muted/40 border-border text-[15px] font-medium">
            <SelectValue>
              <div className="flex items-center gap-2 truncate text-[15px]">
                <span>{getLanguageIcon(currentLanguage)}</span>
                <span className="truncate">{getLanguageDisplayName(currentLanguage)}</span>
              </div>
            </SelectValue>
          </SelectTrigger>
          <SelectContent className="max-h-72">
            {languages.map((lang) => (
              <SelectItem key={lang} value={lang} className="text-[15px]">
                <span className="mr-2">{getLanguageIcon(lang)}</span>
                {getLanguageDisplayName(lang)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Right: Actions & Toolbar Labels (14–16px font size, restored proportions) */}
      <div className="flex items-center gap-2">
        <Button
          onClick={() => navigate('/templates')}
          variant="ghost"
          className="hidden md:flex h-9 px-3.5 text-[15px] font-medium text-muted-foreground hover:text-foreground"
        >
          <LayoutTemplate className="w-4 h-4 mr-1.5 text-purple-400" />
          Templates
        </Button>

        {/* Glowing Run Button: 15–16px font size */}
        <Button 
          onClick={onRun} 
          disabled={isExecuting}
          className="h-9 px-4 font-semibold text-[15px] bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-black shadow-md shadow-emerald-500/25 transition-all"
        >
          <Play className={`w-4 h-4 mr-1.5 fill-current ${isExecuting ? 'animate-spin' : ''}`} />
          {isExecuting ? 'Running...' : 'Run'}
        </Button>
        
        {/* Export Button: 15–16px font size */}
        <Button 
          onClick={onExport} 
          variant="outline"
          className="h-9 px-3.5 text-[15px] font-medium"
          title="Export Active File"
        >
          <Download className="w-4 h-4 sm:mr-1.5" />
          <span className="hidden sm:inline">Export</span>
        </Button>

        <Button
          onClick={onThemeToggle}
          variant="ghost"
          className="w-9 h-9 p-0 rounded-lg text-muted-foreground hover:text-foreground"
          aria-label="Toggle Theme"
        >
          {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-700" />}
        </Button>
      </div>
    </header>
  );
};
