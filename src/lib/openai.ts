import OpenAI from 'openai';

function getClient() {
  const apiKey = process.env.OPENAI_API_KEY?.trim();
  if (!apiKey) {
    throw new Error(
      'OpenAI API key is missing. Add OPENAI_API_KEY in Vercel project settings and redeploy.',
    );
  }
  return new OpenAI({ apiKey, timeout: 6000, maxRetries: 0 });
}

export async function getChatCompletion(
  messages: OpenAI.Chat.Completions.ChatCompletionMessageParam[],
  model = 'gpt-4o-mini',
  maxTokens = 1000,
  temperature = 0.7,
) {
  const openai = getClient();

  try {
    const completion = await openai.chat.completions.create({
      model,
      messages,
      max_tokens: maxTokens,
      temperature,
    });

    return completion.choices[0]?.message?.content || '';
  } catch (error: unknown) {
    const err = error as { message?: string; error?: { message?: string } };
    const message = err.error?.message || err.message || 'OpenAI request failed';
    console.error('OpenAI API Error:', message);
    throw new Error(message);
  }
}

export async function getDiamondRecommendation(
  shape: string,
  carat: string,
  clarity: string,
  color: string,
  cut: string,
  rarity: { percentage: string; ratio: string; description: string },
) {
  const prompt = `A customer picked this diamond:
- Shape: ${shape}
- Carat: ${carat}
- Clarity: ${clarity}
- Color: ${color}
- Cut: ${cut}

A count of graded diamonds produced this result. Use these facts as given:
- Share of diamonds with this specification: ${rarity.percentage}
- How rare it is: ${rarity.ratio}
- Summary: ${rarity.description}

Explain that result in 2 or 3 very short sentences. Use easy words. Keep the numbers and the rarity level the same. Do not explain what each grade means.`;

  return getChatCompletion(
    [
      {
        role: 'system',
        content:
          'You explain a diamond rarity result to a first-time buyer. Use the numbers you are given. Do not invent a different rarity.',
      },
      {
        role: 'user',
        content: prompt,
      },
    ],
    'gpt-4o-mini',
    150,
    0.3,
  );
}

export async function getDiamondDescription(attribute: string, value: string) {
  const prompt = `Explain the diamond ${attribute} "${value}" in simple terms. Include:
1. What it means
2. How it affects the diamond's appearance
3. Its impact on value
4. Where it falls on the quality scale

Keep it educational but easy to understand.`;

  return getChatCompletion([
    {
      role: 'system',
      content:
        'You are a gemologist explaining diamond characteristics to customers. Use clear, educational language.',
    },
    {
      role: 'user',
      content: prompt,
    },
  ]);
}
