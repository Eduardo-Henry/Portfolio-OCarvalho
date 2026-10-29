import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import './CaseStudiesSection.css';

import { NavPill, Carousel } from '../../molecules';
import { Button } from '../../atoms';
import TIHelpImg from '../../../assets/images/TIHelp.png';
import Kaloburn from '../../../assets/images/KaloBurn.png';
import Orbeanjeans from '../../../assets/images/OrbeanJeans.png';
import RealStateImg from '../../../assets/images/RealState.png';
import SolarPanelImg from '../../../assets/images/SolarPanel.png';
import ElvisCoverImg from '../../../assets/images/ElvisCover.png';

import HappyEasterVideo from '../../../assets/Videos/HappyEaster.mp4';
import OtavioVideo from '../../../assets/Videos/Otavio.mp4';
import SalesVideo from '../../../assets/Videos/Sales.mp4';
import TrevoElvisVideo from '../../../assets/Videos/TrevoElvis.mp4';
import StreetsVideos from '../../../assets/Videos/StreetsRP.mp4';

import AdoreNossoDeusImg from '../../../assets/images/AdoreNossoDeus.webp';
import As99Img from '../../../assets/images/As99.webp';
import CeiaLeaoJudaImg from '../../../assets/images/CeiaLeaoJuda.webp';
import CordeiroSantoImg from '../../../assets/images/CordeiroSanto.webp';
import Cr7CameloImg from '../../../assets/images/Cr7Camelo.webp';
import CultoDaFamiliaImg from '../../../assets/images/CultoDaFml.jpg';
import CultoDeLibertacaoWebpImg from '../../../assets/images/cultoDeLibertação.webp';
import CultoLibertacaoAmadoImg from '../../../assets/images/CultoLibertacaoAmado.webp';
import CultoMissoesVerdeImg from '../../../assets/images/CultoMissoesVerde.webp';
import DeusEstaConoscoImg from '../../../assets/images/DeusEstaConosco.webp';
import DeusPoderosoImg from '../../../assets/images/DeusPoderoso.webp';
import DeusQueMeAbracaImg from '../../../assets/images/DeusQueMeAbaraca.webp';
import EleDeixouAs99WebpImg from '../../../assets/images/EleDeixouAs99.jpg';
import CeiaDoFortalecimentoImg from '../../../assets/images/CeiaFortalecimento.webp';
import ColiseuImg from '../../../assets/images/coliseu.webp';
import CultoDeJovensImg from '../../../assets/images/CultoDeJovens.jpg';
import CultoDeLibertacaoImg from '../../../assets/images/cultoDeLibertação.jpg';
import JesusEstaNoDesertroImg from '../../../assets/images/JesusEstaNoDeserto.jpg';
import JesusMichelBasquiartReferenceImg from '../../../assets/images/JesusMichelBasquiartReference.jpg';
import MaosCultoDeLibertacaoImg from '../../../assets/images/MaosCultoDeLibertacao.jpg';
import MissoesImg from '../../../assets/images/Missões.webp';
import NovosHorizontesImg from '../../../assets/images/NovosHorizontes.webp';
import OTempoCertoImg from '../../../assets/images/O Tempo Certo (3).webp';
import SantaCeiaImg from '../../../assets/images/santaCeia.webp';
import ArgentinaImg from '../../../assets/images/argentina.jpg';
import DembeleImg from '../../../assets/images/dembele.jpg';
import DonDoueImg from '../../../assets/images/don doue.jpg';
import GauchoImg from '../../../assets/images/gaucho.jpg';
import ManchesterCityImg from '../../../assets/images/Manchester City.jpg';
import MessiImg from '../../../assets/images/Messi.jpg';
import LamineYamalImg from '../../../assets/images/LamineYamalEspanha.webp';
import LebronJamesImg from '../../../assets/images/LeBron.png';
import KyrieIrvingImg from '../../../assets/images/kyrie.jpg';

