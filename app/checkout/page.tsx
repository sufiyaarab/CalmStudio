"use client";
import { Container } from "@/components/Container";
import { Card } from "@/components/Card";
import Link from "next/link";

export default function Checkout() {
  return (
    <main>
      <Container className="pt-6">
        <div className="mb-6">
          <h1 className="text-2xl font-semibold">Pricing (placeholder)</h1>
          <p className="mt-2 text-stoney-600">In beta, membership is a toggle. Later, connect subscriptions here.</p>
        </div>

        <Card title="In beta">
          <p className="text-sm text-stoney-600">Go to Account to toggle Member vs Free and see premium gating behavior.</p>
          <div className="mt-4 flex gap-2">
            <Link className="btn btn-primary" href="/account">Open account</Link>
            <Link className="btn btn-ghost" href="/library">Open library</Link>
          </div>
        </Card>
      </Container>
    </main>
  );
}
