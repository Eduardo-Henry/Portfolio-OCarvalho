import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
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
  pain?: string;
  goal?: string;
}

interface SprintStage {
  stage: string;
  description: string;
}

interface CaseStudyContent {
  title: string;
  overview?: string;
  challenge?: string;
  process?: string;
  myRole?: string;
  userFlow?: string;
  solution?: string;
  finalProject?: string;
  designSprint?: SprintStage[];
  csdMatrix?: Record<string, unknown>;
  personas?: Persona[];
  userStories?: Record<string, unknown>[];
  problemDefinitions?: Record<string, unknown>[];
  craftNotes?: Record<string, unknown>;
  [key: string]: unknown;
}

interface CaseStudyMeta {
  type: 'proposal' | 'real' | 'fictional';
  image: string;
  prototypeUrl: string;
}

const caseStudiesMeta: Record<string, CaseStudyMeta> = {
  '1': { type: 'real', image: TIHelpImg, prototypeUrl: 'https://www.figma.com/proto/fw2bexpovuRBEjPGqDwRW3/PIM-3%C2%B0-SEM?node-id=1158-457&p=f&t=pv64Gtc7MDHmRbCO-0&scaling=scale-down&content-scaling=fixed&page-id=0%3A1&starting-point-node-id=1158%3A457' },
  '2': { type: 'proposal', image: KaloBurnImg, prototypeUrl: 'https://www.figma.com/proto/nfQdsEFYEm9pVEjSjPSdcz/KaloBurn?node-id=23-42&t=Wl3lXOW4CCxwFhNV-0&scaling=min-zoom&content-scaling=fixed&page-id=1%3A3&starting-point-node-id=40%3A70S' },
  '3': { type: 'real', image: DNJeansImg, prototypeUrl: 'https://www.figma.com/proto/uPJ99JDTyjMPamkJnS9FTu/DN-Jeans---Dalton?node-id=0-1&p=f&t=XAZDi8fCZ9YUFXKs-0&scaling=min-zoom&content-scaling=fixed&page-id=0%3A1&starting-point-node-id=16%3A146' },
  '4': { type: 'proposal', image: RealStateImg, prototypeUrl: 'https://www.figma.com/proto/pr2HKsIP3kV7GUYN7l2vZy' },
  '5': { type: 'fictional', image: YatchImg, prototypeUrl: 'https://www.figma.com/proto/jrsEdX4WbU27tltU5kwivm' },
  '6': { type: 'fictional', image: SolarPanelImg, prototypeUrl: 'https://www.figma.com/proto/sXLh6cXRhiGBx6l1Ot8war' },
};

const asText = (value: unknown): string | undefined =>
  typeof value === 'string' && value.trim() ? value : undefined;

const asStringArray = (value: unknown): string[] =>
  Array.isArray(value) ? value.filter((item): item is string => typeof item === 'string') : [];

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null && !Array.isArray(value);

const hasData = (value: unknown): boolean => {
  if (typeof value === 'string') return value.trim().length > 0;
  if (Array.isArray(value)) return value.length > 0;
  if (isRecord(value)) return Object.keys(value).length > 0;
  return value !== undefined && value !== null;
};

const formatKey = (key: string): string =>
  key.replace(/([A-Z])/g, ' $1').replace(/^./, (letter) => letter.toUpperCase());

