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
import LinkedInIcon from '@/assets/icons/iconLinkedin.svg?react';
import InstagramIcon from '@/assets/icons/iconInstagram.svg?react';
import BehanceIcon from '@/assets/icons/iconBehance.svg?react';
import GitHubIcon from '@/assets/icons/iconGithub.svg?react';

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

const PortfolioFooter: React.FC = () => {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { id: 'linkedin', icon: LinkedInIcon, url: 'https://www.linkedin.com/in/eduardohenrycarvalho/?locale=pt', title: 'LinkedIn' },
    { id: 'instagram', icon: InstagramIcon, url: 'https://www.instagram.com/ocarvalho.dzn/', title: 'Instagram' },
    { id: 'behance', icon: BehanceIcon, url: 'https://www.behance.net/eduardohenry1', title: 'Behance' },
    { id: 'github', icon: GitHubIcon, url: 'https://github.com', title: 'GitHub' },
  ];

  return (
    <footer className="portfolio-footer">
      <div className="portfolio-footer__container">
        <div className="portfolio-footer__content">
          <div className="portfolio-footer__column portfolio-footer__brand">
            <h3>EDUARDO</h3>
            <p>{t('footer.description')}</p>
          </div>
          <div className="portfolio-footer__column">
            <h4>{t('footer.nav.title')}</h4>
            <nav>
              <a href="/#home">{t('footer.nav.home')}</a>
              <a href="/#about">{t('footer.nav.about')}</a>
              <a href="/#skills">{t('footer.nav.skills')}</a>
              <a href="/#works">{t('footer.nav.works')}</a>
            </nav>
          </div>
          <div className="portfolio-footer__column">
            <h4>{t('footer.social')}</h4>
            <div className="portfolio-footer__social">
              {socialLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <a key={link.id} href={link.url} target="_blank" rel="noopener noreferrer" aria-label={link.title} title={link.title}>
                    <Icon className="portfolio-footer__social-icon" />
                  </a>
                );
              })}
            </div>
          </div>
          <div className="portfolio-footer__column">
            <h4>{t('footer.contact')}</h4>
            <a className="portfolio-footer__email" href="mailto:du.h.c.oliveira17@gmail.com">du.h.c.oliveira17@gmail.com</a>
          </div>
        </div>
        <div className="portfolio-footer__bottom">
          <p>{t('footer.copyright', { year: currentYear })}</p>
          <div>
            <a href="#">{t('footer.privacyPolicy')}</a>
            <a href="#">{t('footer.termsOfService')}</a>
          </div>
        </div>
      </div>
    </footer>
  );
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
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });

    const page = document.querySelector<HTMLElement>('.case-study-page');
    if (!page) return;

    const sections = Array.from(
      page.querySelectorAll<HTMLElement>('.case-study-content > .case-study-section'),
    );

    // Reveal only every other section. Do not attach reveal to individual children,
    // the hero or the footer, so the page keeps the editorial rhythm of the reference.
    const revealItems = sections.filter((_, index) => index % 2 === 0);
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
    architecture: isPortuguese ? 'O PRODUTO GIRA EM TORNO DE TRÊS PERGUNTAS.' : 'THE PRODUCT REVOLVES AROUND THREE QUESTIONS.',
    wireframes: isPortuguese ? 'ESTRUTURA ANTES DO ACABAMENTO.' : 'STRUCTURE BEFORE THE FINISH.',
    validation: isPortuguese ? 'INSIGHTS DO PROJETO' : 'PROJECT INSIGHTS',
    results: isPortuguese ? 'MENOS INTERPRETAÇÃO. MAIS AÇÃO.' : 'LESS INTERPRETATION. MORE ACTION.',
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
  const validationItems = allValidationItems
    .filter((item) => /testing|insight|validation|validação/i.test(item.label) || /recomenda|métrica|metric|recommend/i.test(item.text))
    .slice(0, 2);
  const fallbackValidationItems = allValidationItems.slice(0, 2);
  const validationCards = validationItems.length === 2 ? validationItems : fallbackValidationItems;

  const resultItems = (content.results ?? [])
    .flatMap((result) => findSectionItems(result))
    .slice(0, 4);
  if (!resultItems.length && cleanText(content.finalProject)) {
    resultItems.push({ label: copy.outcome, text: cleanText(content.finalProject) as string });
  }
  if (resultItems.length < 4 && cleanText(content.conclusion)) {
    const conclusionParts = (cleanText(content.conclusion) as string)
      .split(/(?<=[.!?])\s+/)
      .map((text) => text.trim())
      .filter(Boolean);
    conclusionParts.slice(0, 4 - resultItems.length).forEach((text, index) => {
      resultItems.push({
        label: isPortuguese ? `Resultado ${resultItems.length + 1}` : `Result ${resultItems.length + 1}`,
        text,
      });
    });
  }

  const challengeQuote = id === '2'
    ? (isPortuguese
      ? '“Eu vejo os números, mas não sei o que realmente importa hoje.”'
      : '“I see the numbers, but I do not know what really matters today.”')
    : undefined;

  const getChallengeHeadline = (value: unknown): string => {
    const text = cleanText(value) ?? '';
    const firstSentence = text.split(/[.!?](?:\s|$)/)[0].trim();
    if (firstSentence.length <= 92) return firstSentence;
    const cut = firstSentence.slice(0, 92);
    const lastSpace = cut.lastIndexOf(' ');
    return `${cut.slice(0, lastSpace > 50 ? lastSpace : 92).trim()}…`;
  };

  return (
    <MainLayout>
      <div className="case-study-page">
        <div className="case-study-scroll-progress" aria-hidden="true"><span /></div>
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
            <div className="case-study-index">01 · {sectionLabels.overview}</div>

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

          <section className="case-study-section case-study-section--dark case-study-section--centered">
            <div className="case-study-index case-study-index--dark">02 · {sectionLabels.challenge}</div>

            <div className="case-study-module case-study-module--dark case-study-module--centered">
              <h2 className="case-study-headline case-study-headline--dark case-study-headline--centered">
                {getChallengeHeadline(content.challenge).toUpperCase()}
              </h2>

              <p className="case-study-copy case-study-copy--dark case-study-copy--centered">
                {cleanText(content.challenge)}
              </p>

              {challengeQuote && (
                <blockquote className="case-study-quote-box">
                  {challengeQuote}
                </blockquote>
              )}
            </div>
          </section>

          <section className="case-study-section case-study-section--light">
            <div className="case-study-index">03 · {sectionLabels.research}</div>

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
            <div className="case-study-index">04 · {sectionLabels.define}</div>

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
              05 · {sectionLabels.process}
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
            <div className="case-study-index">06 · {sectionLabels.journey}</div>

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
            <div className="case-study-index">07 · {sectionLabels.architecture}</div>

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
            <div className="case-study-index">08 · {sectionLabels.wireframes}</div>

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
              09 · {sectionLabels.validation}
            </div>

            <div className="case-study-module case-study-module--dark">
              <h2 className="case-study-headline case-study-headline--dark">{copy.validation}</h2>

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
                    <p>{cleanText(content.conclusion) ?? copy.conceptual}</p>
                  </div>
                </div>
              )}
            </div>
          </section>

          <section className="case-study-section case-study-section--light case-study-section--result">
            <div className="case-study-index">10 · {sectionLabels.result}</div>

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

        <PortfolioFooter />
      </div>
    </MainLayout>
  );
};