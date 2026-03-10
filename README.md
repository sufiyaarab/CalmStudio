# Calm Studio 

## Run
```bash
npm install
npm run dev
```
Open http://localhost:3000


## Backend connection point
`lib/adapter.ts` is the “outer function” connector for later API calls.

## Mystic theme images
The background theme uses the two reference images placed at:
- `public/theme/mystic-1.png`
- `public/theme/mystic-2.png`

## Drive-only (share links) setup (no service account)
If you want to keep **all tracks in Google Drive**, share each track as:
- “Anyone with the link” → Viewer

Then paste those links into `lib/catalog.ts` under `driveShareLink`.

The app will convert them into direct links at runtime for beta playback.

See `DRIVE_ONLY_SETUP.md` for step-by-step.


## Folder-based Drive workflow
See `DRIVE_FOLDER_WORKFLOW.md` for the Drive folder organization approach (no service account).

## Client Setup Notes (Google Drive “Anyone with the link”)

This beta app plays audio from **Google Drive share links**. To work correctly, each MP3 must be shared properly and its link pasted into the track catalog.

---

### 1) Upload tracks to Google Drive
1. Create a folder in Google Drive (example: **CalmStudio Tracks**)
2. Upload your MP3 files into this folder (optional: organize in subfolders)

---

### 2) Share each MP3 correctly (required)
For **each MP3 file**:
1. Right-click the MP3 → **Share**
2. Under **General access** select: **Anyone with the link**
3. Set role to: **Viewer**
4. Click **Copy link**

If this step is skipped, the app will not be able to play the track.

---

### 3) Where to paste the Google Drive links in the app
Open:

**`lib/catalog.ts`**

Each track includes a field called `driveShareLink`. Paste the **FILE share link** there (not a folder link).

Example:

```ts
{
  id: "sleep-drift-10",
  title: "Sleep Drift",
  minutes: 10,
  kind: "hypnosis",
  isPremium: true,
  tags: ["sleep", "stress"],
  cover: "/covers/sleep.svg",
  driveShareLink: "PASTE_GOOGLE_DRIVE_FILE_LINK_HERE"
}