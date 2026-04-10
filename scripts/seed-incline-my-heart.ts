/**
 * Seed script: Incline My Heart product
 *
 * Adds the "Incline My Heart" devotional book to the theology category.
 *
 * Run with: npx tsx scripts/seed-incline-my-heart.ts
 * Safe to run multiple times (upsert).
 */

import { PrismaClient } from '@prisma/client';
import { randomUUID } from 'crypto';

const prisma = new PrismaClient();

async function main() {
  // Resolve admin user for authorId (not on Product model, but used elsewhere)
  const adminUser = await prisma.user.findFirst({
    where: { UserRole: { some: { Role: { name: 'admin' } } } },
  });

  if (!adminUser) {
    throw new Error('No admin user found. Run the main seed first.');
  }

  // Ensure theology category exists and is published
  const theologyCategory = await prisma.resourceCategory.findUnique({
    where: { path: 'theology' },
  });

  if (!theologyCategory) {
    throw new Error('Theology category not found. Run seed-theology-category.ts first.');
  }

  // Upsert the product
  const product = await prisma.product.upsert({
    where: { slug: 'incline-my-heart' },
    update: {},
    create: {
      id: randomUUID(),
      slug: 'incline-my-heart',
      title: 'Incline My Heart',
      description:
        'A thirty-day guide to morning prayer in the Anglican tradition, drawing from the 1662 Book of Common Prayer, the writings of the Church Fathers, and the spiritual wisdom of the saints — Lancelot Andrewes, Augustine, Anselm, Bernard of Clairvaux, George Herbert, Thomas à Kempis, and more.',

      format: 'PDF + Paperback',
      pageCount: 218,
      priceInCents: 1299,
      currency: 'AUD',
      published: true,
      featured: false,

      targetAudience:
        "Christians who want to recover the ancient rhythm of morning prayer. Those drawn to the Anglican liturgical tradition, the Daily Office, and patristic spirituality. Anyone who rises early to seek God and wants a structured, theologically serious guide that won't insult their intelligence.",

      nonAudience:
        'Those looking for a casual 5-minute devotional or a generic inspirational reading. This is a liturgical office, not a motivational supplement.',

      whatItIs: `<p>A thirty-day guide to morning prayer in the Anglican tradition, drawing from the 1662 Book of Common Prayer, the writings of the Church Fathers, and the spiritual wisdom of the saints.</p>

<p>Each day follows the ancient sevenfold pattern of the Daily Office: preparation of the heart, confession and absolution, adoration, Scripture and meditation, the Creed and prayers, self-examination and intention, and commendation and blessing.</p>

<p>Over thirty days the devotions move from the great I AM sayings of Christ through his titles and offices, through life in the Spirit and the communion of saints, to the practices of discipleship and the final vision of God. Each office takes approximately twenty to thirty minutes.</p>`,

      whatItCovers: `<ul>
<li>Thirty complete daily offices following the sevenfold Daily Office pattern</li>
<li>Prayers drawn from the 1662 BCP, adapted invocations from Andrewes, Anselm, Augustine, Bernard, Herbert, à Kempis, Taylor, and Wesley</li>
<li>Scripture from the King James Version with meditation points for each passage</li>
<li>The Apostles' Creed, Lord's Prayer, and a thematic Collect for each day</li>
<li>Self-examination questions and intention prayers connecting theology to daily life</li>
<li>Blessings and commendations sending the reader into the day</li>
</ul>`,

      howItWasCreated: `<p>Written as a personal devotional project, drawing together the Anglican liturgical tradition and patristic sources into a structured thirty-day guide. The sevenfold Daily Office pattern follows the historic structure of morning prayer from the 1662 Book of Common Prayer, adapted for private use.</p>

<p>The thirty meditations were composed over an extended period of daily prayer practice, drawing on primary sources — the Fathers, the Reformers, the Caroline Divines — rather than secondary commentary.</p>`,

      whatYouGet: `<p>218-page PDF: complete thirty daily offices, each following the sevenfold pattern. Instant download after purchase. Watermarked with your purchase details.</p>

<p>Paperback edition also available on Amazon.</p>`,

      downloadUrls: ['/resources/incline-my-heart.pdf'],

      ogImage: '/resources/incline-my-heart-cover.png',

      metaTitle: 'Incline My Heart — A Thirty-Day Liturgy for Morning Devotion | Riqle',
      metaDescription:
        'A thirty-day guide to morning prayer in the Anglican tradition. PDF and paperback. Draws from the 1662 BCP, the Church Fathers, and the saints.',

      relatedPostSlugs: [],
      relatedProjectSlugs: [],
      tags: ['theology', 'devotional', 'anglican', 'prayer'],
      updatedAt: new Date(),
    },
  });

  console.log(
    `✓ Product: ${product.title} (slug: ${product.slug}, price: $${(product.priceInCents / 100).toFixed(2)} ${product.currency})`
  );

  // Link product to theology category
  const link = await prisma.productCategory.upsert({
    where: {
      productId_categoryId: {
        productId: product.id,
        categoryId: theologyCategory.id,
      },
    },
    update: {},
    create: {
      productId: product.id,
      categoryId: theologyCategory.id,
      isPrimary: true,
      displayOrder: 1,
    },
  });

  console.log(`✓ Linked to theology category (isPrimary: ${link.isPrimary})`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
