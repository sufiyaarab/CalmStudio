"use client";
import { useRouter } from "next/navigation";
import { Container } from "@/components/Container";
import { Card } from "@/components/Card";
import { useAppStore } from "@/lib/store";
import { useState } from "react";

export default function AuthPage() {
  const router = useRouter();
  const setUser = useAppStore(s => s.setUser);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");

  return (
    <main>
      <Container className="pt-6">
        <div className="mb-6">
          <h1 className="text-2xl font-semibold">Create an account</h1>
          <p className="mt-2 text-stoney-600">Front-end only for now. Later connects to real auth.</p>
        </div>

        <Card title="Sign up">
          <div className="grid gap-3">
            <div>
              <label className="text-sm font-medium">Name (optional)</label>
              <input className="input mt-1" value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" />
            </div>
            <div>
              <label className="text-sm font-medium">Email</label>
              <input className="input mt-1" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" />
            </div>
            <button
              className="btn btn-primary"
              onClick={() => {
                if (!email.trim()) return;
                setUser({ email: email.trim(), name: name.trim() || undefined });
                router.push("/");
              }}
            >
              Continue
            </button>
            <p className="text-xs text-stoney-600">Beta privacy: stored locally. No server yet.</p>
          </div>
        </Card>
      </Container>
    </main>
  );
}
