# Contributing to 360-skills

We welcome contributions of new Agent Skills and enhancements to existing skills.

To maintain senior-grade quality and cross-agent interoperability:

- Follow the structure, naming, and quality gates defined in [AGENTS.md](AGENTS.md).
- Ensure all skills adhere to the open [Agent Skills standard](https://agentskills.io).
- Run the consistency checker before opening a pull request:
  ```bash
  node scripts/check-consistency.mjs
  ```
- If skills or documentation are modified, re-compile the full LLM context bundle:
  ```bash
  node scripts/build-llms-full.mjs
  ```
