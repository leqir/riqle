/**
 * TrajectoryTimeline Component
 *
 * Purpose: Show Nathanael's pivots as intentional and coherent, not erratic.
 * Core question answered: "Is this person coherent?"
 *
 * Story 4.5 Requirements:
 * - Each phase logically leads to the next
 * - Employers can see cause-and-effect, not randomness
 * - Pivots feel intentional, not erratic
 * - Focus on learning, not status
 * - NO emotional language ("burnt out", "lost")
 * - NO retrospective justification
 */

type Phase = {
  id: string;
  title: string;
  timeframe: string;
  description: string;
  problemExposed: string;
  learning: string;
};

const phases: Phase[] = [
  {
    id: 'student',
    title: 'Student',
    timeframe: '2015–2019',
    description: 'Studying at university while taking on early tutoring work to pay rent.',
    problemExposed:
      "Noticed that most students didn't struggle with content—they struggled with knowing what to prioritize and how to structure their thinking under time pressure.",
    learning:
      'This revealed that clarity and system design matter more than raw knowledge. Most educational tools focused on content delivery, not cognitive frameworks.',
  },
  {
    id: 'tutor',
    title: 'Tutor',
    timeframe: '2018–2022',
    description:
      'Taught 500+ students to Band 6 in HSC English, refining a replicable framework for essay writing and critical analysis.',
    problemExposed:
      'Saw how existing educational resources were either too generic or too prescriptive—students needed adaptable frameworks, not templates.',
    learning:
      'Learned that teaching at scale requires systems that work without you. Built frameworks that students could internalize and apply independently, which later shaped how I think about product design and onboarding.',
  },
  {
    id: 'builder',
    title: 'Builder',
    timeframe: '2020–2023',
    description:
      'Built tools and platforms to solve specific problems I encountered—first for tutoring efficiency, then for personal projects requiring infrastructure.',
    problemExposed:
      'Encountered the gap between "works for me" and "works for others"—learned that adoption happens at the intersection of utility and friction reduction, not features.',
    learning:
      "Discovered that product development is about constraint navigation. Users don't adopt tools because they're powerful—they adopt tools that reduce friction in an existing workflow. This now informs every product decision at MarkPoint.",
  },
  {
    id: 'founder',
    title: 'Founder',
    timeframe: '2023–present',
    description:
      'Founded MarkPoint to build educational technology that bridges the gap between content knowledge and cognitive frameworks.',
    problemExposed:
      'Working on the challenge of building sustainable businesses in education—most edtech fails because it optimizes for engagement rather than outcomes.',
    learning:
      'Currently learning how to balance product velocity with business sustainability, and how to build tools that respect both user attention and educational integrity.',
  },
];

export function TrajectoryTimeline() {
  return (
    <div className="space-y-10">
      <h2 className="text-[clamp(1.75rem,3vw,2.25rem)] font-bold leading-tight text-stone-900">
        How I got here
      </h2>

      <div className="space-y-12">
        {phases.map((phase) => (
          <div key={phase.id} className="relative space-y-4 border-l-2 border-stone-200 pl-8">
            {/* Phase marker dot */}
            <div className="absolute -left-[9px] top-1 h-4 w-4 rounded-full border-2 border-stone-200 bg-cyan-500"></div>

            {/* Phase Title & Timeframe */}
            <div className="flex flex-wrap items-baseline gap-3">
              <h3 className="text-xl font-bold text-stone-900">{phase.title}</h3>
              <span className="text-sm font-medium uppercase tracking-wide text-stone-500">
                {phase.timeframe}
              </span>
            </div>

            {/* What I was doing */}
            <p className="text-base leading-relaxed text-stone-700">{phase.description}</p>

            {/* Problem exposed to */}
            <p className="text-base italic leading-relaxed text-stone-600">
              {phase.problemExposed}
            </p>

            {/* What I learned */}
            <p className="text-base font-medium leading-relaxed text-stone-900">{phase.learning}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
