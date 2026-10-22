# Evidence, limitations, and optional techniques

Read only for a relevant technique or an evidence request. These sources support conditional techniques; they do not establish zero accuracy loss for every task or agent. Consult current host documentation before relying on a platform-specific control.

## Retrieval and compaction

Anthropic describes just-in-time retrieval using lightweight references and progressively loaded evidence. It also warns that aggressive compaction can lose subtle but critical context. Apply this as a reason to preserve exact constraints, evidence locations, uncertainty, and task state, then verify the handover against original inputs. Mandatory instructions and required inputs still need full reads. [Effective context engineering for AI agents](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents).

A summary is useful only when enough original evidence remains recoverable for the next decision. If retrieval is unavailable, retaining fuller context is safer than assuming a summary is sufficient. Check pagination and truncation before concluding that a search covered everything.

## Tool discovery and programmatic processing

Anthropic describes deferred tool discovery and programmatic tool calling, including filtering tool results before they reach model context. These techniques depend on host support; a skill cannot create those capabilities by instruction. Count discovery and execution overhead, and retain source identifiers and completeness checks when filtering. [Introducing advanced tool use](https://www.anthropic.com/engineering/advanced-tool-use).

## Caching

Google documents explicit and implicit context caching, model-dependent eligibility, and cache usage metadata. Cached content still forms part of the model's input context; pricing and reuse differ from removing input. Verify exposed controls and current usage metadata instead of assuming a cache hit. Report cached tokens separately from total input tokens, processing cost, and latency. [Gemini context caching](https://ai.google.dev/gemini-api/docs/caching).

Changing cache settings is optional and remains subject to host permissions and task authorization. Do not change agent configuration for this overlay.

## Cost mechanics across providers

Checked 2026-10-21; prices and lifetimes change, so recheck before quoting numbers.

- Every agent turn re-sends the whole history. Cached reads cost roughly 0.025–0.1× input; cache writes cost about 1.25–2.5× input on providers that bill them. A turn after an idle gap longer than the cache lifetime reprocesses everything. [Claude Code costs](https://code.claude.com/docs/en/costs), [Anthropic prompt caching](https://platform.claude.com/docs/en/build-with-claude/prompt-caching), [OpenAI prompt caching](https://developers.openai.com/api/docs/guides/prompt-caching), [Gemini caching](https://ai.google.dev/gemini-api/docs/caching)
- Output costs about 3–8× input. Reasoning tokens bill as output, and on some newer models earlier reasoning stays in context and is re-read as input. [Anthropic extended thinking](https://platform.claude.com/docs/en/build-with-claude/extended-thinking), [OpenAI reasoning](https://developers.openai.com/api/docs/guides/reasoning)
- Caches match exact prefixes. Changing tools, model, effort or thinking settings, or editing earlier messages, invalidates them
- Agents use about 4× the tokens of chat and multi-agent systems about 15×; most coding work has little truly parallel structure. [Multi-agent research system](https://www.anthropic.com/engineering/multi-agent-research-system)
- Deferred tool loading cut tool tokens by about 85%; batching 20 calls in code cut tokens by about 37%. [Advanced tool use](https://www.anthropic.com/engineering/advanced-tool-use)
- Clearing old tool results cut tokens by about 84% in one internal evaluation. Treat it as potentially lossy. [Context management](https://claude.com/blog/context-management)

## Measured example: display isolation versus inline work

A 6-task coding plan was run headless on one host and model with identical inputs and acceptance checks. All runs passed every check. Treat this as an example, not a general result.

| Setup | Runs | Cost per run | Notes |
|---|---|---|---|
| Single agent, inline | 4 | $0.44–0.77, mean $0.55 | Edits and commands visible |
| Background executor plus a main thread woken per status event | 2 | $1.13–1.26 | 12 wakes, chat narration on each |
| Same, waking only on final statuses and with one status line per wake | 3 | $0.90–0.97, mean $0.94 | Clean screen; about 1.7× inline |
| Lighter session model told to use the detached design | 4 | $0.017–0.036 | Ignored the design and worked inline |

Observed: each subagent start-up cost about 46k tokens of fixed context, and each main-thread wake re-read about 35–45k cached tokens. Wake count and cache lifetime drove most of the difference.

## Learned compression

LLMLingua-2 learns token retention using distilled data and reports evaluations across selected tasks and models. Those benchmarks do not prove losslessness for arbitrary requirements or unseen tasks. Treat learned token removal as potentially lossy: obtain separate approval for the technique, a task-specific metric, and a tolerance; preserve original inputs, compare against the ordinary workflow, and restore on failure. [LLMLingua-2 research](https://arxiv.org/abs/2403.12968).

Do not use an aggregate score to excuse a lost exact value, citation, authorization boundary, or mandatory acceptance criterion.

## Delegation and comparisons

Delegate only within permissions and when independent work justifies the extra context and coordination. Small tasks can cost more with multiple agents. Include parent and worker usage, skill loading, tool calls, summaries, retries, and coordination when telemetry exists.

A useful comparison records:

- Same task inputs, acceptance checks, host/model settings, and tool access
- Baseline and overlay outputs, evidence, acceptance results, and observed regressions
- Observed input/output tokens, cache usage, cost and elapsed time, with unavailable metrics explicitly marked
- All available overhead; no assumed free summarization, discovery, retries, or delegation
- Run count and variation; no extrapolation to universal accuracy or savings

A manual or scripted walkthrough can expose instruction defects. It is not a measured model benchmark. Artifact byte or word counts measure document size, not billed tokens or task-level savings.
