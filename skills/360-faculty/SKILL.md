---
name: 360-faculty
description: Seat a living, tailored expert team on a plan or task. Use when work must fit this developer's goals, taste, mindset, and strategy, when a plan needs the right expertise chosen for its complexity, depth, and nature, or when a named faculty team must be created, called, or updated. Recommends a short list, asks only the questions that still change the work, polishes immediately, and keeps upgradable memory.
version: 1.3.0
---

# 360 Faculty

## Purpose

Use advisory expert lenses to tailor work to the developer’s goals, taste, mindset and strategy. Produce a fit assessment, roster, authorized memory and polished plan or concrete guidance, according to the selected mode.

## When to Use

- A plan or task needs experts fitted to this developer, not a generic panel
- The developer asks which expertise this work needs, and wants the best fit chosen from its complexity, depth, and nature
- A named faculty team must be created, called, or updated
- A project needs a house style before more planning
- The developer says "faculty this", "add experts", or "seat a team"
- A seated faculty must update its understanding and retouch the plan
- Not for writing the plan itself (`360-blueprint`), attacking a finished draft (`360-expert-review`), or building one (`360-execute`)

## Core Principle

Expert lenses improve decisions; evidence validates them.

## Workflow

### Entry: Optional Token Efficiency

Reuse explicit approval or refusal for `360-token-efficiency` from this session. If unknown and not already offered, ask once whether to enable it for this session; continue the main task with the overlay inactive while unanswered. Explicit user invocation counts as approval; merely appearing in a generated plan does not. On approval, discover and load it through the host's supported skill mechanism, reusing already-loaded instructions. If unavailable, explain briefly and continue; do not install automatically. Refusal disables the overlay, not ordinary efficient habits. Revocation takes effect immediately. Keep consent in-session only; it does not authorize cross-session memory writes. The overlay never invokes itself or restarts the parent skill.

### Shared Plan Contract

Preserve stable task IDs and existing user decisions. Every task carries: ID, What, How, Where, Depends on, Skills (list or `None`), Parallel, Effort, Priority, Done when (observable). Use `Priority: must | should | could`, `Effort: S | M | L`, and `Parallel: yes | no`. Only `should` and `could` sit below the cut line. Preserve phase checkpoints, change policy, replanning triggers, and objective-to-task traceability.

Plan status: `Draft` → `Ready for review` → `Reviewed and ready to execute`. Open blocking questions keep it `Draft`; a complete unreviewed plan is `Ready for review`; a passed review sets `Reviewed and ready to execute`. Material edits after review return it to `Ready for review` (or `Draft` if blocked). Execution progress belongs in the ledger, not the readiness status. An explicit user instruction to execute a supplied plan authorizes execution without a mandatory sibling review; record that basis without claiming a review occurred.

### Delivery

Prefer a recoverable file when supported, using the existing path or the default below. Honor explicit user output requests. If files are unavailable, deliver the same complete structure in-session and label it `in-session only; not persisted`; never claim a file was saved. With a saved file, chat normally carries a short briefing and its path. These delivery rules also apply to the templates and quality gate below.

Use observable preservation and acceptance checks. Structural validation cannot prove behavior or accuracy; evaluate realistic consent, capability, recovery, and handoff scenarios separately. Document unavailable telemetry and regressions; do not infer universal accuracy or token savings from finite tests.

### 0. Pick the Mode

Four entry points into one workflow. Choose from what the developer asked; clarify only if modes would materially differ in authorized work. In `suggest` mode, keep profile and fit notes in-session; do not edit the plan, dossiers or teams.

| Mode | Trigger | Does | Never does |
|---|---|---|---|
| `suggest` | "who should look at this", "which experts", "help me pick" | Steps 1–4, then stops with the fit assessment, short list, and rationale | Seat, ask past fit, or touch the plan |
| `seat` | "faculty this", "add experts", "seat a team" — the default | Steps 1–8: recommend, confirm, seat one at a time, polish after each | Batch the polish to the end |
| `team` | "save this as X", "call the X team", "add Y to X" | Step 7: create, call, or edit a named team | Skip the drift check |
| `quiet` | the developer replies `quiet` | Seats the confirmed set, asks blocking questions only, polishes from current evidence, records gaps as explicit assumptions | Block on equivalent reversible implementation choices |