export const CaseStudyPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const meta = id ? caseStudiesMeta[id] : undefined;
  const content = id
    ? (t(`caseStudiesData.${id}`, { returnObjects: true }) as CaseStudyContent)
    : undefined;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  const labels = (key: string, fallback = formatKey(key)) =>
    t(`caseStudyLabels.sections.${key}`, { defaultValue: fallback });
  const typeLabels = {
    real: t('caseStudyLabels.types.real'),
    proposal: t('caseStudyLabels.types.proposal'),
    fictional: t('caseStudyLabels.types.fictional'),
  };

  const placeholder = (text: string) => (
    <div className="cs-process-placeholder">
      <span className="cs-process-placeholder__badge">
        {t('caseStudyLabels.placeholder.badge', { defaultValue: 'A PREENCHER' })}
      </span>
      <p>{text}</p>
    </div>
  );

  const renderValue = (value: unknown): React.ReactNode => {
    if (typeof value === 'string') return <p className="cs-process-value">{value}</p>;
    if (Array.isArray(value)) {
      return value.length ? (
        <ul className="cs-process-list">
          {value.map((item, index) => <li key={index}>{renderValue(item)}</li>)}
        </ul>
      ) : null;
    }
    if (isRecord(value)) {
      return (
        <div className="cs-process-fields">
          {Object.entries(value).map(([key, item]) => (
            <div className="cs-process-field" key={key}>
              <strong>{formatKey(key)}</strong>
              {renderValue(item)}
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  const processSection = (key: string, title: string, value: unknown, emptyText: string) => (
    <section className={`cs-section cs-process-section${hasData(value) ? '' : ' cs-process-section--empty'}`} key={key}>
      <span className="cs-section__label">{labels(key, title)}</span>
      {hasData(value) ? renderValue(value) : placeholder(emptyText)}
    </section>
  );

  const renderPaperSketches = () => {
    const data = isRecord(content?.paperSketches) ? content.paperSketches : undefined;
    const images = Array.isArray(data?.images)
      ? data.images.filter((item): item is string => typeof item === 'string')
      : [];
    const populated = images.length > 0 || Boolean(asText(data?.description)) || Boolean(asText(data?.caption));
    return (
      <section className={`cs-section cs-process-section${populated ? '' : ' cs-process-section--empty'}`}>
        <span className="cs-section__label">{labels('paperSketches', 'Wireframes de papel')}</span>
        {populated ? (
          <div className="cs-process-fields">
            {images.length > 0 && <div className="cs-gallery">{images.map((image, index) => <img className="cs-gallery__image" src={image} alt={`Wireframe de papel ${index + 1}`} key={image} />)}</div>}
            {renderValue(data?.caption)}
            {renderValue(data?.description)}
            {renderValue(data?.keyDecisions)}
          </div>
        ) : placeholder('Adicione aqui as fotos dos wireframes de papel.')}
      </section>
    );
  };

  if (!meta || !content || typeof content !== 'object' || !asText(content.title)) {
    return (
      <MainLayout>
        <div className="case-study-page case-study-page--not-found">
          <p>{t('caseStudyLabels.notFound')}</p>
          <button onClick={() => navigate('/')} className="back-button">
            <span className="back-button__circle" aria-hidden="true">↩</span>
            {t('caseStudyLabels.back')}
          </button>
        </div>
      </MainLayout>
    );
  }

  const typeColors = { real: '#00a86b', proposal: '#0066ff', fictional: '#9b59b6' };
  const typeColor = typeColors[meta.type];

  return (
    <MainLayout>
      <div className="case-study-page">
        <div className="case-study-topbar">
          <button onClick={() => navigate(-1)} className="back-button">
            <span className="back-button__circle" aria-hidden="true">↩</span>
            {t('caseStudyLabels.back')}
          </button>
        </div>

        <header className="case-study-hero">
          <span className="case-study-type-tag" style={{ borderColor: typeColor, color: typeColor }}>
            {typeLabels[meta.type]}
          </span>
          <h1 className="case-study-title">{content.title}</h1>
        </header>

        <main className="case-study-content">
          {(['overview', 'challenge', 'myRole'] as const).map((key) => {
            const value = asText(content[key]);
            return value ? (
              <section className="cs-section" key={key}>
                <span className="cs-section__label">{labels(key)}</span>
                <p className="cs-section__text">{value}</p>
              </section>
            ) : null;
          })}

          <section className="cs-section cs-process-overview">
            <span className="cs-section__label">{t('caseStudyLabels.processTitle', { defaultValue: 'Processo UX' })}</span>
            <h2 className="cs-process-overview__title">{t('caseStudyLabels.processSubtitle', { defaultValue: 'Da descoberta à entrega' })}</h2>
            <p className="cs-process-overview__lead">{t('caseStudyLabels.processDescription', { defaultValue: 'Cada etapa do processo aparece abaixo. Conteúdos ainda não documentados permanecem visíveis como pontos de preenchimento.' })}</p>
          </section>

          {processSection('research', 'Pesquisa UX', content.research, 'Adicione métodos, participantes, contexto e findings da pesquisa.')}
          {processSection('interviews', 'Entrevistas', content.interviews, 'Adicione participantes, roteiro, perguntas e principais descobertas.')}
          {processSection('researchSynthesis', 'Síntese da pesquisa', content.researchSynthesis, 'Adicione a organização dos dados, padrões, temas, insights e Affinity Map.')}
          {processSection('userJourney', 'User Journey', content.userJourney, 'Adicione as etapas, ações, pensamentos, sentimentos, dores e oportunidades.')}
          {processSection('problemStatement', 'Problem Statement', content.problemStatement, 'Adicione aqui a Problem Statement do projeto.')}
          {processSection('howMightWe', 'How Might We', content.howMightWe, 'Adicione aqui a pergunta How Might We do projeto.')}
          {processSection('ideation', 'Ideação', content.ideation, 'Adicione técnicas, ideias, alternativas e priorização.')}
          {processSection('informationArchitecture', 'Arquitetura da Informação', content.informationArchitecture, 'Adicione estrutura, hierarquia, organização do conteúdo e sitemap.')}
          {processSection('userFlowDetail', 'User Flow', content.userFlowDetail, 'Adicione o fluxo detalhado e suas decisões.')}
          {renderPaperSketches()}
          {processSection('wireframes', 'Wireframes digitais', content.wireframes, 'Adicione os wireframes digitais e as decisões relacionadas.')}
          {processSection('highFidelityDesign', 'Design de alta fidelidade', content.highFidelityDesign, 'Adicione telas, componentes, decisões visuais, estados e acessibilidade.')}
          {processSection('usabilityTesting', 'Teste de usabilidade', content.usabilityTesting, 'Adicione participantes, tarefas, observações, problemas e findings.')}
          {processSection('iterations', 'Iterações', content.iterations, 'Adicione as mudanças antes/depois e as decisões tomadas.')}
          {processSection('results', 'Resultados', content.results, 'Adicione os resultados existentes. Não inclua métricas sem evidência.')}
          {processSection('learnings', 'Aprendizados', content.learnings, 'Adicione os aprendizados do projeto.')}
          {processSection('nextSteps', 'Próximos passos', content.nextSteps, 'Adicione os próximos passos do projeto.')}
          {processSection('limitations', 'Limitações', content.limitations, 'Adicione as limitações conhecidas do projeto.')}

          {content.designSprint && content.designSprint.length > 0 && (
            <section className="cs-section">
              <span className="cs-section__label">{labels('designSprint')}</span>
              <div className="sprint-track">
                {content.designSprint.map((step, index) => (
                  <div key={`${step.stage}-${index}`} className="sprint-step">
                    <div className="sprint-step__number">{index + 1}</div>
                    <h3 className="sprint-step__stage">{step.stage}</h3>
                    <p className="sprint-step__text">{step.description}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {content.csdMatrix && (
            <section className="cs-section">
              <span className="cs-section__label">{labels('csdMatrix')}</span>
              <div className="csd-grid">
                {(['certainties', 'suppositions', 'doubts'] as const).map((key) => (
                  <div className={`csd-column csd-column--${key}`} key={key}>
                    <h3 className="csd-column__title">{t(`caseStudyLabels.csd.${key}`)}</h3>
                    <ul className="csd-column__list">
                      {asStringArray(content.csdMatrix?.[key]).map((item, index) => <li key={`${key}-${index}`}>{item}</li>)}
                    </ul>
                  </div>
                ))}
              </div>
            </section>
          )}

          {content.personas && content.personas.length > 0 && (
            <section className="cs-section">
              <span className="cs-section__label">{labels('personas')}</span>
              <div className="personas-grid">
                {content.personas.map((persona, index) => (
                  <article className="persona-card" key={`${persona.name}-${index}`}>
                    <div className="persona-card__header">
                      <div className="persona-card__avatar">{persona.name.charAt(0)}</div>
                      <div>
                        <h3 className="persona-card__name">{persona.name}</h3>
                        <p className="persona-card__meta">{persona.age ? `${persona.age} ${t('caseStudyLabels.persona.ageSuffix')}` : persona.role}</p>
                      </div>
                    </div>
                    <div className="persona-card__body">
                      {persona.pain && <><strong className="persona-card__label">{t('caseStudyLabels.persona.painPoint')}</strong><p className="persona-card__text">{persona.pain}</p></>}
                      {persona.goal && <><strong className="persona-card__label">{t('caseStudyLabels.persona.goal')}</strong><p className="persona-card__text">{persona.goal}</p></>}
                    </div>
                  </article>
                ))}
              </div>
            </section>
          )}

          {content.userStories && content.userStories.length > 0 && (
            <section className="cs-section">
              <span className="cs-section__label">{labels('userStories')}</span>
              <div className="stories-grid">
                {content.userStories.map((story, index) => <article className="story-card" key={index}><p className="story-card__text">{asText(story.story)}</p><p className="story-card__persona">{asText(story.persona)}</p></article>)}
              </div>
            </section>
          )}

          {content.problemDefinitions && content.problemDefinitions.length > 0 && (
            <section className="cs-section">
              <span className="cs-section__label">{labels('problemDefinitions')}</span>
              <div className="stories-grid">
                {content.problemDefinitions.map((problem, index) => <article className="story-card story-card--problem" key={index}><p className="story-card__text">{asText(problem.definition)}</p><p className="story-card__persona story-card__persona--problem">{asText(problem.persona)}</p></article>)}
              </div>
            </section>
          )}

          {content.solution && (
            <section className="cs-section">
              <span className="cs-section__label">{labels('solution', 'The Solution')}</span>
              <p className="cs-section__text">{content.solution}</p>
            </section>
          )}

          {content.craftNotes && (
            <section className="cs-section">
              <span className="cs-section__label">{labels('craftNotes')}</span>
              <div className="craft-grid">
                {Object.entries(content.craftNotes).map(([key, value]) => <article className="craft-card" key={key}><h3 className="craft-card__title">{t(`caseStudyLabels.craft.${key}`, { defaultValue: formatKey(key) })}</h3><p className="craft-card__text">{asText(value)}</p></article>)}
              </div>
            </section>
          )}

          <section className="cs-section">
            <span className="cs-section__label">{labels('finalProject')}</span>
            <div className="project-image-wrapper" onClick={() => window.open(meta.prototypeUrl, '_blank', 'noopener,noreferrer')} role="button" tabIndex={0}>
              <img className="project-final-image" src={meta.image} alt={content.title} />
              <div className="project-image-overlay"><button className="btn-watch" type="button"><span className="play-icon" />{t('caseStudies.watchPrototype')}</button></div>
            </div>
          </section>
        </main>

        <footer className="case-study-footer">
          <button onClick={() => navigate('/')} className="btn-back-projects">
            {t('caseStudyLabels.seeMoreProjects')}<span className="btn-back-projects__circle" aria-hidden="true">↗</span>
          </button>
        </footer>
      </div>
    </MainLayout>
  );
};
