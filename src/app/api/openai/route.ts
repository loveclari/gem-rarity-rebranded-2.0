import { NextRequest, NextResponse } from 'next/server';
import { getDiamondRecommendation, getDiamondDescription } from '@/lib/openai';
import { formatRarityFacts, getLocalDiamondAnalysis } from '@/lib/local-analysis';
import { calculateRarity } from '@/lib/rarity';

function isBillingError(message: string) {
  const text = message.toLowerCase();
  return (
    text.includes('credit') ||
    text.includes('quota') ||
    text.includes('billing') ||
    text.includes('insufficient')
  );
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action, data } = body;

    let result;
    switch (action) {
      case 'recommendation': {
        const { shape, carat, clarity, color, cut } = data;
        const grades = getLocalDiamondAnalysis(shape, carat, clarity, color, cut);
        const rarity = calculateRarity(shape, carat, clarity, color, cut);
        let rarityText = rarity ? formatRarityFacts(rarity) : '';
        if (rarity) {
          try {
            const explained = await getDiamondRecommendation(
              shape,
              carat,
              clarity,
              color,
              cut,
              rarity,
            );
            if (explained.trim()) rarityText = explained.trim();
          } catch {
            // Keep the calculated sentence when the model is unavailable.
          }
        }
        result = [grades, rarityText].filter(Boolean).join('\n\n');
        break;
      }
      case 'description':
        const { attribute, value } = data;
        result = await getDiamondDescription(attribute, value);
        break;
      default:
        return NextResponse.json(
          { error: 'Invalid action specified' },
          { status: 400 }
        );
    }

    return NextResponse.json({ result });
  } catch (error: any) {
    const raw = error.message || 'An error occurred while processing your request.';
    let errorMessage = raw;
    let statusCode = 500;

    if (raw.includes('API key') || raw.includes('Incorrect API key')) {
      errorMessage =
        'OpenAI API key is missing or invalid. Add OPENAI_API_KEY in Vercel and redeploy.';
      statusCode = 401;
    } else if (isBillingError(raw)) {
      errorMessage =
        'OpenAI has no remaining credits. Add billing on platform.openai.com or use the local analysis fallback.';
      statusCode = 429;
    }

    return NextResponse.json(
      { error: errorMessage },
      { status: statusCode }
    );
  }
}
 