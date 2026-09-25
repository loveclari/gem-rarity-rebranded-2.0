'use client';

import CardCarousel, { CarouselCard } from '@/components/CardCarousel';
import { overlayImageForShape } from '@/lib/shape-images';

interface CaratSelectorProps {
  onCaratSelect: (carat: string) => void;
  selectedCarat: string | null;
  selectedShape: string | null;
  isOpen: boolean;
  onToggle: () => void;
}

const caratRanges = [
  { value: '0.30-0.39', label: '0.30-0.39', image: '/img/030-039.png' },
  { value: '0.40-0.49', label: '0.40-0.49', image: '/img/040-049.png' },
  { value: '0.50-0.69', label: '0.50-0.69', image: '/img/050-069.png' },
  { value: '1.00-1.49', label: '1.00-1.49', image: '/img/100-149.png' },
  { value: '1.50-1.99', label: '1.50-1.99', image: '/img/150-199.png' },
  { value: '2.00+', label: '2.00+', image: '/img/200.png' },
];

export default function CaratSelector({
  onCaratSelect,
  selectedCarat,
  selectedShape,
  isOpen,
  onToggle,
}: CaratSelectorProps) {
  const shapeImage = overlayImageForShape(selectedShape);
  const selectedIndex = caratRanges.findIndex(
    (carat) => carat.value === selectedCarat,
  );

  return (
    <div className="accordion-section">
      <button
        type="button"
        className={`header ${selectedCarat ? 'active' : ''}`}
        onClick={onToggle}
      >
        <i className="fa fa-check"></i>
        <span className="shape-name">CARAT WEIGHT</span>
        {selectedCarat && <span className="gem-shape">{selectedCarat}</span>}
      </button>

      <div className={`content ${isOpen ? 'open' : ''}`}>
        <CardCarousel selectedIndex={selectedIndex >= 0 ? selectedIndex : undefined}>
          {caratRanges.map((carat) => (
            <CarouselCard
              key={carat.value}
              label={carat.label}
              image={shapeImage}
              showLabel
              selected={selectedCarat === carat.value}
              onClick={() =>
                onCaratSelect(selectedCarat === carat.value ? '' : carat.value)
              }
            />
          ))}
        </CardCarousel>

        <div className="description-text">
          <p>Carat weight refers to the measurement of a diamond&apos;s weight.</p>
        </div>
      </div>
    </div>
  );
}