interface CaseStudy {
  id: string;
  image: string;
  prototypeUrl?: string;
  title?: string;
  description?: string;
  tag?: string;
}

interface Video {
  id: string;
  title: string;
  src: string;
}

interface CaseStudiesSectionProps {
  id?: string;
  caseStudies?: CaseStudy[];
  videos?: Video[];
}

/**
 * IMPORTANTE: os IDs abaixo precisam bater exatamente com as chaves do
 * objeto `caseStudies` em src/pages/CaseStudyPage/CaseStudyPage.tsx.
 * Mapeamento atual:
 * '1' = TI Help | '2' = KaloBurn | '3' = DN Jeans | '4' = ImovePro
 * '5' = Yacht Booking | '6' = Solar Panel Monitoring (fictional/template)
 */
const defaultCaseStudies: CaseStudy[] = [
  {
    id: '1',
    image: TIHelpImg,
    tag: 'UX/UI Design · Mobile App',
    title: 'TI Help',
    description:
      'Sistema integrado de suporte técnico que centraliza a abertura e o acompanhamento de chamados, com fluxos específicos para solicitantes, técnicos e administradores.',
    prototypeUrl:
      'https://www.figma.com/proto/fw2bexpovuRBEjPGqDwRW3/PIM-3%C2%B0-SEM?node-id=1158-457&p=f&t=pv64Gtc7MDHmRbCO-0&scaling=scale-down&content-scaling=fixed&page-id=0%3A1&starting-point-node-id=1158%3A457',
  },
  {
    id: '2',
    image: Kaloburn,
    tag: 'UX/UI Design · Fitness',
    title: 'Kalo Burn',
    description:
      'Marketplace fitness com planos, acompanhamento e personalização para treino e evolução contínua.',
    prototypeUrl: 'https://www.figma.com/proto/nfQdsEFYEm9pVEjSjPSdcz',
  },
  {
    id: '3',
    image: Orbeanjeans,
    tag: 'UX Estratégico · Catálogo Digital',
    title: 'Orbean Jeans',
    description:
      'Catálogo conversacional mobile-first, substituindo checkout tradicional por conversão direta via WhatsApp.',
    prototypeUrl: 'https://www.figma.com/proto/uPJ99JDTyjMPamkJnS9FTu',
  },
  {
    id: '7',
    image: ElvisCoverImg,
    tag: 'Social Media Design',
    title: 'Elvis Social',
    description:
      'Estratégia editorial e visual para organizar conteúdo, reforçar a comunicação do mandato e ampliar o alcance no Instagram.',
    prototypeUrl: 'https://www.instagram.com/vereador.elvis/?hl=pt-br',
  },
  {
    id: '6',
    image: SolarPanelImg,
    tag: 'UX/UI Design · Dashboard',
    title: 'Solar',
    description:
      'Dashboard conceitual para acompanhar produção, consumo, status do sistema e histórico de energia solar.',
    prototypeUrl: 'https://www.figma.com/proto/sXLh6cXRhiGBx6l1Ot8war/',
  },
  {
    id: '4',
    image: RealStateImg,
    tag: 'UX/UI Design · Real Estate Marketplace',
    title: 'ImovePro',
    description:
      'Uma plataforma imobiliária que conecta pessoas interessadas em comprar ou alugar imóveis a proprietários, consultores independentes e imobiliárias, com foco em proximidade, flexibilidade e organização.',
  },
];

const defaultVideos: Video[] = [
  { id: '1', title: 'Happy Easter', src: HappyEasterVideo },
  { id: '2', title: 'Sales', src: SalesVideo },
  { id: '3', title: 'Streets RP', src: StreetsVideos },
  { id: '4', title: 'Trevo Elvis', src: TrevoElvisVideo },
  { id: '5', title: 'Otavio', src: OtavioVideo },
];

