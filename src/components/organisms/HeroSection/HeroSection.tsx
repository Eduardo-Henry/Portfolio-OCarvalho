import React, { useRef, useState, useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { MdDownload } from 'react-icons/md';
import { Button } from '../../atoms';
import './HeroSection.css';
import Image3D from '../../../assets/images/Image3D.png';

interface HeroSectionProps {
  id?: string;
  title: string;
  subtitle?: string;
  description: string;
  ctaText?: string;
  imageSrc?: string;
}

/**
 * Limite MÁXIMO de deslocamento em pixels (não porcentagem da tela).
 * Isso garante que a forma nunca saia da área visível, independente
 * do tamanho da tela.
 */
const MAX_OFFSET_X = 36;
const MAX_OFFSET_Y = 22;

export const HeroSection: React.FC<HeroSectionProps> = ({
  id,
  title,
  description,
  ctaText,
  imageSrc = Image3D,
}) => {
  const { t } = useTranslation();
  const heroSectionRef = useRef<HTMLElement>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [isInteracting, setIsInteracting] = useState(false);

  // Pointer ativo durante um arrasto de touch (evita conflito com scroll)
  const activePointerId = useRef<number | null>(null);

  // Throttle via requestAnimationFrame para não empilhar setState a
  // cada coordenada bruta do evento (evita travamento no mobile).
  const rafId = useRef<number | null>(null);
  const pendingClient = useRef<{ x: number; y: number } | null>(null);

  const computeOffset = useCallback((clientX: number, clientY: number) => {
    const section = heroSectionRef.current;
    if (!section) return { x: 0, y: 0 };

    const rect = section.getBoundingClientRect();
    const normalizedX = ((clientX - rect.left) / rect.width) * 2 - 1;
    const normalizedY = ((clientY - rect.top) / rect.height) * 2 - 1;

    const clampedX = Math.max(-1, Math.min(1, normalizedX));
    const clampedY = Math.max(-1, Math.min(1, normalizedY));

    return {
      x: clampedX * MAX_OFFSET_X,
      y: clampedY * MAX_OFFSET_Y,
    };
  }, []);

  const scheduleOffsetUpdate = useCallback(
    (clientX: number, clientY: number) => {
      pendingClient.current = { x: clientX, y: clientY };
      if (rafId.current !== null) return;

      rafId.current = requestAnimationFrame(() => {
        rafId.current = null;
        if (pendingClient.current) {
          setOffset(computeOffset(pendingClient.current.x, pendingClient.current.y));
        }
      });
    },
    [computeOffset]
  );

  /**
   * DESKTOP (mouse): listener direto na window em vez de depender do
   * bubbling de um evento React (onPointerMove) até a <section>. Essa
   * abordagem é mais confiável — não depende de nenhum elemento estar
   * exatamente sob o cursor nem de peculiaridades do evento sintético
   * do React, só verifica se a posição do mouse está dentro dos
   * limites da hero-section a cada movimento.
   */
  useEffect(() => {
    const handleWindowMouseMove = (e: MouseEvent) => {
      // Se houver um arrasto de touch em andamento, o mouse não deve interferir
      if (activePointerId.current !== null) return;

      const section = heroSectionRef.current;
      if (!section) return;

      const rect = section.getBoundingClientRect();
      const isInsideSection =
        e.clientX >= rect.left &&
        e.clientX <= rect.right &&
        e.clientY >= rect.top &&
        e.clientY <= rect.bottom;

      if (isInsideSection) {
        setIsInteracting(true);
        scheduleOffsetUpdate(e.clientX, e.clientY);
      } else {
        setIsInteracting(false);
        setOffset({ x: 0, y: 0 });
      }
    };

    window.addEventListener('mousemove', handleWindowMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleWindowMouseMove);
      if (rafId.current !== null) {
        cancelAnimationFrame(rafId.current);
      }
    };
  }, [scheduleOffsetUpdate]);

  /**
   * MOBILE (touch): o arrasto precisa começar tocando a própria forma.
   * Usa pointer capture para continuar recebendo o movimento do dedo
   * mesmo quando ele sai da área original da imagem, sem sequestrar
   * o scroll da página em outros lugares da tela.
   */
  const handleShapePointerDown = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (e.pointerType !== 'touch') return; // mouse já é tratado pelo listener de window acima
      (e.currentTarget as HTMLDivElement).setPointerCapture(e.pointerId);
      activePointerId.current = e.pointerId;
      setIsInteracting(true);
      scheduleOffsetUpdate(e.clientX, e.clientY);
    },
    [scheduleOffsetUpdate]
  );

  const handleShapePointerMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (activePointerId.current !== e.pointerId) return;
      scheduleOffsetUpdate(e.clientX, e.clientY);
    },
    [scheduleOffsetUpdate]
  );

  const releaseShapePointer = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    if (activePointerId.current !== e.pointerId) return;
    activePointerId.current = null;
    if (rafId.current !== null) {
      cancelAnimationFrame(rafId.current);
      rafId.current = null;
    }
    setIsInteracting(false);
    setOffset({ x: 0, y: 0 });
  }, []);

  const handleContactClick = () => {
    const contactSection = document.getElementById('contact');
    contactSection?.scrollIntoView({ behavior: 'smooth' });
  };

  const resolvedCtaText = ctaText ?? t('hero.cta');

  return (
    <section className="hero-section" id={id} ref={heroSectionRef}>
      <div className="hero-wrapper">
        <div className="hero-grid">
          <div className="hero-brand">
            <h1 className="brand-title">
              EDUARDO<span className="brand-mark">®</span>
              UX DESIGNER
            </h1>
          </div>

          {imageSrc && (
            <div
              className="hero-image-container"
              onPointerDown={handleShapePointerDown}
              onPointerMove={handleShapePointerMove}
              onPointerUp={releaseShapePointer}
              onPointerCancel={releaseShapePointer}
            >
              <img
                src={imageSrc}
                alt={t('hero.imageAlt')}
                loading="lazy"
                className={`hero-image ${isInteracting ? 'hero-image--interactive' : ''}`}
                style={
                  isInteracting
                    ? { transform: `translate3d(${offset.x}px, ${offset.y}px, 0)` }
                    : undefined
                }
              />
            </div>
          )}

          <div className="hero-content">
            <h2 className="hero-headline">{title}</h2>
            <p className="hero-description">{description}</p>
          </div>

          <div className="hero-cta-wrapper">
             <Button
              variant="secondary"
              size="large"
              className="hero-cv-button"
              aria-label={t('hero.downloadCV')}
              onClick={() => {
                const link = document.createElement('a');
                link.href = '/EduardoHCarvalho-UXDesigner.pdf'; 
                link.download = 'EduardoHCarvalho-UXDesigner.pdf'; 
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
              }}
            >
              <MdDownload className="hero-cv-icon" />
              <span className="hero-cv-text">{t('hero.downloadCV')}</span>
            </Button>
            <Button
              variant="primary"
              size="large"
              onClick={handleContactClick}
              className="hero-cta-button"
              aria-label={resolvedCtaText}
            >
              <span className="hero-cta-text">{resolvedCtaText}</span>
              <span className="hero-cta-circle" aria-hidden="true">
                <svg
                  className="hero-cta-icon"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  aria-hidden="true"
                >
                  <path d="M7 17L17 7M17 7H7M17 7V17" />
                </svg>
              </span>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};