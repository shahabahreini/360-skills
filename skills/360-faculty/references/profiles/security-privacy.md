# Security and privacy profiles

Starting profiles for security and privacy seats, adapted to the concrete plan at commission time per the [research protocol](../research-protocol.md).
Each item carries a `checked` date and each profile a freshness class; recheck sources once the class window has passed.

## Application-security engineer

- Mandate: which threats this design must stop, and which control stops each one
- Mental models: trust boundaries, not components, are where bugs live; attacker cost vs defender cost; authorization is per object and per action, not per route; every parser is an attack surface
- Freshness: standard (12 months)

Methods:
- STRIDE threat modeling on a data-flow diagram: when a new component, boundary, or data flow is planned · output DFD with threats per boundary crossing and an owner per mitigation · fails when run once on the whole system at box level and never revisited per change
- Abuse-case and misuse-story writing: when user stories exist for the feature · output "as an attacker I…" cases with acceptance checks · fails when cases restate OWASP categories instead of this feature's flows
- Authorization matrix (role × object × action): when multi-tenant data or role-based access is in scope · output matrix plus one negative test per denied cell · fails when only routes are checked and object ownership (IDOR/BOLA) is not
- ASVS-level selection and requirement mapping: when the plan needs security acceptance criteria · output chosen level (L1–L3) with requirement IDs mapped to tasks · fails when the whole standard is pasted in without scoping
- Secret-lifecycle review: when credentials, keys, or tokens are created or consumed · output inventory of each secret's issuer, storage, rotation, and revocation path · fails when only storage is reviewed and rotation is never rehearsed

Expert heuristics:
- Error and exception paths fail open more often than happy paths; check what a failed authz lookup, timeout, or parse error returns
- Server-side request features (webhooks, URL previews, importers) are SSRF entry points even when nobody calls them "fetch"
- A new admin, debug, or internal endpoint is the likeliest unauthenticated surface in any plan
- Mass assignment hides in "update profile" endpoints that bind the whole request body to the model

Anti-patterns to reject:
- Client-side or UI-only authorization: any caller bypasses it with a direct request
- Denylist input filtering in place of context-correct output encoding or parameterized queries: encodings and new syntaxes evade it
- "We'll add a WAF": it masks one payload class while the flaw stays in the code

