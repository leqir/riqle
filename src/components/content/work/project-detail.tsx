'use client';

import Image from 'next/image';
import Link from 'next/link';

type ProjectDetailProps = {
  title: string;
  overview: string;
  roleDetail: string;
  teamSize?: number | null;
  execution: string;
  outcomeDetail: string;
  reflection?: string | null;
  screenshots: string[];
  diagrams: string[];
  sectionHeadings?: {
    overview?: string;
    role?: string;
    execution?: string;
    outcome?: string;
    reflection?: string;
  };
};

// Render inline markdown: **bold**, *italic*
function renderInline(text: string): React.ReactNode[] {
  const parts = text.split(/(\*\*[^*]+\*\*|\*[^*]+\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return (
        <strong key={i} className="font-semibold text-stone-900">
          {part.slice(2, -2)}
        </strong>
      );
    }
    if (part.startsWith('*') && part.endsWith('*')) {
      return <em key={i}>{part.slice(1, -1)}</em>;
    }
    return part;
  });
}

// Render a block of text with paragraph, heading, and divider support
function renderFormattedText(text: string) {
  const blocks = text.split(/\n\n+/);

  return (
    <div className="space-y-5">
      {blocks.map((block, i) => {
        const trimmed = block.trim();

        if (trimmed === '---') {
          return <hr key={i} className="border-stone-200" />;
        }

        if (trimmed.startsWith('### ')) {
          return (
            <h3
              key={i}
              className="mb-1 mt-10 text-xl font-semibold tracking-tight text-stone-900 first:mt-0"
            >
              {renderInline(trimmed.slice(4))}
            </h3>
          );
        }

        if (trimmed.startsWith('## ')) {
          return (
            <h3
              key={i}
              className="mb-1 mt-10 text-2xl font-semibold tracking-tight text-stone-900 first:mt-0"
            >
              {renderInline(trimmed.slice(3))}
            </h3>
          );
        }

        return (
          <p key={i} className="text-lg leading-relaxed text-stone-700">
            {renderInline(trimmed)}
          </p>
        );
      })}
    </div>
  );
}

export function ProjectDetail({
  title,
  overview,
  roleDetail,
  teamSize,
  execution,
  outcomeDetail,
  reflection,
  screenshots,
  diagrams,
  sectionHeadings,
}: ProjectDetailProps) {
  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto max-w-4xl px-6 py-12 md:px-8 md:py-16">
        {/* Breadcrumb */}
        <nav className="mb-12">
          <Link
            href="/work"
            className="inline-flex items-center gap-2 text-sm font-medium text-stone-500 transition-colors hover:text-stone-900"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            work
          </Link>
        </nav>

        {/* Header */}
        <header className="mb-20">
          <h1 className="mb-4 text-[clamp(2.5rem,6vw,4rem)] font-semibold leading-[1.1] tracking-tight text-stone-900">
            {title}
          </h1>
        </header>

        {/* Content Sections */}
        <div className="space-y-20">
          {/* Overview */}
          <section>
            <div className="mb-8">
              <p className="mb-2 text-sm font-medium uppercase tracking-wider text-stone-500">
                overview
              </p>
              <h2 className="text-3xl font-semibold tracking-tight text-stone-900">
                {sectionHeadings?.overview ?? 'what this project was'}
              </h2>
            </div>
            <div className="border-l-2 border-stone-900 pl-8">{renderFormattedText(overview)}</div>
          </section>

          {/* Role / Features */}
          <section>
            <div className="mb-8">
              <p className="mb-2 text-sm font-medium uppercase tracking-wider text-stone-500">
                role
              </p>
              <h2 className="text-3xl font-semibold tracking-tight text-stone-900">
                {sectionHeadings?.role ?? 'what you did'}
              </h2>
            </div>
            <div className="border-l-2 border-stone-900 pl-8">
              {renderFormattedText(roleDetail)}
              {teamSize !== null && teamSize !== undefined && (
                <p className="mt-6 text-sm text-stone-600">
                  team size:{' '}
                  {teamSize === 0
                    ? 'solo project'
                    : `${teamSize} ${teamSize === 1 ? 'person' : 'people'}`}
                </p>
              )}
            </div>
          </section>

          {/* Execution */}
          <section>
            <div className="mb-8">
              <p className="mb-2 text-sm font-medium uppercase tracking-wider text-stone-500">
                execution
              </p>
              <h2 className="text-3xl font-semibold tracking-tight text-stone-900">
                {sectionHeadings?.execution ?? 'how it was built'}
              </h2>
            </div>
            <div className="border-l-2 border-stone-900 pl-8">{renderFormattedText(execution)}</div>
          </section>

          {/* Outcome */}
          <section>
            <div className="mb-8">
              <p className="mb-2 text-sm font-medium uppercase tracking-wider text-stone-500">
                outcome
              </p>
              <h2 className="text-3xl font-semibold tracking-tight text-stone-900">
                {sectionHeadings?.outcome ?? 'what happened'}
              </h2>
            </div>
            <div className="border-l-2 border-stone-900 pl-8">
              {renderFormattedText(outcomeDetail)}
            </div>
          </section>

          {/* Reflection (optional) */}
          {reflection && (
            <section>
              <div className="mb-8">
                <p className="mb-2 text-sm font-medium uppercase tracking-wider text-stone-500">
                  reflection
                </p>
                <h2 className="text-3xl font-semibold tracking-tight text-stone-900">
                  {sectionHeadings?.reflection ?? 'what you learned'}
                </h2>
              </div>
              <div className="border-l-2 border-stone-300 pl-8">
                {renderFormattedText(reflection)}
              </div>
            </section>
          )}

          {/* Diagrams */}
          {diagrams.length > 0 && (
            <section>
              <div className="mb-6">
                <p className="mb-2 text-sm font-medium uppercase tracking-wider text-stone-500">
                  architecture
                </p>
              </div>
              <div className="space-y-8 border-l-2 border-stone-300 pl-8">
                {diagrams.map((url, index) => (
                  <div key={index} className="overflow-hidden">
                    <Image
                      src={url}
                      alt={`${title} architecture diagram ${index + 1}`}
                      width={800}
                      height={600}
                      className="h-auto w-full"
                    />
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Screenshots */}
          {screenshots.length > 0 && (
            <section>
              <div className="mb-6">
                <p className="mb-2 text-sm font-medium uppercase tracking-wider text-stone-500">
                  screenshots
                </p>
              </div>
              <div className="space-y-8 border-l-2 border-stone-300 pl-8">
                {screenshots.slice(0, 3).map((url, index) => (
                  <div key={index} className="overflow-hidden">
                    <Image
                      src={url}
                      alt={`${title} screenshot ${index + 1}`}
                      width={800}
                      height={600}
                      className="h-auto w-full"
                    />
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}
