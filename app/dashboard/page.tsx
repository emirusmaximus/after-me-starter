"use client";

import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

/**
 * Premium, hikayeleştirilmiş dashboard
 * - Username ekranı estetik kart olarak
 * - Üst bar: Back to Home, avatar, @username, Logout
 * - Hero: gradient başlık + kısa hikaye
 * - Quick Actions
 * - Plan kartları: gradient ring + cam efekti
 * - Vault Preview: boş durumda şık illüstrasyon + CTA
 * - Journey Timeline: duygusal kapanış
 * Tüm stiller bu dosyada (styled-jsx); ek CSS gerektirmez.
 */

export default function Dashboard() {
  const router = useRouter();

  // Auth + Profile
  const [user, setUser] = useState<any>(null);
  const [hasUsername, setHasUsername] = useState(false);
  const [displayNameInput, setDisplayNameInput] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const { data } = await supabase.auth.getUser();
      if (!data.user) {
        router.push("/login");
        return;
      }
      setUser(data.user);
      const saved = !!data.user.user_metadata?.username;
      setHasUsername(saved);
      setDisplayNameInput(data.user.user_metadata?.username || "");
      setLoading(false);
    })();
  }, [router]);

  async function handleLogout() {
    await supabase.auth.signOut();
    router.push("/login");
  }

  async function saveUsername(e: React.FormEvent) {
    e.preventDefault();
    const value = displayNameInput.trim();
    if (value.length < 2) return;
    const { error } = await supabase.auth.updateUser({ data: { username: value } });
    if (!error) setHasUsername(true);
  }

  const initial =
    (user?.user_metadata?.username?.[0] ||
      user?.email?.[0] ||
      "U")
      .toUpperCase();

  if (loading) {
    return (
      <div style={{ minHeight: "100vh", display: "grid", placeItems: "center", color: "#fff" }}>
        <h2>Loading your vault…</h2>
      </div>
    );
  }

  /* ───────── Username Setup (estetik kart) ───────── */
  if (!hasUsername) {
    return (
      <main className="u-page">
        <div className="u-card">
          <div className="u-logo">After.Me</div>
          <h1 className="u-title">Choose a name that will echo in time</h1>
          {!user?.email_confirmed_at && (
            <div className="u-banner">
              Please confirm your email to secure your vault. Check your inbox.
            </div>
          )}
          <form onSubmit={saveUsername} className="u-form">
            <label className="u-label">Username</label>
            <input
              className="u-input"
              type="text"
              placeholder="e.g. emir, e.coban"
              value={displayNameInput}
              onChange={(e) => setDisplayNameInput(e.target.value)}
              minLength={2}
              required
            />
            <button
              type="submit"
              className="u-btn"
              disabled={displayNameInput.trim().length < 2}
            >
              Continue →
            </button>
            <button type="button" className="u-link" onClick={handleLogout}>
              Log out
            </button>
          </form>
        </div>

        <style jsx global>{`
          :root { --bg:#030303; --fg:#f5f5f5; --card:#0d0d0d; --border:#1f1f1f; --muted:#bdbdbd; }
          .u-page{min-height:100vh;display:grid;place-items:center;background:var(--bg);color:var(--fg);padding:24px}
          .u-card{
            width:min(560px,92%);background:linear-gradient(180deg,#0e0e0e,#0a0a0a);
            border:1px solid var(--border);border-radius:18px;padding:36px 28px;
            box-shadow:0 12px 60px rgba(0,0,0,.6), inset 0 1px 0 rgba(255,255,255,.04);
            animation:fadeIn .7s ease
          }
          .u-logo{font-weight:800;letter-spacing:.2px;margin-bottom:6px;opacity:.9}
          .u-title{font-size:26px;line-height:1.28;margin:0 0 14px;background:linear-gradient(90deg,#fff,#bfbfbf);
            -webkit-background-clip:text;color:transparent}
          .u-banner{background:#0b0b0b;border:1px dashed #333;color:#e8e8e8;padding:10px 12px;border-radius:10px;font-size:13px;margin-bottom:16px}
          .u-form{display:grid;gap:10px}
          .u-label{font-size:13px;color:var(--muted)}
          .u-input{background:#000;border:1px solid #333;color:#fff;padding:12px 14px;border-radius:10px;font-size:15px}
          .u-input:focus{border-color:#fff}
          .u-btn{margin-top:6px;background:#fff;color:#000;border:none;border-radius:10px;padding:12px 16px;font-weight:700;cursor:pointer;transition:transform .15s}
          .u-btn:hover{transform:translateY(-1px)}
          .u-btn[disabled]{opacity:.5;cursor:not-allowed;transform:none}
          .u-link{margin-top:6px;background:transparent;color:#fff;border:1px solid var(--border);border-radius:10px;padding:10px 16px}
          @keyframes fadeIn{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}
        `}</style>
      </main>
    );
  }

  /* ───────── Premium Dashboard ───────── */
  return (
    <main className="dash">
      {/* Top bar */}
      <div className="bar">
        <div className="bar-left">
          <button className="ghost" onClick={() => router.push("/")}>← Back to Home</button>
        </div>
        <div className="bar-right">
          <div className="avatar" aria-hidden>{initial}</div>
          <span className="handle">@{user?.user_metadata?.username}</span>
          <button className="ghost" onClick={handleLogout}>Log out</button>
        </div>
      </div>

      {/* Hero */}
      <section className="hero">
        <h1>
          Welcome, {user?.user_metadata?.username} <span className="moon">🌙</span>
        </h1>
        <p className="lead">
          Every word you write will become part of your legacy. This is your space —
          your thoughts, your memories, your truth.
        </p>
        <div className="quick">
          <button className="solid">+ Write a new message</button>
          <button className="ghost">Manage profile</button>
        </div>
      </section>

      {/* Plans */}
      <section className="section">
        <div className="sec-head">
          <h2>Choose Your Vault Plan</h2>
          <p className="muted">Decide how far your words will travel.</p>
        </div>
        <div className="grid">
          {[
            { title: "Free", desc: "Write up to 5 messages. Simple, secure." },
            { title: "Premium", desc: "Unlimited messages, scheduled delivery, encrypted storage.", highlight: true },
            { title: "Lifetime", desc: "Everything unlocked. Your voice, forever preserved." },
          ].map((p) => (
            <div key={p.title} className={`card ${p.highlight ? "hi" : ""}`}>
              <div className="ring" />
              <div className="card-body">
                <h3>{p.title}</h3>
                <p className="muted">{p.desc}</p>
                {p.title !== "Free" && <button className="dark">Upgrade →</button>}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Vault Preview */}
      <section className="section">
        <div className="sec-head">
          <h2>Your Vault</h2>
          <p className="muted">No messages yet. Start your first letter.</p>
        </div>
        <div className="vault">
          <div className="illustration" aria-hidden>
            <svg width="120" height="120" viewBox="0 0 120 120" fill="none">
              <circle cx="60" cy="60" r="46" stroke="rgba(255,255,255,.14)" strokeWidth="2"/>
              <path d="M35 65 L60 38 L85 65" stroke="white" strokeOpacity=".8" strokeWidth="2" fill="none"/>
              <rect x="44" y="66" width="32" height="20" rx="6" fill="rgba(255,255,255,.06)" stroke="rgba(255,255,255,.18)"/>
            </svg>
          </div>
          <button className="solid">+ New Message</button>
        </div>
      </section>

      {/* Journey */}
      <section className="section">
        <div className="sec-head">
          <h2>Your Journey So Far</h2>
        </div>
        <div className="timeline">
          {[
            "You created your account.",
            "You chose a name to be remembered by.",
            "One day, these words will reach someone you chose."
          ].map((t, i) => (
            <div key={i} className="node">
              <span className="dot" /> <p>{t}</p>
            </div>
          ))}
        </div>
      </section>

      <footer className="foot">© 2025 After.Me — Crafted by CobsVault Labs</footer>

      {/* Styles (tamamı bu dosyada) */}
      <style jsx global>{`
        :root{
          --bg:#050505; --fg:#f5f5f5; --muted:#c7c7c7;
          --card:#0b0b0b; --border:#1a1a1a; --ring:#2a2a2a;
        }
        .dash{max-width:1100px;margin:0 auto;padding:32px 20px;color:var(--fg);background:var(--bg)}
        .bar{display:flex;justify-content:space-between;align-items:center;margin-bottom:18px}
        .bar-right{display:flex;align-items:center;gap:10px}
        .avatar{width:28px;height:28px;border-radius:50%;background:#fff;color:#000;display:grid;place-items:center;font-weight:800}
        .handle{opacity:.85;font-size:14px}
        .ghost{background:transparent;color:#fff;border:1px solid #3a3a3a;border-radius:10px;padding:8px 14px;transition:.2s}
        .ghost:hover{background:#fff;color:#000}
        .hero{text-align:center;margin:18px 0 56px}
        .hero h1{font-size:34px;margin-bottom:8px;background:linear-gradient(90deg,#fff,#bfbfbf);-webkit-background-clip:text;color:transparent}
        .moon{filter:saturate(.9);opacity:.95}
        .lead{max-width:760px;margin:0 auto;color:#e1e1e1}
        .quick{display:flex;gap:10px;justify-content:center;margin-top:16px;flex-wrap:wrap}
        .solid{background:#fff;color:#000;border:none;border-radius:10px;padding:12px 16px;font-weight:700;transition:.15s}
        .solid:hover{transform:translateY(-1px)}
        .dark{background:#0f0f0f;color:#fff;border:1px solid #3a3a3a;border-radius:10px;padding:10px 14px;font-weight:600}
        .section{margin:40px 0}
        .sec-head{text-align:center;margin-bottom:12px}
        .muted{color:var(--muted)}
        .grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:18px;margin-top:14px}
        .card{position:relative;border-radius:18px;overflow:hidden}
        .card .ring{
          position:absolute;inset:0;border-radius:18px;
          background:linear-gradient(135deg,rgba(255,255,255,.18),rgba(255,255,255,0) 40%);
          opacity:.25;pointer-events:none;border:1px solid var(--ring);
        }
        .card .card-body{
          position:relative;background:rgba(255,255,255,.03);
          backdrop-filter:blur(6px);
          border:1px solid var(--border);
          border-radius:16px;margin:1px;padding:22px;min-height:160px;
          transition:transform .2s, box-shadow .2s;
        }
        .card:hover .card-body{transform:translateY(-4px);box-shadow:0 16px 40px rgba(0,0,0,.35)}
        .card.hi .card-body{border-color:#fff}
        .vault{display:grid;justify-items:center;gap:14px;padding:22px;border:1px dashed #2e2e2e;border-radius:16px;background:linear-gradient(180deg,#0c0c0c,#0a0a0a)}
        .illustration{opacity:.9}
        .timeline{display:grid;gap:12px;justify-items:center}
        .node{display:flex;gap:10px;align-items:center;opacity:.9}
        .dot{width:8px;height:8px;border-radius:50%;background:#fff;box-shadow:0 0 12px #fff}
        .foot{text-align:center;margin:60px 0 12px;opacity:.6;border-top:1px solid var(--border);padding-top:16px}
        @media (max-width:640px){.hero h1{font-size:26px}}
      `}</style>
    </main>
  );
}
