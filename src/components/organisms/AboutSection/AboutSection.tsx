import React from 'react';
import { Button } from '../../atoms';
import './AboutSection.css';
import MyPhoto from '../../../assets/images/MyPhoto.png';

interface AboutSectionProps {
  title?: string;
  description?: string;
  ctaText?: string;
  imageSrc?: string;
}

export const AboutSection: React.FC<AboutSectionProps> = ({
  title = "ABOUT ME®",
  description = "Designing intuitive digital experiences where clarity meets purpose. I am a UX/UI Designer focused on usability, systems, and human-centered design",
  ctaText = 'GET IN TOUCH',
  imageSrc = MyPhoto,
}) => {
  const handleContactClick = () => {
    const contactSection = document.getElementById('contact');
    contactSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="about-section" id="about">
      <div className="about-container">
        {/* Left Column: Text Content */}
        <div className="about-content">
          <h2 className="about-title">{title}</h2>
          <p className="about-description">{description}</p>
          
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