const socialMediaCarouselImages = [
  // Designs religiosos
  AdoreNossoDeusImg,
  As99Img,
  CeiaDoFortalecimentoImg,
  CeiaLeaoJudaImg,
  ColiseuImg,
  CordeiroSantoImg,
  CultoDaFamiliaImg,
  CultoDeJovensImg,
  CultoDeLibertacaoImg,
  CultoLibertacaoAmadoImg,
  CultoMissoesVerdeImg,
  DeusEstaConoscoImg,
  DeusPoderosoImg,
  DeusQueMeAbracaImg,
  EleDeixouAs99WebpImg,
  JesusEstaNoDesertroImg,
  JesusMichelBasquiartReferenceImg,
  MaosCultoDeLibertacaoImg,
  MissoesImg,
  NovosHorizontesImg,
  OTempoCertoImg,
  SantaCeiaImg,

  // Designs esportivos
  ArgentinaImg,
  Cr7CameloImg,
  DembeleImg,
  DonDoueImg,
  GauchoImg,
  ManchesterCityImg,
  MessiImg,
  LamineYamalImg,
  LebronJamesImg,
  KyrieIrvingImg,
];


export const CaseStudiesSection: React.FC<CaseStudiesSectionProps> = ({
  id,
  caseStudies = defaultCaseStudies,
  videos = defaultVideos,
}) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [selectedCategory, setSelectedCategory] = useState('all');

  const [mutedVideos, setMutedVideos] = useState<Record<string, boolean>>(
    () => Object.fromEntries(videos.map((video) => [video.id, true]))
  );

  const [count, setCount] = useState<number>(0);

  const sectionRef = useRef<HTMLElement>(null);

  const targetCount = 52;

  useEffect(() => {
    const currentSection = sectionRef.current;

    if (!currentSection) return;

    let frame = 0;
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;

        if (entry.isIntersecting) {
          if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            setCount(targetCount);
            observer.unobserve(currentSection);
            return;
          }

          const duration = 2500;
          const startTime = performance.now();

          const animate = (currentTime: number) => {
            const elapsed = currentTime - startTime;

            const progress = Math.min(
              elapsed / duration,
              1
            );

            const easeOutQuad = (t: number) =>
              t * (2 - t);

            const currentCount = Math.floor(
              easeOutQuad(progress) * targetCount
            );

            setCount(currentCount);

            if (progress < 1) {
              frame = requestAnimationFrame(animate);
            }
          };

          frame = requestAnimationFrame(animate);
          observer.unobserve(currentSection);
        }
      },
      {
        threshold: 0.15,
      }
    );

    observer.observe(currentSection);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => {
    const root = sectionRef.current;

    if (!root) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const elements = root.querySelectorAll<HTMLElement>(
      '.scroll-reveal, .case-studies-header, .case-studies-filter, .case-studies-carousel-wrapper'
    );

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: '0px 0px -8% 0px',
      }
    );

    elements.forEach((element, index) => {
      element.style.setProperty(
        '--reveal-delay',
        `${Math.min(index * 70, 420)}ms`
      );

      observer.observe(element);
    });

    return () => observer.disconnect();
  }, [selectedCategory]);

  useEffect(() => {
    const root = sectionRef.current;

    if (!root) return;

    let frame = 0;

    const handleScroll = () => {
      cancelAnimationFrame(frame);

      frame = requestAnimationFrame(() => {
        root
          .querySelectorAll<HTMLElement>(
            '.case-card__image'
          )
          .forEach((image) => {
            const rect =
              image.getBoundingClientRect();

            const viewport =
              window.innerHeight || 1;

            const offset =
              (rect.top +
                rect.height / 2 -
                viewport / 2) /
              viewport;

            image.style.setProperty(
              '--card-parallax',
              `${Math.max(
                -10,
                Math.min(10, offset * -8)
              )}px`
            );
          });
      });
    };

    handleScroll();

    window.addEventListener(
      'scroll',
      handleScroll,
      {
        passive: true,
      }
    );

    return () => {
      cancelAnimationFrame(frame);

      window.removeEventListener(
        'scroll',
        handleScroll
      );
    };
  }, [selectedCategory]);

  const categories = [
    {
      id: 'all',
      label: t(
        'caseStudies.categories.uxDesign'
      ),
    },
    {
      id: 'web',
      label: t(
        'caseStudies.categories.videoEdit'
      ),
    },
    {
      id: 'mobile',
      label: t(
        'caseStudies.categories.socialMedia'
      ),
    },
  ];

  // Título sempre fixo
  const dynamicTitle = 'Portfolio';

  const handleCategoryChange = (
    categoryId: string
  ) => {
    setSelectedCategory(categoryId);
  };

  const toggleMute = (videoId: string) => {
    setMutedVideos((prev) => {
      const currentMuted = prev[videoId] ?? true;
      return { ...prev, [videoId]: !currentMuted };
    });
  };

  const handleWatchPrototype = (
    e: React.MouseEvent,
    prototypeUrl?: string
  ) => {
    e.stopPropagation();

    if (prototypeUrl) {
      window.open(
        prototypeUrl,
        '_blank',
        'noopener,noreferrer'
      );
    }
  };

  const handleSeeProject = (
    e: React.MouseEvent,
    id: string
  ) => {
    e.stopPropagation();

    navigate(
      `/case-studies/${id}`
    );
  };

  return (
    <section
      className="case-studies-section"
      id={id}
      ref={sectionRef}
    >
      <div className="case-studies-container">

        <div className="case-studies-header">

          {/* CONTADOR ACIMA DO H1 */}
          <div className="case-studies-counter">
            {t(
              'caseStudies.projectsCount',
              { count }
            )}
          </div>

          {/* H1 */}
          <div className="case-studies-title-wrapper">
            <h2 className="case-studies-title">
              {dynamicTitle}
            </h2>
          </div>

        </div>

        <div className="case-studies-filter">
          <NavPill
            items={categories}
            onSelect={handleCategoryChange}
          />
        </div>

        {selectedCategory === 'mobile' ? (
          <div className="case-studies-carousel-wrapper scroll-reveal">
            <Carousel
              images={
                socialMediaCarouselImages
              }
            />
          </div>
        ) : selectedCategory === 'web' ? (
          <div className="case-studies-grid">

            {videos.map((video) => {
              const isMuted =
                mutedVideos[video.id] ??
                true;

              return (
                <div
                  key={video.id}
                  className="case-study-card video-card scroll-reveal"
                  id={`video-${video.id}`}
                  style={{
                    position: 'relative',
                  }}
                >
                  <video
                    autoPlay
                    muted={isMuted}
                    loop
                    playsInline
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                    }}
                  >
                    <source
                      src={video.src}
                      type="video/mp4"
                    />

                    {t(
                      'caseStudies.videoNotSupported'
                    )}
                  </video>

                  <button
                    onClick={() =>
                      toggleMute(
                        video.id
                      )
                    }
                    aria-label={`${isMuted ? t('caseStudies.unmute') : t('caseStudies.mute')} ${video.title}`}
                    aria-pressed={!isMuted}
                    className="video-audio-toggle-btn"
                    style={{
                      position:
                        'absolute',
                      bottom: '15px',
                      right: '15px',
                      zIndex: 10,
                      background:
                        'rgba(0, 0, 0, 0.7)',
                      color: '#fff',
                      border: 'none',
                      borderRadius:
                        '50px',
                      padding:
                        '8px 14px',
                      cursor: 'pointer',
                      fontSize: '12px',
                      fontWeight: 'bold',
                      display: 'flex',
                      alignItems:
                        'center',
                      gap: '6px',
                      backdropFilter:
                        'blur(4px)',
                      transition:
                        'background 0.2s ease',
                    }}
                  >
                    {isMuted
                      ? t(
                          'caseStudies.unmute'
                        )
                      : t(
                          'caseStudies.mute'
                        )}
                  </button>
                </div>
              );
            })}

          </div>
        ) : (
          <div className="case-studies-grid">

            {caseStudies.map(
              (caseStudy) => (
                <div
                  key={caseStudy.id}
                  className="case-study-card scroll-reveal"
                  id={`project-${caseStudy.id}`}
                >

                  {/* Imagem com overlay de hover (desktop) */}
                  <div className="case-card__image">
                    <img
                      src={caseStudy.image}
                      alt={caseStudy.title || 'Case study'}
                      className="case-card__image-media"
                    />
                    <div className="case-card__overlay">

                      <Button
                        variant="secondary"
                        size="medium"
                        className="case-card__watch-btn"
                        onClick={(e) =>
                          handleWatchPrototype(
                            e,
                            caseStudy.prototypeUrl
                          )
                        }
                      >
                        <span className="case-card__play-circle">
                          <svg
                            viewBox="0 0 24 24"
                            fill="white"
                            width="14"
                            height="14"
                          >
                            <polygon points="6,4 20,12 6,20" />
                          </svg>
                        </span>

                        {t(
                          'caseStudies.watchPrototype'
                        )}
                      </Button>

                      <Button
                        variant="primary"
                        size="medium"
                        className="case-card__see-btn"
                        onClick={(e) =>
                          handleSeeProject(
                            e,
                            caseStudy.id
                          )
                        }
                      >
                        {t(
                          'caseStudies.viewProject'
                        )}

                        <span className="case-card__arrow-circle">
                          <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            width="16"
                            height="16"
                            stroke="white"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <line
                              x1="7"
                              y1="17"
                              x2="17"
                              y2="7"
                            />

                            <polyline points="7 7 17 7 17 17" />
                          </svg>
                        </span>
                      </Button>

                    </div>
                  </div>

                  {/* Botões mobile — sempre visíveis abaixo da imagem */}
                  <div className="case-card__actions">

                    {/* Texto: tag + título + descrição */}
                    <div className="case-card__info">

                      {caseStudy.tag && (
                        <span className="case-card__tag">
                          {caseStudy.tag}
                        </span>
                      )}

                      {caseStudy.title && (
                        <h3 className="case-card__title">
                          {caseStudy.title}
                        </h3>
                      )}

                      {caseStudy.description && (
                        <p className="case-card__desc">
                          {caseStudy.description}
                        </p>
                      )}

                    </div>

                    {/* Botões */}
                    <div className="case-card__buttons">

                      <Button
                        variant="secondary"
                        size="medium"
                        className="case-card__watch-btn case-card__watch-btn--mobile"
                        onClick={(e) =>
                          handleWatchPrototype(
                            e,
                            caseStudy.prototypeUrl
                          )
                        }
                      >
                        <span className="case-card__play-circle">
                          <svg
                            viewBox="0 0 24 24"
                            fill="white"
                            width="14"
                            height="14"
                          >
                            <polygon points="6,4 20,12 6,20" />
                          </svg>
                        </span>

                        {t(
                          'caseStudies.watchPrototype'
                        )}
                      </Button>

                      <Button
                        variant="primary"
                        size="medium"
                        className="case-card__see-btn case-card__see-btn--mobile"
                        onClick={(e) =>
                          handleSeeProject(
                            e,
                            caseStudy.id
                          )
                        }
                      >
                        {t(
                          'caseStudies.viewProject'
                        )}

                        <span className="case-card__arrow-circle">
                          <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            width="16"
                            height="16"
                            stroke="white"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <line
                              x1="7"
                              y1="17"
                              x2="17"
                              y2="7"
                            />

                            <polyline points="7 7 17 7 17 17" />
                          </svg>
                        </span>
                      </Button>

                    </div>

                  </div>

                </div>
              )
            )}

          </div>
        )}

      </div>
    </section>
  );
};
