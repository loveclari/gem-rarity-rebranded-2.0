import { NextResponse } from 'next/server';
import { getChatCompletion } from '@/lib/openai';

export async function GET() {
  try {
    console.log('Testing OpenAI API connection...');
    
    const result = await getChatCompletion([
      {
        role: 'user',
        content: 'Say "Hello, OpenAI API is working!"'
      }
    ]);

    console.log('OpenAI API test successful:', result);
    
    return NextResponse.json({ 
      message: result,
      status: 'success'
    });
  } catch (error: any) {
    console.error('OpenAI API test failed:', error);
    
    return NextResponse.json(
      { 
        error: error.message || 'OpenAI API test failed',
        status: 'error'
      },
      { status: 500 }
    );
  }
} 