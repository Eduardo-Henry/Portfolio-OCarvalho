import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { MainLayout } from '../../components/templates';
import './CaseStudyPage.css';
import TIHelpImg from '@/assets/images/TIHelp.png';
import KaloBurnImg from '@/assets/images/KaloBurn.png';
import DNJeansImg from '@/assets/images/DNJeans.png';
import RealStateImg from '@/assets/images/RealState.png';
import YatchImg from '@/assets/images/Yatch.jpeg';
import SolarPanelImg from '@/assets/images/SolarPanel.png';

interface Persona {
  name: string;
  age?: number;
  role?: string;
  pain: string;
  goal?: string;
}

interface CSDMatrix {
  certainties: string[];
  suppositions: string[];
  doubts: string[];
}

interface CaseStudyContent {
  title: string;
  overview: string;
  challenge: string;
  process: string;
  myRole: string;
  csdMatrix: CSDMatrix;
  userFlow: string;
  personas: Persona[];
  solution: string;
  finalProject: string;
}

interface CaseStudyMeta {
  type: 'proposal' | 'real' | 'fictional';
  image: string;
  prototypeUrl: string;
}

// Apenas o que NÃO é texto traduzível fica no código.
// Todo o conteúdo (títulos, textos, personas, CSD matrix) vem do i18n
// em caseStudiesData.<id> dentro de pt.json / en.json.
const caseStudiesMeta: { [key: string]: CaseStudyMeta } = {
  '1': {
    type: 'real',
    image: TIHelpImg,
    prototypeUrl: 'https://www.figma.com/proto/sXLh6cXRhiGBx6l1Ot8war/',
  },
  '2': {
    type: 'proposal',
    image: KaloBurnImg,
    prototypeUrl: 'https://www.figma.com/proto/sXLh6cXRhiGBx6l1Ot8war/',
  },
  '3': {
    type: 'real',
    image: DNJeansImg,
    prototypeUrl: 'https://www.figma.com/proto/sXLh6cXRhiGBx6l1Ot8war/',
  },
  '4': {
    type: 'proposal',
    image: RealStateImg,
    prototypeUrl: 'https://www.figma.com/proto/sXLh6cXRhiGBx6l1Ot8war/',
  },
  '5': {
    type: 'fictional',
    image: YatchImg,
    prototypeUrl: 'https://www.figma.com/proto/sXLh6cXRhiGBx6l1Ot8war/',
  },
  '6': {
    type: 'fictional',
    image: SolarPanelImg,
    prototypeUrl: 'https://www.figma.com/proto/sXLh6cXRhiGBx6l1Ot8war/',
  },
};

