import { ImageResponse } from "next/og";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        border: "2px solid #7c68a8",
        borderRadius: 15,
        background: "#111116",
        color: "#f5f3f7",
        fontSize: 22,
        fontWeight: 800,
        letterSpacing: "0.06em",
      }}
    >
      DS
    </div>,
    size,
  );
}
