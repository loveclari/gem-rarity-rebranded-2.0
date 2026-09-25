'use client';

import CardCarousel, { CarouselCard } from '@/components/CardCarousel';
import { overlayImageForShape } from '@/lib/shape-images';

interface ClaritySelectorProps {
  onClaritySelect: (clarity: string) => void;
  selectedClarity: string | null;
  selectedShape: string | null;
  isOpen: boolean;
  onToggle: () => void;
}

const clarityGrades = [
  { value: 'FL', image: '/img/FL.png' },
  { value: 'IF', image: '/img/IF.png' },
  { value: 'VVS1', image: '/img/VVS1.png' },
  { value: 'VVS2', image: '/img/VVS2.png' },
  { value: 'VS1', image: '/img/VS1.png' },
  { value: 'VS2', image: '/img/VS2.png' },
  { value: 'SI1', image: '/img/SI1.png' },
  { value: 'SI2', image: '/img/SI2.png' },
  { value: 'I1', image: '/img/I1.png' },
  { value: 'I2', image: '/img/I2.png' },
  { value: 'I3', image: '/img/I3.png' },
];

export default function ClaritySelector({
  onClaritySelect,
  selectedClarity,
  selectedShape,
  isOpen,
  onToggle,
}: ClaritySelectorProps) {
  const shapeImage = overlayImageForShape(selectedShape);
  const selectedIndex = clarityGrades.findIndex(
    (clarity) => clarity.value === selectedClarity,
  );

  return (
    <div className="accordion-section">
      <button
        type="button"
        className={`header ${selectedClarity ? 'active' : ''}`}
        onClick={onToggle}
      >
        <i className="fa fa-check"></i>
        <span className="shape-name">CLARITY</span>
        {selectedClarity && <span className="gem-shape">{selectedClarity}</span>}
      </button>

      <div className={`content ${isOpen ? 'open' : ''}`}>
        <CardCarousel selectedIndex={selectedIndex >= 0 ? selectedIndex : undefined}>
          {clarityGrades.map((clarity) => (
            <CarouselCard
              key={clarity.value}
              label={clarity.value}
              image={shapeImage}
              showLabel
              selected={selectedClarity === clarity.value}
              onClick={() =>
                onClaritySelect(
                  selectedClarity === clarity.value ? '' : clarity.value,
                )
              }
            />
          ))}
        </CardCarousel>

        <div className="description-text">
          <p>Clarity refers to the absence of inclusions and blemishes.</p>
        </div>
      </div>
    </div>
  );
}
