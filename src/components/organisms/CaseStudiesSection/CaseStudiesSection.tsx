import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './CaseStudiesSection.css';

import { NavPill, Carousel } from '../../molecules';
import TIHelpImg from '../../../assets/images/TIHelp.png';
import SolarPanelImg from '../../../assets/images/SolarPanel.png';
import DNJeansImg from '../../../assets/images/DNJeans.png';
import RealStateImg from '../../../assets/images/RealState.png';
import YatchImg from '../../../assets/images/Yatch.jpeg';

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

interface CaseStudy {
  id: string;
  image: string;
  prototypeUrl?: string;
}

interface Video {
  id: string;
  title: string;
  src: string;
}

interface CaseStudiesSectionProps {
  caseStudies?: CaseStudy[];
  videos?: Video[];
}

const defaultCaseStudies: CaseStudy[] = [
  { id: '1', image: TIHelpImg, prototypeUrl: 'https://www.figma.com/proto/sXLh6cXRhiGBx6l1Ot8war/Gilberto---Pain%C3%A9is-Solares?node-id=10-172&p=f&m=draw&scaling=min-zoom&content-scaling=fixed&page-id=0%3A1&starting-point-node-id=70%3A299' },
  { id: '2', image: SolarPanelImg, prototypeUrl: 'https://www.figma.com/proto/sXLh6cXRhiGBx6l1Ot8war/Gilberto---Pain%C3%A9is-Solares?node-id=10-172&p=f&m=draw&scaling=min-zoom&content-scaling=fixed&page-id=0%3A1&starting-point-node-id=70%3A299' },
  { id: '3', image: DNJeansImg, prototypeUrl: 'https://www.figma.com/proto/sXLh6cXRhiGBx6l1Ot8war/Gilberto---Pain%C3%A9is-Solares?node-id=10-172&p=f&m=draw&scaling=min-zoom&content-scaling=fixed&page-id=0%3A1&starting-point-node-id=70%3A299' },
  { id: '4', image: RealStateImg, prototypeUrl: 'https://www.figma.com/proto/sXLh6cXRhiGBx6l1Ot8war/Gilberto---Pain%C3%A9is-Solares?node-id=10-172&p=f&m=draw&scaling=min-zoom&content-scaling=fixed&page-id=0%3A1&starting-point-node-id=70%3A299' },
  { id: '5', image: YatchImg, prototypeUrl: 'https://www.figma.com/proto/sXLh6cXRhiGBx6l1Ot8war/Gilberto---Pain%C3%A9is-Solares?node-id=10-172&p=f&m=draw&scaling=min-zoom&content-scaling=fixed&page-id=0%3A1&starting-point-node-id=70%3A299' },
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
];

export const CaseStudiesSection: React.FC<CaseStudiesSectionProps> = ({
  caseStudies = defaultCaseStudies,
  videos = defaultVideos,
}) => {
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
    { id: 'all', label: 'UI DESIGN' },
    { id: 'web', label: 'VIDEOS EDIT' },
    { id: 'mobile', label: 'DESIGN SOCIAL MEDIA' },
  ];

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
    <section className="case-studies-section" id="works" ref={sectionRef}>
      <div className="case-studies-container">

        <div className="case-studies-header">
          <div className="case-studies-title-wrapper">
            <h2 className="case-studies-title">
              CASE STUDIES<span className="case-studies-mark">®</span>
            </h2>
          </div>
          <div className="case-studies-counter">+{count} PROJECTS</div>
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
                    Seu navegador não suporta o elemento de vídeo.
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
                    {isMuted ? '🔈 Ativar Som' : '🔊 Mutar'}
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
                style={{
                  backgroundImage: `url(${caseStudy.image})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              >
                <div className="case-card__overlay">
                  <button
                    className="case-card__btn"
                    onClick={(e) => handleWatchPrototype(e, caseStudy.prototypeUrl)}
                  >
                    Watch Prototype
                  </button>
                  <button
                    className="case-card__btn case-card__btn--primary"
                    onClick={(e) => handleSeeProject(e, caseStudy.id)}
                  >
                    See Project
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
};