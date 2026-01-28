/**
 * Readability Calculator
 *
 * Calculate Flesch Reading Ease score
 * 90-100: Very easy (5th grade)
 * 60-70: Plain English (8th-9th grade) ← TARGET
 * 0-30: Very difficult (college graduate)
 */

export function calculateReadability(text: string): number {
  const sentences = text.split(/[.!?]+/).filter((s) => s.trim().length > 0);
  const words = text.split(/\s+/).filter((w) => w.length > 0);

  if (sentences.length === 0 || words.length === 0) return 0;

  const syllables = words.reduce((acc, word) => acc + countSyllables(word), 0);

  const avgSentenceLength = words.length / sentences.length;
  const avgSyllablesPerWord = syllables / words.length;

  const score = 206.835 - 1.015 * avgSentenceLength - 84.6 * avgSyllablesPerWord;

  return Math.round(score);
}

function countSyllables(word: string): number {
  word = word.toLowerCase();
  if (word.length <= 3) return 1;

  const vowels = word.match(/[aeiouy]+/g);
  let syllableCount = vowels ? vowels.length : 1;

  // Adjust for silent 'e'
  if (word.endsWith('e')) syllableCount--;

  return Math.max(syllableCount, 1);
}

export function assessReadability(score: number): {
  level: 'easy' | 'plain' | 'difficult' | 'very-difficult';
  acceptable: boolean;
} {
  if (score >= 60 && score <= 80) {
    return { level: 'plain', acceptable: true };
  } else if (score > 80) {
    return { level: 'easy', acceptable: true };
  } else if (score >= 50) {
    return { level: 'difficult', acceptable: false };
  } else {
    return { level: 'very-difficult', acceptable: false };
  }
}
