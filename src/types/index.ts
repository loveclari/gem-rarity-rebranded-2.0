export interface GemData {
  SHAPE_GROUP: string;
  CARAT_WEIGHT_GROUP: string;
  CLARITY_GRADE: string;
  COLOR_GRADE: string;
  CUT_GRADE: string;
  Count: number;
}

export interface GemRarityData {
  shape?: string;
  carat?: string;
  clarity?: string;
  color?: string;
  cut?: string;
}

export interface SelectionState {
  selectedShape: string | null;
  selectedCarat: string | null;
  selectedClarity: string | null;
  selectedColor: string | null;
  selectedCut: string | null;
}

export interface RarityResult {
  percentage: string;
  ratio: string;
  description: string;
} 