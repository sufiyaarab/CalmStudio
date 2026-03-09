import { SymptomTag } from "./types";

export const SYMPTOMS: { id: SymptomTag; label: string; subtitle: string }[] = [
  { id: "anxiety", label: "Anxiety", subtitle: "racing thoughts, worry, panic-ish feelings" },
  { id: "stress", label: "Stress", subtitle: "feeling overloaded, tense, on-edge" },
  { id: "sleep", label: "Sleep", subtitle: "trouble falling asleep or waking at night" },
  { id: "hot_flashes", label: "Hot flashes", subtitle: "sudden heat, flushing" },
  { id: "night_sweats", label: "Night sweats", subtitle: "waking hot/sweaty" },
  { id: "mood", label: "Mood", subtitle: "irritability, low mood, emotional swings" },
  { id: "focus", label: "Focus", subtitle: "brain fog, attention issues" },
  { id: "confidence", label: "Confidence", subtitle: "self-doubt, performance nerves" },
  { id: "tension", label: "Body tension", subtitle: "jaw/shoulders, restlessness" },
  { id: "emotional_release", label: "Emotional release", subtitle: "processing feelings, letting go" },
  { id: "spiritual_optin", label: "Sound / energy (opt‑in)", subtitle: "sound medicine themes, intention work" },
];
