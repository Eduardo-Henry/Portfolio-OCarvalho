import React, { useEffect } from 'react';

import { useNavigate, useParams } from 'react-router-dom';

import { useTranslation } from 'react-i18next';

import { MainLayout } from '../../components/templates';
import { FooterSection } from '../../components/organisms/FooterSection';

import './CaseStudyPage.css';

import { MdArrowBack } from 'react-icons/md';

import TIHelpImg from '@/assets/images/TIHelp.png';

import TIHelpWireframesMobile from '@/assets/images/TIHelpWireframesVersaoMobile.png';

import TIHelpWireframesWeb from '@/assets/images/TIHelpWireframesVersaoWeb.png';

import KaloBurnImg from '@/assets/images/KaloBurn.png';

import KaloBurnWireframe from '@/assets/images/KaloBurnWireframe.png';

import Orbeanjeans from '@/assets/images/OrbeanJeans.png';

import OrbeanJeansWireframes from '@/assets/images/OrbeanJeansWireframes.png';

import SolarPanelImg from '@/assets/images/SolarPanel.png';

import RealStateImg from '@/assets/images/RealState.png';

import ImoveProWireframe from '@/assets/images/ImoveProWireframe.png';

// The legacy Yacht Booking route has no cover asset in the current repository.

import ElvisCoverImg from '../../assets/images/ElvisCover.png';

import ElvisGridInstagramImg from '../../assets/images/ElvisGridInstagram.png';

interface CaseStudyContent {

  title: string;

  subtitle?: string;

  sectionTitles?: Record<string, unknown>;

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

  personas?: unknown[];

  userStories?: unknown[];

  problemDefinitions?: unknown[];

  research?: Record<string, unknown>;

  interviews?: Record<string, unknown>;

  researchSynthesis?: Record<string, unknown>;

  userJourney?: unknown[];

  problemStatement?: Record<string, unknown>;

  howMightWe?: unknown[];

  ideation?: Record<string, unknown>;

  paperSketches?: Record<string, unknown>;

  userFlowDetail?: Record<string, unknown>;

  wireframes?: Record<string, unknown>;

  highFidelityDesign?: Record<string, unknown>;

  iterations?: unknown[];

  learnings?: unknown[];

  nextSteps?: unknown[];

  limitations?: unknown[];

  [key: string]: unknown;

}

interface CaseStudyMeta {

  type: 'proposal' | 'real' | 'fictional';

  image: string;

  prototypeUrl?: string;

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

    image: Orbeanjeans,

    prototypeUrl:

      'https://www.figma.com/proto/uPJ99JDTyjMPamkJnS9FTu/DN-Jeans---Dalton?node-id=0-1&p=f&t=XAZDi8fCZ9YUFXKs-0&scaling=min-zoom&content-scaling=fixed&page-id=0%3A1&starting-point-node-id=16%3A146',

  },

  



  '4': {
    type: 'proposal',
    image: RealStateImg,
  },

  '5': {
    type: 'fictional',
    image: '',
  },

  '6': {
    type: 'fictional',
    image: SolarPanelImg,
    prototypeUrl: 'https://www.figma.com/proto/sXLh6cXRhiGBx6l1Ot8war',
  },

 '7': {

  type: 'real',

  image: ElvisCoverImg,

  prototypeUrl: 'https://www.instagram.com/vereador.elvis/?hl=pt-br',

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

  return cleanText(value) ?? '';

};

const getMediaDetails = (

  images: unknown,

  imageDetails: unknown,

  fallbackTitle: string,

) => {

  const sources = asStringArray(images);

  const details = Array.isArray(imageDetails) ? imageDetails.filter(isRecord) : [];

  return sources.map((src, index) => {

    const detail = details[index];

    return {

      src: resolveCaseStudyMedia(src),

      title: cleanText(detail?.title) ?? `${fallbackTitle} ${index + 1}`,

      description: cleanText(detail?.description),

      decision: cleanText(detail?.decision),

    };

  });

};

const wireframeAssets: Record<string, string> = {
  '/case-studies/tihelp-wireframes-mobile.png': TIHelpWireframesMobile,
  '/case-studies/tihelp-wireframes-web.png': TIHelpWireframesWeb,
  '/case-studies/kaloburn-wireframes-source.png': KaloBurnWireframe,
  '/case-studies/orbean-jeans-wireframes.png': OrbeanJeansWireframes,
  '/case-studies/imovepro-wireframe.png': ImoveProWireframe,
};

