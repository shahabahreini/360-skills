---
name: 360-expert-review
description: Stress-test a draft plan, write the finalized executable plan back to the same file, and brief the user in chat. Use before executing any plan where a missed case could cause real damage.
version: 3.7.1
---

# 360 Expert Review

## Purpose

Expose concrete failure cases and weak assumptions in a draft plan, cut what the plan does not need, then revise it in place until applicable readiness checks pass or blockers are explicit. Show the user what was found, what was fixed, and what to expect.

## When to Use

- A plan changes real systems, data, users, money, security, or operations
- A wrong assumption or missed case could create real damage
- A plan needs adversarial review before execution
- Not for drafting plans from scratch (`360-blueprint`) or executing a finalized plan (`360-execute`)

## Core Principle

Try to disprove readiness with concrete failure cases, and fix each with the smallest change that works; a review that only adds is incomplete.

## Workflow

### Entry: Optional Token Efficiency

Reuse this session's approval or refusal of `360-token-efficiency`. If unknown and not yet offered, ask once, in the same question round as any other entry question, and keep the overlay off until answered. Explicit user invocation is approval; a plan that lists the skill is not. On approval, load it through the host's skill mechanism, reusing instructions already loaded; if unavailable, say so briefly and continue without installing it. Refusal turns the overlay off, not ordinary efficient work. Revocation takes effect immediately. Consent lasts this session only and never authorizes cross-session memory writes.

### Shared Plan Contract

Preserve stable task IDs and existing user decisions. Every task carries: ID, What, How, Where, Depends on, Skills (list or `None`), Parallel, Effort, Priority, Done when (observable). Use `Priority: must | should | could`, `Effort: S | M | L`, and `Parallel: yes | no`. Only `should` and `could` sit below the cut line. Preserve phase checkpoints, change policy, replanning triggers, and objective-to-task traceability.

Plan status: `Draft` → `Ready for review` → `Reviewed and ready to execute`. Open blocking questions keep a plan `Draft`; a complete unreviewed plan is `Ready for review`; only a passed review sets `Reviewed and ready to execute`, and material edits after it return the plan to `Ready for review` (or `Draft` if blocked). Execution progress lives in the ledger, not in this status. An explicit user instruction to execute a supplied plan authorizes execution without a sibling review; record that basis and never claim a review occurred.

### Delivery

Write the deliverable to a recoverable file when the host supports it, at the existing path or the default below. Honor explicit user output requests. Without files, deliver the same complete structure in chat labeled `in-session only; not persisted`, and never claim a file was saved. With a saved file, chat carries the Reader's Briefing and the path. In a non-interactive run where no one can answer, do not wait: record each open question, apply only reversible defaults, mark readiness honestly, and deliver.

Judge completion by observable acceptance checks. A structural or format check does not prove behavior or accuracy; state what was not verified.

### 1. Understand the Project First

- Inspect available instructions, plans, decisions, developer preference records (such as `faculty/` dossiers), relevant artifacts, recent changes, verification and any execution ledger. Establish the current stage and done/pending/blocked work; cite sources and distinguish observed facts from claims. Record unavailable evidence
- Reuse current evidence and user answers. Resolve discoverable facts by inspection; do not ask the user to rediscover them
- Separate remaining gaps: material user decisions change the outcome, scope, acceptance criteria, significant cost or irreversible effects; reversible implementation defaults stay within established intent and conventions. Choose supported defaults, record the reason and revisit condition, and proceed. Do not present a default or inference as a fact
- Ask only for unresolved material decisions, conflicting instructions, or inaccessible facts needed to judge success. Use the available interactive question tool in focused rounds of one to four questions, with the best supported recommendation, its trade-off, and a free-text/custom option. For missing facts, request the needed evidence without inventing it. If tools are unavailable, offer equivalent numbered choices and notes in chat
- Unanswered required questions block dependent planning and readiness, not independent inspection. Silence, a recommendation, a preselected option or elapsed time is not an answer. Honor explicit delegation or deferral within its limits
- After answers, update the existing context, assumptions or review sections and inspect newly relevant evidence. Stop questioning when material choices are settled; reopen only on new conflicting evidence
- Compare the supplied plan with current artifacts before judging it. Identify stale assumptions, duplicated completed work and conflicting decisions; preserve valid task IDs and progress records

### 2. Review Through Expert Lenses

Choose lenses from the plan's nature, reversibility and risks. If the plan or session carries faculty review angles, faculty blocks, or a `Tailored by` row, start from those and add any lens the risks still need. Typical lenses:

- Architecture: boundaries, simplicity, trade-offs
- Engineering: correctness, edge cases, integration, performance
- Product and UX: user value, friction, recovery, accessibility
- QA: scenario coverage, regressions, acceptance criteria
- Operations: deployment, observability, rollback
- Security and privacy: access, data exposure, abuse cases
- Domain: business rules, terminology, real-world accuracy

