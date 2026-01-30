import { PrismaClient } from '@prisma/client';
import { createId } from '@paralleldrive/cuid2';

const prisma = new PrismaClient();

async function seedResourceCategories() {
  console.log('🌱 Seeding resource categories...');

  // Create root HSC category
  const hsc = await prisma.resourceCategory.create({
    data: {
      id: createId(),
      name: 'HSC',
      slug: 'hsc',
      path: 'hsc',
      level: 0,
      displayOrder: 1,
      published: true,
      description: 'NSW Higher School Certificate resources for Year 11 and Year 12 students',
      metaTitle: 'HSC Resources | Study Guides and Educational Materials',
      metaDescription:
        'Comprehensive HSC study resources, guides, and frameworks for NSW students.',
    },
  });

  console.log('✓ Created HSC root category');

  // Create Year 11 and Year 12
  const _year11 = await prisma.resourceCategory.create({
    data: {
      id: createId(),
      name: 'Year 11',
      slug: 'year-11',
      path: 'hsc/year-11',
      level: 1,
      parentId: hsc.id,
      displayOrder: 1,
      published: true,
      description: 'Year 11 HSC preliminary course resources',
      metaTitle: 'Year 11 HSC Resources | Study Materials',
      metaDescription: 'Study resources and materials for Year 11 HSC preliminary courses.',
    },
  });

  const year12 = await prisma.resourceCategory.create({
    data: {
      id: createId(),
      name: 'Year 12',
      slug: 'year-12',
      path: 'hsc/year-12',
      level: 1,
      parentId: hsc.id,
      displayOrder: 2,
      published: true,
      description: 'Year 12 HSC final course resources',
      metaTitle: 'Year 12 HSC Resources | Study Materials',
      metaDescription: 'Comprehensive study resources for Year 12 HSC final courses.',
    },
  });

  console.log('✓ Created Year 11 and Year 12 categories');

  // Create English Advanced (Year 12)
  const englishAdv = await prisma.resourceCategory.create({
    data: {
      id: createId(),
      name: 'English Advanced',
      slug: 'english-advanced',
      path: 'hsc/year-12/english-advanced',
      level: 2,
      parentId: year12.id,
      displayOrder: 1,
      published: true,
      description:
        'Study guides and frameworks for HSC English Advanced. Comprehensive resources covering all modules.',
      metaTitle: 'HSC English Advanced Resources | Study Guides',
      metaDescription:
        'Expert study resources for HSC English Advanced covering Common Module, Module A, Module B, and Module C.',
    },
  });

  console.log('✓ Created English Advanced category');

  // Create modules for English Advanced
  const modules = [
    {
      name: 'Common Module',
      slug: 'common-module',
      order: 1,
      description: 'Common Module: Texts and Human Experiences resources',
      metaTitle: 'HSC English Advanced Common Module Resources',
      metaDescription: 'Study materials for the Common Module: Texts and Human Experiences.',
    },
    {
      name: 'Module A: Textual Conversations',
      slug: 'module-a',
      order: 2,
      description: 'Module A: Textual Conversations study materials',
      metaTitle: 'HSC English Advanced Module A Resources',
      metaDescription: 'Comprehensive resources for Module A: Textual Conversations.',
    },
    {
      name: 'Module B: Critical Study of Literature',
      slug: 'module-b',
      order: 3,
      description: 'Module B: Critical Study of Literature frameworks',
      metaTitle: 'HSC English Advanced Module B Resources',
      metaDescription: 'Study guides for Module B: Critical Study of Literature.',
    },
    {
      name: 'Module C: The Craft of Writing',
      slug: 'module-c',
      order: 4,
      description: 'Module C: The Craft of Writing resources',
      metaTitle: 'HSC English Advanced Module C Resources',
      metaDescription: 'Expert frameworks for Module C: The Craft of Writing.',
    },
  ];

  for (const moduleItem of modules) {
    await prisma.resourceCategory.create({
      data: {
        id: createId(),
        name: moduleItem.name,
        slug: moduleItem.slug,
        path: `hsc/year-12/english-advanced/${moduleItem.slug}`,
        level: 3,
        parentId: englishAdv.id,
        displayOrder: moduleItem.order,
        published: true,
        description: moduleItem.description,
        metaTitle: moduleItem.metaTitle,
        metaDescription: moduleItem.metaDescription,
      },
    });
  }

  console.log(`✓ Created ${modules.length} module categories for English Advanced`);

  // Create English Extension 1 (Year 12)
  const _englishExt1 = await prisma.resourceCategory.create({
    data: {
      id: createId(),
      name: 'English Extension 1',
      slug: 'english-extension-1',
      path: 'hsc/year-12/english-extension-1',
      level: 2,
      parentId: year12.id,
      displayOrder: 2,
      published: true,
      description:
        'Resources for HSC English Extension 1, covering Literary Worlds and all electives.',
      metaTitle: 'HSC English Extension 1 Resources | Study Materials',
      metaDescription: 'Comprehensive study resources for HSC English Extension 1.',
    },
  });

  console.log('✓ Created English Extension 1 category');

  // Create English Extension 2 (Year 12)
  const _englishExt2 = await prisma.resourceCategory.create({
    data: {
      id: createId(),
      name: 'English Extension 2',
      slug: 'english-extension-2',
      path: 'hsc/year-12/english-extension-2',
      level: 2,
      parentId: year12.id,
      displayOrder: 3,
      published: true,
      description:
        'Resources for HSC English Extension 2, supporting independent creative and critical writing projects.',
      metaTitle: 'HSC English Extension 2 Resources | Writing Support',
      metaDescription: 'Expert resources for HSC English Extension 2 major works.',
    },
  });

  console.log('✓ Created English Extension 2 category');

  // Create Mathematics Advanced (Year 12)
  const _mathAdv = await prisma.resourceCategory.create({
    data: {
      id: createId(),
      name: 'Mathematics Advanced',
      slug: 'mathematics-advanced',
      path: 'hsc/year-12/mathematics-advanced',
      level: 2,
      parentId: year12.id,
      displayOrder: 4,
      published: true,
      description: 'Study resources for HSC Mathematics Advanced covering all topics.',
      metaTitle: 'HSC Mathematics Advanced Resources | Study Materials',
      metaDescription: 'Comprehensive resources for HSC Mathematics Advanced.',
    },
  });

  console.log('✓ Created Mathematics Advanced category');

  // Create placeholder categories for Theology and University (future)
  const _theology = await prisma.resourceCategory.create({
    data: {
      id: createId(),
      name: 'Theology',
      slug: 'theology',
      path: 'theology',
      level: 0,
      displayOrder: 2,
      published: false, // Not published yet
      description: 'Theology study resources (coming soon)',
      metaTitle: 'Theology Resources | Coming Soon',
      metaDescription: 'Comprehensive theology study materials.',
    },
  });

  const _university = await prisma.resourceCategory.create({
    data: {
      id: createId(),
      name: 'University',
      slug: 'university',
      path: 'university',
      level: 0,
      displayOrder: 3,
      published: false, // Not published yet
      description: 'University study resources (coming soon)',
      metaTitle: 'University Resources | Coming Soon',
      metaDescription: 'University-level study materials.',
    },
  });

  console.log('✓ Created placeholder categories for Theology and University');

  const totalCategories = await prisma.resourceCategory.count();
  console.log(`\n✅ Resource categories seeded successfully!`);
  console.log(`📊 Total categories created: ${totalCategories}`);
  console.log('\n📋 Category hierarchy:');
  console.log('  HSC');
  console.log('    ├── Year 11');
  console.log('    └── Year 12');
  console.log('        ├── English Advanced');
  console.log('        │   ├── Common Module');
  console.log('        │   ├── Module A: Textual Conversations');
  console.log('        │   ├── Module B: Critical Study of Literature');
  console.log('        │   └── Module C: The Craft of Writing');
  console.log('        ├── English Extension 1');
  console.log('        ├── English Extension 2');
  console.log('        └── Mathematics Advanced');
  console.log('  Theology (unpublished)');
  console.log('  University (unpublished)');
}

async function main() {
  try {
    await seedResourceCategories();
  } catch (error) {
    console.error('❌ Error seeding resource categories:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

main();
