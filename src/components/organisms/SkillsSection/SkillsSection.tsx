import React from 'react';
import './SkillsSection.css';

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
    description: 'Turning user insights and business goals into actionable product strategies.',
    image: '',
  },
  {
    id: 2,
    number: '02',
    title: 'Interaction & Wireframing',
    description: 'Designing seamless user journeys and low-fidelity prototypes.',
    image: '',
  },
  {
    id: 3,
    number: '03',
    title: ' Visual Design & Systems',
    description: 'Crafting scalable, component-driven design systems.',
    image: '',
  },

   {
    id: 4,
    number: '04',
    title: 'Usability Testing & Iteration',
    description: 'Validating solutions with real users to optimize the product.',
    image: '',
  },
];

export const SkillsSection: React.FC = () => {
  return (
    <section className="skills-section" id="skills">
      <div className="skills-container">
        
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
          {skills.map((skill) => (
            <div 
              key={skill.id} 
              className="skill-item"
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
