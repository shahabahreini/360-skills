---
name: 360-token-efficiency
description: Reduce avoidable context and tool-output overhead with capability-aware retrieval, reuse, and verified handovers. Use as an optional, session-approved companion when token cost or context growth matters, with strict preservation of task requirements by default.
version: 2.1.0
---

# 360 Token Efficiency

## Purpose

Reduce avoidable overhead during the main task using capabilities the host actually exposes. Preserve task requirements and verification; strict mode forbids intentional accuracy sacrifice but cannot guarantee error-free outcomes.

## When to Use

- Multi-step or tool-heavy tasks with growing context or repeated retrieval
- A user explicitly invokes this companion, or approves a sibling's session offer
- Not for creating plans (`360-blueprint`), executing the task itself (`360-execute`), or optimizing application performance (`360-optimize`)

## Core Principle

Remove redundant work, not required evidence. Judge preservation against observable acceptance checks, and claim savings only from actual measurements.

## Workflow

### 1. Respect Session Consent

Explicit user invocation counts as approval for this session. Otherwise reuse the session's explicit approval or refusal; merely appearing in a generated plan is not approval. If unknown and not already offered, ask once and continue the main task with the overlay inactive while unanswered. Refusal or revocation disables the overlay immediately without disabling ordinary efficient habits. A new session starts unknown; a verified continuation in the same session preserves the decision. Do not infer consent from an old artifact or cross-session memory.

Discover and load through the host's supported skill mechanism only after approval; reuse already-loaded instructions. If unavailable, explain briefly and continue the main task without installing anything. Never invoke this skill recursively or restart the parent skill. Session consent does not authorize cross-session memory writes, configuration changes, or edits to installed skills.

### 2. Assess Available Capabilities

Make a brief internal, in-session assessment from exposed tools, instructions, and observed behavior. Unknown capabilities remain unavailable until established; do not infer them from the agent's brand.

| Capability | Use when established | Fallback |
|---|---|---|
| Search and selective reads | Locate evidence, then retrieve relevant spans with source locations | Read supplied inputs; request only missing material needed for a decision |
| Tool discovery | Discover needed tools on demand | Use the exposed tool set |
| Code execution | Filter and aggregate large results before returning them to model context | Request bounded results or process manageable chunks |
| Recoverable artifacts | Keep task state and evidence references in authorized files or artifacts | Keep the complete required state in-session; do not claim persistence |
| Context management | Use supported compaction with a verified handover | Keep a state summary; never automatically clear history |
| Caching controls | Use exposed controls when appropriate and authorized | Make no claim of cache control or savings |
| Delegation | Delegate only when permitted and the independent work justifies coordination | Work locally |
| Usage telemetry | Record comparable observed usage | Label savings `UNMEASURED` |

Do not modify the agent's configuration or installed skill to adapt it. Read [evidence and optional techniques](references/evidence-and-techniques.md) only when choosing caching, compression, delegation, or measurement techniques, or when the user asks for supporting evidence.

### 3. Retrieve and Reuse Carefully

- Fully read mandatory instructions and required task inputs. Progressive retrieval must not bypass them.
- Search progressively for additional evidence. Keep source paths, ranges, IDs, versions or timestamps needed to reopen it.
- Filter or aggregate large tool results before returning them to context when supported. Check pagination, truncation, counts, and omitted boundaries; a partial result cannot establish completeness.
- Reuse verified facts while checking whether their sources changed. Reopen stale, conflicting, or insufficient evidence before deciding.
- Avoid repeated explanations, whole-artifact regeneration for local edits, and redundant verification. Repeat checks after relevant changes, failures, or new uncertainty.
- Delegation must respect host permissions; account for duplicated instructions, worker context, tool use, retries, and coordination in its cost.

### 4. Preserve State Through Continuation

Before supported compaction or handoff, verify this summary against the task, source evidence, and ledger:

> Context · Decisions · State (done / pending / blocked) · Remaining tasks (what, how, where) · Verification · Risks and how to detect them early

Include constraints, exact values and units, citations and evidence references, user decisions and authorization boundaries, session consent or revocation and whether an unanswered offer was already made, unresolved uncertainty, acceptance criteria, and the next action. Preserve stable task IDs if present. Do not replace source evidence with a summary that cannot support the next decision; reopen the original when needed. Never automatically clear history. If a handover cannot retain or recover required detail, keep fuller context and disclose the continuity limit.

### 5. Enforce Strict Preservation

