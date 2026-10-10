import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { starterProjects, ProjectTemplate } from '@/utils/starterProjects';
import { saveFiles } from '@/utils/fileStorage';
import { getStarterProjectFiles } from '@/utils/starterProjects';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Code2, Sparkles, FolderCode, CheckCircle2 } from 'lucide-react';
import { toast } from 'sonner';

export const TemplatesSection = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Web', 'Scripts', 'Frameworks', 'Algorithms'];

  const filteredProjects = selectedCategory === 'All'
    ? starterProjects
    : starterProjects.filter(p => p.category === selectedCategory);

  const handleUseTemplate = (template: ProjectTemplate) => {
    const files = getStarterProjectFiles(template.id);
    if (files.length > 0) {
      saveFiles(files);
      toast.success(`Loaded "${template.name}" into workspace!`);
      navigate('/playground');
    }
  };

  return (
    <section id="templates" className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-semibold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              Starter Templates Gallery
            </div>
            <h2 className="text-[28px] sm:text-[32px] lg:text-[40px] font-extrabold tracking-tight text-foreground">
              Kickstart Your Ideas with Pre-Built Templates
            </h2>
            <p className="text-muted-foreground text-base sm:text-[18px] leading-relaxed">
              Choose a starter project, click &ldquo;Use Template&rdquo;, and instantly start editing in your full workspace.
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-2 bg-muted/40 p-1.5 rounded-xl border border-border self-start md:self-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 text-[13.5px] font-semibold rounded-lg transition-all ${
                  selectedCategory === cat
                    ? 'bg-primary text-primary-foreground shadow-sm'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted/60'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* 6 Templates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((template) => (
            <div
              key={template.id}
              className="group rounded-2xl border border-border/80 bg-card/70 p-6 hover:bg-card hover:border-cyan-500/40 hover:shadow-xl hover:shadow-cyan-500/5 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Header with Icon & Category */}
                <div className="flex items-center justify-between mb-4">
                  <span className="text-3xl">{template.icon}</span>
                  <Badge variant="secondary" className="text-[12.5px] font-medium">
                    {template.category}
                  </Badge>
                </div>

                <h3 className="text-[23px] font-bold text-foreground mb-2 group-hover:text-cyan-400 transition-colors leading-snug">
                  {template.name}
                </h3>

                <p className="text-[15.5px] text-muted-foreground leading-[1.6] mb-4">
                  {template.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {template.tags.map((tag, tIdx) => (
                    <span
                      key={tIdx}
                      className="text-[12px] font-mono px-2 py-0.5 rounded bg-muted/60 text-muted-foreground border border-border/60"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-4 border-t border-border/60 flex items-center justify-between">
                <span className="text-[13px] font-mono text-muted-foreground flex items-center gap-1">
                  <FolderCode className="w-3.5 h-3.5 text-cyan-400" />
                  {template.files.length} {template.files.length === 1 ? 'file' : 'files'}
                </span>

                <Button
                  onClick={() => handleUseTemplate(template)}
                  size="sm"
                  className="rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-semibold text-[13.5px] shadow-md shadow-blue-500/20 group/btn"
                >
                  <span>Use Template</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-1.5 group-hover/btn:translate-x-0.5 transition-transform" />
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* View All Link */}
        <div className="mt-12 text-center">
          <Button
            onClick={() => navigate('/templates')}
            variant="outline"
            className="rounded-xl px-6 font-semibold border-border bg-card/50 hover:bg-card"
          >
            Explore Complete Template Gallery
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </section>
  );
};
