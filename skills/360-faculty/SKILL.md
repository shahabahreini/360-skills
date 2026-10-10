---
name: 360-faculty
description: Seat a short panel of specialist experts, chosen from a plan's nature, depth, and complexity, to critique and improve it from distinct angles with named methods and current best practice. Use when a plan or task needs specialist scrutiny before review, when work must fit this developer's goals and taste, or when a named expert team must be created, called, or updated.
version: 2.0.0
---

# 360 Faculty

## Purpose

Bring the specialist angles a plan needs, each held by a seat with named methods, current sources and a concrete deliverable, and fit the result to this developer's goals, taste and strategy. Improve the plan in place, remember what was learned, and brief the user in plain language.

## When to Use

- A plan or task needs specialist angles beyond a general review: security, data, UX, reliability, ML, or a rarer craft
- The developer asks which expertise this work needs
- Work must fit this developer's goals, taste, mindset, and strategy, or a project needs a house style before more planning
- A named faculty team must be created, called, or updated
- The developer says "faculty this", "add experts", or "seat a team"
- A seated faculty must update its understanding and retouch the plan
- Not for writing the plan itself (`360-blueprint`), attacking a finished draft (`360-expert-review`), or building one (`360-execute`)

## Core Principle

A seat earns its place by checking a distinct risk in this plan with named methods and current evidence, then changing the plan or stating why nothing needed to change.

## Workflow

### Entry: Optional Token Efficiency

Reuse explicit approval or refusal for `360-token-efficiency` from this session. If unknown and not already offered, ask once whether to enable it for this session; continue the main task with the overlay inactive while unanswered. Explicit user invocation counts as approval; merely appearing in a generated plan does not. On approval, discover and load it through the host's supported skill mechanism, reusing already-loaded instructions. If unavailable, explain briefly and continue; do not install automatically. Refusal disables the overlay, not ordinary efficient habits. Revocation takes effect immediately. Keep consent in-session only; it does not authorize cross-session memory writes. The overlay never invokes itself or restarts the parent skill.

### Shared Plan Contract

Preserve stable task IDs and existing user decisions. Every task carries: ID, What, How, Where, Depends on, Skills (list or `None`), Parallel, Effort, Priority, Done when (observable). Use `Priority: must | should | could`, `Effort: S | M | L`, and `Parallel: yes | no`. Only `should` and `could` sit below the cut line. Preserve phase checkpoints, change policy, replanning triggers, and objective-to-task traceability.

Plan status: `Draft` → `Ready for review` → `Reviewed and ready to execute`. Open blocking questions keep it `Draft`; a complete unreviewed plan is `Ready for review`; a passed review sets `Reviewed and ready to execute`. Material edits after review return it to `Ready for review` (or `Draft` if blocked). Execution progress belongs in the ledger, not the readiness status. An explicit user instruction to execute a supplied plan authorizes execution without a mandatory sibling review; record that basis without claiming a review occurred.

### Delivery

Prefer a recoverable file when supported, using the existing path or the default below. Honor explicit user output requests. If files are unavailable, deliver the same complete structure in-session and label it `in-session only; not persisted`; never claim a file was saved. With a saved file, chat carries the Reader's Briefing and the path. These delivery rules also apply to the templates and quality gate below.

Judge completion by observable acceptance checks. A structural or format check does not prove behavior or accuracy; state what was not verified.

### 0. Pick the Mode

Four entry points into one workflow. Choose from what the developer asked; clarify only if modes would differ in authorized work.

| Mode | Trigger | Runs | Never does |
|---|---|---|---|
| `suggest` | "who should look at this", "which experts", "help me pick" | Steps 1–4 with recorded or observable developer measures only; stops with the fit assessment, short list and Cards | Seat, write dossiers or teams, or edit the plan |
| `seat` | "faculty this", "add experts", "seat a team" (the default) | Steps 1–8: recommend, confirm, seat one at a time, polish after each | Batch the polish to the end |
| `team` | "save this as X", "call the X team", "add Y to X" | Step 7; `call` continues through Steps 3–8 without a new recommendation | Skip the drift check |
| `quiet` | the developer replies `quiet` | `seat` with questions limited to blocking decisions; gaps become explicit assumptions | Block on equivalent reversible choices |

