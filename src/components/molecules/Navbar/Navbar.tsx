import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './Navbar.css';

export const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { id: 'hero', label: 'Home' },
    { id: 'about', label: 'Sobre Mim' },
    { id: 'case-studies', label: 'Portfolio' },
    { id: 'all-skills', label: 'Meu Processo' },
    { id: 'clients', label: 'Feedbacks' },
    { id: 'contact', label: 'Contato' },
  ];

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleLinkClick = (sectionId: string) => {
    setIsMenuOpen(false);
    setActiveSection(sectionId);
    if (location.pathname !== '/') {
      navigate('/', { state: { scrollTo: sectionId } });
    } else {
      if (sectionId === 'hero') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }
      const element = document.getElementById(sectionId);
      if (element) element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    if (location.pathname === '/' && location.state?.scrollTo) {
      const targetId = location.state.scrollTo;
      window.history.replaceState({}, document.title);
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

  useEffect(() => {
    if (location.pathname !== '/') return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { threshold: 0.4 }
    );

    menuItems.forEach(({ id }) => {
      const target = document.getElementById(id);
      if (target) observer.observe(target);
    });

    return () => observer.disconnect();
  }, [location.pathname]);

  return (
    <header className="navbar">
      <div className="navbar-container">

        

        {/* MENU DESKTOP */}
        {/* ✅ Sem mixBlendMode no <li> — o blend fica só no .nav-link.active via CSS */}
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
          aria-label="Abrir menu de navegação"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <line className="line-top" x1="3" y1="6" x2="21" y2="6" />
            <line className="line-middle" x1="3" y1="12" x2="21" y2="12" />
            <line className="line-bottom" x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </button>

        {/* MENU MOBILE */}
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