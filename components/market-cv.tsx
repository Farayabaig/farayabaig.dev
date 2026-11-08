"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Download } from "lucide-react";
import { markets, type Market } from "@/lib/site";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const keys = Object.keys(markets) as Market[];

export function MarketCV({ titles }: { titles: Record<string, string> }) {
  const [market, setMarket] = useState<Market>("ksa");

  useEffect(() => {
    const m = new URLSearchParams(window.location.search).get("market") as Market | null;
    if (m && keys.includes(m)) setMarket(m);
  }, []);

  function choose(m: Market) {
    setMarket(m);
    const url = new URL(window.location.href);
    url.searchParams.set("market", m);
    window.history.replaceState(null, "", url);
  }

  const cfg = markets[market];

  return (
    <section aria-labelledby="market-title" className="rounded-[12px] border border-border bg-surface">
      <div className="flex flex-col gap-4 border-b border-border p-5 sm:flex-row sm:items-center sm:justify-between">
        <h2 id="market-title" className="font-mono text-sm font-medium text-muted">
          Viewing as
        </h2>
        <div role="radiogroup" aria-label="Market" className="inline-flex rounded-lg border border-border bg-bg p-1">
          {keys.map((k) => (
            <button
              key={k}
              type="button"
              role="radio"
              aria-checked={market === k}
              onClick={() => choose(k)}
              className={cn(
                "rounded-md px-4 py-1.5 text-sm transition-colors",
                market === k ? "bg-accent-strong text-accent-fg" : "text-muted hover:text-fg",
              )}
            >
              {markets[k].label}
            </button>
          ))}
        </div>
      </div>
      <div className="p-5 md:p-6" aria-live="polite">
        <p className="text-lg font-medium text-fg">{cfg.lead}</p>
        <p className="mt-1 text-sm text-muted">{cfg.locationLine}</p>
        <ul className="mt-5 space-y-2">
          {cfg.emphasis.map((e) => (
            <li key={e} className="flex gap-2 text-[0.95rem] text-fg/90">
              <span aria-hidden="true" className="mt-[0.6em] size-1.5 shrink-0 rounded-full bg-accent" />
              {e}
            </li>
          ))}
        </ul>
        <p className="mt-5 text-sm text-muted">
          Lead projects:{" "}
          {cfg.featured.map((slug, i) => (
            <span key={slug}>
              <Link href={`/projects/${slug}`} className="text-accent-strong hover:underline">
                {titles[slug] ?? slug}
              </Link>
              {i < cfg.featured.length - 1 ? ", " : ""}
            </span>
          ))}
        </p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
          <Button asChild>
            <a href={cfg.cvFile} download>
              <Download aria-hidden /> Download {cfg.label} CV (PDF)
            </a>
          </Button>
          <span className="text-xs text-muted">{cfg.notes}</span>
        </div>
      </div>
    </section>
  );
}
