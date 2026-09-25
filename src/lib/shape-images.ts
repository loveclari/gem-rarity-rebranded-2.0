export const SHAPE_OVERLAY_IMAGES: Record<string, string> = {
  Heart: '/img/heart-only.png',
  Pear: '/img/pear-only.png',
  Marquise: '/img/marquise-only.png',
  Cushion: '/img/cushion-only.png',
  Round: '/img/round-only.png',
  Oval: '/img/oval-only.png',
  Square: '/img/square-only.png',
  Emerald: '/img/emerald-only.png',
  Rectangle: '/img/rectangle-only.png',
};

export function cardImageForShape(shape: string, fallback: string) {
  return SHAPE_OVERLAY_IMAGES[shape] || fallback;
}

export function overlayImageForShape(
  shape: string | null,
  fallback = '/img/round-only.png',
) {
  if (!shape) return fallback;
  return SHAPE_OVERLAY_IMAGES[shape] || fallback;
}
