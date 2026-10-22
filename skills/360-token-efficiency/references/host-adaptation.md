# Host adaptation

Read only when a host-specific control, limit or telemetry source matters. These are known examples, checked 2026-10-21 against official docs unless marked. Hosts change quickly: confirm a control exists in the current session before relying on it, and never infer one from the product name. The same host can expose different tools per model, plan or version.

## Probe checklist

Answer from the exposed tool list, command list and observed results, once per session:

- Search and line-range reads: is there a grep/glob tool, and does the read tool accept offsets or limits?
- Large output: does the shell or read tool truncate, or save big output to a file with a preview?
- Deferred tools: is there a tool-search or on-demand loading mechanism?
- Subagents: can the agent spawn isolated workers, in the background, with a chosen model?
- Todo or plan tool: which one, if any?
- Context: is there manual or automatic compaction, and at what threshold?
- Telemetry: which command or headless output reports tokens, cache use and cost?

## Known host examples

| Host | Skills and instructions | Context | Subagents | Todo | Output limits | Telemetry |
|---|---|---|---|---|---|---|
| Claude Code | SKILL.md, lazy body; CLAUDE.md | `/compact [focus]`, auto-compaction, `/rewind`, `/clear` | Isolated, model per agent, background, nesting | Task tools on some models only; otherwise TodoWrite or none | Large shell output saved to a file with a preview; read by offset and limit | `/usage`, `/context`; `-p --output-format json` with cache fields and cost |
| Codex CLI | SKILL.md (`.agents/skills`), lazy; AGENTS.md capped (`project_doc_max_bytes`) | `/compact`, auto-compaction by token limit, `/status` | Built-in and TOML agents with model and effort; limited nesting. Model pinning reported unreliable (user reports) | `update_plan` (unconfirmed) | `tool_output_token_limit` | `/status`; `codex exec --json` usage with cached and reasoning tokens |
| Gemini CLI / Antigravity CLI | SKILL.md via `activate_skill`, behind a consent prompt; GEMINI.md | `/compress`, auto-compression near 50%, `/chat save` and `resume` | `.gemini/agents`, separate context, model field | `write_todos` | Long tool output truncated; shell output summarization budgets | `/stats`; `-p --output-format json` stats. Antigravity CLI replaced Gemini CLI for some plans in 2026 |
| GitHub Copilot CLI | `.github/skills`; AGENTS.md and others | Background compaction near 80%, `/compact`, `/context` | Separate context; parallel `/fleet` | `/tasks` | Large output saved to a temp file with a preview | `/context`; headless JSON fields undocumented |
| Cursor | SKILL.md in several folders, on demand | Undocumented | Separate context and model; inheritance reported buggy | Undocumented | Undocumented | Dashboard only; headless JSON lacks usage |
| Others (OpenCode, Cline, Aider, Amp, Windsurf) | Varies; confirm in session | Aider: `/tokens`, `/drop`, `/clear` | Confirm in session | Confirm in session | Aider: repo-map budget | Aider: `/tokens` |

## Cache-breaking events

Treat these as cache resets on any host unless its docs say otherwise: switching model; changing reasoning effort or thinking settings; adding or removing tools or connected servers; editing, reordering or deleting earlier messages; compaction; images added or removed; an idle gap past the cache lifetime. Typical lifetimes are 5 minutes (Anthropic default, 1 hour optional) and 30 minutes or more on newer OpenAI models. Implicit Gemini lifetimes are undocumented.

## Cross-host cautions

- A lighter session model may ignore a long skill and work inline. Use lighter models inside fixed, short briefs and verify the result
- Subagent model settings are not always honored. Confirm the model that actually ran in telemetry before claiming savings
- Hosts compact automatically at different thresholds. Do not compact manually just before the host would
- Some hosts gate skill loading behind a consent prompt. Load the skill once and reuse it
- Without token telemetry, label results `UNMEASURED` rather than estimating from text length

Sources: [Claude Code costs](https://code.claude.com/docs/en/costs), [Claude Code prompt caching](https://code.claude.com/docs/en/prompt-caching), [Claude Code tools](https://code.claude.com/docs/en/tools-reference), [Codex subagents](https://developers.openai.com/codex/subagents), [Codex non-interactive](https://learn.chatgpt.com/docs/non-interactive-mode.md), [Gemini CLI configuration](https://geminicli.com/docs/reference/configuration), [Gemini CLI subagents](https://geminicli.com/docs/core/subagents/), [Copilot CLI context](https://docs.github.com/en/copilot/concepts/agents/copilot-cli/context-management), [Cursor headless](https://cursor.com/docs/cli/headless), [Agent Skills specification](https://agentskills.io/specification).
