import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ShieldCheck, FileText, HelpCircle } from 'lucide-react';

export type PolicyType = 'privacy' | 'terms' | 'help' | null;

interface PolicyModalProps {
  type: PolicyType;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const PolicyModal = ({ type, open, onOpenChange }: PolicyModalProps) => {
  const getHeader = () => {
    switch (type) {
      case 'privacy':
        return {
          icon: <ShieldCheck className="w-5 h-5 text-emerald-400" />,
          title: 'Privacy Policy',
          desc: 'How AyuCompiler handles your code, data, and workspace privacy.'
        };
      case 'terms':
        return {
          icon: <FileText className="w-5 h-5 text-sky-400" />,
          title: 'Terms of Service',
          desc: 'Usage guidelines and terms for the AyuCompiler platform.'
        };
      case 'help':
      default:
        return {
          icon: <HelpCircle className="w-5 h-5 text-indigo-400" />,
          title: 'Help & Documentation',
          desc: 'Quick start guide and keyboard shortcuts for AyuCompiler.'
        };
    }
  };

  const header = getHeader();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[85vh] flex flex-col bg-card border-border">
        <DialogHeader>
          <div className="flex items-center gap-2">
            {header.icon}
            <DialogTitle className="text-xl font-bold">{header.title}</DialogTitle>
          </div>
          <DialogDescription className="text-[15px] leading-relaxed">{header.desc}</DialogDescription>
        </DialogHeader>

        <ScrollArea className="flex-1 pr-4 mt-2 max-h-[60vh]">
          {type === 'privacy' && (
            <div className="space-y-4 text-[14.5px] text-muted-foreground leading-relaxed">
              <section>
                <h4 className="font-semibold text-foreground mb-1 text-[15.5px]">1. Local-First Architecture</h4>
                <p>
                  AyuCompiler is designed with privacy at its core. Your workspace files, directories, and editor preferences are stored locally in your browser’s <code className="text-primary font-mono text-xs bg-muted px-1 py-0.5 rounded">localStorage</code> and memory. We do not store your code on proprietary servers unless you explicitly execute it via remote compilation.
                </p>
              </section>

              <section>
                <h4 className="font-semibold text-foreground mb-1 text-[15.5px]">2. Code Execution Data</h4>
                <p>
                  When executing code through external compilation services (e.g., Judge0 for C++, Python, Java), your code payload and standard input are transmitted over encrypted HTTPS connections solely for the duration of compilation and execution.
                </p>
              </section>

              <section>
                <h4 className="font-semibold text-foreground mb-1 text-[15.5px]">3. Ayu AI Queries</h4>
                <p>
                  When you submit prompts or code snippets to the Ayu AI assistant, the relevant context is securely sent to AI inference endpoints to generate helpful explanations and code corrections. No AI interaction data is sold or used to train public models.
                </p>
              </section>

              <section>
                <h4 className="font-semibold text-foreground mb-1 text-[15.5px]">4. Cookies & Telemetry</h4>
                <p>
                  We use minimal, strictly necessary local storage tokens to preserve your active theme (dark/light) and editor options. No intrusive third-party tracking scripts are included.
                </p>
              </section>
            </div>
          )}

          {type === 'terms' && (
            <div className="space-y-4 text-[14.5px] text-muted-foreground leading-relaxed">
              <section>
                <h4 className="font-semibold text-foreground mb-1 text-[15.5px]">1. Permitted Use</h4>
                <p>
                  AyuCompiler is freely provided for personal, educational, prototyping, and professional software development. You retain full ownership and intellectual property rights to any code you write in AyuCompiler.
                </p>
              </section>

              <section>
                <h4 className="font-semibold text-foreground mb-1 text-[15.5px]">2. Prohibited Activities</h4>
                <p>
                  You agree not to use the compilation sandbox or AI endpoints for malicious activities, including denial-of-service attempts, automated scraping, vulnerability exploitation, or distributing harmful malware.
                </p>
              </section>

              <section>
                <h4 className="font-semibold text-foreground mb-1 text-[15.5px]">3. Service Availability</h4>
                <p>
                  AyuCompiler is provided &ldquo;as is&rdquo; without warranties of any kind. We strive for 99.9% uptime for cloud compilation endpoints, while local JavaScript and Web Preview functionality runs 100% offline in your browser.
                </p>
              </section>
            </div>
          )}

          {type === 'help' && (
            <div className="space-y-4 text-[14.5px] text-muted-foreground leading-relaxed">
              <section>
                <h4 className="font-semibold text-foreground mb-1 text-[15.5px]">🚀 Quick Start Guide</h4>
                <ul className="list-disc list-inside space-y-1.5 text-[14px]">
                  <li><strong>Run Code:</strong> Click the green <span className="text-emerald-400 font-semibold">▶ Run</span> button or switch to the Playground.</li>
                  <li><strong>Live Web Preview:</strong> Click the <span className="text-sky-400 font-semibold">Preview</span> button in the toolbar to render HTML, CSS, and JS in real time.</li>
                  <li><strong>Ayu AI:</strong> Click the <span className="text-indigo-400 font-semibold">Ayu AI</span> button for instant code explanation, bug fixing, and optimization.</li>
                  <li><strong>Import & Export:</strong> Export your workspace as a <code className="text-primary font-mono bg-muted px-1 py-0.5 rounded">.zip</code> archive or import existing projects.</li>
                </ul>
              </section>

              <section>
                <h4 className="font-semibold text-foreground mb-1 text-[15.5px]">⌨️ Keyboard Shortcuts</h4>
                <div className="grid grid-cols-2 gap-2 text-[13px] font-mono">
                  <div className="p-2 border border-border rounded bg-muted/20 flex justify-between">
                    <span>Format Code</span>
                    <span className="text-primary">Shift + Alt + F</span>
                  </div>
                  <div className="p-2 border border-border rounded bg-muted/20 flex justify-between">
                    <span>Quick Command</span>
                    <span className="text-primary">F1 / Ctrl + P</span>
                  </div>
                  <div className="p-2 border border-border rounded bg-muted/20 flex justify-between">
                    <span>Find & Replace</span>
                    <span className="text-primary">Ctrl + F / Ctrl + H</span>
                  </div>
                  <div className="p-2 border border-border rounded bg-muted/20 flex justify-between">
                    <span>Toggle Minimap</span>
                    <span className="text-primary">Toolbar Map Icon</span>
                  </div>
                </div>
              </section>
            </div>
          )}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};


