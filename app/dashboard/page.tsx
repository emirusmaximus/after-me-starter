"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

export default function DashboardPage() {
  const [ready, setReady] = useState(true);
  const username = "emir";
  const stats = { letters: 3, waiting: 1, days: 22, progress: 40 };

  useEffect(() => {
    setReady(true);
  }, []);

  if (!ready) return <main style={{ padding: 24 }}>Loading…</main>;

  return (
    <main>
      {/* ───────── HEADER ───────── */}
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

      {/* ───────── HERO / STATUS ───────── */}
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

          <div className="progress">
            <span style={{ width: `${stats.progress}%` }} />
          </div>
          <small className="muted">Vault Progress: {stats.progress}%</small>
        </div>
      </section>

      {/* ───────── PLANS ───────── */}
      <section className="plans plans-rect">
        <div className="container pr-grid">
          <RectPlanCard
            variant="premium"
            title="Premium"
            price="$2/mo"
            features={["Encrypted vault", "Priority support", "Early access"]}
            cta="Upgrade 💎"
            href="/dashboard/upgrade?plan=premium"
            ribbon="Most Chosen"
          />
          <RectPlanCard
            variant="free"
            title="Free"
            price="$0"
            features={["Up to 3 letters", "Basic vault", "Standard support"]}
            cta="Current Plan"
            href="/dashboard/upgrade?plan=free"
            current
          />
          <RectPlanCard
            variant="lifetime"
            title="Lifetime"
            price="$15"
            features={["Unlimited messages", "Lifetime storage", "VIP legacy badge"]}
            cta="Unlock ✨"
            href="/dashboard/upgrade?plan=lifetime"
            shimmer
          />
        </div>
      </section>

      {/* ───────── LOWER MODULES ───────── */}
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
        :root {
          --bg:#050505;--fg:#f5f5f5;--line:#1d1d1d;--muted:#bdbdbd;
        }
        .container{max-width:1120px;margin:0 auto;padding:0 20px}
        .top{position:sticky;top:0;z-index:10;background:rgba(5,5,5,.7);backdrop-filter:blur(8px);border-bottom:1px solid var(--line)}
        .topin{height:64px;display:flex;align-items:center;justify-content:space-between}
        .brand{display:flex;align-items:center;gap:10px;font-weight:800}
        .nav{display:flex;gap:16px;align-items:center}
        .hero{text-align:center;padding:52px 0 28px;position:relative}
        .eyebrow{display:inline-flex;align-items:center;gap:8px;border:1px solid #2b2b2b;padding:6px 12px;font-size:12.5px;color:#cfcfcf}
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

        /* PLANS */
        .plans-rect{padding:36px 0 28px;}
        .pr-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:18px;}
        .rect{position:relative;display:grid;grid-template-rows:auto 1fr auto;padding:22px;
          border:1px solid #1d1d1d;background:#0a0a0a;border-radius:0;
          box-shadow:0 0 14px rgba(255,255,255,.04);min-height:360px;overflow:hidden;}
        .rect:hover{outline:1px solid #3a3a3a;}
        .rect-hd{display:flex;justify-content:space-between;align-items:baseline;margin-bottom:12px;}
        .rect-title{font-size:14px;opacity:.9;}
        .rect-price{font-size:28px;font-weight:900;}
        .rect-list{margin:0;padding:0;list-style:none;display:grid;gap:10px;}
        .rect-list li{position:relative;padding-left:20px;color:#e8e8e8;}
        .rect-list li:before{content:"✓";position:absolute;left:0;top:0;opacity:.9;}
        .rect-cta{margin-top:16px;display:block;width:100%;text-align:center;padding:12px 14px;font-weight:800;
          border:1px solid #2f2f2f;background:#161616;color:#fff;border-radius:0;}
        .rect-cta.current{background:#fff;color:#000;}
        .rect.premium{
          background:linear-gradient(160deg,#1b1a2d 0%,#0a0a0a 35%) padding-box,
                     linear-gradient(160deg,#6C63FF 0%,#8A7CFF 100%) border-box;
          border:1px solid transparent;color:#fff;}
        .rect.free{background:linear-gradient(160deg,#1A1A1A 0%,#2A2A2A 100%);color:#fff;}
        .rect.lifetime{
          background:linear-gradient(160deg,#F2C94C 0%,#F9E79F 100%);color:#0b0b0b;border-color:rgba(0,0,0,.2);}
        .ribbon{position:absolute;top:12px;left:12px;background:rgba(11,11,11,.9);color:#fff;
          border:1px solid rgba(255,255,255,.28);padding:4px 10px;font-size:12px;font-weight:700;letter-spacing:.2px;}
        .has-shimmer::before{content:"";position:absolute;inset:0;
          background:linear-gradient(110deg,transparent 0%,rgba(255,255,255,.35) 18%,transparent 36%);
          transform:translateX(-120%);animation:sweep 3.2s ease-in-out infinite;pointer-events:none;}
        @keyframes sweep{0%{transform:translateX(-120%);}60%,100%{transform:translateX(120%);}}
        .rect.is-current{outline:1px solid #7c7c7c;}
        @media(max-width:980px){.pr-grid{grid-template-columns:1fr;}}

        /* LOWER */
        .lower{padding:20px 0 48px;}
        .grid{display:grid;grid-template-columns:repeat(3,1fr);gap:16px;}
        .card{background:#0a0a0a;border:1px solid var(--line);padding:18px;box-shadow:0 0 18px rgba(255,255,255,.04);}
        @media(max-width:980px){.grid{grid-template-columns:1fr;}}
      `}</style>
    </main>
  );
}

/* ───────── PLAN CARD COMPONENT ───────── */
function RectPlanCard({
  variant,
  title,
  price,
  features,
  cta,
  href,
  ribbon,
  current = false,
  shimmer = false,
}: {
  variant: "premium" | "free" | "lifetime";
  title: string;
  price: string;
  features: string[];
  cta: string;
  href: string;
  ribbon?: string;
  current?: boolean;
  shimmer?: boolean;
}) {
  return (
    <article className={`rect ${variant} ${current ? "is-current" : ""} ${shimmer ? "has-shimmer" : ""}`}>
      {ribbon && <div className="ribbon">{ribbon}</div>}
      <header className="rect-hd">
        <span className="rect-title">{title}</span>
        <div className="rect-price">{price}</div>
      </header>
      <ul className="rect-list">
        {features.map((f, i) => (
          <li key={i}>{f}</li>
        ))}
      </ul>
      <a className={`rect-cta ${current ? "current" : ""}`} href={href}>
        {cta}
      </a>
    </article>
  );
}
