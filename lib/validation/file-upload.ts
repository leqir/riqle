/**
 * File Upload Validation
 *
 * Validates file uploads to prevent malicious files and abuse
 */

const ALLOWED_MIME_TYPES = new Set([
  'application/pdf',
  'application/zip',
  'application/x-zip-compressed',
  'video/mp4',
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
  'image/gif',
]);

const MAX_FILE_SIZE = 500 * 1024 * 1024; // 500MB

export interface FileValidationResult {
  valid: boolean;
  error?: string;
}

/**
 * Client-side file validation
 *
 * Use this in the browser before uploading
 */
export function validateFile(file: File): FileValidationResult {
  // Check file size
  if (file.size > MAX_FILE_SIZE) {
    return {
      valid: false,
      error: `File too large. Maximum size is ${MAX_FILE_SIZE / 1024 / 1024}MB`,
    };
  }

  if (file.size === 0) {
    return {
      valid: false,
      error: 'File is empty',
    };
  }

  // Check MIME type
  if (!ALLOWED_MIME_TYPES.has(file.type)) {
    return {
      valid: false,
      error: `Invalid file type. Allowed types: ${Array.from(ALLOWED_MIME_TYPES).join(', ')}`,
    };
  }

  // Check file extension matches MIME type
  const extension = file.name.split('.').pop()?.toLowerCase();
  const mimeExtensions: Record<string, string[]> = {
    'application/pdf': ['pdf'],
    'application/zip': ['zip'],
    'application/x-zip-compressed': ['zip'],
    'video/mp4': ['mp4'],
    'image/jpeg': ['jpg', 'jpeg'],
    'image/jpg': ['jpg', 'jpeg'],
    'image/png': ['png'],
    'image/webp': ['webp'],
    'image/gif': ['gif'],
  };

  const allowedExtensions = mimeExtensions[file.type] || [];

  if (!extension || !allowedExtensions.includes(extension)) {
    return {
      valid: false,
      error: 'File extension does not match MIME type',
    };
  }

  // Check for suspicious filenames
  if (file.name.includes('..') || file.name.includes('/') || file.name.includes('\\')) {
    return {
      valid: false,
      error: 'Invalid filename',
    };
  }

  return { valid: true };
}

/**
 * Server-side file validation
 *
 * Use this on the server after upload
 */
export async function validateUploadedFile(
  buffer: Buffer,
  filename: string,
  mimeType: string
): Promise<FileValidationResult> {
  // Check size
  if (buffer.length > MAX_FILE_SIZE) {
    return {
      valid: false,
      error: 'File too large',
    };
  }

  if (buffer.length === 0) {
    return {
      valid: false,
      error: 'File is empty',
    };
  }

  // Check MIME type
  if (!ALLOWED_MIME_TYPES.has(mimeType)) {
    return {
      valid: false,
      error: 'Invalid MIME type',
    };
  }

  // Check filename for path traversal
  if (filename.includes('..') || filename.includes('/') || filename.includes('\\')) {
    return {
      valid: false,
      error: 'Invalid filename',
    };
  }

  // Verify magic bytes (file signature)
  // This prevents someone from renaming a .exe to .pdf
  const magicBytes = buffer.slice(0, 8);
  const isValidSignature = verifyFileSignature(magicBytes, mimeType);

  if (!isValidSignature) {
    return {
      valid: false,
      error: 'File signature does not match MIME type',
    };
  }

  return { valid: true };
}

/**
 * Verify file signature (magic bytes)
 *
 * Checks that the file's binary signature matches its claimed type
 */
function verifyFileSignature(magicBytes: Buffer, mimeType: string): boolean {
  // Common file signatures
  const signatures: Record<string, number[][]> = {
    'application/pdf': [[0x25, 0x50, 0x44, 0x46]], // %PDF
    'application/zip': [
      [0x50, 0x4b, 0x03, 0x04], // PK..
      [0x50, 0x4b, 0x05, 0x06], // PK.. (empty archive)
      [0x50, 0x4b, 0x07, 0x08], // PK.. (spanned archive)
    ],
    'application/x-zip-compressed': [
      [0x50, 0x4b, 0x03, 0x04],
      [0x50, 0x4b, 0x05, 0x06],
      [0x50, 0x4b, 0x07, 0x08],
    ],
    'video/mp4': [
      [0x00, 0x00, 0x00, 0x18, 0x66, 0x74, 0x79, 0x70], // ....ftyp
      [0x00, 0x00, 0x00, 0x20, 0x66, 0x74, 0x79, 0x70], // ... ftyp
    ],
    'image/jpeg': [
      [0xff, 0xd8, 0xff, 0xe0], // JFIF
      [0xff, 0xd8, 0xff, 0xe1], // EXIF
      [0xff, 0xd8, 0xff, 0xe2], // JPEG
    ],
    'image/jpg': [
      [0xff, 0xd8, 0xff, 0xe0],
      [0xff, 0xd8, 0xff, 0xe1],
      [0xff, 0xd8, 0xff, 0xe2],
    ],
    'image/png': [[0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]], // PNG
    'image/webp': [[0x52, 0x49, 0x46, 0x46]], // RIFF (partial, need to check offset 8 for WEBP)
    'image/gif': [
      [0x47, 0x49, 0x46, 0x38, 0x37, 0x61], // GIF87a
      [0x47, 0x49, 0x46, 0x38, 0x39, 0x61], // GIF89a
    ],
  };

  const expectedSignatures = signatures[mimeType];
  if (!expectedSignatures) {
    // Unknown type, can't verify
    return true;
  }

  // Check if any signature matches
  for (const signature of expectedSignatures) {
    let matches = true;
    for (let i = 0; i < signature.length && i < magicBytes.length; i++) {
      if (magicBytes[i] !== signature[i]) {
        matches = false;
        break;
      }
    }
    if (matches) {
      return true;
    }
  }

  return false;
}

/**
 * Get safe filename for storage
 *
 * Generates a unique, safe filename for storing uploaded files
 */
export function getSafeFilename(originalFilename: string, prefix: string = ''): string {
  // Get extension
  const extension = originalFilename.split('.').pop()?.toLowerCase() || '';

  // Generate unique filename
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2, 15);
  const safePrefix = prefix ? `${prefix}-` : '';

  return `${safePrefix}${timestamp}-${random}.${extension}`;
}

/**
 * Usage examples:
 *
 * // Client-side validation
 * const result = validateFile(file);
 * if (!result.valid) {
 *   alert(result.error);
 *   return;
 * }
 *
 * // Server-side validation
 * const buffer = await file.arrayBuffer();
 * const result = await validateUploadedFile(
 *   Buffer.from(buffer),
 *   file.name,
 *   file.type
 * );
 *
 * if (!result.valid) {
 *   return NextResponse.json({ error: result.error }, { status: 400 });
 * }
 *
 * // Generate safe filename
 * const safeFilename = getSafeFilename(file.name, 'product');
 * // Example output: product-1706380800000-x9k2j5l8q.pdf
 */
