# Validation — 13 November 2026

## Executed

- **12/12 Node tests passed**, 0 failures/skips. `npm test`; raw evidence/unit-tests.txt.
- **3/3 Playwright Chromium tests passed**, 0 failures/skips. `npm run test:browser`; raw evidence/browser-tests.txt.
- Browser workflows: actual .txt upload and pasted source; exact locator/context; unsupported query refusal; script markup rendered as text without execution; Markdown download content; selected ICS download date; import reset on reload; 390px mobile viewport without horizontal overflow; mocked model attack rejected without discarding baseline results; mocked valid model response labeled as model output.
- Core/threat tests: malformed/oversized/NUL sources; Unicode/case-insensitive AND search; real/invalid ISO dates and limited negation handling; HTML/Markdown escaping; ICS CRLF property injection prevention, UTF-8 75-octet folding and exclusive next-day date; strict model schema/unknown locator/modified quote/duplicate/extra field rejection; prompt injection held as data with fabricated model quote rejected; transport/JSON failure and request bounds.
- Website-manager validator: ok=true, errors=[], warnings=[]; site API configuration is deny-by-default with model disabled.
- Publisher returned verified_status=ok for the canonical public demo URL. The actual captioned walkthrough was captured in Chromium against that hosted URL and exercised downloads.
- npm dependency install reported 0 vulnerabilities (3 dev packages installed). Runtime has no production npm dependencies.

## Deliberately not claimed

No real Ollama model was installed or run. Model tests use mocked transport. No hosted model/paid API was called, no semantic accuracy benchmark was conducted, and no source statement was scientifically verified. No user study, manual assistive-technology audit, non-Chromium browser coverage or external security audit was performed. Keyboard focus, semantic labels, live status and responsive layout were implemented; automated browser tests are not a full accessibility certification.

The fixture corpus and recorded pasted note are synthetic. The video is actual browser interaction with captions, silent, <=3 minutes; it is not hosted on YouTube/Vimeo or embedded in a submitted project. Hackathon student enrollment is owner-confirmed; the signed-in form and any winner verification were not inspected. The official displayed rules do not list proof-upload requirements; that does not guarantee none later.

Video probe: actual MP4 duration **86.88 seconds**, 1,503,325 bytes. A frame at 30 seconds was decoded and visually checked (evidence/video-frame.png). Desktop and mobile screenshots were also captured from actual Chromium sessions, not design mockups.
