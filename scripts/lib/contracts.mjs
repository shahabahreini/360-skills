// Repository conventions, repeated inside each independently installable skill.
export const CONSENT = `### Entry: Optional Token Efficiency

Reuse explicit approval or refusal for \`360-token-efficiency\` from this session. If unknown and not already offered, ask once whether to enable it for this session; continue the main task with the overlay inactive while unanswered. Explicit user invocation counts as approval; merely appearing in a generated plan does not. On approval, discover and load it through the host's supported skill mechanism, reusing already-loaded instructions. If unavailable, explain briefly and continue; do not install automatically. Refusal disables the overlay, not ordinary efficient habits. Revocation takes effect immediately. Keep consent in-session only; it does not authorize cross-session memory writes. The overlay never invokes itself or restarts the parent skill.`;

export const PLAN_CONTRACT = `### Shared Plan Contract

Preserve stable task IDs and existing user decisions. Every task carries: ID, What, How, Where, Depends on, Skills (list or \`None\`), Parallel, Effort, Priority, Done when (observable). Use \`Priority: must | should | could\`, \`Effort: S | M | L\`, and \`Parallel: yes | no\`. Only \`should\` and \`could\` sit below the cut line. Preserve phase checkpoints, change policy, replanning triggers, and objective-to-task traceability.

Plan status: \`Draft\` → \`Ready for review\` → \`Reviewed and ready to execute\`. Open blocking questions keep it \`Draft\`; a complete unreviewed plan is \`Ready for review\`; a passed review sets \`Reviewed and ready to execute\`. Material edits after review return it to \`Ready for review\` (or \`Draft\` if blocked). Execution progress belongs in the ledger, not the readiness status. An explicit user instruction to execute a supplied plan authorizes execution without a mandatory sibling review; record that basis without claiming a review occurred.`;

export const HANDOVER = 'Context · Decisions · State (done / pending / blocked) · Remaining tasks (what, how, where) · Verification · Risks and how to detect them early';

export const DELIVERY = `### Delivery

Prefer a recoverable file when supported, using the existing path or the default below. Honor explicit user output requests. If files are unavailable, deliver the same complete structure in-session and label it \`in-session only; not persisted\`; never claim a file was saved. With a saved file, chat normally carries a short briefing and its path. These delivery rules also apply to the templates and quality gate below.`;
