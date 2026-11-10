import { Boxes, CalendarClock, Mail } from "lucide-react";
import { site } from "@/lib/site";
import { GitHubIcon, LinkedInIcon } from "@/components/icons";
import { Button } from "@/components/ui/button";

export function Contact() {
  const links = [
    { href: `mailto:${site.email}`, label: site.email, icon: Mail },
    { href: site.linkedin, label: "linkedin.com/in/farayabaig05", icon: LinkedInIcon },
    { href: site.github, label: "github.com/Farayabaig", icon: GitHubIcon },
    { href: site.huggingface, label: "Hugging Face models", icon: Boxes },
  ];
  return (
    <section id="contact" aria-labelledby="contact-title" className="py-16 md:py-24">
      <div className="container-content">
        <div className="dot-grid rounded-[12px] border border-border bg-surface/60 px-5 py-12 sm:px-10 md:py-16">
          <p className="eyebrow">Contact</p>
          <h2 id="contact-title" className="mt-3 max-w-2xl text-3xl md:text-5xl">
            Let&apos;s build agents that actually ship.
          </h2>
          <p className="mt-4 max-w-xl text-muted">
            Based in Riyadh, KSA. Open to relocation anywhere and comfortable working across time zones from Riyadh to
            Toronto.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button asChild>
              <a href={`mailto:${site.email}`}>
                <Mail aria-hidden /> Email me
              </a>
            </Button>
            <Button asChild variant="outline">
              <a href={site.booking} {...(site.booking.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
                <CalendarClock aria-hidden /> Book a 20 minute call
              </a>
            </Button>
          </div>
          <ul className="mt-10 grid gap-3 sm:grid-cols-2">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  {...(l.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="flex items-center gap-3 rounded-lg border border-border bg-bg px-4 py-3 text-[0.95rem] text-fg transition-colors hover:border-accent"
                >
                  <l.icon className="size-4 shrink-0 text-accent-strong" aria-hidden />
                  <span className="truncate">{l.label}</span>
                </a>
              </li>
            ))}
          </ul>
          <p className="mt-6 font-mono text-[0.8125rem] text-muted">
            {site.workAuthorization}
          </p>
        </div>
      </div>
    </section>
  );
}
