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
