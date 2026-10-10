export interface SyntaxTheme {
  id: string;
  name: string;
  description: string;
  base: 'vs-dark' | 'vs';
  defaultBg: string;
  defaultFg: string;
  palette: string[]; // preview chips
  rules: {
    token: string;
    foreground?: string;
    background?: string;
    fontStyle?: string;
  }[];
}

export interface BackgroundPreset {
  id: string;
  name: string;
  color: string;
  isDark: boolean;
}

export const BACKGROUND_PRESETS: BackgroundPreset[] = [
  { id: 'pitch-black', name: 'Pitch Black', color: '#090d16', isDark: true },
  { id: 'dark-blue', name: 'Dark Blue', color: '#0b132b', isDark: true },
  { id: 'navy', name: 'Deep Navy', color: '#0a192f', isDark: true },
  { id: 'charcoal', name: 'Charcoal', color: '#181825', isDark: true },
  { id: 'emerald-night', name: 'Emerald Night', color: '#091c15', isDark: true },
  { id: 'plum-purple', name: 'Plum Purple', color: '#1a0f24', isDark: true },
  { id: 'cream', name: 'Cream / Sepia', color: '#fbf0d9', isDark: false },
  { id: 'light-grey', name: 'Light Grey', color: '#f1f5f9', isDark: false },
  { id: 'clean-white', name: 'Pure White', color: '#ffffff', isDark: false }
];

export const DEFAULT_DARK_BG = '#0a0e1a';
export const DEFAULT_LIGHT_BG = '#ffffff';

export const getEffectiveEditorBg = (customBg: string | null, isDark: boolean = true): string => {
  if (customBg) return customBg;
  return isDark ? DEFAULT_DARK_BG : DEFAULT_LIGHT_BG;
};

