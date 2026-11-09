import { Counter } from "@/components/counter";
import { proofMetrics } from "@/lib/site";

export function ProofStrip() {
  return (
    <section aria-label="Key results" className="border-y border-border">
      <div className="container-content px-0 sm:px-0">
        <dl className="grid grid-cols-2 gap-px bg-border lg:grid-cols-4">
          {proofMetrics.map((m) => (
            <div key={m.label} className="flex flex-col-reverse justify-end gap-2 bg-bg px-4 py-8 sm:px-6">
              <dt className="text-[0.95rem] leading-snug text-muted md:text-base">{m.label}</dt>
              <dd className="font-mono text-4xl font-semibold tracking-tight text-amber md:text-5xl">
                <Counter value={m.value} prefix={m.prefix} suffix={m.suffix} />
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
