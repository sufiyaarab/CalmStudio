"use client";
import { ReactNode } from "react";
import cn from "classnames";

/**
 * Theming inspired by the user's reference images:
 * - warm golden energy + smoke
 * - mystical portrait aura + sun sigil
 *
 * Uses two background images with gradient overlays for readability.
 * Swap images in /public/theme if desired.
 */
export function Background({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn("min-h-screen", className)}>
      <div className="mystic-bg" aria-hidden="true" />
      <div className="relative z-10">{children}</div>
    </div>
  );
}