export const SYNTAX_THEMES: SyntaxTheme[] = [
  {
    id: 'vs-code-classic',
    name: 'Classic VS Code',
    description: 'Familiar developer theme with balanced keywords, strings, and functions',
    base: 'vs-dark',
    defaultBg: DEFAULT_DARK_BG,
    defaultFg: '#d4d4d4',
    palette: ['#569cd6', '#ce9178', '#dcdcaa', '#c586c0'],
    rules: [
      { token: 'comment', foreground: '6a9955', fontStyle: 'italic' },
      { token: 'keyword', foreground: 'c586c0' },
      { token: 'string', foreground: 'ce9178' },
      { token: 'number', foreground: 'b5cea8' },
      { token: 'regexp', foreground: 'd16969' },
      { token: 'type', foreground: '4ec9b0' },
      { token: 'function', foreground: 'dcdcaa', fontStyle: 'bold' },
      { token: 'identifier', foreground: '9cdcfe' },
      { token: 'variable', foreground: '9cdcfe' },
      { token: 'operator', foreground: 'd4d4d4' },
      { token: 'delimiter', foreground: '808080' },
      { token: 'tag', foreground: '569cd6' },
      { token: 'attribute.name', foreground: '9cdcfe' },
      { token: 'attribute.value', foreground: 'ce9178' }
    ]
  },
  {
    id: 'blue-red-black',
    name: 'Blue, Red & Black',
    description: 'Electric blue keywords, ruby red strings, and sky blue functions',
    base: 'vs-dark',
    defaultBg: DEFAULT_DARK_BG,
    defaultFg: '#f1f5f9',
    palette: ['#38bdf8', '#ef4444', '#60a5fa', '#f87171'],
    rules: [
      { token: 'comment', foreground: '64748b', fontStyle: 'italic' },
      { token: 'keyword', foreground: '38bdf8', fontStyle: 'bold' },
      { token: 'string', foreground: 'ef4444' },
      { token: 'number', foreground: '93c5fd' },
      { token: 'regexp', foreground: 'f87171' },
      { token: 'type', foreground: '60a5fa' },
      { token: 'function', foreground: '60a5fa', fontStyle: 'bold' },
      { token: 'identifier', foreground: 'f1f5f9' },
      { token: 'variable', foreground: 'fca5a5' },
      { token: 'operator', foreground: '38bdf8' },
      { token: 'delimiter', foreground: '94a3b8' },
      { token: 'tag', foreground: '38bdf8' },
      { token: 'attribute.name', foreground: '93c5fd' },
      { token: 'attribute.value', foreground: 'f87171' }
    ]
  },
  {
    id: 'blue-pink-black',
    name: 'Blue, Pink & Black',
    description: 'Cyberpunk neon electric cyan and hot magenta pink highlights',
    base: 'vs-dark',
    defaultBg: DEFAULT_DARK_BG,
    defaultFg: '#f8fafc',
    palette: ['#f472b6', '#38bdf8', '#ec4899', '#c084fc'],
    rules: [
      { token: 'comment', foreground: '71717a', fontStyle: 'italic' },
      { token: 'keyword', foreground: 'f472b6', fontStyle: 'bold' },
      { token: 'string', foreground: '38bdf8' },
      { token: 'number', foreground: 'e879f9' },
      { token: 'regexp', foreground: 'fb7185' },
      { token: 'type', foreground: 'c084fc' },
      { token: 'function', foreground: 'ec4899', fontStyle: 'bold' },
      { token: 'identifier', foreground: 'f8fafc' },
      { token: 'variable', foreground: '38bdf8' },
      { token: 'operator', foreground: 'fb7185' },
      { token: 'delimiter', foreground: 'a1a1aa' },
      { token: 'tag', foreground: 'f472b6' },
      { token: 'attribute.name', foreground: '38bdf8' },
      { token: 'attribute.value', foreground: 'ec4899' }
    ]
  },
  {
    id: 'purple-green-orange',
    name: 'Purple, Green & Orange',
    description: 'Vibrant violet keywords with emerald strings and orange functions',
    base: 'vs-dark',
    defaultBg: DEFAULT_DARK_BG,
    defaultFg: '#f3f4f6',
    palette: ['#c084fc', '#4ade80', '#fb923c', '#2dd4bf'],
    rules: [
      { token: 'comment', foreground: '6b7280', fontStyle: 'italic' },
      { token: 'keyword', foreground: 'c084fc', fontStyle: 'bold' },
      { token: 'string', foreground: '4ade80' },
      { token: 'number', foreground: 'fcd34d' },
      { token: 'regexp', foreground: 'fb923c' },
      { token: 'type', foreground: '2dd4bf' },
      { token: 'function', foreground: 'fb923c', fontStyle: 'bold' },
      { token: 'identifier', foreground: 'f3f4f6' },
      { token: 'variable', foreground: '4ade80' },
      { token: 'operator', foreground: 'f59e0b' },
      { token: 'delimiter', foreground: '9ca3af' },
      { token: 'tag', foreground: 'c084fc' },
      { token: 'attribute.name', foreground: 'fb923c' },
      { token: 'attribute.value', foreground: '4ade80' }
    ]
  },
  {
    id: 'monochrome',
    name: 'Monochrome Minimal',
    description: 'Clean distraction-free greyscale with crisp white highlights',
    base: 'vs-dark',
    defaultBg: DEFAULT_DARK_BG,
    defaultFg: '#e4e4e7',
    palette: ['#ffffff', '#e2e8f0', '#94a3b8', '#d4d4d8'],
    rules: [
      { token: 'comment', foreground: '64748b', fontStyle: 'italic' },
      { token: 'keyword', foreground: 'ffffff', fontStyle: 'bold' },
      { token: 'string', foreground: '94a3b8' },
      { token: 'number', foreground: 'a1a1aa' },
      { token: 'regexp', foreground: 'e4e4e7' },
      { token: 'type', foreground: 'f4f4f5' },
      { token: 'function', foreground: 'e2e8f0', fontStyle: 'bold' },
      { token: 'identifier', foreground: 'd4d4d8' },
      { token: 'variable', foreground: 'e4e4e7' },
      { token: 'operator', foreground: 'cbd5e1' },
      { token: 'delimiter', foreground: '71717a' },
      { token: 'tag', foreground: 'ffffff' },
      { token: 'attribute.name', foreground: 'd4d4d8' },
      { token: 'attribute.value', foreground: '94a3b8' }
    ]
  },
  {
    id: 'dracula',
    name: 'Dracula Dark',
    description: 'Famous gothic palette with pastel pink, green, yellow, and cyan',
    base: 'vs-dark',
    defaultBg: DEFAULT_DARK_BG,
    defaultFg: '#f8f8f2',
    palette: ['#ff79c6', '#50fa7b', '#8be9fd', '#bd93f9'],
    rules: [
      { token: 'comment', foreground: '6272a4', fontStyle: 'italic' },
      { token: 'keyword', foreground: 'ff79c6' },
      { token: 'string', foreground: 'f1fa8c' },
      { token: 'number', foreground: 'bd93f9' },
      { token: 'type', foreground: '8be9fd' },
      { token: 'function', foreground: '50fa7b', fontStyle: 'bold' },
      { token: 'identifier', foreground: 'f8f8f2' },
      { token: 'variable', foreground: 'ffb86c' },
      { token: 'operator', foreground: 'ff79c6' },
      { token: 'delimiter', foreground: 'f8f8f2' },
      { token: 'tag', foreground: 'ff79c6' }
    ]
  },
  {
    id: 'solarized-warm',
    name: 'Solarized Warm',
    description: 'Balanced olive, cyan-teal, royal blue, and warm orange accents',
    base: 'vs-dark',
    defaultBg: DEFAULT_DARK_BG,
    defaultFg: '#f1f5f9',
    palette: ['#859900', '#2aa198', '#268bd2', '#cb4b16'],
    rules: [
      { token: 'comment', foreground: '93a1a1', fontStyle: 'italic' },
      { token: 'keyword', foreground: '859900', fontStyle: 'bold' },
      { token: 'string', foreground: '2aa198' },
      { token: 'number', foreground: 'd33682' },
      { token: 'type', foreground: 'b58900' },
      { token: 'function', foreground: '268bd2', fontStyle: 'bold' },
      { token: 'identifier', foreground: 'f1f5f9' },
      { token: 'variable', foreground: 'cb4b16' },
      { token: 'operator', foreground: '859900' },
      { token: 'delimiter', foreground: 'cbd5e1' },
      { token: 'tag', foreground: '268bd2' }
    ]
  }
];

