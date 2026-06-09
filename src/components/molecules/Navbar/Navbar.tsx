import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './Navbar.css';

export const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  
  const navigate = useNavigate();
  const location = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLinkClick = (sectionId: string) => {
    setIsMenuOpen(false);
    setActiveSection(sectionId);

    if (location.pathname !== '/') {
      navigate('/', { state: { scrollTo: sectionId } });
    } else {
      // Hero é sempre o topo — scroll direto sem depender do getElementById
      if (sectionId === 'hero') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  useEffect(() => {
    if (location.pathname === '/' && location.state?.scrollTo) {
      const targetId = location.state.scrollTo;
      window.history.replaceState({}, document.title);

      // Hero é sempre o topo — não precisa esperar o DOM
      if (targetId === 'hero') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        setActiveSection('hero');
        return;
      }

      setTimeout(() => {
        const element = document.getElementById(targetId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
          setActiveSection(targetId);
        }
      }, 150);
    }
  }, [location]);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isMenuOpen]);

  const menuItems = [
    { id: 'hero', label: 'Home' },
    { id: 'about', label: 'Sobre Mim' },
    { id: 'case-studies', label: 'Portfolio' },
    { id: 'all-skills', label: 'Meu Processo' },
    { id: 'clients', label: 'Feedbacks' },
    { id: 'contact', label: 'Contato' },
  ];

  return (
    <header className="navbar">
      <div className="navbar-container">

        {/* MENU DESKTOP */}
        <ul className="navbar-menu--desktop">
          {menuItems.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => handleLinkClick(item.id)}
                className={`nav-link ${activeSection === item.id ? 'active' : 'inactive'}`}
                style={{ background: 'none', border: 'none', cursor: 'pointer', font: 'inherit' }}
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>

        {/* BOTÃO MOBILE */}
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
          {menuItems.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => handleLinkClick(item.id)}
                className={`nav-link ${activeSection === item.id ? 'active' : 'inactive'}`}
                style={{ background: 'none', border: 'none', cursor: 'pointer', font: 'inherit' }}
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>

      </div>
    </header>
  );
};