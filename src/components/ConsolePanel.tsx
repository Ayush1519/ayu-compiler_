import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import {
  Terminal,
  Trash2,
  ChevronDown,
  ChevronUp,
  Maximize2,
  Minimize2,
  Columns,
  Rows,
  SlidersHorizontal,
  Sparkles,
  CheckCircle2
} from 'lucide-react';
import { ConsoleOutput } from '@/types/file';
import { Textarea } from '@/components/ui/textarea';
import { useState, useEffect, useRef } from 'react';

interface ConsolePanelProps {
  outputs: ConsoleOutput[];
  onClear: () => void;
  stdinInput?: string;
  onStdinChange?: (value: string) => void;
  isCollapsed?: boolean;
  onToggleCollapse?: () => void;
  isMaximized?: boolean;
  onToggleMaximize?: () => void;
  layoutMode?: 'bottom' | 'side';
  onToggleLayout?: () => void;
  className?: string;
}

export const ConsolePanel = ({
  outputs,
  onClear,
  stdinInput,
  onStdinChange,
  isCollapsed = false,
  onToggleCollapse,
  isMaximized = false,
  onToggleMaximize,
  layoutMode = 'bottom',
  onToggleLayout,
  className = ''
}: ConsolePanelProps) => {
  const [showInput, setShowInput] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const outputsEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new outputs arrive
  useEffect(() => {
    if (outputsEndRef.current && !isCollapsed) {
      outputsEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [outputs, isCollapsed]);

  // Collapsed Minimalist Bottom Bar
  if (isCollapsed && layoutMode === 'bottom') {
    const latestOutput = outputs[outputs.length - 1];
    return (
      <div className="h-10 border-t border-border bg-card/90 flex items-center justify-between px-3 text-sm select-none transition-all">
        <div className="flex items-center gap-2">
          <Terminal className="w-4 h-4 text-cyan-400" />
          {/* Heading: 16px font size */}
          <span className="font-semibold text-base text-foreground">Console</span>
          {outputs.length > 0 && (
            <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded font-mono">
              {outputs.length} {outputs.length === 1 ? 'log' : 'logs'}
            </span>
          )}
          {latestOutput && (
            <span className="text-sm text-muted-foreground truncate max-w-xs sm:max-w-md hidden sm:inline ml-2">
              {latestOutput.message.slice(0, 60)}
            </span>
          )}
        </div>

        <div className="flex items-center gap-1.5">
          {onToggleLayout && (
            <Button
              onClick={onToggleLayout}
              size="sm"
              variant="ghost"
              className="h-7 px-2.5 text-sm text-muted-foreground hover:text-foreground font-medium"
              title="Switch to Side-by-Side layout"
            >
              <Columns className="w-3.5 h-3.5 mr-1.5" />
              <span className="hidden sm:inline">Side-by-Side</span>
            </Button>
          )}

          {onToggleCollapse && (
            <Button
              onClick={onToggleCollapse}
              size="sm"
              variant="outline"
              className="h-7 px-3 text-sm font-medium"
              title="Expand Console"
            >
              <ChevronUp className="w-4 h-4 mr-1" />
              <span>Expand Console</span>
            </Button>
          )}
        </div>
      </div>
    );
  }

  const panelHeightClass = layoutMode === 'side'
    ? 'h-full w-full'
    : isMaximized
    ? 'h-[75vh]'
    : 'h-64 sm:h-72';

  return (
    <div className={`${panelHeightClass} ${layoutMode === 'bottom' ? 'border-t' : 'border-l'} border-border bg-console-bg flex flex-col transition-all duration-200 ${className}`}>
      {/* Console Header Bar (16–18px Section Heading, 14–16px Toolbar Labels) */}
      <div className="h-11 border-b border-border flex items-center justify-between px-3.5 bg-card/80 shadow-sm shrink-0">
        <div className="flex items-center gap-2">
          <Terminal className="w-4 h-4 text-cyan-400" />
          {/* Section heading: 16–18px font size, bold */}
          <span className="text-[17px] font-bold tracking-wide text-foreground">
            Console
          </span>
          {outputs.length > 0 && (
            <span className="text-[12.5px] font-mono text-muted-foreground bg-muted px-2 py-0.5 rounded font-medium">
              {outputs.length}
            </span>
          )}
        </div>

        {/* Toolbar Action Buttons (14–16px font size) */}
        <div className="flex items-center gap-1.5">
          {/* Stdin input toggle */}
          {onStdinChange && (
            <Button
              onClick={() => setShowInput(!showInput)}
              variant={showInput ? 'secondary' : 'ghost'}
              className="h-8 px-3 text-[14.5px] font-medium"
              title="Toggle Standard Input (stdin)"
            >
              <SlidersHorizontal className="w-3.5 h-3.5 mr-1.5" />
              <span className="hidden sm:inline">Input</span>
            </Button>
          )}

          {/* Split-screen layout toggle */}
          {onToggleLayout && (
            <Button
              onClick={onToggleLayout}
              variant="ghost"
              className="h-8 px-3 text-[14.5px] font-medium text-muted-foreground hover:text-foreground"
              title={layoutMode === 'bottom' ? 'Switch to Side-by-Side split' : 'Switch to Bottom console'}
            >
              {layoutMode === 'bottom' ? (
                <>
                  <Columns className="w-4 h-4 sm:mr-1.5 text-cyan-400" />
                  <span className="hidden sm:inline">Side Split</span>
                </>
              ) : (
                <>
                  <Rows className="w-4 h-4 sm:mr-1.5 text-cyan-400" />
                  <span className="hidden sm:inline">Bottom Split</span>
                </>
              )}
            </Button>
          )}

          {/* Maximize / Restore (for bottom mode) */}
          {layoutMode === 'bottom' && onToggleMaximize && (
            <Button
              onClick={onToggleMaximize}
              size="sm"
              variant="ghost"
              className="w-8 h-8 p-0 text-muted-foreground hover:text-foreground"
              title={isMaximized ? 'Restore console height' : 'Maximize console height'}
            >
              {isMaximized ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </Button>
          )}

          {/* Clear logs */}
          <Button
            onClick={onClear}
            size="sm"
            variant="ghost"
            className="w-8 h-8 p-0 text-muted-foreground hover:text-foreground"
            title="Clear Console"
          >
            <Trash2 className="w-4 h-4" />
          </Button>

          {/* Minimize / Collapse */}
          {onToggleCollapse && (
            <Button
              onClick={onToggleCollapse}
              size="sm"
              variant="ghost"
              className="w-8 h-8 p-0 text-muted-foreground hover:text-foreground"
              title="Minimize Console"
            >
              <ChevronDown className="w-4 h-4" />
            </Button>
          )}
        </div>
      </div>

      {/* Standard Input Drawer */}
      {showInput && onStdinChange && (
        <div className="border-b border-border p-3 bg-muted/20 shrink-0">
          <div className="text-sm font-semibold text-muted-foreground mb-1.5 uppercase tracking-wider">
            Standard Input (stdin)
          </div>
          <Textarea
            value={stdinInput || ''}
            onChange={(e) => onStdinChange(e.target.value)}
            placeholder="Enter standard input for your program (e.g. inputs for scanf/input()/readline)..."
            className="h-16 text-sm font-mono resize-none bg-editor-bg"
          />
        </div>
      )}

      {/* Console Output Area (13–14px font-mono) */}
      <ScrollArea className="flex-1 min-h-0" ref={scrollAreaRef}>
        <div className="p-3.5 font-mono text-[14px] space-y-1.5">
          {outputs.length === 0 ? (
            <div className="text-muted-foreground/60 italic py-6 text-center text-[14px]">
              Console output, warnings, and compilation diagnostics will appear here...
            </div>
          ) : (
            <>
              {outputs.map((output, index) => (
                <div
                  key={index}
                  className={`leading-relaxed ${
                    output.type === 'error'
                      ? 'text-destructive font-semibold'
                      : output.type === 'info'
                      ? 'text-cyan-400 font-semibold'
                      : 'text-foreground'
                  } whitespace-pre-wrap break-words`}
                >
                  <span className="text-muted-foreground/70 mr-2 text-[12.5px] select-none">
                    [{new Date(output.timestamp).toLocaleTimeString()}]
                  </span>
                  {output.message}
                </div>
              ))}
              <div ref={outputsEndRef} />
            </>
          )}
        </div>
      </ScrollArea>
    </div>
  );
};
