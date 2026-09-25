'use client';

import { Children, useEffect, useMemo, useRef, useState } from 'react';

interface CardCarouselProps {
  children: React.ReactNode;
  selectedIndex?: number;
}

interface CarouselCardProps {
  selected: boolean;
  label: string;
  image: string;
  onClick: () => void;
  showLabel?: boolean;
}

export function CarouselCard({
  selected,
  label,
  image,
  onClick,
  showLabel = false,
}: CarouselCardProps) {
  return (
    <button
      type="button"
      className={`carousel-card${selected ? ' selected' : ''}${showLabel ? ' has-label' : ''}`}
      aria-label={label}
      aria-pressed={selected}
      onClick={onClick}
    >
      <img src={image} alt={label} />
      {showLabel && <span className="carousel-card__label">{label}</span>}
    </button>
  );
}

export default function CardCarousel({
  children,
  selectedIndex,
}: CardCarouselProps) {
  const items = useMemo(() => Children.toArray(children), [children]);
  const [center, setCenter] = useState(() =>
    selectedIndex != null && selectedIndex >= 0
      ? selectedIndex
      : Math.floor((items.length - 1) / 2),
  );
  const drag = useRef({
    active: false,
    dragging: false,
    startX: 0,
    lastStep: 0,
    pointerId: 0,
  });

  useEffect(() => {
    if (selectedIndex != null && selectedIndex >= 0) {
      setCenter(selectedIndex);
    }
  }, [selectedIndex]);

  const goTo = (index: number) => {
    setCenter(Math.max(0, Math.min(items.length - 1, index)));
  };

  const onPointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.button !== 0) return;
    drag.current = {
      active: true,
      dragging: false,
      startX: event.clientX,
      lastStep: 0,
      pointerId: event.pointerId,
    };
  };

  const onPointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!drag.current.active) return;
    const dx = event.clientX - drag.current.startX;
    if (!drag.current.dragging && Math.abs(dx) < 24) return;

    if (!drag.current.dragging) {
      drag.current.dragging = true;
      try {
        event.currentTarget.setPointerCapture(event.pointerId);
      } catch {
        /* already captured */
      }
      event.currentTarget.classList.add('is-dragging');
    }

    const step = Math.round(dx / -56);
    if (step !== drag.current.lastStep) {
      const delta = step - drag.current.lastStep;
      drag.current.lastStep = step;
      setCenter((current) =>
        Math.max(0, Math.min(items.length - 1, current + delta)),
      );
    }
  };

  const endDrag = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!drag.current.active) return;
    const wasDragging = drag.current.dragging;
    drag.current.active = false;
    drag.current.dragging = false;
    event.currentTarget.classList.remove('is-dragging');
    if (wasDragging) {
      try {
        event.currentTarget.releasePointerCapture(event.pointerId);
      } catch {
        /* already released */
      }
    }
  };

  const onClickCapture = (event: React.MouseEvent<HTMLDivElement>) => {
    if (drag.current.lastStep !== 0) {
      event.preventDefault();
      event.stopPropagation();
      drag.current.lastStep = 0;
    }
  };

  return (
    <div className="carousel">
      <button
        type="button"
        className="carousel-nav carousel-nav--left"
        aria-label="Previous"
        onClick={() => goTo(center - 1)}
      >
        <i className="fa fa-chevron-left" />
      </button>

      <div
        className="carousel-stage"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onLostPointerCapture={endDrag}
        onClickCapture={onClickCapture}
      >
        {items.map((child, index) => {
          const offset = index - center;
          const abs = Math.abs(offset);
          const scale = abs === 0 ? 1 : abs === 1 ? 0.9 : 0.8;
          return (
            <div
              key={index}
              className={`carousel-slot${abs === 0 ? ' is-center' : ''}${abs > 2 ? ' is-far' : ''}`}
              style={
                {
                  '--offset': offset,
                  '--scale': scale,
                  '--z': 20 - abs,
                } as React.CSSProperties
              }
            >
              {child}
            </div>
          );
        })}
      </div>

      <button
        type="button"
        className="carousel-nav carousel-nav--right"
        aria-label="Next"
        onClick={() => goTo(center + 1)}
      >
        <i className="fa fa-chevron-right" />
      </button>
    </div>
  );
}
