import { GemData, GemRarityData } from '@/types';

export function shapeRarity(shape: string, data: GemData[]): string {
  const shapeCount = data
    .filter((d) => d.SHAPE_GROUP === shape)
    .map((d) => d.Count);

  const shapeSum = shapeCount.reduce((acc, val) => acc + val, 0);
  const totalCount = data
    .map((d) => d.Count)
    .reduce((acc, val) => acc + val, 0);

  const shapeAvg = ((shapeSum / totalCount) * 100).toFixed(1);
  return shapeAvg;
}

export function shapeCaratRarity(shape: string, carat: string, data: GemData[]): string {
  const filteredData = data.filter((item) => 
    item.CARAT_WEIGHT_GROUP === carat && item.SHAPE_GROUP === shape
  );

  const sum = filteredData.reduce((accumulator, current) => 
    accumulator + current.Count, 0
  );

  const totalCount = data.reduce((accumulator, current) => 
    accumulator + current.Count, 0
  );

  const shapeCaratAvg = ((sum / totalCount) * 100).toFixed(1);
  return shapeCaratAvg;
}

export function shapeCaratClarityRarity(shape: string, carat: string, clarity: string, data: GemData[]): string {
  const filteredData = data.filter((item) => 
    item.SHAPE_GROUP === shape &&
    item.CARAT_WEIGHT_GROUP === carat &&
    item.CLARITY_GRADE === clarity
  );

  const count = filteredData.reduce((accumulator, current) => 
    accumulator + current.Count, 0
  );

  const totalCount = data.reduce((accumulator, current) => 
    accumulator + current.Count, 0
  );

  const shapeCaratClarityAvg = ((count / totalCount) * 100).toFixed(2);
  return shapeCaratClarityAvg;
}

export function shapeCaratClarityColorRarity(shape: string, carat: string, clarity: string, color: string, data: GemData[]): string {
  const filteredData = data.filter((item) => 
    item.SHAPE_GROUP === shape &&
    item.CARAT_WEIGHT_GROUP === carat &&
    item.CLARITY_GRADE === clarity &&
    item.COLOR_GRADE === color
  );

  const count = filteredData.reduce((accumulator, current) => 
    accumulator + current.Count, 0
  );

  const totalCount = data.reduce((accumulator, current) => 
    accumulator + current.Count, 0
  );

  const shapeCaratClarityColorAvg = ((count / totalCount) * 100).toFixed(2);
  return shapeCaratClarityColorAvg;
}

export function shapeCaratClarityColorCutRarity(shape: string, carat: string, clarity: string, color: string, cut: string, data: GemData[]): string {
  const filteredData = data.filter((item) => 
    item.SHAPE_GROUP === shape &&
    item.CARAT_WEIGHT_GROUP === carat &&
    item.CLARITY_GRADE === clarity &&
    item.COLOR_GRADE === color &&
    item.CUT_GRADE === cut
  );

  const count = filteredData.reduce((accumulator, current) => 
    accumulator + current.Count, 0
  );

  const totalCount = data.reduce((accumulator, current) => 
    accumulator + current.Count, 0
  );

  const shapeCaratClarityColorCutAvg = ((count / totalCount) * 100).toFixed(2);
  return shapeCaratClarityColorCutAvg;
}

export function calculateItemRatio(options: GemRarityData, data: GemData[]): string {
  let itemCount = 0;
  let otherItemCount = 0;

  const defaultOptions = {
    shape: undefined,
    carat: undefined,
    clarity: undefined,
    color: undefined,
    cut: undefined,
  };

  const mergedOptions = { ...defaultOptions, ...options };

  data.forEach((item) => {
    const matchesShape = !mergedOptions.shape || item.SHAPE_GROUP === mergedOptions.shape;
    const matchesCarat = !mergedOptions.carat || item.CARAT_WEIGHT_GROUP === mergedOptions.carat;
    const matchesClarity = !mergedOptions.clarity || item.CLARITY_GRADE === mergedOptions.clarity;
    const matchesColor = !mergedOptions.color || item.COLOR_GRADE === mergedOptions.color;
    const matchesCut = !mergedOptions.cut || item.CUT_GRADE === mergedOptions.cut;

    if (matchesShape && matchesCarat && matchesClarity && matchesColor && matchesCut) {
      itemCount += item.Count;
    } else {
      otherItemCount += item.Count;
    }
  });

  const ratio = itemCount > 0 ? otherItemCount / itemCount : 0;

  if (ratio === 0) return "1 in 1";
  if (ratio < 1) return `1 in ${Math.ceil(1 / ratio)}`;
  
  return `${Math.ceil(ratio)} in 1`;
} 