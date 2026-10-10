import { useState } from 'react';
import { ZoomIn, ZoomOut, Map, WrapText, Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';

interface EditorControlsProps {
  fontSize: number;
  onFontSizeChange: (size: number) => void;
  minimapEnabled: boolean;
  onMinimapToggle: () => void;
  wordWrapEnabled: boolean;
  onWordWrapToggle: () => void;
  isSaving: boolean;
}

export const EditorControls = ({
  fontSize,
  onFontSizeChange,
  minimapEnabled,
  onMinimapToggle,
  wordWrapEnabled,
  onWordWrapToggle,
  isSaving
}: EditorControlsProps) => {
  const [showSlider, setShowSlider] = useState(false);

  return (
    <TooltipProvider>
      <div className="flex items-center gap-2 border-l border-border pl-2.5">
        {/* Auto-save indicator: 14px text */}
        <div className={cn(
          "flex items-center gap-1.5 text-sm px-2 py-1 rounded transition-colors font-medium",
          isSaving ? "text-muted-foreground" : "text-success"
        )}>
          <Save className={cn("w-3.5 h-3.5", isSaving && "animate-pulse")} />
          <span>{isSaving ? "Saving..." : "Saved"}</span>
        </div>

        {/* Font size controls: 14px text */}
        <div className="relative flex items-center gap-1">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                size="sm"
                variant="ghost"
                className="w-8 h-8 p-0"
                onClick={() => onFontSizeChange(Math.max(12, fontSize - 2))}
              >
                <ZoomOut className="w-4 h-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p className="text-sm">Decrease font size</p>
            </TooltipContent>
          </Tooltip>

          <button
            onClick={() => setShowSlider(!showSlider)}
            className="text-sm font-medium px-2.5 py-1 hover:bg-muted rounded transition-colors"
          >
            {fontSize}px
          </button>

          {showSlider && (
            <div className="absolute top-full mt-2 right-0 bg-popover border border-border rounded-lg p-3 shadow-lg z-50 w-48">
              <p className="text-sm font-semibold mb-2">Font Size: {fontSize}px</p>
              <Slider
                value={[fontSize]}
                onValueChange={([value]) => onFontSizeChange(value)}
                min={12}
                max={22}
                step={1}
                className="w-full"
              />
            </div>
          )}

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                size="sm"
                variant="ghost"
                className="w-8 h-8 p-0"
                onClick={() => onFontSizeChange(Math.min(22, fontSize + 2))}
              >
                <ZoomIn className="w-4 h-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p className="text-sm">Increase font size</p>
            </TooltipContent>
          </Tooltip>
        </div>

        {/* Minimap toggle */}
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              size="sm"
              variant={minimapEnabled ? "default" : "ghost"}
              className="w-8 h-8 p-0"
              onClick={onMinimapToggle}
            >
              <Map className="w-4 h-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p className="text-sm">Toggle minimap</p>
          </TooltipContent>
        </Tooltip>

        {/* Word wrap toggle */}
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              size="sm"
              variant={wordWrapEnabled ? "default" : "ghost"}
              className="w-8 h-8 p-0"
              onClick={onWordWrapToggle}
            >
              <WrapText className="w-4 h-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p className="text-sm">Toggle word wrap</p>
          </TooltipContent>
        </Tooltip>
      </div>
    </TooltipProvider>
  );
};