### 1. Load What Exists

Read the current task or draft plan. Then read dossiers if present:

- `faculty/developer.md` — goals, taste, mindset, strategy, house style
- `faculty/roster.md` — who has been seated on this project, and when
- `faculty/teams.md` — named teams this developer created
- `faculty/<role>.md` — each faculty's claims about this developer and project; `<role>` is kebab-case

`faculty/` sits beside the plan file. If the plan is not on disk, put it at the project root. If files are unavailable, keep the same structure in-session and label it not persisted. Persist dossiers only within the user-authorized faculty scope; token-efficiency consent does not authorize memory writes.

If `faculty/developer.md` is missing or empty, do not seat yet. Measure first.

### 2. Measure the Developer

Ask at most 3 questions. Stop early if all four measures are already known. Each question must reveal at least one measure:

- Goals — what this project must become, and must never become
- Taste — what they find elegant, ugly, overbuilt, or cheap
- Mindset — how they decide, what they protect, how they take challenge
- Strategy — the live bet: speed, simplicity, control, craft, learning, or revenue

Prefer a forced choice over an essay. Never ask what the plan, repo, or dossiers already answer.

Record the developer profile in the authorized file or in-session structure before seating. Derive the house style from the answers:

- How to ask — choices vs open, blunt vs gentle
- Standing refusals — what this developer will not accept
- Push strength per area — where to spar, where to finish quietly
- Maturity map — which frames are already strong, which are still forming

House style is one shop. Every seated faculty wears it; none invents a private personality.

### 3. Assess the Fit

Read three dimensions off the plan, or off the stated task when no plan exists yet. Never skip this — it is what makes the short list defensible instead of habitual.

- **Nature** — what the work touches: user-facing, data, money, security and privacy, infrastructure, ML and agents, docs and content, org and process. Decides **which** lenses.
- **Depth** — blast radius and reversibility: reversible-local, reversible-shared, hard to reverse, irreversible or regulated. Decides **seat urgency**.
- **Complexity** — moving parts: task count, phase count, cross-system dependencies and unresolved assumptions. Helps size the distinct expertise needed.

Use these bands as guidance, not quotas. Each seat must add a distinct decision or failure check; combine overlapping lenses and use fewer seats when sufficient:

| Complexity | Depth | Seats |
|---|---|---|
| low | reversible | 1–2 |
| moderate | reversible | 2–3 |
| moderate | hard to reverse | 3–4 |
| high | any | 4–5 |
| any | irreversible or regulated | Consider 4–5; include the relevant security, privacy, compliance or reliability lens when its concrete risk demands it |

Five is the cap unless the developer asks for more. State the dimensions and chosen band, explaining distinct value and any reduction. A single seat may cover several related checks.

### 4. Recommend a Short List

Recommend only faculties that add distinct value to this task. Never dump the Seating Roster unless the developer asks for it.

| # | Faculty | Seat | Why now | If absent |
|---|---|---|---|---|
| 1 | <role> | must / should / could | <the task ID, assumption, or risk row that demands this lens> | <the concrete missed decision or failure check> |

- `must` — a concrete material failure requires this expertise
- `should` — silence creates likely waste or rework
- `could` — the developer may want this lens; their call

`Why now` cites a real element of the plan or task. A recommendation that cannot cite one is a habit, not a fit — drop it.

Choose expertise from actual failure modes and cite the relevant task or risk. Derive an unlisted role when needed. Read the optional [seating roster](references/seating-roster.md) only when expertise selection needs examples; do not load or scan the catalog by default.

Accept these replies: `accept`, `1-3`, `drop 4 add privacy`, `only architect`, `quiet`.

Do not seat until the developer confirms. If they name a faculty you did not recommend, seat it.

In `suggest` mode, stop here and deliver:

- **Asked before planning** — the fit assessment, the short list, and the house-style questions worth answering first. Then offer `360-blueprint`.
- **Asked before review** — a prioritized lens list for `360-expert-review`: which of its lenses this plan needs, in what order, plus any lens the plan needs that its seven do not name. Hand it over; do not run the review.

