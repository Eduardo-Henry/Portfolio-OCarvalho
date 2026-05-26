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
      <HeroSection
        title="Designing intuitive digital experiences where clarity meets purpose."
        description="Sou tudo o que sua empresa precisa e até um pouco mais."
        ctaText="GET IN TOUCH"
      />
      <AboutSection
        title="ABOUT ME®"
        description="Designing intuitive digital experiences where clarity meets purpose. I am a UX/UI Designer focused on usability, systems, and human-centered design"
        ctaText="GET IN TOUCH"
      />
      <CaseStudiesSection />
      <SkillsSection />
      <ClientsSection />
      <ContactSection />
      <FooterSection />
    </MainLayout>
  );
};
