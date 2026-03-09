# Drive-only Setup (No Service Account)

This is the simplest “everything stays in her Google Drive” method.

## 1) Upload tracks to Drive
- Create folder: `CalmStudio Tracks`
- Upload MP3s (one per track)

## 2) Share each track as “Anyone with the link”
For each MP3:
- Right click → Share
- General access: **Anyone with the link**
- Role: **Viewer**
- Copy link

## 3) Paste links into the app catalog
Open: `lib/catalog.ts`

Each track has:
- `isPremium: true/false`
- `driveShareLink: ""`

Paste the share link into `driveShareLink`.

Example:
```ts
{ id:"calm-mind-20", title:"Calm Mind Hypnosis", ..., isPremium:true, driveShareLink:"https://drive.google.com/file/d/FILE_ID/view?usp=sharing" }
```

The app converts it to a direct URL automatically.

## 4) Test playback
Run the app:
```bash
npm install
npm run dev
```
Play a track.

## Notes / limitations
- This is great for **beta** and small user counts.
- Drive is not a streaming CDN; heavy traffic can cause throttling.
- “Premium” locking in the app UI does not truly protect the file if someone shares the link.
  If you need real protection later, you’ll want a backend that streams privately.
