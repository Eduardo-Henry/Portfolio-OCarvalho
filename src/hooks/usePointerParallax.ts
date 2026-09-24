import { useCallback, useEffect, useRef, useState } from 'react';

interface UsePointerParallaxOptions {
  boundsRef: React.RefObject<HTMLElement | null>;
  maxX?: number;
  maxY?: number;
}

export const usePointerParallax = ({
  boundsRef,
  maxX = 36,
  maxY = 22,
}: UsePointerParallaxOptions) => {
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [isInteracting, setIsInteracting] = useState(false);
  const prefersReducedMotion = typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const activePointerId = useRef<number | null>(null);
  const rafId = useRef<number | null>(null);
  const pendingClient = useRef<{ x: number; y: number } | null>(null);

  const computeOffset = useCallback((clientX: number, clientY: number) => {
    const bounds = boundsRef.current;
    if (!bounds) return { x: 0, y: 0 };

    const rect = bounds.getBoundingClientRect();
    const normalizedX = ((clientX - rect.left) / rect.width) * 2 - 1;
    const normalizedY = ((clientY - rect.top) / rect.height) * 2 - 1;

    return {
      x: Math.max(-1, Math.min(1, normalizedX)) * maxX,
      y: Math.max(-1, Math.min(1, normalizedY)) * maxY,
    };
  }, [boundsRef, maxX, maxY]);

  const scheduleOffsetUpdate = useCallback((clientX: number, clientY: number) => {
    pendingClient.current = { x: clientX, y: clientY };
    if (rafId.current !== null) return;

    rafId.current = requestAnimationFrame(() => {
      rafId.current = null;
      if (pendingClient.current) {
        setOffset(computeOffset(pendingClient.current.x, pendingClient.current.y));
      }
    });
  }, [computeOffset]);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      if (prefersReducedMotion) return;
      if (activePointerId.current !== null) return;
      const bounds = boundsRef.current;
      if (!bounds) return;
      const rect = bounds.getBoundingClientRect();
      const inside = event.clientX >= rect.left && event.clientX <= rect.right &&
        event.clientY >= rect.top && event.clientY <= rect.bottom;

      setIsInteracting(inside);
      if (inside) scheduleOffsetUpdate(event.clientX, event.clientY);
      else setOffset({ x: 0, y: 0 });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (rafId.current !== null) cancelAnimationFrame(rafId.current);
    };
  }, [boundsRef, prefersReducedMotion, scheduleOffsetUpdate]);

  const handlePointerDown = useCallback((event: React.PointerEvent<HTMLElement>) => {
    if (prefersReducedMotion) return;
    if (event.pointerType !== 'touch') return;
    event.currentTarget.setPointerCapture(event.pointerId);
    activePointerId.current = event.pointerId;
    setIsInteracting(true);
    scheduleOffsetUpdate(event.clientX, event.clientY);
  }, [prefersReducedMotion, scheduleOffsetUpdate]);

  const handlePointerMove = useCallback((event: React.PointerEvent<HTMLElement>) => {
    if (activePointerId.current === event.pointerId) {
      scheduleOffsetUpdate(event.clientX, event.clientY);
    }
  }, [scheduleOffsetUpdate]);

  const handlePointerEnd = useCallback((event: React.PointerEvent<HTMLElement>) => {
    if (activePointerId.current !== event.pointerId) return;
    activePointerId.current = null;
    if (rafId.current !== null) {
      cancelAnimationFrame(rafId.current);
      rafId.current = null;
    }
    setIsInteracting(false);
    setOffset({ x: 0, y: 0 });
  }, []);

  return {
    offset,
    isInteracting,
    pointerHandlers: {
      onPointerDown: handlePointerDown,
      onPointerMove: handlePointerMove,
      onPointerUp: handlePointerEnd,
      onPointerCancel: handlePointerEnd,
    },
  };
};
