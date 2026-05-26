import React from 'react';
import { Button } from '../../atoms';
import './ContactSection.css';
import Image3D from '../../../assets/images/Image3D.png';

export const ContactSection: React.FC = () => {
  const handleContactClick = () => {
    const email = 'hello@eduardo.design';
    window.location.href = `mailto:${email}`;
  };

  return (
    <section className="contact-section" id="contact">
      <div className="contact-container">
        {/* Left Content */}
        <div className="contact-content">
          <h2 className="contact-title">LET'S WORK TOGETHER</h2>
          
          <p className="contact-description">
            Designing intuitive digital experiences where clarity meets purpose.
          </p>

          <div className="contact-cta">
            <Button
              variant="primary"
              size="large"
              onClick={handleContactClick}
              className="contact-button"
              aria-label="Get in touch"
            >
              <span className="contact-button-text">GET IN TOUCH</span>
              <span className="contact-button-circle" aria-hidden="true">
                <svg
                  className="contact-button-icon"
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

          {/* Bottom Description */}
          <p className="contact-footer-text">
            Sou tudo o que sua empresa precisa e até um pouco mais.
          </p>
        </div>

        {/* Right 3D Image */}
        <div className="contact-image-container">
          <img src={Image3D} alt="3D Illustration" loading="lazy" className="contact-image" />
        </div>
      </div>
    </section>
  );
};
