// app/dashboard/page.tsx
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function DashboardPage() {
  const [ready, setReady] = useState(true); // demo
  const username = "emir";
  const plan: "free" | "premium" | "lifetime" = "free";
  const stats = { letters: 3, waiting: 1, days: 22, progress: 40 };

  useEffect(() => {
    // TODO: supabase auth guard
    // setReady(true/false);
  }, []);

  if (!ready) return <main style={{ padding: 24 }}>Loading…</main>;

  return (
    <main>
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

      {/* Hero / Status */}
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

          <div className="progress" role="progressbar" aria-valuenow={stats.progress} aria-valuemin={0} aria-valuemax={100}>
            <span style={{ width: `${stats.progress}%` }} />
          </div>
          <small className="muted">Vault Progress: {stats.progress}%</small>
        </div>
      </section>

      {/* Plans: tall, square-corner, centered */}
      <section className="plans">
        <div className="container p-in">
          {/* Premium (Left) */}
          <article className="plan premium">
            <div className="ribbon">Most Chosen</div>
            <header><h3>Premium</h3><div className="price">$2/mo</div></header>
            <ul>
              <li>Unlimited letters</li>
              <li>Trusted contacts (quorum)</li>
              <li>Inactivity trigger (heartbeat)</li>
            </ul>
            <Link href="/dashboard/upgrade?plan=premium" className="btn solid full">Upgrade to Premium</Link>
          </article>

          {/* Free (Center) */}
          <article className={`plan free ${plan === "free" ? "current" : ""}`}>
            <header><h3>Free</h3><div className="price">$0</div></header>
            <ul>
              <li>3 letters</li>
              <li>Client-side encryption</li>
              <li>Date-based delivery</li>
            </ul>
            <Link href="/dashboard/upgrade?plan=free" className="btn ghost full">
              {plan === "free" ? "Current Plan" : "Continue Free"}
            </Link>
          </article>

          {/* Lifetime (Right) */}
          <article className="plan lifetime">
            <div className="shine" aria-hidden />
            <header><h3>Lifetime</h3><div className="price">$15</div></header>
            <ul>
              <li>All Premium features</li>
              <li>One-time payment</li>
              <li>Priority legacy support</li>
            </ul>
            <Link href="/dashboard/upgrade?plan=lifetime" className="btn solid full">Own Forever</Link>
          </article>
        </div>
      </section>

      {/* Lower: Memory / Inspiration / Heartbeat */}
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
        .container{ max-width:1120px; margin:0 auto; padding:0 20px }
        .top{ position:sticky; top:0; z-index:10; background:rgba(5,5,5,.7); backdrop-filter:blur(8px); border-bottom:1px solid var(--line) }
        .topin{ height:64px; display:flex; align-items:center; justify-content:space-between }
        .brand{ display:flex; align-items:center; gap:10px; font-weight:800 }
        .nav{ display:flex; gap:16px; align-items:center }

        .hero{ text-align:center; padding:52px 0 28px; position:relative }
        .hero:before{ content:""; position:absolute; inset:-40px 0 0 0; background:radial-gradient(60% 40% at 50% 0, rgba(255,255,255,.08), transparent 60%) }
        .eyebrow{ display:inline-flex; align-items:center; gap:8px; border:1px solid #2b2b2b; padding:6px 12px; font-size:12.5px; color:#cfcfcf }
        .dot{ width:6px; height:6px; border-radius:50%; background:#fff; box-shadow:0 0 12px #fff }
        .lead{ color:#e8e8e8 }
        .muted{ color:var(--muted) }
        .cta{ display:flex; gap:10px; justify-content:center; margin:10px 0 6px; flex-wrap:wrap }
        .btn{ font-weight:800; padding:12px 16px; border:1px solid #2f2f2f; background:transparent; color:#fff; letter-spacing:.2px }
        .btn.solid{ background:#fff; color:#000 }
        .btn.ghost{ background:transparent; color:#fff }
        .btn.full{ width:100%; text-align:center }
        .progress{ height:8px; border:1px solid var(--line); background:#0a0a0a; margin:10px auto 0; width:min(680px,86vw) }
        .progress span{ display:block; height:100%; background:#fff }

        .plans{ padding:28px 0 }
        .p-in{ display:grid; grid-template-columns:repeat(3, 1fr); gap:16px }
        .plan{ position:relative; display:grid; grid-template-rows:auto 1fr auto; border:1px solid var(--line); background:#0a0a0a; padding:20px; min-height:460px; box-shadow:0 0 18px rgba(255,255,255,.04) }
        .plan *{ border-radius:0 } /* köşesiz */
        .plan header{ display:flex; justify-content:space-between; align-items:center; margin-bottom:10px }
        .plan h3{ margin:0; font-size:20px; letter-spacing:.2px }
        .plan .price{ font-weight:900 }
        .plan ul{ margin:0; padding-left:18px; display:grid; gap:8px; color:#e4e4e4 }
        .plan:hover{ outline:1px solid #3a3a3a }
        .plan.current{ outline:1px solid #7c7c7c }

        .premium{ background:linear-gradient(165deg, #6C63FF 0%, #8A7CFF 100%); color:#0b0b0b; border-color:rgba(255,255,255,.25) }
        .premium .btn.solid{ background:#0b0b0b; color:#fff; border-color:#0b0b0b }
        .premium .btn.ghost{ border-color:rgba(0,0,0,.35); color:#0b0b0b }
        .ribbon{ position:absolute; top:12px; left:12px; padding:4px 10px; background:rgba(11,11,11,.9); color:#fff; border:1px solid rgba(255,255,255,.3); font-size:12px }

        .free{ background:linear-gradient(165deg, #1E1E1E 0%, #2C2C2C 100%) }

        .lifetime{ position:relative; background:linear-gradient(165deg, #F2C94C 0%, #F9E79F 100%); color:#0b0b0b; border-color:rgba(0,0,0,.2); overflow:hidden }
        .lifetime .btn.solid{ background:#0b0b0b; color:#fff; border-color:#0b0b0b }
        .lifetime .btn.ghost{ border-color:rgba(0,0,0,.3); color:#0b0b0b }
        .shine{ position:absolute; inset:0; background:linear-gradient(110deg, transparent 0%, rgba(255,255,255,.38) 18%, transparent 36%); transform:translateX(-120%); animation:sh 3.3s ease-in-out infinite }
        @keyframes sh { 0%{ transform:translateX(-120%) } 60%{ transform:translateX(120%) } 100%{ transform:translateX(120%) } }

        .lower{ padding:20px 0 48px }
        .grid{ display:grid; grid-template-columns:repeat(3,1fr); gap:16px }
        .card{ background:#0a0a0a; border:1px solid var(--line); padding:18px; box-shadow:0 0 18px rgba(255,255,255,.04) }

        @media (max-width:980px){ .p-in, .grid{ grid-template-columns:1fr } }
      `}</style>
    </main>
  );
}