### 1. Load What Exists

Read the current task or draft plan in full. Then read dossiers if present:

- `faculty/developer.md`: goals, taste, mindset, strategy, house style
- `faculty/roster.md`: who has been seated on this project, and when
- `faculty/teams.md`: named teams this developer created
- `faculty/<role>.md`: each faculty's claims about this developer and project; `<role>` is kebab-case

`faculty/` sits beside the plan file, or at the project root when the plan is not on disk. Write dossiers only within the user-authorized faculty scope; token-efficiency consent does not authorize memory writes.

### 2. Measure the Developer

Know four measures before seating:

- Goals: what this project must become, and must never become
- Taste: what they find elegant, ugly, overbuilt, or cheap
- Mindset: how they decide, what they protect, how they take challenge
- Strategy: the live bet (speed, simplicity, control, craft, learning, or revenue)

Take each measure from dossiers, current instructions, the plan and the repository first; record evidence-based readings as `inferred`. Ask only for measures that remain unknown and would change seating or tailoring: at most 3 questions in one round, each revealing at least one measure, offered as forced choices rather than essays. In `quiet` mode, or if the developer declines, proceed on inferred measures and treat them as assumptions.

Record the profile before seating and derive the house style:

- How to ask: choices or open, blunt or gentle
- Standing refusals: what this developer will not accept
- Push strength per area: where to spar, where to finish quietly
- Maturity map: which frames are already strong, which are still forming

House style is one shop. Every seated faculty wears it; none invents a private personality.

### 3. Assess the Fit

Read three dimensions off the plan, or off the stated task when no plan exists yet. This assessment makes the short list defensible instead of habitual.

- Nature: what the work touches (user-facing, data, money, security and privacy, infrastructure, ML and agents, docs and content, org and process). Decides which angles
- Depth: blast radius and reversibility (reversible-local, reversible-shared, hard to reverse, irreversible or regulated). Decides seat urgency
- Complexity: moving parts (task count, phase count, cross-system dependencies, unresolved assumptions). Sizes the distinct expertise needed

Use these bands as guidance, not quotas:

| Complexity | Depth | Seats |
|---|---|---|
| low | reversible | 1–2 |
| moderate | reversible | 2–3 |
| low | hard to reverse | 2–3 |
| moderate | hard to reverse | 3–4 |
| high | any | 4–5 |
| any | irreversible or regulated | Consider 4–5; include the security, privacy, compliance or reliability angle its concrete risk demands |

Five is the cap unless the developer asks for more. Each seat must add a distinct decision or failure check; merge overlapping angles and use fewer seats when sufficient. State the dimensions and band, and explain any reduction.

### 4. Recommend a Short List

Recommend only faculties that add distinct value to this task:

| # | Faculty | Seat | Why now | Techniques it will apply | If absent |
|---|---|---|---|---|---|
| 1 | <role> | must / should / could | <task ID, assumption, or risk row> | <2–3 named methods> | <the missed decision or failure> |

- `must`: a concrete material failure requires this expertise
- `should`: silence creates likely waste or rework
- `could`: the developer may want this angle; their call

`Why now` cites a real element of the plan or task. A recommendation that cannot cite one is habit, not fit; drop it.

Choose expertise from actual failure modes. Start from the [core cards](references/core-cards.md), grouped by the nature dimension, and derive an unlisted role when the plan needs one. Read the optional [seating roster](references/seating-roster.md) only when selection needs more examples; never show it unless the developer asks.

#### Define Each Seat

Write a Card for every recommended seat before the developer confirms. Adapt the core card when one exists; derive any other role from the same fields.

```markdown
### Card: <role>
Owns: <the one decision this seat decides>
Techniques: <3–5 named methods this seat applies to this plan>
Standards: <named standards, official guidance, or primary references this seat checks against, or "none established">
Critique tests: <3 questions, each answerable from plan evidence>
Excellence bar: <what leading practitioners of this craft would require here>
Innovation move: <one improvement beyond the ask, with its footprint>
Evidence needed: <what this seat must see before judging>
Delivers: at least one critique, one recommendation, and one innovation, or "none" with the reason
Stays out of: <neighbouring seats>
```

