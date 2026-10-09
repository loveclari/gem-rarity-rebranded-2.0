'use client';

import CardCarousel, { CarouselCard } from '@/components/CardCarousel';

interface ShapeSelectorProps {
  onShapeSelect: (shape: string) => void;
  selectedShape: string | null;
  isOpen: boolean;
  onToggle: () => void;
}

const shapes = [
  { id: 'Heart', name: 'Heart' },
  { id: 'Pear', name: 'Pear' },
  { id: 'Marquise', name: 'Marquise' },
  { id: 'Cushion', name: 'Cushion' },
  { id: 'Round', name: 'Round' },
  { id: 'Oval', name: 'Oval' },
  { id: 'Square', name: 'Square' },
  { id: 'Emerald', name: 'Emerald' },
  { id: 'Rectangle', name: 'Rectangle' },
];

export default function ShapeSelector({
  onShapeSelect,
  selectedShape,
  isOpen,
  onToggle,
}: ShapeSelectorProps) {
  const selectedIndex = shapes.findIndex((shape) => shape.id === selectedShape);

  return (
    <div className="accordion-section">
      <button
        type="button"
        className={`header ${selectedShape ? 'active' : ''}`}
        onClick={onToggle}
      >
        <i className="fa fa-check"></i>
        <span className="shape-name">SHAPE</span>
        {selectedShape && <span className="gem-shape">{selectedShape}</span>}
      </button>

      <div className={`content ${isOpen ? 'open' : ''}`}>
        <CardCarousel selectedIndex={selectedIndex >= 0 ? selectedIndex : undefined}>
          {shapes.map((shape) => (
            <CarouselCard
              key={shape.id}
              label={shape.name}
              image={`/img/${shape.id}.png`}
              showLabel
              selected={selectedShape === shape.id}
              onClick={() => onShapeSelect(selectedShape === shape.id ? '' : shape.id)}
            />
          ))}
        </CardCarousel>

        <div className="description-text">
          <p>Shape refers to the geometric outline and overall physical form of a diamond.</p>
        </div>
      </div>
    </div>
  );
}
