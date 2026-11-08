import Link from "next/link";
import { site } from "@/lib/site";
import { GitHubIcon, LinkedInIcon } from "./icons";

export function SiteFooter() {
  return (
    <footer className="border-t border-border py-10">
      <div className="container-content flex flex-col gap-4 text-sm text-muted md:flex-row md:items-center md:justify-between">
        <p>
          © {new Date().getFullYear()} {site.name}. Built with Next.js, deployed on Vercel.
        </p>
        <div className="flex items-center gap-4">
          <Link href="/blog" className="hover:text-fg">
            Writing
          </Link>
          <a href={site.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="hover:text-fg">
            <GitHubIcon className="size-5" />
          </a>
          <a href={site.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="hover:text-fg">
            <LinkedInIcon className="size-5" />
          </a>
        </div>
      </div>
    </footer>
  );
}
