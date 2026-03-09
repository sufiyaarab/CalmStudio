import { SymptomTag } from "./types";

/**
 * Optional: Paste Google Drive FOLDER share links (Anyone with link → Viewer).
 * This is for ORGANIZATION + instructions. Google Drive does not provide a reliable
 * unauthenticated “list folder contents” API for private folders.
 *
 * For this beta, the app plays tracks from per-track `driveShareLink` values in `lib/catalog.ts`.
 * Use these folder links as a simple convention for how she organizes uploads.
 */
export const SYMPTOM_FOLDERS: Partial<Record<SymptomTag, string>> = {
  anxiety: "",
  stress: "",
  sleep: "",
  hot_flashes: "",
  night_sweats: "",
  mood: "",
  focus: "",
  confidence: "",
  tension: "",
  emotional_release: "",
  spiritual_optin: "",
};
