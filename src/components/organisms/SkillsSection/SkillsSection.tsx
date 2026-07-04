import React, { useEffect, useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import './SkillsSection.css';

interface Skill {
  id: number;
  number: string;
}

interface SkillsSectionProps {
  id?: string;
}

const skills: Skill[] = [
  { id: 1, number: '01' },
  { id: 2, number: '02' },
  { id: 3, number: '03' },
  { id: 4, number: '04' },
];

export const SkillsSection: React.FC<SkillsSectionProps> = ({ id }) => {
  const { t } = useTranslation();
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
    <section className="skills-section" id={id} ref={sectionRef}>
      <div className="skills-container">
        
        <div className="skills-header">
          <h2 className="skills-title">
            {t('skills.title')}
          </h2>
          
          <div className="skills-counter">
            +{count}<br />{t('skills.counterLine1')}<br />{t('skills.counterLine2')}
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
                  {t(`skills.items.${skill.id}.title`)}
                </h3>
                <p className="skill-description">
                  {t(`skills.items.${skill.id}.description`)}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};