"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/lib/supabaseClient";

/**
 * After.Me — Dashboard (Premium UI)
 * - Premium (left, Most Chosen)
 * - Free (center)
 * - Lifetime (right, shimmer)
 * - Glow hovers, hamburger menu, hero, sparks, inspiration, heartbeat, timeline, badges
 */

export default function DashboardPage() {
  // ----- Auth Guard -----
  const [ready, setReady] = useState(false);
  const [username, setUsername] = useState<string>("emir"); // placeholder

  useEffect(() => {
    let cancel = false;
    (async () => {
      const { data } = await supabase.auth.getUser();
      if (!cancel) {
        if (!data.user) {
          window.location.replace("/login?redirectTo=/dashboard");
        } else {
          // (Opsiyonel) profile tablosundan username çekilebilir; şimdilik placeholder
          setReady(true);
        }
      }
    })();
    return () => { cancel = true; };
  }, []);

  // ----- UI State -----
  const [menuOpen, setMenuOpen] = useState(false);
  const [composeOpen, setComposeOpen] = useState(false);

  // ----- Demo Data -----
  const plan: "free" | "premium" | "lifetime" = "free";
  const vaultStats = { letters: 3, scheduled: 1, delivered: 1 };
  const timeline = [
    { id: 1, title: "Letter to Mom", status: "Delivered", date: "Aug 12, 2025" },
    { id: 2, title: "18th Birthday Letter", status: "Scheduled", date: "Jan 03, 2033" },
    { id: 3, title: "Message to Future Me", status: "Draft", date: "—" },
  ];
  const badges = [
    { id: "first-letter", label: "First Letter", icon: "🥇", done: true },
    { id: "trusted", label: "Trusted Contact", icon: "🔐", done: false },
    { id: "upgrade", label: "Premium Unlocked", icon: "💎", done: false },
    { id: "complete", label: "Vault Complete", icon: "🌕", done: false },
  ];

  if (!ready) {
    return (
      <main style={{padding:"24px"}}>
        <div style={{opacity:.8}}>Loading your vault…</div>
      </main>
    );
  }

  return (
    <>
      {/* Top Bar */}
      <header className="topbar">
        <div className="container tb-in">
          <div className="left">
            <Link href="/" className="brand" title="Back to Home">
              <img src="/logo.svg" alt="After.Me logo" width={26} height={26} />
              <span>After.Me</span>
            </Link>
            <span className="divider hide-mobile" />
            <span className="section-title hide-mobile">My Vault</span>
          </div>

          <div className="right">
            <div className="badges hide-mobile" aria-label="Achievements">
              {badges.map(b => (
                <span key={b.id} className={`badge ${b.done ? "ok": "dim"}`} title={b.label}>
                  <span aria-hidden>{b.icon}</span>
                </span>
              ))}
            </div>
            <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
              <span/><span/><span/>
            </button>
          </div>
        </div>
      </header>

      {/* Flyout Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            className="menu"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18 }}
          >
            <div className="container menu-in">
              <button onClick={() => { setComposeOpen(true); setMenuOpen(false); }}>✉️ Write a Letter</button>
              <Link href="/dashboard/vault" onClick={() => setMenuOpen(false)}>📜 My Vault</Link>
              <Link href="/dashboard/plan" onClick={() => setMenuOpen(false)}>💳 Manage Plan</Link>
              <Link href="/dashboard/progress" onClick={() => setMenuOpen(false)}>📊 Legacy Progress</Link>
              <Link href="/settings" onClick={() => setMenuOpen(false)}>⚙️ Settings</Link>
              <a href="/logout">🚪 Log Out</a>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>

      {/* Hero */}
      <motion.section
        className="section hero"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25 }}
      >
        <div className="container hero-in">
          <div className="eyebrow"><span className="dot" /> Your private legacy workspace</div>
          <h1 className="title">Welcome back, @{username}</h1>
          <p className="subtitle">
            You have <b>{vaultStats.letters}</b> letters in your vault —
            <b> {vaultStats.scheduled}</b> waiting and <b>{vaultStats.delivered}</b> delivered.
          </p>

          <div className="cta">
            <button className="btn solid lg" onClick={() => setComposeOpen(true)}>Write Letter ✍️</button>
            <Link className="btn ghost lg" href="/dashboard/plan">Upgrade Plan 💎</Link>
          </div>

          {/* Vault Progress */}
          <div className="progress-wrap" role="region" aria-label="Vault Progress">
            <div className="progress">
              <span style={{ width: "40%" }} />
            </div>
            <small className="muted">Vault Progress: 40% — add a trusted contact to improve your legacy health.</small>
          </div>
        </div>
      </motion.section>

      {/* Plans Row: Premium (L) + Free (C) + Lifetime (R) */}
      <section className="section">
        <div className="container plans-3">
          {/* PREMIUM (LEFT) — Most Chosen */}
          <PlanCard
            variant="premium"
            mostChosen
            title="Premium"
            price="$10/mo"
            features={[
              "Unlimited letters",
              "Trusted contacts (quorum)",
              "Inactivity trigger (heartbeat)",
            ]}
            cta="Upgrade Now"
            href="/dashboard/upgrade?plan=premium"
          />

          {/* FREE (CENTER) */}
          <PlanCard
            variant="free"
            active={plan === "free"}
            title="Free"
            price="$0"
            features={[
              "3 letters",
              "Client-side encryption",
              "Date-based delivery",
            ]}
            cta={plan === "free" ? "Current Plan" : "Continue Free"}
            href="/dashboard/upgrade?plan=free"
          />

          {/* LIFETIME (RIGHT) — Shimmer */}
          <PlanCard
            variant="lifetime"
            title="Lifetime"
            price="$199"
            features={[
              "All Premium features",
              "One-time payment",
              "Priority legacy support",
            ]}
            cta="Buy Lifetime"
            href="/dashboard/upgrade?plan=lifetime"
          />
        </div>
      </section>

      {/* Memory Sparks + Inspiration + Heartbeat */}
      <section className="section">
        <div className="container grid-3">
          <Card title="Memory Sparks" icon="✨" hint="Anonymous, opt-in examples.">
            <p className="quote">“A letter takes five minutes, but it may live for decades.”</p>
            <p className="muted">People vanish. Words remain.</p>
          </Card>

          <Card title="Inspiration Corner" icon="💡">
            <p className="muted">Write one thing your future self will need to hear.</p>
            <button className="btn ghost full" onClick={() => setComposeOpen(true)}>Write Now</button>
          </Card>

          <Card title="Heartbeat" icon="🔁">
            <p className="muted">Your heartbeat keeps your vault alive during inactivity.</p>
            <button className="btn solid full">Renew Heartbeat</button>
            <small className="muted">Premium feature – encourages timely releases.</small>
          </Card>
        </div>
      </section>

      {/* Timeline */}
      <section className="section">
        <div className="container">
          <div className="row-hd">
            <h3 className="h3">Journey Timeline</h3>
            <Link href="/dashboard/vault" className="muted small-link">See all →</Link>
          </div>
          <div className="timeline">
            {timeline.map(item => (
              <div key={item.id} className="node">
                <div className={`node-dot ${item.status.toLowerCase()}`} />
                <div className="node-body">
                  <div className="node-top">
                    <span className="n-title">{item.title}</span>
                    <span className={`pill ${item.status.toLowerCase()}`}>{item.status}</span>
                  </div>
                  <div className="muted">{item.date}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Compose Modal (demo) */}
      <ComposeModal open={composeOpen} onClose={() => setComposeOpen(false)} />

      {/* Styles */}
      <style jsx>{`
        :root{
          --bg:#050505; --fg:#f5f5f5; --muted:#c7c7c7; --card:#0b0b0b; --border:#1a1a1a;
          --glow:0 0 24px rgba(255,255,255,.06), 0 0 1px rgba(255,255,255,.25) inset;
        }
        body{background:var(--bg);color:var(--fg)}
        .container{max-width:1100px;margin:0 auto;padding:0 20px}

        /* Topbar */
        .topbar{position:sticky;top:0;z-index:20;border-bottom:1px solid var(--border);background:rgba(5,5,5,.7);backdrop-filter:saturate(1.1) blur(8px)}
        .tb-in{display:flex;justify-content:space-between;align-items:center;height:64px}
        .brand{display:flex;align-items:center;gap:10px;color:#fff;font-weight:600}
        .divider{width:1px;height:20px;background:var(--border);margin:0 10px}
        .section-title{opacity:.9}
        .right{display:flex;align-items:center;gap:10px}
        .badges{display:flex;gap:8px}
        .badge{width:28px;height:28px;display:grid;place-items:center;border:1px solid var(--border);border-radius:8px;background:#0c0c0c}
        .badge.ok{box-shadow:0 0 10px rgba(255,255,255,.06)}
        .badge.dim{opacity:.6}
        .hamburger{border:1px solid var(--border);background:#0c0c0c;border-radius:10px;padding:6px 8px}
        .hamburger span{display:block;width:18px;height:2px;background:#fff;margin:3px 0;border-radius:2px}

        /* Menu */
        .menu{position:sticky;top:64px;z-index:19;background:#070707;border-bottom:1px solid var(--border)}
        .menu-in{display:flex;gap:16px;padding:12px 20px;flex-wrap:wrap}
        .menu a, .menu button{color:#fff;opacity:.9}

        /* Hero */
        .section{padding:32px 0}
        .hero{padding:48px 0 28px;text-align:center;position:relative}
        .hero:before{
          content:"";position:absolute;inset:-40px -10px 0 -10px;
          background:radial-gradient(60% 45% at 50% 0%, rgba(255,255,255,.08), transparent 60%);
          pointer-events:none;z-index:-1;
        }
        .hero-in{display:grid;gap:10px;place-items:center}
        .eyebrow{display:inline-flex;align-items:center;gap:8px;border:1px solid #2b2b2b;border-radius:999px;padding:6px 12px;color:#bdbdbd;font-size:12.5px}
        .dot{width:6px;height:6px;border-radius:50%;background:#fff;box-shadow:0 0 12px #fff}
        .title{font-size:30px;line-height:1.2;margin:10px 0}
        .subtitle{max-width:760px;color:#e6e6e6}
        .cta{display:flex;gap:10px;justify-content:center;flex-wrap:wrap;margin-top:6px}
        .btn{border-radius:10px;padding:10px 14px;font-weight:600;transition:.2s}
        .btn.solid{background:#fff;color:#000}
        .btn.ghost{border:1px solid #3a3a3a;color:#fff}
        .btn.lg{padding:12px 18px}

        .progress-wrap{display:grid;gap:8px;margin-top:14px}
        .progress{height:8px;background:#0a0a0a;border:1px solid var(--border);border-radius:999px;overflow:hidden}
        .progress span{display:block;height:100%;background:#fff}

        /* Plans Row */
        .plans-3{
          display:grid;grid-template-columns:repeat(3,1fr);gap:16px;align-items:stretch
        }
        .plan{position:relative;border-radius:18px;padding:18px;border:1px solid var(--border);background:var(--card);display:grid;gap:12px;box-shadow:0 0 16px rgba(255,255,255,.04);transition:.25s}
        .plan:hover{transform:translateY(-4px);box-shadow:0 0 26px rgba(255,255,255,.08)}
        .plan .hdr{display:flex;align-items:center;justify-content:space-between}
        .plan .title{font-weight:700;margin:0}
        .plan .price{opacity:.95;font-weight:700}
        .plan ul{margin:0;padding-left:18px;color:#ddd;display:grid;gap:6px}
        .plan .cta-row{display:flex;gap:10px;flex-wrap:wrap}
        .pill{border:1px solid var(--border);border-radius:999px;padding:2px 8px;font-size:12px;opacity:.95}

        /* Variant: PREMIUM (left) */
        .premium{
          background: linear-gradient(160deg, #6C63FF 0%, #8A7CFF 100%);
          border-color: rgba(255,255,255,.2);
          color:#0b0b0b;
        }
        .premium .btn.ghost{border-color:rgba(0,0,0,.3);color:#0b0b0b}
        .premium .btn.solid{background:#0b0b0b;color:#fff}
        .ribbon{
          position:absolute;top:10px;left:10px;
          background:rgba(11,11,11,.85);color:#fff;border:1px solid rgba(255,255,255,.25);
          padding:4px 10px;border-radius:999px;font-size:12px;box-shadow:var(--glow)
        }

        /* Variant: FREE (center) */
        .free{
          background: linear-gradient(160deg, #1A1A1A 0%, #2A2A2A 100%);
        }
        .free .btn.solid{background:#fff;color:#000}
        .free .btn.ghost{border-color:#3a3a3a;color:#fff}
        .current{
          background:rgba(255,255,255,.08);
          border-color:rgba(255,255,255,.2)
        }

        /* Variant: LIFETIME (right) with shimmer */
        .lifetime{
          background: linear-gradient(160deg, #F2C94C 0%, #F9E79F 100%);
          color:#0b0b0b; border-color:rgba(0,0,0,.15); overflow:hidden;
        }
        .lifetime:before{
          content:""; position:absolute; inset:0;
          background: linear-gradient(110deg, transparent 0%, rgba(255,255,255,.35) 20%, transparent 40%);
          transform: translateX(-100%);
          animation: shimmer 3.2s ease-in-out infinite;
        }
        @keyframes shimmer{
          0%{ transform: translateX(-120%) }
          60%{ transform: translateX(120%) }
          100%{ transform: translateX(120%) }
        }
        .lifetime .btn.ghost{border-color:rgba(0,0,0,.25);color:#0b0b0b}
        .lifetime .btn.solid{background:#0b0b0b;color:#fff}

        /* Cards (Sparks/Heartbeat/Etc) */
        .grid-3{display:grid;grid-template-columns:repeat(3,1fr);gap:16px}
        .card{background:var(--card);border:1px solid var(--border);border-radius:16px;padding:18px;box-shadow:0 0 16px rgba(255,255,255,.04);transition:.25s}
        .card:hover{transform:translateY(-3px);box-shadow:0 0 26px rgba(255,255,255,.08)}
        .card .hd{display:flex;align-items:center;gap:10px;margin-bottom:8px}
        .card .hd h3{margin:0;font-size:18px}
        .quote{fontStyle:italic;color:#eee}
        .btn.full{width:100%;text-align:center}

        /* Timeline */
        .row-hd{display:flex;justify-content:space-between;align-items:center;margin-bottom:10px}
        .h3{font-size:20px;margin:0}
        .small-link{font-size:14px}
        .timeline{display:grid;gap:12px}
        .node{display:flex;gap:12px;align-items:flex-start;background:#0a0a0a;border:1px solid var(--border);border-radius:14px;padding:12px 14px}
        .node-dot{width:10px;height:10px;border-radius:50%}
        .node-dot.delivered{background:#7aff9a}
        .node-dot.scheduled{background:#ffd56a}
        .node-dot.draft{background:#a1a1a1}
        .node-top{display:flex;gap:8px;align-items:center}
        .n-title{font-weight:600}
        .pill.delivered{background:rgba(122,255,154,.12);border-color:rgba(122,255,154,.25)}
        .pill.scheduled{background:rgba(255,213,106,.12);border-color:rgba(255,213,106,.25)}
        .pill.draft{background:rgba(161,161,161,.12);border-color:rgba(161,161,161,.25)}

        /* Responsive */
        .hide-mobile{display:inline-flex}
        @media (max-width: 960px){
          .hide-mobile{display:none}
          .plans-3{grid-template-columns:1fr}
          .grid-3{grid-template-columns:1fr}
        }
      `}</style>
    </>
  );
}

