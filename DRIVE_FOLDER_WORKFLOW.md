# Folder-Based Google Drive Workflow (No Service Account)

## What you asked for
“Check certain folders for the related audio track for specific symptoms.”

## Reality (important)
With a normal personal Google Drive **and no service account / no Google sign-in**, a web app cannot reliably and securely “list all files inside a Drive folder.”
Google Drive does not provide a stable public folder-listing API for that setup.

## What WILL work (and is implemented)
### Drive for everything + folder organization
1) She creates symptom folders in Google Drive (for her organization).
2) She uploads tracks into those folders.
3) She shares each **track file** as:
   - **Anyone with the link → Viewer**
4) You paste the share links into the app’s track list (`lib/catalog.ts`).

The app then:
- curates playlists by symptom tags
- plays the correct Drive audio links
- keeps Free vs Premium classification in the catalog

Folders are still useful because:
- it keeps her Drive neat
- she always knows “where to upload” for each symptom
- it makes future automation easier (if later you add OAuth/service account)

## Where to paste folder links (optional)
`lib/driveFolders.ts` → `SYMPTOM_FOLDERS`
This is just a reference mapping so you (and later devs) stay organized.

## Where to paste track links (required for playback)
`lib/catalog.ts` → each track object has:
- `isPremium: true/false`
- `driveShareLink: "PASTE_LINK_HERE"`

If a track link is missing, the player will show **“(link needed)”** and play is disabled.

---

## If she later wants “upload file → auto appears”
That requires one of:
- Google OAuth (Sign in with Google) + Drive API
- or Service Account + Drive API
- or Google Apps Script automation that updates a catalog sheet/json

For beta, manual link pasting is the cleanest and most reliable.
