/**
 * Convert a Google Drive share link into a direct media URL.
 *
 * Expected share links often look like:
 * - https://drive.google.com/file/d/<FILE_ID>/view?usp=sharing
 * - https://drive.google.com/open?id=<FILE_ID>
 * - https://drive.google.com/uc?id=<FILE_ID>&export=download
 *
 * For beta streaming, the most common direct form is:
 * - https://drive.google.com/uc?export=download&id=<FILE_ID>
 *
 * NOTE: Google Drive is not a streaming CDN. This is suitable for beta/small audiences.
 */
export function extractDriveFileId(link: string): string | null {
  if (!link) return null;
  try {
    const u = new URL(link);
    // /file/d/<id>/view
    const m = u.pathname.match(/\/file\/d\/([^/]+)/);
    if (m?.[1]) return m[1];

    // open?id=<id> or uc?id=<id>
    const id = u.searchParams.get("id");
    if (id) return id;

    // Sometimes share links like https://drive.google.com/drive/folders/<id>
    return null;
  } catch {
    // If it's not a valid URL, try regex
    const m = link.match(/\/file\/d\/([^/]+)/);
    if (m?.[1]) return m[1];
    const m2 = link.match(/[?&]id=([^&]+)/);
    if (m2?.[1]) return m2[1];
    return null;
  }
}

export function driveDirectDownloadUrl(fileId: string): string {
  return `https://drive.google.com/uc?export=download&id=${encodeURIComponent(fileId)}`;
}

export function resolveAudioUrl(track: { audioUrl?: string; driveShareLink?: string }): string | undefined {
  if (track.audioUrl) return track.audioUrl;
  const fid = track.driveShareLink ? extractDriveFileId(track.driveShareLink) : null;
  if (!fid) return undefined;
  return driveDirectDownloadUrl(fid);
}
