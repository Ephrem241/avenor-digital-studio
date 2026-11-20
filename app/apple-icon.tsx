import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

/** Placeholder monogram on charcoal until the official logo is supplied. */
export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#171717",
        }}
      >
        <svg width="112" height="101" viewBox="0 0 40 36" fill="none">
          <path d="M20 2 L37 34 H30.5 L20 13.5 L9.5 34 H3 Z" fill="#B99A69" />
          <path d="M13.5 26 H29" stroke="#171717" strokeWidth="2.4" />
          <path d="M11 27.2 C16 22.5 23 21.5 31 23" stroke="#B99A69" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      </div>
    ),
    size,
  );
}
