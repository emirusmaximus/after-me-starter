export const metadata = {
  title: "After.Me",
  description: "Your digital vault of final words, memories, and messages.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          background: "#0b0c10",
          color: "rgba(255,255,255,0.95)",
          fontFamily: "Inter, system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif",
        }}
      >
        {/* Header */}
        <header
          style={{
            position: "sticky",
            top: 0,
            zIndex: 10,
            backdropFilter: "saturate(120%) blur(6px)",
            background: "rgba(11,12,16,0.65)",
            borderBottom: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          <div
            style={{
              maxWidth: 1120,
              margin: "0 auto",
              padding: "14px 24px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <a href="/" style={{ fontWeight: 800, letterSpacing: 0.2, textDecoration: "none", color: "white" }}>
              After.<span style={{ opacity: 0.9 }}>Me</span>
            </a>

            <nav style={{ display: "flex", gap: 18, alignItems: "center" }}>
              <a href="#about" style={{ color: "rgba(255,255,255,.8)", textDecoration: "none" }}>
                About
              </a>
              <a href="#contact" style={{ color: "rgba(255,255,255,.8)", textDecoration: "none" }}>
                Contact
              </a>
              {/* Optional: Log in link in header */}
              <a
                href="/login"
                style={{
                  marginLeft: 8,
                  padding: "8px 14px",
                  borderRadius: 999,
                  border: "1px solid rgba(255,255,255,.2)",
                  textDecoration: "none",
                  color: "white",
                }}
              >
                Log In
              </a>
            </nav>
          </div>
        </header>

        <main>{children}</main>

        {/* Footer */}
        <footer
          id="contact"
          style={{
            borderTop: "1px solid rgba(255,255,255,0.06)",
            marginTop: 56,
            padding: "40px 24px",
          }}
        >
          <div style={{ maxWidth: 1120, margin: "0 auto", textAlign: "center" }}>
            <h3 style={{ margin: 0, fontSize: 22, fontWeight: 700 }}>Contact After.Me</h3>
            <p style={{ marginTop: 8, opacity: 0.8 }}>We’re here to help.</p>
            <div style={{ marginTop: 16 }}>
              <a
                href="mailto:support@after.me"
                style={{
                  textDecoration: "none",
                  color: "#0b0c10",
                  background: "white",
                  borderRadius: 999,
                  padding: "10px 16px",
                  fontWeight: 700,
                }}
              >
                support@after.me
              </a>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
