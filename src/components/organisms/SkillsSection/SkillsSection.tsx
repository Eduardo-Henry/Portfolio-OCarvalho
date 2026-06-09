import React, { useEffect, useState, useRef } from 'react';
import './SkillsSection.css';

interface Skill {
  id: number;
  number: string;
  title: string;
  description: string; 
}

// 1. Adicionada interface de Props com id opcional
interface SkillsSectionProps {
  id?: string;
}

const skills: Skill[] = [
  {
    id: 1,
    number: '01',
    title: 'UX Research & Strategy',
    description: 'Compreensão do comportamento do usuário, dores e objetivos de negócio para construir bases sólidas.',
  },
  {
    id: 2,
    number: '02',
    title: 'UI Design',
    description: 'Criação de interfaces visuais impactantes, acessíveis e de alta fidelidade alinhadas à marca.',
  },
  {
    id: 3,
    number: '03',
    title: 'Architecture & Wireframing',
    description: 'Estruturação de fluxos intuitivos, arquitetura de informação e layouts de baixa fidelidade.',
  },
  {
    id: 4,
    number: '04',
    title: 'User Testing',
    description: 'Validação de conceitos com usuários reais para coletar insights, iterar e refinar o produto final.',
  },
];

// 2. Componente agora recebe SkillsSectionProps
export const SkillsSection: React.FC<SkillsSectionProps> = ({ id }) => {
  const [count, setCount] = useState<number>(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const targetCount = 354;

  useEffect(() => {
    const currentSection = sectionRef.current;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          let start = 0;
          const duration = 1500;
          const startTime = performance.now();

          const animate = (currentTime: number) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);

            const easeOutQuad = (t: number) => t * (2 - t);
            const currentCount = Math.floor(start + easeOutQuad(progress) * (targetCount - start));

            setCount(currentCount);

            if (progress < 1) {
              requestAnimationFrame(animate);
            }
          };

          requestAnimationFrame(animate);
          if (currentSection) observer.unobserve(currentSection);
        }
      },
      {
        threshold: 0.2,
      }
    );

    if (currentSection) {
      observer.observe(currentSection);
    }

    return () => {
      if (currentSection) observer.unobserve(currentSection);
    };
  }, []);

  return (
    // 3. id={id} substitui o id="skills" fixo, recebendo o valor via prop
    <section className="skills-section" id={id} ref={sectionRef}>
      <div className="skills-container">
        
        <div className="skills-header">
          <h2 className="skills-title">
            MEU PROCESSO<span className="skills-mark">®</span>
          </h2>
          
          <div className="skills-counter">
            +{count}<br />HORAS<br />DE ESTUDO
          </div>
        </div>

        <div className="skills-grid">
          {skills.map((skill, index) => (
            <div 
              key={skill.id} 
              className="skill-item"
              style={{ '--stack-index': index } as React.CSSProperties}
            >
              <div className="skill-number">{skill.number}</div>
              <div className="skill-content">
                <h3 className="skill-title-item">
                  {skill.title}
                </h3>
                <p className="skill-description-item">
                  {skill.description}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};