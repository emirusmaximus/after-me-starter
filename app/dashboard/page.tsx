"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

type UserMeta = { username?: string };

export default function Dashboard() {
  const router = useRouter();
  const [username, setUsername] = useState<string>("…");
  const [loading, setLoading] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);

  const [stats, setStats] = useState({ messages: 0, scheduled: 0, delivered: 0 });

  useEffect(() => {
    (async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { router.push("/login"); return; }
      const meta = (user.user_metadata || {}) as UserMeta;
      const u = meta.username || user.email?.split("@")[0] || "friend";
      setUsername(u);
      // TODO: pull real stats from Supabase
      setStats({ messages: 0, scheduled: 0, delivered: 0 });
      setLoading(false);
    })();
  }, [router]);

  const onLogout = async () => { await supabase.auth.signOut(); router.push("/"); };
  const onCompose = () => alert("Composer modal (client-side AES-GCM) — coming next.");

  return (
    <div className="wrap">
      {/* TOPBAR — logo => landing (/) */}
      <header className="topbar">
        <Link className="logoBtn" href="/" aria-label="Home">
          <div className="logoWrap">
            <Image src="/logo.svg" alt="After.Me" width={28} height={28} priority />
          </div>
          <span className="brand">After.Me</span>
        </Link>
        <div className="topRight">
          {!loading && <div className="userPill">@{username}</div>}
          <button className="hamburger" onClick={() => setMenuOpen(v => !v)} aria-label="Menu">
            <span/><span/><span/>
          </button>
        </div>
      </header>

      {/* WELCOME */}
      <section className="hero">
        <h1>Welcome back, {loading ? "…" : username}.</h1>
        <p className="sub">Your words are encrypted on your device. Deliver on a date, on inactivity, or posthumously.</p>
        <div className="cta">
          <button className="primary" onClick={onCompose}>+ Write a new message</button>
          <Link href="#vault" className="ghost">Open your vault</Link>
          <Link href="#accounts" className="ghost">Connect accounts</Link>
        </div>
        <ul className="kpis">
          <li><b>{stats.messages}</b><span>Messages</span></li>
          <li><b>{stats.scheduled}</b><span>Scheduled</span></li>
          <li><b>{stats.delivered}</b><span>Delivered</span></li>
        </ul>
      </section>

      {/* TWO COLUMNS */}
      <section className="cols">
        {/* Vault */}
        <div className="panel" id="vault">
          <div className="panelHead">
            <h2>Your Vault</h2>
            <button className="mini" onClick={onCompose}>+ New</button>
          </div>

          <div className="empty">
            <div className="placeholder" />
            <p className="muted">No messages yet. Start with your first letter.</p>
            <button className="primary" onClick={onCompose}>Start a letter</button>
          </div>

          <div className="timeline">
            <div className="tTitle">Recent & upcoming</div>
            <div className="tLine"><span className="dot past" />“To my mother” — delivered</div>
            <div className="tLine"><span className="dot future" />“18th birthday letter” — scheduled for 2033</div>
          </div>
        </div>

        {/* Accounts */}
        <div className="panel" id="accounts">
          <div className="panelHead">
            <h2>Connected Accounts</h2>
            <span className="hint">Recommended for inactivity checks</span>
          </div>
          <ul className="accList">
            {["Google","Instagram","X (Twitter)"].map((n)=>(
              <li key={n}>
                <div className="accLeft"><span className="badge" />{n}</div>
                <button className="primary small">Connect</button>
              </li>
            ))}
          </ul>
          <div className="checkin">
            <div className="mini">Next “are you there?” check-in</div>
            <div className="date">Nov 12, 2025</div>
            <p className="muted sm">If you don’t confirm via email, your designated messages will be released to your contacts.</p>
          </div>
        </div>
      </section>

      {/* PLANS (clean, no ring/quarter-circle) */}
      <section className="plans" id="plans">
        <h2 className="plansTitle">Digital continuity, without noise.</h2>
        <div className="grid">
          <article className="plan">
            <h3>Free</h3>
            <p className="muted">Enough to begin.</p>
            <ul>
              <li>Up to 3 messages</li>
              <li>Date-based scheduling</li>
              <li>1 recipient per message</li>
              <li>Client-side AES-256 encryption</li>
            </ul>
            <button className="ghost wide">Continue</button>
          </article>

          <article className="plan featured">
            <h3>Premium</h3>
            <p className="muted">More memories, more control.</p>
            <ul>
              <li>Unlimited messages & recipients</li>
              <li>Advanced scheduling (date + inactivity)</li>
              <li>Trusted Contacts quorum (2-of-N)</li>
              <li>Priority release queue & audit log</li>
            </ul>
            <a className="primaryLink wide" href="https://checkout.stripe.com/c/test_..." target="_blank" rel="noreferrer">Upgrade</a>
          </article>

          <article className="plan">
            <h3>Lifetime</h3>
            <p className="muted">Once, forever.</p>
            <ul>
              <li>All Premium features</li>
              <li>Lifetime access</li>
              <li>Priority support</li>
              <li>Legacy certificate (optional)</li>
            </ul>
            <a className="ghostLink wide" href="https://checkout.stripe.com/c/test_..." target="_blank" rel="noreferrer">Own forever</a>
          </article>
        </div>
      </section>

      {/* Drawer */}
      {menuOpen && <button className="backdrop" aria-label="Close" onClick={()=>setMenuOpen(false)} />}
      <aside className={`drawer ${menuOpen ? "open":""}`} aria-hidden={!menuOpen}>
        <div className="drawerHead">
          <Link className="logoBtn mini" href="/" aria-label="Home">
            <div className="logoWrap mini">
              <Image src="/logo.svg" alt="After.Me" width={22} height={22}/>
            </div>
            <span className="brand">After.Me</span>
          </Link>
          <button className="close" onClick={()=>setMenuOpen(false)}>✕</button>
        </div>
        <nav className="menu">
          <button onClick={onCompose}>+ Write a new message</button>
          <a href="#vault">Your Vault</a>
          <a href="#accounts">Accounts</a>
          <a href="#plans">Plans</a>
          <hr/>
          <button className="danger" onClick={onLogout}>Log out</button>
        </nav>
      </aside>

      <style jsx>{styles}</style>
    </div>
  );
}

