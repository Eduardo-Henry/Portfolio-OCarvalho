import React from 'react';
import { useTranslation } from 'react-i18next';
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
  const { t } = useTranslation();

  return (
    <MainLayout>
      
      {/* 1. PALCO DO PARALLAX SUPERIOR (Hero + About) */}
      <div style={{ position: 'relative', width: '100%', zIndex: 2 }}>
        <HeroSection
          id="hero"
          title={t('hero.title')}
          description={t('hero.description')}
          ctaText={t('hero.cta')}
        />
        <AboutSection
          id="about"
          title={t('about.title')}
          description={t('about.description')}
          ctaText={t('about.cta')}
        />
      </div>

      {/* 2. MEIO DO SITE (Passa por cima do Footer) */}
      <div style={{ 
        position: 'relative', 
        zIndex: 3, 
        width: '100%', 
        boxShadow: '0 30px 60px rgba(0, 0, 0, 0.2)' 
      }}>
        <CaseStudiesSection id="case-studies" />
        <SkillsSection id="all-skills" />
        <ClientsSection id="clients" />
        <ContactSection id="contact" />
      </div>

      {/* 3. PALCO DO REVEAL INFERIOR (Footer Fixo) */}
      <FooterSection />

    </MainLayout>
  );
};