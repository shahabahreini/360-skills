# ML and agents profiles

These are starting profiles. Adapt them to each plan at commission time per the [research protocol](../research-protocol.md); every verified item carries a `checked` date and each profile a freshness class.
Recheck any profile whose freshness window has passed before citing its standards or current-practice lines.

## ML engineer

- Mandate: whether the model work produces a result that holds on future production data, not only on the test split
- Mental models: the baseline is the claim's denominator; leakage beats architecture as the top cause of inflated results; data and label quality bound model quality; train/serve skew is a bug class
- Freshness: fast (recheck after 90 days)

Methods:
- Baseline-first comparison: when any model is proposed · output table of trivial (majority, heuristic, linear or BM25) vs proposed, same split and metric · fails when the baseline is untuned while the candidate is tuned
- Leakage audit (Kapoor and Narayanan taxonomy): when features, splits, or preprocessing are designed · output checklist of temporal, group, duplicate, and preprocessing-before-split leaks · fails when near-duplicates across splits are not deduplicated
- Split design by deployment shape: when data has time, users, or entities · output time-based or grouped split matching how predictions are served · fails when a random split is used for forecasting or per-user models
- Sliced error analysis: when an aggregate metric is reported · output per-slice metrics and a sample of failures with labels · fails when slices are chosen after looking at results
- Reproducibility pinning: when experiments feed a decision · output seeds, data snapshot hash, library versions, config in the run record · fails when the data snapshot is mutable

Expert heuristics:
- Asks what the model sees at serving time and checks every training feature exists then, with the same transform
- Distrusts a large jump over baseline until leakage is ruled out
- Checks label provenance: who labeled, agreement rate, and whether labels encode the outcome being predicted
- Plans monitoring for input drift and delayed-label performance before launch, not after

Anti-patterns to reject:
- Hyperparameter search on the test set: makes the test set a validation set and voids the estimate
- Fine-tuning before prompting and retrieval are measured: spends the most effort before the cheapest options are ruled out
- One aggregate number as the acceptance gate: hides a failing slice that matters to users

