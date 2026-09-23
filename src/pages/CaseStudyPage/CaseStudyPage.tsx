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

interface CaseStudyContent {
  title: string;
  overview?: string;
  challenge?: string;
  process?: string;
  myRole?: string;
  userFlow?: string;
  solution?: string;
  finalProject?: string;
  conclusion?: string;
  designSprint?: Array<{ stage: string; description: string }>;
  csdMatrix?: Record<string, unknown>;
  informationArchitecture?: Record<string, unknown>;
  usabilityTesting?: Record<string, unknown>;
  results?: Array<Record<string, unknown>>;
  craftNotes?: Record<string, unknown>;
  [key: string]: unknown;
}

interface CaseStudyMeta {
  type: 'proposal' | 'real' | 'fictional';
  image: string;
  prototypeUrl: string;
}

const caseStudiesMeta: Record<string, CaseStudyMeta> = {
  '1': {
    type: 'real',
    image: TIHelpImg,
    prototypeUrl:
      'https://www.figma.com/proto/fw2bexpovuRBEjPGqDwRW3/PIM-3%C2%B0-SEM?node-id=1158-457&p=f&t=pv64Gtc7MDHmRbCO-0&scaling=scale-down&content-scaling=fixed&page-id=0%3A1&starting-point-node-id=1158%3A457',
  },
  '2': {
    type: 'proposal',
    image: KaloBurnImg,
    prototypeUrl:
      'https://www.figma.com/proto/nfQdsEFYEm9pVEjSjPSdcz/KaloBurn?node-id=23-42&t=Wl3lXOW4CCxwFhNV-0&scaling=min-zoom&content-scaling=fixed&page-id=1%3A3&starting-point-node-id=40%3A70S',
  },
  '3': {
    type: 'real',
    image: DNJeansImg,
    prototypeUrl:
      'https://www.figma.com/proto/uPJ99JDTyjMPamkJnS9FTu/DN-Jeans---Dalton?node-id=0-1&p=f&t=XAZDi8fCZ9YUFXKs-0&scaling=min-zoom&content-scaling=fixed&page-id=0%3A1&starting-point-node-id=16%3A146',
  },
  '4': {
    type: 'proposal',
    image: RealStateImg,
    prototypeUrl: 'https://www.figma.com/proto/pr2HKsIP3kV7GUYN7l2vZy',
  },
  '5': {
    type: 'fictional',
    image: YatchImg,
    prototypeUrl: 'https://www.figma.com/proto/jrsEdX4WbU27tltU5kwivm',
  },
  '6': {
    type: 'fictional',
    image: SolarPanelImg,
    prototypeUrl: 'https://www.figma.com/proto/sXLh6cXRhiGBx6l1Ot8war',
  },
  '7': {
    type: 'real',
    image: KaloBurnImg,
    prototypeUrl: 'https://www.instagram.com/',
  },
};

const asText = (value: unknown): string | undefined =>
  typeof value === 'string' && value.trim() ? value : undefined;

const asStringArray = (value: unknown): string[] =>
  Array.isArray(value)
    ? value.filter(
        (item): item is string =>
          typeof item === 'string' &&
          item.trim().length > 0 &&
          !item.includes('[PREENCHER]'),
      )
    : [];

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null && !Array.isArray(value);

const cleanText = (value: unknown): string | undefined => {
  const text = asText(value);
  return text && !text.includes('[PREENCHER]') ? text : undefined;
};

const formatKey = (key: string): string =>
  key
    .replace(/([A-Z])/g, ' $1')
    .replace(/^./, (letter) => letter.toUpperCase());

const getHeroSummary = (value: unknown): string => {
  const text = cleanText(value) ?? '';
  const firstSentence = text.split(/[.!?](?:\s|$)/)[0];

  return firstSentence.length > 180
    ? `${firstSentence.slice(0, 177).trim()}...`
    : firstSentence;
};

