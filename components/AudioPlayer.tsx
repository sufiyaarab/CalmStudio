"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import { useAppStore } from "@/lib/store";
import { TRACK_CATALOG } from "@/lib/catalog";
import cn from "classnames";

export function AudioPlayer() {
  const playlist = useAppStore(s => s.playlist);
  const nowPlayingId = useAppStore(s => s.nowPlayingId);
  const setNowPlaying = useAppStore(s => s.setNowPlaying);
  const membership = useAppStore(s => s.membership);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  const queue = playlist?.trackIds ?? [];
  const idx = nowPlayingId ? queue.indexOf(nowPlayingId) : -1;

  const track = useMemo(() => TRACK_CATALOG.find(t => t.id === nowPlayingId), [nowPlayingId]);
  const canPlay = !track?.isPremium || membership === "member";

  useEffect(() => {
    const a = audioRef.current;
    if (!a) return;
    const onTime = () => setProgress(a.duration ? a.currentTime / a.duration : 0);
    const onEnd = () => {
      setIsPlaying(false);
      if (queue.length && idx >= 0 && idx < queue.length - 1) setNowPlaying(queue[idx + 1]);
    };
    a.addEventListener("timeupdate", onTime);
    a.addEventListener("ended", onEnd);
    return () => {
      a.removeEventListener("timeupdate", onTime);
      a.removeEventListener("ended", onEnd);
    };
  }, [idx, queue, setNowPlaying]);

  useEffect(() => {
    const a = audioRef.current;
    if (!a) return;
    setProgress(0);
    setIsPlaying(false);
    a.pause();
    a.currentTime = 0;
  }, [nowPlayingId]);

  const playPause = async () => {
    const a = audioRef.current;
    if (!a || !track || !track.audioUrl || !canPlay) return;
    try {
      if (isPlaying) {
        a.pause();
        setIsPlaying(false);
      } else {
        await a.play();
        setIsPlaying(true);
      }
    } catch {
      setIsPlaying(false);
    }
  };

  const skip = (dir: -1 | 1) => {
    if (!queue.length || idx < 0) return;
    const next = idx + dir;
    if (next < 0 || next >= queue.length) return;
    setNowPlaying(queue[next]);
  };

  return (
    <div className="card p-5">
      <div className="flex items-center justify-between gap-3">
        <div>
          <div className="text-sm text-stoney-600">Now playing</div>
          <div className="font-semibold">{track ? track.title : "Nothing selected"}</div>
          <div className="mt-1 text-sm text-stoney-600">
            {track ? `${track.minutes} min • ${track.isPremium ? "Premium" : "Free"}` : "Build a playlist to begin"}
          </div>
          {!canPlay && track ? (
            <div className="mt-2 text-xs text-accent-700">This track is premium. Toggle “Member” in Account (beta) to play.</div>
          ) : null}
        </div>

        <div className="flex items-center gap-2">
          <button className="btn btn-ghost py-2" onClick={() => skip(-1)} disabled={idx <= 0}>Prev</button>
          <button className={cn("btn btn-primary py-2", (!track || !canPlay) && "opacity-60")} onClick={playPause} disabled={!track || !canPlay}>
            {isPlaying ? "Pause" : "Play"}
          </button>
          <button className="btn btn-ghost py-2" onClick={() => skip(1)} disabled={idx < 0 || idx >= queue.length - 1}>Next</button>
        </div>
      </div>

      <div className="mt-4 h-2 w-full rounded-full bg-stoney-200">
        <div className="h-2 rounded-full bg-accent-700" style={{ width: `${Math.round(progress * 100)}%` }} />
      </div>

      <audio ref={audioRef} src={track?.audioUrl} preload="metadata" />
      <div className="mt-3 text-xs text-stoney-600">
        Beta note: audio URLs are placeholders. Add real files in <code>public/audio</code> or connect signed URLs later.
      </div>
    </div>
  );
}
