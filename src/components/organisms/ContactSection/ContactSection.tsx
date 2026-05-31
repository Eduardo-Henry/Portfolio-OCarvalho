import React from 'react';
import { MdDownload } from 'react-icons/md';
import { Button } from '../../atoms';
import './ContactSection.css';
import Image3D from '../../../assets/images/Image3D.png';

export const ContactSection: React.FC = () => {
  const handleContactClick = () => {
    const email = 'du.h.c.oliveira17@gmail.com';
    window.location.href = `mailto:${email}`;
  };

  return (
    <section className="contact-section" id="contact">
      <div className="contact-wrapper">
        <div className="contact-grid">
          
          {/* TOPO DA COLUNA ESQUERDA: TÍTULO PRINCIPAL */}
          <div className="contact-brand">
            <h1 className="contact-title">
              LET'S WORK<br />TOGETHER
            </h1>
          </div>

          {/* CENTRO DA COLUNA ESQUERDA: APENAS A IMAGEM 3D */}
          <div className="contact-image-container">
            <img src={Image3D} alt="3D Illustration" loading="lazy" className="contact-image" />
          </div>

          {/* BASE DA COLUNA ESQUERDA: TEXTOS DESCRITIVOS */}
          <div className="contact-content">
            <h2 className="contact-headline">
              Designing intuitive digital experiences where clarity meets purpose.
            </h2>
            <p className="contact-description">
              Sou tudo o que sua empresa precisa e até um pouco mais.
            </p>
          </div>

          {/* BASE DA COLUNA DIREITA: OS DOIS BOTÕES PAREADOS */}
          <div className="contact-cta-wrapper">
            <Button
              variant="secondary"
              size="large"
              className="contact-cv-button"
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
              <MdDownload className="contact-cv-icon" />
              <span className="contact-cv-text">Download CV</span>
            </Button>

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