Apply each lens as a checklist of failure modes, not a persona. Record each applied lens with its findings, or "none" and why. Respect trade-offs the user already accepted; reopen one only with new evidence.

### 3. Check Relevant User Outcomes

- Trace the real need through normal use, likely failures and severe plausible failures
- Check empty, error, interrupted and recovery states where they affect this task
- Include affected user groups, accessibility and connectivity constraints when relevant; state inspection limits

### 4. Make Findings Actionable

- For each actionable finding, name its trigger, consequence, evidence or explicit hypothesis, and smallest correction or next check
- Verify version-specific or fast-moving claims (APIs, versions, standards, advisories) against the project and current primary sources when tools allow; otherwise treat them as hypotheses with the check needed
- Rank consequence separately from confidence. A plausible severe failure can justify investigation without being a proven defect
- Require work only when it protects a requirement or addresses a concrete material failure; speculative improvements remain optional
- Map only affected components, interfaces and state. Check retries, duplicates, concurrency, dependencies and rollback where those mechanisms exist

### 5. Check Reliability and Traceability

- Trace relevant requirements to implementation tasks and observable verification
- Add validation, failure handling, security, compatibility, monitoring and ownership only where a concrete risk demands them
- Prefer the simplest correction that protects the intended outcome; do not introduce operational machinery into an unrelated documentation task
- Run a lean audit. For each task ask: which objective fails if this is deleted? Can existing code or structure do it? Cut or merge every task that fails both
- Every fix that adds a file, dependency, layer, or setting cites the failure it prevents and is the smallest option that prevents it. Otherwise it stays optional
- Report cuts next to additions, and the footprint change against the draft

### 6. Define Proportionate Verification

- Match each acceptance check to the consequence it detects; "works correctly" is not observable
- Distinguish a reviewed plan from a verified implementation. A planned test has not run
- Mark irrelevant checks non-applicable with reasons. Missing evidence remains unknown; obtain it or disclose the resulting limitation/blocker

### 7. Attack the Plan

Switch to hostile critic. Ask:

- What is assumed but unproven?
- What is missing: a user, a state, a sequence, a permission, a failure mode?
- What is the most likely failure?
- What is the most damaging failure?
- Which step could be read two different ways?
- What cannot be detected, reproduced, or reversed?

Fix actionable findings and recheck affected risks. Stop when applicable checks pass and material blockers are resolved. An unavailable check stays unknown; if it prevents judging readiness, keep the plan non-final and name the missing evidence or decision. Otherwise disclose the limit without manufacturing required work. Use the clarification loop only for material user decisions; record routine defaults. Do not loop indefinitely.

### 8. Write the Final Plan

- Update the draft in place using the local minimum contract below. Preserve valid existing headings and structure; no sibling installation is required
- Preserve task IDs; add, split, or drop a task only with a stated reason
- Keep new work and updates to existing work in separate scope lists
- Put review findings, key decisions, and remaining risks in a short appendix in that same file
- Include the executor handover in the chosen delivery format
- If the file cannot be written, use the in-session delivery fallback
- Ensure required answers were resolved before final delivery. Keep unanswered blockers in `Draft`. Never end by dumping passive questions
- Print the Reader's Briefing in chat before any next-action question; when the host sends one message, the briefing comes first

### Completion: Choose the Next Action

- Deliver and verify the current result first, with its location. An unanswered suggestion never reopens finished work, and a blocked job is not complete
- Recommend one next action from the local routing below, based on the result, project stage, open risks and prior instructions. Skip stages that do not apply; recommend stopping when no useful work remains
- Ask with the host's interactive question tool, or with numbered choices in chat when there is none: the recommendation first with its reason, a stop option, and a free-text option for any direction, inside or outside the 360 skills. This prompt is separate from the briefing and is not a list of open task questions
- An explicit next-step instruction answers this prompt, and an explicit stop or request for no suggestions suppresses it. Otherwise wait for the user's choice; in a non-interactive run, state the recommendation and stop. Silence, a preselected recommendation, and elapsed time are not authorization. On a choice, clarify only what is missing, load a selected skill through the host's mechanism without installing it (offer an equivalent if it is unavailable), and carry forward paths, decisions, verification, risks and session consent

Local routing: Recommend `360-execute` for a finalized executable plan. For a blocked or incomplete review, offer resolution of the concrete blocker or `360-blueprint` for substantial replanning; do not present execution as ready.

## Output Format

### Work file

Preserve the existing plan and fill only missing contract elements. Minimum standalone shape:

