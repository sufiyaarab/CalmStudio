"use client";
import cn from "classnames";

export function Pills({
  options,
  value,
  onChange,
}: {
  options: { key: string; label: string }[];
  value: string;
  onChange: (key: string) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((o) => (
        <button
          key={o.key}
          onClick={() => onChange(o.key)}
          className={cn("pill", value === o.key && "pill-on")}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}
