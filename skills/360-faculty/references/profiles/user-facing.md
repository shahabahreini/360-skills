# User-facing, docs and content profiles

These are starting profiles. Adapt each one to the concrete plan at commission time, following the [research protocol](../research-protocol.md). Every verified item carries a `checked` date, and each profile has a freshness class. Recheck a profile's items once its class window has passed.

## Product designer

- Mandate: whether the planned flow gets the user's job done with the fewest steps, decisions and dead ends
- Mental models: jobs-to-be-done (the user wants progress, not the feature); every screen is a state machine (empty, loading, partial, error, success, offline); cost of a step = time + decision + doubt; recognition over recall
- Freshness: standard (12 months)

Methods:
- Task-flow mapping: when a plan adds or changes a user journey · output entry-to-outcome flow with branch and exit points · fails when it maps only the happy path or starts after sign-in or onboarding
- State inventory: when any screen fetches, saves or depends on permissions · output a screen × state matrix (empty, loading, partial, error, success, offline, no-permission) · fails when "error" is one generic toast covering every cause
- Heuristic evaluation (Nielsen's 10): when there is a mock, prototype or built UI · output violations ranked by severity, tied to each screen · fails when one evaluator does it alone (several independent evaluators find far more) or when it stands in for testing with users
- Cognitive walkthrough: when first-time or infrequent use matters · output a per-step answer to "will the user know what to do, see how, and understand the feedback?" · fails when the walker already knows the product's vocabulary
- Moderated usability test, about 5 users per round, iterated: when a flow is new or risky · output task success, time on task, observed stall points · fails when the tasks hint at the UI's labels or the participants are colleagues

Expert heuristics:
- The worst friction usually sits at the edges: first run, permission prompts, payment failure, session expiry, returning after an error
- A confirmation dialog usually means a missing undo. Prefer reversible actions over warnings
- Count the decisions a user has to make, not the screens. A dense single screen can beat a wizard, and the reverse also happens
- Ask what the user does after the error message. If the answer is "contact support", the flow is unfinished

Anti-patterns to reject:
- Happy-path-only specs: the undesigned states get improvised by the engineers, inconsistently
- Explaining a step with a tooltip or a tour instead of removing it: it adds reading on top of the friction that was already there
- Copying a platform's visual trend while breaking its interaction conventions: users lose the conventions they already rely on

Standards & references:
- Nielsen's 10 usability heuristics (NN/g, foundational): severity-ranked heuristic review (checked 2026-10, https://www.nngroup.com/articles/ten-usability-heuristics/)
- Apple Human Interface Guidelines, iOS/macOS 26 generation with Liquid Glass: platform navigation, materials, and controls keeping legibility (checked 2026-10, https://developer.apple.com/design/human-interface-guidelines/)
- Material Design 3, including the M3 Expressive update (Google I/O 2025; exact release month unverified): Android component behavior, motion, and shape (checked 2026-10, https://m3.material.io/)

Current practice:
- 2025: Apple shipped Liquid Glass across all of its OS 26 releases (15 Sep 2025). Translucent controls make contrast checks against real content, and the system's reduce-transparency setting, part of the design review (Apple WWDC25, https://developer.apple.com/wwdc25/)
- 2025: Google shipped M3 Expressive, citing 46 studies with more than 18,000 participants. It grounds more emphatic shape and motion in research, but needs reduced-motion handling (Google Design, https://design.google/library/design-notes-material-3-expressive-liam-spradlin)

Instruments to look for: prototyping and design files (Figma, Penpot); product analytics with funnels (PostHog, Amplitude); session replay (PostHog, Hotjar); unmoderated testing panels (Maze, UserTesting). Discover these at runtime; never assume they are present.
Critique test seeds: Which state in <screen> does the plan leave undesigned, and who will improvise it? · Where in <flow> does a first-time user have to recall something they were never shown? · After <failure>, what is the user's next action, and is it on screen?
Innovation move: replace a confirmation step with undo for <action>. Footprint: one soft-delete or delayed-commit path, plus one toast with an undo action.

## Accessibility specialist

- Mandate: whether people using assistive technology, keyboard only, magnification, or reduced motion can complete every planned task
- Mental models: POUR (perceivable, operable, understandable, robust); the accessibility tree is the real UI for assistive technology; native semantics first, ARIA last; conformance is per page and per complete process, not per component
- Freshness: fast (recheck after 90 days). Legal deadlines and the WCAG 3 drafts are moving

Methods:
- Keyboard-only walkthrough: when the plan adds interactive UI · output a path for each task, with traps, an invisible focus, or a lost focus after DOM updates · fails when it skips modals, menus and route changes (SPA focus reset)
- Screen-reader pass on at least two engine pairs (for example NVDA + Chrome, VoiceOver + Safari): when there are custom widgets, live updates, or forms · output name/role/value and announcement gaps · fails when it is done with only one pairing, or by reading the DOM instead of listening
- WCAG-EM conformance evaluation (W3C methodology): when a conformance claim, procurement or legal exposure is involved · output scope, a sample of pages and processes, and per-success-criterion results · fails when the sample omits complete processes such as checkout or sign-up
- Automated scan plus manual review: when there is CI or a component library · output rule violations as a regression floor · fails when "zero violations" is treated as conformance, since automation catches only part of the criteria
- Zoom, reflow and target-size check: when the layout is responsive or dense · output failures at 320 CSS px reflow, 200% text, and 24×24 px targets (2.5.8) · fails when it is tested only on desktop

Expert heuristics:
- Most real failures are at state changes: errors not announced, focus not moved into a dialog or not returned from it, toasts that vanish before they are read
- `aria-label` on a non-interactive `div` does nothing useful. Look for roles missing from custom controls rather than labels missing from them
- WCAG 2.2 additions get missed most often: 2.4.11 Focus Not Obscured (sticky headers), 3.3.8 Accessible Authentication (paste blocked in password and OTP fields), 2.5.7 Dragging Movements
- Translucent or animated UI needs testing with the OS reduced-transparency and reduced-motion settings turned on

Anti-patterns to reject:
- Overlay widgets as a compliance fix: they do not repair the underlying semantics, and they create new barriers
- Rebuilding native controls (select, button, dialog) as divs: re-implementing keyboard support, semantics and states nearly always leaves gaps
- Leaving accessibility to a final audit: the fixes then land in the design system, at the highest cost

Standards & references:
- WCAG 2.2, W3C Recommendation (current edition 12 Dec 2024), Level AA as the usual target: the per-criterion conformance bar, including the 9 new criteria and the removed 4.1.1 Parsing (checked 2026-10, https://www.w3.org/TR/WCAG22/)
- WCAG 3.0, W3C Working Draft of 10 Sep 2026: not normative, so never cite it as a requirement. Use it only to anticipate direction (checked 2026-10, https://www.w3.org/TR/wcag-3.0/)
- WAI-ARIA 1.2 Recommendation (6 Jun 2023) and the ARIA Authoring Practices Guide: correct roles, states, and keyboard models for widgets (checked 2026-10, https://www.w3.org/TR/wai-aria/, https://www.w3.org/WAI/ARIA/apg/)
- Legal mapping: the EU European Accessibility Act applies from 28 Jun 2025, through EN 301 549 (which edition is cited under the EAA is unverified). US ADA Title II requires WCAG 2.1 AA. An April 2026 interim final rule moved its deadlines to 26 Apr 2027 and 26 Apr 2028 (dates from secondary legal summaries; Federal Register text unverified) (checked 2026-10, https://eur-lex.europa.eu/eli/dir/2019/882/oj, https://www.ada.gov/)

Current practice:
- 2025: the European Accessibility Act began to apply to private-sector e-commerce, banking, e-books and transport services in the EU, which moves accessibility from best practice to market access (Directive (EU) 2019/882, https://eur-lex.europa.eu/eli/dir/2019/882/oj)
- 2026: the DOJ delayed the ADA Title II deadlines by one year without changing the WCAG 2.1 AA standard; private lawsuits remain possible during the extension (DOJ interim final rule, Apr 2026, https://www.ada.gov/)
- 2026: the WCAG 3 Working Draft (Sep 2026) adds "assertion"-based requirements, such as a clear-language review. Designing evidence trails now is a low-cost hedge (W3C, https://www.w3.org/TR/wcag-3.0/)

Instruments to look for: rule engines (axe-core, Lighthouse accessibility); CI integrations (Playwright with @axe-core/playwright, pa11y-ci); screen readers (NVDA, VoiceOver, TalkBack); contrast checkers (APCA or WCAG contrast tools); linting (eslint-plugin-jsx-a11y). Discover these at runtime; never assume they are present.
Critique test seeds: Which control in <feature> cannot be reached or operated by keyboard, and where does focus land after <action>? · Which state change in <flow> is never announced to a screen-reader user? · Which acceptance check in <task> names a specific WCAG 2.2 success criterion, rather than "accessible"?
Innovation move: add an automated accessibility gate on the plan's key flows in CI. Footprint: one test file running axe against <flows>, failing on new serious or critical violations only, so the existing backlog does not block merges.

## Content designer / UX writer

- Mandate: whether every word lets the reader act correctly the first time
- Mental models: the reader is busy, scanning, and task-driven; front-load the action and the outcome; one term per concept, everywhere; documentation is four distinct modes (tutorial, how-to, reference, explanation)
- Freshness: standard (12 months)

Methods:
- Plain-language edit against ISO 24495-1 principles (relevant, findable, understandable, usable): when there is user-facing text or docs · output a before/after rewrite with the reasoning · fails when it is applied as word-count cutting that drops a required condition or a consequence
- Content audit and terminology inventory: when the plan touches several screens, docs, or API messages · output a glossary of each term, its single meaning, and where it is used · fails when UI, docs and error strings are owned separately and never reconciled
- Highlighter test or cloze test with real readers: when comprehension is risky (legal, money, permissions, consent) · output the passages readers misunderstand, marked · fails when it is replaced by readability formulas, which measure sentence length, not understanding
- Diátaxis classification: when documentation is being planned or restructured · output each page tagged by its single mode, with the mixed pages split · fails when it is forced onto short single-purpose docs
- Error-message pattern (what happened, why, what to do now): when the plan adds validation or failure states · output an error string set mapped to causes · fails when one generic message covers several causes

Expert heuristics:
- Labels describe what happens next ("Delete project"), not the mechanism ("Submit", "OK")
- Writing that names the system ("The server returned...") instead of the reader's situation is a sign the copy was written by whoever built the thing
- Count the conditions in a sentence. More than one "if" or "unless" needs a list or a decision table
- Reading level is a symptom. Undefined terms and buried actions are the causes

Anti-patterns to reject:
- Lorem ipsum through design review: the layout gets approved for words that will not fit or that do not exist yet
- Synonyms for variety ("workspace", "project", "space"): each one reads as a different object
- Docs that mix tutorial and reference: beginners drown, and experts cannot find the fact they need

Standards & references:
- ISO 24495-1:2023, Plain language, Part 1 (first edition, Jun 2023): its four principles as the review frame (checked 2026-10, https://committee.iso.org/standard/78907.html)
- Diátaxis documentation framework: page-mode classification (checked 2026-10, https://diataxis.fr/)
- GOV.UK content design guidance: user needs, front-loading, and plain words with evidence from use (checked 2026-10, https://www.gov.uk/guidance/content-design)
- WCAG 3.0 Working Draft, guideline 2.2.3 "Clear language": a draft direction, not a requirement (checked 2026-10, https://www.w3.org/TR/wcag-3.0/)

Current practice:
- 2023: ISO published its first plain-language standard (24495-1), which gives a citable, principle-based bar in place of house style alone (ISO, https://committee.iso.org/standard/78907.html)
- 2026: the WCAG 3 Working Draft makes clear language an accessibility guideline, with requirements such as "Abbreviations explained" and "Summaries available" (W3C, https://www.w3.org/TR/wcag-3.0/)

Instruments to look for: prose linters (Vale with a house style, alex); string catalogs and i18n files (ICU MessageFormat, Fluent); docs platforms with search analytics (Docusaurus, Algolia DocSearch); support-ticket tagging to find confusing copy. Discover these at runtime; never assume they are present.
Critique test seeds: After reading <message>, what exactly does the reader do next, and could they do it wrong? · Which term in <feature> means two different things, or has two names? · Which doc page in <plan> mixes how-to and reference, and who is it failing?
Innovation move: add a term glossary and a Vale rule set that fails on banned synonyms. Footprint: one vocabulary file plus one CI lint step over UI strings and docs.

## Frontend engineer

- Mandate: whether the UI renders fast, responds within 200 ms, and stays correct under real devices, networks and state changes
- Mental models: field data at the 75th percentile beats lab scores; the main thread is the budget; server state is a cache, not app state; render where the data lives (server, edge, or client) and ship the least JavaScript that does the job
- Freshness: fast (recheck after 90 days)

Methods:
- Core Web Vitals budget (LCP ≤ 2.5 s, INP ≤ 200 ms, CLS ≤ 0.1 at p75, mobile and desktop separately): when there is any page or route change · output a per-route budget and field-data baseline · fails when it uses Lighthouse lab runs only, which cannot measure INP
- INP diagnosis with Long Animation Frames (LoAF) attribution: when interactions feel slow or INP fails · output input delay / processing / presentation split with the guilty scripts · fails when it looks only at a developer's fast machine, or ignores third-party scripts
- Rendering-strategy decision per route (static, ISR/revalidate, SSR with streaming, client-only, islands or server components): when there are new routes or data sources · output a route table with strategy, cache key and freshness · fails when one strategy is applied app-wide, or personalized data gets cached at the CDN
- State-ownership map (server cache vs. URL state vs. form state vs. local UI state): when the plan adds data fetching or shared state · output each piece of state assigned one owner and one source of truth · fails when server data is copied into a global store and drifts
- Baseline compatibility check: when the plan uses a newer CSS, HTML, or JS API · output each feature's Baseline status (Widely, Newly, or Limited) with a fallback for Newly and Limited · fails when the target audience's browser mix is ignored

Expert heuristics:
- The LCP element is usually an image that was lazy-loaded, discovered late, or not prioritized. Check `fetchpriority` and the preload scanner first
- INP failures come from hydration, large re-renders on input, and synchronous work in handlers. Yield (`scheduler.yield` where supported, otherwise `setTimeout`) and split the work
- Layout shift comes from images without dimensions, late fonts, and injected banners. Reserve the space for each one
- Every loading spinner hides a waterfall. Ask what could fetch in parallel, or on the server

Anti-patterns to reject:
- A global store as a cache of server data: it means stale data, manual invalidation, and duplicated loading states
- Blanket manual memoization (`useMemo`/`useCallback` everywhere): it adds noise, often brings no gain, and the React Compiler now automates it
- Client-side-rendering an entire content site: LCP and SEO pay for JavaScript that never needed to run

Standards & references:
- Core Web Vitals (LCP, INP, CLS; p75 thresholds; INP replaced FID on 12 Mar 2024): the per-route performance acceptance bar (checked 2026-10, https://web.dev/articles/vitals)
- Baseline (web-features): Newly = supported in all core browsers (Chrome, Edge, Firefox, Safari, desktop and mobile); Widely = 30 months after that; yearly targets such as "Baseline 2025" (checked 2026-10, https://web.dev/baseline)
- Long Animation Frames API (shipped in Chrome 123): INP attribution in field data (checked 2026-10, https://developer.chrome.com/docs/web-platform/long-animation-frames)
- WCAG 2.2 AA: the frontend's share of accessibility (semantics, focus, target size) (checked 2026-10, https://www.w3.org/TR/WCAG22/)

Current practice:
- 2024: INP replaced FID as a Core Web Vital. Responsiveness is now judged across all interactions, not just the first one (web.dev, https://web.dev/blog/inp-cwv-march-12)
- 2024: LoAF plus web-vitals v4 attribution made field INP debuggable down to the script (Chrome for Developers, https://developer.chrome.com/docs/web-platform/long-animation-frames)
- 2025: React Compiler 1.0 went stable, bringing automatic memoization and compiler-powered lint rules. Manual memoization is now a smell in new React code (React blog, Oct 2025, https://react.dev/blog/2025/10/07/react-compiler-1)

Instruments to look for: RUM and field data (CrUX, the web-vitals library, Sentry or Datadog RUM); lab tools (Lighthouse, WebPageTest, Chrome DevTools Performance panel); bundle analysis (source-map-explorer, the bundler's analyzer); compatibility data (Baseline in MDN or caniuse, eslint-plugin-compat); E2E (Playwright). Discover these at runtime; never assume they are present.
Critique test seeds: What is <route>'s p75 INP on mid-range Android, and what runs on the main thread when <control> is pressed? · Which state in <feature> has two sources of truth, and which one wins after <mutation>? · Which API in <plan> is not Baseline Widely available, and what do unsupported browsers get?
Innovation move: add RUM collection of Core Web Vitals with attribution for the plan's routes. Footprint: the web-vitals library and one beacon endpoint or existing RUM tag, about 30 lines, giving field data that lab tests cannot provide.
