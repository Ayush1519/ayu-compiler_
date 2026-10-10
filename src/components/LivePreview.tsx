import { useEffect, useRef, useState } from 'react';
import { RefreshCw, X, Maximize2, ExternalLink, Layers, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CodeFile } from '@/types/file';

interface LivePreviewProps {
  files: CodeFile[];
  onClose: () => void;
}

export const LivePreview = ({ files, onClose }: LivePreviewProps) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [key, setKey] = useState(0);
  const [interactiveMode, setInteractiveMode] = useState(true);

  const refreshPreview = () => {
    setKey(prev => prev + 1);
  };

  const popoutPreview = () => {
    const htmlFile = files.find(f => f.language === 'html' && !f.isFolder);
    const cssFiles = files.filter(f => f.language === 'css' && !f.isFolder);
    const jsFiles = files.filter(f => f.language === 'javascript' && !f.isFolder);

    let htmlContent = htmlFile?.content || '<html><body><h1>No HTML file found</h1><p>Create an HTML file to see the preview.</p></body></html>';

    if (cssFiles.length > 0) {
      const cssContent = cssFiles.map(f => f.content).join('\n');
      htmlContent = htmlContent.replace('</head>', `<style>${cssContent}</style></head>`);
    }

    if (jsFiles.length > 0) {
      const jsContent = jsFiles.map(f => f.content).join('\n');
      htmlContent = htmlContent.replace('</body>', `<script>${jsContent}</script></body>`);
    }

    const win = window.open('', '_blank');
    if (win) {
      win.document.open();
      win.document.write(htmlContent);
      win.document.close();
    }
  };

  useEffect(() => {
    if (!iframeRef.current) return;

    // Find HTML, CSS, and JS files
    const htmlFile = files.find(f => f.language === 'html' && !f.isFolder);
    const cssFiles = files.filter(f => f.language === 'css' && !f.isFolder);
    const jsFiles = files.filter(f => f.language === 'javascript' && !f.isFolder);

    let htmlContent = htmlFile?.content || `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: system-ui, sans-serif; padding: 2rem; background: #0f172a; color: #f8fafc; text-align: center; }
            h2 { color: #38bdf8; }
          </style>
        </head>
        <body>
          <h2>No HTML file selected</h2>
          <p>Create or select an <code>index.html</code> file to see real-time live preview.</p>
        </body>
      </html>
    `;

    // Inject CSS
    if (cssFiles.length > 0) {
      const cssContent = cssFiles.map(f => f.content).join('\n');
      if (htmlContent.includes('</head>')) {
        htmlContent = htmlContent.replace('</head>', `<style>${cssContent}</style></head>`);
      } else {
        htmlContent = `<style>${cssContent}</style>` + htmlContent;
      }
    }

    // Inject JS
    if (jsFiles.length > 0 && interactiveMode) {
      const jsContent = jsFiles.map(f => f.content).join('\n');
      if (htmlContent.includes('</body>')) {
        htmlContent = htmlContent.replace('</body>', `<script>${jsContent}</script></body>`);
      } else {
        htmlContent += `<script>${jsContent}</script>`;
      }
    }

    // Create blob URL and set iframe src
    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    
    iframeRef.current.src = url;

    return () => URL.revokeObjectURL(url);
  }, [files, key, interactiveMode]);

  return (
    <div className="w-full sm:w-[420px] md:w-[480px] border-l border-border bg-card flex flex-col z-20 transition-all shadow-xl">
      {/* Header with 16px Section Heading and 14px Interactive Toggle */}
      <div className="h-11 border-b border-border flex items-center justify-between px-3 sm:px-4 bg-card">
        <div className="flex items-center gap-2">
          <Layers className="w-4 h-4 text-cyan-400" />
          {/* Section heading: 16px font size */}
          <span className="text-base font-semibold tracking-wide text-foreground">
            Preview Pane
          </span>
        </div>

        {/* Interactive Mode Toggle & Actions (14px font size) */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 bg-muted/60 px-2.5 py-1 rounded-md border border-border">
            <span className="text-sm font-medium text-muted-foreground">Interactive</span>
            <button
              onClick={() => setInteractiveMode(!interactiveMode)}
              className={`w-7 h-4 rounded-full p-0.5 transition-colors ${
                interactiveMode ? 'bg-cyan-500' : 'bg-muted-foreground/40'
              }`}
              title="Toggle interactive JavaScript in preview"
            >
              <div
                className={`w-3 h-3 rounded-full bg-white transition-transform ${
                  interactiveMode ? 'translate-x-3' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          <Button
            onClick={refreshPreview}
            size="sm"
            variant="ghost"
            className="w-7 h-7 p-0"
            title="Refresh Preview"
          >
            <RefreshCw className="w-4 h-4" />
          </Button>

          <Button
            onClick={popoutPreview}
            size="sm"
            variant="ghost"
            className="w-7 h-7 p-0"
            title="Open in new window"
          >
            <ExternalLink className="w-4 h-4" />
          </Button>

          <Button
            onClick={onClose}
            size="sm"
            variant="ghost"
            className="w-7 h-7 p-0"
            title="Close Preview"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Frame Container */}
      <div className="flex-1 bg-white relative">
        <iframe
          ref={iframeRef}
          key={key}
          className="w-full h-full border-0"
          sandbox="allow-scripts allow-same-origin allow-modals"
          title="AyuCompiler Live Preview"
        />
      </div>
    </div>
  );
};


