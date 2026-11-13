# AgriEvidence

**GenHacks entry candidate for Akshay Wagh (India), who has confirmed current student enrollment.** Final account/rules review and personal submission steps remain; this is not a submitted entry. No registration, rule acceptance or submission has been performed.

A local-first research workspace for **small soil/water monitoring corpora**. Paste or upload authorized plain-text notes, find exact cited excerpts, inspect original numbered lines, export a Markdown brief with a reference index, and review date mentions before downloading an all-day ICS calendar. Unsupported searches return no evidence; the app does not compose unsupported factual answers.

The included corpus is entirely **SYNTHETIC**: fictional observations, grants and deadlines. It is not real research, an actual opportunity, or official agricultural guidance. No external scientific references are claimed or included.

## Run in 30 seconds

Requires Python 3. No npm install or API key is needed to run the app.

```sh
cd agrievidence
python3 -m http.server 8080 --bind 127.0.0.1
```

Open http://127.0.0.1:8080. Alternatively `npm start` invokes that same server. Do not double-click index.html: browsers block module and fixture loading over file://.

1. Search the synthetic corpus for `soil monitoring` and inspect a source's line locator.
2. Search `carbon credits`: no supporting excerpt is returned.
3. Paste your own authorized `.txt` source, provide its provenance in the title, confirm permission and add it. Upload fills the form; clicking Add imports it.
4. Export the current evidence as `.md`. Select reviewed dates and export `.ics`.
5. Clear all or reload to discard imports. Reload restores the synthetic example.

## Honest modes

- **Baseline: deterministic, no AI.** A case-insensitive literal AND search over whole source lines; max 30 results. It extracts source statements, not verified truths. This works fully without keys or a model.
- **Optional actual model path:** a browser request to a user-run Ollama server asks an installed model to select semantically relevant whole lines. Strict output validation accepts only `{citations:[{id,quote}]}`, rejects unknown IDs, altered quotes, duplicate citations, extra fields or generated prose. No model output is shown after validation/transport failure. Existing evidence stays available with an error notice. Exact citation validity does not prove relevance, reliability or scientific truth.
- **Tests mock the model transport.** No installed model inference was run for this delivery. The baseline and browser workflows were exercised for real. Do not describe mocked responses as an AI benchmark or demo of actual inference.

### Optional Ollama setup

Install Ollama separately and download a model of your choice (e.g. `ollama pull llama3.2:3b`; model downloads require bandwidth, disk and compatible hardware). For a local browser demo, start Ollama with an explicitly allowed origin:

```sh
OLLAMA_ORIGINS=http://127.0.0.1:8080 ollama serve
```

Stop any existing Ollama service first if it already owns port 11434. Keep Ollama bound to localhost. Start this app at the exact origin above, enter your installed model name, and click **Select with model**. Only that click transmits the corpus to `http://localhost:11434/api/chat`. Timeout: 45s; corpus limit: 24k characters. No paid API, tokens or hosted proxy are used. A hosted HTTPS page may be unable to reach localhost due to browser security; use the local server for this optional path. Do not broadly allow arbitrary web origins.

## Scope and limits

12 sources, 100k characters/source; UTF-8 plain text only. Titles capture user-supplied provenance, not verified authorship. Citations refer to source/line numbers in the current session and its exported reference index. Sources are untrusted data; the system cannot distinguish a false statement from a true one. There is no PDF/OCR, web crawling, automatic fact checking, inference of causation, multilingual date parsing, cloud storage, accounts, analytics or advisory recommendation engine.

Dates are explicit valid `YYYY-MM-DD` strings only. A keyword heuristic marks **possible deadlines**, with a limited negation check; human review remains necessary. Exports are all-day reminders with exclusive next-day end dates, not legally precise cutoff times. ICS values are escaped and UTF-8 lines folded. The Markdown brief escapes source markup; inspect before reusing it in another tool. Source bodies are retained only in memory, except content you explicitly download or send to your local model.

## Tests

Node >=20. For browser tests, install development dependencies and a Chromium browser:

```sh
npm ci
npm test
npx playwright install chromium
npm run test:browser
```

On this build machine `/usr/bin/chromium` was used. Otherwise the configuration uses Playwright's downloaded browser. Set CHROMIUM_PATH to override the executable if necessary. Browser tests start a local Python server, exercise paste/upload, refusal, source inspection, XSS text handling, both downloads, mobile layout and mocked model success/rejection. Screenshots are written to `evidence/`. See [validation report](docs/VALIDATION.md) and [threat model](docs/SAFETY.md).

## Submission kit

[Pitch](Pitch.md), [video script](VIDEO_SCRIPT.md), [personal checklist](docs/SUBMISSION_CHECKLIST.md), [AI disclosure](AGENTS.md), MIT license. The script is not a submitted/hosted YouTube or Vimeo video. All build work for this repository began 13 November 2026; this does **not** make it suitable for events requiring a later project start. Agentware and Code Olympics are excluded.
