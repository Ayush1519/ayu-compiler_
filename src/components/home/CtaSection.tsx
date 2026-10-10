import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles, Code2 } from 'lucide-react';

interface CtaSectionProps {
  onExploreFeatures: () => void;
}

export const CtaSection = ({ onExploreFeatures }: CtaSectionProps) => {
  const navigate = useNavigate();

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background Neon Glowing Halo */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/5 to-blue-600/10 pointer-events-none" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-cyan-500/15 blur-[140px] pointer-events-none rounded-full" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <div className="rounded-3xl border border-cyan-500/30 bg-gradient-to-b from-card/90 to-card/60 p-8 sm:p-14 shadow-2xl backdrop-blur-xl relative overflow-hidden">
          {/* Subtle grid pattern inside CTA box */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#38bdf80a_1px,transparent_1px),linear-gradient(to_bottom,#38bdf80a_1px,transparent_1px)] bg-[size:2rem_2rem] pointer-events-none" />

          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-semibold uppercase tracking-wider mb-6">
            <Sparkles className="w-3.5 h-3.5" />
            Instant Browser Development
          </div>

          <h2 className="text-[32px] sm:text-[40px] lg:text-[48px] font-black tracking-tight text-foreground mb-4 leading-tight">
            Your Next Project Starts Here.
          </h2>

          <p className="text-base sm:text-[18px] text-muted-foreground max-w-2xl mx-auto mb-8 leading-[1.7]">
            Open your workspace, write your first line of code, and start building. No credit card, no sign-up wall, and zero local setup required.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <Button
              onClick={() => navigate('/playground')}
              size="lg"
              className="h-12 px-8 rounded-xl font-semibold bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white shadow-xl shadow-blue-500/25 text-base"
            >
              <span>Launch AyuCompiler</span>
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>

            <Button
              onClick={onExploreFeatures}
              size="lg"
              variant="outline"
              className="h-12 px-7 rounded-xl font-semibold border-border bg-card/80 hover:bg-card text-foreground text-base"
            >
              Explore Features
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};


