"use client";
import Link from "next/link";
import { useState } from "react";

export default function InverseDashboard() {
  // Compose modal state
  const [open, setOpen] = useState(false);
  // Hamburger state
  const [menu, setMenu] = useState(false);

  // Form states (demo)
  const [title, setTitle] = useState("");
  const [to, setTo] = useState("");
  const [date, setDate] = useState("");
  const [content, setContent] = useState("");

  return (
    <main className="wrap">
      {/* ---- OUTER: Büyük siyah çerçeve ---- */}
      <div className="outer">
        {/* Top bar: logo + hamburger */}
        <div className="topbar">
          <Link href="/" className="brand" aria-label="After.Me — Home">
            <span className="dot" />
            <span>After.Me</span>
          </Link>

          <button
            className="hamburger"
            aria-label="Menu"
            aria-expanded={menu}
            onClick={() => setMenu((v) => !v)}
          >
            <span /><span /><span />
          </button>

          {menu && (
            <nav className="menu" role="menu" aria-label="Quick actions">
              <button role="menuitem" onClick={() => { setOpen(true); setMenu(false); }}>✍️ Write Letter</button>
              <Link role="menuitem" href="/dashboard/plan" onClick={() => setMenu(false)}>💳 Manage Plan</Link>
              <Link role="menuitem" href="/dashboard/contacts" onClick={() => setMenu(false)}>🔐 Trusted Contacts</Link>
            </nav>
          )}
        </div>

        <h1 className="title">Choose Your Plan</h1>

        {/* ---- PLANS ---- */}
        <div className="plans">
          {/* PREMIUM */}
          <div className="card premium">
            <div className="ribbon">Most Chosen</div>
            <h2>Premium</h2>
            <p className="price">$2 / month</p>
            <ul>
              <li>Unlimited letters</li>
              <li>Trusted contacts (quorum)</li>
              <li>Inactivity trigger (heartbeat)</li>
            </ul>
            <Link href="#" className="btn">Upgrade Now</Link>
          </div>

          {/* FREE */}
          <div className="card free">
            <h2>Free</h2>
            <p className="price">$0</p>
            <ul>
              <li>3 letters</li>
              <li>Client-side encryption</li>
              <li>Date-based delivery</li>
            </ul>
            <Link href="#" className="btn">Continue Free</Link>
          </div>

          {/* LIFETIME */}
          <div className="card lifetime">
            <h2>Lifetime</h2>
            <p className="price">$15 (one-time)</p>
            <ul>
              <li>All Premium features</li>
              <li>Priority legacy support</li>
              <li>One-time payment</li>
            </ul>
            <Link href="#" className="btn">Buy Lifetime</Link>
          </div>
        </div>
        {/* ---- /PLANS ---- */}

        {/* İnce ayraç */}
        <div className="hr" />

        {/* ---- KPI / Snapshot ---- */}
        <section className="kpis" aria-label="Vault Snapshot">
          <div className="kpi">
            <b>12,842</b>
            <span>Messages stored</span>
          </div>
          <div className="kpi">
            <b>3,427</b>
            <span>Time capsules</span>
          </div>
          <div className="kpi">
            <b>529</b>
            <span>Delivered letters</span>
          </div>
        </section>

        {/* ---- 3’lü Kartlar: Memory / Inspiration / Heartbeat ---- */}
        <section className="tri">
          <div className="mini-card">
            <div className="mini-hd">✨ Memory Sparks</div>
            <p className="mini-txt">“A letter takes five minutes, but it may live for decades.”</p>
            <p className="mini-sub">People vanish. Words remain.</p>
          </div>

          <div className="mini-card">
            <div className="mini-hd">💡 Inspiration</div>
            <p className="mini-txt">Write one sentence your future self needs to hear.</p>
            <button className="mini-btn" onClick={() => setOpen(true)}>Write Now</button>
          </div>

          <div className="mini-card">
            <div className="mini-hd">🔁 Heartbeat</div>
            <p className="mini-txt">Monthly email ping keeps your vault “alive”.</p>
            <button className="mini-btn solid">Renew Heartbeat</button>
            <small className="mini-sub">Premium feature</small>
          </div>
        </section>

        {/* ---- Timeline (mini) ---- */}
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

      {/* ---- Compose Modal (basit, client-side demo) ---- */}
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

      {/* ---- Styles ---- */}
      <style jsx>{`
        /* Sayfa zemini siyah, içerik kontrastı yüksek beyaz */
        .wrap{
          min-height:100vh;
          background:#000;
          display:flex;justify-content:center;align-items:center;
          padding:40px 20px;
          color:#fff;
        }

        /* Dış büyük dikdörtgen: siyah zemin, beyaz çerçeve */
        .outer{
          position:relative;
          background:#000;
          border:3px solid #fff;
          border-radius:22px;
          max-width:1100px;width:100%;
          padding:50px 30px 38px;
          text-align:center;
          box-shadow:0 0 32px rgba(255,255,255,0.06);
        }

        /* Topbar (brand + hamburger) */
        .topbar{
          display:flex;justify-content:space-between;align-items:center;margin-bottom:10px;
        }
        .brand{display:inline-flex;align-items:center;gap:10px;color:#fff;text-decoration:none;font-weight:900;letter-spacing:.25px}
        .dot{width:8px;height:8px;border-radius:50%;background:#fff;box-shadow:0 0 10px #fff;display:inline-block}
        .hamburger{
          background:#0f0f0f;border:1px solid rgba(255,255,255,.18);
          border-radius:10px;padding:8px 9px;display:grid;gap:3px;
        }
        .hamburger span{width:20px;height:2px;background:#fff;border-radius:2px}
        .menu{
          position:absolute;top:56px;right:24px;z-index:20;
          background:#0b0b0b;border:1px solid rgba(255,255,255,.18);border-radius:12px;
          padding:8px;display:grid;gap:6px;min-width:220px;text-align:left;
          box-shadow:0 10px 26px rgba(255,255,255,.08);
        }
        .menu a,.menu button{
          color:#fff;text-align:left;background:transparent;border:0;
          padding:10px 10px;border-radius:10px;font-weight:800;letter-spacing:.2px;
        }
        .menu a:hover,.menu button:hover{background:#101010}

        /* Başlık */
        .title{font-size:32px;margin:8px 0 26px;font-weight:900;letter-spacing:.2px}

        /* Planlar grid */
        .plans{display:grid;grid-template-columns:repeat(3,1fr);gap:24px}

        /* Kart iskeleti */
        .card{
          position:relative;
          border:2px solid #fff;
          border-radius:18px;
          padding:24px 20px 28px;
          display:flex;flex-direction:column;align-items:center;text-align:center;
          transition:transform .2s ease, box-shadow .2s ease, border-color .2s, filter .2s;
          overflow:hidden;
        }
        .card:hover{transform:translateY(-6px);box-shadow:0 10px 26px rgba(255,255,255,.12);border-color:#eaeaea;filter:saturate(1.04)}

        .card h2{font-size:25px;font-weight:900;margin:0 0 8px}
        .price{font-size:22px;margin:0 0 14px}
        ul{list-style:none;margin:0 0 20px;padding:0;display:grid;gap:6px}
        li{font-size:18px;opacity:.95}

        /* CTA: zıt renk — beyaz buton, siyah yazı */
        .btn{
          background:#fff;color:#000;text-decoration:none;
          padding:12px 18px;border-radius:12px;font-weight:900;
          transition:filter .15s, transform .15s;
        }
        .btn:hover{filter:brightness(.92);transform:translateY(-1px)}

        /* -------- Premium renkleri (daha “premium” görünüm) -------- */
        .premium{
          /* Derin mor → lacivert degrade */
          background: linear-gradient(160deg, #2b205a 0%, #4a3fb3 100%);
        }

        .free{
          /* Rafine füme degrade */
          background: linear-gradient(160deg, #0f1014 0%, #1b1c22 100%);
        }

        .lifetime{
          /* Koyu altın degrade + shimmer */
          background: linear-gradient(160deg, #6e5a09 0%, #a67a00 100%);
        }
        .lifetime:before{
          content:"";position:absolute;inset:0;
          background:linear-gradient(110deg, transparent 0%, rgba(255,255,255,.15) 20%, transparent 43%);
          transform:translateX(-120%);animation:shimmer 3.2s ease-in-out infinite;
        }
        @keyframes shimmer{
          0%{transform:translateX(-120%)} 60%{transform:translateX(120%)} 100%{transform:translateX(120%)}
        }

        /* -------- ORANTILI RIBBON (diagonal, ortalı) --------
           - Genişlik değişkeni: --ribbon-w
           - Desktop: %80; Mobile: %92
        */
        .card { --ribbon-w: 80%; }
        @media (max-width:900px){ .card { --ribbon-w: 92%; } }

        .ribbon{
          position:absolute;
          top:16px;
          left:50%;
          width:var(--ribbon-w);
          transform:translateX(-50%) rotate(-45deg);
          transform-origin:center;
          background:#fff;color:#000;
          padding:8px 0;
          text-align:center;
          font-size:13px;font-weight:900;letter-spacing:.35px;text-transform:uppercase;
          box-shadow:0 4px 12px rgba(255,255,255,.18);
        }
        /* Köşe bitişlerinde küçük kesik hissi için "notch" */
        .ribbon:before, .ribbon:after{
          content:""; position:absolute; top:0; bottom:0; width:14px; background:#fff;
        }
        .ribbon:before{ left:-14px; }
        .ribbon:after{ right:-14px; }

        /* İnce ayraç */
        .hr{height:1px;background:rgba(255,255,255,.15);margin:28px 0;border-radius:999px}

        /* KPIs */
        .kpis{
          display:grid;
          grid-template-columns:repeat(3,1fr);
          gap:14px;
          text-align:center;
          margin-bottom:8px;
        }
        .kpi{
          background:#0c0c0c;border:1px solid rgba(255,255,255,.14);
          border-radius:14px;padding:16px;transition:.2s;
        }
        .kpi:hover{transform:translateY(-3px);box-shadow:0 0 22px rgba(255,255,255,.08)}
        .kpi b{display:block;font-size:24px}
        .kpi span{opacity:.9}

        /* Tri cards */
        .tri{
          display:grid;grid-template-columns:repeat(3,1fr);gap:14px;margin-top:14px;
        }
        .mini-card{
          background:#0c0c0c;border:1px solid rgba(255,255,255,.14);
          border-radius:14px;padding:16px;text-align:left;display:grid;gap:8px;
          transition:.2s;
        }
        .mini-card:hover{transform:translateY(-3px);box-shadow:0 0 22px rgba(255,255,255,.08)}
        .mini-hd{font-weight:900;letter-spacing:.2px}
        .mini-txt{opacity:.96}
        .mini-sub{opacity:.7}
        .mini-btn{
          appearance:none;border:1px solid rgba(255,255,255,.2);background:#111;color:#fff;
          border-radius:10px;padding:10px 12px;font-weight:800;cursor:pointer;transition:.15s;
        }
        .mini-btn.solid{background:#fff;color:#000;border-color:#fff}
        .mini-btn:hover{transform:translateY(-1px)}
        .mini-btn.full{width:100%}

        /* Timeline */
        .timeline{margin-top:18px;text-align:left}
        .tl-hd{display:flex;justify-content:space-between;align-items:center;margin-bottom:8px}
        .tl-hd h3{margin:0;font-size:20px}
        .tiny-link{font-size:14px;opacity:.9}
        .tl-list{display:grid;gap:10px}
        .node{
          display:flex;gap:12px;align-items:flex-start;
          background:#0b0b0b;border:1px solid rgba(255,255,255,.14);
          border-radius:12px;padding:12px 14px;
        }
        .dot{width:10px;height:10px;border-radius:50%}
        .dot.ok{background:#9affc0}
        .dot.wait{background:#ffe08a}
        .dot.draft{background:#b8b8b8}
        .node-top{display:flex;gap:8px;align-items:center}
        .n-title{font-weight:800}
        .pill{
          border:1px solid rgba(255,255,255,.2);border-radius:999px;padding:2px 8px;
          font-size:12px;opacity:.95
        }
        .pill.ok{background:rgba(154,255,192,.12);border-color:rgba(154,255,192,.25)}
        .pill.wait{background:rgba(255,224,138,.12);border-color:rgba(255,224,138,.25)}
        .pill.draft{background:rgba(184,184,184,.12);border-color:rgba(184,184,184,.25)}
        .muted{opacity:.8}

        /* Erişilebilirlik: küçük ekranda tek sütun */
        @media (max-width:900px){
          .plans{grid-template-columns:1fr}
          .outer{padding:32px 18px}
          .kpis{grid-template-columns:1fr}
          .tri{grid-template-columns:1fr}
        }
      `}</style>
    </main>
  );
}
