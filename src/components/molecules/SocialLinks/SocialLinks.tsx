import React from 'react';
import LinkedInIcon from '../../../assets/icons/iconLinkedin.svg?react';
import InstagramIcon from '../../../assets/icons/iconInstagram.svg?react';
import BehanceIcon from '../../../assets/icons/iconBehance.svg?react';
import GitHubIcon from '../../../assets/icons/iconGithub.svg?react';
import './SocialLinks.css';

interface SocialLink {
  id: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  url: string;
  label: string;
}

export const SocialLinks: React.FC = () => {
  const socialLinks: SocialLink[] = [
    {
      id: 'linkedin',
      icon: LinkedInIcon,
      url: 'https://www.linkedin.com/in/eduardohenrycarvalho/?locale=pt',
      label: 'LinkedIn',
    },
    {
      id: 'instagram',
      icon: InstagramIcon,
      url: 'https://www.instagram.com/ocarvalho.dzn/',
      label: 'Instagram',
    },
    {
      id: 'behance',
      icon: BehanceIcon,
      url: 'https://www.behance.net/eduardohenry1',
      label: 'Behance',
    },
    {
      id: 'github',
      icon: GitHubIcon,
      url: 'https://github.com',
      label: 'GitHub',
    },
  ];

  return (
    <div className="social-links">
      {socialLinks.map((link) => {
        const Icon = link.icon;
        return (
          <a
            key={link.id}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="social-link"
            aria-label={link.label}
            title={link.label}
          >
            <Icon className="social-link-icon" />
          </a>
        );
      })}
    </div>
  );
}
