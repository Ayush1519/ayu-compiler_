import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Header } from '@/components/Header';
import { FileSidebar } from '@/components/FileSidebar';
import { CodeEditor } from '@/components/CodeEditor';
import { ConsolePanel } from '@/components/ConsolePanel';
import { TemplatesMenu } from '@/components/TemplatesMenu';
import { EditorControls } from '@/components/EditorControls';
import { LivePreview } from '@/components/LivePreview';
import { AiAssistant } from '@/components/AiAssistant';
import { CodeFile, ConsoleOutput, SupportedLanguage } from '@/types/file';
import { saveFiles, loadFiles, generateFileId } from '@/utils/fileStorage';
import { languageTemplates } from '@/utils/languageTemplates';
import { starterProjects, getStarterProjectFiles } from '@/utils/starterProjects';
import { executeCode, ExecutionResult } from '@/utils/codeRunner';
import { toast } from 'sonner';
import JSZip from 'jszip';
import {
  Eye,
  Upload,
  Sparkles,
  FolderCode,
  Terminal,
  Code2,
  Layers,
  Columns,
  Rows,
  PanelLeftClose,
  PanelLeft
} from 'lucide-react';
import { Button } from '@/components/ui/button';

type MobileViewTab = 'files' | 'editor' | 'preview' | 'ai' | 'console';

