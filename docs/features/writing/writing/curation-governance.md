# Curation & Pruning Governance

**Epic 7 - Story 7.12**

## Purpose
Maintain signal density over time through systematic curation. Quality should improve, not degrade, as the collection grows.

---

## Core Principle

**Signal density should increase over time, not decrease.**

This means:
- Not every essay stays published forever
- Older essays get archived if they no longer represent your thinking
- The collection is curated, not just accumulated
- Quality bar should rise, not drift

---

## Annual Review Process

**When:** Once per year (suggested: January or during reflection periods)

**Duration:** 2-4 hours of focused review

**Outcome:** Explicit decisions on each essay (keep, update, archive)

---

## Review Criteria

For each published essay, ask these questions:

### 1. Still Representative?

**Question:** Does this still show how I think?

**Keep if:**
- ✅ Reasoning process still reflects current approach
- ✅ Judgment demonstrated is still sound
- ✅ I'd write something similar today (even if specifics changed)

**Archive if:**
- ❌ I've evolved significantly beyond this thinking
- ❌ Judgment seems naive or incomplete now
- ❌ I wouldn't write this today

**Update if:**
- ⚠️ Core insight is sound but details outdated
- ⚠️ Can add perspective from additional experience
- ⚠️ Minor corrections or caveats needed

### 2. Still Adds Signal?

**Question:** Does this increase employer trust or raise questions?

**Keep if:**
- ✅ Demonstrates clear, independent thinking
- ✅ Shows how I approach problems
- ✅ Complements other essays well
- ✅ Unique insight or perspective

**Archive if:**
- ❌ Redundant with better essay on same topic
- ❌ Weakens overall narrative
- ❌ Generic insights that don't reveal reasoning
- ❌ Raises doubts about judgment

**Update if:**
- ⚠️ Can strengthen with additional examples
- ⚠️ Can clarify confusing sections
- ⚠️ Can add important caveats

### 3. Quality Bar Still Met?

**Question:** Does this meet current quality standards?

**Keep if:**
- ✅ Plain language, concrete examples
- ✅ Clear structure and reasoning
- ✅ Honest uncertainty and caveats
- ✅ No performance language
- ✅ Would pass current validation process

**Archive if:**
- ❌ Contains buzzwords or jargon
- ❌ Vague examples or abstract claims
- ❌ Performance language
- ❌ Wouldn't publish this quality now

**Update if:**
- ⚠️ Minor tone issues fixable with edits
- ⚠️ Examples can be made more concrete
- ⚠️ Structure can be simplified

### 4. Interview-Ready?

**Question:** Would I confidently reference this in a job interview today?

**Keep if:**
- ✅ Comfortable discussing in depth
- ✅ Have concrete examples ready
- ✅ Can defend reasoning and decisions
- ✅ Represents current thinking

**Archive if:**
- ❌ Embarrassed by claims or tone
- ❌ Would avoid bringing this up
- ❌ Can't defend reasoning anymore
- ❌ Examples are outdated or unavailable

**Update if:**
- ⚠️ Would discuss but with caveats
- ⚠️ Core is sound but needs perspective note
- ⚠️ Can strengthen examples

### 5. Trust Direction?

**Question:** Does this increase or decrease employer trust in my judgment?

**Keep if:**
- ✅ Clearly increases trust
- ✅ Shows capability and judgment
- ✅ Demonstrates learning and growth
- ✅ Honest and grounded

