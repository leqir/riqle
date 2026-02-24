/**
 * Tutoring Page
 *
 * 1:1 HSC English tutoring. $80/hr. Book via Calendly.
 */

import { type Metadata } from 'next';
import Link from 'next/link';

export const revalidate = 3600;

export const metadata: Metadata = {
  title: 'tutoring | riqle',
  description:
    '1:1 hsc english tutoring. $80/hr. framework-based coaching for band 5–6. sydney-based, online available.',
};

const faqs = [
  {
    q: 'where are sessions held?',
    a: "online via zoom, or in person at a location that works for both of us. when you book in person, enter your preferred suburb — i'll confirm whether it's workable before the session.",
  },
  {
    q: 'what subjects do you tutor?',
    a: 'english for years 7–10, english standard, english advanced, extension 1, extension 2, and eald. i do not tutor maths or other subjects — if you need a maths tutor i can refer you to friends who do.',
  },
  {
    q: 'when can i book?',
    a: 'weeknights and weekends. the booking page shows my live availability so you pick an actual open slot.',
  },
  {
    q: 'how is this different from a generic tutor?',
    a: 'i teach frameworks, not content. most tutors give you more information. i teach you a system for deciding what matters and how to write under pressure.',
  },
  {
    q: 'what is your refund policy?',
    a: 'if you are not satisfied after a session, i will refund it — no questions asked.',
  },
];

export default function TutoringPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto max-w-4xl px-6 py-24 md:px-8 md:py-32">
        {/* Header */}
        <header className="mb-20">
          <p className="mb-3 text-sm font-medium uppercase tracking-wider text-stone-500">
            tutoring
          </p>
          <h1 className="mb-4 text-[clamp(2.5rem,6vw,4rem)] font-semibold leading-[1.1] tracking-tight text-stone-900">
            1:1 hsc english tutoring
          </h1>
          <p className="text-xl leading-relaxed text-stone-600">
            framework-based coaching from someone who has taught 500+ students to band 6.
          </p>
        </header>

        {/* Philosophy */}
        <section className="mb-20 border-l-2 border-stone-900 pl-8">
          <div className="space-y-6 text-lg leading-relaxed text-stone-700">
            <p>most tutoring gives students more content to memorise.</p>
            <p>
              that is not the problem. students who struggle in hsc english already know the content
              — they struggle to decide what matters under time pressure and structure their
              thinking in real time.
            </p>
            <p>
              this is a frameworks problem. i teach the underlying systems that let students apply
              what they know to any question, not just the one they practised.
            </p>
          </div>
        </section>

        {/* About */}
        <section className="mb-20 border-l-2 border-stone-300 pl-8">
          <div className="space-y-4 text-base leading-relaxed text-stone-600">
            <p className="text-lg text-stone-700">
              not in a &quot;here&apos;s a template&quot; way, but in a &quot;why does this actually
              score higher?&quot; way.
            </p>
            <ul className="space-y-1">
              <li>graduated sydney boys &apos;24</li>
              <li>2+ years private tutoring + centre experience</li>
              <li>took 4u english for fun</li>
            </ul>
            <p>
              i&apos;m based in hurstville — i love you but i ain&apos;t trekking to epping or
              castle hill. online works fine if you&apos;re far.
            </p>
          </div>
        </section>

        {/* Pricing — single, clean block */}
        <section className="mb-20">
          <div className="mb-6 flex items-baseline justify-between border-b border-stone-200 pb-6">
            <div>
              <h2 className="text-2xl font-semibold text-stone-900">1:1 session</h2>
              <p className="mt-1 text-stone-500">
                years 7–12 · english · advanced · ext 1 &amp; 2 · eald
              </p>
            </div>
            <div className="text-right">
              <div className="text-3xl font-semibold text-stone-900">a$80/hr</div>
              <div className="text-sm text-stone-400">flexible duration</div>
            </div>
          </div>

          <div className="mb-10 flex flex-wrap gap-x-8 gap-y-3 text-sm text-stone-600">
            <span>in person · sydney (hurstville area)</span>
            <span>or online via zoom</span>
            <span>weeknights &amp; weekends</span>
          </div>

          <Link
            href="/tutoring/book"
            className="inline-flex items-center gap-2 rounded-full border-2 border-stone-900 bg-white px-8 py-4 text-base font-semibold text-stone-900 transition-all hover:bg-stone-900 hover:text-white"
          >
            book a session →
          </Link>
        </section>

        {/* Who it is / isn't for */}
        <section className="mb-20 grid gap-12 sm:grid-cols-2">
          <div>
            <h2 className="mb-6 text-lg font-semibold text-stone-900">who this is for</h2>
            <ul className="space-y-4 text-base text-stone-600">
              {[
                'years 7–12 in english, advanced, extension 1 or 2, eald, or standard',
                'students who understand content but freeze in exams',
                'students who want to learn how to think, not just what to write',
                'students aiming for band 5 or 6',
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-stone-400" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="mb-6 text-lg font-semibold text-stone-900">who this is not for</h2>
            <ul className="space-y-4 text-base text-stone-600">
              {[
                'students who want essays written for them',
                'students wanting generic tips and tricks',
                'students in other subjects (maths, science, etc.) — i can refer you elsewhere',
                'students who will not engage actively between sessions',
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-stone-300" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* FAQ */}
        <section className="mb-20">
          <h2 className="mb-10 text-2xl font-semibold text-stone-900">faq</h2>
          <dl className="divide-y divide-stone-100">
            {faqs.map(({ q, a }) => (
              <div key={q} className="py-6">
                <dt className="mb-2 font-medium text-stone-900">{q}</dt>
                <dd className="text-base text-stone-600">{a}</dd>
              </div>
            ))}
          </dl>
        </section>

        {/* Resources crosslink */}
        <section className="border-l-2 border-stone-300 pl-8">
          <div className="space-y-4 text-stone-700">
            <p className="text-lg">
              not ready for 1:1? the{' '}
              <Link href="/resources" className="underline underline-offset-2 hover:text-stone-900">
                resources page
              </Link>{' '}
              has annotated exemplar essays you can work through on your own.
            </p>
            <p className="text-base text-stone-500">
              same frameworks, self-paced, a fraction of the cost.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
