"use client";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/Container";
import { Card } from "@/components/Card";
import { useAppStore } from "@/lib/store";
import { TRACK_CATALOG } from "@/lib/catalog";
import { CoverCard } from "@/components/CoverCard";

export default function PlayerPage() {
  const playlist = useAppStore((s) => s.playlist);
  const setNowPlaying = useAppStore((s) => s.setNowPlaying);
  const membership = useAppStore((s) => s.membership);
  const libraryIds = useAppStore((s) => s.library);
  const add = useAppStore((s) => s.addToLibrary);
  const remove = useAppStore((s) => s.removeFromLibrary);

  if (!playlist) {
    return (
      <main>
        <Container className="pt-6">
          <Card title="No playlist yet" subtitle="Create one first, then come back to play.">
            <div className="flex flex-col gap-2 sm:flex-row">
              <Link className="btn btn-primary" href="/symptoms">
                Create playlist
              </Link>
              <Link className="btn btn-soft" href="/library">
                Browse library
              </Link>
            </div>
          </Card>
        </Container>
      </main>
    );
  }

  const tracks = playlist.trackIds
    .map((id) => TRACK_CATALOG.find((t) => t.id === id))
    .filter(Boolean) as any[];

  return (
    <main>
      <Container className="pt-6">
        <div className="mb-6">
          <div className="flex items-center gap-4">
            <div className="cover h-24 w-24">
              <Image
                src={playlist.cover}
                alt={playlist.name}
                width={96}
                height={96}
                className="h-24 w-24 object-cover"
              />
            </div>
            <div className="min-w-0">
              <h1 className="truncate text-3xl font-semibold tracking-tight">{playlist.name}</h1>
              <p className="mt-2 muted text-sm">
                {tracks.length} tracks • {membership === "member" ? "Member access" : "Free access"}
              </p>
              <p className="mt-1 text-xs text-stoney-600">
                Tap a track to set “Now playing”. Controls live in the mini player bar (Apple Music vibe).
              </p>
            </div>
          </div>
        </div>

        <div className="grid gap-3">
          {tracks.map((t) => {
            const canPlay = !t.isPremium || membership === "member";
            const saved = libraryIds.includes(t.id);
            return (
              <div key={t.id} className="grid gap-2">
                <CoverCard
                  cover={t.cover}
                  title={t.title}
                  subtitle={`${t.artist ?? "Calm Studio"} • ${t.minutes} min • ${t.isPremium ? "Premium" : "Free"}`}
                  rightTag={canPlay ? "Play" : "Locked"}
                  onClick={() => {
                    if (canPlay) setNowPlaying(t.id);
                  }}
                />
                <div className="flex gap-2">
                  <button
                    className="pill"
                    onClick={() => (saved ? remove(t.id) : add(t.id))}
                  >
                    {saved ? "Saved ✓" : "Add to Library"}
                  </button>
                  <Link className="pill" href="/library">
                    Open Library
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-6">
          <Card title="Next Apple Music-like upgrades" subtitle="If you want it even closer to iOS Music">
            <ul className="list-disc pl-5 text-sm text-stoney-600 space-y-1">
              <li>Bottom tab bar (Home / Library / Search / Account)</li>
              <li>Track detail screen with artwork + lyrics-style script text</li>
              <li>Sleep timer + fade-out</li>
              <li>Queue editing + shuffle/repeat</li>
            </ul>
          </Card>
        </div>
      </Container>
    </main>
  );
}
