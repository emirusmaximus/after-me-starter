import Link from "next/link";

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <div style={{ fontSize: 42, fontWeight: 800, lineHeight: 1 }}>{value}</div>
      <div style={{ marginTop: 6, opacity: 0.75 }}>{label}</div>
    </div>
  );
}

function Card({ icon, title, desc }: { icon: string; title: string; desc: string }) {
  return (
    <div
      style={{
        background: "rgba(255,255,255,0.04)",
        border: "1px solid rgba(255,255,255,0.08)",
        borderRadius: 18,
        padding: 28,
        minHeight: 180,
      }}
    >
      <div
        style={{
          width: 64,
          height: 64,
          borderRadius: 14,
          background: "rgba(255,255,255,0.08)",
          display: "grid",
          placeItems: "center",
          marginBottom: 18,
          fontSize: 24,
        }}
      >
        {icon}
      </div>
      <div style={{ fontWeight: 700 }}>{title}</div>
      <div style={{ marginTop: 8, opacity: 0.75 }}>{desc}</div>
    </div>
  );
}

export default function Home() {
  return (
    <div style={{ padding: "48px 0" }}>
      {/* HERO */}
      <section className="container hero" style={{ paddingTop: 40, textAlign: "center" }}>
        <h1 style={{ margin: "24px 0 8px", fontWeight: 800 }}>
          One day you’ll be gone, but your words can remain.
        </h1>
        <p style={{ margin: 0 }}>
          After.Me — your digital vault of final words, memories, and messages.
        </p>

        <div style={{ marginTop: 20 }}>
          <Link
            href="/signup"
            className="cta-btn"
            style={{
              display: "inline-block",
              padding: "10px 18px",
              background: "white",
              color: "#0b0c10",
              borderRadius: 999,
              textDecoration: "none",
              fontWeight: 800,
            }}
          >
            Sign Up Now
          </Link>
        </div>
      </section>

      {/* FEATURES */}
      <section className="container" style={{ marginTop: 54 }}>
        <div className="grid-3">
          <Card icon="■" title="Write." desc="Compose your message or record your voice." />
          <Card icon="●" title="Store." desc="Your memories are encrypted and secured forever." />
          <Card icon="▲" title="Deliver." desc="They’re released only when the time you set arrives." />
        </div>
      </section>

      {/* STATS */}
      <section className="container" style={{ marginTop: 48 }}>
        <div className="stats-grid">
          <Stat value="12,842" label="Messages stored" />
          <Stat value="3,427" label="Time capsules waiting" />
          <Stat value="529" label="Final letters delivered" />
        </div>
      </section>

      {/* PROCESS */}
      <section id="about" className="container" style={{ marginTop: 52 }}>
        <h3 style={{ margin: 0, fontSize: 20, fontWeight: 800 }}>
          🕰️ How your words travel through time.
        </h3>
        <p style={{ marginTop: 6, opacity: 0.85 }}>
          A simple process built to last beyond us.
        </p>
      </section>

      {/* TESTIMONIAL */}
      <section className="container" style={{ marginTop: 44, opacity: 0.95, maxWidth: 820 }}>
        <blockquote style={{ fontSize: 20, fontWeight: 700, margin: 0 }}>
          “He left us his voice. We still hear it every year on his birthday.”
        </blockquote>
        <div style={{ marginTop: 10, opacity: 0.7, fontSize: 14 }}>— A Daughter</div>
      </section>

      {/* CTA BOTTOM */}
      <section className="container" style={{ marginTop: 56, textAlign: "center" }}>
        <Link
          href="/signup"
          className="cta-btn"
          style={{
            display: "inline-block",
            padding: "12px 22px",
            background: "white",
            color: "#0b0c10",
            borderRadius: 999,
            textDecoration: "none",
            fontWeight: 800,
          }}
        >
          Create your vault
        </Link>
        <div style={{ marginTop: 12, opacity: 0.8 }}>
          Already have an account?{" "}
          <Link href="/login" style={{ color: "white" }}>
            Log In
          </Link>
        </div>
      </section>
    </div>
  );
}
