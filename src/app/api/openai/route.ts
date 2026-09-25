import { NextRequest, NextResponse } from 'next/server';
import { getDiamondRecommendation, getDiamondDescription } from '@/lib/openai';
import { getLocalDiamondAnalysis } from '@/lib/local-analysis';

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
        try {
          result = await getDiamondRecommendation(shape, carat, clarity, color, cut);
        } catch {
          result = getLocalDiamondAnalysis(shape, carat, clarity, color, cut);
        }
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
 