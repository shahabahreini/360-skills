---
name: 360-token-efficiency
description: Runtime skill that minimizes token consumption during any AI-agent task without degrading output quality. Applies context triage, difficulty-aware effort sizing, progressive disclosure, compaction, and output discipline, then distills what worked into a persistent, self-improving notes file. Use continuously, alongside any other skill.
version: 1.0.0
---

# 360 Token Efficiency

## Purpose

Run this skill **throughout execution** of any task — not before or after, but *during*. Its job: cut token consumption at every step (input, reasoning, output, tool calls) while keeping the outcome exactly as correct and complete as it would be without this skill.

This skill is technology- and model-agnostic. It governs how an agent selects, shapes, and reuses information, not any specific caching or infra system.

## When to Use

- Any multi-step, multi-turn, or tool-heavy agent task
- Long-running sessions where context keeps growing
- Repetitive task types where past work could be reused instead of re-derived
- Combine with any other skill (`360-blueprint`, `360-backend-audit`, etc.) — this skill runs underneath them, not instead of them

## Core Principle

Token efficiency is not brevity for its own sake — it is **maximum decision-relevant signal per token spent**. A shortcut that risks a wrong or incomplete outcome is not a saving; it is a hidden cost. Every technique here has one rule: **compress the container, never the content.**

## Workflow

### 1. Triage Context Before Sending

- Split everything the agent is about to send into **stable** (system instructions, tool definitions, fixed reference docs) and **dynamic** (current turn, live data, user's latest message)
- Place stable content first, dynamic content last, so caching layers can reuse the stable prefix — never reorder this per turn
- Never re-send static content in full if a summary or reference to it already exists in-session
- Drop information the current step does not need to decide or act; do not drop information later steps will need — verify against the task's declared scope first

### 2. Size Effort to Difficulty, Not Habit

- Before reasoning or calling a tool, classify the sub-task: trivial / moderate / hard
- Trivial: answer or act directly, minimal reasoning trace
- Moderate: brief structured reasoning, only the steps that change the outcome
- Hard: full reasoning depth, but still target the fewest words that fully justify the conclusion
- Never apply hard-task depth to a trivial task out of caution; never shortcut a hard task to save tokens — that is the one trade-off this skill forbids

### 3. Disclose Progressively

- Load tools, documentation, files, or past context only when the current step needs them, not preemptively "just in case"
- Fetch summaries or indexes first; fetch full content only for the specific section required
- When a large tool result returns, extract only the fields relevant to the current decision; discard the rest from active context, but note where the full result lives if it may be needed later

### 4. Compact Without Losing Facts

- At natural checkpoints (phase boundaries, long tool chains, growing conversation history), replace verbose completed work with a compact state summary
- A compaction is valid only if every fact still needed downstream survives in the summary — verify this explicitly before discarding the verbose version
- Never compact unverified or ambiguous information into a confident-sounding summary; carry the uncertainty forward instead of erasing it

### 5. Output With Discipline

- Default to the minimal structure that fully answers the request: tables over prose for comparisons, bullets over paragraphs for lists, direct answers over preambles
- Add verbosity only where it changes correctness or usability (e.g., a caveat that prevents misuse), never as padding, restatement, or unearned confidence
- Prefer structured formats (tables, key-value, code) over descriptive prose when the receiving agent or user only needs the data, not narration

### 6. Route and Escalate Deliberately

- If multiple approaches could solve a sub-task, prefer the lighter one (fewer tool calls, shorter reasoning, smaller context) whenever it is equally reliable
- Define an explicit escalation trigger: low confidence, contradictory evidence, or a failed lightweight attempt — escalate to deeper reasoning or more context only when triggered, not by default
- Every escalation must be traceable to a stated reason, so light-first is a decision, not a gamble

### 7. Distill and Self-Improve

- After completing a task, extract any reusable pattern: a shortcut that worked, a compaction rule that held up, a classification that predicted difficulty correctly
- Write it as one short, falsifiable rule to a persistent, versioned notes file (e.g. `TOKEN-NOTES.md`) in the project — append-only, deduplicated against existing rules
- A rule is only added if it was verified to save tokens **without** changing the outcome on this task; unverified guesses are never persisted
- Periodically prune contradicted or stale rules the same way — evidence in, evidence out

## Output Format

When applying this skill to a task, report:

1. **Triage summary**: what was cached/reused vs. freshly sent, and why
2. **Effort map**: which sub-tasks were trivial/moderate/hard, and the reasoning depth applied to each
3. **Compaction log**: what was compacted, and the fact-preservation check that validated it
4. **Escalations**: any lightweight attempt that failed and what triggered the deeper approach
5. **Distilled rules**: new entries added to the notes file, each with the evidence that justified it
6. **Net effect**: qualitative statement that outcome quality was unaffected, with any residual risk flagged explicitly

## Quality Gate

The application of this skill is complete only when every answer is yes:

- No fact needed for correctness was dropped, compacted away, or silently assumed
- Every effort-sizing decision matches the actual difficulty of the sub-task, not a shortcut taken out of habit
- Every escalation had a stated, evidence-based trigger
- Stable and dynamic content were never mixed in a way that breaks reuse
- Every new rule written to the notes file is verified, falsifiable, and non-duplicate
- The task's outcome is identical in correctness and completeness to what it would be without this skill
- If any trade-off between tokens and quality was unavoidable, it was flagged explicitly for the user to decide — never hidden inside a "saving"

Any "no" means the application is not finished. Refine and re-check.
