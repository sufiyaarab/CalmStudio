# Calm Studio — Beta v4 (Apple Music vibe + Playlists on top)

## What you asked for
- Apple Music feel (cleaner, pill nav, bigger headers)
- Library shows **My Playlists** at the top + browse free/premium
- Still keeps symptom-based curation (Create → Symptoms → Generate playlist)

## Run
```bash
npm install
npm run dev
```
Open http://localhost:3000

## Audio demo
Add any mp3 at:
`public/audio/placeholder.mp3`

## Backend connection point
`lib/adapter.ts` is the “outer function” connector for later API calls.

## Mystic theme images
The background theme uses the two reference images placed at:
- `public/theme/mystic-1.png`
- `public/theme/mystic-2.png`

Swap these files to change the vibe, or adjust `.mystic-bg` in `app/globals.css`.

## Drive-only (share links) setup (no service account)
If you want to keep **all tracks in Google Drive**, share each track as:
- “Anyone with the link” → Viewer

Then paste those links into `lib/catalog.ts` under `driveShareLink`.

The app will convert them into direct links at runtime for beta playback.

See `DRIVE_ONLY_SETUP.md` for step-by-step.


## Folder-based Drive workflow
See `DRIVE_FOLDER_WORKFLOW.md` for the Drive folder organization approach (no service account).