Never weaken requirements, exact values, citations, uncertainty, acceptance criteria, or required verification to save tokens. Keep the main task's quality bar and requested output format. Prefer files when supported; honor explicit user delivery requests, and provide complete in-session output labeled `in-session only; not persisted` when files are unavailable.

Potentially lossy techniques such as learned prompt compression require separate approval of the specific technique, task-specific quality metric, and tolerance before use. General session consent is insufficient. Even an approved experiment cannot silently weaken the main task's acceptance criteria; a failed comparison restores the fuller context or ordinary workflow. Missing information, conflicting evidence, or verification failure also triggers restoration and rechecking of affected decisions.

### 6. Measure Without Inventing Savings

No extra report by default. Never invent token counts or an unrun baseline. Distinguish measured input/output tokens, cached tokens, cost, latency, and estimates. Caching may reduce processing cost without reducing context presented to the model.

For a comparison, use the same task inputs and acceptance criteria, record host/model settings and run conditions, and include loading, summarization, tool discovery, retries, and delegation overhead. Report quality regressions and unavailable metrics. Reserve “validated savings” for actual comparable measurements with passing task checks; a finite test set does not establish universal accuracy. Unmeasured guidance is allowed when clearly labeled. Do not persist learned rules or memory unless separately authorized.

### Completion: Choose the Next Action

- Finish and verify the current deliverable first; make the result and its location available before asking about follow-on work. Keep artifact readiness separate from the next-action choice: an unanswered suggestion does not reopen completed work, and a blocked job is not complete
- Check the result, current project stage, remaining risks, and prior user instructions. Recommend the next useful action from the local routing guidance below; skip irrelevant stages and prefer stopping when no useful work remains
- Use an available interactive question tool to offer one concise next-action choice. Put the best recommendation first, explain why it fits this result, and include a stop/pause choice. Always allow a free-text note or custom direction, including work outside the 360 flow; never force the user into a sibling skill
- If interactive tools are unavailable, offer equivalent numbered choices with the recommendation, rationale, and explicit custom-note option in chat. This completion prompt is separate from the deliverable briefing; skill names are allowed here, and it is not a passive list of unresolved task questions
- Reuse an already explicit next-step instruction instead of asking again; continue work it authorizes. Otherwise wait for the user's choice before starting follow-on work. Silence, a preselected recommendation, and elapsed time are not authorization. An explicit stop or request for no suggestions suppresses the prompt
- When the user chooses, follow that direction and clarify only missing information needed for it. Discover and load a selected skill through the host's supported mechanism; do not assume it is installed or install it automatically. If unavailable, explain and offer an equivalent action. Carry forward artifact paths, decisions, verification, remaining risks, and session consent without restarting intake

Local routing: While accompanying another skill, let the parent own the single completion prompt; do not issue a duplicate or interrupt its work. For a standalone efficiency task, recommend resuming the main task or addressing an evidenced remaining issue, and allow stopping. Never recommend invoking this overlay recursively.

## Output Format

Default: complete the main task in its requested format, with no efficiency report.

When requested, report:

1. Capabilities used and techniques applied
2. Context reused, omitted, or compacted, with recoverable evidence locations
3. Preservation checks, acceptance results, and any observed regressions
4. Restorations or escalations and their reasons
5. Measurements: baseline and overlay, input/output tokens, cached tokens, cost, latency, overhead; use `UNMEASURED` for unavailable metrics and label estimates
6. Limitations and residual uncertainty

Use the six canonical handover fields above when a continuation is needed.

## Quality Gate

- Completion includes the interactive next-action offer with a recommendation, stop choice, and custom-note option, or the explicit-instruction/parent-owned exception; unanswered suggestions do not block the completed deliverable

Check every applicable item; record a concrete limitation if one cannot be checked:

- Session approval is explicit, current, and honored after refusal or revocation
- Techniques use only established, permitted capabilities
- Required inputs, constraints, exact values, citations, uncertainty, and acceptance criteria were preserved against source evidence
- Pagination and truncation were checked wherever completeness mattered
- Reused evidence is sufficiently current for the decision
- The handover retains required state and recoverable evidence; no automatic history clearing occurred
- Required task verification ran, or is explicitly unresolved; failed checks triggered restoration
- Any potentially lossy method had separate technique, metric, and tolerance approval
- Delivery matches the user's request and honestly states persistence
- Measurement claims have real evidence and include available overhead; absent telemetry is `UNMEASURED`

An unresolved check is a limitation or blocker, never proof of equivalent accuracy to a run that did not happen.