const Index = () => {
  const [searchParams] = useSearchParams();
  const [files, setFiles] = useState<CodeFile[]>([]);
  const [activeFileId, setActiveFileId] = useState<string | null>(null);
  const [consoleOutputs, setConsoleOutputs] = useState<ConsoleOutput[]>([]);
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem('AyuCompiler_theme') || localStorage.getItem('AyuCompiler_theme');
    return saved ? saved === 'dark' : true;
  });
  const [fontSize, setFontSize] = useState(14);
  const [minimapEnabled, setMinimapEnabled] = useState(true);
  const [wordWrapEnabled, setWordWrapEnabled] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [isExecuting, setIsExecuting] = useState(false);
  const [stdinInput, setStdinInput] = useState('');
  const [showAiAssistant, setShowAiAssistant] = useState(false);
  const [mobileTab, setMobileTab] = useState<MobileViewTab>('editor');

  // Layout & Collapsible States
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isConsoleOpen, setIsConsoleOpen] = useState(true);
  const [isConsoleMaximized, setIsConsoleMaximized] = useState(false);
  const [consoleLayout, setConsoleLayout] = useState<'bottom' | 'side'>('bottom');

  // Load files on initialization or from template query
  useEffect(() => {
    const templateParam = searchParams.get('template');
    if (templateParam) {
      const templateFiles = getStarterProjectFiles(templateParam);
      if (templateFiles.length > 0) {
        setFiles(templateFiles);
        setActiveFileId(templateFiles[0].id);
        saveFiles(templateFiles);
        toast.success(`Template loaded: ${templateParam}`);
        return;
      }
    }

    const savedFiles = loadFiles();
    if (savedFiles.length > 0) {
      setFiles(savedFiles);
      const firstNonFolder = savedFiles.find(f => !f.isFolder);
      setActiveFileId(firstNonFolder?.id || savedFiles[0].id);
    } else {
      const defaultFile: CodeFile = {
        id: generateFileId(),
        name: 'main.js',
        language: 'javascript',
        content: languageTemplates.javascript,
        description: 'Main JavaScript file',
        createdAt: Date.now(),
        updatedAt: Date.now(),
        parentId: null
      };
      setFiles([defaultFile]);
      setActiveFileId(defaultFile.id);
      saveFiles([defaultFile]);
    }
  }, [searchParams]);

  // Theme synchronization
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('AyuCompiler_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('AyuCompiler_theme', 'light');
    }
  }, [isDark]);

  // Auto-save debounce
  useEffect(() => {
    if (files.length > 0) {
      setIsSaving(true);
      const timer = setTimeout(() => {
        saveFiles(files);
        setIsSaving(false);
      }, 400);
      return () => clearTimeout(timer);
    }
  }, [files]);

  const activeFile = files.find(f => f.id === activeFileId && !f.isFolder) || null;

  const handleFileCreate = () => {
    const newFile: CodeFile = {
      id: generateFileId(),
      name: `untitled-${files.filter(f => !f.isFolder).length + 1}.js`,
      language: 'javascript',
      content: languageTemplates.javascript,
      description: '',
      createdAt: Date.now(),
      updatedAt: Date.now(),
      parentId: null
    };
    const updatedFiles = [...files, newFile];
    setFiles(updatedFiles);
    setActiveFileId(newFile.id);
    saveFiles(updatedFiles);
    setMobileTab('editor');
    toast.success('New file created');
  };

  const handleFolderCreate = () => {
    const newFolder: CodeFile = {
      id: generateFileId(),
      name: `folder-${files.filter(f => f.isFolder).length + 1}`,
      language: 'javascript',
      content: '',
      description: '',
      createdAt: Date.now(),
      updatedAt: Date.now(),
      parentId: null,
      isFolder: true
    };
    const updatedFiles = [...files, newFolder];
    setFiles(updatedFiles);
    saveFiles(updatedFiles);
    toast.success('New folder created');
  };

  const handleFileDelete = (fileId: string) => {
    const fileToDelete = files.find(f => f.id === fileId);
    if (fileToDelete?.isFolder) {
      const deleteRecursive = (id: string): string[] => {
        const children = files.filter(f => f.parentId === id);
        const ids = [id];
        children.forEach(child => {
          ids.push(...deleteRecursive(child.id));
        });
        return ids;
      };
      const idsToDelete = deleteRecursive(fileId);
      const updatedFiles = files.filter(f => !idsToDelete.includes(f.id));
      setFiles(updatedFiles);
      saveFiles(updatedFiles);
      toast.success('Folder and contents deleted');
    } else {
      const updatedFiles = files.filter(f => f.id !== fileId);
      setFiles(updatedFiles);
      if (activeFileId === fileId) {
        const nextFile = updatedFiles.find(f => !f.isFolder);
        setActiveFileId(nextFile?.id || null);
      }
      saveFiles(updatedFiles);
      toast.success('File deleted');
    }
  };

  const handleFileRename = (fileId: string, newName: string) => {
    const updatedFiles = files.map(f =>
      f.id === fileId ? { ...f, name: newName, updatedAt: Date.now() } : f
    );
    setFiles(updatedFiles);
    saveFiles(updatedFiles);
    toast.success('Renamed successfully');
  };

  const handleFileDuplicate = (fileId: string) => {
    const fileToDuplicate = files.find(f => f.id === fileId);
    if (!fileToDuplicate || fileToDuplicate.isFolder) return;

    const newFile: CodeFile = {
      ...fileToDuplicate,
      id: generateFileId(),
      name: `${fileToDuplicate.name.replace(/\.[^/.]+$/, '')}_copy${fileToDuplicate.name.match(/\.[^/.]+$/)?.[0] || ''}`,
      createdAt: Date.now(),
      updatedAt: Date.now()
    };
    const updatedFiles = [...files, newFile];
    setFiles(updatedFiles);
    setActiveFileId(newFile.id);
    saveFiles(updatedFiles);
    toast.success('File duplicated');
  };

  const handleContentChange = (content: string) => {
    if (!activeFileId) return;
    setFiles(prev =>
      prev.map(f => (f.id === activeFileId ? { ...f, content, updatedAt: Date.now() } : f))
    );
  };

  const handleDescriptionChange = (description: string) => {
    if (!activeFileId) return;
    setFiles(prev =>
      prev.map(f => (f.id === activeFileId ? { ...f, description, updatedAt: Date.now() } : f))
    );
  };

  const handleLanguageChange = (language: SupportedLanguage) => {
    if (!activeFileId) return;
    const extension = language === 'javascript' ? '.js' :
                     language === 'typescript' ? '.ts' :
                     language === 'python' ? '.py' :
                     language === 'java' ? '.java' :
                     language === 'cpp' ? '.cpp' :
                     language === 'c' ? '.c' :
                     language === 'csharp' ? '.cs' :
                     language === 'go' ? '.go' :
                     language === 'swift' ? '.swift' :
                     language === 'html' ? '.html' :
                     language === 'css' ? '.css' :
                     language === 'ruby' ? '.rb' :
                     language === 'rust' ? '.rs' :
                     language === 'php' ? '.php' : '.txt';

    const currentFile = files.find(f => f.id === activeFileId);
    const baseName = currentFile?.name.replace(/\.[^/.]+$/, '') || 'main';

    const updatedFiles = files.map(f =>
      f.id === activeFileId
        ? {
            ...f,
            language,
            name: `${baseName}${extension}`,
            content: languageTemplates[language] || f.content,
            updatedAt: Date.now()
          }
        : f
    );
    setFiles(updatedFiles);
    saveFiles(updatedFiles);
    toast.success(`Language set to ${language}`);
  };

  const handleTemplateSelect = (language: SupportedLanguage) => {
    handleLanguageChange(language);
  };

  // Robust Code Execution
  const handleRun = async () => {
    if (!activeFile || isExecuting) return;

    setIsExecuting(true);
    setConsoleOutputs([]);
    setIsConsoleOpen(true);

    const startLog: ConsoleOutput = {
      type: 'info',
      message: `▶️ Running ${activeFile.name} (${activeFile.language.toUpperCase()})...`,
      timestamp: Date.now()
    };
    setConsoleOutputs([startLog]);

    if (window.innerWidth < 768) {
      setMobileTab('console');
    }

    try {
      const result: ExecutionResult = await executeCode(
        activeFile.language,
        activeFile.content,
        stdinInput
      );

      const newLogs: ConsoleOutput[] = [];

      if (result.statusMessage) {
        newLogs.push({
          type: 'info',
          message: result.statusMessage,
          timestamp: Date.now()
        });
      }

      if (result.compileError) {
        newLogs.push({
          type: 'error',
          message: `❌ Compile Error:\n${result.compileError}`,
          timestamp: Date.now()
        });
      }

      if (result.stdout) {
        newLogs.push({
          type: 'output',
          message: result.stdout,
          timestamp: Date.now()
        });
      }

      if (result.stderr) {
        newLogs.push({
          type: 'error',
          message: result.stderr,
          timestamp: Date.now()
        });
      }

      if (result.success && !result.stdout && !result.stderr && !result.compileError) {
        newLogs.push({
          type: 'info',
          message: `✔ Execution completed in ${result.executionTime}ms (No output returned)`,
          timestamp: Date.now()
        });
      }

      setConsoleOutputs(prev => [...prev, ...newLogs]);

      if (activeFile.language === 'html' || activeFile.language === 'css') {
        setShowPreview(true);
      }
    } catch (error: any) {
      setConsoleOutputs(prev => [
        ...prev,
        {
          type: 'error',
          message: `❌ Execution Failed: ${error?.message || error}`,
          timestamp: Date.now()
        }
      ]);
    } finally {
      setIsExecuting(false);
    }
  };

  // Export active file
  const handleExport = () => {
    if (!activeFile) return;
    const blob = new Blob([activeFile.content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = activeFile.name;
    a.click();
    URL.revokeObjectURL(url);
    toast.success(`Exported ${activeFile.name}`);
  };

  // Export full workspace ZIP
  const handleWorkspaceExport = async () => {
    try {
      const zip = new JSZip();
      zip.file('AyuCompiler.json', JSON.stringify({
        version: '1.0',
        exportDate: new Date().toISOString(),
        fileCount: files.length
      }, null, 2));

      files.forEach(file => {
        if (!file.isFolder) {
          zip.file(file.name, file.content);
        }
      });

      const blob = await zip.generateAsync({ type: 'blob' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `AyuCompiler-workspace-${Date.now()}.zip`;
      a.click();
      URL.revokeObjectURL(url);
      toast.success('Workspace exported as ZIP');
    } catch {
      toast.error('Failed to export workspace');
    }
  };

  // Import full workspace ZIP
  const handleWorkspaceImport = async () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.zip';
    input.onchange = async (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (!file) return;

      try {
        const zip = new JSZip();
        const contents = await zip.loadAsync(file);
        const importedFiles: CodeFile[] = [];

        for (const [path, zipEntry] of Object.entries(contents.files)) {
          if (!zipEntry.dir && path !== 'AyuCompiler.json' && path !== 'AyuCompiler.json') {
            const content = await zipEntry.async('text');
            const extension = path.split('.').pop() || 'txt';
            const language = extension === 'js' ? 'javascript' :
                             extension === 'ts' ? 'typescript' :
                             extension === 'py' ? 'python' :
                             extension === 'java' ? 'java' :
                             extension === 'cpp' ? 'cpp' :
                             extension === 'c' ? 'c' :
                             extension === 'cs' ? 'csharp' :
                             extension === 'go' ? 'go' :
                             extension === 'swift' ? 'swift' :
                             extension === 'html' ? 'html' :
                             extension === 'css' ? 'css' : 'javascript';

            importedFiles.push({
              id: generateFileId(),
              name: path.split('/').pop() || path,
              language,
              content,
              description: '',
              createdAt: Date.now(),
              updatedAt: Date.now(),
              parentId: null
            });
          }
        }

        if (importedFiles.length > 0) {
          setFiles(importedFiles);
          setActiveFileId(importedFiles[0].id);
          saveFiles(importedFiles);
          toast.success(`Imported ${importedFiles.length} files`);
        }
      } catch {
        toast.error('Failed to import workspace zip');
      }
    };
    input.click();
  };

  const toggleLayoutMode = () => {
    setConsoleLayout(prev => prev === 'bottom' ? 'side' : 'bottom');
    setIsConsoleOpen(true);
    toast.info(consoleLayout === 'bottom' ? 'Split layout: Side-by-Side enabled' : 'Split layout: Bottom console enabled');
  };

  return (
    <div className="h-screen flex flex-col bg-background text-foreground overflow-hidden">
      {/* Primary Workspace Header */}
      <Header
        currentLanguage={(activeFile?.language as SupportedLanguage) || 'javascript'}
        onLanguageChange={handleLanguageChange}
        onRun={handleRun}
        onExport={handleExport}
        isDark={isDark}
        onThemeToggle={() => setIsDark(!isDark)}
        isExecuting={isExecuting}
      />

      {/* Secondary Controls Toolbar (14–16px font size for all toolbar labels) */}
      <div className="h-12 border-b border-border flex items-center justify-between px-3 sm:px-4 bg-card/70 backdrop-blur-sm overflow-x-auto gap-2">
        <div className="flex items-center gap-2 shrink-0">
          {/* Sidebar Toggle Button: 14–16px text */}
          <Button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            variant="outline"
            className="h-9 px-3.5 text-[14.5px] font-medium text-muted-foreground hover:text-foreground"
            title={isSidebarOpen ? 'Collapse Files Sidebar' : 'Expand Files Sidebar'}
          >
            {isSidebarOpen ? <PanelLeftClose className="w-4 h-4 mr-1.5" /> : <PanelLeft className="w-4 h-4 mr-1.5 text-cyan-400" />}
            <span className="hidden sm:inline">{isSidebarOpen ? 'Files' : 'Show Files'}</span>
          </Button>

          <TemplatesMenu onSelectTemplate={handleTemplateSelect} />

          <Button onClick={handleWorkspaceExport} variant="outline" className="h-9 px-3.5 text-[14.5px] font-medium">
            Export ZIP
          </Button>

          <Button onClick={handleWorkspaceImport} variant="outline" className="h-9 px-3.5 text-[14.5px] font-medium">
            <Upload className="w-4 h-4 mr-1.5" />
            Import ZIP
          </Button>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          {/* Split-Screen Layout Switcher: 14–16px text */}
          <Button
            onClick={toggleLayoutMode}
            variant="outline"
            className={`h-9 px-3.5 text-[14.5px] font-medium ${consoleLayout === 'side' ? 'border-cyan-500/50 text-cyan-400' : ''}`}
            title={consoleLayout === 'bottom' ? 'Switch to Side-by-Side editor & console' : 'Switch to Bottom console layout'}
          >
            {consoleLayout === 'bottom' ? <Columns className="w-4 h-4 mr-1.5 text-cyan-400" /> : <Rows className="w-4 h-4 mr-1.5 text-cyan-400" />}
            <span className="hidden sm:inline">{consoleLayout === 'bottom' ? 'Split Screen' : 'Bottom Console'}</span>
          </Button>

          <Button
            onClick={() => setShowPreview(!showPreview)}
            variant={showPreview ? 'default' : 'outline'}
            className="h-9 px-3.5 text-[14.5px] font-medium"
          >
            <Eye className="w-4 h-4 mr-1.5" />
            Preview
          </Button>

          <Button
            onClick={() => setShowAiAssistant(!showAiAssistant)}
            variant={showAiAssistant ? 'default' : 'outline'}
            className="h-9 px-3.5 text-[14.5px] font-medium border-cyan-500/40 text-cyan-400 hover:bg-cyan-500/10"
          >
            <Sparkles className="w-4 h-4 mr-1.5" />
            Ayu AI
          </Button>

          <div className="hidden lg:flex items-center">
            <EditorControls
              fontSize={fontSize}
              onFontSizeChange={setFontSize}
              minimapEnabled={minimapEnabled}
              onMinimapToggle={() => setMinimapEnabled(!minimapEnabled)}
              wordWrapEnabled={wordWrapEnabled}
              onWordWrapToggle={() => setWordWrapEnabled(!wordWrapEnabled)}
              isSaving={isSaving}
            />
          </div>
        </div>
      </div>

      {/* Main Workspace Body (Desktop multi-pane, Mobile tabbed) */}
      <div className="flex-1 flex overflow-hidden relative">
        {/* File Sidebar (visible on desktop or when mobileTab === 'files') */}
        <div className={`${mobileTab === 'files' ? 'flex w-full' : 'hidden md:flex'} shrink-0`}>
          <FileSidebar
            files={files}
            activeFileId={activeFileId}
            onFileSelect={(id) => {
              setActiveFileId(id);
              setMobileTab('editor');
            }}
            onFileCreate={handleFileCreate}
            onFolderCreate={handleFolderCreate}
            onFileDelete={handleFileDelete}
            onFileRename={handleFileRename}
            onFileDuplicate={handleFileDuplicate}
            isCollapsed={!isSidebarOpen}
            onToggleCollapse={() => setIsSidebarOpen(!isSidebarOpen)}
          />
        </div>

        {/* Center Workspace (Code Editor & Side Console when in side-by-side mode) */}
        <div className={`flex-1 flex min-w-0 ${mobileTab === 'editor' ? 'flex' : 'hidden md:flex'}`}>
          {/* Code Editor */}
          <div className={`flex flex-col min-w-0 ${consoleLayout === 'side' ? 'w-full md:w-7/12' : 'flex-1'}`}>
            <CodeEditor
              file={activeFile}
              onContentChange={handleContentChange}
              onDescriptionChange={handleDescriptionChange}
              isDark={isDark}
              fontSize={fontSize}
              minimapEnabled={minimapEnabled}
              wordWrapEnabled={wordWrapEnabled}
            />
          </div>

          {/* Side-by-Side Console Panel */}
          {consoleLayout === 'side' && (
            <div className="hidden md:flex w-5/12 shrink-0">
              <ConsolePanel
                outputs={consoleOutputs}
                onClear={() => setConsoleOutputs([])}
                stdinInput={stdinInput}
                onStdinChange={setStdinInput}
                layoutMode="side"
                onToggleLayout={toggleLayoutMode}
              />
            </div>
          )}
        </div>

        {/* Live Preview Pane */}
        {showPreview && (
          <div className={`${mobileTab === 'preview' ? 'flex w-full absolute inset-0 z-20' : 'hidden md:flex'} shrink-0`}>
            <LivePreview files={files} onClose={() => setShowPreview(false)} />
          </div>
        )}

        {/* Ayu AI Assistant Pane */}
        {showAiAssistant && (
          <div className={`${mobileTab === 'ai' ? 'flex w-full absolute inset-0 z-30' : 'hidden md:flex'} shrink-0`}>
            <AiAssistant
              onClose={() => setShowAiAssistant(false)}
              currentCode={activeFile?.content || ''}
              currentLanguage={activeFile?.language || 'javascript'}
            />
          </div>
        )}
      </div>

      {/* Bottom Console Panel (when in bottom mode) */}
      {consoleLayout === 'bottom' && (
        <div className={`${mobileTab === 'console' ? 'block' : 'hidden md:block'}`}>
          <ConsolePanel
            outputs={consoleOutputs}
            onClear={() => setConsoleOutputs([])}
            stdinInput={stdinInput}
            onStdinChange={setStdinInput}
            isCollapsed={!isConsoleOpen}
            onToggleCollapse={() => setIsConsoleOpen(!isConsoleOpen)}
            isMaximized={isConsoleMaximized}
            onToggleMaximize={() => setIsConsoleMaximized(!isConsoleMaximized)}
            layoutMode="bottom"
            onToggleLayout={toggleLayoutMode}
          />
        </div>
      )}

      {/* Mobile Bottom Navigation Bar (Under 768px Viewports) */}
      <div className="md:hidden h-12 border-t border-border bg-card flex items-center justify-around px-2 z-40">
        <button
          onClick={() => setMobileTab('files')}
          className={`flex flex-col items-center justify-center flex-1 py-1 text-[10px] ${
            mobileTab === 'files' ? 'text-primary font-bold' : 'text-muted-foreground'
          }`}
        >
          <FolderCode className="w-4 h-4 mb-0.5" />
          <span>Files</span>
        </button>

        <button
          onClick={() => setMobileTab('editor')}
          className={`flex flex-col items-center justify-center flex-1 py-1 text-[10px] ${
            mobileTab === 'editor' ? 'text-primary font-bold' : 'text-muted-foreground'
          }`}
        >
          <Code2 className="w-4 h-4 mb-0.5" />
          <span>Editor</span>
        </button>

        <button
          onClick={() => {
            setShowPreview(true);
            setMobileTab('preview');
          }}
          className={`flex flex-col items-center justify-center flex-1 py-1 text-[10px] ${
            mobileTab === 'preview' ? 'text-primary font-bold' : 'text-muted-foreground'
          }`}
        >
          <Layers className="w-4 h-4 mb-0.5" />
          <span>Preview</span>
        </button>

        <button
          onClick={() => {
            setShowAiAssistant(true);
            setMobileTab('ai');
          }}
          className={`flex flex-col items-center justify-center flex-1 py-1 text-[10px] ${
            mobileTab === 'ai' ? 'text-cyan-400 font-bold' : 'text-muted-foreground'
          }`}
        >
          <Sparkles className="w-4 h-4 mb-0.5 text-cyan-400" />
          <span>AI</span>
        </button>

        <button
          onClick={() => setMobileTab('console')}
          className={`flex flex-col items-center justify-center flex-1 py-1 text-[10px] ${
            mobileTab === 'console' ? 'text-emerald-400 font-bold' : 'text-muted-foreground'
          }`}
        >
          <Terminal className="w-4 h-4 mb-0.5" />
          <span>Console</span>
        </button>
      </div>
    </div>
  );
};

export default Index;