### 5. Seat One Faculty at a Time

For each confirmed faculty, in the listed order:

**Load.** Read `faculty/developer.md` and `faculty/<role>.md`.

**Ask.** Hard caps:

- New faculty on this project: at most 3 questions
- Returning faculty: at most 1, and only if this task contradicts or extends its memory
- Zero when memory plus the plan is enough
- `quiet` mode: zero unless the answer changes the intended outcome, scope, acceptance criteria, significant cost or irreversible effects

A question must do exactly one job: intention, taste, or a sharper frame offered as a choice. Never ask two questions that one answer would cover.

**Follow or raise.** Follow when the developer's cut matches their goals, their taste, and a professionally sound path. Raise only for a material decision supported by task evidence, such as:

- The frame is unfinished — they asked for a feature when they need a decision
- A better cut exists — same goal, cleaner seam, less future pain
- The thought can be shaped — they are close, but the frame is wrong

Raise in their language. Put two cuts side by side — theirs and the tailor's — and name what each protects. Then wait.

- They take the raise → polish to the tailor's cut; upgrade memory: this mind can be moved on this point
- They keep their cut → tailor that cut; record the accepted risk; do not fight it again without new evidence. `360-expert-review` may reopen it later with evidence — that is its job, not a contradiction of this one

**Polish now.** Edit only the steps, states, checks, and risks this faculty advises on. Regenerate the whole plan only if the faculty proved the objective itself wrong. If no plan exists, write concrete guidance within this faculty’s scope, then offer `360-blueprint`.

Hold the plan contract while polishing. `360-execute` reads these fields directly, and prose in their place breaks execution:

- Preserve every field of any task touched: ID, `Depends on`, `Skills`, `Parallel`, `Effort`, `Priority`, `Done when` — along with phase checkpoints, the change policy, the replanning triggers, and the traceability table
- A task a faculty adds gets a stable ID continuing that phase's numbering, `Effort: S | M | L`, `Priority: must | should | could`, `Parallel: yes | no`, a `Skills` list or `None`, and an observable `Done when`
- Never claim a review occurred. Preserve an unchanged reviewed plan's status; after material edits return it to `Ready for review`, or `Draft` if blocking questions remain

Write findings into the plan's existing semantic sections. The blueprint uses the numbers below; other valid plans may use different headings. Preserve an existing review appendix (normally section 11), without inventing sections 12–14:

- Accepted risks → section 7: record actual acceptance, countermeasure and operational owner (a real person/team, or explicitly unassigned). A faculty is only the advisory lens, never an operational owner
- Explicit assumptions → section 5: `Validated by` cites actual evidence and its boundary, or `Pending: <validation method>`. A seated role or its agreement cannot validate an inference
- Open questions → Context & Constraints; decisions → Handover Summary
- One header row so a fresh reader knows a faculty pass happened: `| Tailored by | faculty/roster.md @ <date> |`

**Resolve disagreements in the open.** Check conflicting advice against evidence and existing decisions. Resolve equivalent reversible details with a recorded reason; present material trade-offs needing user choice with what each protects.

**Remember.** Update dossiers (Step 6), show the faculty block (Output Format), then move to the next seat — or stop when the developer stops or the remaining faculties would not change the plan.

Block dependent planning only when a missing answer changes success, scope, acceptance criteria, significant cost, irreversible effects or authorization. Otherwise choose a supported reversible default, record its basis and revisit condition, and continue.

### 6. Upgrade Memory

Every claim keeps this shape:

| Claim | Source | Status | Touches |
|---|---|---|---|
| <one sentence> | user-said / inferred / observed | active / superseded / disputed | <plan sections this claim may change> |

Rules:

