'use client';

import CardCarousel, { CarouselCard } from '@/components/CardCarousel';
import { overlayImageForShape } from '@/lib/shape-images';

interface ColorSelectorProps {
  onColorSelect: (color: string) => void;
  selectedColor: string | null;
  selectedShape: string | null;
  isOpen: boolean;
  onToggle: () => void;
}

const colorGrades = [
  'D',
  'E',
  'F',
  'G',
  'H',
  'I',
  'J',
  'K',
  'L',
  'M',
  'N',
  'O',
  'P',
];

export default function ColorSelector({
  onColorSelect,
  selectedColor,
  selectedShape,
  isOpen,
  onToggle,
}: ColorSelectorProps) {
  const shapeImage = overlayImageForShape(selectedShape);
  const selectedIndex = colorGrades.findIndex((color) => color === selectedColor);

  return (
    <div className="accordion-section">
      <button
        type="button"
        className={`header ${selectedColor ? 'active' : ''}`}
        onClick={onToggle}
      >
        <i className="fa fa-check"></i>
        <span className="shape-name">COLOR</span>
        {selectedColor && <span className="gem-shape">{selectedColor}</span>}
      </button>

      <div className={`content ${isOpen ? 'open' : ''}`}>
        <CardCarousel selectedIndex={selectedIndex >= 0 ? selectedIndex : undefined}>
          {colorGrades.map((color) => (
            <CarouselCard
              key={color}
              label={color}
              image={shapeImage}
              showLabel
              selected={selectedColor === color}
              onClick={() =>
                onColorSelect(selectedColor === color ? '' : color)
              }
            />
          ))}
        </CardCarousel>

        <div className="description-text">
          <p>
            The diamond color evaluation of most gem-quality diamonds is based
            on the absence of color.
          </p>
        </div>
      </div>
    </div>
  );
}
