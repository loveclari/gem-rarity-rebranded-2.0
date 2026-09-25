function colorPlain(color: string) {
  if (['D', 'E', 'F'].includes(color)) {
    return `Color ${color} means the diamond looks white. This is a top color.`;
  }
  if (['G', 'H', 'I', 'J'].includes(color)) {
    return `Color ${color} means the diamond is almost white. Most people will not see color.`;
  }
  return `Color ${color} means you may see a little yellow. This is more clear on bigger stones.`;
}

function clarityPlain(clarity: string) {
  if (['FL', 'IF'].includes(clarity)) {
    return `Clarity ${clarity} means it has no marks you can see. These are very hard to find.`;
  }
  if (['VVS1', 'VVS2'].includes(clarity)) {
    return `Clarity ${clarity} means the marks inside are tiny. Even a jeweler needs a strong lens.`;
  }
  if (['VS1', 'VS2'].includes(clarity)) {
    return `Clarity ${clarity} means it has small marks. You usually cannot see them with your eyes.`;
  }
  if (['SI1', 'SI2'].includes(clarity)) {
    return `Clarity ${clarity} means it has some marks. You might see them if you look closely.`;
  }
  return `Clarity ${clarity} means the marks are easy to see. This can make the stone look less clear.`;
}

function cutPlain(cut: string) {
  if (cut === 'Excellent') {
    return 'Excellent cut means it should sparkle a lot.';
  }
  if (cut === 'Very Good') {
    return 'Very Good cut means it sparkles well, close to the best cut.';
  }
  if (cut === 'Good') {
    return 'Good cut means it still sparkles, but less than a better cut.';
  }
  return `${cut} cut means it will sparkle less. The price is usually lower.`;
}

function sizePlain(carat: string) {
  if (carat.startsWith('2')) {
    return `${carat} carats is a large size.`;
  }
  if (carat.startsWith('1')) {
    return `${carat} carats is a popular size for a ring.`;
  }
  return `${carat} carats is a smaller size.`;
}

export function getLocalDiamondAnalysis(
  shape: string,
  carat: string,
  clarity: string,
  color: string,
  cut: string,
) {
  const isTop =
    ['D', 'E', 'F'].includes(color) &&
    ['FL', 'IF', 'VVS1', 'VVS2', 'VS1'].includes(clarity) &&
    cut === 'Excellent';

  return [
    `This is a ${shape} diamond. ${sizePlain(carat)}`,
    colorPlain(color),
    clarityPlain(clarity),
    cutPlain(cut),
    isTop
      ? 'These grades together are special. Stones like this often cost more.'
      : 'This mix can be a good choice if you want a nice look without the highest price.',
  ].join('\n\n');
}
