/**
 * Photo Carousel - Modern Scrollable Album
 *
 * Features:
 * - Horizontal scroll with snap points
 * - Modern, minimal UI
 * - Responsive design
 * - Smooth scrolling experience
 */

'use client';

import Image from 'next/image';

interface Photo {
  src: string;
  alt: string;
  caption: string;
}

const photos: Photo[] = [
  {
    src: '/about/album/IMG_3469.JPG',
    alt: 'Life moment 1',
    caption:
      'catching moments between the grind. sometimes you just need to step back and breathe.',
  },
  {
    src: '/about/album/IMG_6742.JPG',
    alt: 'Life moment 2',
    caption: 'these are the conversations that matter. the ones you remember years later.',
  },
  {
    src: '/about/album/IMG_7140.JPG',
    alt: 'Life moment 3',
    caption: 'found this spot during a late-night drive. some places just hit different.',
  },
  {
    src: '/about/album/IMG_7636.JPG',
    alt: 'Life moment 4',
    caption: "the people who show up when it counts. that's what actually matters.",
  },
];

export function PhotoCarousel() {
  return (
    <div className="w-full">
      <div className="mb-8">
        <p className="mb-2 text-sm text-stone-500">moments</p>
        <h3 className="text-2xl font-medium tracking-tight text-stone-900">life beyond the work</h3>
      </div>

      {/* Scrollable container */}
      <div className="relative -mx-6 md:-mx-8">
        <div className="scrollbar-hide flex gap-6 overflow-x-auto px-6 pb-8 md:px-8">
          {photos.map((photo, index) => (
            <div key={index} className="group flex-shrink-0" style={{ width: 'min(400px, 85vw)' }}>
              {/* Image container */}
              <div className="relative mb-4 aspect-[4/5] overflow-hidden rounded-2xl bg-stone-100 shadow-lg transition-shadow duration-300 group-hover:shadow-2xl">
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 85vw, 400px"
                />
              </div>

              {/* Caption */}
              <p className="px-2 text-sm leading-relaxed text-stone-600">{photo.caption}</p>
            </div>
          ))}
        </div>

        {/* Scroll indicator */}
        <div className="mt-4 flex items-center justify-center gap-2">
          {photos.map((_, index) => (
            <div key={index} className="h-1.5 w-1.5 rounded-full bg-stone-300" />
          ))}
        </div>
      </div>

      {/* Hide scrollbar globally for this component */}
      <style jsx global>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}
