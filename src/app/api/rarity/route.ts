import { NextRequest, NextResponse } from 'next/server';
import { calculateRarity } from '@/lib/rarity';
import { SelectionState } from '@/types';

const SHAPES = new Set([
  'Heart',
  'Pear',
  'Marquise',
  'Cushion',
  'Round',
  'Oval',
  'Square',
  'Emerald',
  'Rectangle',
]);
const CARATS = new Set([
  '0.30-0.39',
  '0.40-0.49',
  '0.50-0.69',
  '1.00-1.49',
  '1.50-1.99',
  '2.00+',
]);
const CLARITIES = new Set([
  'FL',
  'IF',
  'VVS1',
  'VVS2',
  'VS1',
  'VS2',
  'SI1',
  'SI2',
  'I1',
  'I2',
  'I3',
]);
const COLORS = new Set([
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
]);
const CUTS = new Set(['Excellent', 'Very Good', 'Good', 'Fair', 'Poor']);

function optionalGrade(value: unknown, allowed: Set<string>) {
  if (value == null || value === '') return null;
  if (typeof value !== 'string' || !allowed.has(value)) return undefined;
  return value;
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as Partial<SelectionState>;

    const selectedShape = optionalGrade(body.selectedShape, SHAPES);
    const selectedCarat = optionalGrade(body.selectedCarat, CARATS);
    const selectedClarity = optionalGrade(body.selectedClarity, CLARITIES);
    const selectedColor = optionalGrade(body.selectedColor, COLORS);
    const selectedCut = optionalGrade(body.selectedCut, CUTS);

    if (
      selectedShape === undefined ||
      selectedCarat === undefined ||
      selectedClarity === undefined ||
      selectedColor === undefined ||
      selectedCut === undefined
    ) {
      return NextResponse.json({ error: 'Invalid selection.' }, { status: 400 });
    }

    const result = calculateRarity(
      selectedShape,
      selectedCarat,
      selectedClarity,
      selectedColor,
      selectedCut,
    );

    return NextResponse.json({ result });
  } catch {
    return NextResponse.json(
      { error: 'Could not calculate rarity.' },
      { status: 500 },
    );
  }
}
