# Core Cards

Starting Cards for common seats, grouped by the nature dimension from the fit assessment. Adapt every field to the plan; never reuse critique tests unchanged. Each seat must still meet the Card rules in `SKILL.md`: at least three named techniques, critique tests that cite the plan, and a concrete deliverable. Add the plan-specific fields (Excellence bar, Evidence needed, Stays out of) when writing the Card.

Standards lines name sources, not versions. Check the current version and its official text before citing a requirement from it; if that is not possible, mark the claim unverified. For roles not listed here, derive a Card from the same fields; the [seating roster](seating-roster.md) has more examples.

## Cross-cutting

### Software architect
- Owns: boundaries and choices that are expensive to undo
- Techniques: dependency mapping, reversibility check, architecture decision records, change-cost analysis
- Standards: C4 model for structure diagrams; the project's own architecture records
- Critique tests: Which choice is expensive to undo? Which module changes for the most unrelated reasons? What can the existing structure absorb?
- Innovation move: replace a new layer with a seam in existing code

### Simplifier
- Owns: the shortest design that covers every requirement
- Techniques: deletion test, requirement-to-task tracing, reuse audit, YAGNI check
- Standards: none established; the plan's objectives and traceability table are the reference
- Critique tests: Which task has no objective? Which abstraction has one caller? What would the plan look like at half the code?
- Innovation move: merge or delete a task and report what it saves

### QA strategist
- Owns: what must be proven, and at what cost
- Techniques: risk-based test selection, boundary-value analysis, equivalence partitioning, regression targeting
- Standards: the project's test conventions and CI gates
- Critique tests: Which failure would a user notice first? Which test would catch the likeliest bug? Which planned test proves nothing?
- Innovation move: replace several brittle checks with one risk-targeted check

## User-facing, docs and content

### Product designer
- Owns: whether the flow solves the user's job with the least friction
- Techniques: task-flow mapping, state inventory (empty, loading, error, success), heuristic evaluation, usability test plan
- Standards: Nielsen's usability heuristics; the target platform's human interface guidelines
- Critique tests: Which state does the plan leave undesigned? Where does a first-time user stall? What does the user do after an error?
- Innovation move: remove a step or screen instead of explaining it

### Accessibility specialist
- Owns: whether people with disabilities can complete every planned task
- Techniques: keyboard-only walkthrough, screen-reader pass, color-contrast check, focus-order review, reduced-motion check
- Standards: W3C WCAG (current Recommendation); WAI-ARIA Authoring Practices Guide; any accessibility law that applies to the product
- Critique tests: Which planned control cannot be reached by keyboard? Which state change is invisible to a screen reader? Which acceptance check names an accessibility criterion?
- Innovation move: use a native control in place of a custom widget

### Content designer / UX writer
- Owns: words the reader can act on
- Techniques: plain-language edit, task-first ordering, before/after phrasing, reading-level check, term audit
- Standards: ISO 24495-1 plain language; the project's style guide; Diátaxis for documentation structure
- Critique tests: What does the reader do after this line? Which term is undefined? Where does the reader get lost?
- Innovation move: rewrite a section as outcome first, then evidence

## Data

### Data modeler
- Owns: whether stored data stays correct through every change
- Techniques: entity and identity review, constraint placement, expand-and-contract migration, backfill and rollback plan
- Standards: the target database's official documentation for the deployed version
- Critique tests: Which invariant is enforced only in application code? Can the migration run while the old version is live? How is a half-finished backfill undone?
- Innovation move: enforce an invariant with a database constraint instead of new application logic

### API designer
- Owns: contracts that consumers can rely on and evolve with
- Techniques: consumer-driven contract review, versioning and deprecation plan, error-shape design, idempotency review for writes
- Standards: OpenAPI Specification; RFC 9457 problem details; Semantic Versioning
- Critique tests: Which change breaks an existing consumer? What does a client do on a timeout during a write? Which error leaves the caller unable to act?
- Innovation move: extend an existing endpoint instead of adding a new one

## Money

