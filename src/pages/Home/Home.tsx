import React from 'react';
import { MainLayout } from '../../components/templates';
import {
  HeroSection,
  AboutSection,
  CaseStudiesSection,
  SkillsSection,
  ClientsSection,
  ContactSection,
  FooterSection,
} from '../../components/organisms';

export const Home: React.FC = () => {
  return (
    <MainLayout>
      
      {/* 1. PALCO DO PARALLAX SUPERIOR (Hero + About) */}
      <div style={{ position: 'relative', width: '100%', zIndex: 2 }}>
        <HeroSection
          title="Designing digital products that scale businesses and delight users."
          description="I combine user research, visual design, and strategy to turn complex problems into seamless digital solutions."
          ctaText="GET IN TOUCH"
        />
        <AboutSection
          title="ABOUT ME®"
          description="Product Designer combining systematic thinking with a strong understanding of front-end constraints. I specialize in building scalable Design Systems using Brad Frost’s Atomic Design methodology, seamlessly bridging the gap between Figma structure (components, variables, advanced auto-layout) and developer handoff. Driven by AI-assisted workflows, I leverage generative and productivity tools to accelerate user research, ideation, and rapid prototyping. I design intuitive, interactive digital products that are inherently built for accessibility (WCAG/ARIA) and modern business scale."
          ctaText="See My Work"
        />
      </div>

      {/* 2. MEIO DO SITE (Passa por cima do Footer) */}
      {/* Adicionamos uma sombra inferior para o efeito de "folha" cobrindo o footer */}
      <div style={{ 
        position: 'relative', 
        zIndex: 3, 
        width: '100%', 
        boxShadow: '0 30px 60px rgba(0, 0, 0, 0.2)' 
      }}>
        <CaseStudiesSection />
        <SkillsSection />
        <ClientsSection />
        <ContactSection />
      </div>

      {/* 3. PALCO DO REVEAL INFERIOR (Footer Fixo) */}
      <FooterSection />

    </MainLayout>
  );
};
