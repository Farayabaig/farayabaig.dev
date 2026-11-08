import { ogSize, renderOg } from "@/lib/og";

export const alt = "Faraya Baig, AI Engineer";
export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  return renderOg({ kicker: "Portfolio", title: "I build AI agents that do real work, and keep them secure." });
}
