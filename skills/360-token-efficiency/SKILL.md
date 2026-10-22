---
name: 360-token-efficiency
description: Reduce avoidable token cost on any agent host by probing its real capabilities and applying cache-, turn- and output-aware techniques with verified handovers. Use as an optional, session-approved companion when token cost or context growth matters, with strict preservation of task requirements by default.
version: 2.2.0
---

# 360 Token Efficiency

## Purpose

Reduce avoidable token cost during the main task on whatever agent runs it, using only capabilities the host actually exposes. Preserve task requirements and verification; strict mode forbids intentional accuracy sacrifice but cannot guarantee error-free outcomes.

## When to Use

- Multi-step or tool-heavy tasks with growing context, repeated retrieval, or long waits
- A user explicitly invokes this companion, or approves a sibling's session offer
- Not for creating plans (`360-blueprint`), executing the task itself (`360-execute`), or optimizing application performance (`360-optimize`)

## Core Principle

Remove redundant work, not required evidence. Agent cost is dominated by re-sent history, output tokens and cache misses, so cut those first; judge preservation against observable acceptance checks, and claim savings only from actual measurements.

## Workflow

### 1. Respect Session Consent

Explicit user invocation counts as approval for this session. Otherwise reuse the session's explicit approval or refusal; merely appearing in a generated plan is not approval. If unknown and not already offered, ask once and continue the main task with the overlay inactive while unanswered. Refusal or revocation disables the overlay immediately without disabling ordinary efficient habits. A new session starts unknown; a verified continuation in the same session preserves the decision. Do not infer consent from an old artifact or cross-session memory.

Discover and load through the host's supported skill mechanism only after approval; reuse already-loaded instructions. If unavailable, explain briefly and continue the main task without installing anything. Never invoke this skill recursively or restart the parent skill. Session consent does not authorize cross-session memory writes, configuration changes, or edits to installed skills.

### 2. Coexist With the Parent Skill

The overlay tunes how work is done; the parent skill and the user decide what is done.

- The parent's acceptance checks, deliverable format, and the user's explicit choices win: output or display modes, delegation answers, review depth, research budgets. Apply techniques within them. If a choice is costly, state the trade-off once in one line; never override it or ask again
- When the parent delegates by design, such as a background executor that keeps the screen clean, do not undo it. Pass the overlay's consent state in each delegated brief so the rules apply inside every agent
- Mode words such as `quiet` or `lean` belong to the skill that defined them; never reinterpret another skill's modes
- The parent owns questions, briefings and the completion prompt. The overlay adds no prompt, report or status line of its own unless asked
- The overlay's no-configuration rule limits the overlay's own techniques. It does not block an action the parent separately asked the user to approve

### 3. Build the Session Cost Profile

Probe once, briefly and in-session, from exposed tools, commands, instructions and observed behavior. Never infer a capability from the agent's brand or model name: the same host can expose different tools per model or plan. Unknown capabilities stay unavailable until established.

| Capability | Use when established | Fallback |
|---|---|---|
| Search and line-range reads | Locate first, then read only needed spans with source locations | Read supplied inputs; request only material a decision needs |
| Large-output handling | When the host saves big output to a file with a preview, search that file instead of re-running | Filter at the source and bound output |
| Deferred tool discovery | Load tools on demand | Use the exposed set; do not add tools mid-task |
| Code execution | Filter and aggregate large results before they reach context | Request bounded results or process chunks |
| Prompt caching | Keep the prefix stable and work within its lifetime | Assume a short lifetime; still avoid prefix changes |
| Subagents | Only per Step 4, with the actual model confirmed in telemetry | Work locally |
| Native todo or plan tool | Track tasks there | A short checklist in a file, never re-pasted into chat |
| Recoverable artifacts | Keep state and evidence references in authorized files | Keep required state in-session; do not claim persistence |
| Context management | Compact at natural breaks with a verified handover | Keep a state summary; never automatically clear history |
| Usage telemetry | Record comparable usage from the host's usage command or headless JSON | Label savings `UNMEASURED` |

Read [host adaptation](references/host-adaptation.md) only when a host-specific control, limit or telemetry source matters. Read [evidence and techniques](references/evidence-and-techniques.md) only when choosing caching, compression, delegation or measurement techniques, or when the user asks for evidence. Do not modify the agent's configuration or installed skills to adapt them.

### 4. Apply Cost Rules in Order of Leverage

Each agent turn re-sends the whole history, cheaply when cached and at full price when not; output tokens cost several times input. Apply these in order and stop where the task's needs begin:

