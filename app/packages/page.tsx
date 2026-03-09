"use client";
import { Container } from "@/components/Container";
import { Card } from "@/components/Card";
import { ALL_PACKAGES } from "@/lib/packages";
import Link from "next/link";

export default function PackagesPage() {
  return (
    <main>
      <Container className="pt-6">
        <div className="mb-6">
          <h1 className="text-2xl font-semibold">Packages</h1>
          <p className="mt-2 text-stoney-600">Tiered programs (presentation-friendly) — separate from your instant playlist.</p>
        </div>

        <Card title="Instant playlist vs packages" subtitle="Two ways to guide users">
          <ul className="list-disc space-y-1 pl-5 text-sm text-stoney-600">
            <li><b>Instant playlist</b>: symptom selection → auto playlist from catalog → play now.</li>
            <li><b>Packages</b>: longer programs with multiple playlists and structured progression.</li>
          </ul>
          <div className="mt-4 flex gap-2">
            <Link className="btn btn-primary" href="/symptoms">Build instant playlist</Link>
            <Link className="btn btn-ghost" href="/player">Go to player</Link>
          </div>
        </Card>

        <div className="mt-4 grid gap-4">
          {ALL_PACKAGES.map((p) => (
            <Card key={p.id} title={p.name} subtitle={p.for}>
              <div className="text-sm text-stoney-600">{p.supports}</div>
              <ul className="mt-3 list-disc space-y-1 pl-5 text-sm">
                {p.includes.slice(0, 4).map((x: string) => <li key={x}>{x}</li>)}
              </ul>
              <div className="mt-4 text-xs text-stoney-600">Tier: {p.tier} • {p.durationDays} days • Price: {p.priceNote}</div>
            </Card>
          ))}
        </div>
      </Container>
    </main>
  );
}
