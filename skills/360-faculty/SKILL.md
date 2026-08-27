---
name: 360-faculty
description: Seat a living, tailored expert team on a plan or task. Use when work must fit this developer's goals, taste, mindset, and strategy, when a plan needs the right expertise chosen for its complexity, depth, and nature, or when a named faculty team must be created, called, or updated. Recommends a short list, asks only the questions that still change the work, polishes immediately, and keeps upgradable memory.
version: 1.0.0
---

# 360 Faculty

## Purpose

Run this skill to **staff and tailor** work. Its job: seat named faculties who know this developer, ask only what still changes the plan, polish at once, and remember what they learned.

Family position:

- `360-blueprint` creates the plan — this skill does not
- `360-faculty` attaches at any stage: before planning to set the house style, after a draft to tailor it, or ahead of review to name the lenses that review must apply
- `360-expert-review` finalizes the plan through adversarial attack — this skill never claims finality
- `360-execute` builds the finalized plan — this skill never marks a plan ready for it
- `360-token-efficiency` may run underneath, as with any other skill

`360-expert-review` assembles an ephemeral panel per plan and attacks it. This skill keeps a persistent team that grows with the developer and advises. One is a hostile review board; the other is a tailor's shop.

Produces four artifacts: a fit assessment, a seated roster, upgradable dossiers and named teams, and a surgically polished plan — or concrete faculty guidance if no plan exists yet.

## When to Use

- A plan or task needs experts fitted to this developer, not a generic panel
- The developer asks which expertise this work needs, and wants the best fit chosen from its complexity, depth, and nature
- A named faculty team must be created, called, or updated
- A project needs a house style before more planning
- The developer says "faculty this", "add experts", or "seat a team"
- A seated faculty must update its understanding and retouch the plan
- Not for writing the plan itself (`360-blueprint`), attacking a finished draft (`360-expert-review`), or building one (`360-execute`)

## Core Principle

- Tailor, not template — cut for this person, this project, this request
- Know four measures before advising: goals, taste, mindset, strategy
- Fit is derived, not guessed — complexity sets how many seats, depth sets their urgency, nature sets which lenses
- Every recommendation cites the plan element that demands it
- Follow when the developer's cut is coherent and professionally sound
- Raise when the frame is unfinished, a better cut exists, or the thought can be shaped
- Never flatter. Never lecture. Never silently override
- Memory upgrades; craft does not dilute
- The roster is a floor, not a ceiling — failure modes decide seating, and a needed faculty is derived even when the roster does not name it
- Hide the catalog; recommend a short list
- A question is allowed only when its answer would change the plan or the house style
- Polish after each seat — value appears before the next faculty speaks

## Workflow

### 0. Pick the Mode

Four entry points into one workflow. Choose from what the developer asked; when it is unclear, ask which one in a single question.

| Mode | Trigger | Does | Never does |
|---|---|---|---|
| `suggest` | "who should look at this", "which experts", "help me pick" | Steps 1–4, then stops with the fit assessment, short list, and rationale | Seat, ask past fit, or touch the plan |
| `seat` | "faculty this", "add experts", "seat a team" — the default | Steps 1–8: recommend, confirm, seat one at a time, polish after each | Batch the polish to the end |
| `team` | "save this as X", "call the X team", "add Y to X" | Step 7: create, call, or edit a named team | Skip the drift check |
| `quiet` | the developer replies `quiet` | Seats the confirmed set, asks blocking questions only, polishes from memory, records gaps as explicit assumptions | Ask anything two honest implementations would not diverge on |

### 1. Load What Exists

Read the current task or draft plan. Then read dossiers if present:

- `faculty/developer.md` — goals, taste, mindset, strategy, house style
- `faculty/roster.md` — who has been seated on this project, and when
- `faculty/teams.md` — named teams this developer created
- `faculty/<role>.md` — each faculty's claims about this developer and project; `<role>` is kebab-case

`faculty/` sits beside the plan file. If the plan is not on disk, put it at the project root. If this project cannot persist files, keep the same structure in-session and ask where to persist before closing.

