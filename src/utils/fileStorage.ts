import { CodeFile } from '@/types/file';

const STORAGE_KEY = 'AyuCompiler_files';
const LEGACY_STORAGE_KEY = 'AyuCompiler_files';

export const saveFiles = (files: CodeFile[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(files));
};

export const loadFiles = (): CodeFile[] => {
  const stored = localStorage.getItem(STORAGE_KEY) || localStorage.getItem(LEGACY_STORAGE_KEY);
  if (!stored) return [];
  try {
    return JSON.parse(stored);
  } catch (error) {
    console.error('Error loading files:', error);
    return [];
  }
};

export const generateFileId = () => {
  return `file_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};


