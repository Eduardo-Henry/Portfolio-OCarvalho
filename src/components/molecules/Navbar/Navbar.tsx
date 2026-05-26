import React, { useState, useEffect } from 'react';
import './Navbar.css';

interface NavItem {
  label: string;
  href: string;
  isActive?: boolean;
}

const navItems: NavItem[] = [
  { label: 'HOME', href: '#home', isActive: true },
  { label: 'ABOUT ME', href: '#about' },
  { label: 'SKILLS', href: '#skills' },
  { label: 'WORKS', href: '#works' },
];

const WHITE_BG_SECTIONS = ['about', 'skills'];

export const Navbar: React.FC = () => {
  const [isOnWhiteBg, setIsOnWhiteBg] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const sections = WHITE_BG_SECTIONS.map(id => document.getElementById(id)).filter(Boolean);
      
      let onWhiteBg = false;
      for (const section of sections) {
        if (!section) continue;
        const rect = section.getBoundingClientRect();
        if (rect.top < 200 && rect.bottom > 0) {
          onWhiteBg = true;
          break;
        }
      }
      
      setIsOnWhiteBg(onWhiteBg);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`navbar ${isOnWhiteBg ? 'navbar--on-white' : ''}`}>
      <div className="navbar-container">
        <ul className="navbar-menu">
          {navItems.map((item) => (
            <li key={item.label}>
              <a
                href={item.href}
                className={`nav-link ${item.isActive ? 'active' : ''}`}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};
