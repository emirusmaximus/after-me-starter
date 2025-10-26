"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { createClient } from "@supabase/supabase-js";

// Supabase client (yerel kullanım; dilersen lib/supabaseClient.ts ile değiştir)
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

type UserMeta = { username?: string };

export default function DashboardV4() {
  const router = useRouter();
  const [username, setUsername] = useState<string>("…");
  const [loading, setLoading] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);

  // Demo state (gerçek verilere bağlanınca Supabase sorguları ile doldur)
  const [stats, setStats] = useState({ letters: 0, scheduled: 0, delivered: 0 });
  const [accounts, setAccounts] = useState([
    { name: "Google", connected: false },
    { name: "Instagram", connected: false },
    { name: "X (Twitter)", connected: false },
  ]);
  const nextCheckIn = "Nov 12, 2025"; // örnek tarih

  useEffect(() => {
    (async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { router.push("/login"); return; }
      const meta = (user.user_metadata || {}) as UserMeta;
      const u = meta.username || user.email?.split("@")[0] || "friend";
      setUsername(u);
      // TODO: messages tablosundan gerçek sayılar
      setStats({ letters: 0, scheduled: 0, delivered: 0 });
      setLoading(false);
    })();
  }, [router]);

  const onLogout = async () => { await supabase.auth.signOut(); router.push("/"); };
  const onCompose = () => alert("Composer will open here. Text will be encrypted client-side (AES-GCM) and saved.");

  return (
    <div className="wrap">
      <ParticlesBackground />

      {/* TOPBAR — Logo = Home */}
      <header className="topbar" aria-label="Top bar">
        <Link className="logoBtn" href="/" aria-label="Go to homepage">
          <div className="logoWrap">
            <Image src="/logo.svg" alt="After.Me" width={28} height={28} priority />
          </div>
          <span className="brand">After.Me</span>
        </Link>

        <div className="topRight">
          {!loading && <div className="userPill">@{username}</div>}
          <button
            className="hamburger"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(v => !v)}
          >
            <span /><span /><span />
          </button>
        </div>
      </header>

      {/* WELCOME — kısa, kişisel, tekrar yok */}
      <section className="welcome">
        <h1>Welcome back, {loading ? "…" : username}.</h1>
        <p className="sub">
          Your words are safe, encrypted on your device. Deliver them on a date, on condition, or posthumously.
        </p>
        <div className="ctaRow">
          <button className="primary" onClick={onCompose}>+ Write a new message</button>
          <button
            className="ghost"
            onClick={() => document.getElementById("vault")?.scrollIntoView({ behavior: "smooth" })}
          >
            Open your vault
          </button>
          <button
            className="ghost"
            onClick={() => document.getElementById("accounts")?.scrollIntoView({ behavior: "smooth" })}
          >
            Connect accounts
          </button>
        </div>
        <ul className="trust">
          <li>Client-side AES-256</li>
          <li>Zero-knowledge</li>
          <li>Scheduled & conditional delivery</li>
        </ul>
      </section>

      {/* WHY STORY — neden yazmalı / neden upgrade */}
      <section className="story">
        <div className="storyCard">
          <h2>Why write?</h2>
          <p>
            Because words outlive time. Leave letters for birthdays, guidance for moments you might miss,
            and gentle truths only you can tell.
          </p>
        </div>
        <div className="storyCard">
          <h2>Why upgrade?</h2>
          <p>
            Premium gives you delivery finesse: richer schedules, trusted-contacts quorum (2-of-N),
            priority release queue — continuity without noise.
          </p>
        </div>
        <div className="storyCard">
          <h2>How it stays private</h2>
          <p>
            We never see your plaintext. Messages are encrypted before they leave your device.
            Your voice belongs to you alone.
          </p>
        </div>
      </section>

      {/* STATS */}
      <section className="stats">
        <Stat label="Messages" value={stats.letters} delay={0} />
        <Stat label="Scheduled" value={stats.scheduled} delay={80} />
        <Stat label="Delivered" value={stats.delivered} delay={160} />
      </section>

      {/* TWO COLUMNS — Vault + Accounts */}
      <section className="columns">
        {/* Vault */}
        <div className="panel vault" id="vault">
          <div className="panelHead">
            <h2>Your Vault</h2>
            <button className="mini" onClick={onCompose}>+ New</button>
          </div>

          {/* Empty state — çelişki yok, örnek itemları timeline'a taşıdık */}
          <div className="empty">
            <div className="placeholder" />
            <p className="muted">No messages yet. Start with a first letter.</p>
            <button className="primary" onClick={onCompose}>Start writing</button>
          </div>

          {/* Timeline preview (örnekler burada, Vault içeriğinden ayrı) */}
          <div className="timeline">
            <div className="tTitle">Recent & upcoming</div>
            <div className="tLine">
              <span className="dot past" /> <span>“To my mother” — delivered</span>
            </div>
            <div className="tLine">
              <span className="dot future" /> <span>“18th birthday letter” — scheduled for 2033</span>
            </div>
          </div>
        </div>

        {/* Accounts */}
        <div className="panel accounts" id="accounts">
          <div className="panelHead">
            <h2>Connected Accounts</h2>
            <span className="hint">Recommended for inactivity checks</span>
          </div>
          <ul className="accList">
            {accounts.map(acc => (
              <li key={acc.name}>
                <div className="accLeft">
                  <span className={`badge ${acc.connected ? "ok" : "no"}`} aria-hidden />
                  <span>{acc.name}</span>
                </div>
                <button className={acc.connected ? "ghost small" : "primary small"}>
                  {acc.connected ? "Connected" : "Connect"}
                </button>
              </li>
            ))}
          </ul>
          <div className="checkin">
            <div className="mini">Next “are you there?” check-in</div>
            <div className="date">{nextCheckIn}</div>
            <p className="muted sm">
              If you don’t confirm via email, your designated messages will be released to your contacts.
            </p>
          </div>
        </div>
      </section>

      {/* PLANS — tutarlı CTA metinleri */}
      <section className="plans">
        <h2 className="plansTitle">Digital continuity, without noise.</h2>
        <div className="planGrid">
          <div className="plan">
            <h3>Free</h3>
            <p className="muted">Enough to begin.</p>
            <ul>
              <li>Text messages</li>
              <li>Basic scheduling</li>
              <li>Client-side encryption</li>
            </ul>
            <button className="ghost wide">Continue</button>
          </div>
          <div className="plan featured">
            <div className="ring" aria-hidden />
            <h3>Premium</h3>
            <p className="muted">More memories, more control.</p>
            <ul>
              <li>Advanced scheduling</li>
              <li>Priority release queue</li>
              <li>Trusted contacts (2-of-N)</li>
            </ul>
            <a className="primaryLink wide" href="https://checkout.stripe.com/c/test_..." target="_blank" rel="noreferrer">
              Upgrade
            </a>
          </div>
          <div className="plan">
            <h3>Lifetime</h3>
            <p className="muted">Once, forever.</p>
            <ul>
              <li>All Premium features</li>
              <li>Lifetime access</li>
              <li>Priority support</li>
            </ul>
            <a className="ghostLink wide" href="https://checkout.stripe.com/c/test_..." target="_blank" rel="noreferrer">
              Own forever
            </a>
          </div>
        </div>
      </section>

      {/* DRAWER (hamburger menu) */}
      <aside className={`drawer ${menuOpen ? "open" : ""}`} aria-hidden={!menuOpen}>
        <div className="drawerHead">
          <Link className="logoBtn mini" href="/" aria-label="Home">
            <div className="logoWrap mini">
              <Image src="/logo.svg" alt="After.Me" width={22} height={22} />
            </div>
            <span className="brand">After.Me</span>
          </Link>
          <button className="close" aria-label="Close menu" onClick={() => setMenuOpen(false)}>✕</button>
        </div>
        <nav className="menu">
          <button onClick={onCompose}>+ Write a new message</button>
          <button onClick={() => document.getElementById("vault")?.scrollIntoView({ behavior: "smooth" })}>Your Vault</button>
          <button onClick={() => alert("Trusted Contacts — coming soon")}>Trusted Contacts</button>
          <button onClick={() => document.getElementById("accounts")?.scrollIntoView({ behavior: "smooth" })}>Accounts</button>
          <button onClick={() => document.querySelector(".plans")?.scrollIntoView({ behavior: "smooth" })}>Plans</button>
          <button onClick={() => alert("Settings — coming soon")}>Settings</button>
          <hr />
          <button className="danger" onClick={onLogout}>Log out</button>
        </nav>
      </aside>
      {menuOpen && <button className="backdrop" aria-label="Close menu" onClick={() => setMenuOpen(false)} />}

      <style jsx>{styles}</style>
    </div>
  );
}

