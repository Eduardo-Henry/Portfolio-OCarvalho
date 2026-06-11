import React, { useEffect, useState, useRef } from 'react';
import { Button } from '../../atoms';
import './AboutSection.css';
import MyPhoto from '../../../assets/images/MyPhoto.png';

interface AboutSectionProps {
  id?: string;
  title?: string;
  description?: string;
  ctaText?: string;
  imageSrc?: string;
}



// Efeito de escrita por palavras de forma fluida
const TypewriterDescription = ({ text, isVisible }: { text: string; isVisible: boolean }) => {
  const words = text.split(' ');
  return (
    <>
      {words.map((word, index) => {
        const delay = index * 0.04; // Velocidade da escrita (ajusta se necessário)
        return (
          <span
            key={index}
            className={`animated-word ${isVisible ? 'animate' : ''}`}
            style={{ animationDelay: `${delay}s` }}
          >
            {word}{" "}
          </span>
        );
      })}
    </>
  );
};

export const AboutSection: React.FC<AboutSectionProps> = ({
  id,
  title = "ABOUT ME®",
  description = "Crio experiências digitais intuitivas onde a clareza encontra o propósito. Sou um designer de UX/UI com foco em usabilidade, sistemas e design centrado no usuário.",
  ctaText = 'CONTATO',
  imageSrc = MyPhoto,
}) => {
  const [isSectionVisible, setIsSectionVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const handleContactClick = () => {
    const contactSection = document.getElementById('contact');
    contactSection?.scrollIntoView({ behavior: 'smooth' });
  };

  // Dispara a animação de escrita assim que a secção aparece 20% no ecrã
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsSectionVisible(true); // Ativa e mantém ativo
        }
      },
      { 
        threshold: 0.2,
        rootMargin: "0px 0px -100px 0px"
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section className="about-section" id={id} ref={sectionRef}>
      <div className="about-container">
        {/* Left Column: Text Content */}
        <div className="about-content">
          
          {/* TÍTULO ESTÁTICO (Sem efeito de scroll) */}
          <h2 className="about-title">
            {title}
          </h2>
          
          {/* DESCRIÇÃO COM EFEITO DE ESCRITA */}
          <p className="about-description">
            <TypewriterDescription text={description} isVisible={isSectionVisible} />
          </p>
          
          <div className="about-cta">
            <Button
              variant="primary"
              size="large"
              onClick={handleContactClick}
              className="about-button"
              aria-label={ctaText}
            >
              <span className="about-button-text">{ctaText}</span>
              <span className="about-button-circle" aria-hidden="true">
                <svg
                  className="about-button-icon"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  aria-hidden="true"
                >
                  <path d="M7 17L17 7M17 7H7M17 7V17" />
                </svg>
              </span>
            </Button>
          </div>
        </div>

        {/* Right Column: Image */}
        {imageSrc && (
          <div className="about-image">
            <img src={imageSrc} alt="About the designer" loading="lazy" />
          </div>
        )}
      </div>
      </section>
      
  );
};
