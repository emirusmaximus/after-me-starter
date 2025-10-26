// app/page.tsx
import Link from "next/link";

export default function Landing() {
  return (
    <main className="wrap">
      <header className="top">
        <Link href="/" className="brand">After.Me</Link>
        <nav className="nav">
          <Link href="/login" className="ghost">Log In</Link>
          <Link href="/signup" className="primary">Sign Up</Link>
        </nav>
      </header>

      <section className="hero">
        <p className="pill">Future-release digital vault</p>
        <h1>One day you’ll be gone, but your words can remain.</h1>
        <p className="sub">
          After.Me — your digital vault of final words, memories, and messages.
          Write now, store encrypted, deliver later.
        </p>
        <div className="cta">
          <Link href="/signup" className="primary big">Sign Up Now</Link>
          <Link href="/login" className="ghost big">Log In</Link>
        </div>
        <blockquote className="quote">
          “He left us his voice. We still hear it every year on his birthday.” <span>— A Daughter</span>
        </blockquote>
        <ul className="kpis">
          <li><b>12,842</b><span>Messages stored</span></li>
          <li><b>3,427</b><span>Time capsules waiting</span></li>
          <li><b>529</b><span>Final letters delivered</span></li>
        </ul>
      </section>

      <section className="why">
        <h2>Why After.Me Exists</h2>
        <p className="muted">People vanish. Words remain.</p>
        <p className="text">
          After.Me was born to preserve voices — not data, but legacy. What you write today can comfort someone tomorrow.
        </p>

        <div className="security">
          <h3>Security & Privacy First</h3>
          <p>
            Every message is encrypted <em>before</em> it leaves your device. We can’t read your words — and that’s the point.
          </p>
        </div>

        <div className="features">
          <div className="feat">
            <h4>Trusted Contacts</h4>
            <p>Nominate people who can access your vault after verified life events.</p>
          </div>
          <div className="feat">
            <h4>Posthumous Delivery</h4>
            <p>Automated releases after inactivity periods or verification.</p>
          </div>
          <div className="feat">
            <h4>Time-Locked Messages</h4>
            <p>Choose a future date — your message unlocks only then.</p>
          </div>
        </div>
      </section>

      <section className="stories">
        <h2>Real Messages. Real People.</h2>
        <p className="muted small">
          Anonymous, voluntarily shared stories. Private vault contents are never used.
        </p>
        <div className="cards">
          <article className="card">
            <p>“To my son: May you never fear the unknown. The stars are closer than they look.”</p>
            <span>— A Father, 2024</span>
          </article>
          <article className="card">
            <p>“I wrote this letter when I was 25. If you’re reading it, it means I finally had courage.”</p>
            <span>— A Stranger, 2023</span>
          </article>
          <article className="card">
            <p>“He left us his voice. We still hear it every year on his birthday.”</p>
            <span>— A Daughter</span>
          </article>
        </div>
      </section>

      <section className="waitlist">
        <h3>Join the Waitlist</h3>
        <p className="muted">Be among the first to experience the full release of After.Me Premium.</p>
        <form className="form" onSubmit={(e)=>e.preventDefault()}>
          <input placeholder="Your email address" aria-label="Your email" />
          <button className="primary">Notify Me</button>
        </form>
      </section>

      <footer className="foot">
        <p className="tag">“A million words waiting for their moment.”</p>
        <div className="links">
          <a href="mailto:hello@after.me">Email</a>
          <a href="https://twitter.com" target="_blank">Twitter</a>
          <a href="https://instagram.com" target="_blank">Instagram</a>
        </div>
        <p className="legal">© 2025 After.Me — A product of CobsVault Labs • <a href="#">Privacy Policy</a> • <a href="#">Terms of Service</a></p>
      </footer>

      <style jsx>{`
        .wrap{ --bg:#050505; --fg:#f5f5f5; --card:#0b0b0b; --border:#1a1a1a; --muted:#c7c7c7;
          background:var(--bg); color:var(--fg); min-height:100dvh; padding:18px 16px 60px; display:grid; gap:36px;
        }
        .top{ display:flex; max-width:1120px; width:100%; margin:0 auto; justify-content:space-between; align-items:center; }
        .brand{ font-weight:700; text-decoration:none; color:var(--fg); }
        .nav{ display:flex; gap:10px; }
        .primary{ background:#fff; color:#000; border:0; border-radius:14px; padding:10px 14px; font-weight:700; }
        .ghost{ background:transparent; color:var(--fg); border:1px solid var(--border); border-radius:14px; padding:10px 14px; }
        .hero{ text-align:center; display:grid; gap:12px; max-width:980px; width:100%; margin:0 auto; }
        .pill{ display:inline-block; border:1px solid var(--border); border-radius:999px; padding:6px 10px; color:#ddd; }
        h1{ margin:0; font-size:42px; }
        .sub{ color:#d8d8d8; max-width:720px; margin:0 auto; }
        .cta{ display:flex; gap:10px; justify-content:center; }
        .quote{ color:#d6d6d6; }
        .quote span{ color:#aaa; }
        .kpis{ list-style:none; display:flex; gap:36px; justify-content:center; padding:0; margin:16px 0 0; }
        .kpis b{ font-size:28px; }
        .muted{ color:var(--muted); }
        .small{ font-size:13px; }
        .why{ max-width:1120px; margin:0 auto; display:grid; gap:14px; text-align:center; }
        .security{ margin-top:10px; }
        .features{ display:grid; grid-template-columns:repeat(3,minmax(0,1fr)); gap:12px; margin-top:8px; }
        .feat{ border:1px solid var(--border); background:var(--card); border-radius:16px; padding:16px; text-align:left; }
        .stories{ max-width:1120px; margin:0 auto; text-align:center; display:grid; gap:8px; }
        .cards{ display:grid; grid-template-columns:repeat(3, minmax(0,1fr)); gap:12px; }
        .card{ border:1px solid var(--border); background:var(--card); border-radius:16px; padding:16px; text-align:left; }
        .waitlist{ text-align:center; display:grid; gap:10px; }
        .form{ display:flex; gap:8px; justify-content:center; }
        input{ width:320px; background:#0f0f0f; border:1px solid var(--border); border-radius:12px; padding:10px 12px; color:#eee; }
        .foot{ border-top:1px solid var(--border); max-width:1120px; margin:0 auto; width:100%; padding-top:16px; text-align:center; display:grid; gap:8px; }
        .links{ display:flex; gap:12px; justify-content:center; }
        .tag{ color:#dcdcdc; }
        .legal{ color:#a9a9a9; font-size:13px; }
        @media (max-width:980px){ .cards{ grid-template-columns:1fr } .features{ grid-template-columns:1fr } h1{ font-size:32px } }
      `}</style>
    </main>
  );
}
