import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Code2, Cpu, Globe, Shield, Sparkles, Terminal } from 'lucide-react';

interface AboutModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const AboutModal = ({ open, onOpenChange }: AboutModalProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl bg-card border-border">
        <DialogHeader>
          <div className="flex items-center gap-2 mb-1">
            <img
              src="/ayucompiler-icon.png"
              alt="AyuCompiler Logo"
              className="w-8 h-8 rounded-lg object-contain shadow-sm"
            />
            <DialogTitle className="text-xl font-bold bg-gradient-to-r from-sky-400 via-blue-500 to-indigo-500 bg-clip-text text-transparent">
              About AyuCompiler
            </DialogTitle>
          </div>
          <DialogDescription className="text-muted-foreground">
            Your Ideas. Your Code. One Workspace.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 text-[15px] text-foreground/90 mt-2 leading-relaxed">
          <p>
            <strong>AyuCompiler</strong> is an ultra-fast, browser-based multi-language coding workspace built for developers, students, educators, and creators. It combines a professional Monaco-powered code editor, instant execution sandbox, live HTML/CSS web preview, AI-assisted debugging, and full project import/export.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
            <div className="p-3 rounded-lg border border-border bg-muted/20 flex gap-3 items-start">
              <Terminal className="w-5 h-5 text-sky-400 shrink-0 mt-0.5" />
              <div>
                <h4 className="font-semibold text-xs uppercase tracking-wider text-sky-400">Multi-Language Sandbox</h4>
                <p className="text-xs text-muted-foreground mt-1">Execute JavaScript, Python, C++, Java, Rust, Go, and more with standard I/O.</p>
              </div>
            </div>

            <div className="p-3 rounded-lg border border-border bg-muted/20 flex gap-3 items-start">
              <Globe className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
              <div>
                <h4 className="font-semibold text-xs uppercase tracking-wider text-cyan-400">Live Web Preview</h4>
                <p className="text-xs text-muted-foreground mt-1">Hot-reloading iframe previews for interactive HTML, CSS, and JS web components.</p>
              </div>
            </div>

            <div className="p-3 rounded-lg border border-border bg-muted/20 flex gap-3 items-start">
              <Sparkles className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
              <div>
                <h4 className="font-semibold text-xs uppercase tracking-wider text-indigo-400">Ayu AI Intelligence</h4>
                <p className="text-xs text-muted-foreground mt-1">Context-aware debugging, performance optimization, and instant code explanations.</p>
              </div>
            </div>

            <div className="p-3 rounded-lg border border-border bg-muted/20 flex gap-3 items-start">
              <Shield className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <h4 className="font-semibold text-xs uppercase tracking-wider text-emerald-400">Local-First Storage</h4>
                <p className="text-xs text-muted-foreground mt-1">Your code stays in your browser with zip export and zero required server lock-in.</p>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 pt-2 items-center text-xs text-muted-foreground border-t border-border">
            <span>Built with:</span>
            <Badge variant="outline">React 18</Badge>
            <Badge variant="outline">TypeScript</Badge>
            <Badge variant="outline">Tailwind CSS</Badge>
            <Badge variant="outline">Monaco Editor</Badge>
            <Badge variant="outline">Judge0</Badge>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};


