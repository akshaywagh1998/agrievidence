# Safety and threat review

The narrow safety boundary is **no newly invented factual prose**: baseline shows whole matching lines; optional models may select whole existing lines only. This is evidence retrieval, not an agronomic adviser. Imported text may itself be false, harmful, copyrighted, malicious or instruction-like. A valid quote is not a verified claim. Review source authority, context and permitted use before reliance.

| Threat | Defense and tested behavior | Residual limit |
|---|---|---|
| Prompt injection in a source | Corpus serialized as untrusted data, explicit model system rule, no tools/actions, exact output validator rejects invented text | A model can still select a malicious/irrelevant existing line; labeled unverified and shown with context |
| Citation hallucination | Unknown locator, changed quote, duplicate, schema extras rejected | Existing source can contain misinformation |
| HTML/script in title/source | DOM text escaped, no evaluation of source markup | Any newly added render path must preserve escaping |
| Malformed/oversized imports | Titles/text bounded, NUL rejected, source cap, .txt input restriction | Large allowed corpora can still slow rendering on weak devices |
| ICS property injection | Newline/comma/semicolon/backslash escaping, 75-byte UTF-8 folding | Importer bugs are outside scope; inspect original date context |
| Markdown injection | HTML entity and Markdown metacharacter escaping in brief | Other consumers may reinterpret exported text; review before republishing |
| Stale async model response | Revision checks discard result if query/library changes | Model relevance is never certified |
| Network/model failure | 45s timeout, transport/JSON/schema errors visible, prior results retained | Local model availability and browser CORS/private-network rules vary |
| Private text exposure | No storage or analytics; local memory; model only on explicit click | Browser extensions, downloaded files and user's Ollama configuration remain their responsibility |
| Calendar ambiguity | No dates selected by default; date/possible-deadline distinction; all-day labeling | Keyword heuristic cannot understand all negation or multi-date context |

No source can make the app open a URL, call a tool, execute code, post a message or submit a form externally. The only model endpoint is a fixed localhost address. This does not make the content safe to follow. No security audit, agronomic validation, impact measurement or large-scale performance study is claimed.
