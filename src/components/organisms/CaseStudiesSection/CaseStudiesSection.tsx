import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import './CaseStudiesSection.css';

import { NavPill, Carousel } from '../../molecules';
import { Button } from '../../atoms';
import TIHelpImg from '../../../assets/images/TIHelp.png';
import Kaloburn from '../../../assets/images/KaloBurn.png';
import DNJeansImg from '../../../assets/images/DNJeans.png';
import RealStateImg from '../../../assets/images/RealState.png';
import YatchImg from '../../../assets/images/Yatch.jpeg';
import SolarPanelImg from '../../../assets/images/SolarPanel.png';

import HappyEasterVideo from '../../../assets/Videos/HappyEaster.mp4';
import OtavioVideo from '../../../assets/Videos/Otavio.mp4';
import SalesVideo from '../../../assets/Videos/Sales.mp4';
import TrevoElvisVideo from '../../../assets/Videos/TrevoElvis.mp4';
import StreetsVideos from '../../../assets/Videos/StreetsRP.mp4';

import CeiaDoFortalecimentoImg from '../../../assets/images/CeiaDoFortalecimento.jpg';
import ColiseuImg from '../../../assets/images/coliseu.jpg';
import CordeiroCoroaImg from '../../../assets/images/CordeiroCoroa.jpg';
import CultoDaFmlImg from '../../../assets/images/CultoDaFml.jpg';
import CultoDeJovensImg from '../../../assets/images/CultoDeJovens.jpg';
import CultoDeLibertacaoImg from '../../../assets/images/cultoDeLibertação.jpg';
import EleDeixouAs99Img from '../../../assets/images/EleDeixouAs99.jpg';
import JesusEstaNoDesertroImg from '../../../assets/images/JesusEstaNoDeserto.jpg';
import JesusMichelBasquiartReferenceImg from '../../../assets/images/JesusMichelBasquiartReference.jpg';
import KaueVermelhoImg from '../../../assets/images/KaueVermelho.jpg';
import MaosCultoDeLibertacaoImg from '../../../assets/images/MaosCultoDeLibertacao.jpg';
import MissoesImg from '../../../assets/images/Missões.jpg';
import NotblindImg from '../../../assets/images/notblind.jpg';
import NovosHorizontesImg from '../../../assets/images/NovosHorizontes.jpg';
import OTempoCertoImg from '../../../assets/images/OTempoCerto.jpg';
import SantaCeiaImg from '../../../assets/images/santaCeia.jpg';
import SantaCeiaJesusTacaImg from '../../../assets/images/SantaCeiaJesusTaca.jpg';
import SantaCeiaOusadoAmorImg from '../../../assets/images/SantaCeiaOusadoAmor.jpg';
import ArgentinaImg from '../../../assets/images/argentina.jpg';
import CR7Img from '../../../assets/images/cr7.jpg';
import CR7AlNassrImg from '../../../assets/images/cr7-al nassr.jpg';
import DembeleImg from '../../../assets/images/dembele.jpg';
import DonDoueImg from '../../../assets/images/don doue.jpg';
import GauchoImg from '../../../assets/images/gaucho.jpg';
import ManchesterCityImg from '../../../assets/images/Manchester City.jpg';
import MbappeDesignImg from '../../../assets/images/mbappeDesign.jpg';
import MessiImg from '../../../assets/images/Messi.jpg';
import RaphinhaDesignImg from '../../../assets/images/raphinhaDesign.jpg';
import RealMadridImg from '../../../assets/images/Real Madrid.jpg';
import Yamal2Img from '../../../assets/images/Yamal 2.jpg';

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
    tag: 'UX Design · Multiplataforma',
    title: 'TI Help',
    description: 'Sistema integrado de suporte técnico (mobile, web e desktop), com triagem assistida por IA. Projeto real de TCC.',
    prototypeUrl: 'https://www.figma.com/proto/sXLh6cXRhiGBx6l1Ot8war/',
  },
  {
    id: '2',
    image: Kaloburn,
    tag: 'UX/UI Design · Marketplace Fitness',
    title: 'KaloBurn',
    description: 'Marketplace fitness de dois lados com IA de personalização, conectando usuários a profissionais de educação física.',
    prototypeUrl: 'https://www.figma.com/proto/sXLh6cXRhiGBx6l1Ot8war/',
  },
  {
    id: '3',
    image: DNJeansImg,
    tag: 'UX Estratégico · Catálogo Digital',
    title: 'DN Jeans',
    description: 'Catálogo conversacional mobile-first, substituindo checkout tradicional por conversão direta via WhatsApp.',
    prototypeUrl: 'https://www.figma.com/proto/sXLh6cXRhiGBx6l1Ot8war/',
  },
  {
    id: '4',
    image: RealStateImg,
    tag: 'UX/UI Design · Marketplace Imobiliário',
    title: 'ImovePro',
    description: 'Marketplace imobiliário multi-perfil com busca por raio geográfico e dashboards dedicados por tipo de usuário.',
    prototypeUrl: 'https://www.figma.com/proto/sXLh6cXRhiGBx6l1Ot8war/',
  },
  {
    id: '5',
    image: YatchImg,
    tag: 'UX/UI Design · Luxury (Ficcional)',
    title: 'Yacht Booking',
    description: 'Exploração conceitual de design premium para reserva de experiências marítimas de alto padrão.',
    prototypeUrl: 'https://www.figma.com/proto/sXLh6cXRhiGBx6l1Ot8war/',
  },
  {
    id: '6',
    image: SolarPanelImg,
    tag: 'UX/UI Design · Dashboard (Template)',
    title: 'Solar Panel Monitoring',
    description: 'Template de dashboard de monitoramento de energia solar, desenvolvido como produto de design para venda.',
    prototypeUrl: 'https://www.figma.com/proto/sXLh6cXRhiGBx6l1Ot8war/',
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
  CeiaDoFortalecimentoImg, ColiseuImg, CordeiroCoroaImg, CultoDaFmlImg,
  CultoDeJovensImg, CultoDeLibertacaoImg, EleDeixouAs99Img, JesusEstaNoDesertroImg,
  JesusMichelBasquiartReferenceImg, KaueVermelhoImg, MaosCultoDeLibertacaoImg,
  MissoesImg, NotblindImg, NovosHorizontesImg, OTempoCertoImg, SantaCeiaImg,
  SantaCeiaJesusTacaImg, SantaCeiaOusadoAmorImg,
  // Football / Sports
  ArgentinaImg, CR7Img, CR7AlNassrImg, DembeleImg, DonDoueImg,
  GauchoImg, ManchesterCityImg, MbappeDesignImg, MessiImg,
  RaphinhaDesignImg, RealMadridImg, Yamal2Img,
];