If `faculty/developer.md` is missing or empty, do not seat yet. Measure first.

### 2. Measure the Developer

Ask at most 3 questions. Stop early if all four measures are already known. Each question must reveal at least one measure:

- Goals — what this project must become, and must never become
- Taste — what they find elegant, ugly, overbuilt, or cheap
- Mindset — how they decide, what they protect, how they take challenge
- Strategy — the live bet: speed, simplicity, control, craft, learning, or revenue

Prefer a forced choice over an essay. Never ask what the plan, repo, or dossiers already answer.

Write `faculty/developer.md` before seating. Derive the house style from the answers:

- How to ask — choices vs open, blunt vs gentle
- Standing refusals — what this developer will not accept
- Push strength per area — where to spar, where to finish quietly
- Maturity map — which frames are already strong, which are still forming

House style is one shop. Every seated faculty wears it; none invents a private personality.

### 3. Assess the Fit

Read three dimensions off the plan, or off the stated task when no plan exists yet. Never skip this — it is what makes the short list defensible instead of habitual.

- **Nature** — what the work touches: user-facing, data, money, security and privacy, infrastructure, ML and agents, docs and content, org and process. Decides **which** lenses.
- **Depth** — blast radius and reversibility: reversible-local, reversible-shared, hard to reverse, irreversible or regulated. Decides **seat urgency**.
- **Complexity** — moving parts: task count, phase count, cross-system dependencies, unresolved assumptions, and how many tasks are `must` priority. Decides **how many** seats.

Size the seat count from the assessment:

| Complexity | Depth | Seats |
|---|---|---|
| low | reversible | 1–2 |
| moderate | reversible | 2–3 |
| moderate | hard to reverse | 3–4 |
| high | any | 4–5 |
| any | irreversible or regulated | 4–5, and at least one `must` seat from security, privacy, compliance, or reliability |

Five is the cap unless the developer asks for more. State the three dimensions and the resulting band before recommending, so the developer can correct the read rather than the list.

### 4. Recommend a Short List

Recommend the number of faculties the fit assessment sized, for this task only. Never dump the Seating Roster unless the developer asks for it.

| # | Faculty | Seat | Why now | If absent |
|---|---|---|---|---|
| 1 | <role> | must / should / could | <the task ID, assumption, or risk row that demands this lens> | <the disaster if they stay silent> |

- `must` — silence creates a known failure mode
- `should` — silence creates likely waste or rework
- `could` — the developer may want this lens; their call

`Why now` cites a real element of the plan or task. A recommendation that cannot cite one is a habit, not a fit — drop it.

Choose by failure mode, not by habit. Scan the Seating Roster — including its rarest roles — and ask of each: what breaks if this lens stays silent on this plan? The roster is a floor, not a ceiling: when the plan's failure modes demand a faculty the roster does not name, derive it, name it plainly, and say why.

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
- `quiet` mode: zero unless two honest implementations would diverge without the answer

A question must do exactly one job: intention, taste, or a sharper frame offered as a choice. Never ask two questions that one answer would cover.

**Follow or raise.** Follow when the developer's cut matches their goals, their taste, and a professionally sound path. Raise when any of these is true:

- The frame is unfinished — they asked for a feature when they need a decision
- A better cut exists — same goal, cleaner seam, less future pain
- The thought can be shaped — they are close, but the frame is wrong

Raise in their language. Put two cuts side by side — theirs and the tailor's — and name what each protects. Then wait.

- They take the raise → polish to the tailor's cut; upgrade memory: this mind can be moved on this point
- They keep their cut → tailor that cut; record the accepted risk; do not fight it again without new evidence. `360-expert-review` may reopen it later with evidence — that is its job, not a contradiction of this one

**Polish now.** Edit only the steps, states, checks, and risks this faculty owns. Regenerate the whole plan only if the faculty proved the objective itself wrong. If no plan exists, write concrete guidance this faculty owns, then offer `360-blueprint`.

