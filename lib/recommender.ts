import { SymptomTag, Playlist } from "./types";
import { TRACK_CATALOG } from "./catalog";

export function buildPlaylistFromSymptoms(symptoms: SymptomTag[]): Playlist {
  const set = new Set(symptoms);
  const scored = TRACK_CATALOG.map((t) => {
    const overlap = t.tags.filter(x => set.has(x)).length;
    let score = overlap;
    if (t.id === "breath-reset-3" && (set.has("anxiety") || set.has("stress") || set.has("sleep") || set.has("tension"))) score += 3;
    return { t, score };
  }).filter(x => x.score > 0).sort((a,b) => b.score - a.score);

  const chosen: string[] = [];
  const breath = scored.find(s => s.t.id === "breath-reset-3");
  if (breath) chosen.push(breath.t.id);
  for (const s of scored) {
    if (chosen.length >= 10) break;
    if (!chosen.includes(s.t.id)) chosen.push(s.t.id);
  }
  if (!chosen.length) chosen.push("breath-reset-3", "night-rain-20");

  const cover = set.has("sleep") ? "/covers/sleep.svg"
    : (set.has("hot_flashes") || set.has("night_sweats")) ? "/covers/cool.svg"
    : set.has("focus") ? "/covers/focus.svg"
    : set.has("emotional_release") ? "/covers/release.svg"
    : set.has("spiritual_optin") ? "/covers/sound.svg"
    : "/covers/calm.svg";

  return { id:"my-playlist", name:"My Playlist", trackIds: chosen, cover };
}
