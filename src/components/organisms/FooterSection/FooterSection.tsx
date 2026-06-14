import React from 'react';
import { useTranslation } from 'react-i18next';
import './FooterSection.css';
import LinkedInIcon from '../../../assets/icons/iconLinkedin.svg?react';
import InstagramIcon from '../../../assets/icons/iconInstagram.svg?react';
import BehanceIcon from '../../../assets/icons/iconBehance.svg?react';
import GitHubIcon from '../../../assets/icons/iconGithub.svg?react';

interface SocialLink {
  id: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  url: string;
  title: string;
}

export const FooterSection: React.FC = () => {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  const socialLinks: SocialLink[] = [
    {
      id: 'linkedin',
      icon: LinkedInIcon,
      url: 'https://www.linkedin.com/in/eduardohenrycarvalho/?locale=pt',
      title: 'LinkedIn',
    },
    {
      id: 'instagram',
      icon: InstagramIcon,
      url: 'https://www.instagram.com/ocarvalho.dzn/',
      title: 'Instagram',
    },
    {
      id: 'behance',
      icon: BehanceIcon,
      url: 'https://www.behance.net/eduardohenry1',
      title: 'Behance',
    },
    {
      id: 'github',
      icon: GitHubIcon,
      url: 'https://github.com',
      title: 'GitHub',
    },
  ];

  return (
    <footer className="footer-section">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-column">
            <h3 className="footer-brand">EDUARDO</h3>
            <p className="footer-description">
              {t('footer.description')}
            </p>
          </div>

          <div className="footer-column">
            <h4 className="footer-title">{t('footer.nav.title')}</h4>
            <nav className="footer-nav">
              <a href="#home" className="footer-link">
                {t('footer.nav.home')}
              </a>
              <a href="#about" className="footer-link">
                {t('footer.nav.about')}
              </a>
              <a href="#skills" className="footer-link">
                {t('footer.nav.skills')}
              </a>
              <a href="#works" className="footer-link">
                {t('footer.nav.works')}
              </a>
            </nav>
          </div>

          <div className="footer-column">
            <h4 className="footer-title">{t('footer.social')}</h4>
            <div className="footer-social">
              {socialLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <a key={link.id} href={link.url} target="_blank" rel="noopener noreferrer" className="footer-social-link" title={link.title}>
                    <Icon className="footer-social-icon" />
                  </a>
                );
              })}
            </div>
          </div>

          <div className="footer-column">
            <h4 className="footer-title">{t('footer.contact')}</h4>
            <a href="mailto:du.h.c.oliveira17@gmail.com" className="footer-email">
              du.h.c.oliveira17@gmail.com
            </a>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="footer-copyright">
            {t('footer.copyright', { year: currentYear })}
          </p>
          <div className="footer-legal">
            <a href="#" className="footer-legal-link">
              {t('footer.privacyPolicy')}
            </a>
            <a href="#" className="footer-legal-link">
              {t('footer.termsOfService')}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};