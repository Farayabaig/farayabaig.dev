"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import { MessageSquareText } from "lucide-react";

// The panel is only downloaded when someone opens it, keeping the home page light.
const AskPortfolioPanel = dynamic(() => import("./ask-portfolio-panel").then((m) => m.AskPortfolioPanel), {
  ssr: false,
});

export function AskPortfolioLauncher() {
  const [open, setOpen] = useState(false);
  return (
    <>
      {open ? <AskPortfolioPanel onClose={() => setOpen(false)} /> : null}
      {!open ? (
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="fixed bottom-4 right-4 z-40 inline-flex items-center gap-2 rounded-full border border-border bg-surface p-3 sm:px-4 sm:py-2.5 font-mono text-[0.8125rem] text-fg shadow-lg shadow-black/10 transition-colors hover:border-accent sm:bottom-6 sm:right-6"
          aria-haspopup="dialog"
        >
          <MessageSquareText className="size-4 text-accent-strong" aria-hidden />
          <span className="sr-only sm:not-sr-only">Ask my portfolio</span>
        </button>
      ) : null}
    </>
  );
}