export const CaseStudyPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  const meta = id ? caseStudiesMeta[id] : undefined;

  const content = id
    ? (t(`caseStudiesData.${id}`, {
        returnObjects: true,
      }) as CaseStudyContent)
    : undefined;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  const typeLabels = {
    real: t('caseStudyLabels.types.real'),
    proposal: t('caseStudyLabels.types.proposal'),
    fictional: t('caseStudyLabels.types.fictional'),
  };

  const isPortuguese = i18n.language.startsWith('pt');
  const copy = {
    overview: isPortuguese ? 'VISÃO GERAL DO PROJETO' : 'PROJECT OVERVIEW',
    challenge: isPortuguese ? 'O DESAFIO EM UMA FRASE.' : 'THE CHALLENGE IN ONE LINE.',
    research: isPortuguese ? 'PESQUISA & ANÁLISE' : 'RESEARCH & ANALYSIS',
    define: isPortuguese ? 'OPORTUNIDADE DE DESIGN' : 'DESIGN OPPORTUNITY',
    process: isPortuguese ? 'PESQUISA / DEFINE / WIREFRAMES / UI / TESTE' : 'RESEARCH / DEFINE / WIREFRAMES / UI / TEST',
    journey: isPortuguese ? 'DA META À PRÓXIMA AÇÃO.' : 'FROM GOAL TO NEXT ACTION.',
    architecture: isPortuguese ? 'COMO A EXPERIÊNCIA SE ORGANIZA.' : 'HOW THE EXPERIENCE IS ORGANIZED.',
    wireframes: isPortuguese ? 'ESTRUTURA ANTES DO ACABAMENTO.' : 'STRUCTURE BEFORE THE FINISH.',
    validation: isPortuguese ? 'INSIGHTS DO PROJETO' : 'PROJECT INSIGHTS',
    results: isPortuguese ? 'O QUE MUDOU COM O DESIGN.' : 'WHAT THE DESIGN CHANGED.',
    conceptual: isPortuguese ? 'Conceitual / validação futura' : 'Conceptual / future validation',
    outcome: isPortuguese ? 'Resultado documentado' : 'Documented outcome',
    focus: isPortuguese ? 'Foco' : 'Focus',
  };

  const findSectionItems = (value: unknown): Array<{ label: string; text: string }> => {
    if (!isRecord(value)) return [];
    return Object.entries(value).flatMap(([key, item]) => {
      const label = formatKey(key);
      if (Array.isArray(item)) return asStringArray(item).map((text) => ({ label, text }));
      const text = cleanText(item);
      return text ? [{ label, text }] : [];
    });
  };

  if (
    !meta ||
    !content ||
    typeof content !== 'object' ||
    !asText(content.title)
  ) {
    return (
      <MainLayout>
        <div className="case-study-page case-study-page--not-found">
          <p>{t('caseStudyLabels.notFound')}</p>

          <button
            onClick={() => navigate('/')}
            className="back-button"
          >
            <span
              className="back-button__circle"
              aria-hidden="true"
            >
              ↩
            </span>

            {t('caseStudyLabels.back')}
          </button>
        </div>
      </MainLayout>
    );
  }

  const processCards = (content.designSprint ?? [])
    .filter((step) => cleanText(step.stage) && cleanText(step.description))
    .slice(0, 6);

  const journeySteps = (cleanText(content.userFlow)?.split('→') ?? [])
    .map((item) => item.trim().replace(/\s+/g, ' '))
    .filter(Boolean);

  const reviewCards = [
    {
      title: 'Certainty',
      body: asStringArray(content.csdMatrix?.certainties)[0],
      tone: 'light',
    },
    {
      title: 'Assumption',
      body: asStringArray(content.csdMatrix?.suppositions)[0],
      tone: 'red',
    },
    {
      title: 'Doubt',
      body: asStringArray(content.csdMatrix?.doubts)[0],
      tone: 'light',
    },
  ];

  const metadataCards = [
    { label: isPortuguese ? 'Projeto' : 'Project', value: content.title },
    { label: isPortuguese ? 'Papel' : 'Role', value: cleanText(content.myRole) ?? 'UX/UI Designer' },
    { label: isPortuguese ? 'Tipo' : 'Type', value: typeLabels[meta.type] },
    { label: copy.focus, value: cleanText(content.process)?.split('.')[0] ?? typeLabels[meta.type] },
  ];

  const architectureItems = findSectionItems(content.informationArchitecture);
  const architectureCards = architectureItems.length
    ? architectureItems.slice(0, 6)
    : journeySteps.slice(0, 3).map((text, index) => ({
        label: `${isPortuguese ? 'Etapa' : 'Stage'} ${index + 1}`,
        text,
      }));
  const validationItems = [
    ...findSectionItems(content.usabilityTesting),
    ...findSectionItems(content.craftNotes).filter((item) => item.label === 'Testing'),
  ].slice(0, 4);
  const resultItems = (content.results ?? [])
    .flatMap((result) => findSectionItems(result))
    .slice(0, 4);
  if (!resultItems.length && cleanText(content.finalProject)) {
    resultItems.push({ label: copy.outcome, text: cleanText(content.finalProject) as string });
  }

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
          <h1 className="case-study-title">{content.title}</h1>

          <p className="case-study-hero__summary">{getHeroSummary(content.overview)}</p>

          <div className="case-study-tags">
            <span className="case-study-tag">{typeLabels[meta.type]}</span>
            <span className="case-study-tag">UX/UI</span>
            {cleanText(content.myRole)?.split(' ').slice(0, 3).join(' ') && (
              <span className="case-study-tag">
                {cleanText(content.myRole)?.split(' ').slice(0, 3).join(' ')}
              </span>
            )}
          </div>

          <figure className="case-study-hero__visual">
            <img src={meta.image} alt={content.title} />
          </figure>
        </header>

        <main className="case-study-content">
          <section className="case-study-section case-study-section--light">
            <div className="case-study-index">01 · {isPortuguese ? 'Overview' : 'Overview'}</div>

            <div className="case-study-module">
              <h2 className="case-study-headline">{copy.overview}</h2>

              <p className="case-study-copy">
                {cleanText(content.overview)}
              </p>

              <div className="case-study-meta-grid">
                {metadataCards.map((item) => (
                  <div className="case-study-meta-card" key={item.label}>
                    <span className="case-study-meta-label">{item.label}</span>
                    <span className="case-study-meta-value">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="case-study-section case-study-section--dark">
            <div className="case-study-index case-study-index--dark">02 · Challenge</div>

            <div className="case-study-module case-study-module--dark">
              <h2 className="case-study-headline case-study-headline--dark">
                {getHeroSummary(content.challenge).toUpperCase()}
              </h2>

              <p className="case-study-copy case-study-copy--dark">
                {cleanText(content.challenge)}
              </p>
            </div>
          </section>

          <section className="case-study-section case-study-section--light">
            <div className="case-study-index">03 · Pesquisa &amp; análise</div>

            <div className="case-study-module">
              <h2 className="case-study-headline">{copy.research}</h2>

              <p className="case-study-copy">
                {cleanText(content.process)}
              </p>

              <div className="case-study-mini-grid">
                {(asStringArray(content.csdMatrix?.certainties).slice(0, 3)).map((item, index) => (
                  <div className="case-study-card" key={`${item}-${index}`}>
                    <strong>{isPortuguese ? 'Observação' : 'Observation'}</strong>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="case-study-section case-study-section--light">
            <div className="case-study-index">04 · Define</div>

            <div className="case-study-module">
              <h2 className="case-study-headline">{copy.define}</h2>

              <div className="case-study-split-grid">
                {reviewCards.filter((item) => item.body).map((item) => (
                  <div
                    className={`case-study-card case-study-card--${item.tone}`}
                    key={item.title}
                  >
                    <strong>{item.title}</strong>
                    <span>{item.body}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="case-study-section case-study-section--dark case-study-section--process">
            <div className="case-study-index case-study-index--dark">
              05 · {isPortuguese ? 'Processo' : 'Process'}
            </div>

            <div className="case-study-module case-study-module--dark">
              <h2 className="case-study-headline case-study-headline--dark case-study-headline--big">
                {copy.process}
              </h2>

              <div className="case-study-step-grid">
                {processCards.map((step, index) => (
                  <div className="case-study-step" key={`${step.stage}-${index}`}>
                    <div className="case-study-step-number">{String(index + 1).padStart(2, '0')}</div>
                    <div className="case-study-step-title">{step.stage}</div>
                    <div className="case-study-step-copy">{step.description}</div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="case-study-section case-study-section--light">
            <div className="case-study-index">06 · User Journey</div>

            <div className="case-study-module">
              <h2 className="case-study-headline">{copy.journey}</h2>

              <div className="case-study-journey-grid">
                {journeySteps.slice(0, 5).map((step, index) => (
                  <div className="case-study-journey-item" key={`${step}-${index}`}>
                    <span>{step}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="case-study-section case-study-section--light">
            <div className="case-study-index">07 · {isPortuguese ? 'Arquitetura' : 'Architecture'}</div>

            <div className="case-study-module">
              <h2 className="case-study-headline">{copy.architecture}</h2>

              <div className="case-study-triple-grid">
                {architectureCards.map((item, index) => (
                  <div className="case-study-triple-card" key={`${item.label}-${index}`}>
                    <strong>{item.label}</strong>
                    <span>{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="case-study-section case-study-section--light">
            <div className="case-study-index">08 · Wireframing</div>

            <div className="case-study-module">
              <h2 className="case-study-headline">{copy.wireframes}</h2>

              <div className="case-study-wireframe-grid">
                {[1, 2, 3, 4].map((item) => (
                  <div className="case-study-wireframe" key={item}>
                    <span>{copy.conceptual}</span>
                    <div className="wireframe-line long" />
                    <div className="wireframe-line short" />
                    <div className="wireframe-line medium" />
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="case-study-section case-study-section--dark">
            <div className="case-study-index case-study-index--dark">
              09 · {isPortuguese ? 'Validação' : 'Validation'}
            </div>

            <div className="case-study-module case-study-module--dark">
              <h2 className="case-study-headline case-study-headline--dark">{copy.validation}</h2>

              <div className="case-study-validation-grid">
                {validationItems.map((item, index) => (
                  <div className="case-study-validation-card" key={`${item.label}-${index}`}>
                    <strong>{item.label}</strong>
                    <p>{item.text}</p>
                  </div>
                ))}
              </div>

              {cleanText(content.solution) && (
                <div className="case-study-before-after">
                  <div className="case-study-before-after-card case-study-before-after-card--before">
                    <span>{isPortuguese ? 'DIREÇÃO' : 'DIRECTION'}</span>
                    <p>{cleanText(content.solution)}</p>
                  </div>
                  <div className="case-study-before-after-card case-study-before-after-card--after">
                    <span>{isPortuguese ? 'STATUS' : 'STATUS'}</span>
                    <p>{cleanText(content.conclusion) ?? copy.conceptual}</p>
                  </div>
                </div>
              )}
            </div>
          </section>

          <section className="case-study-section case-study-section--light">
            <div className="case-study-index">10 · {isPortuguese ? 'Resultado' : 'Result'}</div>

            <div className="case-study-module">
              <h2 className="case-study-headline">{copy.results}</h2>

              <div className="case-study-result-grid">
                {resultItems.map((item, index) => (
                  <div className="case-study-result-card" key={`${item.label}-${index}`}>
                    <strong>{item.label}</strong>
                    <span>{item.text}</span>
                  </div>
                ))}
              </div>

              <p className="case-study-footnote">
                {cleanText(content.conclusion) ?? cleanText(content.finalProject)}
              </p>
            </div>
          </section>
        </main>

        <footer className="case-study-footer">
          <div className="case-study-conclusion">
            <span className="case-study-conclusion__label">
              {isPortuguese ? 'Conclusão' : 'Conclusion'}
            </span>
            <h2 className="case-study-conclusion__title">
              {cleanText(content.conclusion)?.split('.')[0] ?? content.title}
            </h2>
            <p className="case-study-conclusion__copy">
              {cleanText(content.conclusion) ?? cleanText(content.finalProject)}
            </p>
          </div>

          <button onClick={() => navigate('/')} className="btn-back-projects">
            {t('caseStudyLabels.seeMoreProjects')}
            <span className="btn-back-projects__circle" aria-hidden="true">↗</span>
          </button>
        </footer>
      </div>
    </MainLayout>
  );
};