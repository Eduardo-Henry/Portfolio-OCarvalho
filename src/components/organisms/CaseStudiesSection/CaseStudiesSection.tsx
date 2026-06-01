import React, { useState, useEffect, useRef } from 'react';
import './CaseStudiesSection.css';
import { NavPill, Carousel } from '../../molecules';
import TIHelpImg from '../../../assets/images/TIHelp.png';
import SolarPanelImg from '../../../assets/images/SolarPanel.png';
import DNJeansImg from '../../../assets/images/DNJeans.png';
/* NOVAS IMPORTAÇÕES DE IMAGENS */
import RealStateImg from '../../../assets/images/RealState.png';
import YatchImg from '../../../assets/images/Yatch.jpeg';

/* IMPORTAÇÕES DE VÍDEOS */
import HappyEasterVideo from '../../../assets/Videos/HappyEaster.mp4';
import OtavioVideo from '../../../assets/Videos/Otavio.mp4';
import SalesVideo from '../../../assets/Videos/Sales.mp4';
import TrevoElvisVideo from '../../../assets/Videos/TrevoElvis.mp4';
import StreetsVideos from '../../../assets/Videos/StreetsRP.mp4';

/* IMPORTAÇÕES DE IMAGENS PARA O CARROSSEL - DESIGN SOCIAL MEDIA */
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
  { id: '1', image: TIHelpImg },
  { id: '2', image: SolarPanelImg },
  { id: '3', image: DNJeansImg },
  { id: '4', image: RealStateImg },
  { id: '5', image: YatchImg },
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
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [mutedVideos, setMutedVideos] = useState<{ [key: string]: boolean }>(
    defaultVideos.reduce((acc, video) => ({ ...acc, [video.id]: true }), {})
  );

  // Estados novos para a animação do contador de horas/projetos
  const [count, setCount] = useState<number>(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const targetCount = 52; // Alvo final da sua contagem de projetos

  useEffect(() => {
    const currentSection = sectionRef.current;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          const duration = 1500; // Tempo da animação (1.5 segundos)
          const startTime = performance.now();

          const animate = (currentTime: number) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);

            // Easing suavizado (easeOutQuad)
            const easeOutQuad = (t: number) => t * (2 - t);
            const currentCount = Math.floor(easeOutQuad(progress) * targetCount);

            setCount(currentCount);

            if (progress < 1) {
              requestAnimationFrame(animate);
            }
          };

          requestAnimationFrame(animate);
          // Executa uma vez e remove para não ficar reiniciando em todo scroll
          if (currentSection) observer.unobserve(currentSection);
        }
      },
      {
        threshold: 0.15, // Dispara ao avistar 15% da seção na tela
      }
    );

    if (currentSection) {
      observer.observe(currentSection);
    }

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

  return (
    <section className="case-studies-section" id="works" ref={sectionRef}>
      <div className="case-studies-container">
        {/* Header da Seção */}
        <div className="case-studies-header">
          <div className="case-studies-title-wrapper">
            <h2 className="case-studies-title">CASE STUDIES<span className="case-studies-mark">®</span></h2>
          </div>
          {/* O valor dinâmico injetado aqui */}
          <div className="case-studies-counter">+{count} PROJECTS</div>
        </div>

        {/* NavPill Filter */}
        <div className="case-studies-filter">
          <NavPill items={categories} onSelect={handleCategoryChange} />
        </div>

        {/* Renderização condicional */}
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
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                    }}
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
                      transition: 'background 0.2s ease'
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
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