- New answer agrees → keep, refresh
- New answer sharpens → replace the claim; mark the old one superseded
- Keep provenance in Source: user statement or artifact reference, date/revision and observed boundary. Preserve the source kinds and status vocabulary above
- Explicit current user instructions override stale preferences; supersede the old claim with the current source without asking for redundant confirmation. Ask only when current instructions materially conflict or their intended scope is unclear
- Inferred never overwrites user-said or becomes validated through faculty agreement
- Stale or unused means freshness is uncertain, not disputed. Note the freshness limit in Source and recheck before reuse; reserve disputed for contradictory evidence, superseded for an actual replacement
- `faculty/developer.md` changes only when goals, taste, mindset, strategy, or a standing refusal changes
- `faculty/<role>.md` changes after every seating of that role
- `faculty/roster.md` records every seated role and its last seated date

Memory must stay short enough that a fresh agent can read it cold.

### 7. Create and Call Teams

A team is a named lineup this developer can reuse. Teams live in `faculty/teams.md` beside the dossiers:

```markdown
## Team: <name>
- For: <the kind of work this team is cut for>
- Members: <role>, <role>, <role>
- Created: <date> · Last called: <date>
- Notes: <what this team has learned about this kind of work>
```

- **Create** — `save this as <name>` turns the session's seated set into a team; `team create <name>: <roles>` builds one from scratch
- **Call** — `call <name>` loads the team and skips Step 4's recommendation, going straight to seating. Dossiers and every question cap still apply
- **Edit** — `team <name> add <role>` or `drop <role>`; record the change and its date

**Drift check, always.** After loading a team, still run Step 3 against the current plan. If the fit assessment surfaces a `must` seat the team lacks, name it in one line with its plan evidence and ask before seating. A stale team must never silently under-cover a new plan — the roster is a floor for teams too.

Keep every team short enough to read cold.

### 8. Close the Session

After the last seated faculty:

- Present the session report (Output Format)
- Use the requested handover format or the Delivery default. State whether dossiers and teams were persisted; ask about persistence only when required and not already authorized
- If the next agent would have to guess the house style, the roster, or any accepted risk, the handover is not finished

### Completion: Choose the Next Action

- Finish and verify the current deliverable first; make the result and its location available before asking about follow-on work. Keep artifact readiness separate from the next-action choice: an unanswered suggestion does not reopen completed work, and a blocked job is not complete
- Check the result, current project stage, remaining risks, and prior user instructions. Recommend the next useful action from the local routing guidance below; skip irrelevant stages and prefer stopping when no useful work remains
- Use an available interactive question tool to offer one concise next-action choice. Put the best recommendation first, explain why it fits this result, and include a stop/pause choice. Always allow a free-text note or custom direction, including work outside the 360 flow; never force the user into a sibling skill
- If interactive tools are unavailable, offer equivalent numbered choices with the recommendation, rationale, and explicit custom-note option in chat. This completion prompt is separate from the deliverable briefing; skill names are allowed here, and it is not a passive list of unresolved task questions
- Reuse an already explicit next-step instruction instead of asking again; continue work it authorizes. Otherwise wait for the user's choice before starting follow-on work. Silence, a preselected recommendation, and elapsed time are not authorization. An explicit stop or request for no suggestions suppresses the prompt
- When the user chooses, follow that direction and clarify only missing information needed for it. Discover and load a selected skill through the host's supported mechanism; do not assume it is installed or install it automatically. If unavailable, explain and offer an equivalent action. Carry forward artifact paths, decisions, verification, remaining risks, and session consent without restarting intake

Local routing: Recommend `360-blueprint` when guidance still needs a plan, `360-expert-review` when a prepared plan is ready for review, or resuming the active task after an expertise-only consultation. Apply this at the end of the selected mode, including suggestion-only mode, not after each faculty seat.

## Output Format

Canonical handover fields: Context · Decisions · State (done / pending / blocked) · Remaining tasks (what, how, where) · Verification · Risks and how to detect them early

Before recommending, and always in `suggest` mode:

```markdown
### Fit assessment

Nature: <what the work touches>
Depth: <reversible-local / reversible-shared / hard to reverse / irreversible or regulated>
Complexity: <low / moderate / high> — <the counts that decided it>
Seats sized: <n>–<n>
```

After each faculty:

