"use client";
import { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/Container";
import { Card } from "@/components/Card";
import { CoverCard } from "@/components/CoverCard";
import { Pills } from "@/components/Pills";
import { useAppStore } from "@/lib/store";
import { TRACK_CATALOG } from "@/lib/catalog";

type ViewMode = "playlists" | "tracks";

export default function LibraryPage() {
  const membership = useAppStore((s) => s.membership);
  const libraryIds = useAppStore((s) => s.library);
  const playlist = useAppStore((s) => s.playlist);
  const setNowPlaying = useAppStore((s) => s.setNowPlaying);
  const add = useAppStore((s) => s.addToLibrary);
  const remove = useAppStore((s) => s.removeFromLibrary);

  const [mode, setMode] = useState<ViewMode>("playlists");

  const savedTracks = useMemo(
    () => libraryIds.map((id) => TRACK_CATALOG.find((t) => t.id === id)).filter(Boolean) as any[],
    [libraryIds]
  );

  const canPlay = (t: any) => !t.isPremium || membership === "member";

  const freeTracks = TRACK_CATALOG.filter((t) => !t.isPremium);
  const premiumTracks = TRACK_CATALOG.filter((t) => t.isPremium);

  // Virtual playlists (Apple Music vibe)
  const myPlaylists = useMemo(() => {
    const items: { id: string; name: string; cover: string; subtitle: string; trackIds: string[] }[] = [];

    if (playlist) {
      items.push({
        id: playlist.id,
        name: playlist.name,
        cover: playlist.cover,
        subtitle: `${playlist.trackIds.length} tracks • curated from symptoms`,
        trackIds: playlist.trackIds,
      });
    }

    items.push({
      id: "favorites",
      name: "Favorites",
      cover: "/covers/calm.svg",
      subtitle: `${savedTracks.length} saved track${savedTracks.length === 1 ? "" : "s"}`,
      trackIds: savedTracks.map((t) => t.id),
    });

    return items;
  }, [playlist, savedTracks]);

  return (
    <main>
      <Container className="pt-6">
        <div className="mb-6">
          <h1 className="text-3xl font-semibold tracking-tight">Library</h1>
          <p className="mt-2 muted">
            Apple Music‑style layout: your playlists at the top, then browse tracks.
          </p>
        </div>

        <div className="mb-4">
          <Pills
            options={[
              { key: "playlists", label: "Playlists" },
              { key: "tracks", label: "Tracks" },
            ]}
            value={mode}
            onChange={(k) => setMode(k as ViewMode)}
          />
        </div>

        {mode === "playlists" ? (
          <div className="grid gap-4">
            <Card title="My Playlists" subtitle="Curated playlists + your saved favorites.">
              <div className="grid gap-3 sm:grid-cols-2">
                {myPlaylists.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => {
                      if (!p.trackIds.length) return;
                      setNowPlaying(p.trackIds[0]);
                    }}
                    className="w-full text-left rounded-xl2 border border-stoney-200 bg-white/65 hover:bg-white/80 transition p-3"
                  >
                    <div className="flex items-center gap-3">
                      <div className="cover h-16 w-16 shrink-0">
                        <Image src={p.cover} alt={p.name} width={64} height={64} className="h-16 w-16 object-cover" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="truncate font-semibold">{p.name}</div>
                        <div className="truncate text-sm text-stoney-600">{p.subtitle}</div>
                      </div>
                      <div className="rounded-full bg-ink-900 px-3 py-1 text-xs font-semibold text-white">Play</div>
                    </div>
                  </button>
                ))}
              </div>

              {!playlist ? (
                <div className="mt-4 rounded-xl2 border border-stoney-200 bg-white/60 p-4 text-sm text-stoney-600">
                  No curated playlist yet — build one in{" "}
                  <Link className="underline" href="/symptoms">
                    Create
                  </Link>
                  .
                </div>
              ) : null}
            </Card>

            <Card title="Browse" subtitle="Jump to free tracks or premium tracks.">
              <div className="grid gap-2 sm:grid-cols-2">
                <Link className="btn btn-soft" href="/library#free">Free tracks</Link>
                <Link className="btn btn-soft" href="/library#premium">Premium tracks</Link>
              </div>
              <div className="mt-3 text-xs text-stoney-600">
                Tip: You can also switch to <b>Tracks</b> above to browse like a catalog.
              </div>
            </Card>
          </div>
        ) : (
          <div className="grid gap-4">
            <Card title="Your saved tracks" subtitle={savedTracks.length ? `${savedTracks.length} saved` : "Save tracks to see them here"}>
              {savedTracks.length ? (
                <div className="grid gap-3 sm:grid-cols-2">
                  {savedTracks.map((t) => (
                    <CoverCard
                      key={t.id}
                      cover={t.cover}
                      title={t.title}
                      subtitle={`${t.artist ?? "Calm Studio"} • ${t.minutes} min`}
                      rightTag={canPlay(t) ? "Play" : "Locked"}
                      onClick={() => {
                        if (canPlay(t)) setNowPlaying(t.id);
                      }}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-sm text-stoney-600">
                  Save tracks below, or create a curated playlist in{" "}
                  <Link className="underline" href="/symptoms">
                    Create
                  </Link>
                  .
                </div>
              )}
            </Card>

            <Card title="Browse (free)" subtitle="Always available">
              <div id="free" className="grid gap-3 sm:grid-cols-2">
                {freeTracks.map((t) => (
                  <CoverCard
                    key={t.id}
                    cover={t.cover}
                    title={t.title}
                    subtitle={`${t.artist ?? "Calm Studio"} • ${t.minutes} min • Free`}
                    rightTag={libraryIds.includes(t.id) ? "Saved" : "Save"}
                    onClick={() => (libraryIds.includes(t.id) ? remove(t.id) : add(t.id))}
                  />
                ))}
              </div>
            </Card>

            <Card title="Browse (premium)" subtitle="Member access required">
              <div id="premium" className="grid gap-3 sm:grid-cols-2">
                {premiumTracks.map((t) => (
                  <CoverCard
                    key={t.id}
                    cover={t.cover}
                    title={t.title}
                    subtitle={`${t.artist ?? "Calm Studio"} • ${t.minutes} min • Premium`}
                    rightTag={canPlay(t) ? (libraryIds.includes(t.id) ? "Saved" : "Save") : "Locked"}
                    onClick={() => {
                      if (!canPlay(t)) return;
                      libraryIds.includes(t.id) ? remove(t.id) : add(t.id);
                    }}
                  />
                ))}
              </div>

              <div className="mt-4 rounded-xl2 border border-stoney-200 bg-white/60 p-4 text-sm text-stoney-600">
                Beta shortcut: Toggle membership in{" "}
                <Link className="underline" href="/account">
                  Account
                </Link>
                .
              </div>
            </Card>
          </div>
        )}
      </Container>
    </main>
  );
}
