"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

export default function DashboardPage() {
  const [ready, setReady] = useState(true);
  const username = "emir";
  const stats = { letters: 3, waiting: 1, days: 22, progress: 40 };

  useEffect(() => { setReady(true); }, []);
  if (!ready) return <main style={{ padding: 24 }}>Loading…</main>;

  return (
    <main>
      {/* HEADER */}
      <header className="top">
        <div className="container topin">
          <Link href="/" className="brand">
            <img src="/logo.svg" width={24} height={24} alt="After.Me" />
            <span>After.Me</span>
          </Link>
          <nav className="nav">
            <Link href="/dashboard">Dashboard</Link>
            <Link href="/dashboard/plan">Plans</Link>
            <Link href="/settings">Settings</Link>
          </nav>
        </div>
      </header>

      {/* HERO / STATUS */}
      <section className="hero">
        <div className="container h-in">
          <div className="eyebrow"><span className="dot" /> Your private legacy workspace</div>
          <h1>Welcome back, @{username}</h1>
          <p className="lead">Your vault has <b>{stats.letters}</b> letters. <b>{stats.waiting}</b> waiting for delivery.</p>
          <p className="muted">Reminder: You haven’t written a message in <b>{stats.days}</b> days.</p>
          <div className="cta">
            <button className="btn solid">Write New Letter ✍️</button>
            <Link className="btn ghost" href="/dashboard/plan">Upgrade Plan 💎</Link>
          </div>
          <div className="progress"><span style={{ width: `${stats.progress}%` }} /></div>
          <small className="muted">Vault Progress: {stats.progress}%</small>
        </div>
      </section>

      {/* PLANS — EXACT MONOCHROME LIKE SCREENSHOT */}
      <section className="plans plans-shot">
        <div className="container shot-grid">
          <MonoPlanCard
            title="Premium"
            price="$2/mo"
            features={["Encrypted vault", "Priority support", "Early access"]}
            cta="Upgrade 💎"
            href="/dashboard/upgrade?plan=premium"
            tone="dark"   // koyu buton
          />
          <MonoPlanCard
            title="Free"
            price="$0"
            features={["Up to 3 letters", "Basic vault", "Standard support"]}
            cta="Current Plan"
            href="/dashboard/upgrade?plan=free"
            tone="light"  // beyaz buton (görseldeki gibi)
          />
          <MonoPlanCard
            title="Lifetime"
            price="$15"
            features={["Unlimited messages", "Lifetime storage", "VIP legacy badge"]}
            cta="Unlock ✨"
            href="/dashboard/upgrade?plan=lifetime"
            tone="dark"   // koyu buton
          />
        </div>
      </section>

      {/* LOWER */}
      <section className="lower">
        <div className="container grid">
          <div className="card">
            <h4>✨ Memory Sparks</h4>
            <p className="muted">“One letter can live longer than a monument.”</p>
          </div>
          <div className="card">
            <h4>💡 Inspiration Corner</h4>
            <p className="muted">Write one thing you’d want your future self to know.</p>
            <button className="btn ghost full">Write now</button>
          </div>
          <div className="card">
            <h4>🔁 Heartbeat Reminder</h4>
            <p className="muted">We haven’t heard from you in a while. Your heartbeat keeps your vault alive.</p>
            <button className="btn solid full">Renew heartbeat 🔄</button>
          </div>
        </div>
      </section>

      <style jsx>{`
        :root { --bg:#050505; --fg:#f5f5f5; --line:#1d1d1d; --muted:#bdbdbd; }
        .container{max-width:1120px;margin:0 auto;padding:0 20px}
        .top{position:sticky;top:0;z-index:10;background:rgba(5,5,5,.7);backdrop-filter:blur(8px);border-bottom:1px solid var(--line)}
        .topin{height:64px;display:flex;align-items:center;justify-content:space-between}
        .brand{display:flex;align-items:center;gap:10px;font-weight:800}
        .nav{display:flex;gap:16px;align-items:center}

        .hero{text-align:center;padding:52px 0 28px;position:relative}
        .eyebrow{display:inline-flex;align-items:center;gap:8px;border:1px solid #2b2b2b;padding:6px 12px;font-size:12.5px;color:#cfcfcf;border-radius:999px}
        .dot{width:6px;height:6px;border-radius:50%;background:#fff;box-shadow:0 0 12px #fff}
        .lead{color:#e8e8e8}
        .muted{color:var(--muted)}
        .cta{display:flex;gap:10px;justify-content:center;margin:10px 0 6px;flex-wrap:wrap}
        .btn{font-weight:800;padding:12px 16px;border:1px solid #2f2f2f;background:transparent;color:#fff;letter-spacing:.2px;border-radius:0}
        .btn.solid{background:#fff;color:#000}
        .btn.ghost{background:transparent;color:#fff}
        .btn.full{width:100%;text-align:center}
        .progress{height:8px;border:1px solid var(--line);background:#0a0a0a;margin:10px auto 0;width:min(680px,86vw)}
        .progress span{display:block;height:100%;background:#fff}

        /* PLANS — screenshot'a sadık monokrom kartlar */
        .plans-shot{padding:36px 0 28px;}
        .shot-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:24px;}
        .mono {
          display:grid; grid-template-rows:auto 1fr auto;
          background:#111; border:1px solid #222; color:#fff;
          border-radius:20px; /* screenshot'taki gibi yumuşak */
          padding:24px; min-height:380px;
          box-shadow:0 10px 30px rgba(0,0,0,.35), inset 0 1px 0 rgba(255,255,255,.03);
        }
        .mono:hover { transform:translateY(-3px); transition:.2s; }

        .mono-hd { display:flex; justify-content:space-between; align-items:flex-start; }
        .mono-title { font-size:14px; opacity:.85; }
        .mono-price { font-size:34px; font-weight:900; line-height:1; margin-top:2px; }

        .mono-list { margin:14px 0 0; padding:0; list-style:none; display:grid; gap:10px; }
        .mono-list li { position:relative; padding-left:20px; color:#DADADA; }
        .mono-list li:before { content:"✓"; position:absolute; left:0; top:0; opacity:.9; }

        /* alt buton barı */
        .mono-cta {
          width:100%; text-align:center; margin-top:18px;
          padding:12px 14px; font-weight:800; border-radius:12px;
          border:1px solid #2b2b2b; background:#1a1a1a; color:#fff;
        }
        .mono-cta.light { background:#fff; color:#000; border-color:#fff; } /* Free kartı */
        
        /* LOWER */
        .lower{padding:20px 0 48px;}
        .grid{display:grid;grid-template-columns:repeat(3,1fr);gap:16px;}
        .card{background:#0a0a0a;border:1px solid var(--line);padding:18px;box-shadow:0 0 18px rgba(255,255,255,.04);border-radius:16px}
        @media(max-width:980px){
          .shot-grid{grid-template-columns:1fr;}
          .grid{grid-template-columns:1fr;}
        }
      `}</style>
    </main>
  );
}

/* ——— Plan Card (monochrome) ——— */
function MonoPlanCard({
  title,
  price,
  features,
  cta,
  href,
  tone = "dark", // "dark" | "light" (light = beyaz CTA)
}: {
  title: string;
  price: string;
  features: string[];
  cta: string;
  href: string;
  tone?: "dark" | "light";
}) {
  return (
    <article className="mono">
      <header className="mono-hd">
        <div className="mono-title">{title}</div>
        <div className="mono-price">{price}</div>
      </header>
      <ul className="mono-list">
        {features.map((f, i) => (<li key={i}>{f}</li>))}
      </ul>
      <a className={`mono-cta ${tone === "light" ? "light" : ""}`} href={href}>{cta}</a>
    </article>
  );
}
