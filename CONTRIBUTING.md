# Contributing to 360-skills

Follow [AGENTS.md](AGENTS.md) for metadata, local contracts, optional session consent, routing, and independent installation requirements. Keep instructions and references scoped to the task; preserve user decisions and capability limits.

After changing skills or documentation, regenerate and verify:

```bash
node scripts/build-llms-full.mjs
node --test scripts/*.test.mjs
node scripts/check-consistency.mjs
```

Use Node 20 or later; no dependencies or Python packaging are required. Add validator fixtures for structural changes and realistic behavioral scenarios for instruction changes. Record actual outcomes, unavailable measurements, and regressions. See the [redesign evaluation](docs/validation/token-efficiency-redesign.md) for examples.
