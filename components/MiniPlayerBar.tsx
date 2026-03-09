"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef } from "react";
import cn from "classnames";
import { useAppStore } from "@/lib/store";
import { TRACK_CATALOG } from "@/lib/catalog";
import { resolveAudioUrl } from "@/lib/driveLinks";

export function MiniPlayerBar() {
  const playlist = useAppStore(s => s.playlist);
  const nowPlayingId = useAppStore(s => s.nowPlayingId);
  const setNowPlaying = useAppStore(s => s.setNowPlaying);
  const membership = useAppStore(s => s.membership);
  const isPlaying = useAppStore(s => s.isPlaying);
  const setIsPlaying = useAppStore(s => s.setIsPlaying);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  const queue = playlist?.trackIds ?? [];
  const idx = nowPlayingId ? queue.indexOf(nowPlayingId) : -1;

  const track = useMemo(
    () => TRACK_CATALOG.find(t => t.id === nowPlayingId),
    [nowPlayingId]
  );

  const src = track ? resolveAudioUrl(track) : undefined;
  const missing = !src;
  const canPlay = track ? (!track.isPremium || membership === "member") : false;

  // Auto-advance on end
  useEffect(() => {
    const a = audioRef.current;
    if (!a) return;

    const onEnd = () => {
      setIsPlaying(false);
      if (queue.length && idx >= 0 && idx < queue.length - 1) {
        setNowPlaying(queue[idx + 1]);
      }
    };

    a.addEventListener("ended", onEnd);
    return () => a.removeEventListener("ended", onEnd);
  }, [idx, queue, setNowPlaying, setIsPlaying]);

  // Reset player on track change
  useEffect(() => {
    const a = audioRef.current;
    if (!a) return;
    a.pause();
    a.currentTime = 0;
    setIsPlaying(false);
  }, [nowPlayingId, setIsPlaying]);

  const playPause = async () => {
    const a = audioRef.current;
    if (!a || !track || !src || !canPlay) return;

    try {
      if (isPlaying) {
        a.pause();
        setIsPlaying(false);
      } else {
        // Ensure src is applied before play
        if (a.src !== src) a.src = src;
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

  if (!track || !playlist) return null;

  return (
    <div className="playerbar">
      <div className="mx-auto max-w-4xl px-4 py-3">
        <div className="flex items-center gap-3">
          <Link href="/player" className="cover h-12 w-12 shrink-0">
            <Image
              src={track.cover}
              alt={track.title}
              width={48}
              height={48}
              className="h-12 w-12 object-cover"
            />
          </Link>

          <div className="min-w-0 flex-1">
            <div className="truncate font-semibold">
              {track.title}{missing ? " (link needed)" : ""}
            </div>
            <div className="truncate text-xs text-stoney-600">
              {(track as any).artist ?? "Calm Studio"} • {track.minutes} min {track.isPremium ? "• Premium" : ""}
            </div>
            {missing ? (
              <div className="text-xs text-accent-700">
                Add the Google Drive share link for this track in <code>lib/catalog.ts</code>.
              </div>
            ) : null}
            {!canPlay ? (
              <div className="text-xs text-accent-700">
                Members only. Toggle membership in Account (beta).
              </div>
            ) : null}
          </div>

          <div className="flex items-center gap-2">
            <button className="btn btn-ghost py-2" onClick={() => skip(-1)} disabled={idx <= 0}>
              Prev
            </button>
            <button
              className={cn("btn btn-primary py-2", (!canPlay || missing) && "opacity-60")}
              onClick={playPause}
              disabled={!canPlay || missing}
            >
              {isPlaying ? "Pause" : "Play"}
            </button>
            <button className="btn btn-ghost py-2" onClick={() => skip(1)} disabled={idx < 0 || idx >= queue.length - 1}>
              Next
            </button>
          </div>
        </div>

        <audio ref={audioRef} src={src ?? ""} preload="metadata" />
      </div>
    </div>
  );
}
