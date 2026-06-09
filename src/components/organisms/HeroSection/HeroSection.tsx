import React from 'react';
import { MdDownload } from 'react-icons/md';
import { Button } from '../../atoms';
import './HeroSection.css';
import Image3D from '../../../assets/images/Image3D.png';

interface HeroSectionProps {
  id?: string; // 1. Adicionado o id opcional nas Props
  title: string;
  subtitle?: string;
  description: string;
  ctaText?: string;
  imageSrc?: string;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  id, // 2. Recebendo o id aqui
  title,
  description,
  ctaText = 'GET IN TOUCH',
  imageSrc = Image3D,
}) => {
  const handleContactClick = () => {
    const contactSection = document.getElementById('contact');
    contactSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    // 3. Modificado de id="hero" para id={id} para receber o valor do Home.tsx
    <section className="hero-section" id={id}>
      <div className="hero-wrapper">
        {/* Grid Layout */}
        <div className="hero-grid">
          {/* Top Row: Brand + Menu */}
          <div className="hero-brand">
            <h1 className="brand-title">
              EDUARDO<span className="brand-mark">®</span>
              UX DESIGNER
            </h1>
          </div>

          {/* Image: Left Center */}
          {imageSrc && (
            <div className="hero-image-container">
              <img src={Image3D} alt="Designer work" loading="lazy" className="hero-image" />
            </div>
          )}

          {/* Bottom: Headline + Description */}
          <div className="hero-content">
            <h2 className="hero-headline">{title}</h2>
            <p className="hero-description">{description}</p>
          </div>

          {/* CTA Button: Bottom Right */}
          <div className="hero-cta-wrapper">
             <Button
              variant="secondary"
              size="large"
              className="hero-cv-button"
              aria-label="Download CV"
              onClick={() => {
                const link = document.createElement('a');
                link.href = '/EduardoHCarvalho-UXDesigner.pdf'; 
                link.download = 'EduardoHCarvalho-UXDesigner.pdf'; 
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
              }}
            >
              <MdDownload className="hero-cv-icon" />
              <span className="hero-cv-text">BAIXAR CV</span>
            </Button>
            <Button
              variant="primary"
              size="large"
              onClick={handleContactClick}
              className="hero-cta-button"
              aria-label={ctaText}
            >
              <span className="hero-cta-text">{ctaText}</span>
              <span className="hero-cta-circle" aria-hidden="true">
                <svg
                  className="hero-cta-icon"
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
      </div>
    </section>
  );
};
