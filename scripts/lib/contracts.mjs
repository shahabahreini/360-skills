// Repository conventions, repeated inside each independently installable skill.
export const CONSENT = `### Entry: Optional Token Efficiency

Reuse this session's approval or refusal of \`360-token-efficiency\`. If unknown and not yet offered, ask once, in the same question round as any other entry question, and keep the overlay off until answered. Explicit user invocation is approval; a plan that lists the skill is not. On approval, load it through the host's skill mechanism, reusing instructions already loaded; if unavailable, say so briefly and continue without installing it. Refusal turns the overlay off, not ordinary efficient work. Revocation takes effect immediately. Consent lasts this session only and never authorizes cross-session memory writes.`;

export const PLAN_CONTRACT = `### Shared Plan Contract

Preserve stable task IDs and existing user decisions. Every task carries: ID, What, How, Where, Depends on, Skills (list or \`None\`), Parallel, Effort, Priority, Done when (observable). Use \`Priority: must | should | could\`, \`Effort: S | M | L\`, and \`Parallel: yes | no\`. Only \`should\` and \`could\` sit below the cut line. Preserve phase checkpoints, change policy, replanning triggers, and objective-to-task traceability.

Plan status: \`Draft\` → \`Ready for review\` → \`Reviewed and ready to execute\`. Open blocking questions keep a plan \`Draft\`; a complete unreviewed plan is \`Ready for review\`; only a passed review sets \`Reviewed and ready to execute\`, and material edits after it return the plan to \`Ready for review\` (or \`Draft\` if blocked). Execution progress lives in the ledger, not in this status. An explicit user instruction to execute a supplied plan authorizes execution without a sibling review; record that basis and never claim a review occurred.`;

export const HANDOVER = 'Context · Decisions · State (done / pending / blocked) · Remaining tasks (what, how, where) · Verification · Risks and how to detect them early';

export const DELIVERY = `### Delivery

Write the deliverable to a recoverable file when the host supports it, at the existing path or the default below. Honor explicit user output requests. Without files, deliver the same complete structure in chat labeled \`in-session only; not persisted\`, and never claim a file was saved. With a saved file, chat carries the Reader's Briefing and the path. In a non-interactive run where no one can answer, do not wait: record each open question, apply only reversible defaults, mark readiness honestly, and deliver.

Judge completion by observable acceptance checks. A structural or format check does not prove behavior or accuracy; state what was not verified.`;

export const COMPLETION = `### Completion: Choose the Next Action

- Deliver and verify the current result first, with its location. An unanswered suggestion never reopens finished work, and a blocked job is not complete
- Recommend one next action from the local routing below, based on the result, project stage, open risks and prior instructions. Skip stages that do not apply; recommend stopping when no useful work remains
- Ask with the host's interactive question tool, or with numbered choices in chat when there is none: the recommendation first with its reason, a stop option, and a free-text option for any direction, inside or outside the 360 skills. This prompt is separate from the briefing and is not a list of open task questions
- An explicit next-step instruction answers this prompt, and an explicit stop or request for no suggestions suppresses it. Otherwise wait for the user's choice; in a non-interactive run, state the recommendation and stop. Silence, a preselected recommendation, and elapsed time are not authorization. On a choice, clarify only what is missing, load a selected skill through the host's mechanism without installing it (offer an equivalent if it is unavailable), and carry forward paths, decisions, verification, risks and session consent`;

export const COMPLETION_GATE = '- Completion offered one recommended next action with stop and free-text options, or followed an explicit instruction or the parent skill\'s prompt; an unanswered suggestion does not block the finished deliverable';

export const READER_BRIEFING_RULE = "- Print the Reader's Briefing in chat before any next-action question; when the host sends one message, the briefing comes first";

export const READER_BRIEFING_GATE = "- The Reader's Briefing was printed in chat before any next-action question";

export const READER_BRIEFING_RULES = `Briefing rules:

- Write for a reader who has not seen the full artifact; define or drop any term of art
- One line per bullet, 20 words or fewer; the whole briefing fits one screen (about 25 lines)
- Outcomes and decisions, not mechanics: no task IDs, phases, priorities, status tables, executor notes or skill names
- Keep new things and changes to existing things in separate sections
- Confidence is proven (evidence in hand), likely (strong reason), possible (suspected), or uncertain (hypothesis). Never numbers; never proven without evidence
- The second line names the full artifact's path, or says \`in-session only; not persisted\`
- Omit empty sections unless this skill marks one as always present`;
