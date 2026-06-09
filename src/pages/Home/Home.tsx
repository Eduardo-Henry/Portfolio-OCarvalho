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
          title="Desenvolvo produtos digitais que impulsionam o crescimento de empresas e encantam os usuários."
          description="Combino pesquisa de usuários, design visual e estratégia para transformar problemas complexos em soluções digitais perfeitas."
          ctaText="CONVERSAR"
        />
        <AboutSection
          title="SOBRE MIM®"
          description="Designer de UX com pensamento sistêmico e visão de front-end. Especialista em Design Systems escaláveis (Design Atômico) com estrutura avançada no Figma focada em handoff técnico. Otimizo fluxos de produto através de AI-Driven Design, utilizando inteligência artificial para acelerar a síntese de pesquisas com usuários, ideação e prototipagem rápida. Desenvolvo produtos interativos, de alta conversão e estritamente acessíveis (WCAG/ARIA)."
          ctaText="VER PROJETOS"
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
