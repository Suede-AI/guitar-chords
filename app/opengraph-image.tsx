import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "guitarchords.info: free chord library, scale trainer, tuner, and metronome";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#050b16",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          padding: "80px",
          fontFamily: "monospace",
          gap: "24px",
        }}
      >
        {/* Site name */}
        <div style={{ display: "flex", alignItems: "baseline", gap: "8px" }}>
          <span
            style={{
              fontSize: "48px",
              fontWeight: 700,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "#e03b3b",
            }}
          >
            guitarchords
          </span>
          <span
            style={{
              fontSize: "48px",
              fontWeight: 700,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "#5a6a7a",
            }}
          >
            .info
          </span>
        </div>

        {/* Tagline */}
        <div
          style={{
            fontSize: "28px",
            color: "#c8d4e0",
            letterSpacing: "0.04em",
            lineHeight: 1.4,
          }}
        >
          Free chord library · scale trainer · chromatic tuner · metronome
        </div>

        {/* Tools row */}
        <div style={{ display: "flex", gap: "20px", marginTop: "16px" }}>
          {["Chord Chart", "Scale Trainer", "Tuner", "Metronome"].map((tool) => (
            <div
              key={tool}
              style={{
                background: "#0d1a2a",
                border: "1px solid #1e3048",
                borderRadius: "6px",
                padding: "10px 18px",
                fontSize: "18px",
                color: "#7ec8e3",
                letterSpacing: "0.08em",
              }}
            >
              {tool}
            </div>
          ))}
        </div>

        {/* Bottom badge */}
        <div
          style={{
            position: "absolute",
            bottom: "48px",
            right: "80px",
            fontSize: "16px",
            color: "#3a4a5a",
            letterSpacing: "0.10em",
            textTransform: "uppercase",
          }}
        >
          No sign-up · No tracking · Suede Labs
        </div>
      </div>
    ),
    { ...size }
  );
}
