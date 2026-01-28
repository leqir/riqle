import { NextResponse } from 'next/server';

export class ApiError extends Error {
  constructor(
    message: string,
    public statusCode: number = 500,
    public userMessage?: string
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

export function handleApiError(error: unknown): NextResponse {
  console.error('API error:', error);

  if (error instanceof ApiError) {
    return NextResponse.json(
      {
        error: error.userMessage || 'An error occurred',
        message: error.message, // Internal message for debugging
      },
      { status: error.statusCode }
    );
  }

  // Unknown errors
  return NextResponse.json(
    {
      error: 'Something went wrong. Please try again.',
    },
    { status: 500 }
  );
}
