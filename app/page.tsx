// app/page.tsx
"use client";

import Link from "next/link";

export default function HomePage() {
  return (
    <main>
      <header className="top">
        <div className="container topin">
          <Link href="/" className="brand">
            <img src="/logo.svg" width={24} height={24} alt="After.Me" />
            <span>After.Me</span>
          </Link>
          <nav className="nav">
            <Link href="/login">Sign in</Link>
            <Link className="btn solid" href="/signup">Create account</Link>
          </nav>
        </div>
      </header>

      <section className="hero">
        <div className="container h-in">
          <div className="eyebrow"><span className="dot" /> Write now, store encrypted, deliver later.</div>
          <h1>One day you’ll be gone.<br/>Your words don’t have to be.</h1>
          <p className="lead">After.Me lets you write letters, encrypt them on your device, and schedule delivery to the people you love.</p>
          <div className="cta">
            <Link className="btn solid" href="/signup">Get Started</Link>
            <Link className="btn ghost" href="/login">I already have an account</Link>
          </div>
        </div>
      </section>

      <style jsx>{`
        .container{ max-width:1120px; margin:0 auto; padding:0 20px }
        .top{ position:sticky; top:0; z-index:10; background:rgba(5,5,5,.7); backdrop-filter:blur(8px); border-bottom:1px solid var(--line) }
        .topin{ height:64px; display:flex; align-items:center; justify-content:space-between }
        .brand{ display:flex; align-items:center; gap:10px; font-weight:800 }
        .nav{ display:flex; gap:12px; align-items:center }
        .btn{ border:1px solid #2f2f2f; padding:10px 14px; font-weight:800 }
        .btn.solid{ background:#fff; color:#000 }
        .btn.ghost{ color:#fff }

        .hero{ text-align:center; padding:84px 0 64px; position:relative }
        .hero:before{ content:""; position:absolute; inset:-60px 0 0 0;
          background:radial-gradient(60% 40% at 50% 0, rgba(255,255,255,.08), transparent 60%); }
        .eyebrow{ display:inline-flex; align-items:center; gap:8px; border:1px solid #2b2b2b; padding:6px 12px; font-size:12.5px; color:#cfcfcf }
        .dot{ width:6px; height:6px; border-radius:50%; background:#fff; box-shadow:0 0 12px #fff }
        h1{ margin:14px 0 10px; font-size:42px; line-height:1.15; letter-spacing:.2px }
        .lead{ color:#e6e6e6; max-width:760px; margin:0 auto }
        .cta{ display:flex; gap:10px; justify-content:center; margin-top:18px; flex-wrap:wrap }
      `}</style>
    </main>
  );
}
