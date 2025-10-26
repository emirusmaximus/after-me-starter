"use client";

import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function DashboardPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [composeOpen, setComposeOpen] = useState(false);

  // Demo data (placeholder)
  const username = "emir";
  const vaultStats = { letters: 2, scheduled: 1, delivered: 1 };
  const timeline = [
    { id: 1, title: "Letter to Mom", status: "Delivered", date: "Aug 12, 2025" },
    { id: 2, title: "18th Birthday Letter", status: "Scheduled", date: "Jan 03, 2033" },
  ];
  const trustProgress = { contacts: 1, required: 2 }; // e.g., 2-of-N

  return (
    <>
      {/* Top Bar */}
      <header className="topbar">
        <div className="container tb-in">
          <div className="left">
            <Link href="/" className="brand" title="Go to Home">
              <img src="/logo.svg" alt="After.Me logo" width={26} height={26} />
              <span>After.Me</span>
            </Link>
            <Link href="/" className="ghost small hide-mobile">Back to Home</Link>
          </div>

          <div className="right">
            <button className="ghost small hide-mobile" onClick={() => setComposeOpen(true)}>
              Start a Letter
            </button>
            <div className="avatar" aria-label="User menu" onClick={() => setMenuOpen(!menuOpen)}>
              {username.slice(0,1).toUpperCase()}
            </div>
            {/* Hamburger (mobile) */}
            <button className="hamburger show-mobile" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
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
              <Link href="/dashboard" onClick={() => setMenuOpen(false)}>Dashboard</Link>
              <button onClick={() => { setComposeOpen(true); setMenuOpen(false); }}>Start a Letter</button>
              <Link href="/settings" onClick={() => setMenuOpen(false)}>Settings</Link>
              <a href="/logout">Log out</a>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>

      {/* Hero / Narrative */}
      <motion.section
        className="section hero"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25 }}
      >
        <div className="container">
          <div className="eyebrow"><span className="dot" /> Your private legacy workspace</div>
          <h1 className="title">Welcome back, @{username}</h1>
          <p className="subtitle">
            Your vault is where warm, encrypted messages become future moments. Write now. Decide when they unlock.
          </p>

          <div className="cta">
            <button className="btn solid lg" onClick={() => setComposeOpen(true)}>Start a Letter</button>
            <Link className="btn ghost lg" href="/dashboard/vault">Open Vault</Link>
          </div>

          {/* Soft narrative ribbon */}
          <p className="note">
            “A letter takes five minutes, but it may live for decades.”
          </p>
        </div>
      </motion.section>

      {/* Quick Actions + Vault Health */}
      <section className="section">
        <div className="container grid-3">
          {/* Quick Start */}
          <motion.div className="card lift" initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <div className="card-hd">
              <IconFeather/><h3>What do you want to write?</h3>
            </div>
            <ul className="quick">
              <li><button onClick={() => setComposeOpen(true)}>A Letter to Someone I Love</button></li>
              <li><button onClick={() => setComposeOpen(true)}>A Message to My Future Self</button></li>
              <li><button onClick={() => setComposeOpen(true)}>Instructions & Accounts</button></li>
            </ul>
            <div className="hint">Encrypted on your device before saving.</div>
          </motion.div>

          {/* Vault Health */}
          <motion.div className="card lift" initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <div className="card-hd">
              <IconShield/><h3>Vault</h3>
            </div>
            <div className="stats2">
              <div><b>{vaultStats.letters}</b><span>Letters</span></div>
              <div><b>{vaultStats.scheduled}</b><span>Scheduled</span></div>
              <div><b>{vaultStats.delivered}</b><span>Delivered</span></div>
            </div>
            <Link className="btn ghost full" href="/dashboard/vault">Open Vault →</Link>
          </motion.div>

          {/* Trust Setup */}
          <motion.div className="card lift" initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <div className="card-hd">
              <IconKey/><h3>Trusted Contacts</h3>
            </div>
            <p className="muted">Choose who can receive or unlock your words when rules are met.</p>
            <div className="progress">
              <div className="bar"><span style={{ width: `${(trustProgress.contacts / trustProgress.required) * 100}%` }} /></div>
              <small>{trustProgress.contacts}/{trustProgress.required} set</small>
            </div>
            <Link className="btn solid full" href="/dashboard/trust">Set Up Contacts</Link>
          </motion.div>
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
                <div className={`dot ${item.status === "Delivered" ? "ok" : "pending"}`} />
                <div className="node-body">
                  <div className="node-top">
                    <span className="n-title">{item.title}</span>
                    <span className={`badge ${item.status === "Delivered" ? "green" : "amber"}`}>{item.status}</span>
                  </div>
                  <div className="muted">{item.date}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gentle Upsell (not pushy) */}
      <section className="section">
        <div className="container plans">
          <div className="plans-hd">
            <h3 className="h3">Grow your vault at your pace</h3>
            <p className="muted">Quiet upgrades that protect more of your story.</p>
          </div>
          <div className="plan-grid">
            <Plan
              name="Free"
              price="$0"
              ctaText="Continue Free"
              href="/dashboard/upgrade?plan=free"
              features={[
                "3 letters",
                "Client-side encryption",
                "Date-based delivery",
              ]}
            />
            <Plan
              name="Premium"
              price="$10/mo"
              ctaText="Upgrade"
              href="/dashboard/upgrade?plan=premium"
              features={[
                "Unlimited letters",
                "Inactivity timer (heartbeat)",
                "Trusted contacts quorum",
              ]}
              featured
            />
            <Plan
              name="Lifetime"
              price="$199"
              ctaText="Buy Lifetime"
              href="/dashboard/upgrade?plan=lifetime"
              features={[
                "All Premium features",
                "One-time payment",
                "Priority support",
              ]}
            />
          </div>
        </div>
      </section>

      {/* Stories Strip (emotional nudge) */}
      <section className="section">
        <div className="container stories">
          <StoryCard quote="“He left us his voice. We still hear it every year on his birthday.”" by="A Daughter" />
          <StoryCard quote="“To my son: May you never fear the unknown.”" by="A Father" />
          <StoryCard quote="“I wrote this when I was 25. If you’re reading this, I found the courage.”" by="A Stranger" />
        </div>
      </section>

      {/* Composer Modal */}
      <ComposeModal open={composeOpen} onClose={() => setComposeOpen(false)} />

      {/* Styles */}
      <style jsx>{`
        :root{
          --bg:#050505; --fg:#f5f5f5; --muted:#c7c7c7; --card:#0b0b0b; --border:#1a1a1a;
        }
        body{background:var(--bg);color:var(--fg)}
        .container{max-width:1100px;margin:0 auto;padding:0 20px}
        .topbar{position:sticky;top:0;z-index:20;border-bottom:1px solid var(--border);background:rgba(5,5,5,.7);backdrop-filter:saturate(1.1) blur(8px)}
        .tb-in{display:flex;justify-content:space-between;align-items:center;height:64px}
        .brand{display:flex;align-items:center;gap:10px;color:#fff;font-weight:600}
        .ghost{border:1px solid #2f2f2f;background:#0c0c0c;color:#fff;border-radius:10px;padding:8px 12px}
        .ghost.small{padding:6px 10px;font-size:13px}
        .avatar{width:32px;height:32px;border-radius:10px;border:1px solid var(--border);display:grid;place-items:center;background:#0d0d0d;font-weight:700;cursor:pointer}
        .hamburger{display:none;border:1px solid var(--border);background:#0c0c0c;border-radius:10px;padding:6px 8px}
        .hamburger span{display:block;width:18px;height:2px;background:#fff;margin:3px 0;border-radius:2px}
        .left{display:flex;align-items:center;gap:12px}
        .right{display:flex;align-items:center;gap:10px}
        .hide-mobile{display:inline-flex}
        .show-mobile{display:none}
        .menu{position:sticky;top:64px;z-index:19;background:#070707;border-bottom:1px solid var(--border)}
        .menu-in{display:flex;gap:16px;padding:12px 20px}
        .menu a, .menu button{color:#fff;opacity:.9}
        .section{padding:32px 0}
        .hero{text-align:center;padding:48px 0 30px}
        .eyebrow{display:inline-flex;align-items:center;gap:8px;border:1px solid #2b2b2b;border-radius:999px;padding:6px 12px;color:#bdbdbd;font-size:12.5px}
        .dot{width:6px;height:6px;border-radius:50%;background:#fff;box-shadow:0 0 12px #fff}
        .title{font-size:30px;line-height:1.2;margin:14px 0}
        .subtitle{max-width:760px;margin:0 auto;color:#e6e6e6}
        .cta{display:flex;gap:10px;justify-content:center;margin-top:16px;flex-wrap:wrap}
        .btn{border-radius:10px;padding:10px 14px;font-weight:600;transition:.2s}
        .btn.solid{background:#fff;color:#000}
        .btn.ghost{border:1px solid #3a3a3a;color:#fff}
        .btn.lg{padding:12px 18px}
        .note{margin-top:12px;color:#ddd;opacity:.9}

        .grid-3{display:grid;grid-template-columns:repeat(3,1fr);gap:16px}
        .card{background:var(--card);border:1px solid var(--border);border-radius:16px;padding:18px}
        .card.lift{transition:.2s;box-shadow:0 0 16px rgba(255,255,255,.04)}
        .card.lift:hover{transform:translateY(-4px);box-shadow:0 0 22px rgba(255,255,255,.06)}
        .card-hd{display:flex;align-items:center;gap:10px;margin-bottom:10px}
        .card-hd h3{font-size:18px;margin:0}
        .muted{color:var(--muted)}
        .quick{display:grid;gap:8px;margin:8px 0 10px}
        .quick li{list-style:none}
        .quick button{width:100%;text-align:left;background:#0a0a0a;border:1px solid var(--border);color:#fff;border-radius:10px;padding:10px 12px}
        .hint{font-size:12.5px;color:#a9a9a9;margin-top:4px}
        .stats2{display:grid;grid-template-columns:repeat(3,1fr);gap:10px;margin:8px 0 14px}
        .stats2 div{background:#0a0a0a;border:1px solid var(--border);border-radius:12px;padding:12px;text-align:center}
        .stats2 b{display:block;font-size:20px}
        .progress{display:grid;gap:8px;margin:10px 0}
        .bar{height:8px;background:#0a0a0a;border:1px solid var(--border);border-radius:999px;overflow:hidden}
        .bar span{display:block;height:100%;background:#fff}

        .row-hd{display:flex;justify-content:space-between;align-items:center;margin-bottom:10px}
        .h3{font-size:20px;margin:0}
        .small-link{font-size:14px}
        .timeline{display:grid;gap:12px}
        .node{display:flex;gap:12px;align-items:flex-start;background:#0a0a0a;border:1px solid var(--border);border-radius:14px;padding:12px 14px}
        .dot{width:10px;height:10px;border-radius:50%}
        .dot.ok{background:#7aff9a}
        .dot.pending{background:#ffd56a}
        .node-top{display:flex;gap:8px;align-items:center}
        .n-title{font-weight:600}
        .badge{border:1px solid var(--border);border-radius:999px;padding:2px 8px;font-size:12px}
        .badge.green{background:rgba(122,255,154,.1);border-color:rgba(122,255,154,.2)}
        .badge.amber{background:rgba(255,213,106,.1);border-color:rgba(255,213,106,.2)}

        .plans{display:grid;gap:12px}
        .plans-hd{text-align:center}
        .plan-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:14px}
        .plan{background:var(--card);border:1px solid var(--border);border-radius:16px;padding:18px;display:grid;gap:12px;position:relative}
        .plan.featured{box-shadow:0 0 22px rgba(255,255,255,.06)}
        .plan .price{font-size:22px;font-weight:700}
        .plan ul{margin:0;padding-left:18px;color:#ddd}
        .plan .cta{justify-content:flex-start}
        .btn.full{width:100%;text-align:center}
        .stories{display:grid;grid-template-columns:repeat(3,1fr);gap:14px}
        .story{background:var(--card);border:1px solid var(--border);border-radius:16px;padding:18px}
        .story p{font-style:italic;margin:0 0 6px}

        @media (max-width: 860px){
          .grid-3{grid-template-columns:1fr}
          .plan-grid{grid-template-columns:1fr}
          .stories{grid-template-columns:1fr}
          .hide-mobile{display:none}
          .show-mobile{display:inline-flex}
        }
      `}</style>
    </>
  );
}

