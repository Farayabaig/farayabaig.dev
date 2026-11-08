import * as React from "react";
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import { cn } from "@/lib/utils";

/** Linear architecture diagram: stacks on mobile, flows left to right on desktop. */
function Flow({ steps, caption }: { steps: { label: string; detail?: string }[]; caption?: string }) {
  return (
    <figure className="not-prose my-8">
      <ol className="flex flex-col gap-2 md:flex-row md:items-stretch">
        {steps.map((s, i) => (
          <li key={s.label} className="flex flex-col items-center md:flex-1 md:flex-row">
            <div className="w-full rounded-[12px] border border-border bg-surface p-3 text-center md:h-full">
              <div className="font-mono text-[0.7rem] text-accent-strong">{String(i + 1).padStart(2, "0")}</div>
              <div className="mt-1 text-sm font-semibold text-fg">{s.label}</div>
              {s.detail ? <div className="mt-1 text-xs leading-snug text-muted">{s.detail}</div> : null}
            </div>
            {i < steps.length - 1 ? (
              <span aria-hidden="true" className="py-1 font-mono text-accent md:px-1 md:py-0">
                <span className="md:hidden">↓</span>
                <span className="hidden md:inline">→</span>
              </span>
            ) : null}
          </li>
        ))}
      </ol>
      {caption ? <figcaption className="mt-3 text-center text-sm text-muted">{caption}</figcaption> : null}
    </figure>
  );
}

function Callout({ children, tone = "accent" }: { children: React.ReactNode; tone?: "accent" | "amber" }) {
  return (
    <div
      className={cn(
        "not-prose my-6 rounded-[12px] border-l-2 bg-surface p-4 text-[0.95rem] text-fg",
        tone === "amber" ? "border-amber" : "border-accent",
      )}
    >
      {children}
    </div>
  );
}

function Decision({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="not-prose my-4 rounded-[12px] border border-border bg-surface p-5">
      <h3 className="text-base font-semibold">{title}</h3>
      <div className="mt-2 text-[0.95rem] leading-relaxed text-muted [&_strong]:text-fg">{children}</div>
    </div>
  );
}

function A(props: React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  const href = props.href ?? "";
  if (href.startsWith("/")) return <Link href={href} {...props} />;
  return <a target="_blank" rel="noopener noreferrer" {...props} />;
}

const components = { Flow, Callout, Decision, a: A };

export function MDX({ source }: { source: string }) {
  return (
    <div className="prose max-w-none prose-headings:font-display prose-headings:tracking-tight prose-a:text-accent-strong prose-a:no-underline hover:prose-a:underline prose-code:font-mono prose-code:before:content-none prose-code:after:content-none prose-pre:border prose-pre:border-border prose-pre:bg-surface prose-pre:text-fg">
      {/* Content is first party (in repo), so JS expressions in props are allowed. */}
      <MDXRemote source={source} components={components} options={{ blockJS: false }} />
    </div>
  );
}