1. Metadata: objective, status, version/date
2. Objective and observable definition of done, with expected results per phase
3. Context, constraints, scope, footprint, assumptions, open questions and decisions
4. Strategy, alternatives, change policy and cut line
5. Phases and tasks using the Shared Plan Contract, with checkpoints the user can see or run
6. Risks and countermeasures
7. Per-task and overall verification, replanning triggers and traceability
8. Handover: Context · Decisions · State (done / pending / blocked) · Remaining tasks (what, how, where) · Verification · Risks and how to detect them early
9. Review appendix: lenses applied, findings, decisions, remaining risks, applicable checks and blockers

Set `Reviewed and ready to execute` only when the applicable Quality Gate passes. Otherwise use `Draft` for blockers and `Ready for review` for incomplete review without blockers. Preserve user-approved trade-offs; record unresolved high-severity risks as blockers. A typical appendix (retain an existing heading when present):

```markdown
## 11. Review appendix
- Lenses applied and why:
- Findings:
- Decisions:
- Remaining risks:
- Cuts made and footprint change versus the draft:
- Applicable checks and evidence:
- Non-applicable checks and reasons:
- Blockers and resolution needed:
```

Do not replace the task list with a narrative plan.

### Reader's Briefing

Print this in chat. Follow the Delivery rules for file or in-session output.

```text
<plain title> — plan is final          (or: not final — <specific blocker>)
Full plan: <path>

In one sentence
<what will be done and why, 25 words or fewer>

What the review found and fixed
- <problem in plain words> — <proven|likely|possible|uncertain>. Fix: <fix>. You'll notice: <result>

What you'll get
- <new thing, as something you can see or use>

What changes in what you already have
- <thing> — now: <current>; after: <new>

What to expect when it's done
- <result you can check yourself, and how>

Size
- About <n> files touched (<n> new, <n> edited), <n> new dependencies. Versus the draft: <n> tasks cut, <n> added

Remaining risks
- <accepted risk> — <likely|possible|uncertain>. You'd notice it by: <sign>
```

Briefing rules:

- Write for a reader who has not seen the full artifact; define or drop any term of art
- One line per bullet, 20 words or fewer; the whole briefing fits one screen (about 25 lines)
- Outcomes and decisions, not mechanics: no task IDs, phases, priorities, status tables, executor notes or skill names
- Keep new things and changes to existing things in separate sections
- Confidence is proven (evidence in hand), likely (strong reason), possible (suspected), or uncertain (hypothesis). Never numbers; never proven without evidence
- The second line names the full artifact's path, or says `in-session only; not persisted`
- Omit empty sections unless this skill marks one as always present
- A new artifact goes under `What you'll get`; a change to an existing one goes under `What changes`, showing now and after
- `What to expect` is always present and observable: a command that runs, a screen that shows, a number that moves. "Works correctly" is not allowed
- No trailing question list. Required questions use the clarification loop before delivery
- Every finding pairs the problem, the fix, and the result the user will notice, and may use up to 30 words to fit them. A finding with no visible result says `no visible change; protects <what>`
- `Size` matches the plan's footprint line

## Quality Gate

The plan is final only when every applicable answer is yes (record a reason for each non-applicable item):

- Real user need understood and served
- Current project stage and completed work were inspected, or unavailable evidence was explicitly recorded
- Existing answers were reused; questions covered only unresolved material decisions, and silence or recommendations were not treated as consent
- Lenses were chosen from the plan's risks and any faculty review angles; each applied lens has findings or a stated reason for none
- Version-specific or fast-moving claims cite a current source or remain hypotheses with a named check
- Relevant requirements, likely failures and severe plausible failures were checked; inspection limits are explicit
- Every actionable finding has a trigger, consequence, evidence or hypothesis, and smallest correction; severity and confidence are separate
- Relevant requirements are traceable to tasks and observable verification; monitoring is included only where needed
- Material failure cases have proportionate tests and detection, diagnosis and recovery checks
- The design is clear, consistent, and as simple as possible
- The lean audit ran, cuts were reported next to additions, and no added work lacks a named failure it prevents
- Release and rollback checks address the plan's relevant failure cases
- The plan survived hostile review
- Material decisions were resolved through the clarification loop; defaults and unknown evidence are explicit, never silent passes
- Task IDs were preserved or changed with a stated reason
- New work and updates to existing work are grouped separately
- The finalized plan preserves its original location where supported, or follows the Delivery fallback
- Each finding in the briefing states problem, fix, and the result the user will notice
- The briefing follows the briefing rules
- The Reader's Briefing was printed in chat before any next-action question
- Completion offered one recommended next action with stop and free-text options, or followed an explicit instruction or the parent skill's prompt; an unanswered suggestion does not block the finished deliverable

Any unresolved "no" keeps the plan non-final. Fix actionable findings or report the blocker and the evidence or decision needed to resolve it.
