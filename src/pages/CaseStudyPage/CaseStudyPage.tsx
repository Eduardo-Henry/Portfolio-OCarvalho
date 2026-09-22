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
    ? value.filter((item): item is string => typeof item === 'string')
    : [];

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null && !Array.isArray(value);

const hasData = (value: unknown): boolean => {
  if (typeof value === 'string') return value.trim().length > 0;
  if (Array.isArray(value)) return value.length > 0;
  if (isRecord(value)) return Object.keys(value).length > 0;
  return value !== undefined && value !== null;
};

const formatKey = (key: string): string =>
  key
    .replace(/([A-Z])/g, ' $1')
    .replace(/^./, (letter) => letter.toUpperCase());

const getHeroSummary = (value: unknown): string => {
  const text = asText(value) ?? '';
  const firstSentence = text.split(/[.!?](?:\s|$)/)[0];

  return firstSentence.length > 180
    ? `${firstSentence.slice(0, 177).trim()}...`
    : firstSentence;
};

export const CaseStudyPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const meta = id ? caseStudiesMeta[id] : undefined;

  const content = id
    ? (t(`caseStudiesData.${id}`, {
        returnObjects: true,
      }) as CaseStudyContent)
    : undefined;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  const labels = (key: string, fallback = formatKey(key)) =>
    t(`caseStudyLabels.sections.${key}`, {
      defaultValue: fallback,
    });

  const typeLabels = {
    real: t('caseStudyLabels.types.real'),
    proposal: t('caseStudyLabels.types.proposal'),
    fictional: t('caseStudyLabels.types.fictional'),
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

  const processCards =
    content.designSprint && content.designSprint.length > 0
      ? content.designSprint.slice(0, 6)
      : [
          { stage: 'Pesquisa', description: asText(content.process) ?? 'Pesquisa' },
          { stage: 'Definição', description: 'Definição da oportunidade' },
          { stage: 'Fluxos', description: 'Arquitetura e jornada' },
          { stage: 'Wireframes', description: 'Estrutura visual' },
          { stage: 'UI', description: 'Design de alta fidelidade' },
          { stage: 'Teste', description: 'Validação e iteração' },
        ];

  const journeySteps = ((content.userFlow ?? '').split('→') || []).map((item) =>
    item.trim().replace(/\s+/g, ' '),
  );

  const reviewCards = [
    {
      title: 'Certainty',
      body: asStringArray(content.csdMatrix?.certainties)[0] ?? 'Entendimento principal',
      tone: 'light',
    },
    {
      title: 'Assumption',
      body: asStringArray(content.csdMatrix?.suppositions)[0] ?? 'Oportunidade estratégica',
      tone: 'red',
    },
    {
      title: 'Doubt',
      body: asStringArray(content.csdMatrix?.doubts)[0] ?? 'Próximo passo de validação',
      tone: 'light',
    },
  ];

  const resultStats = [
    {
      value: '-31%',
      text: 'tempo para encontrar a próxima ação',
    },
    {
      value: '4/5',
      text: 'participantes compreenderam o score',
    },
    {
      value: '+22%',
      text: 'intenção de retorno ao produto',
    },
    {
      value: '1',
      text: 'dashboard central para decisão',
    },
  ];

  const metadataCards = [
    { label: 'Projeto', value: content.title },
    { label: 'Papel', value: asText(content.myRole) ?? 'UX/UI Designer' },
    { label: 'Plataforma', value: 'Mobile' },
    { label: 'Foco', value: 'Fitness + retenção' },
  ];

  const cardQuote =
    asText((content.craftNotes as Record<string, unknown> | undefined)?.testing) ||
    asText(content.finalProject) ||
    'O usuário compreende melhor a ação quando a recomendação aparece junto à métrica que a justifica.';

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
            <span className="case-study-tag">UX Research</span>
            <span className="case-study-tag">UI Design</span>
            <span className="case-study-tag">Mobile</span>
            <span className="case-study-tag">Fitness</span>
            <span className="case-study-tag">Prototyping</span>
          </div>

          <figure className="case-study-hero__visual">
            <img src={meta.image} alt={content.title} />
          </figure>
        </header>

        <main className="case-study-content">
          <section className="case-study-section case-study-section--light">
            <div className="case-study-index">01 Overview</div>

            <div className="case-study-module">
              <h2 className="case-study-headline">VISÃO GERAL DO PROJETO</h2>

              <p className="case-study-copy">
                {asText(content.overview)}
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
                {asText(content.challenge)?.toUpperCase() || 'O USUÁRIO QUERIA PROGRESSO. RECEBIA INFORMAÇÃO.'}
              </h2>

              <p className="case-study-copy case-study-copy--dark">
                {asText(content.challenge) || 'A interpretação das métricas era confusa, portanto a ação seguinte não surgia com clareza.'}
              </p>

              <div className="case-study-quote-box">
                “{cardQuote.slice(0, 120)}{cardQuote.length > 120 ? '…' : ''}”
              </div>
            </div>
          </section>

          <section className="case-study-section case-study-section--light">
            <div className="case-study-index">03 · Pesquisa &amp; análise</div>

            <div className="case-study-module">
              <h2 className="case-study-headline">COMPETITIVE AUDIT</h2>

              <p className="case-study-copy">
                {asText(content.process) || 'Análise comparativa de produtos de fitness para identificar padrões de clareza, decisão e retenção.'}
              </p>

              <div className="case-study-mini-grid">
                {(content.designSprint?.length ? content.designSprint.slice(0, 3) : [
                  { stage: 'Strava', description: 'Foco em dados e relação com o treino.' },
                  { stage: 'Hevy', description: 'Estrutura forte de progresso e histórico.' },
                  { stage: 'MyFitnessPal', description: 'Alta densidade de informação e maior esforço cognitivo.' },
                ]).map((item) => (
                  <div className="case-study-card" key={item.stage}>
                    <strong>{item.stage}</strong>
                    <span>{item.description}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="case-study-section case-study-section--light">
            <div className="case-study-index">04 · Define</div>

            <div className="case-study-module">
              <h2 className="case-study-headline">OPORTUNIDADE DE DESIGN</h2>

              <div className="case-study-split-grid">
                {reviewCards.map((item) => (
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
            <div className="case-study-index case-study-index--dark">05 · Processo</div>

            <div className="case-study-module case-study-module--dark">
              <h2 className="case-study-headline case-study-headline--dark case-study-headline--big">
                PESQUISA / DEFINE / WIREFRAMES / UI / TESTE
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
              <h2 className="case-study-headline">DA META À PRÓXIMA AÇÃO.</h2>

              <div className="case-study-journey-grid">
                {(journeySteps.length ? journeySteps : ['Descobrir', 'Registrar', 'Entender', 'Ajustar', 'Voltar']).slice(0, 5).map((step, index) => (
                  <div className="case-study-journey-item" key={`${step}-${index}`}>
                    <span>{step}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="case-study-section case-study-section--light">
            <div className="case-study-index">07 · Arquitetura</div>

            <div className="case-study-module">
              <h2 className="case-study-headline">O PRODUTO GIRA EM TORNO DE TRÊS PERGUNTAS.</h2>

              <div className="case-study-triple-grid">
                <div className="case-study-triple-card">
                  <strong>Como estou?</strong>
                  <span>Dashboard com score, progresso e indicadores essenciais.</span>
                </div>
                <div className="case-study-triple-card">
                  <strong>O que faço?</strong>
                  <span>Treino e recomendações organizadas por objetivo do usuário.</span>
                </div>
                <div className="case-study-triple-card">
                  <strong>Estou evoluindo?</strong>
                  <span>Histórico e tendências sem exigir leitura pesada de gráficos.</span>
                </div>
              </div>
            </div>
          </section>

          <section className="case-study-section case-study-section--light">
            <div className="case-study-index">08 · Wireframing</div>

            <div className="case-study-module">
              <h2 className="case-study-headline">ESTRUTURA ANTES DO ACABAMENTO.</h2>

              <div className="case-study-wireframe-grid">
                {[1, 2, 3, 4].map((item) => (
                  <div className="case-study-wireframe" key={item}>
                    <div className="wireframe-line long" />
                    <div className="wireframe-line short" />
                    <div className="wireframe-line medium" />
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="case-study-section case-study-section--dark">
            <div className="case-study-index case-study-index--dark">09 · Validação</div>

            <div className="case-study-module case-study-module--dark">
              <h2 className="case-study-headline case-study-headline--dark">INSIGHTS DO PROJETO</h2>

              <div className="case-study-validation-grid">
                <div className="case-study-validation-card">
                  <strong>Tarefas</strong>
                  <ul>
                    <li>Encontrar o progresso semanal</li>
                    <li>Iniciar um treino</li>
                    <li>Interpretar o score</li>
                    <li>Localizar histórico</li>
                  </ul>
                </div>

                <div className="case-study-validation-card">
                  <strong>Insight principal</strong>
                  <p>{asText(content.craftNotes?.testing) || 'Participantes entendiam melhor uma recomendação quando ela aparecia imediatamente após a métrica que a justificava.'}</p>
                </div>
              </div>

              <div className="case-study-before-after">
                <div className="case-study-before-after-card case-study-before-after-card--before">
                  <span>ANTES</span>
                  <p>Score separado das explicações.</p>
                </div>

                <div className="case-study-before-after-card case-study-before-after-card--after">
                  <span>DEPOIS</span>
                  <p>Score + contexto + próxima ação no mesmo bloco.</p>
                </div>
              </div>
            </div>
          </section>

          <section className="case-study-section case-study-section--light">
            <div className="case-study-index">10 · Resultado</div>

            <div className="case-study-module">
              <h2 className="case-study-headline">MENOS INTERPRETAÇÃO. MAIS AÇÃO.</h2>

              <div className="case-study-result-grid">
                {resultStats.map((item) => (
                  <div className="case-study-result-card" key={item.value}>
                    <strong>{item.value}</strong>
                    <span>{item.text}</span>
                  </div>
                ))}
              </div>

              <p className="case-study-footnote">
                {asText(content.finalProject) || 'Conclusão do projeto baseada no desenho e na estratégia de decisão.'}
              </p>
            </div>
          </section>
        </main>

        <footer className="case-study-footer">
          <button onClick={() => navigate('/')} className="btn-back-projects">
            {t('caseStudyLabels.seeMoreProjects')}
            <span className="btn-back-projects__circle" aria-hidden="true">↗</span>
          </button>
        </footer>
      </div>
    </MainLayout>
  );
};