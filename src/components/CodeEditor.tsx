import { useEffect, useRef, useState } from 'react';
import Editor from '@monaco-editor/react';
import { Textarea } from '@/components/ui/textarea';
import { CodeFile, SupportedLanguage } from '@/types/file';
import { ChevronDown, ChevronUp, FileText, Code2, Edit3 } from 'lucide-react';
import { getLanguageIcon, getLanguageDisplayName } from '@/utils/languageTemplates';

interface CodeEditorProps {
  file: CodeFile | null;
  onContentChange: (content: string) => void;
  onDescriptionChange: (description: string) => void;
  isDark: boolean;
  fontSize?: number;
  minimapEnabled?: boolean;
  wordWrapEnabled?: boolean;
}

const languageMap: Record<SupportedLanguage, string> = {
  javascript: 'javascript',
  typescript: 'typescript',
  python: 'python',
  java: 'java',
  cpp: 'cpp',
  c: 'c',
  csharp: 'csharp',
  go: 'go',
  swift: 'swift',
  html: 'html',
  css: 'css',
  ruby: 'ruby',
  rust: 'rust',
  php: 'php'
};

export const CodeEditor = ({ 
  file, 
  onContentChange, 
  onDescriptionChange, 
  isDark,
  fontSize = 14,
  minimapEnabled = true,
  wordWrapEnabled = true
}: CodeEditorProps) => {
  const editorRef = useRef<any>(null);
  const [showDescription, setShowDescription] = useState(false);

  useEffect(() => {
    if (editorRef.current && file) {
      if (editorRef.current.getValue() !== file.content) {
        editorRef.current.setValue(file.content);
      }
    }
  }, [file]);

  if (!file) {
    return (
      <div className="flex-1 flex items-center justify-center bg-editor-bg text-muted-foreground">
        <div className="text-center p-6 space-y-2">
          <Code2 className="w-10 h-10 mx-auto opacity-30 text-primary" />
          <p className="text-base font-semibold text-foreground">No file selected</p>
          <p className="text-sm text-muted-foreground">Create a new file or select one from the sidebar.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col overflow-hidden bg-editor-bg relative">
      {/* File Tab Header (14–16px Navigation tab label) */}
      <div className="h-10.5 border-b border-border bg-card/80 px-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 bg-background/90 border border-border/80 px-4 py-1.5 rounded-t-md text-[15px] font-semibold text-foreground shadow-sm">
            <span>{getLanguageIcon(file.language as SupportedLanguage)}</span>
            <span>{file.name}</span>
          </div>
          <span className="text-[14px] text-muted-foreground hidden sm:inline font-mono">
            ({getLanguageDisplayName(file.language as SupportedLanguage)})
          </span>
        </div>

        <div className="flex items-center gap-2 text-[14px] text-muted-foreground">
          {file.description && !showDescription && (
            <button
              onClick={() => setShowDescription(true)}
              className="text-cyan-400 hover:underline flex items-center gap-1 text-[14px] font-medium"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Notes attached</span>
            </button>
          )}
        </div>
      </div>

      {/* Monaco Code Editor with Standard Normal Theme */}
      <div className="flex-1 relative min-h-0">
        <Editor
          height="100%"
          language={languageMap[file.language as SupportedLanguage] || 'javascript'}
          value={file.content}
          onChange={(value) => onContentChange(value || '')}
          theme={isDark ? 'vs-dark' : 'vs'}
          onMount={(editor) => {
            editorRef.current = editor;
          }}
          options={{
            minimap: { enabled: minimapEnabled },
            fontSize: fontSize,
            lineNumbers: 'on',
            roundedSelection: false,
            scrollBeyondLastLine: false,
            automaticLayout: true,
            tabSize: 2,
            wordWrap: wordWrapEnabled ? 'on' : 'off',
            formatOnPaste: true,
            formatOnType: true,
            padding: { top: 8, bottom: 8 },
            renderLineHighlight: 'line',
            renderLineHighlightOnlyWhenFocus: false,
            overviewRulerBorder: false,
            cursorBlinking: 'smooth',
            smoothScrolling: true
          }}
        />
      </div>

      {/* Collapsible File Description Section (16–18px Heading, 14px Labels) */}
      <div className="border-t border-border bg-card/90 transition-all duration-200">
        {/* Toggle Bar */}
        <button
          onClick={() => setShowDescription(!showDescription)}
          className="w-full h-10 px-3.5 flex items-center justify-between text-muted-foreground hover:text-foreground hover:bg-muted/40 transition-colors"
        >
          {/* Section heading: 16–18px font size, bold */}
          <div className="flex items-center gap-2 text-[17px] font-bold text-foreground">
            <Edit3 className="w-4 h-4 text-cyan-400" />
            <span>File Description & Notes</span>
            {file.description && (
              <span className="w-2.5 h-2.5 rounded-full bg-cyan-400" />
            )}
          </div>

          {/* Action toggle label: 14px font size */}
          <div className="flex items-center gap-1.5 text-[14px] font-medium text-muted-foreground">
            <span>{showDescription ? 'Collapse' : 'Add / View Notes'}</span>
            {showDescription ? (
              <ChevronDown className="w-4 h-4" />
            ) : (
              <ChevronUp className="w-4 h-4" />
            )}
          </div>
        </button>

        {/* Collapsible Content (14px text) */}
        {showDescription && (
          <div className="p-3 pt-1 border-t border-border/50 animate-accordion-down">
            <Textarea
              id="file-description"
              value={file.description}
              onChange={(e) => onDescriptionChange(e.target.value)}
              placeholder="Add short notes, architectural documentation, or todos for this file..."
              className="h-20 resize-none bg-editor-bg text-sm leading-relaxed"
            />
          </div>
        )}
      </div>
    </div>
  );
};