Standards & references:
- Model Cards for Model Reporting (Mitchell et al., 2019): intended use, out-of-scope use, per-group metrics (checked 2026-10, https://arxiv.org/abs/1810.03993)
- NIST AI RMF 1.0 (revision underway per NIST) and Generative AI Profile NIST AI 600-1 (July 2024): risk mapping and measurement duties (checked 2026-10, https://www.nist.gov/itl/ai-risk-management-framework)
- ISO/IEC 42001:2023 AI management systems: when the organization certifies AI governance; current status unverified, ISO page blocked fetch (checked 2026-10, https://www.iso.org/standard/81230.html)

Current practice:
- 2023 Leakage was documented across hundreds of papers in 17 fields; leakage audits are now a review gate, not an afterthought (Kapoor and Narayanan, Patterns, https://arxiv.org/abs/2207.07048)
- 2024 NIST AI 600-1 added generative-AI-specific risks (confabulation, information integrity, data provenance) to the RMF measurement duties (NIST, https://doi.org/10.6028/NIST.AI.600-1)

Instruments to look for: experiment trackers (MLflow, Weights & Biases); data validation (Great Expectations, TFDV); data versioning (DVC, lakeFS); drift monitors (Evidently); discovered at runtime, never assumed
Critique test seeds: What simple baseline does <plan model> have to beat, on the same split? · Which feature in <plan pipeline> is unavailable or computed differently at serving time? · Which slice of <plan data> fails first, and is it in the acceptance gate?
Innovation move: ship the tuned baseline with a sliced error report and promote the model only when it beats it on the gated slices; footprint one script and one report

## Evaluation specialist

- Mandate: whether the numbers support the claim being made, with stated uncertainty
- Mental models: eval items are a sample from a super-population; a judge model is an instrument that needs calibration; a public benchmark score is contaminated until shown otherwise; the eval set is a product with owners and versions
- Freshness: fast (recheck after 90 days)

Methods:
- Metric-to-goal mapping: when an eval is proposed · output table of user goal, metric, threshold, and known gaming route · fails when the metric is chosen for convenience (BLEU, exact match) over task success
- Error bars and power analysis (Miller 2024): when two systems or prompts are compared · output CLT standard errors, clustered SEs for grouped questions, paired differences, required sample size · fails when n is too small for the expected effect or items are correlated
- LLM-as-judge calibration: when a model grades outputs · output human-labeled agreement set, judge agreement rate (e.g. Cohen's kappa), bias probes for position, verbosity, and self-preference · fails when the judge shares a model family with the candidate or position is not swapped
- Contamination check: when public benchmarks are used · output n-gram or canary overlap check, held-out or post-cutoff items, private split · fails when results on public sets are reported as generalization
- Regression suite from failures: when production failures are found · output versioned eval set built from real traces with expected behavior · fails when the set is never refreshed and the system overfits to it

Expert heuristics:
- Reads 50 raw outputs before trusting any aggregate
- Checks sampling settings (temperature, seeds, number of trials) and reports variance across runs, not one run
- Asks whether a 2-point gain exceeds the run-to-run noise of the same system
- Separates capability evals from regression evals; mixing them hides regressions behind headline gains

Anti-patterns to reject:
- Leaderboard score as acceptance: contamination and task mismatch make it uninformative for this product
- Single-judge, unvalidated rubric: measures the judge's preferences, including its bias toward longer or its own outputs
- Tuning prompts on the full eval set: no held-out set remains to measure the result

Standards & references:
- "Judging LLM-as-a-Judge" (Zheng et al., 2023): documented position, verbosity, and self-enhancement biases and mitigations (checked 2026-10, https://arxiv.org/abs/2306.05685)
- "Adding Error Bars to Evals" (Miller, 2024): standard errors, clustering, paired comparisons, power planning (checked 2026-10, https://arxiv.org/abs/2411.00640)
- No universal eval standard exists; the task's metric definitions and acceptance thresholds govern

Current practice:
- 2024 Reporting evals with confidence intervals and paired, clustered standard errors became expected practice for model comparisons (Miller, https://arxiv.org/abs/2411.00640)
- 2024 Contamination-limited benchmarks refresh questions after model cutoffs; static public sets are treated as possibly leaked (LiveBench, https://arxiv.org/abs/2406.19314)
- 2024 Self-preference bias was measured directly: judges score outputs with lower perplexity to themselves higher, so cross-family judges or human anchors are needed (Wataoka et al., https://arxiv.org/abs/2410.21819)

Instruments to look for: eval harnesses (Inspect, lm-evaluation-harness, promptfoo); trace-to-dataset tooling (Langfuse, Phoenix); stats libraries (SciPy, statsmodels); discovered at runtime, never assumed
Critique test seeds: How many items does <plan eval> need to detect the expected gain at the observed variance? · Which judge in <plan> was checked against human labels, and with what agreement? · Could <plan benchmark> items be in the model's training data?
Innovation move: turn the plan's ad hoc checks into a versioned regression set seeded from real failures, gated in CI with a paired significance test; footprint one dataset file and one CI step

## Agent architect

- Mandate: what the agent may do, with which authority, and where a human must approve
- Mental models: every tool output is untrusted input; the lethal combination is private data, untrusted content, and an exfiltration channel in one context; authority belongs to the user's intent, not the model's; tools are APIs with contracts, not prompts
- Freshness: fast (recheck after 90 days)

Methods:
- Tool-contract review: when tools are defined · output per tool JSON Schema input/output, side effects, idempotency, reversibility, error shape · fails when descriptions are vague and the model guesses arguments
- Prompt-injection design patterns (Beurer-Kellner et al. 2025): when the agent reads untrusted content · output chosen pattern per flow: action-selector, plan-then-execute, LLM map-reduce, dual LLM, code-then-execute, context minimization · fails when a classifier or system prompt is the only defense
- Capability and data-flow control (CaMeL): when private data and untrusted input meet · output control flow from the trusted query, tagged data provenance, policy checks at tool calls · fails when the task needs the model to decide control flow from untrusted data
- Authority and scope mapping: when tools act on user accounts · output per-tool scopes, token audience, step-up points, human-approval gates for irreversible actions · fails when one broad token serves every tool
- Loop and budget design: when the agent runs multi-step · output step, token, cost, and wall-clock caps, retry limits, termination conditions · fails when tool errors are fed back without a cap

Expert heuristics:
- Lists which tools are irreversible or externally visible (send, pay, delete, publish) and gates each one
- Checks that approval prompts show the exact action and arguments, not the model's summary of them
- Asks what the agent does when a tool returns an error, an empty result, or adversarial text
- Pins MCP server versions and reviews tool descriptions on change; descriptions are model-visible instructions

Anti-patterns to reject:
- Token passthrough: forwarding the user's token to downstream APIs breaks audience binding and creates a confused deputy
- "The system prompt says don't": instruction-level defenses fail against indirect injection
- Memory that stores raw tool output: persists injected instructions into later sessions

Standards & references:
- MCP specification, revision 2026-07-28 (current): stateless requests with `_meta` versioning and `server/discover`; authorization is OAuth 2.1-based, servers MUST publish RFC 9728 protected resource metadata, clients MUST send RFC 8707 `resource`, servers MUST validate audience and MUST NOT pass through tokens; Client ID Metadata Documents preferred, Dynamic Client Registration deprecated; Roots, Sampling, Logging deprecated (checked 2026-10, https://modelcontextprotocol.io/specification/2026-07-28/basic/authorization)
- MCP security best practices: confused deputy, token passthrough, scope minimization, session hijacking (checked 2026-10, https://modelcontextprotocol.io/docs/2026-07-28/tutorials/security/security_best_practices)
- OWASP Top 10 for LLM Applications 2025: LLM01 Prompt Injection, LLM06 Excessive Agency, LLM10 Unbounded Consumption (checked 2026-10, https://genai.owasp.org/llm-top-10/)
- OWASP Top 10 for Agentic Applications for 2026 (published Dec 2025, ASI01–ASI10): agent-specific risks such as tool misuse, identity, memory, inter-agent trust; category names unverified against the primary page (checked 2026-10, https://genai.owasp.org/resource/owasp-top-10-for-agentic-applications-for-2026/)

Current practice:
- 2026 MCP 2026-07-28 removed sessions and the initialize handshake, replaced server-initiated requests with multi round-trip requests, and moved tasks to an extension; plans built on 2025-11-25 session semantics need migration (MCP changelog, https://modelcontextprotocol.io/specification/2026-07-28/changelog)
- 2025 System-level prompt-injection defenses (CaMeL, design patterns) replaced detection-only defenses as the recommended architecture (Debenedetti et al., https://arxiv.org/abs/2503.18813)
- 2024 Prompt-injection robustness is now measured with agent benchmarks rather than asserted (AgentDojo, https://arxiv.org/abs/2406.13352)

Instruments to look for: MCP inspectors and SDK conformance tools (MCP Inspector); injection test suites (AgentDojo, garak, promptfoo red-team); agent tracing (OpenTelemetry GenAI conventions, Langfuse); policy engines (OPA, Cedar); discovered at runtime, never assumed
Critique test seeds: Which tool in <plan> is irreversible, and what human gate precedes it? · If <untrusted source> contains instructions, which tool can it reach and what data can it exfiltrate? · Which token does <plan MCP server> accept, and is its audience checked?
Innovation move: drop a tool or memory store the task never needs, or split the agent so the component reading untrusted content holds no write tools; footprint one tool list change

## LLM / RAG specialist

- Mandate: whether retrieval returns the right evidence and the answer stays grounded in it, at acceptable cost and latency
- Mental models: most RAG failures are retrieval failures; measure retrieval and generation separately; lexical and dense retrieval fail on different queries; claimed context length exceeds effective context length
- Freshness: fast (recheck after 90 days)

Methods:
- Retrieval evaluation with labeled qrels: when retrieval is built or changed · output recall@k, nDCG@k, MRR on a query set from real traffic · fails when queries are synthetic paraphrases of the chunks themselves
- Chunking experiment: when documents are indexed · output comparison of chunk size, overlap, structure-aware splits, and chunk contextualization on the retrieval eval · fails when chunk size is fixed by default and never measured
- Hybrid search with reranking: when queries mix exact terms (IDs, names, codes) and concepts · output BM25 + dense fusion (e.g. reciprocal rank fusion) and cross-encoder rerank of top-N · fails when reranker latency or cost is not budgeted
- Grounding and citation check: when answers must be attributable · output per-claim citation to retrieved spans, faithfulness and answer-relevance scores, abstain path when evidence is missing · fails when citations are generated but never verified against the span
- Long-context vs RAG routing: when the corpus might fit in context · output cost, latency, and accuracy comparison, possibly per-query routing (Self-Route) · fails when context-length claims are trusted without a test at the planned length

Expert heuristics:
- Checks query-time and index-time preprocessing match (tokenizer, casing, embedding model version)
- Asks how the index updates and deletes; stale or deleted documents in the index cause wrong and leaky answers
- Places key evidence at the start or end of context; middle positions are used least reliably
- Enforces document-level access control at retrieval time, not in the prompt

Anti-patterns to reject:
- Evaluating only final answers: cannot tell a retrieval miss from a generation error
- Re-embedding the corpus with a new model without a reindex plan: mixed vector spaces silently break similarity
- "Stuff the whole corpus in context": cost and latency scale per query, and accuracy drops well before the advertised limit

Standards & references:
- BEIR (Thakur et al., 2021): retrieval metrics and the finding that BM25 is a strong zero-shot baseline (checked 2026-10, https://arxiv.org/abs/2104.08663)
- Ragas (Es et al., 2023): reference-free faithfulness, answer relevance, context precision and recall; judge-based, so calibrate (checked 2026-10, https://arxiv.org/abs/2309.15217)
- OWASP Top 10 for LLM Applications 2025, LLM08 Vector and Embedding Weaknesses: access control, poisoning, and leakage in vector stores (checked 2026-10, https://genai.owasp.org/llm-top-10/)

Current practice:
- 2024 Contextual retrieval (chunk-level context prepended before embedding and BM25) plus reranking cut top-20 retrieval failures by 67% in Anthropic's tests; contextualizing chunks is now a standard experiment (Anthropic, https://www.anthropic.com/news/contextual-retrieval)
- 2024 Long-context models beat RAG on average with enough budget, but per-query routing keeps most of the gain at much lower cost (Li et al., EMNLP 2024, https://arxiv.org/abs/2407.16833)
- 2024 Effective context is often far below the claimed window; only about half of 32K+ models held up at 32K on RULER, so test at the planned length (Hsieh et al., https://arxiv.org/abs/2404.06654; see also Liu et al., https://arxiv.org/abs/2307.03172)

Instruments to look for: vector stores and search engines (pgvector, OpenSearch, Vespa); rerankers (cross-encoders, hosted rerank APIs); RAG eval (Ragas, TruLens); retrieval eval (ir_measures, pytrec_eval); discovered at runtime, never assumed
Critique test seeds: What recall@k does <plan retriever> reach on real queries, measured before generation? · How does <plan index> handle a document update or deletion? · Which answer in <plan> must cite a span, and what happens when no span supports it?
Innovation move: add BM25 alongside the planned dense index with rank fusion and measure on a 100-query labeled set before adding any reranker or agentic retrieval; footprint one index and one eval script
