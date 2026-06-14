import React from 'react';
import { useTranslation } from 'react-i18next';
import { MdDownload } from 'react-icons/md';
import './ContactSection.css';
import Image3D from '../../../assets/images/Image3D.png';

export const ContactSection: React.FC = () => {
  const { t } = useTranslation();

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
              {t('contact.titleLine1')}<span className="contact-mark">®</span><br />{t('contact.titleLine2')}
            </h1>
          </div>

          {/* CENTRO DA COLUNA ESQUERDA: APENAS A IMAGEM 3D */}
          <div className="contact-image-container">
            <img src={Image3D} alt={t('contact.imageAlt')} loading="lazy" className="contact-image" />
          </div>

          {/* BASE DA COLUNA ESQUERDA: TEXTOS DESCRITIVOS */}
          <div className="contact-content">
            <h2 className="contact-headline">
              {t('contact.headline')}
            </h2>
            <p className="contact-description">
              {t('contact.description')}
            </p>
          </div>

          {/* BASE DA COLUNA DIREITA: OS DOIS BOTÕES PAREADOS */}
          <div className="contact-cta-wrapper">
            <button
              className="contact-cv-button"
              aria-label={t('contact.downloadCV')}
              onClick={() => {
                const link = document.createElement('a');
                link.href = '/EduardoHCarvalho-UXDesigner.pdf'; 
                link.download = 'EduardoHCarvalho-UXDesigner.pdf';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
              }}
            >
              {/* O círculo agora engloba o ícone sem quebrar a classe interna */}
              <span className="contact-cv-circle-wrapper">
                <MdDownload className="contact-cv-icon" />
              </span>
              <span className="contact-cv-text">{t('contact.downloadCV')}</span>
            </button>

            <button
              onClick={handleContactClick}
              className="contact-button"
              aria-label={t('contact.getInTouch')}
            >
              <span className="contact-button-text">{t('contact.cta')}</span>
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
            </button>
          </div>

        </div>
      </div>
    </section>
  );
};