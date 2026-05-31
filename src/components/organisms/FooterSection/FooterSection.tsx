import React from 'react';
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
          {/* Brand Column */}
          <div className="footer-column">
            <h3 className="footer-brand">EDUARDO</h3>
            <p className="footer-description">
              UX/UI Designer focused on usability, systems, and human-centered design.
            </p>
          </div>

          {/* Navigation Column */}
          <div className="footer-column">
            <h4 className="footer-title">NAVIGATION</h4>
            <nav className="footer-nav">
              <a href="#home" className="footer-link">
                HOME
              </a>
              <a href="#about" className="footer-link">
                ABOUT ME
              </a>
              <a href="#skills" className="footer-link">
                SKILLS
              </a>
              <a href="#works" className="footer-link">
                WORKS
              </a>
            </nav>
          </div>

          {/* Social Column */}
          <div className="footer-column">
            <h4 className="footer-title">SOCIAL</h4>
            <div className="footer-social">
              {socialLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <a
                    key={link.id}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="footer-social-link"
                    title={link.title}
                  >
                    <Icon className="footer-social-icon" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Contact Column */}
          <div className="footer-column">
            <h4 className="footer-title">CONTACT</h4>
            <a href="mailto:hello@eduardo.design" className="footer-email">
              hello@eduardo.design
            </a>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom">
          <p className="footer-copyright">
            © {currentYear} Eduardo. All rights reserved.
          </p>
          <div className="footer-legal">
            <a href="#" className="footer-legal-link">
              Privacy Policy
            </a>
            <a href="#" className="footer-legal-link">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
