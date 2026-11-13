# AgriEvidence — Follow the source

**GenHacks entry candidate for Akshay Wagh (India). Current student enrollment is confirmed by the owner. Personal rules/account review and submission remain.** No entry has been submitted.

## One-line pitch

A local-first soil and water research workspace that turns authorized notes into traceable excerpts, a reference-backed brief and reviewed date reminders—without inventing answers.

## The problem

Small research collections mix observations, uncertainty and application dates. Copying a plausible-sounding answer into a brief can hide where a claim came from, and a date mention can be mistaken for a deadline. AgriEvidence keeps the original line one click away and makes uncertainty visible.

## What it does

Paste or upload plain text, search source statements, inspect numbered context, download a Markdown research brief/reference index, and select dates for an ICS calendar. A query unsupported by the corpus returns no evidence. The included examples are invented and prominently synthetic; they do not establish scientific findings or real opportunities.

## How we built it / tools

Vanilla JavaScript ES modules, semantic HTML and responsive CSS; no production dependencies or API keys. Pure shared evidence functions power the browser and Node tests. Playwright/Chromium exercise the working UI, including exports and malicious text. Optional Ollama selection can find semantically related source lines with strict schema and exact citation validation. Baseline search is deterministic, not AI. Model transport tests are mocked; actual model inference has not been validated in this delivery.

OpenAI Codex generated code, tests, synthetic fixtures and documentation with Node, Python, Git and Comma/GitHub publishing tools. See AGENTS.md for disclosure. No paid AI endpoint is required. MIT licensed.

## What is distinctive

The model is allowed to select evidence, not write factual prose. No citation match is sold as truth verification. Unsupported search, unverified source status, original lines and reviewed date export are first-class parts of the interface.

## Impact and next steps

Intended users are students and small environment research teams checking compact corpora. The expected benefit is easier traceability and fewer unsupported notes; no user study or impact metric is claimed. Future work: user evaluation, richer provenance, verified public-domain source packs and careful semantic relevance assessment.

## GenHacks submission fields — fill only after eligibility review

- Intended event: GenHacks, https://genhacks-open.devpost.com/ ; rules https://genhacks-open.devpost.com/rules . Fetched official rules and overview on Nov 13 2026 verify students 13+ at any school level, any country/territory except Devpost standard exceptions, solo or any-size teams, build after Nov 1 opening, Dec 26 2026 10:30 IST close, and credited AI tools allowed. The displayed rules do not specify enrollment documents; absence of a listed proof requirement is not a waiver of organizer checks. See docs/RULES_VERIFICATION.md.
- Track: **Healthcare & Environmental** (an official track verified on the event page).
- Public code: https://github.com/akshaywagh1998/agrievidence
- Live demo: see DELIVERY.md for the verified published link.
- Demo video: **not yet uploaded to YouTube/Vimeo or embedded**. A real silent browser recording and a <=3-minute narration/shot script are included; upload/embed is a remaining personal submission step.
- Judging verified on the official overview: impact, technical implementation, creativity, presentation at 25% each. No award or eligibility claim is made.

SLAY HACKS is a lower-confidence fallback requiring adult student eligibility; enrollment is confirmed, but its other rules still need review. Its reported deadline is Dec 8 2026 03:30 IST, with inconsistent headline/enumerated prize figures and rubrics; verify before selecting it. Do not enter this existing code into Agentware or Code Olympics, whose reported allowed build starts are later than this repository's creation.
