import { ImageResponse } from "next/og";

export const alt = "The Chart Artists — Build Your Edge.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#000000",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 24,
          fontFamily: "sans-serif",
        }}
      >
        {/* Dot grid background */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "radial-gradient(circle, rgba(255,255,255,0.08) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />
        {/* Fade overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(ellipse at center, transparent 30%, black 100%)",
          }}
        />

        {/* Content */}
        <div
          style={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 20,
          }}
        >
          <p
            style={{
              color: "rgba(255,255,255,0.35)",
              fontSize: 14,
              letterSpacing: "0.25em",
              textTransform: "uppercase",
              margin: 0,
            }}
          >
            The Chart Artists
          </p>
          <h1
            style={{
              color: "#ffffff",
              fontSize: 96,
              fontWeight: 700,
              margin: 0,
              lineHeight: 1,
              letterSpacing: "-0.04em",
            }}
          >
            Build Your Edge.
          </h1>
          <p
            style={{
              color: "rgba(255,255,255,0.45)",
              fontSize: 22,
              margin: 0,
              fontWeight: 300,
            }}
          >
            Trading education since 2019 · No hype
          </p>
        </div>
      </div>
    ),
    { ...size }
  );
}
