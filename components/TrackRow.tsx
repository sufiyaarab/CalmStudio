"use client";
import { Track } from "@/lib/types";
import { Badge } from "./Badge";
import cn from "classnames";

export function TrackRow({
  track,
  canPlay,
  inLibrary,
  onPlay,
  onToggleLibrary,
}: {
  track: Track;
  canPlay: boolean;
  inLibrary: boolean;
  onPlay: () => void;
  onToggleLibrary: () => void;
}) {
  return (
    <div className={cn("rounded-xl2 border border-stoney-200 bg-white/70 p-4")}>
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="font-semibold">{track.title}</div>
          <div className="mt-1 text-sm text-stoney-600">
            {track.minutes} min • <span className="capitalize">{track.kind}</span>
            {track.isPremium ? " • Premium" : " • Free"}
          </div>
          <div className="mt-2 flex flex-wrap gap-2">
            {track.tags.slice(0, 4).map((t) => (
              <Badge key={t}>{t.replaceAll("_"," ")}</Badge>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <button className={cn("btn btn-primary py-2", !canPlay && "opacity-60")} onClick={onPlay} disabled={!canPlay}>
            {canPlay ? "Play" : "Members only"}
          </button>
          <button className="btn btn-ghost py-2" onClick={onToggleLibrary}>
            {inLibrary ? "Remove" : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
}
