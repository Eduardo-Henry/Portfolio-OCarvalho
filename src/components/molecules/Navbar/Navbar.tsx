import React, { useState, useEffect } from 'react';
import './Navbar.css';

export const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLinkClick = (sectionId: string) => {
    setActiveSection(sectionId);
    setIsMenuOpen(false);
  };

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isMenuOpen]);

  return (
    <header className="navbar">
      <div className="navbar-container">
        
        

        {/* MENU DESKTOP */}
        <ul className="navbar-menu--desktop">
          <li>
            <a 
              href="#home" 
              className={`nav-link ${activeSection === 'home' ? 'active' : 'inactive'}`}
              onClick={() => handleLinkClick('home')}
            >
              Home
            </a>
          </li>
          <li>
            <a 
              href="#about" 
              className={`nav-link ${activeSection === 'about' ? 'active' : 'inactive'}`}
              onClick={() => handleLinkClick('about')}
            >
              Sobre Mim
            </a>
          </li>
          <li>
            <a 
              href="#portfolio" 
              className={`nav-link ${activeSection === 'portfolio' ? 'active' : 'inactive'}`}
              onClick={() => handleLinkClick('portfolio')}
            >
              Portfolio
            </a>
          </li>
          <li>
            <a 
              href="#process" 
              className={`nav-link ${activeSection === 'process' ? 'active' : 'inactive'}`}
              onClick={() => handleLinkClick('process')}
            >
              Meu Processo
            </a>
          </li>
          <li>
            <a 
              href="#clients" 
              className={`nav-link ${activeSection === 'clients' ? 'active' : 'inactive'}`}
              onClick={() => handleLinkClick('clients')}
            >
              Feedbacks
            </a>
          </li>
          <li>
            <a 
              href="#contact" 
              className={`nav-link ${activeSection === 'contact' ? 'active' : 'inactive'}`}
              onClick={() => handleLinkClick('contact')}
            >
              Contato
            </a>
          </li>
        </ul>

        {/* BOTÃO MOBILE COM FUNDO QUADRADO PRETO */}
        <button 
          className={`navbar-toggle ${isMenuOpen ? 'toggle-active' : ''}`} 
          onClick={toggleMenu} 
          aria-label="Menu"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <line className="line-top" x1="3" y1="6" x2="21" y2="6"></line>
            <line className="line-middle" x1="3" y1="12" x2="21" y2="12"></line>
            <line className="line-bottom" x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
        </button>

        {/* MENU MOBILE INTERATIVO */}
        <ul className={`navbar-menu--mobile ${isMenuOpen ? 'active' : ''}`}>
          <li>
            <a 
              href="#home" 
              className={`nav-link ${activeSection === 'home' ? 'active' : 'inactive'}`}
              onClick={() => handleLinkClick('home')}
            >
              Home
            </a>
          </li>
          <li>
            <a 
              href="#about" 
              className={`nav-link ${activeSection === 'about' ? 'active' : 'inactive'}`}
              onClick={() => handleLinkClick('about')}
            >
              Sobre Mim
            </a>
          </li>
          <li>
            <a 
              href="#portfolio" 
              className={`nav-link ${activeSection === 'portfolio' ? 'active' : 'inactive'}`}
              onClick={() => handleLinkClick('portfolio')}
            >
              Portfolio
            </a>
          </li>
          <li>
            <a 
              href="#process" 
              className={`nav-link ${activeSection === 'process' ? 'active' : 'inactive'}`}
              onClick={() => handleLinkClick('process')}
            >
              Meu Processo
            </a>
          </li>
          <li>
            <a 
              href="#clients" 
              className={`nav-link ${activeSection === 'clients' ? 'active' : 'inactive'}`}
              onClick={() => handleLinkClick('clients')}
            >
              Feedbacks
            </a>
          </li>
          <li>
            <a 
              href="#contact" 
              className={`nav-link ${activeSection === 'contact' ? 'active' : 'inactive'}`}
              onClick={() => handleLinkClick('contact')}
            >
              Contato
            </a>
          </li>
        </ul>

      </div>
    </header>
  );
};
