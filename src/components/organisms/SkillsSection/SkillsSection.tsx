import React, { useEffect, useState, useRef } from 'react';
import './SkillsSection.css';

interface Skill {
  id: number;
  number: string;
  title: string;
}

const skills: Skill[] = [
  {
    id: 1,
    number: '01',
    title: 'UX Research & Strategy',
   
  },
  {
    id: 2,
    number: '02',
    title: 'UI Design',
    
  },
  {
    id: 3,
    number: '03',
    title: 'Architecture & Wireframing',
  },
  {
    id: 4,
    number: '04',
    title: 'User Testing',
  },
];

export const SkillsSection: React.FC = () => {
  const [count, setCount] = useState<number>(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const targetCount = 354; // Valor final da contagem

  useEffect(() => {
    const currentSection = sectionRef.current;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          let start = 0;
          const duration = 1500; // Tempo total da animação em milissegundos (1.5s)
          const startTime = performance.now();

          const animate = (currentTime: number) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);

            // Função de easing para suavizar a chegada no número final
            const easeOutQuad = (t: number) => t * (2 - t);
            const currentCount = Math.floor(start + easeOutQuad(progress) * (targetCount - start));

            setCount(currentCount);

            if (progress < 1) {
              requestAnimationFrame(animate);
            }
          };

          requestAnimationFrame(animate);
          // Cancela o observer para rodar a animação apenas uma vez
          if (currentSection) observer.unobserve(currentSection);
        }
      },
      {
        threshold: 0.2, // Dispara quando 20% da seção estiver visível na tela
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
    <section className="skills-section" id="skills" ref={sectionRef}>
      <div className="skills-container">
        
        {/* Cabeçalho */}
        <div className="skills-header">
          <h2 className="skills-title">
            ALL SKILLS<span className="skills-mark">®</span>
          </h2>
          
          <div className="skills-counter">
            +{count}<br />HOURS OF<br />STUDYING
          </div>

          <nav className="skills-nav-links">
            <span className="nav-item">HOME</span>
            <span className="nav-item">ABOUT ME</span>
            <span className="nav-item active">SKILLS</span>
            <span className="nav-item">WORKS</span>
          </nav>
        </div>

        {/* Lista de Cards Stack */}
        <div className="skills-grid">
          {skills.map((skill, index) => (
            <div 
              key={skill.id} 
              className="skill-item"
              style={{ '--stack-index': index } as React.CSSProperties}
            >
              <div className="skill-number">{skill.number}</div>
              <div className="skill-content">
                <span className="skill-title-item">
                  {skill.title} {skill.description}
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
