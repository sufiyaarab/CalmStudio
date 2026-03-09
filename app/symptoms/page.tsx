"use client";
import { Container } from "@/components/Container";
import { Card } from "@/components/Card";
import { SYMPTOMS } from "@/lib/symptoms";
import { useAppStore } from "@/lib/store";
import Link from "next/link";
import cn from "classnames";

export default function SymptomsPage() {
  const symptoms = useAppStore(s => s.symptoms);
  const toggle = useAppStore(s => s.toggleSymptom);
  const build = useAppStore(s => s.buildMyPlaylist);

  return (
    <main>
      <Container className="pt-6">
        <div className="mb-6">
          <h1 className="text-2xl font-semibold">Create a playlist</h1>
          <p className="mt-2 text-stoney-600">Pick symptoms — we’ll generate a playlist from the catalog.</p>
        </div>

        <Card title="Symptom menu" subtitle="Pick 1–6 (beta).">
          <div className="grid gap-3">
            {SYMPTOMS.map(s => {
              const on = symptoms.includes(s.id);
              return (
                <button
                  key={s.id}
                  onClick={() => toggle(s.id)}
                  className={cn(
                    "w-full rounded-xl2 border p-4 text-left transition",
                    on ? "border-accent-700 bg-white/75" : "border-stoney-200 bg-white/55 hover:bg-white/75"
                  )}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-semibold">{s.label}</div>
                      <div className="mt-1 text-sm text-stoney-600">{s.subtitle}</div>
                    </div>
                    <div className={cn("badge", on ? "bg-accent-700 text-white" : "bg-stoney-100 text-ink-900")}>
                      {on ? "Selected" : "Select"}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          <div className="mt-5 flex flex-col gap-2 sm:flex-row">
            <button className="btn btn-primary" onClick={build}>Generate playlist</button>
            <Link className="btn btn-soft" href="/player">Open player</Link>
          </div>
        </Card>
      </Container>
    </main>
  );
}