const resolveCaseStudyMedia = (src: string): string => wireframeAssets[src] ?? src;

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

    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });

    const page = document.querySelector<HTMLElement>('.case-study-page');

    if (!page) return;

    const sections = Array.from(

      page.querySelectorAll<HTMLElement>('.case-study-content > .case-study-section'),

    );

    // Reveal only every other section. Do not attach reveal to individual children,

    // the hero or the footer, so the page keeps the editorial rhythm of the reference.

    const revealItems = sections.filter((_item, index) => index % 2 === 0);

    revealItems.forEach((element) => {

      element.classList.add('ux-reveal');

      element.style.setProperty('--reveal-delay', '0ms');

    });

    const observer = new IntersectionObserver(

      (entries) => {

        entries.forEach((entry) => {

          if (entry.isIntersecting) {

            entry.target.classList.add('is-visible');

            observer.unobserve(entry.target);

          }

        });

      },

      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' },

    );

    revealItems.forEach((element) => observer.observe(element));

    let frame = 0;

    const updateScrollMotion = () => {

      frame = 0;

      const maxScroll = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);

      const progress = Math.min(window.scrollY / maxScroll, 1);

      page.style.setProperty('--scroll-progress', `${progress * 100}%`);

      const hero = page.querySelector<HTMLElement>('.case-study-hero');

      if (hero) {

        const heroProgress = Math.max(

          0,

          Math.min(1, -hero.getBoundingClientRect().top / Math.max(hero.offsetHeight, 1)),

        );

        page.style.setProperty('--hero-shift', `${heroProgress * 72}px`);

        page.style.setProperty('--hero-scale', `${1 - heroProgress * 0.035}`);

      }

    };

    const onScroll = () => {

      if (!frame) frame = requestAnimationFrame(updateScrollMotion);

    };

    const interactiveItems = Array.from(

      page.querySelectorAll<HTMLElement>('.back-button, .btn-back-projects, .case-study-tag'),

    );

    const pointerMove = (event: PointerEvent) => {

      const target = event.currentTarget as HTMLElement;

      const rect = target.getBoundingClientRect();

      target.style.setProperty('--mx', `${((event.clientX - rect.left) / rect.width - 0.5) * 8}px`);

      target.style.setProperty('--my', `${((event.clientY - rect.top) / rect.height - 0.5) * 8}px`);

    };

    const pointerLeave = (event: PointerEvent) => {

      const target = event.currentTarget as HTMLElement;

      target.style.setProperty('--mx', '0px');

      target.style.setProperty('--my', '0px');

    };

    window.addEventListener('scroll', onScroll, { passive: true });

    updateScrollMotion();

    interactiveItems.forEach((item) => {

      item.addEventListener('pointermove', pointerMove);

      item.addEventListener('pointerleave', pointerLeave);

    });

    return () => {

      observer.disconnect();

      window.removeEventListener('scroll', onScroll);

      if (frame) cancelAnimationFrame(frame);

      interactiveItems.forEach((item) => {

        item.removeEventListener('pointermove', pointerMove);

        item.removeEventListener('pointerleave', pointerLeave);

      });

    };

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

    architecture: isPortuguese ? 'ESTRUTURA DO PRODUTO' : 'PRODUCT STRUCTURE',

    wireframes: isPortuguese ? 'ESTRUTURA ANTES DO ACABAMENTO.' : 'STRUCTURE BEFORE THE FINISH.',

    validation: isPortuguese ? 'INSIGHTS DO PROJETO' : 'PROJECT INSIGHTS',

    results: isPortuguese ? 'RESULTADOS E EVIDÊNCIAS' : 'PROJECT RESULTS & EVIDENCE',

    conceptual: isPortuguese ? 'Conceitual / validação futura' : 'Conceptual / future validation',

    outcome: isPortuguese ? 'Resultado documentado' : 'Documented outcome',

    focus: isPortuguese ? 'Foco' : 'Focus',

  };

  const sectionLabels = {

    overview: isPortuguese ? 'Visão Geral' : 'Overview',

    challenge: isPortuguese ? 'Desafio' : 'Challenge',

    research: isPortuguese ? 'Pesquisa & Análise' : 'Research & Analysis',

    define: isPortuguese ? 'Definição' : 'Define',

    process: isPortuguese ? 'Processo' : 'Process',

    journey: isPortuguese ? 'Jornada do Usuário' : 'User Journey',

    architecture: isPortuguese ? 'Arquitetura' : 'Architecture',

    wireframes: isPortuguese ? 'Wireframes' : 'Wireframing',

    validation: isPortuguese ? 'Validação' : 'Validation',

    result: isPortuguese ? 'Resultado' : 'Result',

    highFidelityDesign: isPortuguese ? 'Alta fidelidade' : 'High-Fidelity Design',

    iterations: isPortuguese ? 'Iterações' : 'Iterations',

    learnings: isPortuguese ? 'Aprendizados' : 'Learnings',

    nextSteps: isPortuguese ? 'Próximos passos' : 'Next Steps',

    limitations: isPortuguese ? 'Limitações' : 'Limitations',

  };

  const sectionTitle = (key: string, fallback: string): string =>
    cleanText(content?.sectionTitles?.[key]) ?? fallback;

  const findSectionItems = (value: unknown): Array<{ label: string; text: string }> => {

    if (!isRecord(value)) return [];

    const explicitLabel = cleanText(value.type) ?? cleanText(value.title);
    const explicitText = cleanText(value.label) ?? cleanText(value.description);

    if (explicitLabel && explicitText) {
      return [{ label: explicitLabel, text: explicitText }];
    }

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

    <MdArrowBack />

  </span>

  {t('caseStudyLabels.back')}

</button>

        </div>

      </MainLayout>

    );

  }

  if (id === '7') {

    const elvisGallery = [

      ElvisGridInstagramImg,

    ];

    return (

      <MainLayout>

        <div className="case-study-page elvis-case-study">

          <div className="case-study-topbar">

            <button onClick={() => navigate(-1)} className="back-button">

              <span className="back-button__circle" aria-hidden="true"><MdArrowBack /></span>

              {t('caseStudyLabels.back')}

            </button>

          </div>

          <section className="elvis-section elvis-hero">
  <div className="elvis-hero__content">
    <div className="elvis-section-index">01 · PROJETO</div>

    <h1 className="elvis-title type-h1">
      SOCIAL MEDIA
      <br />
      DESIGN
    </h1>

    <p className="elvis-copy type-lead">
      {getHeroSummary(content.overview)}
    </p>

    <div className="elvis-tags">
      <span>PROJETO REAL</span>
      <span>DESIGN GRÁFICO</span>
      <span>COMUNICAÇÃO POLÍTICA</span>
    </div>
  </div>

  {/* A imagem agora é independente do conteúdo */}
  <figure className="elvis-hero__visual">
    <img
      className="elvis-hero__cover"
      src={ElvisCoverImg}
      alt="Apresentação do perfil de Elvis no Instagram"
    />

    <div className="elvis-hero__post">
      <img
        src={ElvisGridInstagramImg}
        alt="Peça de campanha social"
      />
    </div>
  </figure>
</section>

          <section className="elvis-section elvis-challenge">

            <div className="elvis-section-index elvis-section-index--light">02 · DESAFIO</div>

            <h2 className="elvis-challenge__title type-h2">
              {sectionTitle('challenge', isPortuguese ? 'DESAFIO' : 'CHALLENGE')}
            </h2>

            <p className="elvis-challenge__text type-body">
              {cleanText(content.challenge)}
            </p>

          </section>

         <section className="elvis-section elvis-overview">
          <div className="elvis-overview__left">
            <div className="elvis-section-index">03 · VISÃO GERAL</div>
            <h2 className="elvis-overview__headline type-h2">
              {sectionTitle('overview', isPortuguese ? 'DESIGN VISUAL' : 'VISUAL DESIGN')}
            </h2>
          </div>

          <div className="elvis-overview__right">
            <div className="elvis-info-card">
              <span>PROJETO</span>
              <strong>Social Media Design</strong>
            </div>
            <div className="elvis-info-card">
              <span>CLIENTE</span>
              <strong>Elvis — Vereador</strong>
            </div>
            <div className="elvis-info-card">
              <span>PLATAFORMA</span>
              <strong>Instagram</strong>
            </div>
            <div className="elvis-info-card">
              <span>PAPEL</span>
              <strong>Design e produção de conteúdo</strong>
            </div>
            <div className="elvis-info-card">
              <span>TIPO</span>
              <strong>Projeto real</strong>
            </div>
          </div>
        </section>

          <section className="elvis-section elvis-gallery">

            <div className="elvis-section-index elvis-section-index--light">04 · PEÇAS DESENVOLVIDAS</div>

            <h2 className="elvis-gallery__title type-h2">
              {sectionTitle('gallery', isPortuguese ? 'CONTEÚDOS DESENVOLVIDOS' : 'CONTENT CREATED')}
            </h2>

            <div className="elvis-gallery__grid">

              {elvisGallery.map((src, index) => (

                <img key={`${src}-${index}`} src={src} alt={`Peça social ${index + 1}`} />

              ))}

            </div>

          </section>

          <section className="elvis-section elvis-results">

            <div className="elvis-section-index">05 · EVIDÊNCIAS DO PROJETO</div>

            <h2 className="elvis-results__title type-h2">
              {sectionTitle('results', isPortuguese ? 'ESCOPO E EVIDÊNCIAS' : 'SCOPE AND EVIDENCE')}
            </h2>

            <div className="elvis-results__grid">

              <div className="elvis-results__card">

                <span className="elvis-results__value">FEED</span>

                <span className="elvis-results__label">Peças para publicação</span>

                <small>Exemplos de conteúdos desenvolvidos para a presença no Instagram.</small>

              </div>

              <div className="elvis-results__card">

                <span className="elvis-results__value">SISTEMA</span>

                <span className="elvis-results__label">Direção visual consistente</span>

                <small>Tipografia, cores e formatos adaptados ao conteúdo.</small>

              </div>

            </div>

            <p className="elvis-results__footnote">

              As imagens documentam o escopo visual apresentado neste case. Não há métricas públicas ou validação de desempenho atribuídas ao design.

            </p>

          </section>

          <section className="elvis-section elvis-process">

            <div className="elvis-section-index elvis-section-index--light">06 · PROCESSO</div>

            <h2 className="elvis-process__title type-h2">{sectionTitle('process', isPortuguese ? 'PROCESSO' : 'PROCESS')}</h2>

            <div className="elvis-process__grid">

              <div className="elvis-process__card">

                <span className="elvis-process__number">01</span>

                <h3 className="type-h3">DIREÇÃO VISUAL</h3>

                <p>Definição de cores, tipografia, estilo visual e consistência para as peças.</p>

              </div>

              <div className="elvis-process__card">

                <span className="elvis-process__number">02</span>

                <h3 className="type-h3">PRODUÇÃO E ADAPTAÇÃO</h3>

                <p>Criação de artes e adaptação de conteúdos para feed, stories e reels.</p>

              </div>

              <div className="elvis-process__card">

                <span className="elvis-process__number">03</span>

                <h3 className="type-h3">ACOMPANHAMENTO DE DESEMPENHO</h3>

                <p>Análise dos resultados disponíveis e ajustes de conteúdo ao longo do projeto.</p>

              </div>

            </div>

          </section>

          <FooterSection />

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

  const quotedProcessQuestions = (cleanText(content.process)?.match(/'([^']+)'/g) ?? [])

    .map((value) => value.replace(/^'|'$/g, '').trim())

    .filter(Boolean)

    .slice(0, 3);

  const architectureCards = architectureItems.length

    ? architectureItems.slice(0, 6)

    : quotedProcessQuestions.length === 3

      ? quotedProcessQuestions.map((text) => ({ label: text, text: isPortuguese ? 'Pergunta central do produto.' : 'Core product question.' }))

      : journeySteps.slice(0, 3).map((text, index) => ({

          label: `${isPortuguese ? 'Etapa' : 'Stage'} ${index + 1}`,

          text,

        }));

  const allValidationItems = [

    ...findSectionItems(content.usabilityTesting),

    ...findSectionItems(content.craftNotes),

  ];

  const testingDetails = isRecord(content.usabilityTesting) ? content.usabilityTesting : undefined;

  const testingStatus = cleanText(testingDetails?.status);

  const testingMethod = cleanText(testingDetails?.method);

  const validationCards = [

    testingStatus && {

      label: isPortuguese ? 'Status' : 'Status',

      text: testingStatus,

      tone: 'light',

    },

    testingMethod && {

      label: isPortuguese ? 'Método' : 'Method',

      text: testingMethod,

      tone: 'red',

    },

    ...asStringArray(testingDetails?.findings).slice(0, 1).map((text) => ({

      label: isPortuguese ? 'Achado' : 'Finding',

      text,

      tone: 'light',

    })),

    ...(!testingDetails ? allValidationItems.slice(0, 2) : []),

  ].filter((item): item is { label: string; text: string; tone: string } => Boolean(item));

  const resultItems = (content.results ?? [])

    .flatMap((result) => findSectionItems(result))

    .slice(0, 4);

  if (!resultItems.length && cleanText(content.finalProject)) {

    resultItems.push({ label: copy.outcome, text: cleanText(content.finalProject) as string });

  }

  const personas = Array.isArray(content.personas) ? content.personas.filter(isRecord) : [];

  const userStories = Array.isArray(content.userStories) ? content.userStories.filter(isRecord) : [];

  const problemDefinitions = Array.isArray(content.problemDefinitions) ? content.problemDefinitions.filter(isRecord) : [];

  const researchSynthesis = isRecord(content.researchSynthesis) ? content.researchSynthesis : undefined;

  const researchInterviews = isRecord(content.interviews) ? content.interviews : undefined;

  const researchOverview = isRecord(content.research) ? content.research : undefined;

  const userJourney = Array.isArray(content.userJourney) ? content.userJourney.filter(isRecord) : [];

  const howMightWe = asStringArray(content.howMightWe);

  const ideation = isRecord(content.ideation) ? content.ideation : undefined;

  const informationArchitecture = isRecord(content.informationArchitecture) ? content.informationArchitecture : undefined;

  const userFlowDetail = isRecord(content.userFlowDetail) ? content.userFlowDetail : undefined;

  const wireframes = isRecord(content.wireframes) ? content.wireframes : undefined;

  const highFidelityDesign = isRecord(content.highFidelityDesign) ? content.highFidelityDesign : undefined;

  const renderList = (value: unknown): string[] => asStringArray(value);

  const wireframeImages = getMediaDetails(

    wireframes?.images,

    wireframes?.imageDetails,

    isPortuguese ? 'Wireframe' : 'Wireframe',

  );

  const wireframeDecisions = renderList(wireframes?.decisions);

  const hasWireframeContent = Boolean(

    wireframeImages.length ||

      wireframeDecisions.length ||

      cleanText(wireframes?.description) ||

      cleanText(wireframes?.status),

  );

  const iterations = Array.isArray(content.iterations) ? content.iterations.filter(isRecord) : [];

  const learnings = asStringArray(content.learnings);

  const nextSteps = asStringArray(content.nextSteps);

  const limitations = asStringArray(content.limitations);

  const renderMedia = (value: unknown): string[] => asStringArray(value);

  return (

    <MainLayout>

      <div className="case-study-page">

        <div className="case-study-scroll-progress" aria-hidden="true"><span /></div>

        <div className="case-study-topbar">

          <button onClick={() => navigate(-1)} className="back-button">

            <span className="back-button__circle" aria-hidden="true"><MdArrowBack /></span>

            {t('caseStudyLabels.back')}

          </button>

        </div>

        <header className="case-study-hero">

          <h1 className="case-study-title type-h1">{content.title}</h1>

          {cleanText(content.subtitle) && (

            <p className="case-study-hero__summary">{cleanText(content.subtitle)}</p>

          )}

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

            {meta.image ? <img src={meta.image} alt={content.title} /> : (

              <div className="case-study-hero__visual-placeholder" role="img" aria-label={content.title} />

            )}

          </figure>

        </header>

        <main className="case-study-content">

          <section className="case-study-section case-study-section--light">

            <div className="case-study-index">01 · {sectionLabels.overview}</div>

            <div className="case-study-module">

              <h2 className="case-study-headline type-h2">{sectionTitle('overview', copy.overview)}</h2>

              <p className="case-study-copy type-body">

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

          <section className="case-study-section case-study-section--dark case-study-section--centered">

            <div className="case-study-index case-study-index--dark">02 · {sectionLabels.challenge}</div>

            <div className="case-study-module case-study-module--dark case-study-module--centered">

              <h2 className="case-study-headline case-study-headline--dark case-study-headline--centered type-h2">
                {sectionTitle('challenge', copy.challenge)}
              </h2>

              <p className="case-study-copy case-study-copy--dark case-study-copy--centered type-body">

                {cleanText(content.challenge)}

              </p>

            </div>

          </section>

          <section className="case-study-section case-study-section--light">

            <div className="case-study-index">03 · {sectionLabels.research}</div>

            <div className="case-study-module">

              <h2 className="case-study-headline type-h2">{sectionTitle('research', copy.research)}</h2>

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

          {(personas.length || userStories.length || problemDefinitions.length || researchSynthesis || researchInterviews || researchOverview) && (

            <section className="case-study-section case-study-section--light case-study-section--research-detail">

              <div className="case-study-index">04 · {isPortuguese ? 'PESQUISA EM PROFUNDIDADE' : 'RESEARCH DEEP DIVE'}</div>

              <div className="case-study-module">

                <h2 className="case-study-headline type-h2">{sectionTitle('researchDetail', isPortuguese ? 'O QUE A PESQUISA REVELOU' : 'WHAT THE RESEARCH REVEALED')}</h2>

                {researchOverview && (

                  <div className="case-study-research-summary">

                    {Object.entries(researchOverview).filter(([key]) => !['objectives','questions','findings','quotes','limitations'].includes(key)).map(([key,value]) => {

                      const text = cleanText(value);

                      return text ? <div className="case-study-research-fact" key={key}><strong>{formatKey(key)}</strong><span>{text}</span></div> : null;

                    })}

                  </div>

                )}

                {researchInterviews && (

                  <div className="case-study-detail-block">

                    <h3>{isPortuguese ? 'Entrevistas' : 'Interviews'}</h3>

                    <div className="case-study-detail-grid">

                      {Object.entries(researchInterviews).filter(([key]) => !['questions','findings','recurringPatterns','representativeQuotes'].includes(key)).map(([key,value]) => {

                        const text = cleanText(value);

                        return text ? <div className="case-study-detail-card" key={key}><strong>{formatKey(key)}</strong><span>{text}</span></div> : null;

                      })}

                    </div>

                    {['questions','findings','recurringPatterns','representativeQuotes'].map(key => {

                      const items = renderList(researchInterviews[key]);

                      return items.length ? <div className="case-study-list-block" key={key}><h4>{formatKey(key)}</h4><ul>{items.map((item,index)=><li key={`${key}-${index}`}>{item}</li>)}</ul></div> : null;

                    })}

                  </div>

                )}

                {researchSynthesis && (

                  <div className="case-study-detail-block">

                    <h3>{isPortuguese ? 'Síntese dos dados' : 'Research synthesis'}</h3>

                    <div className="case-study-synthesis-grid">

                      {Object.entries(researchSynthesis).map(([key,value]) => {

                        const items = renderList(value);

                        return items.length ? <div className="case-study-synthesis-card" key={key}><strong>{formatKey(key)}</strong><ul>{items.map((item,index)=><li key={`${key}-${index}`}>{item}</li>)}</ul></div> : null;

                      })}

                    </div>

                  </div>

                )}

                {personas.length > 0 && (

                  <div className="case-study-detail-block">

                    <h3>{isPortuguese ? 'Persona' : 'Persona'}</h3>

                    <div className="case-study-persona-grid">

                      {personas.map((persona,index) => (

                        <article className="case-study-persona" key={String(persona.name ?? index)}>

                          <div className="case-study-persona__header"><strong>{String(persona.name ?? `Persona ${index+1}`)}</strong>{cleanText(persona.role) && <span>{cleanText(persona.role)}</span>}</div>

                          {cleanText(persona.pain) && <div><b>{t('caseStudyLabels.persona.painPoint')}</b><p>{cleanText(persona.pain)}</p></div>}

                          {cleanText(persona.goal) && <div><b>{t('caseStudyLabels.persona.goal')}</b><p>{cleanText(persona.goal)}</p></div>}

                        </article>

                      ))}

                    </div>

                  </div>

                )}

                {userStories.length > 0 && (

                  <div className="case-study-detail-block"><h3>{isPortuguese ? 'User Stories' : 'User Stories'}</h3><div className="case-study-list-cards">{userStories.map((item,index)=><div className="case-study-list-card" key={index}><strong>{cleanText(item.persona) ?? 'User'}</strong><p>{cleanText(item.story)}</p></div>)}</div></div>

                )}

                {problemDefinitions.length > 0 && (

                  <div className="case-study-detail-block"><h3>{isPortuguese ? 'Definição do problema' : 'Problem definition'}</h3><div className="case-study-list-cards">{problemDefinitions.map((item,index)=><div className="case-study-list-card" key={index}><strong>{cleanText(item.persona) ?? 'Persona'}</strong><p>{cleanText(item.definition)}</p></div>)}</div></div>

                )}

              </div>

            </section>

          )}

          <section className="case-study-section case-study-section--light">

            <div className="case-study-index">05 · {sectionLabels.define}</div>

            <div className="case-study-module">

              <h2 className="case-study-headline type-h2">{sectionTitle('define', copy.define)}</h2>

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

              06 · {sectionLabels.process}

            </div>

            <div className="case-study-module case-study-module--dark">

              <h2 className="case-study-headline case-study-headline--dark case-study-headline--big type-h2">
                {sectionTitle('process', copy.process)}
              </h2>

              {cleanText(content.process) && (
                <p className="case-study-copy case-study-copy--dark type-lead">
                  {cleanText(content.process)}
                </p>
              )}

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

            <div className="case-study-index">07 · {sectionLabels.journey}</div>

            <div className="case-study-module">

              <h2 className="case-study-headline type-h2">{sectionTitle('journey', copy.journey)}</h2>

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

            <div className="case-study-index">08 · {sectionLabels.architecture}</div>

            <div className="case-study-module">

              <h2 className="case-study-headline type-h2">{sectionTitle('architecture', copy.architecture)}</h2>

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

          {(userJourney.length || howMightWe.length || ideation || informationArchitecture || userFlowDetail) && (

            <section className="case-study-section case-study-section--light case-study-section--method-detail">

              <div className="case-study-index">08A · {isPortuguese ? 'DEFINIÇÃO & ESTRUTURA' : 'DEFINE & STRUCTURE'}</div>

              <div className="case-study-module">

                <h2 className="case-study-headline type-h2">{sectionTitle('methodDetail', isPortuguese ? 'DA PESQUISA À ESTRUTURA' : 'FROM RESEARCH TO STRUCTURE')}</h2>

                {userJourney.length > 0 && <div className="case-study-detail-block"><h3>{sectionLabels.journey}</h3><div className="case-study-journey-detail-grid">{userJourney.map((step,index)=><article key={index}><strong>{cleanText(step.stage) ?? `Stage ${index+1}`}</strong>{['userAction','thought','emotion','painPoint','opportunity'].map(key=>cleanText(step[key]) ? <p key={key}><b>{formatKey(key)}:</b> {cleanText(step[key])}</p> : null)}</article>)}</div></div>}

                {howMightWe.length > 0 && <div className="case-study-detail-block"><h3>How Might We</h3><div className="case-study-hmw">{howMightWe.map((item,index)=><p key={index}>{item}</p>)}</div></div>}

                {ideation && <div className="case-study-detail-block"><h3>{isPortuguese ? 'Ideação' : 'Ideation'}</h3><div className="case-study-synthesis-grid">{Object.entries(ideation).map(([key,value])=>{const items=renderList(value); const text=cleanText(value); return items.length ? <div className="case-study-synthesis-card" key={key}><strong>{formatKey(key)}</strong><ul>{items.map((item,index)=><li key={index}>{item}</li>)}</ul></div> : text ? <div className="case-study-synthesis-card" key={key}><strong>{formatKey(key)}</strong><p>{text}</p></div> : null;})}</div></div>}

                {informationArchitecture && <div className="case-study-detail-block"><h3>{sectionLabels.architecture}</h3>{cleanText(informationArchitecture.image) && <figure className="case-study-media-single"><img src={cleanText(informationArchitecture.image)} alt={`${content.title} information architecture`} /></figure>}<div className="case-study-synthesis-grid">{Object.entries(informationArchitecture).filter(([key])=>key!=='image').map(([key,value])=>{const items=renderList(value); const text=cleanText(value); return items.length ? <div className="case-study-synthesis-card" key={key}><strong>{formatKey(key)}</strong><ul>{items.map((item,index)=><li key={index}>{item}</li>)}</ul></div> : text ? <div className="case-study-synthesis-card" key={key}><strong>{formatKey(key)}</strong><p>{text}</p></div> : null;})}</div></div>}

                {content.problemStatement && <div className="case-study-detail-block"><h3>Problem Statement</h3><div className="case-study-synthesis-grid">{Object.entries(content.problemStatement).filter(([key])=>key!=='finalStatement').map(([key,value])=>{const text=cleanText(value); return text ? <div className="case-study-synthesis-card" key={key}><strong>{formatKey(key)}</strong><p>{text}</p></div> : null;})}</div>{cleanText(content.problemStatement.finalStatement) && <div className="case-study-hmw"><p>{cleanText(content.problemStatement.finalStatement)}</p></div>}</div>}

                {content.paperSketches && <div className="case-study-detail-block"><h3>Paper Sketches</h3>{cleanText(content.paperSketches.description) && <p className="case-study-copy">{cleanText(content.paperSketches.description)}</p>}{renderMedia(content.paperSketches.images).length>0 && <div className="case-study-media-grid">{renderMedia(content.paperSketches.images).map((src,index)=><figure key={src+index}><img src={src} alt={`${content.title} paper sketch ${index+1}`} /></figure>)}</div>}{renderList(content.paperSketches.keyDecisions).length>0 && <ul className="case-study-detail-list">{renderList(content.paperSketches.keyDecisions).map((item,index)=><li key={index}>{item}</li>)}</ul>}</div>}

                {userFlowDetail && cleanText(userFlowDetail.description) && <div className="case-study-detail-block"><h3>{sectionLabels.journey}</h3><p className="case-study-copy">{cleanText(userFlowDetail.description)}</p></div>}

              </div>

            </section>

          )}

          {hasWireframeContent && (

            <section className="case-study-section case-study-section--light">

              <div className="case-study-index">09 · {sectionLabels.wireframes}</div>

              <div className="case-study-module">

                <h2 className="case-study-headline type-h2">{sectionTitle('wireframes', copy.wireframes)}</h2>

                {cleanText(wireframes?.status) && (

                  <p className="case-study-copy">{cleanText(wireframes?.status)}</p>

                )}

                {cleanText(wireframes?.description) && (

                  <p className="case-study-copy">{cleanText(wireframes?.description)}</p>

                )}

                {wireframeImages.length > 0 && (

                  <div className="case-study-media-grid">

                    {wireframeImages.map((image) => (

                      <figure key={image.src}>

                        <img src={image.src} alt={image.title} />

                        <figcaption>

                          <strong>{image.title}</strong>

                          {image.description && <span>{image.description}</span>}

                          {image.decision && <span><b>{isPortuguese ? 'Decisão' : 'Decision'}:</b> {image.decision}</span>}

                        </figcaption>

                      </figure>

                    ))}

                  </div>

                )}

                {wireframeDecisions.length > 0 && (

                  <ul className="case-study-detail-list">

                    {wireframeDecisions.map((decision) => <li key={decision}>{decision}</li>)}

                  </ul>

                )}

              </div>

            </section>

          )}

          {validationCards.length > 0 && <section className="case-study-section case-study-section--dark">

            <div className="case-study-index case-study-index--dark">

              10 · {sectionLabels.validation}

            </div>

            <div className="case-study-module case-study-module--dark">

              <h2 className="case-study-headline case-study-headline--dark type-h2">{sectionTitle('validation', copy.validation)}</h2>

              <div className="case-study-validation-grid">

                {validationCards.map((item, index) => (

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

                    <p>{cleanText(content.finalProject) ?? copy.conceptual}</p>

                  </div>

                </div>

              )}

            </div>

          </section>}

          {(resultItems.length > 0 || cleanText(content.conclusion) || cleanText(content.finalProject)) && (

          <section className="case-study-section case-study-section--light case-study-section--result">

            <div className="case-study-index">11 · {sectionLabels.result}</div>

            <div className="case-study-module">

              <h2 className="case-study-headline type-h2">{sectionTitle('results', copy.results)}</h2>

              <div className="case-study-result-grid">

                {resultItems.map((item, index) => (

                  <div className="case-study-result-card" key={`${item.label}-${index}`}>

                    <strong>{item.label}</strong>

                    <span>{item.text}</span>

                  </div>

                ))}

              </div>

            </div>

          </section>

          )}

          {(highFidelityDesign || iterations.length || learnings.length || nextSteps.length || limitations.length) && (

            <section className="case-study-section case-study-section--light case-study-section--detail-end">

              <div className="case-study-index">11A · {isPortuguese ? 'DETALHES DO DESIGN' : 'DESIGN DETAILS'}</div>

              <div className="case-study-module">

                <h2 className="case-study-headline type-h2">{sectionTitle('designDetails', isPortuguese ? 'DO WIREFRAME À ITERAÇÃO' : 'FROM WIREFRAME TO ITERATION')}</h2>

                {highFidelityDesign && <div className="case-study-detail-block"><h3>{sectionLabels.highFidelityDesign ?? 'High-Fidelity Design'}</h3>{renderMedia(highFidelityDesign.screenshots).length>0 && <div className="case-study-media-grid">{renderMedia(highFidelityDesign.screenshots).map((src,index)=><figure key={src+index}><img src={src} alt={`${content.title} high-fidelity screen ${index+1}`} /></figure>)}</div>}<div className="case-study-synthesis-grid">{Object.entries(highFidelityDesign).filter(([key])=>!['screenshots','prototype'].includes(key)).map(([key,value])=>{const items=renderList(value); const text=cleanText(value); return items.length ? <div className="case-study-synthesis-card" key={key}><strong>{formatKey(key)}</strong><ul>{items.map((item,index)=><li key={index}>{item}</li>)}</ul></div> : text ? <div className="case-study-synthesis-card" key={key}><strong>{formatKey(key)}</strong><p>{text}</p></div> : null;})}</div></div>}

                {iterations.length>0 && <div className="case-study-detail-block"><h3>{sectionLabels.iterations ?? 'Iterations'}</h3><div className="case-study-iteration-grid">{iterations.map((item,index)=><article key={index}>{['before','problem','decision','after'].map(key=>cleanText(item[key]) ? <div key={key}><b>{formatKey(key)}</b><p>{cleanText(item[key])}</p></div> : null)}</article>)}</div></div>}

                {learnings.length>0 && <div className="case-study-detail-block"><h3>{sectionLabels.learnings ?? 'Learnings'}</h3><ul className="case-study-detail-list">{learnings.map((item,index)=><li key={index}>{item}</li>)}</ul></div>}

                {nextSteps.length>0 && <div className="case-study-detail-block"><h3>{sectionLabels.nextSteps ?? 'Next Steps'}</h3><ul className="case-study-detail-list">{nextSteps.map((item,index)=><li key={index}>{item}</li>)}</ul></div>}

                {limitations.length>0 && <div className="case-study-detail-block"><h3>{sectionLabels.limitations ?? 'Limitations'}</h3><ul className="case-study-detail-list">{limitations.map((item,index)=><li key={index}>{item}</li>)}</ul></div>}

              </div>

            </section>

          )}

        </main>

        <footer className="case-study-footer">

          <div className="case-study-conclusion">

            <span className="case-study-conclusion__label">

              {isPortuguese ? 'Conclusão' : 'Conclusion'}

            </span>

            <h2 className="case-study-conclusion__title type-h2">
              {sectionTitle('conclusion', isPortuguese ? 'Conclusão' : 'Conclusion')}
            </h2>

            <p className="case-study-conclusion__copy type-body">

              {cleanText(content.conclusion) ?? cleanText(content.finalProject)}

            </p>

          </div>

          <button onClick={() => navigate('/')} className="btn-back-projects">

            {t('caseStudyLabels.seeMoreProjects')}

            <span className="btn-back-projects__circle" aria-hidden="true">↗</span>

          </button>

        </footer>

        <FooterSection />

      </div>

    </MainLayout>

  );

};
