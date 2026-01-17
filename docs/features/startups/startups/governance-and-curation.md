# Startups Curation Governance

**Epic 6 - Story 6.11**

## Purpose
Maintain clear governance rules to keep the Startups section strong over time, ensuring signal density improves rather than decreases.

---

## Core Principle

**Signal density over quantity.**

Better to have:
- 1 strong startup that demonstrates capability
- Than 3 weak ones that raise questions

---

## Annual Review Process

### Schedule
**Run every 12 months** (set calendar reminder)

Recommended timing: January (start of year)

### Review Steps

#### 1. Review All Published Startups

For each published startup, ask:

**Still representative?**
- [ ] Does this startup represent capabilities I want to demonstrate today?
- [ ] Have my skills evolved beyond what this represents?
- [ ] Would I discuss this confidently in an interview?

**Meets quality bar?**
- [ ] Does it demonstrate end-to-end ownership?
- [ ] Does it show real users and real consequences?
- [ ] Can I articulate specific decisions and learnings?

**Adds signal?**
- [ ] Does this increase or decrease my credibility?
- [ ] Does it strengthen or dilute the overall narrative?
- [ ] Does it answer employer questions or raise new ones?

#### 2. Apply Limits

**Maximum visible startups:** 1-3

Current count: __/3

**Primary venture priority:**
- MarkPoint (or current primary venture) always featured
- Secondary ventures only if they add distinct signal

**Archive rule:**
- If venture no longer adds signal → set `published: false`
- Keep in database for history, but remove from public view

#### 3. Update Content

For startups remaining published:

**Refresh outcomes/status**
- [ ] Update current status (Active, Iterating, Paused, Sunset)
- [ ] Revise outcomes based on latest data
- [ ] Update metrics if relevant

**Update learnings**
- [ ] Add new perspective gained since last review
- [ ] Connect to current work more explicitly
- [ ] Strengthen specific lessons

**Remove outdated content**
- [ ] Delete obsolete metrics
- [ ] Remove outdated screenshots
- [ ] Clean up references to old tech/approaches

---

## Limits & Rules

### Maximum Startups

**Visible limit: 1-3 startups**

Rationale:
- Employers have limited attention
- Each startup must earn its place
- Quality over quantity

**Current recommended:**
- 1 primary venture (MarkPoint)
- 0-2 secondary ventures (only if distinctly valuable)

### Display Order Priority

1. **Primary venture** (MarkPoint): displayOrder = 1
2. **Secondary ventures** (if any): displayOrder = 2, 3
3. **Archived ventures**: published = false

### Quality Bar

Each published startup must:
- Demonstrate end-to-end ownership
- Show real users or concrete learnings
- Include operational specifics
- Pass emotional validation test
- Be discussable confidently in interviews

---

## Archiving vs. Deletion

### When to Archive

Archive (set `published: false`) when:
- Venture no longer represents current capabilities
- Quality bar has evolved beyond what it demonstrates
- Raises more questions than it answers
- Weakens overall narrative
- You wouldn't discuss confidently in interview

### Archiving Process

```typescript
// In database admin or seed script
await db.startup.update({
  where: { slug: 'venture-slug' },
  data: { published: false },
});
```

**Effect:**
- Removed from `/startups` listing page
- Detail page returns 404
- Remains in database for history
- Can be restored if relevant again

### Never Delete

**Do NOT delete startups from database**

Reasons:
- Historical record
- May become relevant again
- Learning archive
- Data integrity

**Exception:** Test/dummy data only

---

## Adding New Startups

### Inclusion Checklist

Before adding a new startup to the published list:

**1. Meets inclusion standards?**
- [ ] Reviewed against [inclusion-rules.md](./inclusion-rules.md)
- [ ] Real founder/co-founder responsibility
- [ ] Real users with real constraints
- [ ] Real consequences from decisions

**2. Adds distinct signal?**
- [ ] Demonstrates capability not shown by other startups?
- [ ] Strengthens overall narrative?
- [ ] Doesn't raise concerns about focus/commitment?

**3. Within limits?**
- [ ] Total published startups ≤ 3 after addition
- [ ] If at limit, is new startup stronger than existing ones?

**4. Passes validation?**
- [ ] Emotional validation checklist complete
- [ ] Interview simulation passed
- [ ] Test reader feedback positive

### Adding Process

1. **Create content** following all Epic 6 guidelines
2. **Run validation** (emotional, interview, test readers)
3. **Check limits** (at 3? Remove weakest to add new)
4. **Set displayOrder** appropriately
5. **Set published: true** to make visible

---

## Signal Density Metrics

### What is Signal Density?

**Signal:** Information that helps employers assess capability
**Noise:** Information that raises questions or concerns

**Goal:** Maximize signal, minimize noise

### Measuring Signal Density

For each startup, evaluate:

