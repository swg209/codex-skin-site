import { ImageResponse } from "next/og";

const size = { width: 1200, height: 630 };

export const dynamic = "force-static";

export function GET() {
  return new ImageResponse(
    <div
      style={{
        alignItems: "center",
        background:
          "radial-gradient(circle at 82% 48%, #2a1f48 0%, #111018 38%, #07070a 72%)",
        color: "#f7f5fb",
        display: "flex",
        height: "100%",
        justifyContent: "space-between",
        overflow: "hidden",
        padding: "66px 72px",
        position: "relative",
        width: "100%",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          maxWidth: 720,
        }}
      >
        <div
          style={{
            color: "#b8a7e8",
            display: "flex",
            fontSize: 24,
            fontWeight: 700,
            letterSpacing: "0.16em",
            marginBottom: 24,
            textTransform: "uppercase",
          }}
        >
          Independent Codex resources
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 86,
            fontWeight: 800,
            letterSpacing: "-0.055em",
            lineHeight: 1,
          }}
        >
          CodexSkin
        </div>
        <div
          style={{
            color: "#d3cedd",
            display: "flex",
            fontSize: 38,
            lineHeight: 1.25,
            marginTop: 28,
          }}
        >
          Themes, tools &amp; setup guides for Codex Desktop
        </div>
        <div
          style={{
            color: "#a49caf",
            display: "flex",
            fontSize: 25,
            marginTop: 34,
          }}
        >
          Windows · macOS · Original repository links
        </div>
      </div>

      <div
        style={{
          alignItems: "center",
          border: "2px solid rgba(184, 167, 232, 0.55)",
          borderRadius: 44,
          boxShadow: "0 30px 90px rgba(116, 86, 186, 0.32)",
          display: "flex",
          height: 300,
          justifyContent: "center",
          marginRight: 34,
          transform: "rotate(7deg)",
          width: 230,
        }}
      >
        <div
          style={{
            alignItems: "center",
            background: "linear-gradient(145deg, #191522, #352758)",
            border: "1px solid rgba(255,255,255,0.18)",
            borderRadius: 30,
            color: "#d9ccff",
            display: "flex",
            fontSize: 68,
            fontWeight: 800,
            height: 210,
            justifyContent: "center",
            letterSpacing: "-0.04em",
            width: 150,
          }}
        >
          CS
        </div>
      </div>
    </div>,
    size,
  );
}
