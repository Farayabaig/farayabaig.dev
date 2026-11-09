import { Hero } from "@/components/sections/hero";
import { ProofStrip } from "@/components/sections/proof-strip";
import { FeaturedProjects } from "@/components/sections/featured-projects";
import { WhatIDo } from "@/components/sections/what-i-do";
import { Architecture } from "@/components/sections/architecture";
import { About } from "@/components/sections/about";
import { Skills } from "@/components/sections/skills";
import { Writing } from "@/components/sections/writing";
import { Credentials } from "@/components/sections/credentials";
import { Contact } from "@/components/sections/contact";
import { site } from "@/lib/site";

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.name,
  url: site.url,
  email: `mailto:${site.email}`,
  jobTitle: "AI Engineer",
  description: site.description,
  address: { "@type": "PostalAddress", addressLocality: "Riyadh", addressCountry: "SA" },
  alumniOf: { "@type": "CollegeOrUniversity", name: "FAST National University of Computer and Emerging Sciences" },
  worksFor: { "@type": "Organization", name: "Ebryx" },
  sameAs: [site.linkedin, site.github],
  knowsAbout: [
    "Agentic AI",
    "Multi agent systems",
    "Retrieval augmented generation",
    "Conversational AI",
    "Speech recognition",
    "Natural language processing",
    "LLM fine tuning",
    "AI security",
    "Red teaming",
    "Model Context Protocol",
  ],
};

export default function HomePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }} />
      <Hero />
      <ProofStrip />
      <FeaturedProjects />
      <WhatIDo />
      <Architecture />
      <About />
      <Skills />
      <Writing />
      <Credentials />
      <Contact />
    </>
  );
}
