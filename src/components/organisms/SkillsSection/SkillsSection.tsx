import React, { useEffect, useRef } from 'react';
import './SkillsSection.css';
import MyPhotoImg from '../../../assets/images/MyPhoto.png';

interface Skill {
  id: number;
  number: string;
  title: string;
  description: string;
  image?: string;
}

const skills: Skill[] = [
  {
    id: 1,
    number: '01',
    title: 'User Research & Strategy',
    description: 'Turning user insights and business goals into actionable product strategies through data-driven decisions.',
    image: MyPhotoImg,
  },
  {
    id: 2,
    number: '02',
    title: 'Interaction & Wireframing',
    description: ' Designing seamless user journeys, information architecture, and low-fidelity prototypes focused on usability.',
    image: MyPhotoImg,
  },
  {
    id: 3,
    number: '03',
    title: ' Visual Design & Systems',
    description: 'Crafting high-fidelity interfaces with scalable, component-driven design systems for web and mobile apps.',
    image: MyPhotoImg,
  },

   {
    id: 4,
    number: '04',
    title: 'Usability Testing & Iteration',
    description: 'Validating solutions with real users to uncover friction, optimize conversion rates, and refine the product.',
    image: MyPhotoImg,
  },
];

export const SkillsSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const items = container.querySelectorAll('.skill-item');
    
    // Cria um observador para detectar exatamente quando o card gruda no topo
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // Se o elemento sumir um pouquinho acima do topo calculado, significa que grudou
          const isSticky = entry.boundingClientRect.top <= 45; 
          if (isSticky && entry.isIntersecting) {
            entry.target.classList.add('is-sticky');
          } else if (!entry.isIntersecting && entry.boundingClientRect.top > 0) {
            entry.target.classList.remove('is-sticky');
          }
        });
      },
      {
        root: null,
        // Define a margem de disparo alinhada com o 'top' do CSS
        rootMargin: '-41px 0px 0px 0px',
        threshold: [1],
      }
    );

    items.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, []);

  return (
    <section className="skills-section" id="skills">
      <div className="skills-container" ref={containerRef}>
        
        {/* Header */}
        <div className="skills-header">
          <h2 className="skills-title">
            My Process<span className="skills-mark">®</span>
          </h2>
          <div className="skills-counter">
            +354<br />HOURS OF<br />SHARPENING
          </div>
        </div>

        {/* Skills Grid */}
        <div className="skills-grid">
          {skills.map((skill, index) => (
            <div 
              key={skill.id} 
              className="skill-item"
              style={{ '--index': index } as React.CSSProperties}
            >
              <div className="skill-number">{skill.number}</div>
              <div className="skill-content">
                <h3 className="skill-title-item">{skill.title}</h3>
                <p className="skill-description">{skill.description}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
