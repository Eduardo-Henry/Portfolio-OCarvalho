import React, { useState } from 'react';
import './CaseStudiesSection.css';
import { NavPill } from '../../molecules';
import TIHelpImg from '../../../assets/images/TIHelp.png';
import SolarPanelImg from '../../../assets/images/SolarPanel.png';
import DNJeansImg from '../../../assets/images/DNJeans.png';
/* NOVAS IMPORTAÇÕES DE IMAGENS */
import RealStateImg from '../../../assets/images/RealState.png';
import YatchImg from '../../../assets/images/Yatch.jpeg';

interface CaseStudy {
  id: string;
  image: string;
}

interface CaseStudiesSectionProps {
  caseStudies?: CaseStudy[];
}

/* ARRAY ATUALIZADO COM 5 PROJETOS APENAS COM AS IMAGENS */
const defaultCaseStudies: CaseStudy[] = [
  {
    id: '1',
    image: TIHelpImg,
  },
  {
    id: '2',
    image: SolarPanelImg, /* Cover branco removido daqui */
  },
  {
    id: '3',
    image: DNJeansImg,
  },
  {
    id: '4',
    image: RealStateImg, /* Novo Projeto 4 */
  },
  {
    id: '5',
    image: YatchImg,     /* Novo Projeto 5 */
  },
];

export const CaseStudiesSection: React.FC<CaseStudiesSectionProps> = ({
  caseStudies = defaultCaseStudies,
}) => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', label: 'UI DESIGN' },
    { id: 'web', label: 'VIDEOS EDIT' },
    { id: 'mobile', label: 'DESIGN SOCIAL MEDIA' },
  ];

  return (
    <section className="case-studies-section" id="works">
      <div className="case-studies-container">
        {/* Header da Seção */}
        <div className="case-studies-header">
          <div className="case-studies-title-wrapper">
            <h2 className="case-studies-title">CASE STUDIES<span className="case-studies-mark">®</span></h2>
          </div>
          <div className="case-studies-counter">+55 PROJECTS</div>
        </div>

        {/* NavPill Filter */}
        <div className="case-studies-filter">
          <NavPill
            items={categories}
            onSelect={setSelectedCategory}
          />
        </div>

        {/* Grid de Projetos contendo apenas os cards com as imagens de fundo */}
        <div className="case-studies-grid">
          {caseStudies.map((caseStudy) => (
            <div
              key={caseStudy.id}
              className="case-study-card"
              id={`project-${caseStudy.id}`}
              style={{
                backgroundImage: `url(${caseStudy.image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            >
              {/* Todos os textos, overlays, tags e botões foram totalmente removidos daqui */}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