**Archive if:**
- ❌ Might decrease trust
- ❌ Raises questions about judgment
- ❌ Performance or overselling
- ❌ Neutral (doesn't add value)

**Update if:**
- ⚠️ Can shift from neutral to trust-building
- ⚠️ Minor issues obscuring good thinking
- ⚠️ Can add honesty or caveats to strengthen

---

## Decision Framework

### Keep Published (No Changes)

**When:**
- Passes all 5 criteria (representative, adds signal, quality bar met, interview-ready, increases trust)
- Still demonstrates clear thinking
- Complements collection well

**Action:**
- No changes needed
- Leave published
- May feature if among strongest

### Update & Republish

**When:**
- Core insight is sound but details need revision
- Can add perspective from additional experience
- Minor tone or clarity issues are fixable
- Would strengthen with concrete examples or caveats

**Action:**
- Revise essay with improvements
- Add "Updated: [Date]" note at top
- Brief note explaining what changed (optional)
- Re-run validation process
- Republish

**Example update note:**
```
**Updated:** January 2026

Added perspective from 2 additional years of teaching experience
and clarified when this framework doesn't apply.
```

### Archive (Unpublish)

**When:**
- No longer representative of thinking
- Weakens overall collection
- Fails quality bar
- Wouldn't reference in interview
- Decreases or neutral on trust

**Action:**
- Set `published: false` in database
- Keep in archive (don't delete)
- Document why archived for future reference
- Consider if insights can be incorporated into new essay

**Don't delete - archive instead.**

### Replace with New Essay

**When:**
- Understanding has evolved significantly
- Can write much better essay on same topic
- Old essay is outdated but topic still important

**Action:**
- Write new essay from scratch
- Archive old essay
- Cross-reference in new essay if helpful
- New essay should pass all validation

---

## Maximum Number of Published Essays

### No Hard Limit, But...

**Guideline: 5-15 essays is often ideal**

**Why this range works:**
- 5-10 essays: Enough to show breadth and depth
- 10-15 essays: Comprehensive without dilution
- 15+ essays: Risk of redundancy and signal dilution

### Quality Over Quantity

**If you have 20 essays:**
- Are all 20 demonstrating distinct thinking?
- Could the collection be stronger with 12-15 best essays?
- Is there redundancy that could be consolidated?

**Remember:** 8 exceptional essays beat 20 good essays.

### When to Consider Archiving

**If collection exceeds 15 essays, review for:**
- Redundant essays covering same insight
- Older essays superseded by better ones
- Essays that no longer meet quality bar
- Essays that weaken the overall narrative

---

## Featured Essays

**Purpose:** Highlight 1-3 strongest essays that best demonstrate your thinking

**Selection criteria:**
- Best exemplars of clear, independent thinking
- Most interview-ready
- Strongest signal about judgment quality
- Represent different aspects of your thinking

### How to Choose Featured Essays

**Review all essays and ask:**
1. Which 3 would I most want an employer to read first?
2. Which best demonstrate how I think?
3. Which am I most confident discussing in interviews?
4. Which show different facets of my capabilities?

**Featured essays should:**
- Be your strongest work
- Represent different themes (not all on same topic)
- Complement each other (together paint full picture)
- Meet highest quality bar

**Mark in database:** `featured: true`

---

## Consolidation Strategy

### When to Consolidate Multiple Essays

**Consider consolidation when:**
- 2-3 essays cover related insights
- Redundancy weakens collection
- Combined essay would be stronger
- Individual essays are each 500-800 words (can merge into 1200-1500)

### How to Consolidate

1. **Identify related essays**
   - Same theme or topic
   - Complementary insights
   - Could form single coherent narrative

2. **Draft consolidated essay**
   - Combine insights into single piece
   - Remove redundancy
   - Ensure clear structure
   - May be longer but more comprehensive

3. **Validate new essay**
   - Run through full validation process
   - Should be stronger than individual essays
   - Must pass all quality checks

4. **Archive originals**
   - Set originals to `published: false`
   - Publish new consolidated essay
   - No need to mention consolidation

### When Not to Consolidate

**Don't consolidate if:**
- Essays cover distinct insights
- Each stands alone well
- Combination would be too long (>2000 words)
- Individual essays are already strong

---

## Signal Density Measurement

### What Is Signal Density?

**Signal density = proportion of essays that demonstrate clear, independent thinking**

**High signal density:**
- Most/all essays pass validation
- Each essay adds distinct value
- Collection demonstrates consistent judgment
- Employers clearly understand your thinking

**Low signal density:**
- Many essays are generic or performative
- Redundancy dilutes impact
- Quality is inconsistent
- Unclear what you're good at

### Improving Signal Density

**Two strategies:**

**1. Add stronger essays**
- Write better, more grounded essays
- Focus on unique insights
- Ensure each adds distinct signal

**2. Remove weaker essays**
- Archive essays that don't meet bar
- Consolidate redundant essays
- Feature strongest work

**Both strategies can work, but strategy 2 (removing weaker essays) often has bigger immediate impact.**

---

## Archive Management

### Why Archive Instead of Delete?

**Keep archived essays because:**
- Historical record of thinking evolution
- May become relevant again
- Can mine insights for future essays
- Learning archive for self-reflection

### Archive Structure

**Store in database with:**
- `published: false`
- `status: "archived"`
- Optional `archiveReason` field
- Original content and metadata preserved

### Archive Reasons (Optional Documentation)

**Common reasons:**
- "Superseded by [new essay slug]"
- "No longer representative of current thinking"
- "Failed quality bar on annual review"
- "Consolidated into [new essay slug]"
- "Redundant with [essay slug]"

### Accessing Archives

**Archives should:**
- Not be publicly visible
- Be accessible to you for review
- Preserve original content
- Include archive date and reason

---

## Annual Review Checklist

Use this checklist for yearly review:

### Preparation
- [ ] **Block 2-4 hours for focused review**
- [ ] **Read all published essays fresh**
- [ ] **Have decision framework ready**

### For Each Essay
- [ ] **Still representative of thinking?**
  - Yes: Keep
  - Mostly: Consider update
  - No: Archive

- [ ] **Still adds signal?**
  - Yes: Keep
  - Can improve: Consider update
  - No: Archive

- [ ] **Meets quality bar?**
  - Yes: Keep
  - Fixable issues: Update
  - No: Archive

- [ ] **Interview-ready?**
  - Yes: Keep
  - With caveats: Update
  - No: Archive

- [ ] **Increases trust?**
  - Yes: Keep
  - Neutral: Consider archive
  - Decreases: Archive

### Collection Analysis
- [ ] **Total published: ___ essays**
  - Ideal range: 5-15
  - If >15: Consider consolidation

- [ ] **Signal density high?**
  - All essays pass criteria: ✅
  - Some weak essays: Archive them
  - Lots of redundancy: Consolidate

- [ ] **Featured essays selected?**
  - 1-3 strongest highlighted
  - Represent different themes
  - Most interview-ready

### Actions
- [ ] **Archive decisions:**
  - List essays to archive
  - Document reasons
  - Update database

- [ ] **Update decisions:**
  - List essays to update
  - Plan revisions
  - Schedule updates

- [ ] **Consolidation decisions:**
  - Identify candidates
  - Plan consolidated essays
  - Schedule writing

- [ ] **Featured essays:**
  - Select 1-3 to feature
  - Update featured flags
  - Verify strength

---

## Examples

### Example 1: Essay That Should Be Archived

**Essay:** "10 Tips for Better Teaching"

**Review findings:**
- ❌ Generic listicle format
- ❌ No concrete examples from experience
- ❌ Reads like content marketing, not thinking demonstration
- ❌ Wouldn't reference in interview
- ❌ Weakens overall collection

**Decision:** Archive
**Reason:** "Failed quality bar - generic content that doesn't demonstrate reasoning"

### Example 2: Essay That Should Be Updated

**Essay:** "Building MarkPoint's Feedback System" (from 2023)

**Review findings:**
- ✅ Core insights still sound
- ⚠️ System has evolved significantly
- ⚠️ Can add 2 years of additional learning
- ✅ Still interview-ready with updates

**Decision:** Update
**Changes:** Add section on what changed after 2 years, update metrics, add new caveats about scale
**Note:** "Updated January 2026: Added perspective from 2 additional years operating the system"

### Example 3: Essays That Should Be Consolidated

**Essay 1:** "Why Speed Matters in Feedback" (600 words)
**Essay 2:** "The Comprehensiveness Trap" (700 words)

**Review findings:**
- Both cover speed vs. depth tradeoff
- Complementary insights
- Redundancy between essays
- Combined would be stronger

**Decision:** Consolidate
**New essay:** "Feedback Speed vs. Depth: Choosing Your Tradeoff" (1200 words)
**Action:** Archive both originals, publish consolidated essay

### Example 4: Essay That Should Stay Published

**Essay:** "Teaching Frameworks Over Content: A Post-Mortem"

**Review findings:**
- ✅ Still representative of thinking
- ✅ Unique insight, not redundant
- ✅ Meets quality bar
- ✅ Confidently interview-ready
- ✅ Demonstrates clear judgment

**Decision:** Keep published
**Additional:** Consider for featured essay list

---

## Common Mistakes

### Mistake 1: Never Archiving Anything

**Problem:** Collection grows but quality dilutes

**Why it's wrong:**
- Old essays may no longer represent thinking
- Weak essays reduce signal density
- Quantity doesn't equal quality

**Fix:** Annual review and archive weak/outdated essays

### Mistake 2: Deleting Instead of Archiving

**Problem:** Lose historical record

**Why it's wrong:**
- Can't review evolution of thinking
- May delete insights worth revisiting
- No record of what was tried

**Fix:** Archive (set published: false) instead of delete

### Mistake 3: Keeping Too Many Featured Essays

**Problem:** Dilutes "featured" meaning

**Why it's wrong:**
- If 10 essays are featured, none truly stand out
- Defeats purpose of highlighting best work
- Confuses rather than guides readers

**Fix:** Limit to 1-3 truly exceptional essays

### Mistake 4: Not Updating Date on Updates

**Problem:** Readers don't know essay was revised

**Why it's wrong:**
- Lack of transparency
- Can't track evolution
- Updates may seem like stealth edits

**Fix:** Add "Updated: [Date]" note at top with brief explanation

### Mistake 5: Avoiding Tough Archive Decisions

**Problem:** "I worked hard on this, so it stays published"

**Why it's wrong:**
- Effort doesn't equal quality
- Weak essays hurt collection
- Sunk cost fallacy

**Fix:** Be ruthless about quality. Archive anything that doesn't meet current bar.

---

## Summary

**Curation governance:**
- Annual review of all published essays
- Keep only essays that pass all 5 criteria
- Update essays that can be strengthened
- Archive essays that no longer represent thinking
- Aim for 5-15 published essays
- Feature 1-3 strongest essays
- Archive (don't delete) for historical record
- Signal density should improve over time

**Remember:**
The goal is not to accumulate essays—it's to maintain a curated collection that demonstrates judgment. Quality over quantity. Signal over noise. Always.

---

**Last Updated:** 2026-01-04
**Maintained By:** Nathanael
