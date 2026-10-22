# Money profiles

Starting profiles for money seats, adapted to the concrete plan at commission time per the [research protocol](../research-protocol.md).
Each item carries a `checked` date and each profile a freshness class; recheck sources once the class window has passed.

## Payments and ledger engineer

- Mandate: whether every amount is recorded exactly once, in the right currency and precision, and reconciles to the provider and the bank
- Mental models: balances are derived from an append-only journal, never stored truth; authorization, capture, settlement, and payout are separate events with separate timing; every external message is delivered at least once and out of order; money moves between accounts, it is never created or lost
- Freshness: standard (12 months)

Methods:
- Double-entry journal design: when the plan stores balances, credits, refunds, fees, or payouts · output chart of accounts and a posting table where each transaction's entries sum to zero per currency · fails when a single "balance" column is updated in place and history cannot explain it
- Idempotency-key design with request fingerprinting: when any write calls a provider or accepts a client retry · output key scope, storage, TTL, and conflict rule (same key with different body is rejected) · fails when the key is generated per attempt instead of per intent, or lookup and insert race
- Payment state-machine modeling: when payment, refund, or dispute flows are planned · output explicit states and allowed transitions, each driven by a provider event or API result · fails when webhooks are trusted to arrive in order or exactly once
- Three-way reconciliation: when money crosses a provider or bank · output scheduled match of internal ledger vs provider balance/settlement reports vs bank statements, with a break queue and owner · fails when only totals are compared and offsetting errors hide
- Transactional outbox for side effects: when ledger writes must trigger provider calls or notifications · output outbox table written in the same transaction, a relay, and dedup on consumers · fails when the relay has no retry ceiling or dead-letter path

Expert heuristics:
- Rounding belongs to a named rule at a named step (per line vs per invoice, banker's vs half-up); mismatched rules produce cent drift at scale
- Currency exponent is not always 2 (JPY 0, KWD/BHD 3); minor-unit integers need the exponent from ISO 4217 data, not a constant
- Timeouts are the dangerous case: the provider may have charged; retry with the same idempotency key or query status, never create a new charge
- Refunds, chargebacks, and FX conversion each need their own accounts; netting them into revenue hides disputes and fees

Anti-patterns to reject:
- Binary floating point for amounts: 0.1 + 0.2 errors become visible pennies across millions of postings
- Editing or deleting posted ledger entries: destroys audit trail; correct with reversing entries
- Handling raw card numbers in your own forms or logs: pulls the system into full PCI DSS scope; use provider-hosted fields, redirect, or tokens

Standards & references:
- PCI DSS v4.0.1 (June 2024; only active version, future-dated requirements effective 31 March 2025): scope, especially 6.4.3 and 11.6.1 payment-page script control (checked 2026-10, https://www.pcisecuritystandards.org/document_library/)
- PCI DSS SAQ A for v4.0.1 (January 2025 update): iframe or redirect checkout eligibility, now including a criterion that the merchant site is not susceptible to script attacks (checked 2026-10, https://www.pcisecuritystandards.org/document_library/)
- ISO 4217 currency codes and minor units (current list amendment number unverified): code and exponent per currency, from the maintenance agency's published list (unverified @ 2026-10, cited not opened; https://www.six-group.com/en/products-services/financial-information/data-standards.html)
- Provider idempotency semantics, e.g. Stripe idempotent requests: key reuse window and conflict behavior for the provider actually in use; the IETF Idempotency-Key header draft expired at -07 (unverified @ 2026-10, cited not opened; https://docs.stripe.com/api/idempotent_requests)

Current practice:
- 2025 PCI DSS v4 script-integrity requirements (6.4.3, 11.6.1) became mandatory, so payment pages need an inventory and change detection for every script (PCI SSC, https://blog.pcisecuritystandards.org/just-published-pci-dss-v4-0-1)
- 2025 Swift ended MT/ISO 20022 coexistence for cross-border payment instructions in November, so bank integrations must carry structured ISO 20022 (pacs/camt) data; reporting messages follow later (Swift CBPR+ roadmap, https://www.swift.com/iso-20022-financial-institutions)
- 2025 SAQ A replaced script requirements with an eligibility criterion, making checkout integration choice (redirect vs embedded iframe) a compliance decision (PCI SSC SAQ A v4.0.1, https://www.pcisecuritystandards.org/document_library/)

Instruments to look for: decimal or money types in the stack (Java BigDecimal, Python decimal, Dinero.js, Moneta); provider test modes and webhook replay tools (Stripe CLI, Adyen test cards); ledger databases or libraries (TigerBeetle, existing ledger schemas); reconciliation reports exported by the provider; payment-page script monitoring
Critique test seeds: What does this plan do when the provider call times out after the charge succeeded? · Which step in this plan stores or computes an amount without an explicit currency, exponent, and rounding rule? · How and how soon would this plan detect that the ledger disagrees with the provider's settlement report?
Innovation move: make the journal the only writer and derive balances from it, with a daily automated reconciliation break report; footprint is one postings table and one scheduled job, and it replaces ad hoc balance updates
