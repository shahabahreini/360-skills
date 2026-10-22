# Data profiles

These are starting profiles. Adapt each one to the concrete plan at commission time, following the [research protocol](../research-protocol.md). Every verified item carries a `checked` date, and each profile has a freshness class. Recheck a profile's items once its class window has passed.

## Data modeler

- Mandate: whether stored data stays correct, and keeps meaning the same thing, through every write, migration and rollback
- Mental models: invariants belong in the database when the database can enforce them; identity is separate from attributes, and natural keys change; every schema change is a two-version window (old code and new schema coexist); time is a dimension, so ask "true when?" as well as "true now?"
- Freshness: standard (12 months)

Methods:
- Invariant inventory with constraint placement: when the plan adds entities, relations or business rules · output each rule mapped to NOT NULL / CHECK / UNIQUE / FK / exclusion constraint / trigger / app code, with the reason for anything left in the app · fails when uniqueness is "checked" with a SELECT-then-INSERT race
- Expand-and-contract (parallel change) migration: when an existing column, table or type changes · output an ordered set of steps: expand, dual-write, backfill, switch reads, contract, each deployable and reversible · fails when expand and contract ship in one deploy, or rollback is never rehearsed
- Online DDL lock review: when a migration runs on a large or hot table · output each statement's lock level and duration, plus safe forms (`CREATE INDEX CONCURRENTLY`, `ADD CONSTRAINT ... NOT VALID` then `VALIDATE`, `lock_timeout`) · fails when it is tested only on an empty dev database
- Batched, idempotent, resumable backfill: when existing rows need new values · output a keyset-paginated job with a checkpoint, throttle and verification query · fails when one giant UPDATE bloats the table, holds locks, and cannot resume
- Access-pattern-driven indexing: when there are new queries or list endpoints · output query → index mapping, checked with EXPLAIN (ANALYZE, BUFFERS) on realistic volume · fails when every column gets its own index, or composite column order is ignored

Expert heuristics:
- Ask what a nullable column means. "Unknown", "not applicable" and "not yet" are three different states sharing one NULL
- Random UUIDv4 primary keys fragment B-tree indexes at scale. Time-ordered keys (UUIDv7, or bigint identity) keep inserts local
- Soft deletes quietly break unique constraints and FKs unless there are partial unique indexes and every read filters them out
- Money, quantities and timestamps need explicit types: `numeric` or minor units, `timestamptz` stored in UTC, never float, never local time without a zone

Anti-patterns to reject:
- Polymorphic FKs (`owner_type` + `owner_id`): the database cannot enforce the reference, and orphans pile up
- Using JSON columns to dodge schema design: invariants and indexes vanish, and every reader re-implements validation
- Down-migrations that drop data: a "rollback" that destroys the rows written since the deploy is not a rollback

