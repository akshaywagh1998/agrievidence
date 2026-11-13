# Actual browser recording

`demo.mp4` is an actual Chromium recording of the verified hosted demo, with readable captions added to the page only during recording. It is **86.88 seconds**, 1440×1000, H.264, yuv420p, silent, with MP4 fast-start metadata. No real private documents were used. The pasted field note is synthetic. No actual local model inference is shown.

The recording visibly demonstrates evidence search, original source context, no-evidence refusal, Markdown and ICS downloads, date selection, a pasted authorized synthetic note and the optional model interface. The example downloaded files are included alongside it. Tests separately check upload, mobile and hostile model-output handling.

You can upload this file directly as the <=3-minute working-project video, after your personal review. It is not yet on YouTube/Vimeo or embedded on Devpost. Narration is optional; VIDEO_SCRIPT.md supplies a 2m35s narrated alternative.

To reproduce: `npm ci`, `npx playwright install ffmpeg`, then `npm run record:demo -- <demo-url>`. The recording script uses `/usr/bin/chromium` unless CHROMIUM_PATH overrides it, and outputs evidence/demo.webm. Convert with:

```
ffmpeg -i evidence/demo.webm -c:v libx264 -preset fast -crf 26 -pix_fmt yuv420p -movflags +faststart -an evidence/demo.mp4
```
