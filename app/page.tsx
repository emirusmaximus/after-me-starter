// ─────────────────────────────────────────────────────────────────────────────
// app/dashboard/page.tsx — Dashboard (v1.2)
// Theme-aligned with homepage • Professional UX • Square (no-radius) tall plan cards
// Premium (left, $2/mo) • Free (center, current) • Lifetime (right, $15, shimmer)
// ─────────────────────────────────────────────────────────────────────────────
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/lib/supabaseClient";

export default function DashboardPage() {
  const [ready, setReady] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [composeOpen, setComposeOpen] = useState(false);

  // Demo data (TODO: wire to DB)
  const username = "emir";
  const plan: "free" | "premium" | "lifetime" = "free";
  const stats = { letters: 3, waiting: 1, days: 22, progress: 40 };

  useEffect(() => {
    (async () => {
      const { data } = await supabase.auth.getUser();
      if (!data.user) {
        window.location.replace("/login?redirectTo=/dashboard");
      } else setReady(true);
    })();
  }, []);

  if (!ready) return <main style={{ padding: 24 }}>Loading…</main>;

  return (
    <>
      <header className="top">
        <div className="container topin">
          <Link href="/" className="brand">
            <img src="/logo.svg" width={24} height={24} alt="After.Me" />
            <span>After.Me</span>
          </Link>
          <nav className="nav">
            <Link href="/dashboard">Dashboard</Link>
            <Link href="/dashboard/plan">Plans</Link>
            <button className="menu" onClick={() => setMenuOpen(!menuOpen)}><span/><span/><span/></button>
          </nav>
        </div>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div className="fly" initial={{ opacity:0, y:-6 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0, y:-6 }}>
            <div className="container flyin">
              <button onClick={() => setComposeOpen(true)}>✉️ Write a Letter</button>
              <Link href="/dashboard/plan">💳 Manage Plan</Link>
              <Link href="/dashboard/transactions">🧾 Transaction History</Link>
              <Link href="/settings">⚙️ Settings</Link>
              <a href="/logout">🚪 Log Out</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero */}
      <section className="hero">
        <div className="container h-in">
          <div className="eyebrow"><span className="dot"/> Your private legacy workspace</div>
          <h1>Welcome back, @{username}</h1>
          <p className="lead">Your vault has <b>{stats.letters}</b> letters. <b>{stats.waiting}</b> waiting for delivery.</p>
          <p className="muted">Reminder: You haven’t written a message in <b>{stats.days}</b> days.</p>
          <div className="cta">
            <button className="btn solid" onClick={() => setComposeOpen(true)}>Write New Letter ✍️</button>
            <Link className="btn ghost" href="/dashboard/plan">Upgrade Plan 💎</Link>
          </div>
          <div className="progress" role="progressbar" aria-valuenow={stats.progress} aria-valuemin={0} aria-valuemax={100}>
            <span style={{ width: `${stats.progress}%` }}/>
          </div>
          <small className="muted">Vault Progress: {stats.progress}%</small>
        </div>
      </section>

      {/* Tall, square-corner plan stack */}
      <section className="plans">
        <div className="container p-in">
          <article className="plan premium">
            <header><h3>Premium</h3><div className="price">$2/mo</div></header>
            <div className="ribbon">Most Chosen</div>
            <ul>
              <li>Unlimited letters</li>
              <li>Trusted contacts (quorum)</li>
              <li>Inactivity trigger (heartbeat)</li>
            </ul>
            <Link href="/dashboard/upgrade?plan=premium" className="btn solid full">Upgrade to Premium</Link>
          </article>

          <article className={`plan free ${plan === "free" ? "current" : ""}`}>
            <header><h3>Free</h3><div className="price">$0</div></header>
            <ul>
              <li>3 letters</li>
              <li>Client-side encryption</li>
              <li>Date-based delivery</li>
            </ul>
            <Link href="/dashboard/upgrade?plan=free" className="btn ghost full">{plan === "free" ? "Current Plan" : "Continue Free"}</Link>
          </article>

          <article className="plan lifetime">
            <header><h3>Lifetime</h3><div className="price">$15</div></header>
            <div className="shine" aria-hidden/>
            <ul>
              <li>All Premium features</li>
              <li>One-time payment</li>
              <li>Priority legacy support</li>
            </ul>
            <Link href="/dashboard/upgrade?plan=lifetime" className="btn solid full">Own Forever</Link>
          </article>
        </div>
      </section>

      {/* Lower grid: Memory / Inspiration / Heartbeat */}
      <section className="lower">
        <div className="container grid">
          <div className="card">
            <h4>✨ Memory Sparks</h4>
            <Rotator items={[
              "He left us his voice. We still hear it every year on his birthday.",
              "One letter can live longer than a monument.",
              "People vanish. Words remain.",
            ]}/>
          </div>
          <div className="card">
            <h4>💡 Inspiration Corner</h4>
            <p className="muted">Write one thing you’d want your future self to know.</p>
            <button className="btn ghost full" onClick={() => setComposeOpen(true)}>Write now</button>
          </div>
          <div className="card">
            <h4>🔁 Heartbeat Reminder</h4>
            <p className="muted">We haven’t heard from you in a while. Your heartbeat keeps your vault alive.</p>
            <button className="btn solid full">Renew heartbeat 🔄</button>
          </div>
        </div>
      </section>

      <ComposeModal open={composeOpen} onClose={() => setComposeOpen(false)} />

      <style jsx>{`
        :root{ --bg:#050505; --fg:#f5f5f5; --muted:#bdbdbd; --card:#0a0a0a; --line:#1d1d1d; }
        body{ background:var(--bg); color:var(--fg) }
        .container{ max-width:1120px; margin:0 auto; padding:0 20px }
        .top{ position:sticky; top:0; z-index:20; background:rgba(5,5,5,.7); backdrop-filter:blur(8px); border-bottom:1px solid var(--line) }
        .topin{ height:64px; display:flex; align-items:center; justify-content:space-between }
        .brand{ display:flex; align-items:center; gap:10px; color:#fff; font-weight:700 }
        .nav{ display:flex; align-items:center; gap:16px }
        .menu{ border:1px solid var(--line); background:#0c0c0c; padding:6px 8px }
        .menu span{ display:block; width:18px; height:2px; background:#fff; margin:3px 0 }
        .fly{ position:sticky; top:64px; background:#070707; border-bottom:1px solid var(--line) }
        .flyin{ display:flex; gap:16px; padding:10px 20px; flex-wrap:wrap }

        .hero{ text-align:center; padding:52px 0 28px; position:relative }
        .hero:before{ content:""; position:absolute; inset:-40px 0 0 0; background:radial-gradient(60% 40% at 50% 0, rgba(255,255,255,.08), transparent 60%) }
        .eyebrow{ display:inline-flex; align-items:center; gap:8px; border:1px solid #2b2b2b; padding:6px 12px; font-size:12.5px; color:#cfcfcf }
        .dot{ width:6px; height:6px; border-radius:50%; background:#fff; box-shadow:0 0 12px #fff }
        .lead{ color:#e8e8e8 }
        .muted{ color:var(--muted) }
        .cta{ display:flex; gap:10px; justify-content:center; margin:10px 0 6px }
        .btn{ font-weight:800; padding:12px 16px; border:1px solid #2f2f2f; background:transparent; color:#fff; transition:.2s; letter-spacing:.2px }
        .btn:hover{ transform:translateY(-1px) }
        .btn.solid{ background:#fff; color:#000 }
        .btn.ghost{ background:transparent; color:#fff }
        .btn.full{ width:100%; text-align:center }
        .progress{ height:8px; border:1px solid var(--line); background:#0a0a0a; margin:10px auto 0; width:min(680px,86vw) }
        .progress span{ display:block; height:100%; background:#fff }

        /* Plan stack — tall, square, centered */
        .plans{ padding:28px 0 }
        .p-in{ display:grid; grid-template-columns:repeat(3, 1fr); gap:16px }
        .plan{ display:grid; grid-template-rows:auto 1fr auto; border:1px solid var(--line); background:var(--card); padding:20px; min-height:440px; box-shadow:0 0 18px rgba(255,255,255,.04) }
        .plan *{ border-radius:0 } /* Köşesiz */
        .plan header{ display:flex; justify-content:space-between; align-items:center; margin-bottom:10px }
        .plan h3{ margin:0; font-size:20px; letter-spacing:.2px }
        .plan .price{ font-weight:900 }
        .plan ul{ margin:0; padding-left:18px; display:grid; gap:8px; color:#e4e4e4 }
        .plan:hover{ outline:1px solid #3a3a3a }
        .plan.current{ outline:1px solid #7c7c7c }

        /* PREMIUM */
        .premium{ background:linear-gradient(165deg, #6C63FF 0%, #8A7CFF 100%); color:#0b0b0b; border-color:rgba(255,255,255,.25) }
        .premium .btn.solid{ background:#0b0b0b; color:#fff; border-color:#0b0b0b }
        .premium .btn.ghost{ border-color:rgba(0,0,0,.35); color:#0b0b0b }
        .ribbon{ position:absolute; margin-top:-14px; padding:4px 10px; background:rgba(11,11,11,.9); color:#fff; border:1px solid rgba(255,255,255,.3); font-size:12px; box-shadow:0 0 16px rgba(0,0,0,.35) }

        /* FREE */
        .free{ background:linear-gradient(165deg, #1E1E1E 0%, #2C2C2C 100%) }

        /* LIFETIME + shimmer */
        .lifetime{ position:relative; background:linear-gradient(165deg, #F2C94C 0%, #F9E79F 100%); color:#0b0b0b; border-color:rgba(0,0,0,.2); overflow:hidden }
        .lifetime .btn.solid{ background:#0b0b0b; color:#fff; border-color:#0b0b0b }
        .lifetime .btn.ghost{ border-color:rgba(0,0,0,.3); color:#0b0b0b }
        .shine{ position:absolute; inset:0; background:linear-gradient(110deg, transparent 0%, rgba(255,255,255,.38) 18%, transparent 36%); transform:translateX(-120%); animation:sh 3.3s ease-in-out infinite }
        @keyframes sh { 0%{ transform:translateX(-120%) } 60%{ transform:translateX(120%) } 100%{ transform:translateX(120%) } }

        /* Lower */
        .lower{ padding:20px 0 48px }
        .grid{ display:grid; grid-template-columns:repeat(3,1fr); gap:16px }
        .card{ background:var(--card); border:1px solid var(--line); padding:18px; box-shadow:0 0 18px rgba(255,255,255,.04) }

        @media (max-width:980px){ .p-in, .grid{ grid-template-columns:1fr } }
      `}</style>
    </>
  );
}

