# Suspect patterns

Read after the stack inventory exists. Each row is a suspect to confirm on this code, never a prescription. Anything that survives still passes Verify Before You Claim and the Zero-Cost Gate. Version and default facts were checked on 2026-10-27 and change fast: re-check them against the project's pins before relying on one.

Columns: what to suspect, how to confirm it here, the usual better form, and the trap that makes the better form wrong.

## Build, compile and link

| Suspect | Confirm | Better form | Trap |
|---|---|---|---|
| Dependencies unoptimized in dev and test builds | Dev profile has no per-dependency override; image, codec, DB or crypto work is slow in debug | Optimize dependencies only (Rust: `[profile.dev.package."*"] opt-level = 2`); keep own code at 0 | Larger first build and target dir; own crates at high opt slow incremental builds |
| Release LTO or codegen settings chosen for link speed | Profile changed toward `thin` or more codegen units | Keep runtime-optimal settings for shipped artifacts | Link time is a developer cost; runtime is the user's |
| Linker swap (lld, mold, wild) | Check the pinned toolchain's default linker per target | Only where the default is slow and the target is supported | Recent toolchains already default to a fast linker on some targets (Rust 1.90+ on x86_64 Linux); C++/CUDA/MSVC links are fragile |
| Strip or debug-info settings | Read the profile and the toolchain default | Leave defaults unless size is the axis | Cargo already strips debuginfo in release by default (1.77+); stripping symbols breaks backtraces |
| Duplicate versions of one package | `cargo tree -d`, `pnpm why`, `npm ls --all` | Align to the version a major dependency already uses | API changes across major versions |
| Slimmed feature lists | Declared `default-features = false` | Treat as cosmetic unless the graph confirms it | Feature unification re-enables what another dependency asks for |

## Typecheck, test, lint, format and CI

| Suspect | Confirm | Better form | Trap |
|---|---|---|---|
| CI skips a suite | Compare CI steps with the test scripts | Run every suite in CI | Suites never run may already fail; fix them first |
| Typecheck recomputed from scratch | No incremental or build-info setting | Per-package incremental build info | One shared build-info path across packages collides |
| Serial test runner | One test binary or file at a time | A parallel runner (for example cargo-nextest) | Some runners skip doctests; run those separately |
| Test DOM environment swap | Tests stub canvas, media queries, storage, observers | Keep the environment unless a trial run passes | Faster DOM shims lack APIs the stubs depend on |
| Hook formats the whole tree | Pre-commit runs a workspace-wide formatter | Format staged files only | Formatter edition or config must match the project |
| Formatter or linter swap for speed | Current tool already runs on staged files only | Keep the current tool | A new formatter reformats the whole repository |
| Extra lint plugins | Try them on a scratch config first | Enable only rules that find real defects here | Plugins with category-gated rules add nothing when the category is off |

## Runtime libraries

| Suspect | Confirm | Better form | Trap |
|---|---|---|---|
| Faster hash algorithm | Where are the digests stored, compared or shared? | Only for internal, non-persisted keys | Stored manifests, exports and teammates' files need the same algorithm |
| "Enable SIMD or asm" feature | Does the library detect CPU features at runtime? | Usually nothing to do | Many crypto and codec libraries already dispatch at runtime |
| Faster compression backend | Resolve the effective backend through the feature graph | Pin it explicitly only if the wrong one is active | Unification may already select the fast backend; the suggested feature name may not exist in the pinned version |
| Faster codec or resizer | Time decode, transform and encode separately | Target the dominant part | Ceiling: if resize is 20% of the time, a perfect resizer gives 1.25×. Model or format parity may require the exact filter |
| C or system dependency for speed | Count the targets and build systems it adds | Pure-language alternatives already in the tree | Cross-platform builds, toolchains and licenses |

## Collections and hot loops

| Suspect | Confirm | Better form | Trap |
|---|---|---|---|
| DoS-resistant hashing on internal integer keys | Hot map keyed by coordinates or ids | A fast non-cryptographic hasher | Keep the safe hasher for untrusted keys |
| Per-item lookup or write where runs fit | Inner loop calls set or get per pixel or per item | Accumulate runs or batches and write them once | Every incremental counter or invariant must stay correct; prove pixel or row equality |
| Per-element (de)serialization | Loop over each number or record | Pre-sized buffers and bulk conversion | Endianness and alignment; pin the byte layout with a test |
| A string allocated per record | `to_string` then copy | Serialize straight into the output buffer | Output bytes must stay identical |