export const CaseStudiesSection: React.FC<CaseStudiesSectionProps> = ({
  id,
  caseStudies = defaultCaseStudies,
  videos = defaultVideos,
}) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [mutedVideos, setMutedVideos] = useState<{ [key: string]: boolean }>(
    defaultVideos.reduce((acc, video) => ({ ...acc, [video.id]: true }), {})
  );

  const [count, setCount] = useState<number>(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const targetCount = 52;

  useEffect(() => {
    const currentSection = sectionRef.current;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          const duration = 1500;
          const startTime = performance.now();

          const animate = (currentTime: number) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easeOutQuad = (t: number) => t * (2 - t);
            const currentCount = Math.floor(easeOutQuad(progress) * targetCount);
            setCount(currentCount);
            if (progress < 1) {
              requestAnimationFrame(animate);
            }
          };

          requestAnimationFrame(animate);
          if (currentSection) observer.unobserve(currentSection);
        }
      },
      { threshold: 0.15 }
    );

    if (currentSection) observer.observe(currentSection);
    return () => {
      if (currentSection) observer.unobserve(currentSection);
    };
  }, []);

  const categories = [
    { id: 'all', label: t('caseStudies.categories.uxDesign') },
    { id: 'web', label: t('caseStudies.categories.videoEdit') },
    { id: 'mobile', label: t('caseStudies.categories.socialMedia') },
  ];

  // Título sempre fixo
  const dynamicTitle = 'Portfolio';

  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategory(categoryId);
  };

  const toggleMute = (videoId: string) => {
    setMutedVideos((prev) => ({
      ...prev,
      [videoId]: !prev[videoId],
    }));
  };

  const handleWatchPrototype = (e: React.MouseEvent, prototypeUrl?: string) => {
    e.stopPropagation();
    if (prototypeUrl) {
      window.open(prototypeUrl, '_blank');
    }
  };

  const handleSeeProject = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    navigate(`/case-studies/${id}`);
  };

  return (
    <section className="case-studies-section" id={id} ref={sectionRef}>
      <div className="case-studies-container">

        <div className="case-studies-header">
          <div className="case-studies-title-wrapper">
            <h2 className="case-studies-title">
              {dynamicTitle}
            </h2>
          </div>
          <div className="case-studies-counter">
            {t('caseStudies.projectsCount', { count })}
          </div>
        </div>

        <div className="case-studies-filter">
          <NavPill items={categories} onSelect={handleCategoryChange} />
        </div>

        {selectedCategory === 'mobile' ? (
          <div className="case-studies-carousel-wrapper">
            <Carousel images={socialMediaCarouselImages} />
          </div>
        ) : selectedCategory === 'web' ? (
          <div className="case-studies-grid">
            {videos.map((video) => {
              const isMuted = mutedVideos[video.id] ?? true;
              return (
                <div
                  key={video.id}
                  className="case-study-card video-card scroll-reveal"
                  id={`video-${video.id}`}
                  style={{ position: 'relative' }}
                >
                  <video
                    autoPlay
                    muted={isMuted}
                    loop
                    playsInline
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  >
                    <source src={video.src} type="video/mp4" />
                    {t('caseStudies.videoNotSupported')}
                  </video>

                  <button
                    onClick={() => toggleMute(video.id)}
                    className="video-audio-toggle-btn"
                    style={{
                      position: 'absolute',
                      bottom: '15px',
                      right: '15px',
                      zIndex: 10,
                      background: 'rgba(0, 0, 0, 0.7)',
                      color: '#fff',
                      border: 'none',
                      borderRadius: '50px',
                      padding: '8px 14px',
                      cursor: 'pointer',
                      fontSize: '12px',
                      fontWeight: 'bold',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      backdropFilter: 'blur(4px)',
                      transition: 'background 0.2s ease',
                    }}
                  >
                    {isMuted ? t('caseStudies.unmute') : t('caseStudies.mute')}
                  </button>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="case-studies-grid">
            {caseStudies.map((caseStudy) => (
              <div
                key={caseStudy.id}
                className="case-study-card scroll-reveal"
                id={`project-${caseStudy.id}`}
              >
                {/* Imagem com overlay de hover (desktop) */}
                <div
                  className="case-card__image"
                  style={{
                    backgroundImage: `url(${caseStudy.image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }}
                >
                  <div className="case-card__overlay">
                    <Button
                      variant="secondary"
                      size="medium"
                      className="case-card__watch-btn"
                      onClick={(e) => handleWatchPrototype(e, caseStudy.prototypeUrl)}
                    >
                      <span className="case-card__play-circle">
                        <svg viewBox="0 0 24 24" fill="white" width="14" height="14">
                          <polygon points="6,4 20,12 6,20" />
                        </svg>
                      </span>
                      {t('caseStudies.watchPrototype')}
                    </Button>

                    <Button
                      variant="primary"
                      size="medium"
                      className="case-card__see-btn"
                      onClick={(e) => handleSeeProject(e, caseStudy.id)}
                    >
                      {t('caseStudies.viewProject')}
                      <span className="case-card__arrow-circle">
                        <svg viewBox="0 0 24 24" fill="none" width="16" height="16" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <line x1="7" y1="17" x2="17" y2="7" />
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
                      <span className="case-card__tag">{caseStudy.tag}</span>
                    )}
                    {caseStudy.title && (
                      <h3 className="case-card__title">{caseStudy.title}</h3>
                    )}
                    {caseStudy.description && (
                      <p className="case-card__desc">{caseStudy.description}</p>
                    )}
                  </div>

                  {/* Botões */}
                  <div className="case-card__buttons">
                    <Button
                      variant="secondary"
                      size="medium"
                      className="case-card__watch-btn case-card__watch-btn--mobile"
                      onClick={(e) => handleWatchPrototype(e, caseStudy.prototypeUrl)}
                    >
                      <span className="case-card__play-circle">
                        <svg viewBox="0 0 24 24" fill="white" width="14" height="14">
                          <polygon points="6,4 20,12 6,20" />
                        </svg>
                      </span>
                      {t('caseStudies.watchPrototype')}
                    </Button>

                    <Button
                      variant="primary"
                      size="medium"
                      className="case-card__see-btn case-card__see-btn--mobile"
                      onClick={(e) => handleSeeProject(e, caseStudy.id)}
                    >
                      {t('caseStudies.viewProject')}
                      <span className="case-card__arrow-circle">
                        <svg viewBox="0 0 24 24" fill="none" width="16" height="16" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <line x1="7" y1="17" x2="17" y2="7" />
                          <polyline points="7 7 17 7 17 17" />
                        </svg>
                      </span>
                    </Button>
                  </div>

                </div>

              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
};