import React from 'react';
import { FaLinkedin, FaInstagram, FaTwitter, FaDribbble, FaBehance } from 'react-icons/fa';
import './SocialLinks.css';

interface SocialLink {
  id: string;
  icon: React.ComponentType<{ className?: string }>;
  url: string;
  label: string;
}

export const SocialLinks: React.FC = () => {
  const socialLinks: SocialLink[] = [
    {
      id: 'linkedin',
      icon: FaLinkedin,
      url: 'https://linkedin.com',
      label: 'LinkedIn',
    },
    {
      id: 'instagram',
      icon: FaInstagram,
      url: 'https://instagram.com',
      label: 'Instagram',
    },
    {
      id: 'twitter',
      icon: FaTwitter,
      url: 'https://twitter.com',
      label: 'Twitter',
    },
    {
      id: 'dribbble',
      icon: FaDribbble,
      url: 'https://dribbble.com',
      label: 'Dribbble',
    },
    {
      id: 'behance',
      icon: FaBehance,
      url: 'https://behance.net',
      label: 'Behance',
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
};