/* ---------- Small components ---------- */

function Plan({
  name, price, ctaText, href, features, featured=false
}: {
  name:string; price:string; ctaText:string; href:string; features:string[]; featured?:boolean
}) {
  return (
    <div className={`plan ${featured ? "featured": ""}`}>
      <div className="row" style={{display:"flex", justifyContent:"space-between", alignItems:"center"}}>
        <h4 style={{margin:0}}>{name}</h4>
        <div className="price">{price}</div>
      </div>
      <ul>
        {features.map((f,i)=><li key={i}>{f}</li>)}
      </ul>
      <div className="cta">
        <Link className="btn ghost" href={href}>{ctaText}</Link>
      </div>
    </div>
  );
}

function StoryCard({quote, by}:{quote:string; by:string}) {
  return (
    <div className="story">
      <p>“{quote.replace(/(^“|”$)/g,"")}”</p>
      <small className="muted">— {by}</small>
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
                // NOTE: Here we will plug client-side AES + Supabase insert in the next step.
                // For now, just close with a fake success.
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

/* ---------- Minimal icon components (monochrome) ---------- */
function IconFeather(){ return (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
    <path d="M20 5c-4 0-8 3-10 7L4 18l6-2c4-2 7-6 7-11z" stroke="#fff" strokeOpacity=".9"/>
  </svg>
);}

function IconShield(){ return (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
    <path d="M12 3l7 3v6c0 4-3 7-7 9-4-2-7-5-7-9V6l7-3z" stroke="#fff" strokeOpacity=".9"/>
  </svg>
);}

function IconKey(){ return (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
    <circle cx="8" cy="9" r="3" stroke="#fff" strokeOpacity=".9"/>
    <path d="M11 9h9l-2 2 2 2" stroke="#fff" strokeOpacity=".9"/>
  </svg>
);}
