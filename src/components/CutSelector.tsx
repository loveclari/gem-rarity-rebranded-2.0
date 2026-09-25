'use client';

import CardCarousel, { CarouselCard } from '@/components/CardCarousel';
import { overlayImageForShape } from '@/lib/shape-images';

interface CutSelectorProps {
  onCutSelect: (cut: string) => void;
  selectedCut: string | null;
  selectedShape: string | null;
  isOpen: boolean;
  onToggle: () => void;
}

const cutGrades = ['Excellent', 'Very Good', 'Good', 'Fair', 'Poor'];

export default function CutSelector({
  onCutSelect,
  selectedCut,
  selectedShape,
  isOpen,
  onToggle,
}: CutSelectorProps) {
  const shapeImage = overlayImageForShape(selectedShape);
  const selectedIndex = cutGrades.findIndex((cut) => cut === selectedCut);

  return (
    <div className="accordion-section">
      <button
        type="button"
        className={`header ${selectedCut ? 'active' : ''}`}
        onClick={onToggle}
      >
        <i className="fa fa-check"></i>
        <span className="shape-name">CUT</span>
        {selectedCut && <span className="gem-shape">{selectedCut}</span>}
      </button>

      <div className={`content ${isOpen ? 'open' : ''}`}>
        <CardCarousel selectedIndex={selectedIndex >= 0 ? selectedIndex : undefined}>
          {cutGrades.map((cut) => (
            <CarouselCard
              key={cut}
              label={cut}
              image={shapeImage}
              showLabel
              selected={selectedCut === cut}
              onClick={() =>
                onCutSelect(selectedCut === cut ? '' : cut)
              }
            />
          ))}
        </CardCarousel>

        <div className="description-text">
          <p>Cut refers to how well a diamond&apos;s facets interact with light.</p>
        </div>
      </div>
    </div>
  );
}
