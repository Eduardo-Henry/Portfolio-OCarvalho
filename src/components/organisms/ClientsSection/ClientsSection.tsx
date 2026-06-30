import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import './ClientsSection.css';
import CoWorkerPhoto from '../../../assets/images/GuiPhoto.png';
import FirstClient from '../../../assets/images/Matheus.png';
import SecondClient from '../../../assets/images/Mariana.png';
import ElvisPhoto from '../../../assets/images/ElvisFoto.png';

interface Client {
  id: number;
  name: string;
  location: string;
  image?: string;
}

const clients: Client[] = [
  {
    id: 4,
    name: 'Elvis Vinícius',
    location: 'Urupês-SP',
    image: ElvisPhoto,
  },
  {
    id: 1,
    name: 'Guilherme Lira',
    location: 'Urupês-SP',
    image: CoWorkerPhoto,
  },
  {
    id: 2,
    name: 'Matheus Terradas',
    location: 'Polônia-SP',
    image: FirstClient,
  },
  {
    id: 3,
    name: 'Mariana Terradas',
    location: 'Polônia-SP',
    image: SecondClient,
  },
];

export const ClientsSection: React.FC = () => {
  const { t } = useTranslation();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isSectionVisible, setIsSectionVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const outerRef = useRef<HTMLDivElement>(null);

  const dragStartX = useRef<number | null>(null);
  const dragCurrentX = useRef<number>(0);
  const autoPlayRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const total = clients.length;

  const snapTo = useCallback((index: number) => {
    if (!trackRef.current || !outerRef.current) return;
    const w = outerRef.current.getBoundingClientRect().width;
    trackRef.current.style.transition = 'transform 0.45s cubic-bezier(0.25, 1, 0.5, 1)';
    trackRef.current.style.transform = `translateX(${-index * w}px)`;
  }, []);

  useEffect(() => {
    snapTo(0);
  }, [snapTo]);

  const goTo = useCallback(
    (index: number) => {
      const next = ((index % total) + total) % total;
      setCurrentIndex(next);
      snapTo(next);
    },
    [total, snapTo]
  );

  const goNext = useCallback(() => goTo(currentIndex + 1), [currentIndex, goTo]);
  const goPrev = useCallback(() => goTo(currentIndex - 1), [currentIndex, goTo]);

  const startAutoPlay = useCallback(() => {
    if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    autoPlayRef.current = setInterval(() => {
      setCurrentIndex((prev) => {
        const next = (prev + 1) % total;
        requestAnimationFrame(() => {
          if (!trackRef.current || !outerRef.current) return;
          const w = outerRef.current.getBoundingClientRect().width;
          trackRef.current.style.transition = 'transform 0.45s cubic-bezier(0.25, 1, 0.5, 1)';
          trackRef.current.style.transform = `translateX(${-next * w}px)`;
        });
        return next;
      });
    }, 7000);
  }, [total]);

  const stopAutoPlay = useCallback(() => {
    if (autoPlayRef.current) clearInterval(autoPlayRef.current);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsSectionVisible(entry.isIntersecting),
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (isSectionVisible) startAutoPlay();
    else stopAutoPlay();
    return stopAutoPlay;
  }, [isSectionVisible, startAutoPlay, stopAutoPlay]);

  useEffect(() => {
    const handleResize = () => snapTo(currentIndex);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [currentIndex, snapTo]);

  const handleTouchStart = (e: React.TouchEvent) => {
    dragStartX.current = e.touches[0].clientX;
    dragCurrentX.current = 0;
    stopAutoPlay();
    if (trackRef.current) trackRef.current.style.transition = 'none';
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (dragStartX.current === null || !trackRef.current || !outerRef.current) return;
    const diff = e.touches[0].clientX - dragStartX.current;
    dragCurrentX.current = diff;
    const w = outerRef.current.getBoundingClientRect().width;
    trackRef.current.style.transition = 'none';
    trackRef.current.style.transform = `translateX(${-currentIndex * w + diff}px)`;
  };

  const handleTouchEnd = () => {
    const diff = dragCurrentX.current;
    if (Math.abs(diff) > 60) {
      diff < 0 ? goNext() : goPrev();
    } else {
      snapTo(currentIndex);
    }
    dragStartX.current = null;
    dragCurrentX.current = 0;
    startAutoPlay();
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    dragStartX.current = e.clientX;
    dragCurrentX.current = 0;
    stopAutoPlay();
    if (trackRef.current) trackRef.current.style.transition = 'none';
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (dragStartX.current === null || !trackRef.current || !outerRef.current) return;
    const diff = e.clientX - dragStartX.current;
    dragCurrentX.current = diff;
    const w = outerRef.current.getBoundingClientRect().width;
    trackRef.current.style.transition = 'none';
    trackRef.current.style.transform = `translateX(${-currentIndex * w + diff}px)`;
  };

  const handleMouseUp = () => {
    const diff = dragCurrentX.current;
    if (Math.abs(diff) > 60) {
      diff < 0 ? goNext() : goPrev();
    } else {
      snapTo(currentIndex);
    }
    dragStartX.current = null;
    dragCurrentX.current = 0;
    startAutoPlay();
  };

  const renderAnimatedText = (text: string) => {
    const words = text.split(' ');
    return words.map((word, index) => {
      const delay = (index / words.length) * 3;
      return (
        <span
          key={index}
          className={`animated-word ${isSectionVisible ? 'animate' : ''}`}
          style={{ animationDelay: `${delay}s` }}
        >
          {word}{' '}
        </span>
      );
    });
  };

  return (
    <section className="clients-section" id="clients" ref={sectionRef}>
      {/* HEADER */}
      <div className="clients-header-zone">
        <div className="clients-counter">
          <span className="counter-number">+23</span>
          <span className="counter-label">{t('clients.networkings')}</span>
        </div>
        <h2 className="clients-title">
          {t('clients.title')} <span className="clients-mark">®</span>
        </h2>
      </div>

      {/* CAROUSEL */}
      <div
        className="clients-carousel-outer"
        ref={outerRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div className="clients-carousel-track" ref={trackRef}>
          {clients.map((client, i) => {
            const role = t(`clients.items.${client.id}.role`);
            const feedback = t(`clients.items.${client.id}.feedback`);
            return (
              <div className="clients-slide" key={client.id}>
                {/* FOTO + META */}
                <div className="clients-profile-zone">
                  <div className="clients-featured">
                    <div className="client-featured-image">
                      <img src={client.image} alt={client.name} draggable={false} />
                    </div>
                    <div className="client-meta-container">
                      <h3 className="client-featured-info">
                        {client.name}, {client.location}
                      </h3>
                      <p className="client-role">{role}</p>
                    </div>
                  </div>
                </div>

                {/* TEXTO */}
                <p className="clients-description">
                  &ldquo;
                  {i === currentIndex
                    ? renderAnimatedText(feedback)
                    : feedback}
                  &rdquo;
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* RODAPÉ FIXO */}
      <div className="clients-footer-fixed">

        {/* Coluna esquerda — no mobile vira o botão CTA alinhado à foto */}
        <div className="clients-footer-left">
          <a href="#contact" className="clients-cta-wrapper clients-cta-mobile">
            <span className="cta-text">{t('clients.cta')}</span>
            <div className="cta-icon-circle">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M7 17L17 7M17 7H7M17 7V17" />
              </svg>
            </div>
          </a>
        </div>

        {/* Coluna direita — nav + botão CTA (desktop) inline */}
        <div className="clients-footer-right">

          <div className="clients-nav-buttons">
            <button
              className="carousel-btn"
              onClick={() => { stopAutoPlay(); goPrev(); startAutoPlay(); }}
              aria-label={t('clients.previous')}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>

            <div className="carousel-dots">
              {clients.map((_, i) => (
                <button
                  key={i}
                  className={`carousel-dot ${i === currentIndex ? 'active' : ''}`}
                  onClick={() => { stopAutoPlay(); goTo(i); startAutoPlay(); }}
                  aria-label={t('clients.feedbackLabel', { number: i + 1 })}
                />
              ))}
            </div>

            <button
              className="carousel-btn"
              onClick={() => { stopAutoPlay(); goNext(); startAutoPlay(); }}
              aria-label={t('clients.next')}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          </div>

          {/* Botão CTA — só aparece no desktop */}
          <div className="clients-cta-container">
            <a href="#contact" className="clients-cta-wrapper">
              <span className="cta-text">{t('clients.cta')}</span>
              <div className="cta-icon-circle">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M7 17L17 7M17 7H7M17 7V17" />
                </svg>
              </div>
            </a>
          </div>

        </div>
      </div>
    </section>
  );
}