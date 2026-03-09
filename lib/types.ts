export type Track = {
  id: string;
  title: string;
  minutes: number;
  kind: "hypnosis" | "music" | "breath" | "coaching";
  isPremium: boolean;
  tags: SymptomTag[];
  cover: string;
  artist?: string;
  audioUrl?: string;
  driveShareLink?: string; // optional: Google Drive share link (Anyone with link)
};

export type Playlist = {
  id: string;
  name: string;
  trackIds: string[];
  cover: string;
};

export type Membership = "free" | "member";

export type SymptomTag =
  | "anxiety"
  | "stress"
  | "sleep"
  | "hot_flashes"
  | "night_sweats"
  | "mood"
  | "focus"
  | "confidence"
  | "tension"
  | "emotional_release"
  | "spiritual_optin";

export type PackageTier = "starter" | "core" | "premium";

export type PackagePlaylist = {
  name: string;
  trackIds: string[]; // IDs from your track catalog
};

export type PackageCard = {
  id: string;

  // Used by app/packages/page.tsx
  name: string;
  for: string;

  supports: string;
  durationDays: number;
  includes: string[];

  tier: PackageTier;
  playlists: PackagePlaylist[];

  priceNote: string; // "low" | "mid" | "high" (or any label you want)
};