export const getThemeById = (id: string): SyntaxTheme => {
  return SYNTAX_THEMES.find(t => t.id === id) || SYNTAX_THEMES[0];
};

const COMMON_RULES = [
  { token: 'invalid', foreground: 'f87171', background: '00000000' },
  { token: 'invalid.illegal', foreground: 'f87171', background: '00000000' },
  { token: 'invalid.deprecated', foreground: 'fbbf24', background: '00000000' },
  { token: 'error', foreground: 'f87171', background: '00000000' },
  { token: 'delimiter.bracket', foreground: 'd4d4d4' },
  { token: 'delimiter.parenthesis', foreground: 'd4d4d4' },
  { token: 'delimiter.square', foreground: 'd4d4d4' },
  { token: 'delimiter.curly', foreground: 'd4d4d4' },
];

/**
 * Dynamically define or update a Monaco Theme with custom background color.
 */
export const registerAndApplyTheme = (
  monaco: any,
  themeId: string,
  backgroundColor?: string,
  isDark: boolean = true
) => {
  if (!monaco || !monaco.editor) return;

  const themeConfig = getThemeById(themeId);
  const bg = backgroundColor || (isDark ? DEFAULT_DARK_BG : DEFAULT_LIGHT_BG);
  const isLightBg = isColorLight(bg);

  const dynamicThemeName = `custom-${themeId}-${bg.replace('#', '')}`;

  const selectionBg = isLightBg ? '#b4d5fe' : '#264f78';
  // Standard subtle light translucent active-line highlight used in VS Code / professional editors
  const lineHighlightBg = isLightBg ? '#0000000a' : '#ffffff0d';
  const lineNumberFg = isLightBg ? '#94a3b8' : '#475569';
  const activeLineNumberFg = isLightBg ? '#0f172a' : '#38bdf8';
  const cursorFg = isLightBg ? '#0284c7' : '#38bdf8';

  // Merge theme rules with safety common rules
  const mergedRules = [...themeConfig.rules, ...COMMON_RULES];

  // Define theme in Monaco
  monaco.editor.defineTheme(dynamicThemeName, {
    base: isLightBg ? 'vs' : 'vs-dark',
    inherit: true,
    rules: mergedRules,
    colors: {
      'editor.background': bg,
      'editor.foreground': themeConfig.defaultFg || (isLightBg ? '#1e293b' : '#f8fafc'),
      'editor.lineHighlightBackground': lineHighlightBg,
      'editor.lineHighlightBorder': '#00000000',
      'editor.selectionBackground': selectionBg,
      'editor.selectionHighlightBackground': isLightBg ? '#dbeafe80' : '#1e3a8a80',
      'editor.inactiveSelectionBackground': isLightBg ? '#e2e8f080' : '#33415580',
      'editorCursor.foreground': cursorFg,
      'editorLineNumber.foreground': lineNumberFg,
      'editorLineNumber.activeForeground': activeLineNumberFg,
      'editorGutter.background': bg,
      'editorGutter.modifiedBackground': '#00000000',
      'editorGutter.addedBackground': '#00000000',
      'editorGutter.deletedBackground': '#00000000',
      'editorOverviewRuler.border': '#00000000',
      'editorOverviewRuler.currentContentForeground': '#00000000',
      'editorOverviewRuler.selectionHighlightForeground': '#00000000',
      'editorOverviewRuler.findMatchForeground': '#00000000',
      'editorOverviewRuler.errorForeground': '#ef4444',
      'editorOverviewRuler.warningForeground': '#f59e0b',
      'editorOverviewRuler.infoForeground': '#3b82f6',
      'editorError.foreground': '#ef4444',
      'editorError.background': '#00000000',
      'editorError.border': '#00000000',
      'editorWarning.foreground': '#f59e0b',
      'editorWarning.background': '#00000000',
      'editorWarning.border': '#00000000',
      'editorInfo.foreground': '#3b82f6',
      'editorInfo.background': '#00000000',
      'editorInfo.border': '#00000000',
      'editorBracketMatch.background': isLightBg ? '#0000000f' : '#ffffff15',
      'editorBracketMatch.border': isLightBg ? '#00000025' : '#ffffff30',
      'editorBracketHighlight.unexpectedBracket.foreground': isLightBg ? '#64748b' : '#94a3b8',
      'editorWidget.background': isLightBg ? '#ffffff' : '#1e293b',
      'editorWidget.border': isLightBg ? '#cbd5e1' : '#334155',
      'editorRuler.foreground': '#00000000'
    }
  });

  monaco.editor.setTheme(dynamicThemeName);
  return dynamicThemeName;
};

export const isColorLight = (hex: string): boolean => {
  if (!hex || !hex.startsWith('#')) return false;
  let color = hex.substring(1);
  if (color.length === 3) {
    color = color.split('').map(c => c + c).join('');
  }
  const r = parseInt(color.substring(0, 2), 16) || 0;
  const g = parseInt(color.substring(2, 4), 16) || 0;
  const b = parseInt(color.substring(4, 6), 16) || 0;
  // Perceived brightness formula (YIQ)
  const yiq = (r * 299 + g * 587 + b * 114) / 1000;
  return yiq >= 145;
};
