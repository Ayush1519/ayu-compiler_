import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { starterProjects, ProjectTemplate, getStarterProjectFiles } from '@/utils/starterProjects';
import { saveFiles } from '@/utils/fileStorage';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Search,
  ArrowRight,
  Sparkles,
  FolderCode,
  FileCode,
  ArrowLeft,
  CheckCircle2,
  Code2
} from 'lucide-react';
import { toast } from 'sonner';

export const Templates = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [previewTemplate, setPreviewTemplate] = useState<ProjectTemplate | null>(null);

  const categories = ['All', 'Web', 'Scripts', 'Frameworks', 'Algorithms'];

  const filtered = starterProjects.filter((tpl) => {
    const matchesCategory = selectedCategory === 'All' || tpl.category === selectedCategory;
    const matchesSearch =
      tpl.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tpl.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tpl.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const handleUseTemplate = (template: ProjectTemplate) => {
    const files = getStarterProjectFiles(template.id);
    if (files.length > 0) {
      saveFiles(files);
      toast.success(`Loaded "${template.name}" into workspace!`);
      navigate('/playground');
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      {/* Top Header */}
      <header className="sticky top-0 z-50 w-full backdrop-blur-md bg-background/80 border-b border-border/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/" className="flex items-center gap-2 group text-muted-foreground hover:text-foreground transition-colors">
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
              <span className="text-base font-medium">Home</span>
            </Link>

            <div className="h-4 w-px bg-border hidden sm:block" />

            <Link to="/" className="flex items-center gap-2">
              <img
                src="/ayucompiler-icon.png"
                alt="AyuCompiler Logo"
                className="w-8 h-8 rounded-lg object-contain shadow-sm"
              />
              <span className="text-xl font-bold tracking-tight">
                Ayu <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Compiler</span>
              </span>
            </Link>
          </div>

          <div className="flex items-center gap-3">
            <Button
              onClick={() => navigate('/playground')}
              className="h-10 px-5 rounded-xl font-semibold bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white shadow-md shadow-blue-500/20 text-base"
            >
              Open Workspace
              <ArrowRight className="w-4 h-4 ml-1.5" />
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
        {/* Page Title & Search Bar */}
        <div className="max-w-3xl mb-10 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            Starter Project Catalog
          </div>

          <h1 className="text-[28px] sm:text-[36px] lg:text-[44px] font-extrabold tracking-tight text-foreground">
            Explore Project Templates
          </h1>

          <p className="text-muted-foreground text-base sm:text-[18px] leading-relaxed">
            Choose a starting point for your next application, script, or algorithm practice session. Each template is pre-configured with complete multi-file structures.
          </p>

          {/* Search Input */}
          <div className="relative pt-2">
            <Search className="absolute left-3.5 top-5 w-4 h-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search templates by language, tag, or topic..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-11 bg-card/80 border-border text-[15px] rounded-xl focus:border-cyan-400"
            />
          </div>
        </div>

        {/* Categories Bar */}
        <div className="flex flex-wrap gap-2 mb-8 pb-4 border-b border-border">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 text-[13.5px] font-semibold rounded-xl transition-all ${
                selectedCategory === cat
                  ? 'bg-primary text-primary-foreground shadow-md shadow-primary/20'
                  : 'bg-card text-muted-foreground hover:text-foreground hover:bg-muted/60 border border-border'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Templates Grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-16 border border-dashed border-border rounded-2xl">
            <FileCode className="w-12 h-12 text-muted-foreground mx-auto mb-3 opacity-50" />
            <h3 className="text-lg font-semibold mb-1">No templates found</h3>
            <p className="text-sm text-muted-foreground">Try adjusting your search query or filter category.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((tpl) => (
              <div
                key={tpl.id}
                className="group rounded-2xl border border-border bg-card p-6 shadow-sm hover:border-cyan-500/50 hover:shadow-xl hover:shadow-cyan-500/5 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-3xl p-2 rounded-xl bg-muted/60 border border-border/80">
                      {tpl.icon}
                    </span>
                    <Badge variant="secondary" className="text-[12.5px] font-medium">
                      {tpl.category}
                    </Badge>
                  </div>

                  <h3 className="text-[23px] font-bold text-foreground mb-2 group-hover:text-cyan-400 transition-colors leading-snug">
                    {tpl.name}
                  </h3>

                  <p className="text-[15.5px] text-muted-foreground leading-[1.6] mb-4">
                    {tpl.longDescription}
                  </p>

                  {/* Included Files Preview */}
                  <div className="bg-muted/40 rounded-xl p-3 mb-4 border border-border/60">
                    <div className="text-[11px] font-semibold text-muted-foreground mb-2 flex items-center gap-1 font-mono uppercase tracking-wider">
                      <FolderCode className="w-3.5 h-3.5 text-cyan-400" />
                      Included Files ({tpl.files.length})
                    </div>
                    <div className="space-y-1">
                      {tpl.files.map((file, fIdx) => (
                        <div key={fIdx} className="flex items-center justify-between text-xs font-mono text-slate-300">
                          <span className="truncate">{file.name}</span>
                          <span className="text-[10px] text-muted-foreground uppercase">{file.language}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {tpl.tags.map((tag, tIdx) => (
                      <span
                        key={tIdx}
                        className="text-[10px] font-mono px-2 py-0.5 rounded bg-muted text-muted-foreground border border-border/60"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-border flex items-center justify-between">
                  <span className="text-xs text-muted-foreground font-mono">
                    Ready to load
                  </span>

                  <Button
                    onClick={() => handleUseTemplate(tpl)}
                    size="sm"
                    className="rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-semibold text-xs shadow-md shadow-blue-500/20"
                  >
                    <span>Use Template</span>
                    <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default Templates;
