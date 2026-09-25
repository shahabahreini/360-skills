# Interactive completion validation

Scope: all seven public skills, their contributor convention, README, version fixtures, and compiled bundle. Compatible workflow additions preserve artifact schemas. Versions: blueprint 2.3.0, expert review 3.3.0, faculty 1.2.0; backend audit, execute, optimize, and token efficiency 2.1.0.

## Instruction walkthrough

These are manual rule walkthroughs against the written instructions, not live cross-host agent runs. Each case was checked for a defined route, authorization boundary, and completion status.

| Case | Outcome from the instructions | Result |
|---|---|---|
| Prepared plan, no expertise gap | Offer expert review first, explain fit, allow stop and custom note | Pass |
| Prepared plan needs tailored expertise | Offer faculty; do not require it for every plan | Pass |
| Review passes | Offer execution after making the reviewed plan available | Pass |
| Review is blocked | Offer blocker resolution or replanning; do not label execution ready | Pass |
| Backend execution completes | Offer backend audit based on the work performed | Pass |
| Documentation execution completes | Offer a relevant follow-up or stop; no invented backend audit | Pass |
| Audit finds correctness issues | Offer planning fixes, or execution of a suitable already-authorized plan | Pass |
| Audit leaves only optimization concerns | Offer optimize | Pass |
| Optimization finds no useful candidates | Recommend stop | Pass |
| Faculty suggestion-only consultation ends | Offer next action at mode completion; no forced seating or memory writes | Pass |
| User writes an unrelated custom direction | Follow it; clarify only missing information for that direction | Pass |
| User leaves recommendation unanswered | Completed artifact remains complete; follow-on work does not start | Pass |
| User already authorized the next stage | Continue within that authorization without a repeated permission prompt | Pass |
| User requests stop or no suggestions | Suppress the prompt | Pass |
| Interactive question tool unavailable | Use numbered chat choices with rationale, stop, and custom note | Pass |
| Selected skill unavailable | Explain and offer an equivalent action; no automatic installation | Pass |
| Token efficiency accompanies another skill | Parent owns one prompt; companion does not duplicate it | Pass |
| Standalone token-efficiency task completes | Offer main-task resumption or an evidenced issue; no recursive overlay | Pass |

## Verification and limits

An executable text check confirmed the shared completion block is identical across all seven skills and AGENTS.md, and all seven quality gates include it. The existing consistency suite checks catalog versions, references, artifact contracts, and compiled documentation; it does not enforce the new completion behavior semantically. Run the standard build, tests, and consistency commands for structural verification.

No live UI portability, agent compliance rate, token savings, or latency measurements were performed. Future host-level evaluation should check that free-text answers remain available, only one prompt appears with a companion, and an unanswered next action never starts new work. No artifact-schema change or plan-readiness regression was found in the walkthrough.


## 2026-09-24 structural enforcement and recheck

The validator now enforces the exact shared completion block once per skill, inside and at the end of Workflow with nonempty local routing, plus its matching Quality Gate item. Public and experimental fixtures cover missing, changed, misplaced, duplicate and fenced blocks, missing/empty/misplaced routing, missing/changed/misplaced/fenced gates, and Delivery verification drift. Contributor guidance uses the same constants. The existing token-efficiency completion remains byte-identical and parent-owned.

The logic-revision walkthrough rechecked completed-versus-blocked outcomes, a single parent prompt, stop/custom choices, existing authorization, and complete in-session fallback. See cases C2–C3 and the fallback output in the linked [scenario record](behavioral-scenarios.md#2026-09-24-logic-revision-walkthroughs). Structural checks cannot determine whether routing advice is useful or an agent actually honors consent; those remain behavioral limits.
