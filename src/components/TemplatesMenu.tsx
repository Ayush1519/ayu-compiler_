import { FileCode, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { SupportedLanguage } from '@/types/file';
import { getLanguageDisplayName, getLanguageIcon } from '@/utils/languageTemplates';

interface TemplatesMenuProps {
  onSelectTemplate: (language: SupportedLanguage) => void;
}

const languages: SupportedLanguage[] = [
  'javascript',
  'typescript',
  'python',
  'java',
  'cpp',
  'c',
  'csharp',
  'go',
  'swift',
  'html',
  'css'
];

export const TemplatesMenu = ({ onSelectTemplate }: TemplatesMenuProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="gap-1.5 h-9 px-3.5 text-[14.5px] font-medium">
          <FileCode className="w-4 h-4 text-cyan-400" />
          <span>Templates</span>
          <ChevronDown className="w-3.5 h-3.5 text-muted-foreground" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-56">
        <DropdownMenuLabel className="text-[14.5px] font-semibold">Code Templates</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang}
            onClick={() => onSelectTemplate(lang)}
            className="cursor-pointer text-[14.5px] py-2"
          >
            <span className="mr-2 text-base">{getLanguageIcon(lang)}</span>
            {getLanguageDisplayName(lang)}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
