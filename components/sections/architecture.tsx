"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

type NodeId = "slack" | "parser" | "planner" | "guard" | "runners" | "verifier" | "security" | "report";

const steps: { title: string; body: string; nodes: NodeId[]; edges: string[] }[] = [
  {
    title: "A request in plain language",
    body: "An engineer asks for a qualification run in Slack, the way they would ask a teammate. No scripts, no tickets, no waiting for the one person who knows the setup.",
    nodes: ["slack"],
    edges: [],
  },
  {
    title: "Parse intent into structure",
    body: "Natural language command parsing turns the message into a structured request: which build, which targets, which suites and any options.",
    nodes: ["parser"],
    edges: ["e1"],
  },
  {
    title: "Plan the run",
    body: "The planner decides which hardware configurations and test suites the build needs, and in what order, before any machine is touched.",
    nodes: ["planner"],
    edges: ["e2"],
  },
  {
    title: "Guardrails before spend",
    body: "Every plan is checked against budget guardrails before cloud bare metal is provisioned. The agent cannot burn budget on its own initiative.",
    nodes: ["guard"],
    edges: ["e3"],
  },
  {
    title: "Fan out across 29 configurations",
    body: "Runs execute across 29 hardware configurations and cloud bare metal servers in parallel, work that used to need hours of engineer supervision.",
    nodes: ["runners"],
    edges: ["e4"],
  },
  {
    title: "Verify, then retry only when it helps",
    body: "Failure aware retries separate real failures from flaky ones. Only runs where a retry can change the outcome are retried, which cut cloud spend and flaky reruns.",
    nodes: ["verifier", "runners"],
    edges: ["e5"],
  },
  {
    title: "Scan and report back",
    body: "AI security scanning runs on every build, and a readable report lands in the same Slack thread. Multi hour cycles now finish in minutes.",
    nodes: ["security", "report"],
    edges: ["e6", "e7"],
  },
];

const firstStepOf = (id: NodeId) => steps.findIndex((s) => s.nodes.includes(id));

const boxes: { id: Exclude<NodeId, "runners">; x: number; y: number; label: string }[] = [
  { id: "slack", x: 8, y: 8, label: "Slack" },
  { id: "parser", x: 128, y: 8, label: "Parser" },
  { id: "planner", x: 248, y: 8, label: "Planner" },
  { id: "guard", x: 248, y: 72, label: "Guardrails" },
  { id: "verifier", x: 248, y: 262, label: "Verifier ↻" },
  { id: "security", x: 128, y: 262, label: "Security scan" },
  { id: "report", x: 8, y: 262, label: "Report" },
];

const edges: { id: string; d: string }[] = [
  { id: "e1", d: "M112 25 H126" },
  { id: "e2", d: "M232 25 H246" },
  { id: "e3", d: "M300 42 V70" },
  { id: "e4", d: "M300 106 V124" },
  { id: "e5", d: "M300 238 V260" },
  { id: "e6", d: "M248 279 H234" },
  { id: "e7", d: "M128 279 H114" },
];

const FLAKY = new Set([4, 17, 23]);