/* ---------- Reusable Components ---------- */

function PlanCard({
  variant, title, price, features, cta, href, mostChosen = false, active = false,
}: {
  variant: "premium" | "free" | "lifetime";
  title: string;
  price: string;
  features: string[];
  cta: string;
  href: string;
  mostChosen?: boolean;
  active?: boolean;
}) {
  return (
    <div className={`plan ${variant} ${active ? "current": ""}`}>
      {mostChosen && <div className="ribbon">Most Chosen</div>}
      <div className="hdr">
        <h4 className="title">{title}</h4>
        <div className="price">{price}</div>
      </div>
      <ul>
        {features.map((f, i) => <li key={i}>{f}</li>)}
      </ul>
      <div className="cta-row">
        <Link className="btn solid" href={href}>{cta}</Link>
        {variant !== "free" && <Link className="btn ghost" href="/dashboard/plan">Details</Link>}
      </div>
    </div>
  );
}

function Card({
  title, icon, hint, children,
}: {
  title: string;
  icon?: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="card">
      <div className="hd">
        {icon && <span aria-hidden>{icon}</span>}
        <h3>{title}</h3>
      </div>
      {hint && <small className="muted" style={{display:"block", marginBottom:8}}>{hint}</small>}
      {children}
    </div>
  );
}

function ComposeModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [title, setTitle] = useState("");
  const [to, setTo] = useState("");
  const [date, setDate] = useState("");
  const [content, setContent] = useState("");

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="modal"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.18 }}
          >
            <div className="modal-hd">
              <h3 style={{margin:0}}>New Letter</h3>
              <button className="ghost" onClick={onClose}>Close</button>
            </div>
            <div className="form">
              <label>Title</label>
              <input value={title} onChange={e=>setTitle(e.target.value)} placeholder="E.g., Letter to Mom" />

              <label>Recipient Email</label>
              <input value={to} onChange={e=>setTo(e.target.value)} placeholder="name@example.com" />

              <label>Unlock Date</label>
              <input type="date" value={date} onChange={e=>setDate(e.target.value)} />

              <label>Message</label>
              <textarea rows={6} value={content} onChange={e=>setContent(e.target.value)} placeholder="Write your words here..." />

              <button className="btn solid full" onClick={()=>{
                onClose();
                alert("Draft saved locally (demo). Next step: client-side AES + Supabase.");
              }}>Encrypt & Save (Demo)</button>
            </div>
          </motion.div>

          <style jsx>{`
            .overlay{position:fixed;inset:0;background:rgba(0,0,0,.6);display:grid;place-items:center;z-index:50}
            .modal{width:min(720px,92vw);background:#0b0b0b;border:1px solid var(--border);border-radius:16px;padding:16px}
            .modal-hd{display:flex;justify-content:space-between;align-items:center;margin-bottom:8px}
            .form{display:grid;gap:8px}
            label{font-size:13px;color:#cfcfcf}
            input,textarea{background:#0a0a0a;border:1px solid var(--border);border-radius:10px;color:#fff;padding:10px 12px}
          `}</style>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
