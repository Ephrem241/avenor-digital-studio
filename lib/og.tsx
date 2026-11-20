import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

/** Shared Open Graph / Twitter card layout, rendered at build time. */
export const ogSize = { width: 1200, height: 630 };
export const ogContentType = "image/png";

const colors = {
  charcoal950: "#171717",
  charcoal800: "#292925",
  ivory50: "#FAF8F4",
  gold500: "#B99A69",
  gold400: "#C9AD83",
  stone300: "#B9B5AC",
};

async function readFontFiles() {
  // Cached so the file read doesn't make the image routes dynamic under Cache Components.
  "use cache";
  // Latin-subset WOFF files (SIL OFL, see assets/fonts). ImageResponse can't read woff2.
  const dir = join(process.cwd(), "assets/fonts");
  const files = await Promise.all([
    readFile(join(dir, "playfair-display-latin-400.woff")),
    readFile(join(dir, "inter-latin-500.woff")),
  ]);
  // Plain ArrayBuffers survive cache serialization intact; Node Buffers don't.
  return files.map((file) => file.buffer.slice(file.byteOffset, file.byteOffset + file.byteLength) as ArrayBuffer);
}

async function loadFonts() {
  const [serif, sans] = await readFontFiles();
  return [
    { name: "Playfair Display", data: serif, weight: 400 as const, style: "normal" as const },
    { name: "Inter", data: sans, weight: 500 as const, style: "normal" as const },
  ];
}

function Monogram({ size }: { size: number }) {
  return (
    <svg width={size} height={(size * 36) / 40} viewBox="0 0 40 36" fill="none">
      <path d="M20 2 L37 34 H30.5 L20 13.5 L9.5 34 H3 Z" fill={colors.gold500} />
      <path d="M13.5 26 H29" stroke={colors.charcoal950} strokeWidth="2.4" />
      <path d="M11 27.2 C16 22.5 23 21.5 31 23" stroke={colors.gold500} strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

type OgCardInput = {
  /** Headline in the serif face. */
  title: string;
  /** Small uppercase label above the headline, e.g. "Case study". */
  eyebrow?: string;
  /** Muted line under the headline. */
  meta?: string;
};

export async function renderOgCard({ title, eyebrow, meta }: OgCardInput) {
  const titleSize = title.length > 70 ? 56 : title.length > 40 ? 66 : 76;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          backgroundColor: colors.charcoal950,
          backgroundImage: `radial-gradient(circle at 85% 20%, ${colors.charcoal800} 0%, ${colors.charcoal950} 60%)`,
          fontFamily: "Inter",
          color: colors.ivory50,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <Monogram size={56} />
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontFamily: "Playfair Display", fontSize: 30, letterSpacing: 6 }}>AVENOR</div>
            <div style={{ fontSize: 13, letterSpacing: 5, color: colors.gold400, marginTop: 4 }}>DIGITAL STUDIO</div>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24, maxWidth: 960 }}>
          {eyebrow && (
            <div style={{ fontSize: 20, letterSpacing: 4, color: colors.gold400, textTransform: "uppercase" }}>
              {eyebrow}
            </div>
          )}
          <div style={{ fontFamily: "Playfair Display", fontSize: titleSize, lineHeight: 1.08 }}>{title}</div>
          {meta && <div style={{ fontSize: 24, color: colors.stone300 }}>{meta}</div>}
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div style={{ width: 64, height: 2, backgroundColor: colors.gold500 }} />
          <div style={{ fontSize: 20, color: colors.stone300 }}>{site.name}</div>
        </div>
      </div>
    ),
    { ...ogSize, fonts: await loadFonts() },
  );
}
