import 'server-only';

import giaRarityData from '../data/gia-rarity.json';
import { RarityResult, GemData } from '@/types';

const dataset = giaRarityData as GemData[];

function mapCarat(carat: string) {
  if (carat === '2.00+') return '> 2.00';
  return carat;
}

function mapClarity(clarity: string) {
  if (clarity === 'FL') return 'Flawless';
  if (clarity === 'IF') return 'Internally Flawless';
  return clarity;
}

function mapColor(color: string) {
  if (color === 'O' || color === 'P') return 'O/P';
  return color;
}

function sumCounts(rows: GemData[]) {
  return rows.reduce((sum, item) => sum + item.Count, 0);
}

export function calculateRarity(
  shape?: string | null,
  carat?: string | null,
  clarity?: string | null,
  color?: string | null,
  cut?: string | null,
  data: GemData[] = dataset,
): RarityResult | null {
  if (!shape && !carat && !clarity && !color && !cut) {
    return null;
  }

  const mappedCarat = carat ? mapCarat(carat) : null;
  const mappedClarity = clarity ? mapClarity(clarity) : null;
  const mappedColor = color ? mapColor(color) : null;
  const source = data.length > 0 ? data : dataset;

  const matches = (includeCut: boolean) =>
    source.filter((item) => {
      if (shape && item.SHAPE_GROUP !== shape) return false;
      if (mappedCarat && item.CARAT_WEIGHT_GROUP !== mappedCarat) return false;
      if (mappedClarity && item.CLARITY_GRADE !== mappedClarity) return false;
      if (mappedColor && item.COLOR_GRADE !== mappedColor) return false;
      if (includeCut && cut && item.CUT_GRADE !== cut) return false;
      return true;
    });

  // Fancy shapes are often graded as NA for cut, so fall back if the
  // exact cut grade has no rows.
  const withCut = matches(true);
  const filtered = cut && sumCounts(withCut) === 0 ? matches(false) : withCut;

  const totalCount = sumCounts(source);
  const selectedCount = sumCounts(filtered);
  const percentValue =
    totalCount > 0 ? (selectedCount / totalCount) * 100 : 0;

  const rarityNumber =
    selectedCount > 0 && totalCount > 0 ? totalCount / selectedCount : 0;
  const ratio =
    rarityNumber > 0
      ? `1 in ${
          rarityNumber < 2
            ? rarityNumber.toFixed(1)
            : Math.round(rarityNumber).toLocaleString()
        }`
      : '1 in —';

  return {
    percentage: `${percentValue.toFixed(2)}%`,
    ratio,
    description: getRarityDescription(percentValue),
  };
}

export function getRarityDescription(percentage: number): string {
  if (percentage >= 10) {
    return 'This is a very common diamond specification.';
  }
  if (percentage >= 5) {
    return 'This is a moderately common diamond specification.';
  }
  if (percentage >= 1) {
    return 'This is a relatively rare diamond specification.';
  }
  if (percentage >= 0.1) {
    return 'This is a very rare diamond specification.';
  }
  return 'This is an extremely rare diamond specification!';
}
