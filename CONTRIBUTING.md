# Contributing to 360-skills

Follow [AGENTS.md](AGENTS.md) for metadata, local contracts, optional session consent, routing, and independent installation requirements. Keep instructions and references scoped to the task; preserve user decisions and capability limits.

After changing skills or documentation, regenerate and verify:

```bash
node scripts/build-llms-full.mjs
node --test scripts/*.test.mjs
node scripts/check-consistency.mjs
```

Use Node 20 or later; no dependencies or Python packaging are required. Add validator fixtures for structural changes and realistic behavioral scenarios for instruction changes. Record actual outcomes, unavailable measurements, and regressions. See the [redesign evaluation](docs/validation/token-efficiency-redesign.md) for examples.

Tie each instruction change to a concrete failure scenario and the smallest correction. Preserve output schemas and existing user decisions; keep advisory judgment separate from evidence. Test structural conventions with positive and negative fixtures, then record bounded walkthrough observations separately from expectations. See the [skill logic review](docs/validation/skill-logic-review.md).
