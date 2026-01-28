import { z } from 'zod';
import { NextResponse } from 'next/server';

/**
 * Validation Error
 *
 * Thrown when request validation fails
 */
export class ValidationError extends Error {
  constructor(
    message: string,
    public errors: z.ZodIssue[]
  ) {
    super(message);
    this.name = 'ValidationError';
  }

  toResponse(): NextResponse {
    return NextResponse.json(
      {
        error: this.message,
        details: this.errors.map((err) => ({
          path: err.path.join('.'),
          message: err.message,
        })),
      },
      { status: 400 }
    );
  }
}

/**
 * Validate request body against schema
 */
export async function validateRequest<T extends z.ZodType>(
  request: Request,
  schema: T
): Promise<z.infer<T>> {
  try {
    const body = await request.json();
    const validated = schema.parse(body);

    return validated;
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw new ValidationError('Invalid request data', error.errors);
    }

    // If it's not a ZodError, it's likely a JSON parsing error
    throw new ValidationError('Invalid JSON in request body', [
      {
        code: 'custom',
        path: [],
        message: error instanceof Error ? error.message : 'Invalid JSON',
      },
    ] as z.ZodIssue[]);
  }
}

/**
 * Validate query parameters against schema
 */
export function validateQuery<T extends z.ZodType>(
  searchParams: URLSearchParams,
  schema: T
): z.infer<T> {
  try {
    // Convert URLSearchParams to plain object
    const params: Record<string, string> = {};
    searchParams.forEach((value, key) => {
      params[key] = value;
    });

    const validated = schema.parse(params);
    return validated;
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw new ValidationError('Invalid query parameters', error.errors);
    }

    throw error;
  }
}

/**
 * Validate form data against schema
 */
export async function validateFormData<T extends z.ZodType>(
  request: Request,
  schema: T
): Promise<z.infer<T>> {
  try {
    const formData = await request.formData();

    // Convert FormData to plain object
    const data: Record<string, any> = {};
    formData.forEach((value, key) => {
      // Handle multiple values for same key (e.g., checkboxes)
      if (data[key]) {
        if (Array.isArray(data[key])) {
          data[key].push(value);
        } else {
          data[key] = [data[key], value];
        }
      } else {
        data[key] = value;
      }
    });

    const validated = schema.parse(data);
    return validated;
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw new ValidationError('Invalid form data', error.errors);
    }

    throw error;
  }
}

/**
 * Safe parse that returns result object instead of throwing
 */
export function safeValidate<T extends z.ZodType>(
  data: unknown,
  schema: T
): { success: true; data: z.infer<T> } | { success: false; error: ValidationError } {
  try {
    const validated = schema.parse(data);
    return { success: true, data: validated };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, error: new ValidationError('Validation failed', error.errors) };
    }

    return {
      success: false,
      error: new ValidationError('Unknown validation error', [
        {
          code: 'custom',
          path: [],
          message: error instanceof Error ? error.message : 'Unknown error',
        },
      ] as z.ZodIssue[]),
    };
  }
}

/**
 * Usage examples:
 *
 * // Validate request body
 * export async function POST(request: Request) {
 *   try {
 *     const data = await validateRequest(request, createPostSchema);
 *     // ... process validated data
 *   } catch (error) {
 *     if (error instanceof ValidationError) {
 *       return error.toResponse();
 *     }
 *     throw error;
 *   }
 * }
 *
 * // Validate query parameters
 * export async function GET(request: Request) {
 *   const { searchParams } = new URL(request.url);
 *   try {
 *     const query = validateQuery(searchParams, querySchema);
 *     // ... use validated query
 *   } catch (error) {
 *     if (error instanceof ValidationError) {
 *       return error.toResponse();
 *     }
 *     throw error;
 *   }
 * }
 *
 * // Safe validation without throwing
 * const result = safeValidate(userData, userSchema);
 * if (result.success) {
 *   // Use result.data
 * } else {
 *   // Handle result.error
 * }
 */