Card rules:

- Techniques are established methods of the craft, not adjectives. "Thinks about security" fails. "Threat modeling, abuse-case review, secret-handling check" passes
- Critique tests cite plan elements. A test that fits any plan is generic; rewrite it
- A seat with fewer than three named techniques, or with no concrete deliverable, is dropped or merged
- Show the short list with one line per Card; show a full Card on request

Accept these replies: `accept`, `1-3`, `drop 4 add privacy`, `only architect`, `quiet`. Do not seat until the developer confirms. If they name a faculty you did not recommend, write its Card and seat it.

In `suggest` mode, stop here and deliver the fit assessment, short list and Cards. Before planning, add the house-style questions worth answering first. Before review, add a prioritized list of review angles, each with the plan evidence that demands it; hand it over without running the review.

### 5. Seat One Faculty at a Time

For each confirmed faculty, in the listed order:

**Load.** Read `faculty/developer.md` and `faculty/<role>.md`.

**Ask.** Hard caps:

- New faculty on this project: at most 3 questions
- Returning faculty: at most 1, and only if this task contradicts or extends its memory
- Zero when memory, the plan and the repository are enough
- `quiet` mode: zero unless the answer changes the intended outcome, scope, acceptance criteria, significant cost, irreversible effects or authorization

A question does exactly one job: intention, taste, or a sharper frame offered as a choice. Never ask two questions one answer would cover. Block dependent work only on a missing answer of the kind `quiet` mode still asks; otherwise choose a supported reversible default, record its basis and revisit condition, and continue.

**Apply the Card.** Run the seat's techniques and critique tests against the plan. Record each result as a critique, a recommendation, or an innovation.

- Check version-specific or fast-moving claims (library APIs, versions, standards, security advisories, prices) against the project and current primary sources when tools allow, citing source and date. Otherwise mark the claim unverified and record it as an assumption with `Pending: <check>`
- Critique stays inside the seat's craft and aims to improve the plan. The hostile pass and the readiness verdict belong to `360-expert-review`
- An innovation that grows the footprint (files, dependencies, abstractions) is `could` unless it protects a stated requirement
- Do not add work to show value. "None, because <reason>" is a valid delivery

**Follow or raise.** Follow when the developer's cut matches their goals, their taste and a professionally sound path. Raise only for a material decision supported by evidence, such as:

- The frame is unfinished: they asked for a feature when they need a decision
- A better cut exists: same goal, cleaner seam, less future pain
- The thought can be shaped: they are close, but the frame is wrong

Raise in their language. Put two cuts side by side, theirs and the seat's, name what each protects, and wait.

- They take the raise: polish to the seat's cut; record that this mind can be moved on this point
- They keep their cut: tailor that cut and record the accepted risk. Do not reopen it without new evidence; `360-expert-review` may reopen it later with evidence

**Polish now.** Edit only the steps, states, checks and risks this faculty advises on. Regenerate the whole plan only if the faculty proved the objective itself wrong. If no plan exists, write concrete guidance within this faculty's scope.

- Hold the Shared Plan Contract on every task touched or added; an added task continues its phase's numbering
- Write findings into the plan's existing sections, keeping other valid plans' headings and never inventing new numbered sections. Blueprint section numbers are shown:
  - Accepted risks → Risks (7): acceptance, countermeasure and operational owner (a real person or team, or explicitly unassigned). A faculty is an advisory lens, never an operational owner
  - Assumptions → Assumptions (5): `Validated by` cites evidence and its boundary, or `Pending: <validation method>`. A seat's agreement never validates an inference
  - Open questions → Context & Constraints (2); decisions → Handover Summary (10)
  - Footprint line → Scope (4), updated when an edit changes it
- Add or refresh one metadata row so a fresh reader knows a faculty pass happened: `| Tailored by | faculty/roster.md @ <date> |`
- Never claim a review occurred. Material edits to a reviewed plan return it to `Ready for review`, or `Draft` if blocking questions remain

**Resolve disagreements in the open.** Check conflicting advice between seats against evidence and existing decisions. Resolve equivalent reversible details with a recorded reason; present material trade-offs needing user choice with what each option protects.

