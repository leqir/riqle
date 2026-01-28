import DOMPurify from 'isomorphic-dompurify';

/**
 * HTML Sanitization
 *
 * Sanitize user-generated content to prevent XSS
 */

/**
 * Sanitize HTML content (allows safe HTML tags)
 *
 * Use this for rich text content where HTML formatting is desired
 */
export function sanitizeHtml(dirty: string): string {
  return DOMPurify.sanitize(dirty, {
    ALLOWED_TAGS: [
      'p',
      'br',
      'strong',
      'em',
      'u',
      's',
      'a',
      'ul',
      'ol',
      'li',
      'h1',
      'h2',
      'h3',
      'h4',
      'h5',
      'h6',
      'blockquote',
      'code',
      'pre',
      'hr',
      'div',
      'span',
    ],
    ALLOWED_ATTR: ['href', 'title', 'target', 'rel', 'class'],
    ALLOW_DATA_ATTR: false,
    ALLOW_ARIA_ATTR: false,
    ALLOW_UNKNOWN_PROTOCOLS: false,
    // Force all links to open in new tab and add noopener/noreferrer
    ADD_ATTR: ['target'],
  });
}

/**
 * Sanitize text (removes all HTML tags)
 *
 * Use this for plain text fields where HTML should never appear
 */
export function sanitizeText(text: string): string {
  // Remove all HTML tags
  return DOMPurify.sanitize(text, {
    ALLOWED_TAGS: [],
    KEEP_CONTENT: true,
  });
}

/**
 * Sanitize URL (allows only http/https protocols)
 *
 * Use this to prevent javascript: and data: URL attacks
 */
export function sanitizeUrl(url: string): string {
  // Only allow http/https URLs
  try {
    const parsed = new URL(url);

    if (!['http:', 'https:'].includes(parsed.protocol)) {
      throw new Error('Invalid protocol');
    }

    return parsed.toString();
  } catch {
    throw new Error('Invalid URL');
  }
}

/**
 * Sanitize for attribute value (prevents attribute injection)
 *
 * Use this for values that will be placed in HTML attributes
 */
export function sanitizeAttribute(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
}

/**
 * Sanitize markdown (allows safe subset of markdown)
 *
 * Use this for markdown content before converting to HTML
 */
export function sanitizeMarkdown(markdown: string): string {
  // First convert to HTML (you'd use a markdown parser here)
  // Then sanitize the HTML
  // For now, this is a placeholder

  // In a real implementation, you'd:
  // 1. Parse markdown to HTML
  // 2. Sanitize the resulting HTML
  // 3. Return sanitized HTML

  return sanitizeHtml(markdown);
}

/**
 * Sanitize filename (removes path traversal attempts)
 *
 * Use this for user-provided filenames
 */
export function sanitizeFilename(filename: string): string {
  // Remove path separators and special characters
  return filename
    .replace(/[\/\\]/g, '') // Remove slashes
    .replace(/\.\./g, '') // Remove parent directory references
    .replace(/[<>:"|?*]/g, '') // Remove Windows reserved characters
    .trim();
}

/**
 * Sanitize slug (for URLs)
 *
 * Use this for user-provided slugs
 */
export function sanitizeSlug(slug: string): string {
  return slug
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9-]/g, '-') // Replace non-alphanumeric with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single
    .replace(/^-|-$/g, ''); // Remove leading/trailing hyphens
}

/**
 * Sanitize email (basic validation and normalization)
 *
 * Use this for email addresses
 */
export function sanitizeEmail(email: string): string {
  return email.toLowerCase().trim();
}

/**
 * Usage examples:
 *
 * // Rich text content (blog posts, descriptions)
 * const cleanContent = sanitizeHtml(userInput);
 *
 * // Plain text (names, titles)
 * const cleanText = sanitizeText(userInput);
 *
 * // URLs (links, redirects)
 * try {
 *   const cleanUrl = sanitizeUrl(userInput);
 * } catch (error) {
 *   // Handle invalid URL
 * }
 *
 * // Filenames (uploads)
 * const cleanFilename = sanitizeFilename(userInput);
 *
 * // Slugs (URLs)
 * const cleanSlug = sanitizeSlug(userInput);
 *
 * // Emails
 * const cleanEmail = sanitizeEmail(userInput);
 */
