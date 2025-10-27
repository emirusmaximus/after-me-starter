"use client";
import Link from "next/link";
import { useState } from "react";
import { supabase } from "@/lib/supabaseClient"; // aynı kaldı

export default function InverseDashboard() {
  const [open, setOpen] = useState(false); // modal state kalsın, UI bozulmasın

  // Heartbeat confirm modal + toast
  const [hbOpen, setHbOpen] = useState(false);
  const [hbBusy, setHbBusy] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  // demo form state
  const [title, setTitle] = useState("");
  const [to, setTo] = useState("");
  const [date, setDate] = useState("");
  const [content, setContent] = useState("");

  // 🔧 Heartbeat: RPC yok, doğrudan profiles.last_heartbeat_at güncelleniyor
  async function handleRenewHeartbeat() {
    try {
      setHbBusy(true);
      const { data: { user }, error: uErr } = await supabase.auth.getUser();
      if (uErr) throw uErr;
      if (!user) throw new Error("Not signed in.");

      const nowIso = new Date().toISOString();
      const { error: upErr } = await supabase
        .from("profiles")
        .upsert(
          { id: user.id, last_heartbeat_at: nowIso },
          { onConflict: "id" }
        );

      if (upErr) throw upErr;

      setHbOpen(false);
      setToast("Heartbeat renewed. See you soon. ❤️");
    } catch (e: any) {
      setToast(e?.message || "Unexpected error.");
    } finally {
      setHbBusy(false);
      setTimeout(() => setToast(null), 2500);
    }
  }

  return (
    <main className="wrap">
      <div className="outer">
        {/* === BACKGROUND FX (Animated Mesh + Grain) === */}
        <div className="bgfx" aria-hidden="true" />

        {/* Topbar (hamburger tamamen kaldırıldı) */}
        <div className="topbar">
          <Link href="/" className="brand" aria-label="After.Me — Home">
            <img src="/logo.svg" width={36} height={36} alt="After.Me" />
          </Link>
        </div>

        <h1 className="title">Choose Your Plan</h1>

        {/* Plans */}
        <div className="plans">
          {/* PREMIUM */}
          <div className="card premium">
            <div className="corner-ribbon" aria-hidden="true">
              <span>Most Chosen</span>
            </div>

            <h2 className="plan-title serif">
              <span aria-hidden="true">💜 </span>Premium Plan
            </h2>
            <p className="price">$2 / month</p>

            <ul className="features">
              <li><b>Unlimited</b> encrypted letters</li>
              <li><b>Trusted contacts</b> (2-of-N quorum)</li>
              <li><b>Inactivity + heartbeat</b> triggers</li>
            </ul>

            <div className="cta-wrap">
              <Link href="#" className="btn btn-compact">Upgrade Now</Link>
            </div>
          </div>

          {/* FREE */}
          <div className="card free">
            <h2 className="plan-title sans">
              <span aria-hidden="true">🩶 </span>Free Plan
            </h2>
            <p className="price">$0</p>

            <ul className="features">
              <li><b>3 letters</b> with encryption</li>
              <li><b>Date-based</b> delivery</li>
              <li><b>Client-side AES-256</b> encryption</li>
            </ul>

            <div className="cta-wrap">
              <Link href="#" className="btn btn-compact">Continue Free</Link>
            </div>
          </div>

          {/* LIFETIME */}
          <div className="card lifetime">
            <h2 className="plan-title serif">
              <span aria-hidden="true">✨ </span>Lifetime Plan
            </h2>
            <p className="price">$15 (one-time)</p>

            <ul className="features">
              <li><b>All Premium</b> features</li>
              <li><b>One-time</b> lifetime access</li>
              <li><b>Priority</b> legacy support</li>
            </ul>

            <div className="cta-wrap">
              <Link href="#" className="btn btn-compact">Buy Lifetime</Link>
            </div>
          </div>
        </div>

        <div className="hr" />

        {/* KPIs */}
        <section className="kpis" aria-label="Vault Snapshot">
          <div className="kpi"><b>12,842</b><span>Messages stored</span></div>
          <div className="kpi"><b>3,427</b><span>Time capsules</span></div>
          <div className="kpi"><b>529</b><span>Delivered letters</span></div>
        </section>

        {/* Tri mini-cards */}
        <section className="tri">
          <div className="mini-card">
            <div className="mini-hd">Memory Sparks</div>
            <p className="mini-txt">“A letter takes five minutes, but it may live for decades.”</p>
            <p className="mini-sub">People vanish. Words remain.</p>
          </div>

          <div className="mini-card">
            <div className="mini-hd">Inspiration</div>
            <p className="mini-txt">Write one sentence your future self needs to hear.</p>

            {/* 🔁 Write Now: yeni sekmede /dashboard/compose aç */}
            <Link
              href="/dashboard/compose"
              target="_blank"
              rel="noopener noreferrer"
              className="mini-btn"
            >
              Write Now
            </Link>
          </div>

          <div className="mini-card">
            <div className="mini-hd">Heartbeat</div>
            <p className="mini-txt">Monthly email ping keeps your vault “alive”.</p>
            <button className="mini-btn solid" onClick={() => setHbOpen(true)}>
              Renew Heartbeat
            </button>
            <small className="mini-sub">Premium feature</small>
          </div>
        </section>

        {/* Timeline */}
        <section className="timeline">
          <div className="tl-hd">
            <h3>Journey Timeline</h3>
            <Link className="tiny-link" href="/dashboard/vault">See all →</Link>
          </div>

          <div className="tl-list">
            <div className="node">
              <span className="dot ok" />
              <div className="node-body">
                <div className="node-top">
                  <span className="n-title">Letter to Mom</span>
                  <span className="pill ok">Delivered</span>
                </div>
                <div className="muted">Aug 12, 2025</div>
              </div>
            </div>

            <div className="node">
              <span className="dot wait" />
              <div className="node-body">
                <div className="node-top">
                  <span className="n-title">18th Birthday Letter</span>
                  <span className="pill wait">Scheduled</span>
                </div>
                <div className="muted">Jan 03, 2033</div>
              </div>
            </div>

            <div className="node">
              <span className="dot draft" />
              <div className="node-body">
                <div className="node-top">
                  <span className="n-title">Message to Future Me</span>
                  <span className="pill draft">Draft</span>
                </div>
                <div className="muted">—</div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Compose Modal (demo) — kalsın, ama artık buton bunu açmıyor */}
      {open && (
        <div className="overlay" role="dialog" aria-modal="true" aria-label="Write Letter">
          <div className="modal">
            <div className="modal-hd">
              <h4>New Letter</h4>
              <button className="close" onClick={() => setOpen(false)}>Close</button>
            </div>

            <div className="form">
              <label>Title</label>
              <input value={title} onChange={(e)=>setTitle(e.target.value)} placeholder="E.g., Letter to Mom" />

              <label>Recipient Email</label>
              <input value={to} onChange={(e)=>setTo(e.target.value)} placeholder="name@example.com" />

              <label>Unlock Date</label>
              <input type="date" value={date} onChange={(e)=>setDate(e.target.value)} />

              <label>Message</label>
              <textarea rows={6} value={content} onChange={(e)=>setContent(e.target.value)} placeholder="Write your words…" />

              <button
                className="mini-btn solid full"
                onClick={()=>{
                  setOpen(false);
                  alert("Draft saved locally (demo). V1: client-side AES + Supabase.");
                }}
              >
                Encrypt & Save (Demo)
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Heartbeat Confirm (küçük, sade) */}
      {hbOpen && (
        <div className="overlay hb" role="dialog" aria-modal="true" aria-label="Renew Heartbeat">
          <div className="hb-modal">
            <div className="hb-title">Renew heartbeat?</div>
            <p className="hb-text">
              You’re about to renew your heartbeat. This will reset your <b>35-day</b> timer.
              Continue?
            </p>
            <div className="hb-actions">
              <button className="mini-btn" disabled={hbBusy} onClick={()=>setHbOpen(false)}>Cancel</button>
              <button className="mini-btn solid" disabled={hbBusy} onClick={handleRenewHeartbeat}>
                {hbBusy ? "Renewing…" : "Yes, reset"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Mini toast */}
      {toast && <div className="toast">{toast}</div>}

      {/* Fonts (global) */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=Inter:wght@400;700;800;900&display=swap');
        html, body, * { font-family: Inter, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica, Arial, "Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol", sans-serif; }
      `}</style>

      <style jsx>{`
        .wrap{
          min-height:100vh; background:#000; color:#fff;
          display:flex; justify-content:center; align-items:flex-start;
          padding:48px 24px;
        }

        .outer{
          position:relative; background:#000; border:none; border-radius:22px;
          max-width:1180px; width:100%;
          padding:56px 28px 44px; text-align:center;
          box-shadow:0 0 32px rgba(255,255,255,0.06);
          overflow:hidden;
          isolation:isolate;
        }

        /* === BACKGROUND FX === */
        .bgfx{
          position:absolute; inset:-10%; z-index:0; pointer-events:none;
        }
        .bgfx::before{
          content:""; position:absolute; inset:0;
          background:
            radial-gradient(35% 45% at 8% 12%, rgba(108,99,255,.18), transparent 60%),
            radial-gradient(40% 45% at 92% 10%, rgba(242,201,76,.15), transparent 60%),
            radial-gradient(35% 50% at 12% 88%, rgba(242,201,76,.12), transparent 60%),
            radial-gradient(45% 55% at 88% 86%, rgba(108,99,255,.16), transparent 60%),
            radial-gradient(25% 30% at 50% 20%, rgba(140,130,255,.10), transparent 65%),
            radial-gradient(30% 35% at 50% 80%, rgba(210,180,80,.08), transparent 65%);
          filter: blur(24px) saturate(120%);
          animation: meshShift 22s ease-in-out infinite alternate,
                     meshDrift 38s ease-in-out infinite;
        }
        .bgfx::after{
          content:""; position:absolute; inset:-50%;
          background:
            conic-gradient(from 0deg at 50% 50%,
              rgba(255,255,255,.02) 0 10%,
              rgba(0,0,0,0) 10% 20%,
              rgba(255,255,255,.02) 20% 30%,
              rgba(0,0,0,0) 30% 40%,
              rgba(255,255,255,.02) 40% 50%,
              rgba(0,0,0,0) 50% 60%,
              rgba(255,255,255,.02) 60% 70%,
              rgba(0,0,0,0) 70% 80%,
              rgba(255,255,255,.02) 80% 90%,
              rgba(0,0,0,0) 90% 100%),
            linear-gradient(0deg, rgba(255,255,255,.015), rgba(255,255,255,.015));
          mix-blend-mode: screen;
          opacity:.35;
          transform:rotate(0deg) scale(1.1);
          animation: grainSpin 120s linear infinite;
        }

        @keyframes meshShift{
          0%   { filter: blur(22px) saturate(115%); }
          50%  { filter: blur(26px) saturate(130%); }
          100% { filter: blur(24px) saturate(120%); }
        }
        @keyframes meshDrift{
          0% {
            background-position:
              8% 12%, 92% 10%, 12% 88%, 88% 86%, 50% 20%, 50% 80%;
          }
          100% {
            background-position:
              14% 16%, 86% 12%, 16% 82%, 84% 84%, 48% 24%, 52% 76%;
          }
        }
        @keyframes grainSpin{
          0% { transform: rotate(0deg) scale(1.1); }
          100% { transform: rotate(360deg) scale(1.1); }
        }

        .topbar{ display:flex; justify-content:space-between; align-items:center; margin-bottom:12px; position:relative; z-index:1; }
        .brand{ display:inline-flex; align-items:center; gap:10px; text-decoration:none; }

        .title{ font-size:30px; margin:10px 0 28px; font-weight:900; letter-spacing:.2px; position:relative; z-index:1; }

        .plans{
          display:grid; grid-template-columns:repeat(3,1fr); gap:24px;
          align-items:stretch; position:relative; z-index:1;
        }

        .card{
          position:relative; border:2px solid #fff; border-radius:18px;
          padding:24px 20px 28px;
          display:flex; flex-direction:column; align-items:center; text-align:center;
          transition:transform .2s ease, box-shadow .2s ease, border-color .2s, filter .2s;
          overflow:visible;
          min-height: 380px;
          --accent:#ffffff;
          --accentGlow: rgba(255,255,255,.35);
          z-index:1;
          backdrop-filter: saturate(120%) contrast(105%);
        }
        .card:hover{ transform:translateY(-6px); box-shadow:0 10px 26px rgba(255,255,255,.12); border-color:#eaeaea; filter:saturate(1.04) }

        .serif{ font-family: "DM Serif Display", serif; font-weight:400; }
        .sans{ font-family: Inter, system-ui, sans-serif; font-weight:900; }

        .plan-title{
          display:inline-block;
          margin:0 0 10px;
          padding:6px 14px;
          border:2px solid rgba(255,255,255,.92);
          border-radius:12px;
          background:rgba(255,255,255,.08);
          box-shadow:0 2px 10px rgba(255,255,255,.10), inset 0 0 0 1px rgba(255,255,255,.06);
          letter-spacing:.2px;
        }

        .card h2{ font-size:24px }
        .price{ font-size:21px; margin:0 0 12px }

        /* ÖZELLİKLER (çarpıcı nokta simgesi) */
        ul.features{ list-style:none; margin:0; padding:0; display:grid; gap:10px; width:100%; }
        ul.features li{
          position:relative; padding-left:38px; font-size:18px; opacity:.98; text-align:left;
        }
        ul.features li::before{
          content:""; position:absolute; left:8px; top:6px;
          width:16px; height:16px; border-radius:50%;
          background: var(--accent);
          box-shadow: 0 0 0 5px var(--accentGlow), 0 0 24px var(--accent), inset 0 0 6px rgba(0,0,0,.4);
          transition: transform .15s ease, box-shadow .2s ease;
        }
        .card:hover ul.features li::before{
          transform:scale(1.08);
          box-shadow: 0 0 0 6px var(--accentGlow), 0 0 28px var(--accent), inset 0 0 7px rgba(0,0,0,.45);
        }

        /* CTA — kompakt ve tabanda aynı hiza */
        .cta-wrap{ margin-top:auto; width:100%; display:flex; justify-content:center; }
        .btn{
          background:#fff; color:#000; text-decoration:none;
          padding:11px 16px; border-radius:12px; font-weight:900;
          transition:filter .15s, transform .15s;
        }
        .btn:hover{ filter:brightness(.92); transform:translateY(-1px) }
        .btn-compact{ display:inline-block; }

        /* Zemin + accent */
        .premium{
          background: linear-gradient(160deg, #2b205a 0%, #4a3fb3 100%);
          --accent:#9b8dff;
          --accentGlow: rgba(108, 99, 255, .28);
        }
        .free{
          background: linear-gradient(160deg, #0f1014 0%, #1b1c22 100%);
          --accent:#e8e8e8;
          --accentGlow: rgba(255,255,255,.20);
        }
        .lifetime{
          background: linear-gradient(160deg, #6e5a09 0%, #a67a00 100%);
          --accent:#f2c94c;
          --accentGlow: rgba(242,201,76,.30);
        }

        /* Kurdela */
        .corner-ribbon{
          position:absolute; top:10px; left:-34px; z-index:3; transform:rotate(-45deg); pointer-events:none;
        }
        .corner-ribbon > span{
          display:inline-block; background:#ffffff; color:#000;
          font-weight:900; text-transform:uppercase; letter-spacing:.35px; font-size:12px;
          padding:5px 18px; box-shadow:0 4px 12px rgba(255,255,255,.18); position:relative;
        }
        .corner-ribbon > span::before,
        .corner-ribbon > span::after{
          content:""; position:absolute; top:0; bottom:0; width:0; height:0;
          border-top:11px solid transparent; border-bottom:11px solid transparent;
        }
        .corner-ribbon > span::before{ left:-11px; border-right:11px solid #ffffff; }
        .corner-ribbon > span::after{ right:-11px; border-left:11px solid #ffffff; }

        .hr{ height:1px; background:rgba(255,255,255,.15); margin:28px 0; border-radius:999px }

        /* KPIs */
        .kpis{ display:grid; grid-template-columns:repeat(3,1fr); gap:16px; text-align:center; margin-bottom:8px; position:relative; z-index:1; }
        .kpi{ background:#0c0c0c; border:1px solid rgba(255,255,255,.14); border-radius:14px; padding:16px; transition:.2s; }
        .kpi:hover{ transform:translateY(-3px); box-shadow:0 0 22px rgba(255,255,255,.08) }
        .kpi b{ display:block; font-size:22px }
        .kpi span{ opacity:.9 }

        /* Tri cards */
        .tri{ display:grid; grid-template-columns:repeat(3,1fr); gap:16px; margin-top:16px; position:relative; z-index:1; }
        .mini-card{ background:#0c0c0c; border:1px solid rgba(255,255,255,.14); border-radius:14px; padding:16px; text-align:left; display:grid; gap:8px; transition:.2s; }
        .mini-card:hover{ transform:translateY(-3px); box-shadow:0 0 22px rgba(255,255,255,.08) }
        .mini-hd{ font-weight:900; letter-spacing:.2px }
        .mini-txt{ opacity:.96 }
        .mini-sub{ opacity:.7 }
        .mini-btn{ appearance:none; border:1px solid rgba(255,255,255,.2); background:#111; color:#fff; border-radius:10px; padding:10px 12px; font-weight:800; cursor:pointer; transition:.15s; }
        .mini-btn.solid{ background:#fff; color:#000; border-color:#fff }
        .mini-btn:hover{ transform:translateY(-1px) }
        .mini-btn.full{ width:100% }

        /* Timeline */
        .timeline{ margin-top:20px; text-align:left; position:relative; z-index:1; }
        .tl-hd{ display:flex; justify-content:space-between; align-items:center; margin-bottom:8px }
        .tl-hd h3{ margin:0; font-size:19px }
        .tiny-link{ font-size:14px; opacity:.9 }
        .tl-list{ display:grid; gap:10px }
        .node{ display:flex; gap:12px; align-items:flex-start; background:#0b0b0b; border:1px solid rgba(255,255,255,.14); border-radius:12px; padding:12px 14px; }
        .dot{ width:10px; height:10px; border-radius:50% }
        .dot.ok{ background:#9affc0 } .dot.wait{ background:#ffe08a } .dot.draft{ background:#b8b8b8 }
        .node-top{ display:flex; gap:8px; align-items:center }
        .n-title{ font-weight:800 }
        .pill{ border:1px solid rgba(255,255,255,.2); border-radius:999px; padding:2px 8px; font-size:12px; opacity:.95 }
        .pill.ok{ background:rgba(154,255,192,.12); border-color:rgba(154,255,192,.25) }
        .pill.wait{ background:rgba(255,224,138,.12); border-color:rgba(255,255,224,.25) }
        .pill.draft{ background:rgba(184,184,184,.12); border-color:rgba(184,184,184,.25) }

        /* Responsive */
        @media (max-width:900px){
          .wrap{ padding:28px 16px; }
          .outer{ padding:36px 16px 28px; max-width:100%; }
          .plans{ grid-template-columns:1fr; gap:16px }
          .kpis{ grid-template-columns:1fr }
          .tri{ grid-template-columns:1fr }
          .corner-ribbon{ left:-38px; top:8px; }
          .bgfx::after{ opacity:.3; }
        }
      `}</style>
    </main>
  );
}