export const CaseStudyPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { t } = useTranslation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  const meta = id ? caseStudiesMeta[id] : undefined;

  // Conteúdo traduzido vindo do i18n (returnObjects para pegar arrays/objetos)
  const content = id
    ? (t(`caseStudiesData.${id}`, { returnObjects: true }) as CaseStudyContent)
    : undefined;

  const typeConfig = {
    proposal: { label: t('caseStudyLabels.types.proposal'), color: '#0066ff' },
    real: { label: t('caseStudyLabels.types.real'), color: '#00a86b' },
    fictional: { label: t('caseStudyLabels.types.fictional'), color: '#9b59b6' },
  };

  const isValidContent =
    meta && content && typeof content === 'object' && 'title' in content;

  if (!isValidContent || !meta || !content) {
    return (
      <MainLayout>
        <div className="case-study-page case-study-page--not-found">
          <p>{t('caseStudyLabels.notFound')}</p>
          <button onClick={() => navigate('/')} className="back-button">
            <span className="back-button__circle">
              <svg viewBox="0 0 24 24" fill="none" width="14" height="14" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="17" y1="7" x2="7" y2="17" />
                <polyline points="17 17 7 17 7 7" />
              </svg>
            </span>
            {t('caseStudyLabels.back')}
          </button>
        </div>
      </MainLayout>
    );
  }

  const type = typeConfig[meta.type];

  return (
    <MainLayout>
      <div className="case-study-page">
        <div className="case-study-topbar">
          <button onClick={() => navigate(-1)} className="back-button">
            <span className="back-button__circle">
              <svg viewBox="0 0 24 24" fill="none" width="14" height="14" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="17" y1="7" x2="7" y2="17" />
                <polyline points="17 17 7 17 7 7" />
              </svg>
            </span>
            {t('caseStudyLabels.back')}
          </button>
        </div>

        <header className="case-study-hero">
          <span
            className="case-study-type-tag"
            style={{ borderColor: type.color, color: type.color }}
          >
            {type.label}
          </span>
          <h1 className="case-study-title">{content.title}</h1>
        </header>

        <main className="case-study-content">
          <section className="cs-section">
            <span className="cs-section__label">{t('caseStudyLabels.sections.overview')}</span>
            <p className="cs-section__text">{content.overview}</p>
          </section>

          <section className="cs-section">
            <span className="cs-section__label">{t('caseStudyLabels.sections.challenge')}</span>
            <p className="cs-section__text">{content.challenge}</p>
          </section>

          <section className="cs-section">
            <span className="cs-section__label">{t('caseStudyLabels.sections.process')}</span>
            <p className="cs-section__text">{content.process}</p>
          </section>

          <section className="cs-section">
            <span className="cs-section__label">{t('caseStudyLabels.sections.myRole')}</span>
            <p className="cs-section__text">{content.myRole}</p>
          </section>

          <section className="cs-section">
            <span className="cs-section__label">{t('caseStudyLabels.sections.csdMatrix')}</span>
            <div className="csd-grid">
              <div className="csd-column csd-column--certainties">
                <h3 className="csd-column__title">{t('caseStudyLabels.csd.certainties')}</h3>
                <ul className="csd-column__list">
                  {content.csdMatrix.certainties.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>
              <div className="csd-column csd-column--suppositions">
                <h3 className="csd-column__title">{t('caseStudyLabels.csd.suppositions')}</h3>
                <ul className="csd-column__list">
                  {content.csdMatrix.suppositions.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>
              <div className="csd-column csd-column--doubts">
                <h3 className="csd-column__title">{t('caseStudyLabels.csd.doubts')}</h3>
                <ul className="csd-column__list">
                  {content.csdMatrix.doubts.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          <section className="cs-section">
            <span className="cs-section__label">{t('caseStudyLabels.sections.userFlow')}</span>
            <p className="cs-section__text">{content.userFlow}</p>
          </section>

          <section className="cs-section">
            <span className="cs-section__label">{t('caseStudyLabels.sections.personas')}</span>
            <div className="personas-grid">
              {content.personas.map((persona, index) => (
                <div key={index} className="persona-card">
                  <div className="persona-card__header">
                    <div className="persona-card__avatar">{persona.name.charAt(0)}</div>
                    <div>
                      <h3 className="persona-card__name">{persona.name}</h3>
                      {persona.age && persona.role && (
                        <p className="persona-card__meta">
                          {persona.age} {t('caseStudyLabels.persona.ageSuffix', { defaultValue: 'anos' })} · {persona.role}
                        </p>
                      )}
                      {!persona.age && persona.role && (
                        <p className="persona-card__meta">{persona.role}</p>
                      )}
                    </div>
                  </div>
                  <div className="persona-card__body">
                    <p className="persona-card__label">{t('caseStudyLabels.persona.painPoint')}</p>
                    <p className="persona-card__text">{persona.pain}</p>
                    {persona.goal && (
                      <>
                        <p className="persona-card__label">{t('caseStudyLabels.persona.goal')}</p>
                        <p className="persona-card__text">{persona.goal}</p>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="cs-section">
            <span className="cs-section__label">{t('caseStudyLabels.sections.solution')}</span>
            <p className="cs-section__text">{content.solution}</p>
          </section>

          <section className="cs-section">
            <span className="cs-section__label">{t('caseStudyLabels.sections.finalProject')}</span>
            <p className="cs-section__text">{content.finalProject}</p>
            <div className="project-image-wrapper">
              <img
                src={meta.image}
                alt={`${content.title} final design`}
                className="project-final-image"
              />
              <div className="project-image-overlay">
                <button
                  className="btn-watch"
                  onClick={() => window.open(meta.prototypeUrl, '_blank')}
                >
                  <span className="play-icon" />
                  {t('caseStudies.watchPrototype')}
                </button>
              </div>
            </div>
          </section>
        </main>

        <footer className="case-study-footer">
          <button className="btn-back-projects" onClick={() => navigate('/')}>
            {t('caseStudyLabels.seeMoreProjects')}
            <span className="btn-back-projects__circle">
              <svg viewBox="0 0 24 24" fill="none" width="14" height="14" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="7" y1="17" x2="17" y2="7" />
                <polyline points="7 7 17 7 17 17" />
              </svg>
            </span>
          </button>
        </footer>
      </div>
    </MainLayout>
  );
};

export default CaseStudyPage;