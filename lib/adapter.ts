/**
 * Adapter layer so later devs can connect a real backend without touching UI.
 * Replace these functions with API calls (REST/GraphQL/etc.).
 */
import { Track, Playlist, Membership, SymptomTag } from "./types";
import { TRACK_CATALOG } from "./catalog";
import { buildPlaylistFromSymptoms } from "./recommender";

export type DataAdapter = {
  fetchCatalog: () => Promise<Track[]>;
  buildPlaylist: (symptoms: SymptomTag[]) => Promise<Playlist>;

  fetchLibrary: (userKey: string) => Promise<string[]>;
  saveLibrary: (userKey: string, trackIds: string[]) => Promise<void>;

  fetchMembership: (userKey: string) => Promise<Membership>;
  saveMembership: (userKey: string, membership: Membership) => Promise<void>;
};

export const LocalAdapter: DataAdapter = {
  fetchCatalog: async () => TRACK_CATALOG,
  buildPlaylist: async (symptoms) => buildPlaylistFromSymptoms(symptoms),
  fetchLibrary: async () => [],
  saveLibrary: async () => {},
  fetchMembership: async () => "free",
  saveMembership: async () => {},
};

/**
 * === BACKEND INTEGRATION NOTES (leave as comments for future devs) ===
 *
 * Recommended production wiring (Canada-only):
 * - Postgres (managed) in Canada region (e.g., DigitalOcean TOR1 managed Postgres)
 * - Object storage for audio/video (e.g., DigitalOcean Spaces TOR1 or S3 ca-central-1)
 * - Backend API (Next.js Route Handlers or Express) holds DB creds; clients NEVER connect to DB directly
 *
 * Typical endpoints:
 * - POST /api/auth/signup
 * - POST /api/auth/login
 * - GET  /api/tracks
 * - POST /api/playlists/generate   { symptoms: string[] } -> { playlist }
 * - GET  /api/library              -> { trackIds: string[] }
 * - POST /api/library              { trackIds: string[] }
 * - GET  /api/media/signed-url?key=...  -> { url }  (for premium playback)
 *
 * Auth:
 * - Use email+password or magic link; issue JWT/session cookie
 * - Membership entitlements come from Stripe + Apple/Google IAP later
 *
 * Media:
 * - Store file metadata in Postgres; store actual files in object storage
 * - Return signed URLs for premium content (time-limited, user-authorized)
 */