const styles = /* css */`
.wrap{ --bg:#050505; --fg:#f5f5f5; --card:#0b0b0b; --border:#1a1a1a; --muted:#c7c7c7;
  background:var(--bg); color:var(--fg); min-height:100dvh; padding:18px 16px 60px; display:grid; gap:24px; justify-items:center;
}

/* topbar */
.topbar{ width:100%; max-width:1240px; display:flex; justify-content:space-between; align-items:center; }
.logoBtn{ display:flex; align-items:center; gap:10px; color:var(--fg); text-decoration:none; }
.logoWrap{ width:32px; height:32px; border-radius:10px; border:1px solid var(--border); background:#0f0f0f; display:grid; place-items:center; box-shadow: inset 0 0 24px rgba(255,255,255,.06); }
.logoWrap.mini{ width:26px; height:26px; border-radius:8px; }
.brand{ font-weight:600; }
.topRight{ display:flex; gap:10px; align-items:center; }
.userPill{ color:var(--muted); font-size:14px; }
.hamburger{ width:38px; height:32px; border:1px solid var(--border); background:#0f0f0f; border-radius:10px; display:grid; place-items:center; padding:0 6px; }
.hamburger span{ display:block; width:100%; height:2px; background:#dcdcdc; margin:3px 0; border-radius:2px; }

/* hero */
.hero{ text-align:center; display:grid; gap:10px; max-width:980px; }
.hero h1{ margin:0; font-size:34px; }
.sub{ color:#d8d8d8; max-width:720px; margin:0 auto; }
.cta{ display:flex; gap:10px; justify-content:center; flex-wrap:wrap; }
.primary{ background:#fff; color:#000; border:0; border-radius:14px; padding:10px 14px; font-weight:700; }
.ghost{ background:transparent; color:var(--fg); border:1px solid var(--border); border-radius:14px; padding:10px 14px; }
.kpis{ list-style:none; display:flex; gap:12px; justify-content:center; padding:0; margin:6px 0 0; }
.kpis li{ display:grid; place-items:center; text-align:center; }
.kpis b{ font-size:22px; }
.kpis span{ color:var(--muted); font-size:13px; }

/* columns */
.cols{ width:100%; max-width:1240px; display:grid; grid-template-columns:1.4fr .9fr; gap:12px; }
.panel{ border:1px solid var(--border); background:var(--card); border-radius:18px; padding:18px; }
.panelHead{ display:flex; justify-content:space-between; align-items:center; }
.mini{ padding:8px 12px; border-radius:12px; border:1px solid var(--border); background:#0f0f0f; color:#f5f5f5; }
.mini:hover{ background:#141414; }
.empty{ border:1px dashed var(--border); border-radius:14px; padding:20px; display:grid; gap:10px; place-items:center; text-align:center; margin:10px 0 14px; }
.placeholder{ width:56px; height:56px; border-radius:14px; background:linear-gradient(180deg,#111,#0a0a0a); border:1px solid var(--border); box-shadow: inset 0 0 24px rgba(255,255,255,.06); }
.muted{ color:var(--muted); }
.timeline{ display:grid; gap:8px; }
.tTitle{ color:#eaeaea; font-weight:600; margin:6px 0 2px; }
.tLine{ display:flex; align-items:center; gap:10px; color:#d0d0d0; }
.dot{ width:10px; height:10px; border-radius:999px; }
.dot.past{ background:#2a2a2a; border:1px solid #333; }
.dot.future{ background:#fafafa; border:1px solid #bbb; }

.hint{ color:#bdbdbd; font-size:13px; }
.accList{ list-style:none; padding:0; margin:8px 0 0; display:grid; gap:8px; }
.accList li{ display:flex; justify-content:space-between; align-items:center; gap:10px; border:1px solid var(--border); border-radius:12px; padding:10px 12px; }
.accLeft{ display:flex; align-items:center; gap:8px; }
.badge{ width:10px; height:10px; border-radius:999px; background:#f5d0b8; border:1px solid #c08b79; }

.small{ padding:8px 12px; border-radius:12px; font-size:14px; }
.primary.small{ background:#fff; color:#000; border:0; }
.primary.small:hover{ filter:brightness(.95) }

.checkin{ margin-top:12px; border:1px solid var(--border); border-radius:14px; padding:12px; background: radial-gradient(140% 120% at 50% -10%, rgba(255,255,255,0.04), rgba(0,0,0,0)), var(--card); }
.mini{ color:#cfcfcf; font-size:13px; }
.date{ font-weight:700; margin:4px 0 4px; }
.sm{ font-size:13px; }

/* plans */
.plans{ width:100%; max-width:1240px; text-align:center; display:grid; gap:12px; }
.plansTitle{ margin:6px 0 0; }
.grid{ display:grid; grid-template-columns:repeat(3,minmax(0,1fr)); gap:12px; }
.plan{ border:1px solid var(--border); background:var(--card); border-radius:18px; padding:18px; text-align:left; transition: transform 120ms ease, background 120ms ease; }
.plan:hover{ transform: translateY(-2px); background:#0d0d0d; }
.plan h3{ margin:0 0 6px; }
.plan ul{ margin:10px 0 0 18px; color:#d0d0d0; }
.wide{ width:100%; margin-top:12px; }
.primaryLink, .ghostLink{ display:inline-block; text-decoration:none; padding:10px 14px; border-radius:14px; border:1px solid var(--border); }
.primaryLink{ background:#fff; color:#000; border:0; font-weight:700; }
.primaryLink:hover{ filter:brightness(.95); }
.ghostLink{ background:#0f0f0f; color:#f5f5f5; }
.ghostLink:hover{ background:#141414; }
.featured{ box-shadow: 0 0 24px rgba(255,255,255,.06); } /* ring tamamen kaldırıldı */

/* drawer */
.backdrop{ position:fixed; inset:0; background:rgba(0,0,0,.35); z-index:30; border:0; }
.drawer{ position:fixed; top:0; right:-320px; width:300px; height:100dvh; background:#0b0b0b; border-left:1px solid var(--border); transition:right 180ms ease; z-index:40; display:flex; flex-direction:column; padding:14px; }
.drawer.open{ right:0; }
.drawerHead{ display:flex; justify-content:space-between; align-items:center; }
.close{ background:#111; color:#eee; border:1px solid var(--border); border-radius:10px; padding:6px 10px; cursor:pointer; }
.menu{ display:grid; gap:8px; margin-top:10px; }
.menu a, .menu button{ text-align:left; padding:10px 12px; border:1px solid var(--border); background:#0f0f0f; color:#f5f5f5; border-radius:12px; cursor:pointer; text-decoration:none; }
.menu a:hover, .menu button:hover{ background:#141414; }
.menu .danger{ border-color:#3a1a1a; background:#140f0f; }

/* responsive */
@media (max-width:1020px){
  .cols{ grid-template-columns:1fr; }
  .grid{ grid-template-columns:1fr; }
  .hero h1{ font-size:28px; }
}
`;
