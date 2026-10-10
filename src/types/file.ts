export interface CodeFile {
  id: string;
  name: string;
  language: string;
  content: string;
  description: string;
  createdAt: number;
  updatedAt: number;
  parentId: string | null; // null means root level
  isFolder?: boolean;
}

export type SupportedLanguage = 
  | 'javascript'
  | 'typescript'
  | 'python'
  | 'java'
  | 'cpp'
  | 'c'
  | 'csharp'
  | 'go'
  | 'swift'
  | 'html'
  | 'css'
  | 'ruby'
  | 'rust'
  | 'php';

export interface ConsoleOutput {
  type: 'output' | 'error' | 'info';
  message: string;
  timestamp: number;
}