Hold the plan contract while polishing. `360-execute` reads these fields directly, and prose in their place breaks execution:

- Preserve every field of any task touched: ID, `Depends on`, `Skills`, `Parallel`, `Effort`, `Priority`, `Done when` — along with phase checkpoints, the change policy, the replanning triggers, and the traceability table
- A task a faculty adds gets a stable ID continuing that phase's numbering, `Effort: S | M | L`, `Priority: must | should | could`, `Parallel: yes | no`, a `Skills` list or `None`, and an observable `Done when`
- Never advance the plan's `Status` to `Reviewed and ready to execute`. Only `360-expert-review` sets that. Leave it `Draft` or `Ready for review`

Write what the pass produced into the plan's existing slots — never a new numbered section, which would collide with `360-expert-review`'s sections 11 to 14:

- Accepted risks → section 7, countermeasure reading `Accepted by developer; owned by <faculty>`
- Explicit assumptions → section 5, `Validated by` naming the seated faculty
- Open questions and decision points → section 10
- One header row so a fresh reader knows a faculty pass happened: `| Tailored by | faculty/roster.md @ <date> |`

**Resolve disagreements in the open.** If two seated faculties conflict, present both cuts to the developer with what each protects. Never pick silently.

**Remember.** Update dossiers (Step 6), show the faculty block (Output Format), then move to the next seat — or stop when the developer stops or the remaining faculties would not change the plan.

A faculty blocks the plan only when a missing answer would make two honest implementations diverge. Otherwise it states the assumption and continues.

### 6. Upgrade Memory

Every claim keeps this shape:

| Claim | Source | Status | Touches |
|---|---|---|---|
| <one sentence> | user-said / inferred / observed | active / superseded / disputed | <plan sections this claim may change> |

Rules:

- New answer agrees → keep, refresh
- New answer sharpens → replace the claim; mark the old one superseded
- New answer conflicts → ask one confirm question, then replace or split
- Inferred never overwrites user-said
- Unused inferred claims become disputed — never silently deleted
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
- Offer `360-expert-review` if the plan is ready to be attacked; offer `360-blueprint` if the guidance still needs to become a plan
- Ask the user whether to issue the session handover as a standalone prompt or a document, and where to persist dossiers and teams if they are not on disk
- If the next agent would have to guess the house style, the roster, or any accepted risk, the handover is not finished

### Reference: Seating Roster

Reference material, not a step. Use it to recommend in Step 4. It is a floor, not a ceiling — derive unlisted faculties when the plan's failure modes demand them. Never show it unless the developer asks.

**Human mind**

- UX psychologist — cognition, attention, memory, decision load
- Behavioral scientist — habits, defaults, incentives, dark-pattern refusal
- Emotional-design expert — trust, anxiety, delight, recovery after failure
- Inclusive-cognition expert — neurodiversity, literacy, aging, first-time vs expert
- Motivation specialist — why people start, stall, and abandon
- Trust psychologist — credibility, risk perception, permission to act

**Research**

- UX researcher — interviews, usability, evidence before opinion
- Ethnographer — real context of use, not lab tasks
- Jobs-to-be-done analyst — the job hired, not the feature requested
- Market researcher — alternatives, switching cost, category norms
- Accessibility researcher — who is excluded by the current path
- Support-insight analyst — tickets and complaints as product signal

**Experience design**

- Product designer — whole problem-to-interface path
- Interaction designer — flows, states, gestures, timing
- UI / visual designer — hierarchy, density, visual language
- Information architect — findability, navigation, mental model
- Service designer — cross-channel journey, handoffs, waiting
- Design-systems designer — tokens, consistency, reuse without sameness
- Content designer / UX writer — words as interface
- Conversational designer — chat, voice, agent tone, turn-taking
- Motion designer — feedback, orientation, reduced-motion respect
- Data-visualization designer — charts that tell truth, not decoration
- Onboarding designer — first-run, empty states, competence growth
- Error-experience designer — blame-free recovery, undo, next action

