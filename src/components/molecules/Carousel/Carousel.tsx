import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import './Carousel.css';

interface CarouselProps {
  images: string[];
  speed?: number;
  friction?: number;
  autoPlayInterval?: number;
}

const SPEED    = 0.5;  // px por frame — mais devagar
const FRICTION = 0.90;

function norm(x: number, bw: number) {
  if (x < -bw) return x + bw;
  if (x > 0)   return x - bw;
  return x;
}

// ── Hook para cada fileira independente ──────────────────────
function useRow(
  ref: React.RefObject<HTMLDivElement | null>,
  direction: 1 | -1, // 1 = esquerda, -1 = direita
) {
  const state = useRef({
    x: 0, bw: 0, measured: false,
    phase: 'auto' as 'auto' | 'drag' | 'inertia',
    vel: 0,
    dragStartX: 0, dragX: 0,
  });

  const apply = useCallback(() => {
    if (ref.current) ref.current.style.transform = `translateX(${state.current.x}px)`;
  }, [ref]);

  const tick = useCallback(() => {
    const st = state.current;

    if (!st.measured && ref.current) {
      const bw = ref.current.scrollWidth / 3;
      if (bw > 0) {
        st.bw = bw;
        // fileira direita começa no bloco do meio
        if (direction === -1) st.x = -bw;
        st.measured = true;
      }
    }

    if (st.measured) {
      if (st.phase === 'auto') {
        st.x -= direction * SPEED;
      } else if (st.phase === 'inertia') {
        st.x += st.vel;
        st.vel *= FRICTION;
        if (Math.abs(st.vel) < 0.2) { st.vel = 0; st.phase = 'auto'; }
      }
      st.x = norm(st.x, st.bw);
      apply();
    }
  }, [direction, apply, ref]);

  // inicia drag nesta fileira
  const beginDrag = useCallback((clientX: number) => {
    const st = state.current;
    st.phase = 'drag';
    st.vel = 0;
    st.dragStartX = clientX;
    st.dragX = st.x;
  }, []);

  const moveDrag = useCallback((clientX: number) => {
    const st = state.current;
    if (st.phase !== 'drag') return;
    const delta = clientX - st.dragStartX;
    st.vel = delta - (st.x - st.dragX);
    st.x = norm(st.dragX + delta, st.bw);
    apply();
  }, [apply]);

  const endDrag = useCallback(() => {
    const st = state.current;
    if (st.phase !== 'drag') return;
    st.phase = Math.abs(st.vel) > 1 ? 'inertia' : 'auto';
  }, []);

  return { tick, beginDrag, moveDrag, endDrag };
}

// ── Componente principal ─────────────────────────────────────
export const Carousel: React.FC<CarouselProps> = ({ images }) => {
  const uniqueImages = useMemo(() => Array.from(new Set(images)), [images]);
  const [col1, setCol1] = useState<string[]>([]);
  const [col2, setCol2] = useState<string[]>([]);
  const [ready, setReady] = useState(false);

  const row1Ref = useRef<HTMLDivElement>(null);
  const row2Ref = useRef<HTMLDivElement>(null);
  const rafId   = useRef(0);

  const row1 = useRow(row1Ref, 1); // vai para esquerda
  const row2 = useRow(row2Ref, -1); // vai para direita
  const tickRow1 = row1.tick;
  const tickRow2 = row2.tick;

  // Loop RAF compartilhado
  useEffect(() => {
    if (
      !ready ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      return;
    }

    const loop = () => {
      tickRow1();
      tickRow2();
      rafId.current = requestAnimationFrame(loop);
    };
    rafId.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafId.current);
  }, [ready, tickRow1, tickRow2]);

  // Detecta ratio e distribui imagens
  useEffect(() => {
    if (uniqueImages.length === 0) return;
    let cancelled = false;
    let resolved = 0;
    const landscape: string[] = [];
    const portrait:  string[] = [];
    const validImages: string[] = [];
    const preloadImages = uniqueImages.map(() => new Image());

    uniqueImages.forEach((src, index) => {
      const img = preloadImages[index];
      const done = () => {
        if (cancelled) return;
        resolved++;
        if (resolved === uniqueImages.length) finalize();
      };

      img.onload = () => {
        validImages.push(src);
        (img.naturalWidth > img.naturalHeight ? landscape : portrait).push(src);
        done();
      };
      img.onerror = () => {
        done();
      };
      img.src = src;
    });

    function finalize() {
      if (cancelled) return;
      if (validImages.length === 0) {
        setCol1([]);
        setCol2([]);
      } else if (landscape.length === 0 || portrait.length === 0) {
        const half = Math.ceil(validImages.length / 2);
        setCol1(validImages.slice(0, half));
        setCol2(validImages.slice(half));
      } else {
        setCol1(landscape);
        setCol2(portrait);
      }
      setReady(true);
    }

    return () => {
      cancelled = true;
      preloadImages.forEach((img) => {
        img.onload = null;
        img.onerror = null;
      });
    };
  }, [uniqueImages]);

  // ── Handlers: cada fileira escuta seu próprio elemento ──────
  const makeMouseHandlers = (row: ReturnType<typeof useRow>) => ({
    onMouseDown: (e: React.MouseEvent) => {
      row.beginDrag(e.clientX);
      e.preventDefault();

      const onMove = (ev: MouseEvent) => row.moveDrag(ev.clientX);
      const onUp   = () => {
        row.endDrag();
        window.removeEventListener('mousemove', onMove);
        window.removeEventListener('mouseup',   onUp);
      };
      window.addEventListener('mousemove', onMove);
      window.addEventListener('mouseup',   onUp);
    },
  });

  const makeTouchHandlers = (row: ReturnType<typeof useRow>) => ({
    onTouchStart: (e: React.TouchEvent) => row.beginDrag(e.touches[0].clientX),
    onTouchMove:  (e: React.TouchEvent) => row.moveDrag(e.touches[0].clientX),
    onTouchEnd:   ()                    => row.endDrag(),
  });

  if (uniqueImages.length === 0) return <div className="carousel-empty">Nenhuma imagem disponível</div>;
  if (!ready)              return <div className="carousel-loading" />;

  const rows = [
    { col: col1, ref: row1Ref, mouse: makeMouseHandlers(row1), touch: makeTouchHandlers(row1) },
    { col: col2, ref: row2Ref, mouse: makeMouseHandlers(row2), touch: makeTouchHandlers(row2) },
  ];

  return (
    <div className="carousel-container" role="region" aria-label="Galeria de designs">
      {rows.map(({ col, ref, mouse, touch }, idx) => {
        const tripled = [...col, ...col, ...col];
        return (
          <div
            key={idx}
            className="carousel-row"
            {...mouse}
            {...touch}
          >
            <div ref={ref} className="carousel-row-track">
              {tripled.map((src, i) => (
                <div key={i} className="carousel-item">
                  <img
                    src={src}
                    alt={`Design ${(i % col.length) + 1}`}
                    className="carousel-image"
                    draggable={false}
                    loading={i < col.length * 2 ? 'eager' : 'lazy'}
                  />
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};