Standards & references:
- PostgreSQL 18 documentation (current major 18, Sep 2025; 18.6 is the latest minor; 14–17 still supported): uses the deployed version's DDL lock levels and constraint features (checked 2026-10, https://www.postgresql.org/support/versioning/)
- RFC 9562, UUIDs (May 2024, obsoletes RFC 4122): prefer UUIDv7 for sortable keys; store as 128-bit binary (checked 2026-10, https://www.rfc-editor.org/rfc/rfc9562.html)
- The target database's official docs for its deployed version, for any engine other than PostgreSQL: verify each feature against that version, never against the latest release

Current practice:
- 2024: RFC 9562 standardized UUIDv7 and recommends it over v1/v6, which makes time-ordered UUIDs the default choice for distributed IDs (IETF, https://www.rfc-editor.org/rfc/rfc9562.html)
- 2025: PostgreSQL 18 added native `uuidv7()`, virtual generated columns (now the default), temporal `WITHOUT OVERLAPS` / `PERIOD` constraints, and OLD/NEW in RETURNING. Validity-period rules and audit capture can now live in the schema (PostgreSQL, https://www.postgresql.org/about/news/postgresql-18-released-3142/)

Instruments to look for: migration tools (Flyway, Liquibase, Alembic, Prisma Migrate, Rails migrations); migration linters (Squawk, strong_migrations); online schema change for MySQL (gh-ost, pt-online-schema-change); query analysis (EXPLAIN, pg_stat_statements); schema-diff tools (migra, Atlas). Discover these at runtime; never assume they are present.
Critique test seeds: Which invariant in <feature> is enforced only in application code, and what happens under two concurrent writes? · Can <migration> run while the previous app version is still serving traffic, and what locks does it take on <table>? · If <backfill> stops at 60%, how is it resumed or undone, and how do you prove it finished?
Innovation move: replace an application-level check for <rule> with a database constraint, added as NOT VALID and validated separately. Footprint: one migration, plus one error mapping in the data layer.

## API designer

- Mandate: whether the contract lets consumers integrate correctly, retry safely, and keep working while the API evolves
- Mental models: the contract is the product, and the implementation is a detail; every field you publish is forever (Hyrum's law); networks fail mid-request, so every write needs a defined retry story; errors are part of the interface, not an afterthought
- Freshness: standard (12 months)

Methods:
- Contract-first design with a machine-readable spec: when there are new or changed endpoints · output an OpenAPI document reviewed before any code, linted against a style guide · fails when the spec is generated after the fact and records accidents as the contract
- Breaking-change analysis: when any existing operation changes · output a spec diff classified as breaking or non-breaking (removed or renamed fields, new required inputs, narrowed enums, changed defaults) · fails when it ignores behavioral breaks such as ordering, pagination and error codes
- Idempotency and retry design for writes: when a POST or PATCH has side effects (payments, orders, messages) · output the idempotency-key scope, retention window, replayed-response semantics and conflict behavior · fails when the key is stored without a fingerprint of the request body, or replay returns a different status
- Error model with problem details (RFC 9457): when the plan adds failure modes · output a catalogue of `type` URIs with status, the cause, and the action the client should take · fails when every failure is a 400 or 500 with a free-text message
- Deprecation and sunset plan: when a version or field is retired · output a timeline with `Deprecation` and `Sunset` headers, a `deprecation` link to migration docs, and usage telemetry for each consumer · fails when no one can see who still calls the old path

Expert heuristics:
- Pagination is a contract. Offset paging breaks under concurrent inserts; cursor paging with an opaque token survives schema changes
- Clients will parse error strings unless you give them a stable `type` and machine-readable fields
- Ask what the client does on a timeout after it sent a write. Without idempotency the honest answer is "duplicate or give up"
- Adding a required request field, or a new enum value that clients switch on exhaustively, is breaking even if your spec diff tool says "minor"

Anti-patterns to reject:
- Exposing database rows as resources: the schema becomes the contract, and every migration is an API change
- A new endpoint for every UI screen: the surface multiplies, and the business rules fork across endpoints
- Versioning by URL on every change: consumers face constant migration. Evolve additively and version only real breaks

Standards & references:
- OpenAPI Specification 3.2.1 (10 Sep 2026; patch on 3.2.0, which added `$self`, a `querystring` location, QUERY and additional operations, and streaming/SSE media types): the contract format and tooling support level (checked 2026-10, https://spec.openapis.org/oas/latest.html)
- RFC 9457 Problem Details for HTTP APIs (Jul 2023, obsoletes RFC 7807; `application/problem+json`): the error shape (checked 2026-10, https://www.rfc-editor.org/rfc/rfc9457.html)
- RFC 9745 Deprecation header (Mar 2025) with RFC 8594 Sunset: machine-readable retirement signals; Sunset must not be earlier than Deprecation (checked 2026-10, https://www.rfc-editor.org/rfc/rfc9745.html)
- IETF Idempotency-Key header draft (draft-ietf-httpapi-idempotency-key-header-07, expired, not an RFC): use as a design reference only; do not claim it as a standard (checked 2026-10, https://datatracker.ietf.org/doc/draft-ietf-httpapi-idempotency-key-header/)

Current practice:
- 2025: RFC 9745 standardized the `Deprecation` header. Deprecation can now be signaled in-band, so clients and gateways can alert on it automatically (IETF, https://www.rfc-editor.org/rfc/rfc9745.html)
- 2025: OpenAPI 3.2 added first-class streaming (SSE, sequential media types) and the QUERY method, which covers APIs that previously needed out-of-spec workarounds (OpenAPI Initiative; 3.2.0 release date unverified, https://spec.openapis.org/oas/latest.html)
- 2026: Arazzo 1.1.0 (17 May 2026) describes multi-call workflows and dependencies, which makes it possible to test the API's documented sequences, not just single operations (OpenAPI Initiative, https://spec.openapis.org/arazzo/latest.html)

Instruments to look for: spec linters (Spectral, Redocly CLI); breaking-change diff (oasdiff, openapi-diff); contract testing (Pact, Schemathesis); mock servers (Prism); gateway analytics for per-consumer usage (Kong, an API gateway's logs). Discover these at runtime; never assume they are present.
Critique test seeds: Which change to <endpoint> breaks an existing consumer, including behavior the spec does not express? · If the client times out after sending <write>, what does a retry do, and what does it return? · Which error from <operation> leaves the caller unable to decide between retrying, fixing input, or escalating?
Innovation move: add a breaking-change gate in CI that diffs the spec against main. Footprint: one CI step with oasdiff or an equivalent, failing on breaking changes unless a version bump or deprecation entry comes with them.
