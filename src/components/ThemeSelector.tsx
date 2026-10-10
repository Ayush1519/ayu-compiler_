import { useState } from 'react';
import { Palette, Check, Sparkles, SlidersHorizontal, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  SYNTAX_THEMES,
  BACKGROUND_PRESETS,
  SyntaxTheme,
  BackgroundPreset,
  getThemeById,
  getEffectiveEditorBg
} from '@/utils/editorThemes';

interface ThemeSelectorProps {
  currentThemeId: string;
  onThemeChange: (themeId: string) => void;
  customBgColor: string | null;
  onBgColorChange: (color: string | null) => void;
}

export const ThemeSelector = ({
  currentThemeId,
  onThemeChange,
  customBgColor,
  onBgColorChange
}: ThemeSelectorProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const activeTheme = getThemeById(currentThemeId);
  const effectiveBg = getEffectiveEditorBg(customBgColor, true);

  const [hexInput, setHexInput] = useState(effectiveBg);

  const handleHexSubmit = (val: string) => {
    let formatted = val.trim();
    if (!formatted.startsWith('#')) {
      formatted = '#' + formatted;
    }
    if (/^#[0-9A-Fa-f]{6}$/.test(formatted) || /^#[0-9A-Fa-f]{3}$/.test(formatted)) {
      onBgColorChange(formatted);
      setHexInput(formatted);
    }
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          size="sm"
          variant="outline"
          className="h-8 px-2.5 text-sm font-medium gap-1.5 border-border hover:border-cyan-500/50 transition-all bg-card/80"
          title="Customize Code Color Theme & Background"
        >
          <div className="flex items-center -space-x-1 mr-0.5">
            {activeTheme.palette.slice(0, 3).map((color, idx) => (
              <span
                key={idx}
                className="w-2.5 h-2.5 rounded-full ring-1 ring-background shadow-xs"
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
          <span className="hidden sm:inline text-foreground text-sm font-medium">
            {activeTheme.name.split(' ')[0]}
          </span>
          <Palette className="w-3.5 h-3.5 text-cyan-400" />
        </Button>
      </PopoverTrigger>

      <PopoverContent
        align="end"
        className="w-[360px] sm:w-[420px] p-4 bg-card border-border shadow-2xl rounded-xl z-50 text-foreground"
      >
        <div className="space-y-4">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-border/80 pb-2.5">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
                <Palette className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-base font-semibold text-foreground">Editor Color Themes</h4>
                <p className="text-xs text-muted-foreground">Customize syntax highlighting & background</p>
              </div>
            </div>

            {customBgColor && (
              <Button
                size="sm"
                variant="ghost"
                onClick={() => {
                  onBgColorChange(null);
                  setHexInput(getEffectiveEditorBg(null, true));
                }}
                className="h-7 px-2 text-xs text-muted-foreground hover:text-foreground gap-1"
                title="Reset to default background"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset Bg</span>
              </Button>
            )}
          </div>

          {/* Section 1: Syntax Highlighting Schemes */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-semibold text-foreground flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                Syntax Highlight Presets
              </span>
              <span className="text-[11px] text-muted-foreground font-mono">
                {SYNTAX_THEMES.length} options
              </span>
            </div>

            <div className="grid grid-cols-1 gap-1.5 max-h-52 overflow-y-auto pr-1">
              {SYNTAX_THEMES.map((theme: SyntaxTheme) => {
                const isSelected = theme.id === currentThemeId;
                return (
                  <button
                    key={theme.id}
                    onClick={() => {
                      onThemeChange(theme.id);
                    }}
                    className={`w-full flex items-center justify-between p-2 rounded-lg border text-left transition-all ${
                      isSelected
                        ? 'border-cyan-500 bg-cyan-500/10 shadow-xs'
                        : 'border-border/60 hover:border-border hover:bg-muted/40'
                    }`}
                  >
                    <div className="min-w-0 flex-1 mr-2">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-foreground truncate">
                          {theme.name}
                        </span>
                        {isSelected && (
                          <span className="px-1.5 py-0.2 rounded text-[10px] font-semibold bg-cyan-500 text-black">
                            Active
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-muted-foreground truncate">
                        {theme.description}
                      </p>
                    </div>

                    {/* Palette chips */}
                    <div className="flex items-center gap-1 shrink-0 bg-background/80 px-2 py-1 rounded-md border border-border/60">
                      {theme.palette.map((c, i) => (
                        <span
                          key={i}
                          className="w-3 h-3 rounded-full shadow-xs"
                          style={{ backgroundColor: c }}
                        />
                      ))}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Section 2: Editor Background Colors */}
          <div className="border-t border-border/80 pt-3">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-semibold text-foreground flex items-center gap-1.5">
                <SlidersHorizontal className="w-3.5 h-3.5 text-purple-400" />
                Editor Background
              </span>
              <span className="text-[11px] text-muted-foreground font-mono">
                {effectiveBg}
              </span>
            </div>

            {/* Quick Presets */}
            <div className="grid grid-cols-3 gap-1.5 mb-3">
              {BACKGROUND_PRESETS.map((bg: BackgroundPreset) => {
                const isActive = effectiveBg.toLowerCase() === bg.color.toLowerCase();
                return (
                  <button
                    key={bg.id}
                    onClick={() => {
                      onBgColorChange(bg.color);
                      setHexInput(bg.color);
                    }}
                    className={`flex items-center gap-2 p-1.5 rounded-md border text-left transition-all ${
                      isActive
                        ? 'border-cyan-500 ring-1 ring-cyan-500/50 bg-muted/70'
                        : 'border-border/60 hover:border-border hover:bg-muted/30'
                    }`}
                  >
                    <span
                      className="w-4 h-4 rounded-md shrink-0 border border-border shadow-xs"
                      style={{ backgroundColor: bg.color }}
                    />
                    <span className="text-xs font-medium text-foreground truncate">
                      {bg.name}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Custom Color Picker & Hex Input */}
            <div className="flex items-center gap-2 bg-muted/40 p-2 rounded-lg border border-border/70">
              <label
                htmlFor="custom-color-picker"
                className="w-8 h-8 rounded-lg cursor-pointer border border-border flex items-center justify-center shrink-0 shadow-sm relative overflow-hidden group"
                style={{ backgroundColor: effectiveBg }}
                title="Click to open system color picker"
              >
                <input
                  id="custom-color-picker"
                  type="color"
                  value={effectiveBg}
                  onChange={(e) => {
                    onBgColorChange(e.target.value);
                    setHexInput(e.target.value);
                  }}
                  className="opacity-0 absolute inset-0 cursor-pointer w-full h-full"
                />
              </label>

              <div className="flex-1 min-w-0">
                <label className="text-[11px] font-medium text-muted-foreground block mb-0.5">
                  Custom Hex Color
                </label>
                <div className="flex items-center gap-1.5">
                  <input
                    type="text"
                    value={hexInput}
                    onChange={(e) => setHexInput(e.target.value)}
                    onBlur={() => handleHexSubmit(hexInput)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') handleHexSubmit(hexInput);
                    }}
                    placeholder="#0a192f"
                    className="w-full h-7 px-2 text-xs font-mono rounded bg-background border border-border text-foreground focus:outline-none focus:border-cyan-500"
                  />
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleHexSubmit(hexInput)}
                    className="h-7 px-2 text-xs font-medium shrink-0"
                  >
                    Apply
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};
