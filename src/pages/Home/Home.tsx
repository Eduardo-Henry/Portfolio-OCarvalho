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
          title="Desenvolvo produtos digitais que impulsionam o crescimento dos negócios e encantam os usuários."
          description="Combino pesquisa de usuários, design visual e estratégia para transformar problemas complexos em soluções digitais perfeitas."
          ctaText="CONVERSAR"
        />
        <AboutSection
          title="SOBRE MIM®"
          description="Atuo como Designer UX, que combina pensamento sistêmico com um profundo conhecimento das limitações do front-end. Sou especialista na construção de Sistemas de Design escaláveis ​​utilizando a metodologia de Design Atômico de Brad Frost, integrando perfeitamente a estrutura do Figma (componentes, variáveis, layout automático avançado) ao handoff para desenvolvedores. Para  por fluxos de trabalho por IA, utilizo ferramentas generativas e de produtividade para acelerar a pesquisa de usuários, a ideação e a prototipagem rápida. Desenvolvo produtos digitais intuitivos e interativos, inerentemente acessíveis (WCAG/ARIA) e escaláveis ​​para negócios modernos."
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
