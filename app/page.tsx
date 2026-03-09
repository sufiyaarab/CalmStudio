"use client";
import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/Container";
import { Card } from "@/components/Card";
import { useAppStore } from "@/lib/store";

export default function Home() {
  const user = useAppStore((s) => s.user);
  const playlist = useAppStore((s) => s.playlist);

  return (
    <main>
      <Container className="pt-6">
        <div className="mb-6">
          <h1 className="text-4xl font-semibold tracking-tight">Listen, breathe, reset.</h1>
          <p className="mt-2 max-w-prose muted">
            Apple Music‑inspired beta for curated hypnosis, coaching, and sound medicine.
          </p>
        </div>

        <div className="grid gap-4">
          <Card title="Start" subtitle="Choose what you want to do.">
            <div className="grid gap-3 sm:grid-cols-2">
              {!user ? (
                <Link className="btn btn-primary" href="/auth">
                  Create account
                </Link>
              ) : (
                <Link className="btn btn-primary" href="/account">
                  Account ready
                </Link>
              )}

              <Link className="btn btn-soft" href="/symptoms">
                Curate by symptoms
              </Link>

              <Link className="btn btn-soft" href="/library">
                Library (free + premium)
              </Link>

              <Link className="btn btn-ghost" href="/player">
                {playlist ? "Open my playlist player" : "Open player"}
              </Link>
            </div>

            <div className="mt-4 text-xs text-stoney-600">
              Add an mp3 at <code>public/audio/placeholder.mp3</code> for demo playback.
            </div>
          </Card>

          <Card title="My playlists" subtitle="Quick access (like Apple Music)">
            <div className="grid gap-3 sm:grid-cols-2">
              <Link className="pill" href="/library">
                Open Playlists view
              </Link>
              <Link className="pill" href="/symptoms">
                Build a new curated playlist
              </Link>
            </div>
          </Card>

          <Card title="Artwork placeholders" subtitle="Swap these for real calming images later.">
            <div className="grid grid-cols-3 gap-3 sm:grid-cols-6">
              {["calm", "sleep", "focus", "cool", "release", "sound"].map((x) => (
                <div key={x} className="cover">
                  <Image
                    src={`/covers/${x}.svg`}
                    alt={x}
                    width={128}
                    height={128}
                    className="h-full w-full object-cover"
                  />
                </div>
              ))}
            </div>
          </Card>
        </div>
      </Container>
    </main>
  );
}