/** Particles background — performant & respects prefers-reduced-motion */
function ParticlesBackground() {
  const ref = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = canvas.width = window.innerWidth;
    let h = canvas.height = window.innerHeight;
    const onResize = () => { w = canvas.width = window.innerWidth; h = canvas.height = window.innerHeight; };
    window.addEventListener("resize", onResize);

    const particles = Array.from({ length: 50 }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      r: Math.random() * 1.2 + 0.4,
      vx: (Math.random() - 0.5) * 0.2,
      vy: (Math.random() - 0.5) * 0.2,
      a: Math.random() * 0.4 + 0.2
    }));

    let raf = 0;
    const loop = () => {
      ctx.clearRect(0, 0, w, h);
      // soft vignette
      const grd = ctx.createRadialGradient(w/2, h/2, Math.min(w,h)/4, w/2, h/2, Math.max(w,h)/1.1);
      grd.addColorStop(0, "rgba(255,255,255,0.02)");
      grd.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = grd;
      ctx.fillRect(0,0,w,h);

      ctx.fillStyle = "rgba(255,255,255,0.7)";
      particles.forEach(p => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;
        ctx.globalAlpha = p.a;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI*2);
        ctx.fill();
      });
      ctx.globalAlpha = 1;

      if (!media.matches) raf = requestAnimationFrame(loop);
    };

    if (!media.matches) loop();
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", onResize); };
  }, []);

  return <canvas ref={ref} className="particles" aria-hidden />;
}

