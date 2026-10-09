'use client';

import { useEffect, useLayoutEffect, useRef, useState } from 'react';

type Pt = [number, number];

type Facet = {
  points: Pt[];
  light: string;
  dark: string;
  tone: number;
  sparkle?: boolean;
};

type Stone = {
  outline: string;
  facets: Facet[];
  table: Pt[];
  cx: number;
  cy: number;
};

const LIGHT = { x: -0.62, y: -0.78 };

function mix(a: string, b: string, t: number) {
  const parse = (hex: string) => [
    parseInt(hex.slice(1, 3), 16),
    parseInt(hex.slice(3, 5), 16),
    parseInt(hex.slice(5, 7), 16),
  ];
  const from = parse(a);
  const to = parse(b);
  const u = Math.min(1, Math.max(0, t));
  const channel = from.map((value, index) => Math.round(value + (to[index] - value) * u));
  return `rgb(${channel[0]}, ${channel[1]}, ${channel[2]})`;
}

function polar(cx: number, cy: number, rx: number, ry: number, deg: number): Pt {
  const angle = (deg * Math.PI) / 180;
  return [cx + Math.cos(angle) * rx, cy + Math.sin(angle) * ry];
}

function pointsOf(pts: Pt[]) {
  return pts.map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`).join(' ');
}

function facing(x: number, y: number, cx: number, cy: number) {
  const dx = x - cx;
  const dy = y - cy;
  const length = Math.hypot(dx, dy) || 1;
  const dot = (dx / length) * LIGHT.x + (dy / length) * LIGHT.y;
  return (dot + 1) / 2;
}

function shade(amount: number, salt = 0): Pick<Facet, 'light' | 'dark' | 'tone'> {
  const palette = ['#d0dbe8', '#d7e0ed', '#dfe7ee', '#fafbfc'];
  let index = Math.min(palette.length - 1, Math.floor(wobble(salt, 15) * palette.length));
  if (amount > 0.66 && index < palette.length - 1 && wobble(salt, 8) > 0.5) index += 1;
  if (amount < 0.34 && index > 0 && wobble(salt, 9) > 0.5) index -= 1;
  const tone = palette[index];
  return { light: tone, dark: tone, tone: index };
}

function wobble(index: number, salt: number) {
  const value = Math.sin(index * 12.9898 + salt * 78.233) * 43758.5453;
  return value - Math.floor(value);
}

function facet(pts: Pt[], amount: number, salt = 0): Facet {
  return { points: pts, ...shade(amount, salt) };
}

function brilliant(
  cx: number,
  cy: number,
  rx: number,
  ry: number,
  tableRatio = 0.5,
): Pick<Stone, 'facets' | 'table'> {
  const girdle: Pt[] = [];
  const breaks: Pt[] = [];
  const table: Pt[] = [];
  const stars: Pt[] = [];
  const inner: Pt[] = [];

  for (let index = 0; index < 8; index += 1) {
    const spin = (wobble(index, 1) - 0.5) * 18;
    const nextSpin = (wobble(index + 1, 1) - 0.5) * 18;
    const main = -90 + index * 45 + spin;
    const gap = 45 + nextSpin - spin;
    const mid = main + gap * (0.22 + wobble(index, 2) * 0.56);
    const starRatio = tableRatio + (1 - tableRatio) * (0.28 + wobble(index, 5) * 0.46);
    girdle.push(polar(cx, cy, rx * (0.96 + wobble(index, 3) * 0.04), ry * (0.96 + wobble(index, 3) * 0.04), main));
    breaks.push(
      polar(
        cx,
        cy,
        rx * (0.86 + wobble(index, 7) * 0.12),
        ry * (0.86 + wobble(index, 8) * 0.12),
        mid,
      ),
    );
    table.push(
      polar(
        cx,
        cy,
        rx * tableRatio * (0.58 + wobble(index, 4) * 0.48),
        ry * tableRatio * (0.58 + wobble(index, 4) * 0.48),
        main + (wobble(index, 9) - 0.5) * 16,
      ),
    );
    stars.push(polar(cx, cy, rx * starRatio, ry * starRatio, mid));
    inner.push(
      polar(
        cx,
        cy,
        rx * tableRatio * (0.16 + wobble(index, 6) * 0.22),
        ry * tableRatio * (0.16 + wobble(index, 6) * 0.22),
        main + (wobble(index, 10) - 0.5) * 22,
      ),
    );
  }

  const facets: Facet[] = [];
  const add = (pts: Pt[], bias: number, sparkle = false) => {
    const total = pts.reduce((sum, point) => [sum[0] + point[0], sum[1] + point[1]] as Pt, [0, 0]);
    const level = facing(total[0] / pts.length, total[1] / pts.length, cx, cy);
    facets.push({
      ...facet(pts, Math.min(1, Math.max(0, level + bias)), facets.length),
      sparkle,
    });
  };

  for (let index = 0; index < 8; index += 1) {
    const previous = (index + 7) % 8;
    const next = (index + 1) % 8;
    const even = index % 2 === 0;
    const splitOut = wobble(index, 11) > 0.5;
    add([girdle[index], stars[previous], table[index]], even ? 0.1 : -0.06, even);
    add([girdle[index], table[index], stars[index]], even ? -0.04 : 0.14);
    add([table[index], stars[index], table[next]], 0.22, true);
    add([girdle[index], breaks[index], stars[index]], even ? -0.14 : 0.04, index % 3 === 0);
    add([breaks[index], girdle[next], stars[index]], even ? 0.06 : -0.16);
    if (splitOut) {
      add([table[index], table[next], inner[index]], even ? 0.08 : -0.1);
      add([table[next], inner[next], inner[index]], even ? -0.12 : 0.06, true);
    } else {
      add([table[index], table[next], inner[next]], even ? -0.08 : 0.12, true);
      add([table[index], inner[next], inner[index]], even ? 0.1 : -0.14);
    }
  }

  add([inner[0], inner[1], inner[2]], 0.16, true);
  add([inner[2], inner[3], inner[4]], -0.08);
  add([inner[4], inner[5], inner[6]], 0.12);
  add([inner[6], inner[7], inner[0]], -0.1, true);
  add([inner[0], inner[2], inner[4]], 0.2);
  add([inner[0], inner[4], inner[6]], -0.06);

  return { facets: cutLarge(facets, cx, cy), table };
}

function triArea(pts: Pt[]) {
  const [a, b, c] = pts;
  return Math.abs(a[0] * (b[1] - c[1]) + b[0] * (c[1] - a[1]) + c[0] * (a[1] - b[1])) / 2;
}

function cutOne(item: Facet, salt: number, cx: number, cy: number): Facet[] {
  const pts = item.points;
  let longest = 0;
  let length = 0;
  for (let index = 0; index < 3; index += 1) {
    const next = (index + 1) % 3;
    const edge = Math.hypot(pts[next][0] - pts[index][0], pts[next][1] - pts[index][1]);
    if (edge > length) {
      length = edge;
      longest = index;
    }
  }
  const start = pts[longest];
  const end = pts[(longest + 1) % 3];
  const tip = pts[(longest + 2) % 3];
  const along = 0.44 + wobble(salt, 21) * 0.12;
  const mid: Pt = [start[0] + (end[0] - start[0]) * along, start[1] + (end[1] - start[1]) * along];
  const piece = (points: Pt[], nudge: number, pieceSalt: number): Facet => {
    const total = points.reduce((sum, point) => [sum[0] + point[0], sum[1] + point[1]] as Pt, [0, 0]);
    const level = facing(total[0] / points.length, total[1] / points.length, cx, cy);
    return {
      points,
      ...shade(Math.min(1, Math.max(0, level + nudge)), pieceSalt),
      sparkle: item.sparkle,
    };
  };
  return [piece([start, mid, tip], 0.06, salt + 3), piece([mid, end, tip], -0.08, salt + 19)];
}

function longestEdge(pts: Pt[]) {
  let length = 0;
  for (let index = 0; index < 3; index += 1) {
    const next = (index + 1) % 3;
    length = Math.max(length, Math.hypot(pts[next][0] - pts[index][0], pts[next][1] - pts[index][1]));
  }
  return length;
}

function tooBig(pts: Pt[], cx: number, cy: number) {
  const area = triArea(pts);
  const midX = (pts[0][0] + pts[1][0] + pts[2][0]) / 3;
  const midY = (pts[0][1] + pts[1][1] + pts[2][1]) / 3;
  const lowerOrMiddle = midY > cy - 6 || Math.hypot(midX - cx, midY - cy) < 54;
  if (!lowerOrMiddle) return area > 820;
  return area > 660 || longestEdge(pts) > 72;
}

function cutLarge(facets: Facet[], cx: number, cy: number) {
  const sized: Facet[] = [];
  const place = (item: Facet, salt: number, depth: number) => {
    if (item.points.length !== 3 || depth > 1 || !tooBig(item.points, cx, cy)) {
      sized.push(item);
      return;
    }
    const pieces = cutOne(item, salt, cx, cy);
    if (Math.min(...pieces.map((piece) => triArea(piece.points))) < 70) {
      sized.push(item);
      return;
    }
    pieces.forEach((piece, pieceIndex) => place(piece, salt * 3 + pieceIndex + 11, depth + 1));
  };
  facets.forEach((item, index) => place(item, index + 3, 0));
  return sized;
}

function inset(pts: Pt[], amount: number, cx: number, cy: number): Pt[] {
  return pts.map(([x, y]) => {
    const dx = cx - x;
    const dy = cy - y;
    const length = Math.hypot(dx, dy) || 1;
    return [x + (dx / length) * amount, y + (dy / length) * amount];
  });
}

function steps(ring: Pt[], gaps: number[], cx: number, cy: number): Pick<Stone, 'facets' | 'table'> {
  const rings = [ring];
  gaps.forEach((gap) => {
    rings.push(inset(rings[rings.length - 1], gap, cx, cy));
  });

  const facets: Facet[] = [];
  for (let ringIndex = 0; ringIndex < rings.length - 1; ringIndex += 1) {
    const outer = rings[ringIndex];
    const inner = rings[ringIndex + 1];
    for (let index = 0; index < outer.length; index += 1) {
      const next = (index + 1) % outer.length;
      const edgeX = (outer[index][0] + outer[next][0]) / 2;
      const edgeY = (outer[index][1] + outer[next][1]) / 2;
      const level = Math.min(1, facing(edgeX, edgeY, cx, cy) + ringIndex * 0.14);
      facets.push({
        ...facet([outer[index], outer[next], inner[next], inner[index]], level),
        sparkle: ringIndex > 0 && index % 2 === 0,
      });
    }
  }

  return { facets, table: rings[rings.length - 1] };
}

const EMERALD: Pt[] = [
  [92, 40],
  [188, 40],
  [236, 88],
  [236, 192],
  [188, 240],
  [92, 240],
  [44, 192],
  [44, 88],
];

const RECTANGLE: Pt[] = [
  [64, 62],
  [216, 62],
  [256, 102],
  [256, 178],
  [216, 218],
  [64, 218],
  [24, 178],
  [24, 102],
];

const SQUARE: Pt[] = [
  [96, 44],
  [184, 44],
  [236, 96],
  [236, 184],
  [184, 236],
  [96, 236],
  [44, 184],
  [44, 96],
];

function outlineOf(pts: Pt[]) {
  return `${pts
    .map(([x, y], index) => `${index === 0 ? 'M' : 'L'}${x} ${y}`)
    .join('')}Z`;
}

function buildStone(name: string): Stone {
  if (name === 'Emerald') {
    return { outline: outlineOf(EMERALD), cx: 140, cy: 140, ...steps(EMERALD, [18, 16, 14], 140, 140) };
  }
  if (name === 'Rectangle') {
    return { outline: outlineOf(RECTANGLE), cx: 140, cy: 140, ...steps(RECTANGLE, [15, 13, 12], 140, 140) };
  }
  if (name === 'Square') {
    return { outline: outlineOf(SQUARE), cx: 140, cy: 140, ...steps(SQUARE, [18, 16, 14], 140, 140) };
  }

  const brilliantShapes: Record<
    string,
    { outline: string; cx: number; cy: number; rx: number; ry: number; table: number }
  > = {
    Round: {
      outline: 'M140 32c59.6 0 108 48.4 108 108s-48.4 108-108 108S32 199.6 32 140 80.4 32 140 32z',
      cx: 140,
      cy: 140,
      rx: 118,
      ry: 118,
      table: 0.46,
    },
    Oval: {
      outline: 'M140 24c46 0 84 52 84 116s-38 116-84 116-84-52-84-116S94 24 140 24z',
      cx: 140,
      cy: 140,
      rx: 108,
      ry: 132,
      table: 0.42,
    },
    Cushion: {
      outline: 'M92 42h96c28 0 52 22 52 52v92c0 30-24 52-52 52H92c-28 0-52-22-52-52V94c0-30 24-52 52-52z',
      cx: 140,
      cy: 140,
      rx: 120,
      ry: 124,
      table: 0.44,
    },
    Pear: {
      outline:
        'M140 34c36 0 74 36 80 82 7 50-12 98-42 128-14 14-26 22-38 26-12-4-24-12-38-26-30-30-49-78-42-128 6-46 44-82 80-82z',
      cx: 140,
      cy: 142,
      rx: 124,
      ry: 140,
      table: 0.32,
    },
    Marquise: {
      outline: 'M140 22c42 48 86 86 86 118s-44 70-86 118c-42-48-86-86-86-118s44-70 86-118z',
      cx: 140,
      cy: 140,
      rx: 120,
      ry: 148,
      table: 0.28,
    },
    Heart: {
      outline:
        'M140 228C140 228 52 162 52 108 52 74 78 50 106 50c18 0 30 10 34 24 4-14 16-24 34-24 28 0 54 24 54 58 0 54-88 120-88 120z',
      cx: 140,
      cy: 142,
      rx: 128,
      ry: 136,
      table: 0.3,
    },
  };

  const shape = brilliantShapes[name] ?? brilliantShapes.Round;
  return {
    outline: shape.outline,
    cx: shape.cx,
    cy: shape.cy,
    ...brilliant(shape.cx, shape.cy, shape.rx, shape.ry, shape.table),
  };
}

interface DiamondStageProps {
  shape: string | null;
}

export default function DiamondStage({ shape }: DiamondStageProps) {
  const name = shape && buildStone(shape).outline ? shape : 'Round';
  const stone = buildStone(name === shape ? name : 'Round');
  const clipId = `cut-${name}`;
  const stageRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const pavilionRef = useRef<SVGGElement>(null);
  const outlineRef = useRef<SVGPathElement>(null);
  const [pavilion, setPavilion] = useState<Facet[]>([]);

  useLayoutEffect(() => {
    const path = outlineRef.current;
    if (!path) return;
    const length = path.getTotalLength();
    const samples = 80;
    const points: Pt[] = Array.from({ length: samples }, (_, index) => {
      const point = path.getPointAtLength((length * index) / samples);
      return [point.x, point.y];
    });
    const cx = points.reduce((sum, point) => sum + point[0], 0) / samples;
    const bottom = Math.max(...points.map((point) => point[1]));
    const cap = points
      .filter((point) => point[1] > bottom - 16)
      .sort((a, b) => a[0] - b[0]);
    const ring: Pt[] = [];
    const steps = 6;
    if (cap.length > 1) {
      for (let index = 0; index <= steps; index += 1) {
        ring.push(cap[Math.round((index / steps) * (cap.length - 1))]);
      }
    }
    const culet: Pt = [cx, bottom + 22];
    const facets: Facet[] = [];
    for (let index = 0; index < ring.length - 1; index += 1) {
      if (ring[index][0] === ring[index + 1][0] && ring[index][1] === ring[index + 1][1]) continue;
      const lit = index % 2 === 0;
      facets.push({
        light: lit ? '#fafbfc' : '#dfe7ee',
        dark: lit ? '#d7e0ed' : '#d0dbe8',
        tone: lit ? 3 : 1,
        points: [ring[index], ring[index + 1], culet],
      });
    }

    setPavilion(facets);
  }, [stone.outline]);

  useEffect(() => {
    const stage = stageRef.current;
    const svg = svgRef.current;
    if (!stage || !svg) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const rest = 'perspective(640px) rotateX(14deg) rotateY(0deg)';
    let dragging = false;
    let startX = 0;
    let startY = 0;

    const turn = (clientX: number, clientY: number) => {
      const yaw = Math.min(46, Math.max(-46, (clientX - startX) * 0.45));
      const pitch = Math.min(48, Math.max(-18, 14 - (clientY - startY) * 0.38));
      svg.style.transform = `perspective(640px) rotateX(${pitch}deg) rotateY(${yaw}deg)`;
      const tip = pavilionRef.current;
      if (!tip) return;
      const moved = Math.hypot(yaw, pitch - 14);
      tip.style.opacity = String(Math.min(1, Math.max(0, (moved - 4) / 18)));
    };
    const onDown = (event: PointerEvent) => {
      if (event.button !== 0) return;
      dragging = true;
      startX = event.clientX;
      startY = event.clientY;
      stage.classList.add('is-turning');
      svg.style.transition = 'none';
      if (pavilionRef.current) pavilionRef.current.style.transition = 'none';
      stage.setPointerCapture(event.pointerId);
    };
    const onMove = (event: PointerEvent) => {
      if (!dragging) return;
      turn(event.clientX, event.clientY);
    };
    const onUp = () => {
      if (!dragging) return;
      dragging = false;
      stage.classList.remove('is-turning');
      svg.style.transition = '';
      svg.style.transform = rest;
      if (pavilionRef.current) {
        pavilionRef.current.style.transition = '';
        pavilionRef.current.style.opacity = '0';
      }
    };

    stage.addEventListener('pointerdown', onDown);
    stage.addEventListener('pointermove', onMove);
    stage.addEventListener('pointerup', onUp);
    stage.addEventListener('pointercancel', onUp);
    return () => {
      stage.removeEventListener('pointerdown', onDown);
      stage.removeEventListener('pointermove', onMove);
      stage.removeEventListener('pointerup', onUp);
      stage.removeEventListener('pointercancel', onUp);
    };
  }, [name]);

  return (
    <div className="gem-stage" ref={stageRef} aria-hidden="true">
      <div className="gem-floor" />
      <div className="gem-tilt" key={name}>
        <svg ref={svgRef} viewBox="0 0 280 340" className="gem-svg">
          <defs>
            <clipPath id={clipId}>
              <path d={stone.outline} />
            </clipPath>
            <path ref={outlineRef} d={stone.outline} />
            <linearGradient id={`girdle-${name}`} x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#fafbfc" />
              <stop offset="46%" stopColor="#dfe7ee" />
              <stop offset="100%" stopColor="#d0dbe8" />
            </linearGradient>
            <radialGradient id={`crown-${name}`} cx="32%" cy="28%" r="78%">
              <stop offset="0%" stopColor="#fafbfc" />
              <stop offset="55%" stopColor="#dfe7ee" />
              <stop offset="100%" stopColor="#d0dbe8" />
            </radialGradient>
            <linearGradient id={`rim-${name}`} x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#fafbfc" stopOpacity="1" />
              <stop offset="42%" stopColor="#fafbfc" stopOpacity="0.7" />
              <stop offset="100%" stopColor="#d0dbe8" stopOpacity="0.45" />
            </linearGradient>
            <radialGradient id={`spec-${name}`} cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
              <stop offset="48%" stopColor="#ffffff" stopOpacity="0.28" />
              <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
            </radialGradient>
            {stone.facets.map((item, index) => (
              <linearGradient
                key={`${name}-shade-${index}`}
                id={`${name}-shade-${index}`}
                x1="100%"
                y1="100%"
                x2="0%"
                y2="0%"
              >
                <stop offset="0%" stopColor={item.dark} />
                <stop offset="100%" stopColor={item.light} />
              </linearGradient>
            ))}
            {pavilion.map((item, index) => (
              <linearGradient key={`${name}-pav-${index}`} id={`${name}-pav-${index}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={item.light} />
                <stop offset="100%" stopColor={item.dark} />
              </linearGradient>
            ))}
          </defs>

          <path d={stone.outline} fill={`url(#crown-${name})`} />

          <g clipPath={`url(#${clipId})`}>
            {stone.facets.map((item, index) => (
              <polygon
                key={`${name}-facet-${index}`}
                className={`facet-spark gleam-${item.tone} d${[4, 1, 6, 2, 7, 0, 5, 3][index % 8]}`}
                points={pointsOf(item.points)}
                fill={`url(#${name}-shade-${index})`}
              />
            ))}
            <ellipse
              className="spec-rest table-glint"
              cx={stone.cx - 36}
              cy={stone.cy - 42}
              rx="28"
              ry="12"
              fill={`url(#spec-${name})`}
            />
            <g className="twinkle" transform={`translate(${stone.cx - 28} ${stone.cy - 20})`}>
              <polygon points="0,-6 1.2,-1.2 6,0 1.2,1.2 0,6 -1.2,1.2 -6,0 -1.2,-1.2" fill="#ffffff" />
            </g>
            <g className="twinkle twinkle-late" transform={`translate(${stone.cx + 16} ${stone.cy + 6})`}>
              <polygon points="0,-4 0.8,-0.8 4,0 0.8,0.8 0,4 -0.8,0.8 -4,0 -0.8,-0.8" fill="#ffffff" />
            </g>
          </g>

          <path
            d={stone.outline}
            fill="none"
            stroke={`url(#rim-${name})`}
            strokeWidth="1.4"
            strokeLinejoin="miter"
          />

          <g className="pavilion" ref={pavilionRef}>
            {pavilion.map((item, index) => (
              <polygon
                key={`${name}-pavilion-${index}`}
                points={pointsOf(item.points)}
                fill={`url(#${name}-pav-${index})`}
                stroke="#f7fbff"
                strokeOpacity="0.12"
                strokeWidth="0.4"
                strokeLinejoin="round"
              />
            ))}
          </g>
        </svg>
      </div>
      <p className="gem-shape-label">{name}</p>
    </div>
  );
}
