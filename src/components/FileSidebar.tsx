import { useState } from 'react';
import {
  FileText,
  Plus,
  Trash2,
  Edit2,
  FileCode,
  Folder,
  FolderPlus,
  ChevronRight,
  ChevronDown,
  Copy,
  PanelLeftClose,
  PanelLeft,
  ChevronLeft
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { CodeFile } from '@/types/file';
import { getLanguageIcon } from '@/utils/languageTemplates';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";

interface FileSidebarProps {
  files: CodeFile[];
  activeFileId: string | null;
  onFileSelect: (fileId: string) => void;
  onFileCreate: () => void;
  onFolderCreate: () => void;
  onFileDelete: (fileId: string) => void;
  onFileRename: (fileId: string, newName: string) => void;
  onFileDuplicate: (fileId: string) => void;
  isCollapsed?: boolean;
  onToggleCollapse?: () => void;
}

export const FileSidebar = ({
  files,
  activeFileId,
  onFileSelect,
  onFileCreate,
  onFolderCreate,
  onFileDelete,
  onFileRename,
  onFileDuplicate,
  isCollapsed = false,
  onToggleCollapse
}: FileSidebarProps) => {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState('');
  const [deleteFileId, setDeleteFileId] = useState<string | null>(null);
  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(new Set());

  const handleRename = (fileId: string) => {
    if (editName.trim()) {
      onFileRename(fileId, editName.trim());
      setEditingId(null);
      setEditName('');
    }
  };

  const startEdit = (file: CodeFile) => {
    setEditingId(file.id);
    setEditName(file.name);
  };

  const toggleFolder = (folderId: string) => {
    setExpandedFolders(prev => {
      const next = new Set(prev);
      if (next.has(folderId)) {
        next.delete(folderId);
      } else {
        next.add(folderId);
      }
      return next;
    });
  };

  const getChildFiles = (parentId: string | null) => {
    return files.filter(f => f.parentId === parentId);
  };

  const renderFile = (file: CodeFile, depth: number = 0) => {
    const isExpanded = expandedFolders.has(file.id);
    const children = file.isFolder ? getChildFiles(file.id) : [];

    return (
      <div key={file.id}>
        <ContextMenu>
          <ContextMenuTrigger>
            <div
              className={`group rounded px-2.5 py-1.5 cursor-pointer transition-colors flex items-center gap-2 ${
                activeFileId === file.id && !file.isFolder
                  ? 'bg-sidebar-active text-foreground font-medium'
                  : 'hover:bg-sidebar-hover text-foreground/90'
              }`}
              style={{ paddingLeft: `${10 + depth * 14}px` }}
              onClick={() => file.isFolder ? toggleFolder(file.id) : onFileSelect(file.id)}
            >
              {file.isFolder && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFolder(file.id);
                  }}
                  className="hover:bg-sidebar-hover rounded p-0.5 text-muted-foreground"
                >
                  {isExpanded ? (
                    <ChevronDown className="w-4 h-4" />
                  ) : (
                    <ChevronRight className="w-4 h-4" />
                  )}
                </button>
              )}

              {editingId === file.id ? (
                <Input
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  onBlur={() => handleRename(file.id)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleRename(file.id);
                    if (e.key === 'Escape') setEditingId(null);
                  }}
                  className="h-7 text-sm bg-editor-bg flex-1"
                  autoFocus
                  onClick={(e) => e.stopPropagation()}
                />
              ) : (
                <>
                  {file.isFolder ? (
                    <Folder className="w-4 h-4 text-cyan-400 shrink-0" />
                  ) : (
                    <span className="text-base shrink-0">{getLanguageIcon(file.language as any)}</span>
                  )}
                  {/* File item label: 14–16px text */}
                  <span className="text-[14.5px] font-medium truncate flex-1">{file.name}</span>
                  
                  {!file.isFolder && (
                    <div className="flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button
                        onClick={(e) => {
                          e.stopPropagation();
                          startEdit(file);
                        }}
                        size="sm"
                        variant="ghost"
                        className="w-6 h-6 p-0 hover:bg-sidebar-hover"
                        title="Rename file"
                      >
                        <Edit2 className="w-3.5 h-3.5 text-muted-foreground" />
                      </Button>
                      <Button
                        onClick={(e) => {
                          e.stopPropagation();
                          setDeleteFileId(file.id);
                        }}
                        size="sm"
                        variant="ghost"
                        className="w-6 h-6 p-0 hover:bg-destructive/20 hover:text-destructive"
                        title="Delete file"
                      >
                        <Trash2 className="w-3.5 h-3.5 text-muted-foreground" />
                      </Button>
                    </div>
                  )}
                </>
              )}
            </div>
          </ContextMenuTrigger>
          <ContextMenuContent>
            <ContextMenuItem onClick={onFileCreate} className="text-sm">
              <Plus className="w-4 h-4 mr-2" />
              New File
            </ContextMenuItem>
            <ContextMenuItem onClick={onFolderCreate} className="text-sm">
              <FolderPlus className="w-4 h-4 mr-2" />
              New Folder
            </ContextMenuItem>
            {!file.isFolder && (
              <ContextMenuItem onClick={() => onFileDuplicate(file.id)} className="text-sm">
                <Copy className="w-4 h-4 mr-2" />
                Duplicate
              </ContextMenuItem>
            )}
            <ContextMenuItem onClick={() => startEdit(file)} className="text-sm">
              <Edit2 className="w-4 h-4 mr-2" />
              Rename
            </ContextMenuItem>
            <ContextMenuItem
              onClick={() => setDeleteFileId(file.id)}
              className="text-destructive focus:text-destructive text-sm"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Delete
            </ContextMenuItem>
          </ContextMenuContent>
        </ContextMenu>

        {file.isFolder && isExpanded && children.length > 0 && (
          <div>
            {children.map(child => renderFile(child, depth + 1))}
          </div>
        )}
      </div>
    );
  };

  const rootFiles = getChildFiles(null);

  // Render Mini Collapsed Rail when collapsed
  if (isCollapsed) {
    return (
      <div className="w-12 border-r border-border bg-sidebar-bg flex flex-col items-center py-3 select-none transition-all">
        <Button
          onClick={onToggleCollapse}
          size="sm"
          variant="ghost"
          className="w-8 h-8 p-0 mb-3 text-muted-foreground hover:text-foreground"
          title="Expand Files Sidebar"
        >
          <PanelLeft className="w-4 h-4 text-cyan-400" />
        </Button>

        <div className="h-px w-6 bg-border mb-3" />

        <Button
          onClick={onFileCreate}
          size="sm"
          variant="ghost"
          className="w-8 h-8 p-0 mb-2 text-muted-foreground hover:text-foreground"
          title="New File"
        >
          <Plus className="w-4 h-4" />
        </Button>

        <Button
          onClick={onFolderCreate}
          size="sm"
          variant="ghost"
          className="w-8 h-8 p-0 text-muted-foreground hover:text-foreground"
          title="New Folder"
        >
          <FolderPlus className="w-4 h-4" />
        </Button>

        <div className="mt-auto text-xs text-muted-foreground font-mono writing-mode-vertical tracking-wider">
          {files.filter(f => !f.isFolder).length} FILES
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="w-60 sm:w-64 border-r border-border bg-sidebar-bg flex flex-col transition-all duration-200 select-none">
        {/* Header with 16–18px Section Heading and 14–16px toolbar controls */}
        <div className="h-12 border-b border-border flex items-center justify-between px-3.5 bg-card/60">
          <div className="flex items-center gap-2">
            <FileCode className="w-4 h-4 text-cyan-400" />
            {/* Section heading: 16–18px font size, bold */}
            <span className="text-[17px] font-bold tracking-wide text-foreground">
              Files
            </span>
          </div>

          <div className="flex items-center gap-0.5">
            <Button
              onClick={onFolderCreate}
              size="sm"
              variant="ghost"
              className="w-7 h-7 p-0 text-muted-foreground hover:text-foreground"
              title="New Folder"
            >
              <FolderPlus className="w-4 h-4" />
            </Button>
            <Button
              onClick={onFileCreate}
              size="sm"
              variant="ghost"
              className="w-7 h-7 p-0 text-muted-foreground hover:text-foreground"
              title="New File"
            >
              <Plus className="w-4 h-4" />
            </Button>
            {onToggleCollapse && (
              <Button
                onClick={onToggleCollapse}
                size="sm"
                variant="ghost"
                className="w-7 h-7 p-0 text-muted-foreground hover:text-foreground"
                title="Collapse Files Sidebar"
              >
                <PanelLeftClose className="w-4 h-4" />
              </Button>
            )}
          </div>
        </div>

        {/* File Tree List (14px file labels) */}
        <ScrollArea className="flex-1">
          <div className="p-2 space-y-0.5">
            {rootFiles.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground text-sm">
                <FileText className="w-8 h-8 mx-auto mb-2 opacity-40" />
                <p>No files yet</p>
                <p className="text-xs mt-1 text-muted-foreground/80">Click + to create one</p>
              </div>
            ) : (
              rootFiles.map((file) => renderFile(file))
            )}
          </div>
        </ScrollArea>
      </div>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteFileId !== null} onOpenChange={() => setDeleteFileId(null)}>
        <AlertDialogContent className="max-w-md bg-card border-border">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-base font-bold">Delete File</AlertDialogTitle>
            <AlertDialogDescription className="text-sm text-muted-foreground">
              Are you sure you want to delete this file? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="text-sm">Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                if (deleteFileId) {
                  onFileDelete(deleteFileId);
                  setDeleteFileId(null);
                }
              }}
              className="bg-destructive hover:bg-destructive/90 text-sm"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};
