/**
 * Tutoring Slot Generation
 *
 * Pure function — no DB calls, fully testable.
 * Generates available booking slots from availability rules,
 * existing bookings, and blocked dates.
 *
 * Time handling: All Date objects are UTC. Rules use AEST/AEDT times (strings).
 * AEST = UTC+10, AEDT = UTC+11 (Australian DST: first Sunday Oct → first Sunday Apr).
 */

export type Slot = {
  start: Date;
  end: Date;
  available: boolean;
};

type Rule = {
  dayOfWeek: number;
  startTime: string;
  endTime: string;
  active: boolean;
};

type BookingLike = {
  scheduledAt: Date;
  durationMinutes: number;
  status: string;
};

type BlockLike = {
  date: Date;
};

/**
 * Returns the UTC offset in hours for Sydney on a given UTC date.
 * AEDT (UTC+11): first Sunday in October through first Sunday in April.
 * AEST (UTC+10): otherwise.
 */
function getSydneyOffsetHours(utcDate: Date): number {
  const month = utcDate.getUTCMonth(); // 0-indexed

  // May through September: always AEST (UTC+10)
  if (month >= 4 && month <= 8) return 10;

  // April: AEST — DST ends first Sunday in April
  if (month === 3) {
    const firstSundayApr = getFirstSundayOfMonth(utcDate.getUTCFullYear(), 3);
    return utcDate.getUTCDate() >= firstSundayApr ? 10 : 11;
  }

  // October: AEDT starts first Sunday in October
  if (month === 9) {
    const firstSundayOct = getFirstSundayOfMonth(utcDate.getUTCFullYear(), 9);
    return utcDate.getUTCDate() >= firstSundayOct ? 11 : 10;
  }

  // November, December, January, February, March: AEDT (UTC+11)
  return 11;
}

/** Returns the day-of-month for the first Sunday of a given month (0-indexed). */
function getFirstSundayOfMonth(year: number, month: number): number {
  const d = new Date(Date.UTC(year, month, 1));
  const dayOfWeek = d.getUTCDay(); // 0=Sun
  return dayOfWeek === 0 ? 1 : 8 - dayOfWeek;
}

/**
 * Parses a "HH:MM" string into hours and minutes.
 */
function parseTime(time: string): { hours: number; minutes: number } {
  const [h, m] = time.split(':').map(Number);
  return { hours: h!, minutes: m! };
}

/**
 * Returns the UTC Date for a given AEST/AEDT local time on the date represented by anchorUtc.
 * anchorUtc should be midnight UTC of the relevant day.
 */
function localTimeToUtc(anchorUtcMidnight: Date, timeStr: string): Date {
  const { hours, minutes } = parseTime(timeStr);
  // Temporarily use noon to get stable offset (avoids edge cases at midnight)
  const noonUtc = new Date(anchorUtcMidnight.getTime() + 12 * 60 * 60 * 1000);
  const offsetHours = getSydneyOffsetHours(noonUtc);
  // local time = UTC + offset, so UTC = local - offset
  return new Date(
    anchorUtcMidnight.getTime() + (hours - offsetHours) * 60 * 60 * 1000 + minutes * 60 * 1000
  );
}

/**
 * Returns the UTC midnight for the Monday of the week containing the given date.
 */
function startOfWeekUtc(date: Date): Date {
  const d = new Date(date);
  d.setUTCHours(0, 0, 0, 0);
  const day = d.getUTCDay(); // 0=Sun
  const diff = day === 0 ? -6 : 1 - day; // adjust to Monday
  d.setUTCDate(d.getUTCDate() + diff);
  return d;
}

/**
 * Generates available booking slots.
 *
 * @param rules          Weekly availability rules (from DB).
 * @param bookings       Existing bookings (any status).
 * @param blocks         Dates blocked by admin.
 * @param weeksAhead     How many weeks ahead to generate slots for.
 * @param sessionDuration Session duration in minutes.
 * @returns Sorted array of Slot objects.
 */
export function generateAvailableSlots(
  rules: Rule[],
  bookings: BookingLike[],
  blocks: BlockLike[],
  weeksAhead = 6,
  sessionDuration = 60
): Slot[] {
  const now = new Date();
  const activeRules = rules.filter((r) => r.active);

  // Build set of blocked date strings (YYYY-MM-DD in UTC for comparison)
  const blockedDates = new Set(blocks.map((b) => b.date.toISOString().slice(0, 10)));

  // Build list of active bookings (not cancelled) for overlap checking
  const activeBookings = bookings.filter((b) => b.status !== 'cancelled');

  const slots: Slot[] = [];

  const weekStart = startOfWeekUtc(now);

  for (let week = 0; week <= weeksAhead; week++) {
    for (const rule of activeRules) {
      // Find the UTC midnight for this rule's dayOfWeek in this week
      // weekStart is Monday (dayOfWeek=1), so offset = rule.dayOfWeek - 1 (mod 7)
      // dayOfWeek: 0=Sun, 1=Mon, ..., 6=Sat
      let dayOffset = rule.dayOfWeek - 1; // offset from Monday
      if (dayOffset < 0) dayOffset = 6; // Sunday is 6 days after Monday

      const dayUtcMidnight = new Date(
        weekStart.getTime() + (week * 7 + dayOffset) * 24 * 60 * 60 * 1000
      );

      // Skip past dates (allow today only if slots are in the future)
      const dayStr = dayUtcMidnight.toISOString().slice(0, 10);

      // Skip blocked dates
      if (blockedDates.has(dayStr)) continue;

      // Generate slots for this day
      const slotStart = localTimeToUtc(dayUtcMidnight, rule.startTime);
      const slotEnd = localTimeToUtc(dayUtcMidnight, rule.endTime);
      const durationMs = sessionDuration * 60 * 1000;

      let cursor = slotStart;
      while (cursor.getTime() + durationMs <= slotEnd.getTime()) {
        const end = new Date(cursor.getTime() + durationMs);

        // Skip slots in the past (must start at least 1 hour from now)
        const cutoff = new Date(now.getTime() + 60 * 60 * 1000);
        if (cursor < cutoff) {
          cursor = end;
          continue;
        }

        // Check overlap with existing active bookings
        const isBooked = activeBookings.some((b) => {
          const bStart = b.scheduledAt;
          const bEnd = new Date(bStart.getTime() + b.durationMinutes * 60 * 1000);
          // Overlap if cursor < bEnd && end > bStart
          return cursor < bEnd && end > bStart;
        });

        slots.push({ start: cursor, end, available: !isBooked });
        cursor = end;
      }
    }
  }

  // Sort chronologically
  slots.sort((a, b) => a.start.getTime() - b.start.getTime());

  return slots;
}
