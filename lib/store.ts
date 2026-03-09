import { create } from "zustand";
import { Membership, Playlist, SymptomTag, Track } from "./types";
import { buildPlaylistFromSymptoms } from "./recommender";
import { TRACK_CATALOG } from "./catalog";

type User = { email: string; name?: string };

type AppState = {
  user: User | null;
  membership: Membership;
  symptoms: SymptomTag[];
  playlist: Playlist | null;
  library: string[];
  nowPlayingId: string | null;
  isPlaying: boolean;

  setUser: (u: User | null) => void;
  toggleMembership: () => void;

  toggleSymptom: (s: SymptomTag) => void;
  buildMyPlaylist: () => void;

  addToLibrary: (trackId: string) => void;
  removeFromLibrary: (trackId: string) => void;

  setNowPlaying: (trackId: string | null) => void;
  setIsPlaying: (playing: boolean) => void;

  logout: () => void;

  getTrack: (id: string) => Track | undefined;
  canPlay: (id: string) => boolean;
};

const LS_KEY = "calm_studio_beta_state_v3";

// BACKEND INTEGRATION NOTES:
// - Replace localStorage persistence with API calls (see lib/adapter.ts)
// - Keep this store as UI state only; move source-of-truth (library, membership, playlists) to backend


function load(): Pick<AppState, "user"|"membership"|"symptoms"|"playlist"|"library"|"nowPlayingId"|"isPlaying"> {
  if (typeof window === "undefined") return { user:null, membership:"free", symptoms:[], playlist:null, library:[], nowPlayingId:null, isPlaying:false };
  try {
    const raw = window.localStorage.getItem(LS_KEY);
    if (!raw) return { user:null, membership:"free", symptoms:[], playlist:null, library:[], nowPlayingId:null, isPlaying:false };
    const p = JSON.parse(raw);
    return {
      user: p.user ?? null,
      membership: p.membership === "member" ? "member" : "free",
      symptoms: p.symptoms ?? [],
      playlist: p.playlist ?? null,
      library: p.library ?? [],
      nowPlayingId: p.nowPlayingId ?? null,
      isPlaying: !!p.isPlaying,
    };
  } catch {
    return { user:null, membership:"free", symptoms:[], playlist:null, library:[], nowPlayingId:null, isPlaying:false };
  }
}

function persist(state: AppState) {
  if (typeof window === "undefined") return;
  const minimal = {
    user: state.user,
    membership: state.membership,
    symptoms: state.symptoms,
    playlist: state.playlist,
    library: state.library,
    nowPlayingId: state.nowPlayingId,
    isPlaying: state.isPlaying,
  };
  window.localStorage.setItem(LS_KEY, JSON.stringify(minimal));
}

export const useAppStore = create<AppState>((set, get) => ({
  ...load(),

  setUser: (u) => { set({ user: u }); persist(get()); },
  toggleMembership: () => {
    const next = get().membership === "free" ? "member" : "free";
    set({ membership: next });
    persist(get());
  },

  toggleSymptom: (s) => {
    const cur = get().symptoms;
    const next = cur.includes(s) ? cur.filter(x => x !== s) : [...cur, s];
    set({ symptoms: next });
    persist(get());
  },

  buildMyPlaylist: () => {
    const pl = buildPlaylistFromSymptoms(get().symptoms);
    set({ playlist: pl, nowPlayingId: pl.trackIds[0] ?? null });
    persist(get());
  },

  addToLibrary: (trackId) => {
    const cur = get().library;
    if (cur.includes(trackId)) return;
    set({ library: [...cur, trackId] });
    persist(get());
  },
  removeFromLibrary: (trackId) => {
    set({ library: get().library.filter(x => x !== trackId) });
    persist(get());
  },

  setNowPlaying: (trackId) => { set({ nowPlayingId: trackId }); persist(get()); },
  setIsPlaying: (playing) => { set({ isPlaying: playing }); persist(get()); },

  logout: () => { set({ user:null, membership:"free", symptoms:[], playlist:null, library:[], nowPlayingId:null, isPlaying:false }); persist(get()); },

  getTrack: (id) => TRACK_CATALOG.find(t => t.id === id),
  canPlay: (id) => {
    const t = TRACK_CATALOG.find(x => x.id === id);
    if (!t) return false;
    if (!t.isPremium) return true;
    return get().membership === "member";
  },
}));