```markdown
### Faculty: <role>

Questions: <the questions asked, or "none — memory enough">
Follow or raise: <followed / raised — tailor taken / raised — developer kept cut>
Plan touch:
- <section or task>: <what changed and why>
Memory:
- <claim> (<source>, <status>)
Next: <next faculty> or stop
```

After the session:

```markdown
# Faculty Session: <title>

## Developer fit
- Goals:
- Taste:
- Mindset:
- Strategy:
- House style:

## Fit assessment
- Nature:
- Depth:
- Complexity:
- Seats sized: <band> — seated: <n>

## Seated
| Faculty | New or returning | Questions asked | Follow or raise |
|---|---|---|---|

## Plan changes
- <each surgical edit, grouped by faculty>

## Teams
- <team name>: <created / called / edited / none this session>
- Drift check: <missing must seats raised, or "none — team covered the plan">

## Memory written
- faculty/developer.md: <created / updated / unchanged>
- faculty/roster.md: <created / updated>
- faculty/teams.md: <created / updated / unchanged>
- faculty/<role>.md: <created / updated>
- Persist: <path / in-session only; not persisted>

## Accepted risks and explicit assumptions
- <risk or assumption> — advisory responsibility: <faculty>; operational owner: <person/team or unassigned>; evidence or pending validation: <source/check>; written to plan section <5 / 7 / 10>

## Handover
- Context:
- Decisions:
- State: done / pending / blocked
- Remaining tasks: what, how, where
- Verification:
- Risks and how to detect them early:
- Issued as: <prompt / document / declined by user>

## Next
- 360-expert-review / 360-blueprint / more faculties / stop
```

## Quality Gate

- Completion includes the interactive next-action offer with a recommendation, stop choice, and custom-note option, or the explicit-instruction/parent-owned exception; unanswered suggestions do not block the completed deliverable

The session is finished when every gate applicable to the selected mode passes. In `suggest` mode, finish after the fit assessment, evidence-backed short list, and rationale; seating, plan edits, dossier writes, and team management gates do not apply. State why any other gate is non-applicable.

- The mode was clear, and `suggest` mode stopped before seating and left the plan untouched
- Goals, taste, mindset, and strategy were known from memory or asked in this session
- The fit assessment stated nature, depth and complexity; each seat adds distinct value, overlapping seats were reduced, and departures from guide bands are explained
- Every recommendation cited the plan element that demands it, chosen by failure mode rather than habit — including rare roles and roles the roster does not name
- A short list was shown and seating was confirmed, with no catalog dump unless the developer asked
- Every faculty stayed inside its question caps, and no question was asked whose answer the plan, repo, or dossiers already held
- Every faculty followed or raised; no silent override; no flattery
- Every raise placed two cuts side by side and waited for the developer
- The plan or guidance was polished after each seat, never batched to the end
- Every Plan Template field survived on every task touched: ID, Depends on, Skills, Parallel, Effort, Priority, Done when, checkpoints, change policy, replanning triggers, traceability
- Every task a faculty added carries a stable ID, declared skills, `Effort` / `Priority` / `Parallel` values from the family vocabularies, and an observable `Done when`
- Readiness reflects material edits and blockers; this skill never claimed a review occurred
- Accepted risks, assumptions, and open questions landed in the plan's existing sections; no new numbered section was invented
- Material faculty conflicts needing user choice were presented; routine evidence-backed resolutions were recorded
- Memory retains claim / source / status / touches with provenance; current instructions prevail, and stale evidence is not labeled disputed without contradiction
- Assumptions cite evidence or a pending validation method; advisory roles are distinct from operational owners
- Any called team was drift-checked against this plan, and a missing `must` seat was raised before seating
- House style is one shop, shared across all seated faculties
- The hostile critic was never seated — that role belongs to `360-expert-review`
- The handover carries context, decisions, state, remaining tasks, verification, and risks with how to detect them early
- Delivery follows the user's format and authorization; persistence or its absence is recorded
- A fresh agent can recover decisions, provenance, uncertainty and pending checks from the authorized record

An unresolved applicable gate needs a specific correction or an honest blocker. Do not seat faculties, edit plans, or write dossiers to satisfy gates excluded by the selected mode.