**Remember.** Update dossiers (Step 6), show the faculty block (Output Format), then move to the next seat, or stop when the developer stops or the remaining seats would not change the plan.

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

- Create: `save this as <name>` turns the session's seated set into a team; `team create <name>: <roles>` builds one from scratch
- Call: `call <name>` loads the team and skips Step 4's recommendation, going straight to seating. Dossiers, Cards, and every question cap still apply
- Edit: `team <name> add <role>` or `drop <role>`; record the change and its date

Drift check, always. After loading a team, still run Step 3 against the current plan. If the fit assessment surfaces a `must` seat the team lacks, name it in one line with its plan evidence and ask before seating. A stale team must never silently under-cover a new plan.

Keep every team short enough to read cold.

### 8. Close the Session

After the last seated faculty:

- Confirm the plan holds every edit, accepted risk, assumption and decision, and that its Handover Summary reflects them. Without a plan, deliver the guidance with the six handover fields
- State whether dossiers and teams were persisted; ask about persistence only when required and not already authorized
- If the next agent would have to guess the house style, the roster, or any accepted risk, the handover is not finished
- Print the Reader's Briefing in chat before asking anything. A next-action question with no briefing above it is a failed delivery. If the host sends one message, the briefing comes first in that message

### Completion: Choose the Next Action

- Finish and verify the current deliverable first; make the result and its location available before asking about follow-on work. Keep artifact readiness separate from the next-action choice: an unanswered suggestion does not reopen completed work, and a blocked job is not complete
- Check the result, current project stage, remaining risks, and prior user instructions. Recommend the next useful action from the local routing guidance below; skip irrelevant stages and prefer stopping when no useful work remains
- Use an available interactive question tool to offer one concise next-action choice. Put the best recommendation first, explain why it fits this result, and include a stop/pause choice. Always allow a free-text note or custom direction, including work outside the 360 flow; never force the user into a sibling skill
- If interactive tools are unavailable, offer equivalent numbered choices with the recommendation, rationale, and explicit custom-note option in chat. This completion prompt is separate from the deliverable briefing; skill names are allowed here, and it is not a passive list of unresolved task questions
- Reuse an already explicit next-step instruction instead of asking again; continue work it authorizes. Otherwise wait for the user's choice before starting follow-on work. Silence, a preselected recommendation, and elapsed time are not authorization. An explicit stop or request for no suggestions suppresses the prompt
- When the user chooses, follow that direction and clarify only missing information needed for it. Discover and load a selected skill through the host's supported mechanism; do not assume it is installed or install it automatically. If unavailable, explain and offer an equivalent action. Carry forward artifact paths, decisions, verification, remaining risks, and session consent without restarting intake

Local routing: Recommend `360-expert-review` when the polished plan is ready for review, `360-blueprint` when guidance or a suggest-mode short list still needs a plan, or resuming the active task after an expertise-only consultation. Apply this at the end of the selected mode, including `suggest` mode, not after each seat.

## Output Format

The durable record is the plan file (edits, risks, assumptions, decisions and its handover) plus the `faculty/` dossiers and teams. Faculty writes no separate session file. Handover fields: Context · Decisions · State (done / pending / blocked) · Remaining tasks (what, how, where) · Verification · Risks and how to detect them early

### Fit assessment

Show before recommending, and always in `suggest` mode, followed by the short list:

```markdown
Nature: <what the work touches>
Depth: <reversible-local / reversible-shared / hard to reverse / irreversible or regulated>
Complexity: <low / moderate / high>: <the counts that decided it>
Seats sized: <n>–<n>
```

### Faculty block

Show after each seat:

```markdown
### Faculty: <role>

Questions: <the questions asked, or "none: memory enough">
Critiques:
- <what is weak from this craft's view>: evidence <plan element or source>
Recommendations:
- <section or task>: <change and why>
Innovation:
- <improvement>: footprint <files / dependencies / abstractions>, priority <should / could>
Sources checked: <standard or document with date, or "none needed">
Follow or raise: <followed / raised, tailor taken / raised, developer kept cut>
Plan edits: <sections or tasks changed, or "none">
Memory: <claim> (<source>, <status>)
Next: <next faculty> or stop
```

