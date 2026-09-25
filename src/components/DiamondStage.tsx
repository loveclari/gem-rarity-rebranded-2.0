'use client';

const OUTLINES: Record<string, string> = {
  Round:
    'M140 32c59.6 0 108 48.4 108 108s-48.4 108-108 108S32 199.6 32 140 80.4 32 140 32z',
  Oval: 'M140 24c46 0 84 52 84 116s-38 116-84 116-84-52-84-116S94 24 140 24z',
  Cushion:
    'M86 40h108c22 0 40 18 40 40v120c0 22-18 40-40 40H86c-22 0-40-18-40-40V80c0-22 18-40 40-40z',
  Square:
    'M96 44h88l52 52v88l-52 52H96l-52-52V96l52-52z',
  Emerald:
    'M92 40h96l48 48v104l-48 48H92l-48-48V88l48-48z',
  Rectangle:
    'M64 62h152l40 40v76l-40 40H64l-40-40v-76l40-40z',
  Pear: 'M140 30c34 0 70 34 78 78 8 48-10 96-40 128-12 12-24 20-38 24-14-4-26-12-38-24-30-32-48-80-40-128 8-44 44-78 78-78z',
  Marquise:
    'M140 22c42 48 86 86 86 118s-44 70-86 118c-42-48-86-86-86-118s44-70 86-118z',
  Heart:
    'M140 228C140 228 52 162 52 108 52 74 78 50 106 50c18 0 30 10 34 24 4-14 16-24 34-24 28 0 54 24 54 58 0 54-88 120-88 120z',
};

interface DiamondStageProps {
  shape: string | null;
}

export default function DiamondStage({ shape }: DiamondStageProps) {
  const name = shape && OUTLINES[shape] ? shape : 'Round';
  const outline = OUTLINES[name];

  return (
    <div className="gem-stage" aria-hidden="true">
      <svg viewBox="0 0 280 280" className="gem-svg">
        <defs>
          <clipPath id={`gem-clip-${name}`}>
            <path d={outline} />
          </clipPath>
          <linearGradient id="gem-shine" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0" />
            <stop offset="42%" stopColor="#ffffff" stopOpacity="0" />
            <stop offset="50%" stopColor="#ffffff" stopOpacity="0.95" />
            <stop offset="58%" stopColor="#ffffff" stopOpacity="0" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
          </linearGradient>
          <radialGradient id="gem-body" cx="42%" cy="32%" r="70%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="38%" stopColor="#e7f0f8" />
            <stop offset="100%" stopColor="#b7c9da" />
          </radialGradient>
        </defs>

        <ellipse className="gem-shadow" cx="140" cy="248" rx="72" ry="12" />

        <g className="gem-stone" key={name}>
          <g clipPath={`url(#gem-clip-${name})`}>
            <rect width="280" height="280" fill="url(#gem-body)" />
            <polygon className="facet-cool" points="40,150 140,70 90,210" />
            <polygon className="facet-cool delay-2" points="240,150 140,70 190,210" />
            <polygon className="facet-mid" points="70,90 140,150 40,160" />
            <polygon className="facet-mid delay-1" points="210,90 140,150 240,160" />
            <polygon className="facet-white" points="110,78 170,78 190,128 140,156 90,128" />
            <polygon className="facet-white delay-1" points="118,96 162,96 150,132 130,132" />
            <polygon className="facet-white delay-2" points="96,140 140,168 120,214" />
            <polygon className="facet-white delay-3" points="184,140 160,214 140,168" />
            <polygon className="facet-white delay-4" points="126,150 154,150 140,196" />
            <rect className="shine-band" x="-40" y="-20" width="90" height="340" fill="url(#gem-shine)" />
          </g>
          <path d={outline} className="gem-edge" />
        </g>
      </svg>
      <p className="gem-shape-label">{shape || 'Round'}</p>
    </div>
  );
}