1. Keep the prefix stable. Do not switch model, reasoning effort, fast modes, tool sets or connected servers mid-task, and never edit earlier context; append instead. Recommend such switches to the user only at task boundaries
2. Work within the cache lifetime. Avoid idle gaps longer than the host's cache lifetime, which is often minutes and should be treated as short when unknown. When waits are unavoidable, wake less often with more batched work: one cold resume beats several
3. Spend output sparingly. Use targeted edits instead of whole-file rewrites; never restate inputs, echo tool output, or narrate between tool calls; keep chat to decisions and results
4. Use fewer turns. Batch independent reads, searches and checks into one turn; prefer one script over many small calls for multi-step mechanical work
5. Shape tool output at the source. Use filters, failure-only test output, quiet flags and counts, keeping the full output recoverable in a file or log. A filtered result is not proof of completeness: check counts, truncation and pagination
6. Retrieve just in time. Search first, read narrow ranges, reuse what is already in context, and reread only after a change or new uncertainty
7. Default to one agent. A subagent pays its own fixed start-up context and does not share the parent's cache. Delegate only to isolate large, noisy work behind a short summary, to run truly parallel work, or because the parent requires it. Count parent and worker usage, retries and coordination
8. Use lighter models only for routine delegated work, only where the host honors the model choice, and verify the actual model in telemetry. Lighter models may skip long instructions, so give them short, fixed briefs and verify their output
9. Compact rarely. Compaction is itself a full-context request and resets the cache. Compact at natural breaks with a focus hint, do not pre-empt the host's automatic threshold, and prefer a fresh session with a verified handover for unrelated work

Fully read mandatory instructions and required task inputs; progressive retrieval must not bypass them. Keep source paths, ranges, IDs, versions or timestamps needed to reopen evidence. Reopen stale, conflicting or insufficient evidence before deciding.

### 5. Preserve State Through Continuation

Before supported compaction or handoff, verify this summary against the task, source evidence, and ledger:

> Context · Decisions · State (done / pending / blocked) · Remaining tasks (what, how, where) · Verification · Risks and how to detect them early

Include constraints, exact values and units, citations and evidence references, user decisions and authorization boundaries, session consent or revocation and whether an unanswered offer was already made, unresolved uncertainty, acceptance criteria, and the next action. Preserve stable task IDs if present. Do not replace source evidence with a summary that cannot support the next decision; reopen the original when needed. Never automatically clear history. If a handover cannot retain or recover required detail, keep fuller context and disclose the continuity limit.

### 6. Enforce Strict Preservation

Never weaken requirements, exact values, citations, uncertainty, acceptance criteria, or required verification to save tokens. Keep the main task's quality bar and requested output format. Prefer files when supported; honor explicit user delivery requests, and provide complete in-session output labeled `in-session only; not persisted` when files are unavailable.

Potentially lossy techniques such as learned prompt compression or clearing old tool results require separate approval of the specific technique, task-specific quality metric, and tolerance before use. General session consent is insufficient. Even an approved experiment cannot silently weaken the main task's acceptance criteria; a failed comparison restores the fuller context or ordinary workflow. Missing information, conflicting evidence, or verification failure also triggers restoration and rechecking of affected decisions.

### 7. Measure Without Inventing Savings

No extra report by default. Never invent token counts or an unrun baseline. Distinguish measured input, output, cache-read and cache-write tokens, reasoning tokens, cost, and latency from estimates. Caching reduces processing cost without reducing context presented to the model.

For a comparison, use the same task inputs and acceptance criteria, record host, model, effort and run conditions, and include loading, summarization, tool discovery, retries, and delegation overhead. Run more than once and report the spread. Report quality regressions and unavailable metrics. Reserve “validated savings” for actual comparable measurements with passing task checks; a finite test set does not establish universal accuracy. Unmeasured guidance is allowed when clearly labeled. Do not persist learned rules or memory unless separately authorized.

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

1. Host cost profile: capabilities established, unavailable, or unknown
2. Techniques applied, and context reused, omitted, or compacted, with recoverable evidence locations
3. Preservation checks, acceptance results, and any observed regressions
4. Restorations or escalations and their reasons
5. Measurements: baseline and overlay, input, output, cache-read, cache-write and reasoning tokens, cost, latency, overhead, run count and spread; use `UNMEASURED` for unavailable metrics and label estimates
6. Limitations and residual uncertainty

Use the six canonical handover fields above when a continuation is needed.

## Quality Gate

Check every applicable item; record a concrete limitation if one cannot be checked:

- Session approval is explicit, current, and honored after refusal or revocation
- The parent skill's acceptance checks, format and the user's explicit choices were kept; any costly choice got at most one trade-off note and was not overridden
- The cost profile came from probing exposed capabilities, not brand or model names; unknown capabilities were treated as unavailable
- Techniques use only established, permitted capabilities; no model, effort, tool-set or configuration change was made mid-task by the overlay
- Required inputs, constraints, exact values, citations, uncertainty, and acceptance criteria were preserved against source evidence
- Pagination, truncation and filtered output were checked wherever completeness mattered
- Reused evidence is sufficiently current for the decision
- Delegation, when used, had a stated reason from Step 4, and its overhead was counted
- The handover retains required state and recoverable evidence; no automatic history clearing occurred
- Required task verification ran, or is explicitly unresolved; failed checks triggered restoration
- Any potentially lossy method had separate technique, metric, and tolerance approval
- Delivery matches the user's request and honestly states persistence
- Measurement claims have real evidence and include available overhead; absent telemetry is `UNMEASURED`
- Completion includes the interactive next-action offer with a recommendation, stop choice, and custom-note option, or the explicit-instruction/parent-owned exception; unanswered suggestions do not block the completed deliverable

An unresolved check is a limitation or blocker, never proof of equivalent accuracy to a run that did not happen.
