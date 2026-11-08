import { ImageResponse } from "next/og";

export const ogSize = { width: 1200, height: 630 };

export function renderOg({ kicker, title }: { kicker: string; title: string }) {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "#0B0F14",
          backgroundImage: "radial-gradient(rgba(230,237,243,0.08) 1.5px, transparent 1.5px)",
          backgroundSize: "28px 28px",
          color: "#E6EDF3",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", fontSize: 28, color: "#2DD4BF", letterSpacing: 2 }}>{kicker.toUpperCase()}</div>
        <div style={{ display: "flex", fontSize: title.length > 60 ? 58 : 72, fontWeight: 700, lineHeight: 1.1, maxWidth: 1000 }}>
          {title}
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 28 }}>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ fontWeight: 700 }}>Faraya Baig</span>
            <span style={{ color: "#8B98A5" }}>AI Engineer · Agentic AI · LLMs · AI Security</span>
          </div>
          <span style={{ color: "#8B98A5" }}>farayabaig.dev</span>
        </div>
      </div>
    ),
    ogSize,
  );
}
