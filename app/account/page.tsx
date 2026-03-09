"use client";
import { Container } from "@/components/Container";
import { Card } from "@/components/Card";
import { useAppStore } from "@/lib/store";
import Link from "next/link";

export default function Account() {
  const user = useAppStore(s => s.user);
  const membership = useAppStore(s => s.membership);
  const toggleMembership = useAppStore(s => s.toggleMembership);
  const logout = useAppStore(s => s.logout);

  return (
    <main>
      <Container className="pt-6">
        <div className="mb-6">
          <h1 className="text-2xl font-semibold">Account</h1>
          <p className="mt-2 text-stoney-600">Beta profile + membership gating.</p>
        </div>

        {!user ? (
          <Card title="No account yet" subtitle="Create one to save your playlist + library in this beta.">
            <Link className="btn btn-primary" href="/auth">Create account</Link>
          </Card>
        ) : (
          <div className="grid gap-4">
            <Card title="Profile">
              <div className="text-sm text-stoney-600">
                <div><span className="font-medium text-ink-900">Email:</span> {user.email}</div>
                {user.name ? <div className="mt-1"><span className="font-medium text-ink-900">Name:</span> {user.name}</div> : null}
              </div>
              <div className="mt-4">
                <button className="btn btn-ghost py-2" onClick={logout}>Log out</button>
              </div>
            </Card>

            <Card title="Membership (beta toggle)" subtitle="Simulates subscription access for premium tracks.">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="text-sm text-stoney-600">
                  Current: <b className="text-ink-900">{membership === "member" ? "Member" : "Free"}</b>
                  <div className="mt-1 text-xs text-stoney-600">Member = premium tracks unlocked in Player/Library.</div>
                </div>
                <button className="btn btn-primary py-2" onClick={toggleMembership}>
                  Toggle to {membership === "member" ? "Free" : "Member"}
                </button>
              </div>

              <div className="mt-4 text-xs text-stoney-600">
                Later: replace with Stripe + Apple/Google subscriptions + real entitlements.
              </div>
            </Card>

            <Card title="Easy backend connection point">
              <p className="text-sm text-stoney-600">
                Use <code>lib/adapter.ts</code> as the outer “connector” for API calls (catalog, playlist build, library, membership).
              </p>
            </Card>
          </div>
        )}
      </Container>
    </main>
  );
}
