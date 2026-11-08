import * as React from "react";
import { cn } from "@/lib/utils";

export function Section({
  id,
  eyebrow,
  title,
  intro,
  className,
  children,
}: {
  id: string;
  eyebrow: string;
  title: string;
  intro?: React.ReactNode;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className={cn("py-16 md:py-24", className)}>
      <div className="container-content">
        <p className="eyebrow">{eyebrow}</p>
        <h2 id={`${id}-title`} className="mt-3 max-w-3xl text-3xl md:text-4xl">
          {title}
        </h2>
        {intro ? <div className="mt-4 max-w-2xl text-muted">{intro}</div> : null}
        <div className="mt-10">{children}</div>
      </div>
    </section>
  );
}