### Payments and ledger engineer
- Owns: whether every amount is recorded once, exactly, and reconcilable
- Techniques: idempotency keys, double-entry ledger review, minor-unit or decimal amount handling, reconciliation design
- Standards: ISO 4217 currency codes; PCI DSS when card data is in scope; the payment provider's official API documentation
- Critique tests: What happens when a payment callback arrives twice? Where could a float or rounding rule change an amount? How is a mismatch with the provider found?
- Innovation move: let the provider hold card data so the system stays out of PCI scope

## Security and privacy

### Application-security engineer
- Owns: threats in this design
- Techniques: threat modeling (STRIDE), abuse-case writing, secret-handling review, trust-boundary mapping
- Standards: OWASP ASVS; OWASP Top 10; the vendor's security advisories for dependencies in use
- Critique tests: Where does untrusted input enter? What happens if a credential leaks? Who can call this who should not?
- Innovation move: close a hole by removing an entry point, not adding a guard

### Privacy engineer
- Owns: what personal data is collected, kept, shared, and deleted
- Techniques: data inventory and flow map, data minimization review, retention and deletion design, privacy threat modeling (LINDDUN)
- Standards: the privacy laws that apply to the users and jurisdictions in scope; the organization's own privacy policy
- Critique tests: Which field is collected without a stated use? How is a user's data deleted everywhere, including backups and logs? Which third party receives personal data?
- Innovation move: drop a collected field instead of protecting it

## Infrastructure

### Reliability engineer
- Owns: graceful failure and recovery
- Techniques: failure mode and effects analysis, idempotency check, retry and timeout review, rollback rehearsal
- Standards: service level objectives and error budgets as described in Google's SRE books
- Critique tests: Which step breaks on retry? What state remains after a half-finished run? How do we undo this?
- Innovation move: make a step idempotent rather than adding a recovery service

### Observability engineer
- Owns: whether a failure can be seen and reproduced
- Techniques: signal-per-failure mapping, structured log review, trace-point selection, alert-noise audit
- Standards: OpenTelemetry semantic conventions; RED and USE methods
- Critique tests: How would we know this failed in production? What is needed to reproduce it? Which signal will nobody read?
- Innovation move: add one signal that answers the top failure; remove unread ones

### Release engineer
- Owns: how the change reaches users and how it is pulled back
- Techniques: progressive rollout (feature flag or canary), migration ordering, rollback trigger definition, release checklist
- Standards: the deployment platform's official documentation; DORA delivery metrics where the team tracks them
- Critique tests: What signal stops the rollout? Can the previous version run against the new data? Who can roll back, and how fast?
- Innovation move: ship behind an existing flag instead of a new deployment path

## ML and agents

### ML engineer
- Owns: whether the model work yields a trustworthy result
- Techniques: baseline-first comparison, data-leakage audit, train/validation/test split review, error analysis by slice, reproducibility check (seeds, versions)
- Standards: model cards for documenting intended use and limits; the framework's official documentation for the pinned version
- Critique tests: Is there a simple baseline to beat? Can test data leak into training? Which slice fails first?
- Innovation move: add a slice-level error report instead of another model

### Evaluation specialist
- Owns: claims backed by numbers
- Techniques: metric-to-goal mapping, held-out set design, confidence intervals, ablation, regression suite
- Standards: none universal; the task's own metric definitions and acceptance thresholds
- Critique tests: Does the metric measure the stated goal? How many samples before the gap is real? What would show the result is noise?
- Innovation move: turn one ad hoc check into a repeatable regression set

### Agent architect
- Owns: tool use, memory, handoff, and refusal
- Techniques: tool-contract review, failure-loop analysis, permission scoping, context budgeting, human-approval gates
- Standards: OWASP Top 10 for LLM Applications; the Model Context Protocol specification when MCP tools are in scope; the model provider's current tool-use documentation
- Critique tests: What stops an infinite loop? Which tool call is irreversible? What does the agent do when a tool fails?
- Innovation move: drop a tool or memory store the task never needs

## Org and process

### Delivery lead
- Owns: sequence, dependencies, and the cut line
- Techniques: critical-path analysis, dependency mapping, cut-line negotiation, risk register review
- Standards: none established; the plan's checkpoints and change policy are the reference
- Critique tests: Which task blocks the most others? What is cut first if time runs short? Which checkpoint can the user actually see?
- Innovation move: move a risky task earlier so failure shows before dependent work starts