**Product and strategy**

- Product manager — outcome, priority, trade-off against goals
- Product strategist — positioning, bets, what not to become
- Product owner — backlog truth, acceptance, scope discipline
- Growth specialist — activation, retention, loops without coercion
- Monetization specialist — pricing, packaging, value exchange
- Roadmap / portfolio manager — sequencing across bets
- Opportunity discoverer — problem worth solving vs solution theater
- Competitive-intelligence analyst — copy nothing; steal only the job

**Delivery**

- Project manager — time, dependencies, cut line, status without theater
- Technical program manager — multi-team, multi-system sequencing
- Scrum master / delivery coach — flow, blockers, team health
- Release manager — ship window, freeze, comms, rollback clock
- Change manager — adoption inside the org that must live with it
- Risk officer — what can kill the plan, ranked by damage not drama
- Estimator / uncertainty specialist — ranges, not fake precision

**Architecture**

- Software architect — boundaries, simplicity, irreversible choices
- Systems architect — runtime, data, failure domains
- Solution architect — integration across existing systems
- Domain-driven design strategist — bounded contexts, language
- API designer — contracts, versioning, consumer empathy
- Data modeler — truth in storage, migrations, identity
- Integration architect — third parties, sync, eventual consistency
- Migration / legacy specialist — strangler paths, coexistence
- Complexity reductionist — delete before add

**Build**

- Backend engineer — logic, integrity, authorization, failure
- Frontend engineer — state, accessibility in pixels, perceived speed
- Mobile engineer — lifecycle, offline, store, device limits
- Desktop / native engineer — OS integration, install, updates
- CLI / developer-experience engineer — flags, scripts, composability
- Full-lifecycle feature engineer — one slice, all layers, no orphans
- Platform engineer — paved roads, internal products
- Build / tooling engineer — local loop, CI, reproducibility
- Performance engineer — latency, memory, budgets
- Concurrency / realtime specialist — races, ordering, backpressure
- Search / relevance engineer — find vs dump
- Offline / sync specialist — conflict, merge, user-visible truth
- Embedded / IoT specialist — when hardware is in the loop
- Gameplay / simulation specialist — loops, feedback, fairness

**Quality**

- QA strategist — what must be proven, at what cost
- Exploratory tester — the nasty path a script will never write
- SDET / automation engineer — durable checks, not brittle theater
- Test architect — pyramid, fixtures, environments
- Accessibility QA — WCAG as behavior, not a badge
- Localization tester — language, locale, cultural fit
- Chaos / resilience tester — kill dependencies on purpose
- UAT / acceptance specialist — "done" in the user's words
- Regression historian — what broke last time and why

**Operate and survive**

- SRE — SLOs, error budget, toil
- DevOps / delivery engineer — pipeline, environments, promotion
- Incident commander — detect, mitigate, communicate, learn
- Observability engineer — logs, traces, metrics, reproduction
- Capacity planner — load, cost, degradation
- FinOps / cost engineer — unit cost, waste, surprise bills
- Reliability engineer — graceful failure, idempotency, rollback
- Disaster-recovery specialist — backups that actually restore
- Environment / secrets steward — config, credentials, least privilege

**Security, privacy, abuse**

- Application-security engineer — threats in the actual design
- Threat modeler — assets, attackers, entry points
- Identity / auth specialist — sessions, tokens, account recovery
- Privacy engineer — collection, retention, consent, deletion
- Compliance officer — regulation that actually applies
- Cryptography specialist — only when crypto is the domain
- Abuse / fraud specialist — misuse, spam, automation, social attack
- Supply-chain security specialist — dependencies, provenance
- Security-UX specialist — safe defaults people will still use

**Data and intelligence**

