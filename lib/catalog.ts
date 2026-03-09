import { Track } from "./types";

// NOTE: Add Google Drive share links (Anyone with link) into driveShareLink fields below.
// The app will convert them to direct URLs at runtime.
export const TRACK_CATALOG: Track[] = [
  { id:"breath-reset-3", title:"Reset Breath", minutes:3, kind:"breath", isPremium:false, tags:["anxiety","stress","sleep","tension"], cover:"/covers/calm.svg", artist:"Breathwork", driveShareLink:"" },
  { id:"calm-mind-20", title:"Calm Mind Hypnosis", minutes:20, kind:"hypnosis", isPremium:true, tags:["anxiety","stress","tension","mood"], cover:"/covers/calm.svg", artist:"Hypnosis Studio", driveShareLink:"" },
  { id:"sleep-hypno-29", title:"Sleep Hypnosis", minutes:29, kind:"hypnosis", isPremium:true, tags:["sleep","anxiety","stress"], cover:"/covers/sleep.svg", artist:"Sleep Lab", driveShareLink:"" },
  { id:"cool-calm-10", title:"Cool & Calm Imagery", minutes:10, kind:"hypnosis", isPremium:true, tags:["hot_flashes","night_sweats","sleep","anxiety"], cover:"/covers/cool.svg", artist:"Cooling Series", driveShareLink:"" },
  { id:"night-rain-20", title:"Night Rain Soundscape", minutes:20, kind:"music", isPremium:false, tags:["sleep","stress","anxiety"], cover:"/covers/sleep.svg", artist:"Soundscapes", driveShareLink:"" },
  { id:"cooling-sound-20", title:"Cooling Soundscape", minutes:20, kind:"music", isPremium:true, tags:["hot_flashes","night_sweats","sleep"], cover:"/covers/cool.svg", artist:"Soundscapes", driveShareLink:"" },
  { id:"wind-down-5", title:"Wind‑Down Prompt", minutes:5, kind:"coaching", isPremium:false, tags:["sleep","stress","anxiety"], cover:"/covers/sleep.svg", artist:"Coaching", driveShareLink:"" },
  { id:"focus-priming-12", title:"Focus Priming", minutes:12, kind:"hypnosis", isPremium:true, tags:["focus","confidence","stress"], cover:"/covers/focus.svg", artist:"Focus Studio", driveShareLink:"" },
  { id:"deep-focus-18", title:"Deep Focus Music", minutes:18, kind:"music", isPremium:true, tags:["focus","confidence"], cover:"/covers/focus.svg", artist:"Focus Studio", driveShareLink:"" },
  { id:"letting-go-20", title:"Letting Go Hypnosis", minutes:20, kind:"hypnosis", isPremium:true, tags:["emotional_release","stress","mood","anxiety"], cover:"/covers/release.svg", artist:"Release Series", driveShareLink:"" },
  { id:"sound-bath-20", title:"Sound Bath", minutes:20, kind:"music", isPremium:true, tags:["spiritual_optin","stress","sleep"], cover:"/covers/sound.svg", artist:"Sound Medicine", driveShareLink:"" },
];