## I/O and persistence

| Suspect | Confirm | Better form | Trap |
|---|---|---|---|
| Whole-file read just to validate | Read, then check a header or trailer | Read only the bytes the check needs | Keep the same validity rule |
| Metadata writes on read paths | Mtime or access-time updates on cache hits | Track recency in memory | Something else may read that metadata across restarts |
| Stat of every entry under a lock, per call | Directory walk or `is_file` sweep in a hot path | Rescan on first use and every N writes; drop vanished entries when found | Externally deleted files must still be handled |
| fsync on data that can be regenerated | Atomic-write helper with fsync used for a cache | Temp file and rename without fsync, plus validation on read | Never for authoritative data |
| Unbuffered writer | Many small writes to a file handle | A large buffered writer | Flush and check errors before declaring success |
| Read whole, then write | Load a file into memory before copying it into an archive or stream | Stream with a fixed buffer | Large entries may need format flags (for example ZIP64) |
| Orphaned temp files | Temp names counted toward cache size | Remove old ones during a rescan | Fresh ones may be writes in flight |
| Copy instead of clone | Plain file copy on the same volume | Usually nothing | The OS or standard library may already clone or reflink |
| Read-back verify after write | Checksum of the file just written | Keep it | It is often a documented durability guarantee |

## Databases

| Suspect | Confirm | Better form | Trap |
|---|---|---|---|
| Connection opened per call | Open plus setup pragmas in every method | One connection per call path first; pool only if measured | Shared connections need thread rules |
| Statement re-prepared in loops | Execute with SQL text inside a loop | Cached prepared statements | None notable |
| Related reads outside one transaction | Page, count and version read separately or on two connections | One read transaction | A real inconsistency is a correctness bug: hand it off |
| Bulk build with full durability | Disposable build file with journaling and full sync | No journal and no sync for the build file; durable publish | Only for files that are rebuilt on failure |
| Indexes maintained during bulk insert | Indexes created before the load | Create secondary indexes after the load | Uniqueness checks the load relies on |
| Sidecar files left on a file swap | WAL or shared-memory files keep the old name | Move or remove them with the old file | Open readers on some platforms |
| Unordered writes after a lock is released | Upserts without a version guard | Decide ordering at the caller first | A guard on one table can desynchronize related tables |

## Concurrency

| Suspect | Confirm | Better form | Trap |
|---|---|---|---|
| Sequential I/O-bound loop | Per-file hash, header read or copy in a loop | A few scoped workers (about four), results applied by position | A global pool competes with the app's own schedulers |
| Parallel loop that changes observable order | Ids, diagnostics or progress built inside workers | Parallel prefetch, then sequential in-order assembly | Progress counts and prompt cancellation must stay the same |

## Frontend runtime

| Suspect | Confirm | Better form | Trap |
|---|---|---|---|
| Re-render compiler or memo sweep | A profiler shows cascading re-renders on a hot interaction | Targeted memoization or a trial on one component | Ref- and mutation-heavy components can break; unmeasured gains |

## Resolve effective state

| Ecosystem | Versions and graph | Duplicates | Features or extras | Defaults |
|---|---|---|---|---|
| Rust | `cargo tree`, `Cargo.lock` | `cargo tree -d` | `cargo tree -e features -i <crate>`; read the crate's manifest in the local registry | Toolchain pin file; profile defaults for that Cargo version |
| Node | lockfile, `pnpm why <pkg>`, `npm ls <pkg>` | `npm ls --all`, `pnpm dedupe --check` | Package `exports` and peer dependencies | Tool configs and their versioned docs |
| Python | `pip show`, `pipdeptree` | `pipdeptree --warn` | Extras in the lock or metadata | Interpreter and wheel build flags |
| Go | `go mod graph`, `go list -m all` | `go mod why` | Build tags | `go env` |
| JVM | `mvn dependency:tree`, `gradle dependencies` | Conflict resolution report | Profiles and classifiers | JVM flags in launch scripts |

For CI, read the workflow files and list the commands each job really runs.