### Reader's Briefing

Print at session close. In `suggest` mode the fit assessment and short list replace it. Follow the Delivery rules for file or in-session output.

```text
<plain title>: specialist review applied
Plan: <path>

In one sentence
<who looked at the plan and what changed, 25 words or fewer>

Who looked at it
- <specialist>: <the angle they checked, in plain words>

What changed in the plan
- <part of the plan>: now <before>; after <after>. Why: <reason>

New in the plan
- <added step or check, as something you will see>

Kept as you chose
- <your choice a specialist challenged>. Risk you accepted: <risk>

Optional ideas
- <idea>: <what it would cost>

Risks still open
- <risk in plain words>, <proven|likely|possible|uncertain>. You'd notice it by: <sign>

Saved for next time
- <preference, specialist memory, or team>: <path, or not saved>
```

Briefing rules:

- Write for someone who has not read the full artifact. Define or drop any term of art
- One line per bullet, 20 words or fewer. The whole briefing fits one screen (about 25 lines)
- Outcomes and decisions, never mechanics: no task IDs, phases, priorities, status tables, executor notes, or skill names
- Keep new things and changes to existing things in separate sections. Never mix them
- Confidence uses proven (evidence in hand), likely (strong reason), possible (suspected), or uncertain (hypothesis). Never numbers; never proven without evidence
- The second line names the full artifact's path, or says `in-session only; not persisted`
- Omit empty sections unless this skill marks one as always present
- `Who looked at it` is always present and names every seat, including one that changed nothing ("no change needed")
- Every item under `What changed` shows now and after

## Quality Gate

The session is finished when every gate applicable to the selected mode passes. In `suggest` mode, finish after the fit assessment, evidence-backed short list with Cards, and rationale; seating, plan edits, dossier writes, team management and briefing gates do not apply. State why any other gate is non-applicable.

- The mode was clear, and `suggest` mode stopped before seating and left the plan and dossiers untouched
- Goals, taste, mindset, and strategy came from records, evidence marked `inferred`, or this session's answers
- The fit assessment stated nature, depth and complexity; each seat adds distinct value; overlapping seats were merged and departures from the bands explained
- Every recommendation cited the plan element that demands it, chosen by failure mode rather than habit, including roles the references do not list
- Every seat had a Card with at least three named techniques, its standards, plan-citing critique tests, and a concrete deliverable
- A short list was shown and seating was confirmed, with no catalog dump unless the developer asked
- Every faculty stayed inside its question caps and asked nothing the plan, repository, or dossiers already answered
- Version-specific or fast-moving claims cite a current source and date, or are recorded as unverified assumptions with a pending check
- Every faculty followed or raised; no silent override, no flattery; every raise showed two cuts and waited
- Every faculty delivered a critique, a recommendation, and an innovation, or stated why none applied; no innovation grew the footprint without a named requirement or `could` priority
- The plan or guidance was polished after each seat, never batched to the end
- Every task touched or added holds the Shared Plan Contract; readiness reflects material edits and blockers; no review was claimed
- Accepted risks, assumptions, and open questions landed in the plan's existing sections; advisory roles are distinct from operational owners
- Material conflicts between seats were presented; routine evidence-backed resolutions were recorded
- Memory keeps claim / source / status / touches with provenance; current instructions prevail; stale evidence is not labeled disputed without contradiction
- Any called team was drift-checked, and a missing `must` seat was raised before seating
- House style is one shop, and the hostile critic was never seated
- The plan's handover, or the guidance's handover, lets a fresh agent recover decisions, provenance, uncertainty, and pending checks
- Delivery follows the user's format and authorization; persistence or its absence is stated
- The briefing follows the briefing rules and names every seat
- The Reader's Briefing was printed in chat before any next-action question
- Completion includes the interactive next-action offer with a recommendation, stop choice, and custom-note option, or the explicit-instruction/parent-owned exception; unanswered suggestions do not block the completed deliverable

An unresolved applicable gate needs a specific correction or an honest blocker. Do not seat faculties, edit plans, or write dossiers to satisfy gates excluded by the selected mode.
