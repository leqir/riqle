# How to Update the Changelog

The changelog is located at `/src/app/(content)/changelog/page.tsx` and is visible at `https://riqle.com/changelog`.

## Quick Guide

To add a new version:

1. Open `/src/app/(content)/changelog/page.tsx`
2. Find the `versions` array (around line 35)
3. Add your new version **at the top** of the array (newest first)

## Template

```typescript
{
  version: '1.2',  // Increment from previous version
  date: '2026-02-01',  // Use YYYY-MM-DD format
  title: 'Brief descriptive title',
  changes: [
    {
      category: 'feature',  // or 'improvement', 'fix', 'content'
      description: 'What you added, improved, fixed, or published',
    },
    // Add more changes...
  ],
},
```

## Categories

- **feature**: New functionality (e.g., "Added user profiles with photo uploads")
- **improvement**: Enhancements to existing features (e.g., "Improved search speed by 50%")
- **fix**: Bug fixes (e.g., "Fixed checkout error on mobile Safari")
- **content**: New content (e.g., "Published new HSC Maths resource pack")

## Example

```typescript
const versions: Version[] = [
  {
    version: '1.2',
    date: '2026-02-01',
    title: 'Search & Performance Improvements',
    changes: [
      {
        category: 'feature',
        description: 'Added full-text search across all resources',
      },
      {
        category: 'improvement',
        description: 'Reduced page load time by 40% through image optimization',
      },
      {
        category: 'content',
        description: 'Published Mathematics Extension 1 study guide',
      },
    ],
  },
  // Previous versions below...
];
```

## Versioning Convention

- **Major versions** (2.0, 3.0): Significant redesigns or major feature launches
- **Minor versions** (1.1, 1.2): New features, improvements, content additions
- **Patches** (1.1.1, 1.1.2): Bug fixes only (optional - you can skip these if minor)

## Navigation

The changelog is automatically linked in:

- Header navigation (About dropdown)
- Footer navigation (About section)

No additional configuration needed!
