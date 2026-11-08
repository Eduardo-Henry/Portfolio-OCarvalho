import React from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';
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
  const navigate = useNavigate();
  const location = useLocation();
  const currentYear = new Date().getFullYear();

  const handleSectionNavigation = (sectionId: string) => {
    if (location.pathname !== '/') {
      navigate('/', { state: { scrollTo: sectionId === 'home' ? 'hero' : sectionId } });
      return;
    }

    if (sectionId === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  };

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
              <button type="button" onClick={() => handleSectionNavigation('home')} className="footer-link">
                {t('footer.nav.home')}
              </button>
              <button type="button" onClick={() => handleSectionNavigation('about')} className="footer-link">
                {t('footer.nav.about')}
              </button>
              <button type="button" onClick={() => handleSectionNavigation('all-skills')} className="footer-link">
                {t('footer.nav.skills')}
              </button>
              <button type="button" onClick={() => handleSectionNavigation('case-studies')} className="footer-link">
                {t('footer.nav.works')}
              </button>
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
            <a href="mailto:ocarvalhodesign@gmail.com" className="footer-email">
              ocarvalhodesign@gmail.com
            </a>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="footer-copyright">
            {t('footer.copyright', { year: currentYear })}
          </p>
          <div className="footer-legal">
            <span className="footer-legal-link">
              {t('footer.privacyPolicy')}
            </span>
            <span className="footer-legal-link">
              {t('footer.termsOfService')}
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