- Product analyst — behavior vs intention
- Data analyst — questions, definitions, honest charts
- Data engineer — pipelines, quality, lineage
- Data scientist — prediction only when it beats a rule
- ML engineer — training, eval, drift, fallback
- MLOps specialist — reproducibility, promotion, rollback of models
- Evaluation / benchmarking specialist — claims vs numbers
- Information-retrieval / RAG specialist — grounding, citation, miss
- Agent architect — tools, memory, handoff, refusal
- Computer-vision specialist — data, labels, failure in pixels
- Human-in-the-loop designer — when the model must ask a person

**Words, brand, adoption**

- Brand strategist — promise, voice, what the product stands for
- Naming specialist — product, feature, and company language
- Technical writer — docs a stranger can finish a task from
- Developer advocate — when other builders are users
- Customer-success lead — activation after the sale
- Support engineer — first-line reality
- Sales engineer — what was promised vs what can ship
- Training designer — competence, not a tour
- Community / open-source maintainer — contribution, governance, tone
- Localization / i18n strategist — expansion without rewrite

**Business, legal, ethics**

- Business analyst — rules, processes, acceptance language
- Domain expert — the real-world craft the software sits inside
- Operations designer — the work around the software
- Stakeholder diplomat — who decides, who blocks, who is surprised
- Legal counsel — IP, contracts, liability, terms
- Licensing specialist — OSS and proprietary mix
- Procurement / vendor specialist — lock-in, SLA, exit
- Ethicist — who is harmed if this works as designed
- Digital-wellbeing specialist — attention, addiction, after-hours
- Sustainability specialist — energy, hardware waste, long life
- Accessibility policy lead — legal plus moral floor
- AI-policy / safety specialist — autonomy, consent, audit of agents

**Meta**

- Hostile critic — never seated here; owned by `360-expert-review`
- Handover specialist — the next agent needs zero guesses
- Simplifier — shortest design that still covers every required angle
- First-principles philosopher — separate fact from habit
- User-feeling advocate — thought, experience, and emotion as first-class
- Traceability clerk — requirement, task, test, production signal
- Professor-panel chair — convenes only the seated faculties this request needs

## Output Format

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
- Persist: <path> or <asked, waiting>

## Accepted risks and explicit assumptions
- <risk or assumption> — owned by <faculty>, written to plan section <5 / 7 / 10>

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

The session is finished only when every answer is yes:

- The mode was clear, and `suggest` mode stopped before seating and left the plan untouched
- Goals, taste, mindset, and strategy were known from memory or asked in this session
- The fit assessment stated nature, depth, and complexity, and the seat count stayed inside the band it sized
- Every recommendation cited the plan element that demands it, chosen by failure mode rather than habit — including rare roles and roles the roster does not name
- A short list was shown and seating was confirmed, with no catalog dump unless the developer asked
- Every faculty stayed inside its question caps, and no question was asked whose answer the plan, repo, or dossiers already held
- Every faculty followed or raised; no silent override; no flattery
- Every raise placed two cuts side by side and waited for the developer
- The plan or guidance was polished after each seat, never batched to the end
- Every Plan Template field survived on every task touched: ID, Depends on, Skills, Parallel, Effort, Priority, Done when, checkpoints, change policy, replanning triggers, traceability
- Every task a faculty added carries a stable ID, declared skills, `Effort` / `Priority` / `Parallel` values from the family vocabularies, and an observable `Done when`
- The plan's `Status` was left `Draft` or `Ready for review` — this skill never claimed finality
- Accepted risks, assumptions, and open questions landed in the plan's existing sections; no new numbered section was invented
- Faculty conflicts were presented to the developer, never settled silently
- Memory uses claim / source / status / touches; conflicts were confirmed before rewriting
- Any called team was drift-checked against this plan, and a missing `must` seat was raised before seating
- House style is one shop, shared across all seated faculties
- The hostile critic was never seated — that role belongs to `360-expert-review`
- The handover carries context, decisions, state, remaining tasks, verification, and risks with how to detect them early
- The user was asked about handover format and where dossiers and teams persist; the outcome is recorded
- A fresh agent can continue from the dossiers, teams, and roster with zero guessing

Any "no" means not finished. Measure, raise, polish, or write memory, then check again.
