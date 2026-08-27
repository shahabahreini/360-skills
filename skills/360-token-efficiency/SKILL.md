---
name: 360-token-efficiency
description: Runtime skill that reduces token waste during AI-agent tasks without dropping facts, changing requirements, or weakening correctness. Use continuously alongside other skills when token cost matters.
version: 1.2.0
---

# 360 Token Efficiency

## Purpose

Run this skill during execution of a task, not as a separate report generator. Reduce token waste while preserving the same correctness, completeness, and usability the task would have without this skill.

Model- and platform-agnostic. Governs how the agent selects, reuses, compacts, and outputs information. Does not claim control over provider-side caching, billing internals, or hidden reasoning.

## When to Use

- Multi-step, multi-turn, or tool-heavy tasks
- Long sessions where context keeps growing
- Repetitive work where prior results can be reused safely
- As a companion to another skill, not a replacement for it

## Core Principle

Token efficiency is not brevity for its own sake. It is maximum decision-relevant signal per token spent. Compress the container, never the content. If a shortcut risks correctness, completeness, or traceability, do not take it.

## Workflow

### 1. Keep Only Decision-Relevant Context

- Separate what the current step needs from what it does not
- Reuse stable instructions, prior decisions, and verified facts already in the session
- Do not resend static material when a shorter reference is enough
- Do not drop information that later steps still need

### 2. Size Effort to Difficulty

- Classify each sub-task as trivial, moderate, or hard
- Trivial: act directly
- Moderate: reason only where it changes the outcome
- Hard: use full rigor, but no extra ceremony
- Never save tokens by under-thinking a hard problem

### 3. Load Progressively

- Pull only the file, section, tool, or context needed for the current step
- Prefer summaries or indexes first; open full content only when needed
- When a large result arrives, extract what matters and leave the rest behind

### 4. Compact Without Losing Facts

- At natural checkpoints, replace verbose history with a compact state summary
- Keep decisions, constraints, open questions, blockers, and unresolved risks
- If a fact is uncertain, carry the uncertainty forward. Do not compress it into false confidence

### 5. Output With Discipline

- Prefer the shortest structure that fully answers the task
- Use tables for comparisons, bullets for parallel facts, and direct prose for decisions
- Remove preamble, repetition, and restatement
- Add detail only when it changes correctness, usability, or handover quality
- When a sibling skill produces an artifact, write it to a file; chat carries only the briefing

### 6. Escalate Only on Trigger

- Prefer the lighter reliable path first
- Escalate only when confidence is low, evidence conflicts, or the lightweight path fails
- State the reason for escalation when it matters to the user or next agent

### 7. Persist Rules Only When Measured

- Do not write reusable token-saving rules unless a real measurement showed savings without quality loss
- If no token telemetry exists, mark the rule as unverified and keep it out of the notes file
- Never invent token counts

## Output Format

Default: no extra report.

Emit a token-efficiency report only when the user explicitly asks for one. When requested, include:

1. What context was reused or omitted
2. How effort was sized
3. What was compacted and what facts were preserved
4. Any escalations and why they happened
5. Any measured token deltas, or `UNMEASURED`
6. Any residual risk

## Quality Gate

The application of this skill is complete only when every answer is yes:

- No fact needed for correctness was dropped
- No uncertainty was compressed into false confidence
- Effort matched task difficulty
- Output was no more verbose than the task required
- Artifacts produced by sibling skills were not pasted into chat
- No unverified token-saving rule was persisted
- No token savings were claimed without measurement
- The outcome is at least as correct and complete as it would be without this skill

Any "no" means the application is not finished. Fix it and re-check.