function Diagram({ active }: { active: number }) {
  const [retried, setRetried] = useState(false);
  useEffect(() => {
    setRetried(false);
    if (active !== 5) return;
    const t = setTimeout(() => setRetried(true), 1100);
    return () => clearTimeout(t);
  }, [active]);

  const state = (id: NodeId) => {
    if (steps[active]?.nodes.includes(id)) return "active";
    return firstStepOf(id) < active ? "done" : "idle";
  };
  const edgeOn = (id: string) => steps.findIndex((s) => s.edges.includes(id)) <= active;

  const stroke = (s: string) => (s === "active" ? "var(--accent)" : s === "done" ? "color-mix(in srgb, var(--accent) 45%, var(--border))" : "var(--border)");
  const fill = (s: string) => (s === "active" ? "color-mix(in srgb, var(--accent) 14%, var(--surface))" : "var(--surface)");

  const runnersState = state("runners");

  return (
    <svg
      viewBox="0 0 360 304"
      role="img"
      aria-labelledby="arch-svg-title arch-svg-desc"
      className="h-auto w-full max-h-[42vh] lg:max-h-none"
    >
      <title id="arch-svg-title">Autonomous QA agent architecture</title>
      <desc id="arch-svg-desc">
        Slack command flows to a parser, planner and budget guardrails, then fans out to test runners across 29
        hardware configurations and cloud bare metal. A verifier applies failure aware retries, a security scan runs,
        and a report returns to Slack.
      </desc>
      <defs>
        <marker id="arrow" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M0 0 L8 4 L0 8 z" fill="var(--accent)" />
        </marker>
        <marker id="arrow-off" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M0 0 L8 4 L0 8 z" fill="var(--border)" />
        </marker>
      </defs>

      {edges.map((e) => (
        <path
          key={e.id}
          d={e.d}
          fill="none"
          strokeWidth={1.5}
          stroke={edgeOn(e.id) ? "var(--accent)" : "var(--border)"}
          markerEnd={edgeOn(e.id) ? "url(#arrow)" : "url(#arrow-off)"}
          style={{ transition: "stroke 300ms" }}
        />
      ))}

      {boxes.map((b) => {
        const s = state(b.id);
        return (
          <g key={b.id}>
            <rect
              x={b.x}
              y={b.y}
              width={104}
              height={34}
              rx={8}
              fill={fill(s)}
              stroke={stroke(s)}
              strokeWidth={s === "active" ? 1.5 : 1}
              style={{ transition: "fill 300ms, stroke 300ms" }}
            />
            <text
              x={b.x + 52}
              y={b.y + 21.5}
              textAnchor="middle"
              fontSize={12}
              className="font-mono"
              fill={s === "idle" ? "var(--muted)" : "var(--fg)"}
              style={{ transition: "fill 300ms" }}
            >
              {b.label}
            </text>
          </g>
        );
      })}

      {/* Runners: 29 hardware configurations + cloud bare metal */}
      <g>
        <rect
          x={8}
          y={126}
          width={344}
          height={110}
          rx={10}
          fill={fill(runnersState)}
          stroke={stroke(runnersState)}
          strokeWidth={runnersState === "active" ? 1.5 : 1}
          style={{ transition: "fill 300ms, stroke 300ms" }}
        />
        <text x={20} y={146} fontSize={11} className="font-mono" fill="var(--muted)">
          test runners · 29 hardware configs
        </text>
        {Array.from({ length: 29 }, (_, i) => {
          const row = i < 15 ? 0 : 1;
          const col = row === 0 ? i : i - 15;
          const x = 20 + col * 21.6;
          const y = 156 + row * 22;
          const lit = active >= 4;
          const flaky = active === 5 && FLAKY.has(i) && !retried;
          const color = flaky ? "var(--amber)" : lit ? "var(--accent)" : "var(--border)";
          return (
            <rect
              key={i}
              x={x}
              y={y}
              width={16}
              height={16}
              rx={3}
              fill={color}
              fillOpacity={lit ? 0.85 : 0.6}
              style={{ transition: `fill 260ms ${active === 4 ? i * 35 : 0}ms, fill-opacity 260ms` }}
            />
          );
        })}
        {[0, 1, 2, 3].map((i) => (
          <g key={`bm-${i}`}>
            <rect
              x={20 + i * 82}
              y={204}
              width={74}
              height={20}
              rx={5}
              fill="none"
              stroke={active >= 4 ? "var(--accent)" : "var(--border)"}
              style={{ transition: `stroke 260ms ${active === 4 ? 1000 + i * 80 : 0}ms` }}
            />
            <text
              x={57 + i * 82}
              y={218}
              textAnchor="middle"
              fontSize={10}
              className="font-mono"
              fill={active >= 4 ? "var(--fg)" : "var(--muted)"}
            >
              bare metal
            </text>
          </g>
        ))}
      </g>
    </svg>
  );
}

export function Architecture() {
  const [active, setActive] = useState(0);
  const refs = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setActive(Number((e.target as HTMLElement).dataset.step));
        }
      },
      { rootMargin: "-55% 0px -40% 0px", threshold: 0 },
    );
    refs.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <section id="architecture" aria-labelledby="architecture-title" className="py-16 md:py-24">
      <div className="container-content">
        <p className="eyebrow">How I build agents</p>
        <h2 id="architecture-title" className="mt-3 max-w-3xl text-3xl md:text-4xl">
          Inside the autonomous QA agent
        </h2>
        <p className="mt-4 max-w-2xl text-muted">
          Scroll through one qualification run, from a Slack message to a verified report across 29 hardware
          configurations. <Link href="/projects/autonomous-qa-agent" className="text-accent-strong underline underline-offset-4">Read the full case study</Link>.
        </p>

        <div className="mt-10 lg:grid lg:grid-cols-[1fr_1.1fr] lg:gap-14">
          <div className="sticky top-16 z-10 -mx-4 border-b border-border bg-bg/95 px-4 py-3 backdrop-blur-sm lg:order-2 lg:top-24 lg:mx-0 lg:h-fit lg:rounded-[12px] lg:border lg:bg-surface/40 lg:p-6">
            <Diagram active={active} />
            <p className="mt-2 text-center font-mono text-xs text-muted" aria-live="polite">
              step {String(active + 1).padStart(2, "0")} / {String(steps.length).padStart(2, "0")}
              <span className="hidden sm:inline"> · {steps[active].title}</span>
            </p>
          </div>

          <ol className="lg:order-1">
            {steps.map((s, i) => (
              <li
                key={s.title}
                data-step={i}
                ref={(el) => {
                  refs.current[i] = el;
                }}
                className="flex min-h-[45vh] flex-col justify-center border-l border-border py-8 pl-6 lg:min-h-[50vh]"
                style={{ borderColor: i === active ? "var(--accent)" : undefined }}
              >
                <span className="font-mono text-xs text-accent-strong">{String(i + 1).padStart(2, "0")}</span>
                <h3 className={cn("mt-2 text-xl font-semibold transition-colors", i === active ? "text-fg" : "text-muted")}>
                  {s.title}
                </h3>
                <p className="mt-2 max-w-md text-muted">{s.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