/** Small stat card */
function Stat({ label, value, delay=0 }: { label: string; value: number; delay?: number }) {
  return (
    <div className="stat" style={{ ["--delay" as any]: `${delay}ms` }}>
      <div className="value">{value}</div>
      <div className="label">{label}</div>
      <style jsx>{`
        .stat{
          border:1px solid var(--border); background:var(--card); border-radius:16px; padding:16px;
          display:grid; gap:6px; place-items:center; text-align:center;
          animation: rise .6s ease var(--delay, 0ms) both;
        }
        .value{ font-size:28px; font-weight:700; letter-spacing:.3px; }
        .label{ color:var(--muted); font-size:14px; }
        @keyframes rise{ from{ transform: translateY(8px); opacity:0 } to{ transform: translateY(0); opacity:1 } }
        @media (prefers-reduced-motion: reduce){ .stat{ animation:none } }
      `}</style>
    </div>
  );
}

/* ================== STYLED-JSX (Design tokens + motion) ================== */
const styles = /* css */`
.wrap{
  --bg:#050505; --fg:#f5f5f5; --card:#0b0b0b; --border:#1a1a1a; --muted:#c7c7c7;
  color:var(--fg); background:var(--bg); min-height:100dvh; position:relative;
  padding:20px 16px 90px; display:grid; gap:24px; justify-items:center; overflow:hidden;
}
.particles{
  position:fixed; inset:0; width:100vw; height:100vh; z-index:0; pointer-events:none; opacity:.55;
}

/* Topbar */
.topbar{ width:100%; max-width:1240px; display:flex; align-items:center; justify-content:space-between; z-index:2; }
.logoBtn{ display:flex; align-items:center; gap:10px; text-decoration:none; color:var(--fg); }
.logoWrap{
  width:32px; height:32px; border-radius:10px; border:1px solid var(--border); background:#0f0f0f;
  display:grid; place-items:center; box-shadow: inset 0 0 24px rgba(255,255,255,.06);
  animation: logoGlow 3800ms ease-in-out infinite;
}
.logoWrap:hover{ animation-play-state: paused; }
@keyframes logoGlow{
  0%{box-shadow: inset 0 0 18px rgba(255,255,255,.05)}
  50%{box-shadow: inset 0 0 28px rgba(255,255,255,.09)}
  100%{box-shadow: inset 0 0 18px rgba(255,255,255,.05)}
}
.brand{ font-weight:600; letter-spacing:.2px; }
.topRight{ display:flex; align-items:center; gap:10px; }
.userPill{ color:var(--muted); font-size:14px; }
.hamburger{
  width:38px; height:32px; border:1px solid var(--border); background:#0f0f0f; border-radius:10px; cursor:pointer;
  display:grid; place-items:center; padding:0 6px;
}
.hamburger span{ display:block; width:100%; height:2px; background:#dcdcdc; margin:3px 0; border-radius:2px; }

/* Welcome */
.welcome{ width:100%; max-width:980px; text-align:center; display:grid; gap:10px; margin-top:4px; z-index:1; }
.welcome h1{ margin:0; font-size:34px; line-height:1.15; animation: fadeUp .6s ease both; }
.sub{ color:#d8d8d8; margin:0 auto; max-width:740px; animation: fadeUp .7s ease 60ms both; }
.ctaRow{ display:flex; gap:10px; justify-content:center; flex-wrap:wrap; margin-top:8px; animation: fadeUp .7s ease 90ms both; }
.primary{
  background:#fff; color:#000; border:0; border-radius:14px; padding:10px 14px; font-weight:700; cursor:pointer;
  transition: transform 120ms ease, filter 120ms ease;
}
.primary:hover{ transform: scale(1.04); filter: brightness(.95); }
.ghost{
  background:transparent; color:var(--fg); border:1px solid var(--border);
  padding:10px 14px; border-radius:14px; cursor:pointer; transition: transform 120ms ease, background 120ms ease;
}
.ghost:hover{ transform: scale(1.03); background:#0d0d0d; }
.trust{ list-style:none; padding:0; margin:8px 0 0 0; display:flex; gap:12px; justify-content:center; flex-wrap:wrap; color:#bdbdbd; font-size:14px; animation: fadeUp .7s ease 120ms both; }

/* Story (Why/Why/How) */
.story{ width:100%; max-width:1240px; display:grid; grid-template-columns: repeat(3, minmax(0,1fr)); gap:12px; z-index:1; }
.storyCard{
  border:1px solid var(--border); background: radial-gradient(140% 120% at 50% -10%, rgba(255,255,255,0.04), rgba(0,0,0,0)), var(--card);
  border-radius:18px; padding:18px; box-shadow: 0 0 24px rgba(255,255,255,0.05); animation: fadeUp .6s ease both;
}
.storyCard h2{ margin:0 0 6px 0; }
.storyCard p{ margin:0; color:#d6d6d6; }

/* Stats */
.stats{ width:100%; max-width:1240px; display:grid; grid-template-columns: repeat(3,minmax(0,1fr)); gap:12px; z-index:1; }

/* Columns */
.columns{ width:100%; max-width:1240px; display:grid; grid-template-columns: 1.4fr .9fr; gap:12px; align-items:start; z-index:1; }
.panel{
  border:1px solid var(--border); background:var(--card); border-radius:18px; padding:18px; position:relative; animation: fadeUp .6s ease both;
}
.panelHead{ display:flex; align-items:center; justify-content:space-between; gap:12px; margin-bottom:6px; }
.panel h2{ margin:0; }
.mini{ padding:8px 12px; border-radius:12px; border:1px solid var(--border); background:#0f0f0f; color:#f5f5f5; cursor:pointer; }
.mini:hover{ background:#141414; }

.empty{
  border:1px dashed var(--border); border-radius:14px; padding:20px; display:grid; place-items:center; gap:10px; text-align:center;
  margin:10px 0 14px 0;
}
.placeholder{
  width:56px; height:56px; border-radius:14px; background:linear-gradient(180deg,#111,#0a0a0a);
  border:1px solid var(--border); box-shadow: inset 0 0 24px rgba(255,255,255,.06);
}

.timeline{ display:grid; gap:8px; margin-top:6px; }
.tTitle{ color:#eaeaea; font-weight:600; margin:6px 0 2px 0; }
.tLine{ display:flex; align-items:center; gap:10px; color:#d0d0d0; }
.dot{ width:10px; height:10px; border-radius:999px; display:inline-block; }
.dot.past{ background:#2a2a2a; border:1px solid #333; }
.dot.future{ background:#fafafa; border:1px solid #bbb; }

.accounts .hint{ color:#bdbdbd; font-size:13px; }
.accList{ list-style:none; padding:0; margin:8px 0 0 0; display:grid; gap:8px; }
.accList li{ display:flex; align-items:center; justify-content:space-between; gap:10px; border:1px solid var(--border); border-radius:12px; padding:10px 12px; }
.accLeft{ display:flex; align-items:center; gap:8px; }
.badge{ width:10px; height:10px; border-radius:999px; display:inline-block; }
.badge.ok{ background:#b8f5c2; border:1px solid #79c08b; }
.badge.no{ background:#f5d0b8; border:1px solid #c08b79; }
.small{ padding:8px 12px; border-radius:12px; font-size:14px; }
.primary.small{ background:#fff; color:#000; border:0; }
.primary.small:hover{ filter:brightness(.95) }
.ghost.small{ background:transparent; color:var(--fg); border:1px solid var(--border); }
.ghost.small:hover{ background:#111 }

.checkin{
  margin-top:12px; border:1px solid var(--border); border-radius:14px; padding:12px;
  background: radial-gradient(140% 120% at 50% -10%, rgba(255,255,255,0.04), rgba(0,0,0,0)), var(--card);
}
.mini{ color:#cfcfcf; font-size:13px; }
.date{ font-weight:700; margin:4px 0 4px 0; }
.muted{ color:var(--muted); }
.muted.sm{ font-size:13px; }

/* Plans */
.plans{ width:100%; max-width:1240px; display:grid; gap:12px; text-align:center; z-index:1; }
.plansTitle{ margin:6px 0 0 0; }
.planGrid{ display:grid; grid-template-columns:repeat(3, minmax(0,1fr)); gap:12px; }
.plan{
  border:1px solid var(--border); background:var(--card); border-radius:18px; padding:18px; text-align:left; position:relative; overflow:hidden;
  transition: transform 120ms ease, background 120ms ease, box-shadow 120ms ease;
}
.plan:hover{ transform: translateY(-2px); background:#0d0d0d; box-shadow: 0 0 24px rgba(255,255,255,.06); }
.plan h3{ margin:0 0 6px 0; }
.plan ul{ margin:10px 0 0 18px; color:#d0d0d0; }
.wide{ width:100%; margin-top:12px; }
.primaryLink, .ghostLink{
  display:inline-block; text-decoration:none; padding:10px 14px; border-radius:14px; border:1px solid var(--border);
}
.primaryLink{ background:#fff; color:#000; border:0; font-weight:700; }
.primaryLink:hover{ filter:brightness(.95); }
.ghostLink{ background:#0f0f0f; color:#f5f5f5; }
.ghostLink:hover{ background:#141414; }
.plan.featured .ring{
  position:absolute; inset:-40% -20% auto auto; width:260px; height:260px; border-radius:50%;
  border:1px solid rgba(255,255,255,.09); pointer-events:none;
}

/* Drawer */
.drawer{
  position:fixed; top:0; right:-320px; width:300px; height:100dvh; background:#0b0b0b; border-left:1px solid var(--border);
  transition:right 180ms ease; z-index:40; display:flex; flex-direction:column; padding:14px;
}
.drawer.open{ right:0; }
.drawerHead{ display:flex; align-items:center; justify-content:space-between; }
.logoBtn.mini .logoWrap{ width:26px; height:26px; border-radius:8px; }
.close{
  background:#111; color:#eee; border:1px solid var(--border); border-radius:10px; padding:6px 10px; cursor:pointer;
}
.menu{ display:grid; gap:8px; margin-top:10px; }
.menu button{
  text-align:left; padding:10px 12px; border:1px solid var(--border); background:#0f0f0f; color:#f5f5f5; border-radius:12px; cursor:pointer;
}
.menu button:hover{ background:#141414; }
.menu .danger{ border-color:#3a1a1a; background:#140f0f; }
.menu hr{ border:0; height:1px; background:#1a1a1a; margin:8px 0; }

/* Backdrop */
.backdrop{ position:fixed; inset:0; background:rgba(0,0,0,.35); z-index:30; border:0; }

/* Animations */
@keyframes fadeUp{ from{ opacity:0; transform: translateY(6px)} to{ opacity:1; transform: translateY(0)} }
@media (prefers-reduced-motion: reduce){
  .logoWrap{ animation:none }
  .welcome h1, .sub, .ctaRow, .trust, .storyCard, .panel{ animation:none }
}
 
/* Responsive */
@media (max-width: 1020px){
  .story{ grid-template-columns: 1fr; }
  .stats{ grid-template-columns: 1fr; }
  .columns{ grid-template-columns: 1fr; }
  .planGrid{ grid-template-columns: 1fr; }
  .welcome h1{ font-size:28px; }
}
`;
