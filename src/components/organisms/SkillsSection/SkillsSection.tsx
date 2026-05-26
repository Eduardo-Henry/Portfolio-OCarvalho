import React from 'react';
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
    title: 'Sou tudo o que sua empresa precisa e até um pouco mais.',
    description: 'Sou tudo o que sua empresa precisa e até um pouco mais.',
    image: MyPhotoImg,
  },
  {
    id: 2,
    number: '02',
    title: 'Sou tudo o que sua empresa precisa e até um pouco mais.',
    description: 'Sou tudo o que sua empresa precisa e até um pouco mais.',
    image: MyPhotoImg,
  },
  {
    id: 3,
    number: '03',
    title: 'Sou tudo o que sua empresa precisa e até um pouco mais.',
    description: 'Sou tudo o que sua empresa precisa e até um pouco mais.',
    image: MyPhotoImg,
  },
];

export const SkillsSection: React.FC = () => {
  return (
    <section className="skills-section" id="skills">
      <div className="skills-container">
        {/* Header */}
        <div className="skills-header">
          <h2 className="skills-title">
            ALL SKILLS<span className="skills-mark">®</span>
          </h2>
          <div className="skills-counter">+354 HOURS OF STUDYING</div>
        </div>

        {/* Skills Grid */}
        <div className="skills-grid">
          {skills.map((skill) => (
            <div key={skill.id} className="skill-item">
              <div className="skill-number">{skill.number}</div>
              <div className="skill-content">
                <h3 className="skill-title">{skill.title}</h3>
                <p className="skill-description">{skill.description}</p>
              </div>
              {skill.image && (
                <div className="skill-image">
                  <img src={skill.image} alt={skill.title} />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
