import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { MdTranslate } from 'react-icons/md';
import './Navbar.css';

type RGB = [number, number, number];

export const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  // Em vez de mix-blend-mode (que dependia da árvore de stacking
  // context inteira do site estar "limpa"), o navbar agora sampleia
  // a cor REAL por trás dele — incluindo pixels de fotos, não só
  // cor de fundo sólida em CSS — e decide branco ou preto sozinho.
  const [isOnLightBackground, setIsOnLightBackground] = useState(false);
  const { t, i18n } = useTranslation();

  const navigate = useNavigate();
  const location = useLocation();
  const navMenuRef = useRef<HTMLUListElement>(null);
  const rafId = useRef<number | null>(null);

  // Cache de canvases de imagens de background já carregadas, pra não
  // recarregar/redesenhar a mesma imagem a cada scroll. Chave = URL.
  // Valor null = ainda carregando ou falhou (CORS, etc).
  const bgImageCache = useRef<Map<string, HTMLCanvasElement | null>>(new Map());

  const menuItems = [
    { id: 'hero', label: t('nav.home') },
    { id: 'about', label: t('nav.about') },
    { id: 'case-studies', label: t('nav.portfolio') },
    { id: 'all-skills', label: t('nav.process') },
    { id: 'clients', label: t('nav.feedback') },
    { id: 'contact', label: t('nav.contact') },
  ];

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const toggleLanguage = () => {
    i18n.changeLanguage(i18n.language === 'pt' ? 'en' : 'pt');
  };

  const translateLabel =
    i18n.language === 'pt' ? 'Switch to English' : 'Mudar para Português';

  const getLuminance = (r: number, g: number, b: number) => {
    const [rs, gs, bs] = [r, g, b].map((c) => {
      const channel = c / 255;
      return channel <= 0.03928
        ? channel / 12.92
        : Math.pow((channel + 0.055) / 1.055, 2.4);
    });
    return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
  };

  const parseRgb = (colorString: string): RGB | null => {
    const match = colorString.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
    if (!match) return null;
    return [parseInt(match[1], 10), parseInt(match[2], 10), parseInt(match[3], 10)];
  };

  /**
   * Lê a cor de um pixel específico de um elemento <img> já carregado,
   * na posição relativa (0 a 1) dentro do seu retângulo na tela.
   * Síncrono porque a imagem já está no DOM e carregada.
   */
  const sampleImagePixel = useCallback((img: HTMLImageElement, relX: number, relY: number): RGB | null => {
    try {
      const w = img.naturalWidth;
      const h = img.naturalHeight;
      if (!w || !h) return null;

      const canvas = document.createElement('canvas');
      canvas.width = w;
      canvas.height = h;
      const ctx = canvas.getContext('2d');
      if (!ctx) return null;

      ctx.drawImage(img, 0, 0, w, h);
      const px = Math.min(w - 1, Math.max(0, Math.floor(relX * w)));
      const py = Math.min(h - 1, Math.max(0, Math.floor(relY * h)));
      const data = ctx.getImageData(px, py, 1, 1).data;
      return [data[0], data[1], data[2]];
    } catch {
      // canvas "manchado" por CORS (imagem de outra origem sem
      // header liberando) — não dá pra ler o pixel nesse caso
      return null;
    }
  }, []);

  /**
   * Extrai a URL de um background-image em CSS (ex: 'url("...")')
   */
  const extractBgImageUrl = (backgroundImage: string): string | null => {
    const match = backgroundImage.match(/url\(["']?(.*?)["']?\)/);
    return match ? match[1] : null;
  };

  /**
   * Garante que uma imagem de background esteja carregada e
   * desenhada num canvas em cache. Se ainda não estiver, dispara o
   * carregamento (assíncrono) e re-sampleia quando terminar.
   */
  const ensureBgImageCached = useCallback((url: string, onReady: () => void) => {
    if (bgImageCache.current.has(url)) return;
    bgImageCache.current.set(url, null); // marca como "carregando"

    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      try {
        const canvas = document.createElement('canvas');
        canvas.width = img.naturalWidth;
        canvas.height = img.naturalHeight;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0);
          bgImageCache.current.set(url, canvas);
          onReady();
        }
      } catch {
        bgImageCache.current.set(url, null);
      }
    };
    img.onerror = () => {
      bgImageCache.current.set(url, null);
    };
    img.src = url;
  }, []);

  /**
   * Lê um pixel de um canvas de background-image já em cache,
   * aproximando o comportamento de `background-size: cover`
   * (o caso mais comum). Para outros valores de background-size a
   * leitura é aproximada, não pixel-perfect, mas suficiente para
   * decidir claro/escuro.
   */
  const sampleCachedBgPixel = (canvas: HTMLCanvasElement, relX: number, relY: number): RGB | null => {
    try {
      const ctx = canvas.getContext('2d');
      if (!ctx) return null;
      const px = Math.min(canvas.width - 1, Math.max(0, Math.floor(relX * canvas.width)));
      const py = Math.min(canvas.height - 1, Math.max(0, Math.floor(relY * canvas.height)));
      const data = ctx.getImageData(px, py, 1, 1).data;
      return [data[0], data[1], data[2]];
    } catch {
      return null;
    }
  };

  /**
   * Sobe a árvore de elementos a partir de um ponto atrás do navbar
   * procurando, nessa ordem: (1) pixel real de uma <img>, (2) pixel
   * real de um background-image em CSS, (3) cor de fundo sólida.
   * É essa combinação que resolve fotos claras/escuras, não só cor
   * de fundo declarada.
   */
  const findBackgroundLuminance = useCallback(() => {
    const menuEl = navMenuRef.current;
    if (!menuEl) return;

    const rect = menuEl.getBoundingClientRect();
    const sampleX = rect.left + rect.width / 2;
    const sampleY = rect.top + rect.height / 2;

    const stack = document.elementsFromPoint(sampleX, sampleY);
    const behindElement = stack.find((el) => !el.closest('.navbar'));
    if (!behindElement) return;

    let node: Element | null = behindElement;
    while (node && node !== document.documentElement) {
      const el = node as HTMLElement;

      // 1) É uma tag <img> diretamente?
      if (el.tagName === 'IMG') {
        const imgRect = el.getBoundingClientRect();
        const relX = (sampleX - imgRect.left) / imgRect.width;
        const relY = (sampleY - imgRect.top) / imgRect.height;
        const rgb = sampleImagePixel(el as HTMLImageElement, relX, relY);
        if (rgb) {
          setIsOnLightBackground(getLuminance(...rgb) > 0.6);
          return;
        }
      }

      // 2) Tem background-image via CSS?
      const computed = window.getComputedStyle(el);
      const bgImage = computed.backgroundImage;
      if (bgImage && bgImage !== 'none') {
        const url = extractBgImageUrl(bgImage);
        if (url) {
          const cached = bgImageCache.current.get(url);
          if (cached) {
            const elRect = el.getBoundingClientRect();
            const relX = (sampleX - elRect.left) / elRect.width;
            const relY = (sampleY - elRect.top) / elRect.height;
            const rgb = sampleCachedBgPixel(cached, relX, relY);
            if (rgb) {
              setIsOnLightBackground(getLuminance(...rgb) > 0.6);
              return;
            }
          } else if (!bgImageCache.current.has(url)) {
            // ainda não carregada: dispara carregamento e, quando
            // pronta, roda a checagem de novo automaticamente
            ensureBgImageCached(url, findBackgroundLuminance);
          }
        }
      }

      // 3) Cor de fundo sólida (comportamento original, como fallback)
      const bg = computed.backgroundColor;
      const rgb = parseRgb(bg);
      if (rgb && bg !== 'rgba(0, 0, 0, 0)' && bg !== 'transparent') {
        setIsOnLightBackground(getLuminance(...rgb) > 0.6);
        return;
      }

      node = node.parentElement;
    }

    // nada encontrado até o topo: assume fundo escuro como padrão seguro
    setIsOnLightBackground(false);
  }, [sampleImagePixel, ensureBgImageCached]);

  useEffect(() => {
    const scheduleCheck = () => {
      if (rafId.current !== null) return;
      rafId.current = requestAnimationFrame(() => {
        rafId.current = null;
        findBackgroundLuminance();
      });
    };

    const initialTimeout = setTimeout(findBackgroundLuminance, 150);

    window.addEventListener('scroll', scheduleCheck, { passive: true });
    window.addEventListener('resize', scheduleCheck);

    return () => {
      clearTimeout(initialTimeout);
      window.removeEventListener('scroll', scheduleCheck);
      window.removeEventListener('resize', scheduleCheck);
      if (rafId.current !== null) cancelAnimationFrame(rafId.current);
    };
  }, [findBackgroundLuminance, location.pathname]);

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
        <ul
          className={`navbar-menu--desktop ${isOnLightBackground ? 'navbar-menu--on-light' : ''}`}
          ref={navMenuRef}
        >
          <li className="navbar-menu__translate-item">
            <button
              onClick={toggleLanguage}
              className="navbar-translate navbar-translate--desktop"
              aria-label={translateLabel}
              title={translateLabel}
            >
              <MdTranslate size={20} />
            </button>
          </li>
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

        {/* BOTÃO DE TRADUÇÃO (mobile) */}
        <button
          className="navbar-translate navbar-translate--mobile"
          onClick={toggleLanguage}
          aria-label={translateLabel}
          title={translateLabel}
        >
          <MdTranslate size={22} />
        </button>

        {/* BOTÃO MOBILE */}
        <button
          className={`navbar-toggle ${isMenuOpen ? 'toggle-active' : ''}`}
          onClick={toggleMenu}
          aria-label={t('nav.menuLabel')}
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