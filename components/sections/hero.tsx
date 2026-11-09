import Link from "next/link";
import { ArrowRight, Download, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Terminal } from "@/components/terminal";
import { hero, site } from "@/lib/site";

export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="dot-grid relative -mt-16 overflow-hidden pt-16">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent to-bg"
      />
      <div className="container-content relative grid items-center gap-10 py-16 md:py-24 lg:grid-cols-[1.15fr_1fr] lg:gap-14">
        <div>
          <p className="eyebrow">AI Engineer · Agentic AI · Speech AI · LLM Security</p>
          <h1 id="hero-title" className="mt-4 text-[2.4rem] leading-[1.08] sm:text-5xl lg:text-[3.6rem]">
            I build AI agents that do real work, <span className="text-accent-strong">and keep them secure.</span>
          </h1>
          <p className="mt-5 max-w-xl text-lg text-muted">{hero.subhead}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button asChild>
              <Link href="/#projects">
                View my work <ArrowRight aria-hidden />
              </Link>
            </Button>
            <Button asChild variant="outline">
              <a href={site.cvPath} download>
                <Download aria-hidden /> Download CV
              </a>
            </Button>
          </div>
          <p className="mt-6 flex items-center gap-2 text-[0.95rem] text-muted">
            <MapPin className="size-4 text-accent-strong" aria-hidden />
            Riyadh, KSA <span aria-hidden="true">·</span> Open to relocation anywhere
          </p>
        </div>
        <Terminal />
      </div>
    </section>
  );
}
