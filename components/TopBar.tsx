"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import cn from "classnames";
import { useAppStore } from "@/lib/store";

const tabs = [
  { href: "/", label: "Home" },
  { href: "/symptoms", label: "Create" },
  { href: "/library", label: "Library" },
  { href: "/player", label: "Player" },
  { href: "/account", label: "Account" },
];

export function TopBar() {
  const pathname = usePathname();
  const user = useAppStore((s) => s.user);

  return (
    <div className="sticky top-0 z-20 border-b border-stoney-200 bg-white/65 backdrop-blur">
      <div className="mx-auto flex max-w-4xl items-center justify-between px-4 py-3">
        <Link href="/" className="font-semibold tracking-tight text-ink-900">
          Calm Studio <span className="text-xs text-stoney-600">beta</span>
        </Link>
        <div className="flex items-center gap-2">
          {user ? (
            <Link className="pill" href="/account">
              Account
            </Link>
          ) : (
            <Link className="pill" href="/auth">
              Sign in
            </Link>
          )}
        </div>
      </div>

      <div className="mx-auto max-w-4xl px-4 pb-3">
        <nav className="flex flex-wrap gap-2">
          {tabs.map((t) => (
            <Link
              key={t.href}
              href={t.href}
              className={cn("pill", pathname === t.href && "pill-on")}
            >
              {t.label}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
}
