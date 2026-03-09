"use client";
import Image from "next/image";

export function CoverCard({
  cover,
  title,
  subtitle,
  rightTag,
  onClick,
}: {
  cover: string;
  title: string;
  subtitle?: string;
  rightTag?: string;
  onClick?: () => void;
}) {
  return (
    <button onClick={onClick} className="w-full text-left rounded-xl2 border border-stoney-200 bg-white/65 hover:bg-white/80 transition p-3">
      <div className="flex items-center gap-3">
        <div className="cover h-14 w-14 shrink-0">
          <Image src={cover} alt={title} width={56} height={56} className="h-14 w-14 object-cover" />
        </div>
        <div className="min-w-0 flex-1">
          <div className="truncate font-semibold">{title}</div>
          {subtitle ? <div className="truncate text-sm text-stoney-600">{subtitle}</div> : null}
        </div>
        {rightTag ? (
          <div className="rounded-full bg-stoney-100 px-3 py-1 text-xs font-semibold text-ink-900">
            {rightTag}
          </div>
        ) : null}
      </div>
    </button>
  );
}
