import React from 'react';
import { useTranslation } from 'react-i18next';
import { MdDownload } from 'react-icons/md';
import { Button } from '../../atoms';
import './HeroSection.css';
import Image3D from '../../../assets/images/Image3D.png';

interface HeroSectionProps {
  id?: string;
  title: string;
  subtitle?: string;
  description: string;
  ctaText?: string;
  imageSrc?: string;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  id,
  title,
  description,
  ctaText,
  imageSrc = Image3D,
}) => {
  const { t } = useTranslation();

  const handleContactClick = () => {
    const contactSection = document.getElementById('contact');
    contactSection?.scrollIntoView({ behavior: 'smooth' });
  };

  const resolvedCtaText = ctaText ?? t('hero.cta');

  return (
    <section className="hero-section" id={id}>
      <div className="hero-wrapper">
        <div className="hero-grid">
          <div className="hero-brand">
            <h1 className="brand-title">
              EDUARDO<span className="brand-mark">®</span>
              UX DESIGNER
            </h1>
          </div>

          {imageSrc && (
            <div className="hero-image-container">
              <img src={imageSrc} alt={t('hero.imageAlt')} loading="lazy" className="hero-image" />
            </div>
          )}

          <div className="hero-content">
            <h2 className="hero-headline">{title}</h2>
            <p className="hero-description">{description}</p>
          </div>

          <div className="hero-cta-wrapper">
             <Button
              variant="secondary"
              size="large"
              className="hero-cv-button"
              aria-label={t('hero.downloadCV')}
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
              <span className="hero-cv-text">{t('hero.downloadCV')}</span>
            </Button>
            <Button
              variant="primary"
              size="large"
              onClick={handleContactClick}
              className="hero-cta-button"
              aria-label={resolvedCtaText}
            >
              <span className="hero-cta-text">{resolvedCtaText}</span>
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