function Rotator({ items, interval = 3600 }: { items: string[]; interval?: number }){
  const [i, setI] = useState(0);
  useEffect(() => { const t = setInterval(() => setI(v => (v+1)%items.length), interval); return () => clearInterval(t); }, [items.length, interval]);
  return <p className="muted">“{items[i]}”</p>;
}

function ComposeModal({ open, onClose }: { open: boolean; onClose: () => void }){
  const [title, setTitle] = useState("");
  const [to, setTo] = useState("");
  const [date, setDate] = useState("");
  const [content, setContent] = useState("");
  return (
    <AnimatePresence>
      {open && (
        <motion.div className="overlay" initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}>
          <motion.div className="modal" initial={{ opacity:0, y:8 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0, y:8 }}>
            <div className="mh"><h3>New Letter</h3><button className="btn ghost" onClick={onClose}>Close</button></div>
            <label>Title</label><input value={title} onChange={e=>setTitle(e.target.value)} placeholder="E.g., Letter to Mom"/>
            <label>Recipient Email</label><input value={to} onChange={e=>setTo(e.target.value)} placeholder="name@example.com"/>
            <label>Unlock Date</label><input type="date" value={date} onChange={e=>setDate(e.target.value)}/>
            <label>Message</label><textarea rows={6} value={content} onChange={e=>setContent(e.target.value)} placeholder="Write your words here…"/>
            <button className="btn solid">Encrypt & Save (Demo)</button>
            <style jsx>{`
              .overlay{ position:fixed; inset:0; background:rgba(0,0,0,.6); display:grid; place-items:center; z-index:50 }
              .modal{ width:min(720px,92vw); background:#0b0b0b; border:1px solid #1d1d1d; padding:16px }
              .mh{ display:flex; justify-content:space-between; align-items:center; margin-bottom:6px }
              input,textarea{ background:#0a0a0a; border:1px solid #1d1d1d; color:#fff; padding:10px 12px; margin-bottom:8px }
            `}</style>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// app/login/page.tsx — Login (v1.2)
// Clean, professional; square inputs; password toggle; helpful copy; OAuth slots
// ─────────────────────────────────────────────────────────────────────────────
"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { supabase as sb } from "@/lib/supabaseClient";

export function LoginPage() {
  const router = useRouter();
  const qp = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); setBusy(true); setErr(null);
    const { error } = await sb.auth.signInWithPassword({ email, password });
    setBusy(false);
    if (error) setErr(error.message);
    else router.replace(qp.get("redirectTo") || "/dashboard");
  };

  return (
    <main className="auth">
      <div className="box">
        <header className="hd">
          <Link href="/" className="brand"><img src="/logo.svg" width={24} height={24} alt="After.Me"/><span>After.Me</span></Link>
          <h1>Sign in</h1>
          <p className="muted">Welcome back. Enter your email and password.</p>
        </header>
        <form onSubmit={onSubmit} className="form">
          <label>Email</label>
          <input required type="email" placeholder="you@example.com" value={email} onChange={e=>setEmail(e.target.value)} />
          <label>Password</label>
          <div className="pw">
            <input required type={show?"text":"password"} placeholder="Your password" value={password} onChange={e=>setPassword(e.target.value)} />
            <button type="button" className="tog" onClick={()=>setShow(s=>!s)}>{show?"Hide":"Show"}</button>
          </div>
          {err && <p className="err">{err}</p>}
          <button className="btn solid full" disabled={busy}>{busy?"Signing in…":"Sign in"}</button>
        </form>
        <div className="row">
          <span className="muted">New here?</span> <Link href="/signup">Create an account</Link>
        </div>
      </div>

      <style jsx>{`
        :root{ --bg:#050505; --fg:#f5f5f5; --line:#1d1d1d; }
        .auth{ min-height:100dvh; display:grid; place-items:center; background:var(--bg); color:var(--fg) }
        .box{ width:min(420px,92vw); border:1px solid var(--line); background:#0a0a0a; padding:22px }
        .hd{ display:grid; gap:6px; text-align:center }
        .brand{ display:inline-flex; gap:10px; align-items:center; margin:0 auto 4px; color:#fff; font-weight:800 }
        .muted{ color:#bdbdbd }
        .form{ display:grid; gap:8px; margin-top:10px }
        input{ background:#0a0a0a; border:1px solid var(--line); color:#fff; padding:12px 12px; border-radius:0 }
        .pw{ display:grid; grid-template-columns:1fr auto; align-items:center }
        .tog{ border:1px solid var(--line); background:#0c0c0c; color:#fff; padding:10px 12px; border-radius:0 }
        .err{ color:#ffb3b3; margin:6px 0 0 }
        .btn{ border:1px solid #2f2f2f; background:#fff; color:#000; padding:12px 14px; font-weight:800; border-radius:0 }
        .row{ display:flex; gap:8px; justify-content:center; margin-top:12px }
      `}</style>
    </main>
  );
}

export default LoginPage;

// ─────────────────────────────────────────────────────────────────────────────
// app/signup/page.tsx — Signup (v1.2)
// Crisp layout; password confirm; terms; plan nudge; square inputs; pro copy
// ─────────────────────────────────────────────────────────────────────────────
"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import { supabase as supa } from "@/lib/supabaseClient";

export function SignupPage(){
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [err, setErr] = useState<string|null>(null);
  const [busy, setBusy] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); setErr(null);
    if(password !== confirm){ setErr("Passwords do not match."); return; }
    setBusy(true);
    const { error } = await supa.auth.signUp({ email, password });
    setBusy(false);
    if(error) setErr(error.message);
    else router.replace("/dashboard");
  };

  return (
    <main className="auth">
      <div className="box">
        <header className="hd">
          <Link href="/" className="brand"><img src="/logo.svg" width={24} height={24} alt="After.Me"/><span>After.Me</span></Link>
          <h1>Create account</h1>
          <p className="muted">Write now, store encrypted, deliver later.</p>
        </header>
        <form onSubmit={onSubmit} className="form">
          <label>Email</label>
          <input required type="email" placeholder="you@example.com" value={email} onChange={e=>setEmail(e.target.value)}/>
          <label>Password</label>
          <input required type="password" placeholder="At least 8 characters" value={password} onChange={e=>setPassword(e.target.value)}/>
          <label>Confirm Password</label>
          <input required type="password" placeholder="Repeat password" value={confirm} onChange={e=>setConfirm(e.target.value)}/>
          {err && <p className="err">{err}</p>}
          <button className="btn solid full" disabled={busy}>{busy?"Creating…":"Create account"}</button>
          <div className="muted small" style={{marginTop:8}}>
            By signing up you agree to our <a href="/legal/terms">Terms</a> and <a href="/legal/privacy">Privacy</a>.
          </div>
        </form>
        <div className="row">
          <span className="muted">Already have an account?</span> <Link href="/login">Sign in</Link>
        </div>
        <div className="nudge">
          <div className="ncol premium">
            <div className="t">Premium</div>
            <div className="p">$2/mo</div>
          </div>
          <div className="ncol lifetime">
            <div className="t">Lifetime</div>
            <div className="p">$15</div>
          </div>
        </div>
      </div>

      <style jsx>{`
        :root{ --bg:#050505; --fg:#f5f5f5; --line:#1d1d1d }
        .auth{ min-height:100dvh; display:grid; place-items:center; background:var(--bg); color:var(--fg) }
        .box{ width:min(520px,92vw); border:1px solid var(--line); background:#0a0a0a; padding:22px }
        .hd{ display:grid; gap:6px; text-align:center }
        .brand{ display:inline-flex; gap:10px; align-items:center; margin:0 auto 4px; color:#fff; font-weight:800 }
        .muted{ color:#bdbdbd }
        .small{ font-size:12.5px }
        .form{ display:grid; gap:8px; margin-top:10px }
        input{ background:#0a0a0a; border:1px solid var(--line); color:#fff; padding:12px 12px; border-radius:0 }
        .err{ color:#ffb3b3; margin:6px 0 0 }
        .btn{ border:1px solid #2f2f2f; background:#fff; color:#000; padding:12px 14px; font-weight:800; border-radius:0 }
        .row{ display:flex; gap:8px; justify-content:center; margin-top:12px }
        .nudge{ display:grid; grid-template-columns:1fr 1fr; gap:10px; margin-top:14px }
        .ncol{ display:grid; grid-template-columns:1fr auto; align-items:center; border:1px solid var(--line); padding:10px; background:#0b0b0b }
        .ncol .t{ font-weight:800 }
        .ncol .p{ font-weight:900 }
        .ncol.premium{ background:linear-gradient(165deg, #6C63FF 0%, #8A7CFF 100%); color:#0b0b0b; border-color:rgba(255,255,255,.25) }
        .ncol.lifetime{ background:linear-gradient(165deg, #F2C94C 0%, #F9E79F 100%); color:#0b0b0b; border-color:rgba(0,0,0,.2) }
      `}</style>
    </main>
  );
}

export default SignupPage;
