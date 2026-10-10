import { useState, useEffect } from 'react';
import { HomeNavbar } from '@/components/home/HomeNavbar';
import { HeroSection } from '@/components/home/HeroSection';
import { PlaygroundPreview } from '@/components/home/PlaygroundPreview';
import { FeaturesSection } from '@/components/home/FeaturesSection';
import { HowItWorksSection } from '@/components/home/HowItWorksSection';
import { TemplatesSection } from '@/components/home/TemplatesSection';
import { WhyAyuCompilerSection } from '@/components/home/WhyAyuCompilerSection';
import { CtaSection } from '@/components/home/CtaSection';
import { HomeFooter } from '@/components/home/HomeFooter';
import { AboutModal } from '@/components/modals/AboutModal';
import { FeedbackModal } from '@/components/modals/FeedbackModal';
import { PolicyModal, PolicyType } from '@/components/modals/PolicyModal';

export const Home = () => {
  const [isDark, setIsDark] = useState(() => {
    const savedTheme = localStorage.getItem('ayucompiler_theme') || localStorage.getItem('ayucompile_theme');
    if (savedTheme) {
      return savedTheme === 'dark';
    }
    return true; // dark-first interface
  });

  const [aboutOpen, setAboutOpen] = useState(false);
  const [feedbackOpen, setFeedbackOpen] = useState(false);
  const [policyType, setPolicyType] = useState<PolicyType>(null);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('ayucompiler_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('ayucompiler_theme', 'light');
    }
  }, [isDark]);

  const toggleTheme = () => {
    setIsDark(prev => !prev);
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* Top Header / Navigation Bar */}
      <HomeNavbar
        isDark={isDark}
        onThemeToggle={toggleTheme}
        onOpenAbout={() => setAboutOpen(true)}
      />

      {/* Main Landing Page Content */}
      <main className="flex-1 flex flex-col">
        {/* Hero Section */}
        <HeroSection onExploreTemplates={() => scrollToSection('templates')} />

        {/* Interactive Playground Sandbox */}
        <PlaygroundPreview />

        {/* 6 Features Showcase */}
        <FeaturesSection />

        {/* How It Works 3-Step Workflow */}
        <HowItWorksSection />

        {/* 6 Starter Templates Gallery */}
        <TemplatesSection />

        {/* Why AyuCompiler Split Section */}
        <WhyAyuCompilerSection />

        {/* Final CTA Banner */}
        <CtaSection onExploreFeatures={() => scrollToSection('features')} />
      </main>

      {/* Footer */}
      <HomeFooter
        onOpenAbout={() => setAboutOpen(true)}
        onOpenFeedback={() => setFeedbackOpen(true)}
        onOpenPolicy={(type) => setPolicyType(type)}
      />

      {/* Interactive Modals */}
      <AboutModal open={aboutOpen} onOpenChange={setAboutOpen} />
      <FeedbackModal open={feedbackOpen} onOpenChange={setFeedbackOpen} />
      <PolicyModal
        type={policyType}
        open={policyType !== null}
        onOpenChange={(open) => {
          if (!open) setPolicyType(null);
        }}
      />
    </div>
  );
};

export default Home;

