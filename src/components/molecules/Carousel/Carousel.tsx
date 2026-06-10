import React, { useRef, useEffect, useCallback } from 'react';
import './Carousel.css';

interface CarouselProps {
  images: string[];
  speed?: number;
  friction?: number;
}

export const Carousel: React.FC<CarouselProps> = ({
  images,
  speed = 80,
  friction = 0.92,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  const stateRef = useRef({
    x: 0,
    velocity: 0,
    lastTime: 0,
    blockWidth: 0,
    rafId: 0,
    phase: 'auto' as 'auto' | 'dragging' | 'inertia' | 'resuming',
    dragStartX: 0,
    dragStartTrackX: 0,
    isHovered: false,
    ready: false, // bloqueia o RAF até as imagens medirem o blockWidth
  });

  if (images.length === 0) {
    return <div className="carousel-empty">Nenhuma imagem disponível</div>;
  }

  const tripled = [...images, ...images, ...images];

  const prefersReducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const effectiveSpeed = prefersReducedMotion ? 0 : speed;

  const applyTransform = useCallback((x: number) => {
    if (!trackRef.current) return;
    trackRef.current.style.transform = `translate3d(${x}px, 0, 0)`;
  }, []);

  // Normaliza: mantém x sempre no bloco do meio (invisível ao usuário)
  const normalizeX = useCallback((x: number, blockWidth: number): number => {
    if (blockWidth === 0) return x;
    // Reset instantâneo quando passa dos limites — sem while para evitar loop preso
    if (x > -blockWidth) return x - blockWidth;
    if (x < -2 * blockWidth) return x + blockWidth;
    return x;
  }, []);

  const tick = useCallback((timestamp: number) => {
    const s = stateRef.current;

    // Recalcula blockWidth a cada frame até estabilizar
    // (garante que imagens já carregaram e o layout foi calculado)
    if (trackRef.current) {
      const measured = trackRef.current.scrollWidth / 3;
      if (measured !== s.blockWidth && measured > 0) {
        s.blockWidth = measured;
        if (!s.ready) {
          s.x = -s.blockWidth;
          s.ready = true;
        }
      }
    }

    if (!s.ready) {
      s.rafId = requestAnimationFrame(tick);
      return;
    }

    if (!s.lastTime) s.lastTime = timestamp;
    const dt = Math.min((timestamp - s.lastTime) / 1000, 0.05);
    s.lastTime = timestamp;

    switch (s.phase) {
      case 'auto': {
        if (!s.isHovered) s.x -= effectiveSpeed * dt;
        break;
      }
      case 'inertia': {
        s.x += s.velocity;
        s.velocity *= friction;
        if (Math.abs(s.velocity) < 0.3) {
          s.velocity = 0;
          s.phase = 'resuming';
          s.lastTime = timestamp;
        }
        break;
      }
      case 'resuming': {
        s.phase = 'auto';
        break;
      }
      case 'dragging':
        break;
    }

    s.x = normalizeX(s.x, s.blockWidth);
    applyTransform(s.x);

    s.rafId = requestAnimationFrame(tick);
  }, [effectiveSpeed, friction, applyTransform, normalizeX]);

  useEffect(() => {
    stateRef.current.rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(stateRef.current.rafId);
  }, [tick]);

  const beginDrag = useCallback((clientX: number) => {
    const s = stateRef.current;
    s.phase = 'dragging';
    s.velocity = 0;
    s.dragStartX = clientX;
    s.dragStartTrackX = s.x;
  }, []);

  const moveDrag = useCallback((clientX: number) => {
    const s = stateRef.current;
    if (s.phase !== 'dragging') return;
    const delta = clientX - s.dragStartX;
    const newX = s.dragStartTrackX + delta;
    s.velocity = newX - s.x;
    s.x = normalizeX(newX, s.blockWidth);
    applyTransform(s.x);
  }, [normalizeX, applyTransform]);

  const endDrag = useCallback(() => {
    const s = stateRef.current;
    if (s.phase !== 'dragging') return;
    if (Math.abs(s.velocity) > 0.5) {
      s.phase = 'inertia';
    } else {
      s.velocity = 0;
      s.phase = 'auto';
    }
  }, []);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    beginDrag(e.clientX);
    const onMove = (ev: MouseEvent) => moveDrag(ev.clientX);
    const onUp = () => {
      endDrag();
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);
    };
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
  }, [beginDrag, moveDrag, endDrag]);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    beginDrag(e.touches[0].clientX);
  }, [beginDrag]);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    moveDrag(e.touches[0].clientX);
  }, [moveDrag]);

  const handleTouchEnd = useCallback(() => {
    endDrag();
  }, [endDrag]);

  const handleMouseEnter = useCallback(() => {
    stateRef.current.isHovered = true;
  }, []);

  const handleMouseLeave = useCallback(() => {
    stateRef.current.isHovered = false;
    if (stateRef.current.phase === 'dragging') endDrag();
  }, [endDrag]);

  return (
    <div
      ref={containerRef}
      className="carousel-container"
      onMouseDown={handleMouseDown}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      aria-label="Carrossel de imagens"
      role="region"
    >
      <div ref={trackRef} className="carousel-track">
        {tripled.map((image, index) => (
          <div key={index} className="carousel-item">
            <img
              src={image}
              alt={`Slide ${(index % images.length) + 1}`}
              className="carousel-image"
              draggable={false}
            />
          </div>
        ))}
      </div>
    </div>
  );
};