import React, { useEffect, useState, useRef, memo } from 'react';
import { Button } from '../../atoms';
import './AboutSection.css';
import MyPhoto from '../../../assets/images/MyPhoto.png';

interface AboutSectionProps {
  id?: string; // 1. Adicionado o id opcional nas Props
  title?: string;
  description?: string;
  ctaText?: string;
  imageSrc?: string;
}

// 1. COMPONENTE MEMORIZADO: Isola a descrição para que o scroll do título não quebre o delay das palavras
const MemoizedDescription = memo(({ text, isVisible }: { text: string; isVisible: boolean }) => {
  const words = text.split(' ');
  return (
    <>
      {words.map((word, index) => {
        const delay = index * 0.035; 
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
});

MemoizedDescription.displayName = 'MemoizedDescription';

export const AboutSection: React.FC<AboutSectionProps> = ({
  id, // 2. Recebendo o id dinâmico aqui
  title = "ABOUT ME®",
  description = "Crio experiências digitais intuitivas onde a clareza encontra o propósito. Sou um designer de UX/UI com foco em usabilidade, sistemas e design centrado no usuário.",
  ctaText = 'CONTATO',
  imageSrc = MyPhoto,
}) => {
  const [isSectionVisible, setIsSectionVisible] = useState(false);
  const [titleProgress, setTitleProgress] = useState(0); 
  const sectionRef = useRef<HTMLElement>(null);

  const handleContactClick = () => {
    const contactSection = document.getElementById('contact');
    contactSection?.scrollIntoView({ behavior: 'smooth' });
  };

  // SCROLL REVEAL DO TÍTULO
  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      const elementTop = rect.top;
      const startReveal = windowHeight - 50; 
      
      const progress = (startReveal - elementTop) / 350; 
      const clampedProgress = Math.max(0, Math.min(1, progress));
      
      setTitleProgress(clampedProgress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); 

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // INTERSECTION OBSERVER: Controla estritamente quando a descrição começa a se escrever
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsSectionVisible(entry.isIntersecting);
      },
      { 
        threshold: 0.2, // Ativa um pouco mais cedo para a escrita começar de forma fluida
        rootMargin: "0px 0px -150px 0px"
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    // 3. Alterado o id="about" estático para id={id} para receber a tag do Home.tsx
    <section className="about-section" id={id} ref={sectionRef}>
      <div className="about-container">
        {/* Left Column: Text Content */}
        <div className="about-content">
          
          {/* TÍTULO INTERATIVO */}
          <h2 
            className="about-title"
            style={{
              opacity: titleProgress,
              transform: `translateY(${(1 - titleProgress) * 35}px)`,
              transition: 'opacity 0.1s ease-out, transform 0.1s ease-out'
            }}
          >
            {title}
          </h2>
          
          {/* DESCRIÇÃO PROTEGIDA COM O MEMO */}
          <p className="about-description">
            <MemoizedDescription text={description} isVisible={isSectionVisible} />
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