**High signal indicators:**
- Clear ownership articulation
- Specific systems/decisions explained
- Honest outcomes framing
- Concrete learnings
- Reinforces employability narrative

**High noise indicators:**
- Vague role descriptions
- Defensive tone
- Vanity metrics
- Too many ventures
- Raises concern about focus

### Improvement Over Time

**Target:** Signal density should increase with each annual review

**How:**
- Archive weak ventures
- Strengthen remaining content
- Add specificity and depth
- Connect learnings to current work

---

## Content Refresh Cadence

### Annual (Required)
- Full governance review
- Update all outcomes/status
- Refresh learnings
- Archive outdated ventures

### Quarterly (Optional)
- Quick status check
- Update metrics if significant changes
- Minor content improvements

### As-Needed
- New significant outcome (product launch, user milestone)
- Status change (Active → Paused, etc.)
- Major learning worth adding

---

## Decision Framework

### Should This Startup Be Published?

**Decision tree:**

1. **Does it meet inclusion standards?**
   - No → Don't publish
   - Yes → Continue

2. **Does it add distinct signal not covered by other startups?**
   - No → Don't publish
   - Yes → Continue

3. **Does it pass emotional validation?**
   - No → Revise or don't publish
   - Yes → Continue

4. **Are we at the limit (3 startups)?**
   - No → Publish
   - Yes → Is it stronger than weakest current startup?
     - No → Don't publish
     - Yes → Archive weakest, publish new

### Should This Startup Remain Published?

**Decision tree:**

1. **Still represents current capabilities?**
   - No → Archive
   - Yes → Continue

2. **Still passes interview test (can discuss confidently)?**
   - No → Archive
   - Yes → Continue

3. **Still adds signal (not just noise)?**
   - No → Archive
   - Yes → Keep published

4. **Content up-to-date?**
   - No → Update before next review
   - Yes → Keep published

---

## Governance Checklist Template

### Annual Review Checklist (Date: _______)

**For each published startup:**

**Startup 1:** [Name]
- [ ] Still representative of current work?
- [ ] Can discuss confidently in interview?
- [ ] Adds signal to narrative?
- [ ] Content is up-to-date?
- [ ] **Decision:** Keep / Archive / Update

**Startup 2:** [Name]
- [ ] Still representative of current work?
- [ ] Can discuss confidently in interview?
- [ ] Adds signal to narrative?
- [ ] Content is up-to-date?
- [ ] **Decision:** Keep / Archive / Update

**Startup 3:** [Name]
- [ ] Still representative of current work?
- [ ] Can discuss confidently in interview?
- [ ] Adds signal to narrative?
- [ ] Content is up-to-date?
- [ ] **Decision:** Keep / Archive / Update

**Overall:**
- [ ] Total published: __/3 (within limit)
- [ ] Primary venture (MarkPoint) featured
- [ ] Signal density improved from last year?
- [ ] All content refreshed for current year

**Actions Required:**
- [ ] Archive: [List startups]
- [ ] Update: [List startups and what needs updating]
- [ ] Next review date: [Date one year from now]

---

## Quality Maintenance

### Preventing Quality Drift

**Common drift patterns:**
- Gradual accumulation of ventures (ignoring limit)
- Outdated content (stale metrics, old status)
- Defensive tone creeping in
- Loss of specificity over time

**Prevention:**
- Strict annual review
- Enforce 3-startup limit
- Regular content freshness check
- Re-run emotional validation

### Continuous Improvement

Each review should:
- Strengthen remaining content
- Add depth and specificity
- Connect more explicitly to current work
- Improve signal-to-noise ratio

**Goal:** Each year, the Startups section should be stronger than the previous year.

---

## Archive Management

### Viewing Archived Startups

Archived startups remain in database but are not publicly visible.

**Access:**
- Database query: `where: { published: false }`
- Admin panel (if built)
- Direct database access

### Restoring Archived Startups

To restore an archived startup:

1. **Re-evaluate against current standards**
   - Does it still meet inclusion criteria?
   - Does it pass emotional validation?
   - Is there room (under 3-startup limit)?

2. **Update content if restoring**
   - Refresh outcomes/status
   - Update learnings
   - Ensure current relevance

3. **Set published: true**

---

## Summary

**Governance principles:**
- Quality over quantity (1-3 startups max)
- Signal density increases over time
- Annual review is mandatory
- Archive rather than delete
- Primary venture always featured

**Maintenance cycle:**
- Annual: Full review and refresh
- Quarterly: Status check (optional)
- As-needed: Significant updates

**Decision framework:**
- Must meet inclusion standards
- Must add distinct signal
- Must pass validation
- Must fit within limits

**Goal:**
The Startups section gets stronger every year through curation, not accumulation.

---

**Last Updated:** 2026-01-04
**Maintained By:** Nathanael
**Next Review Due:** 2027-01-04