Standards & references:
- OWASP ASVS 5.0.0 (May 2025): pick a level and map requirement IDs to acceptance checks; v4 IDs changed, so remap old references (checked 2026-10, https://github.com/OWASP/ASVS)
- OWASP Top 10:2025: coverage of A01 Broken Access Control, new A03 Software Supply Chain Failures, and new A10 Mishandling of Exceptional Conditions (checked 2026-10, https://owasp.org/Top10/2025/)
- OWASP Cheat Sheet Series: per-topic implementation detail (authz, SSRF, deserialization) (checked 2026-10, https://cheatsheetseries.owasp.org/)

Current practice:
- 2025 OWASP Top 10 added mishandled exceptional conditions as its own category, making fail-open error paths a first-class review item (OWASP Top 10:2025, https://owasp.org/Top10/2025/)
- 2025 ASVS 5.0 restructured into 17 chapters and requires documented security decisions, so plans should record which controls were chosen and why (OWASP ASVS, https://github.com/OWASP/ASVS)
- 2024 vendors pledged to Secure by Design goals (MFA by default, eliminating vulnerability classes, publishing CVEs), shifting expectation from patching to class elimination (CISA Secure by Design Pledge, https://www.cisa.gov/securebydesign/pledge)

Instruments to look for: SAST (Semgrep, CodeQL); DAST (OWASP ZAP); secret scanning (gitleaks, GitHub secret scanning); dependency/SCA scanners (OSV-Scanner, Dependabot); existing threat models or security tests in the repo
Critique test seeds: Which boundary crossing in this plan has no named control? · What does the new endpoint return when the authorization lookup fails or times out? · Which object ID in this plan can a user of tenant A send to reach tenant B's data?
Innovation move: remove an entry point (merge or delete an endpoint, drop a parser) instead of guarding it; footprint is one deletion plus one negative test

## Privacy engineer

- Mandate: what personal data is collected, for which purpose, where it flows, and when it is gone
- Mental models: purpose limitation, every field needs a named use; data you never collect cannot leak; linkability is a harm even without names; deletion is a distributed-systems problem
- Freshness: fast (recheck after 90 days; state laws and enforcement move quickly)

Methods:
- Data inventory and flow map (record of processing): when the plan adds a field, store, event, or third party · output table of field, purpose, lawful basis, location, recipients, retention · fails when logs, analytics events, backups, and caches are left off
- LINDDUN threat modeling (or LINDDUN GO cards for speed): when a DFD exists or is being drawn · output privacy threats per element across linking, identifying, non-repudiation, detecting, data disclosure, unawareness/unintervenability, non-compliance · fails when reduced to a confidentiality review
- Data minimization and pseudonymization review: when a feature collects or exports personal data · output per-field keep/drop/coarsen/tokenize decision · fails when hashing low-entropy identifiers (emails, phones) is treated as anonymization
- Deletion and retention design: when data subject rights or retention limits apply · output deletion fan-out map covering primaries, replicas, search indexes, warehouses, logs, backups, processors · fails when backups are ignored instead of given a documented expiry
- Consent and opt-out signal handling: when tracking, ads, or data sharing exists · output consent state model honoring Global Privacy Control · fails when the signal is read client-side only and server pipelines still share

Expert heuristics:
- Free-text fields, URLs with query strings, and error logs are where unplanned personal data accumulates
- A "user ID" joined with timestamps and coarse location is often re-identifying on its own
- Third-party SDKs and tag managers send data the team never listed; diff network calls, not the vendor's docs
- Deletion requests fail silently in derived stores built after the deletion job was written

Anti-patterns to reject:
- "Collect now, decide use later": no stated purpose means no lawful basis under GDPR-style regimes and a larger breach
- Soft-delete flags presented as deletion: data persists and remains discoverable
- Production data copied into test or analytics environments without masking: widens access and breaks retention promises

Standards & references:
- LINDDUN privacy threat modeling framework (KU Leuven; listed as a NIST Privacy Framework resource): structure for privacy threat elicitation (unverified @ 2026-10, cited not opened; https://linddun.org/)
- NIST Privacy Framework 1.0; 1.1 initial public draft April 2025, final status unverified: map privacy risk outcomes to plan tasks (checked 2026-10, https://www.nist.gov/privacy-framework)
- GDPR (Regulation (EU) 2016/679) Arts. 5, 17, 25, 35: minimization, erasure, privacy by design, DPIA triggers (unverified @ 2026-10, cited not opened; https://eur-lex.europa.eu/eli/reg/2016/679/oj)
- Global Privacy Control specification: opt-out signal format (`Sec-GPC`, `navigator.globalPrivacyControl`); W3C track status unverified (unverified @ 2026-10, cited not opened; https://globalprivacycontrol.org/)

Current practice:
- 2025 California, Colorado, and Connecticut regulators ran a joint sweep against businesses ignoring GPC, making server-side honoring of the signal an enforced requirement (CPPA announcement, https://cppa.ca.gov/announcements/2025/20250909.html)
- 2025 NIST released Privacy Framework 1.1 draft realigned with CSF 2.0 and adding AI privacy risk (NIST, https://www.nist.gov/news-events/news/2025/04/nist-updates-privacy-framework-tying-it-recent-cybersecurity-guidelines)

Instruments to look for: data discovery/classification scanners (cloud DLP services, Presidio); consent management platforms; network inspection of client SDK traffic (browser devtools, mitmproxy); existing records of processing or DPIAs
Critique test seeds: Which field in this plan has no stated purpose or retention period? · Which stores, logs, and processors does a deletion request in this plan fail to reach? · What happens downstream in this plan when a request arrives with `Sec-GPC: 1`?
Innovation move: drop or coarsen a collected field (exact birthdate to age band, GPS to region) instead of protecting it; footprint is a schema change plus one removed flow

## Identity / auth specialist

- Mandate: how users and services prove who they are, how that proof is carried in sessions and tokens, and how it is recovered or revoked
- Mental models: assurance level is set by the weakest path, including recovery; phishing resistance comes from origin binding, not more factors; tokens are bearer cash unless sender-constrained; sessions need a server-side kill switch
- Freshness: fast (recheck after 90 days; OAuth 2.1 and passkey ecosystems are moving)

Methods:
- Authentication journey mapping including recovery and fallback: when sign-up, sign-in, MFA, or account recovery changes · output every path to an authenticated session with its assurance level · fails when recovery (email link, SMS, support desk) is left at lower assurance than sign-in
- Passkey (WebAuthn) ceremony review: when passkeys are planned · output decisions on RP ID, user verification, discoverable credentials, synced vs device-bound, attestation policy, and fallback · fails when passkeys are added beside a phishable password path that stays primary
- OAuth/OIDC flow review against RFC 9700: when delegated auth, SSO, or an API client is in scope · output flow choice (authorization code + PKCE), redirect URI exact matching, token lifetimes, refresh rotation, sender-constraining (DPoP or mTLS) where needed · fails when implicit or resource-owner password flows survive "for legacy"
- Session lifecycle design: when sessions or tokens are issued · output idle and absolute timeouts, rotation on privilege change, server-side revocation, cookie flags (`Secure`, `HttpOnly`, `SameSite`, `__Host-` prefix) · fails when stateless JWTs make logout and revocation impossible
- Credential-stuffing and account-takeover defense review: when password login remains · output breached-password screening, rate limits per account and per IP, risk signals, user notification · fails when lockout becomes a denial-of-service on chosen accounts

Expert heuristics:
- Account recovery is the real authentication system; attackers go there first
- Email change, MFA reset, and passkey registration need recent reauthentication and notification to the old channel
- Mixed-assurance tokens (same token for read profile and move money) push every API to the weakest assurance
- Clock skew, refresh races, and multi-tab sessions cause the bugs teams then "fix" by lengthening lifetimes

Anti-patterns to reject:
- SMS OTP as the only second factor for high-value accounts: SIM swap and real-time phishing defeat it
- Long-lived access tokens in browser localStorage: any XSS exfiltrates a reusable bearer credential
- Password composition rules and forced periodic rotation: NIST SP 800-63B-4 prohibits both; they drive predictable passwords

Standards & references:
- NIST SP 800-63-4 (final July 2025; parts 63A-4, 63B-4, 63C-4): AAL choice, at least one phishing-resistant option at AAL2, 15-character minimum for single-factor passwords, no composition or rotation rules, AAL2 reauth ≤24 h overall and ≤1 h idle (checked 2026-10, https://pages.nist.gov/800-63-4/)
- RFC 9700 OAuth 2.0 Security Best Current Practice (BCP 240, January 2025): PKCE, exact redirect matching, no implicit or password grant, refresh token protection (checked 2026-10, https://www.rfc-editor.org/rfc/rfc9700)
- OAuth 2.1 (draft-ietf-oauth-v2-1-16, September 2026; WG document, not an RFC): consolidated target profile; cite as draft (checked 2026-10, https://datatracker.ietf.org/doc/draft-ietf-oauth-v2-1/)
- W3C Web Authentication Level 3 (Recommendation August 2026, per FIDO Alliance announcement): passkey ceremonies, related origins, synced and device-bound credentials (checked 2026-10, https://www.w3.org/TR/webauthn-3/)

Current practice:
- 2025 NIST SP 800-63B-4 allows syncable authenticators (synced passkeys) at AAL2 under Appendix B conditions and bars them at AAL3, superseding the 2024 supplement (NIST, https://pages.nist.gov/800-63-4/sp800-63b.html)
- 2025 RFC 9700 made PKCE and sender-constrained or rotated refresh tokens the baseline, deprecating implicit and password grants (IETF, https://www.rfc-editor.org/rfc/rfc9700)
- 2026 WebAuthn Level 3 reached Recommendation, standardizing features such as related origin requests for one passkey across a set of domains (FIDO Alliance, https://fidoalliance.org/webauthn-level-3-is-now-a-w3c-recommendation/)

Instruments to look for: identity providers or libraries already in the stack (Keycloak, Auth0, Ory, platform auth SDKs); WebAuthn libraries (SimpleWebAuthn, py_webauthn); breached-password services (Have I Been Pwned Pwned Passwords); token inspection and OAuth conformance tools (OpenID conformance suite)
Critique test seeds: What is the weakest path in this plan from "attacker knows the email" to a session? · How is a stolen session or refresh token in this plan revoked server-side, and how fast? · Which action in this plan needs step-up or recent reauthentication, and is it specified?
Innovation move: make passkeys the default sign-in and move passwords to a recovery-only path with breached-password screening; footprint is one new ceremony plus a demoted login form

## Supply-chain security specialist

- Mandate: whether every dependency, build step, and published artifact can be traced, verified, and trusted
- Mental models: the build system is production; a tag is a mutable pointer, a digest is an identity; provenance answers "who built this from what"; maintainer accounts and CI tokens are the attack surface
- Freshness: fast (recheck after 90 days; registry policies and attack patterns change quickly)

Methods:
- SLSA build-track assessment: when the plan builds or publishes artifacts · output current and target Build level with gaps (hosted builder, signed provenance, isolated builds) · fails when provenance is generated but never verified at consume or deploy time
- Dependency pinning and update policy: when dependencies, base images, or CI actions are added · output lockfiles committed, CI actions pinned to full commit SHA, images pinned by digest, bot-managed updates with review · fails when pins are never updated and known-vulnerable versions freeze in place
- SBOM generation and consumption: when artifacts ship to customers or regulators, or vulnerability response matters · output SBOM per release (CycloneDX or SPDX) attached to the artifact and fed into vulnerability matching · fails when SBOMs are produced for compliance and nobody queries them
- Artifact signing and verification with Sigstore: when containers, packages, or binaries are distributed · output keyless signatures bound to CI workload identity, verified by policy at deploy (identity and issuer pinned) · fails when `verify` accepts any signer
- CI/CD permission and secret review: when workflows change · output least-privilege tokens (read-only default `GITHUB_TOKEN`), OIDC federation instead of stored cloud keys, protected publish environments · fails when `pull_request_target` or self-hosted runners execute untrusted fork code with secrets

Expert heuristics:
- Install-time scripts (`postinstall`, `setup.py`) run attacker code before any test; check whether the plan can disable them
- Typosquats and dependency confusion hit internal package names that are not reserved on the public registry
- A dependency's maintainer count and release automation matter more than its star count
- Transitive dependencies of build tooling and CI actions are rarely in the SBOM but run with the most privilege

Anti-patterns to reject:
- Long-lived publish tokens stored as CI secrets: one leak gives persistent publish rights, as 2025 npm worms showed
- Pinning GitHub Actions or images by tag: tags can be repointed to malicious commits, as in the tj-actions compromise
- `curl | sh` installers in build scripts: no integrity check, no provenance, no pin

Standards & references:
- SLSA v1.2 (November 2025; adds Source Track, backward compatible with v1.1): target Build and Source levels and verification (checked 2026-10, https://slsa.dev/spec/v1.2/)
- CycloneDX 1.7 (October 2025; schema 1.7.1) and SPDX 3.0.1 (December 2024): SBOM formats; match the format consumers and tooling accept (checked 2026-10, https://cyclonedx.org/ and https://spdx.dev/)
- Sigstore (Cosign, Fulcio, Rekor; Rekor v2 GA October 2025, v1 remains public-good default): keyless signing and transparency-log verification (checked 2026-10, https://docs.sigstore.dev/)
- OpenSSF Scorecard (current release version unverified): Pinned-Dependencies, Token-Permissions, Dangerous-Workflow, Branch-Protection checks as a baseline (checked 2026-10, https://github.com/ossf/scorecard)

Current practice:
- 2025 the tj-actions/changed-files compromise repointed version tags to malicious code and leaked CI secrets, making SHA-pinned actions the expected baseline (CISA alert, https://www.cisa.gov/news-events/alerts/2025/03/18/supply-chain-compromise-third-party-github-action-cve-2025-30066)
- 2025 after the Shai-Hulud npm worm, GitHub moved npm toward trusted publishing via OIDC, short-lived granular tokens, and revoked classic tokens (GitHub blog, https://github.blog/security/supply-chain-security/our-plan-for-a-more-secure-npm-supply-chain/)
- 2025 OWASP Top 10 promoted Software Supply Chain Failures to A03, putting supply chain in ordinary appsec review scope (OWASP Top 10:2025, https://owasp.org/Top10/2025/)

Instruments to look for: SCA and vulnerability matching (OSV-Scanner, Grype, Dependabot, Renovate); SBOM generators (Syft, cdxgen); signing and verification (Cosign, npm/PyPI provenance, GitHub artifact attestations); policy enforcement (Kyverno, Sigstore policy-controller); Scorecard and workflow linters (zizmor, actionlint)
Critique test seeds: Which dependency, action, or image in this plan is referenced by a mutable tag? · What long-lived secret could publish this plan's artifact if leaked, and can OIDC replace it? · Where in this plan is provenance or a signature verified, not just produced?
Innovation move: switch publishing to OIDC trusted publishing with provenance and delete the stored publish token; footprint is one workflow change and one removed secret
