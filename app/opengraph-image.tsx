import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Decern - Technical Decision Records for Engineering Teams";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          background: "linear-gradient(135deg, #0c4a6e 0%, #0284c7 50%, #0ea5e9 100%)",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "24px",
          }}
        >
          {/* Logo */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "16px",
            }}
          >
            <div
              style={{
                width: "64px",
                height: "64px",
                borderRadius: "16px",
                background: "rgba(255,255,255,0.2)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "40px",
                fontWeight: 700,
                color: "#ffffff",
              }}
            >
              D
            </div>
            <span
              style={{
                fontSize: "56px",
                fontWeight: 700,
                color: "#ffffff",
                letterSpacing: "-1px",
              }}
            >
              Decern
            </span>
          </div>

          {/* Tagline */}
          <p
            style={{
              fontSize: "24px",
              color: "rgba(255,255,255,0.85)",
              fontWeight: 400,
              margin: 0,
              textAlign: "center",
              maxWidth: "700px",
            }}
          >
            Technical Decision Records for Engineering Teams
          </p>

          {/* Features pills */}
          <div
            style={{
              display: "flex",
              gap: "12px",
              marginTop: "16px",
            }}
          >
            {["Document", "Enforce in CI", "LLM Judge"].map((label) => (
              <div
                key={label}
                style={{
                  background: "rgba(255,255,255,0.15)",
                  borderRadius: "999px",
                  padding: "8px 20px",
                  fontSize: "16px",
                  color: "rgba(255,255,255,0.9)",
                  fontWeight: 500,
                }}
              >
                {label}
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
