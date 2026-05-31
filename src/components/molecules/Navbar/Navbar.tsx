import React, { useState, useEffect } from 'react';
import { IoMenuSharp, IoClose } from 'react-icons/io5';
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
  { label: 'CONTACT', href: '#contact' },
];

const WHITE_BG_SECTIONS = ['about', 'skills'];

export const Navbar: React.FC = () => {
  const [isOnWhiteBg, setIsOnWhiteBg] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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

  const handleNavClick = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className={`navbar ${isOnWhiteBg ? 'navbar--on-white' : ''}`}>
      <div className="navbar-container">
        {/* Desktop Menu */}
        <ul className="navbar-menu navbar-menu--desktop">
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

        {/* Mobile Menu Button */}
        <button
          className="navbar-toggle"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
          aria-expanded={isMobileMenuOpen}
        >
          {isMobileMenuOpen ? (
            <IoClose size={40} />
          ) : (
            <IoMenuSharp size={40} />
          )}
        </button>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <ul className="navbar-menu navbar-menu--mobile">
            {navItems.map((item) => (
              <li key={item.label}>
                <a
                  href={item.href}
                  className={`nav-link ${item.isActive ? 'active' : ''}`}
                  onClick={handleNavClick}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
    </nav>
  );
};
