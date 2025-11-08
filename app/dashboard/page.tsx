"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function InverseDashboard() {
  // Compose (demo)
  const [open, setOpen] = useState(false);

  // Heartbeat modal
  const [hbOpen, setHbOpen] = useState(false);
  const [hbBusy, setHbBusy] = useState(false);

  // Mini toast
  const [toast, setToast] = useState<string | null>(null);

  // Compose form demo state
  const [title, setTitle] = useState("");
  const [to, setTo] = useState("");
  const [date, setDate] = useState("");
  const [content, setContent] = useState("");

  // Heartbeat: profiles.last_heartbeat_at güncelle
  async function handleRenewHeartbeat() {
    try {
      setHbBusy(true);
      const {
        data: { user },
        error: uErr,
      } = await supabase.auth.getUser();
      if (uErr) throw uErr;
      if (!user) throw new Error("Not signed in.");

      const nowIso = new Date().toISOString();
      const { error: upErr } = await supabase
        .from("profiles")
        .upsert({ id: user.id, last_heartbeat_at: nowIso }, { onConflict: "id" });

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

  // Modal(lar) açıkken body scroll kilidi
  useEffect(() => {
    if (!hbOpen && !open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [hbOpen, open]);

  return (
    <main className="wrap">
      <div className="outer">
        {/* === BACKGROUND FX === */}
        <div className="bgfx" aria-hidden="true" />

        {/* Topbar */}
        <div className="topbar">
          <Link href="/" className="brand" aria-label="After.Me — Home">
            <img src="/logo.svg" width={36} height={36} alt="After.Me" />
          </Link>
        </div>

        <h1 className="title">Choose Your Plan</h1>

        {/* === Plans === */}
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
              <li>
                <b>Unlimited</b> encrypted letters
              </li>
              <li>
                <b>Trusted contacts</b> (2-of-N quorum)
              </li>
              <li>
                <b>Inactivity + heartbeat</b> triggers
              </li>
            </ul>

            <div className="cta-wrap">
              <Link href="#" className="btn btn-compact">
                Upgrade Now
              </Link>
            </div>
          </div>

          {/* FREE */}
          <div className="card free">
            <h2 className="plan-title sans">
              <span aria-hidden="true">🩶 </span>Free Plan
            </h2>
            <p className="price">$0</p>

            <ul className="features">
              <li>
                <b>3 letters</b> with encryption
              </li>
              <li>
                <b>Date-based</b> delivery
              </li>
              <li>
                <b>Client-side AES-256</b> encryption
              </li>
            </ul>

            <div className="cta-wrap">
              <Link href="#" className="btn btn-compact">
                Continue Free
              </Link>
            </div>
          </div>

          {/* LIFETIME */}
          <div className="card lifetime">
            <h2 className="plan-title serif">
              <span aria-hidden="true">✨ </span>Lifetime Plan
            </h2>
            <p className="price">$15 (one-time)</p>

            <ul className="features">
              <li>
                <b>All Premium</b> features
              </li>
              <li>
                <b>One-time</b> lifetime access
              </li>
              <li>
                <b>Priority</b> legacy support
              </li>
            </ul>

            <div className="cta-wrap">
              <Link href="#" className="btn btn-compact">
                Buy Lifetime
              </Link>
            </div>
          </div>
        </div>

        <div className="hr" />

        {/* === KPIs === */}
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

        {/* === Tri mini-cards === */}
        <section className="tri">
          <div className="mini-card">
            <div className="mini-hd">Memory Sparks</div>
            <p className="mini-txt">
              “A letter takes five minutes, but it may live for decades.”
            </p>
            <p className="mini-sub">People vanish. Words remain.</p>
          </div>

          <div className="mini-card">
            <div className="mini-hd">Inspiration</div>
            <p className="mini-txt">
              Write one sentence your future self needs to hear.
            </p>

            {/* Şu an yeni sekmede açılıyor; istersen SPA geçişe çeviririz */}
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
            <p className="mini-txt">
              Monthly email ping keeps your vault “alive”.
            </p>
            <button className="mini-btn solid" onClick={() => setHbOpen(true)}>
              Renew Heartbeat
            </button>
            <small className="mini-sub">Premium feature</small>
          </div>
        </section>

        {/* === Timeline === */}
        <section className="timeline">
          <div className="tl-hd">
            <h3>Journey Timeline</h3>
            <Link className="tiny-link" href="/dashboard/vault">
              See all →
            </Link>
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

      {/* === Compose Modal (demo) === */}
      {open && (
        <div className="overlay" role="dialog" aria-modal="true" aria-label="Write Letter">
          <div className="modal">
            <div className="modal-hd">
              <h4>New Letter</h4>
              <button className="close" onClick={() => setOpen(false)}>
                Close
              </button>
            </div>

            <div className="form">
              <label>Title</label>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="E.g., Letter to Mom"
              />

              <label>Recipient Email</label>
              <input
                value={to}
                onChange={(e) => setTo(e.target.value)}
                placeholder="name@example.com"
              />

              <label>Unlock Date</label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />

              <label>Message</label>
              <textarea
                rows={6}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Write your words…"
              />

              <button
                className="mini-btn solid full"
                onClick={() => {
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

      {/* === Heartbeat Modal === */}
      {hbOpen && (
        <div className="overlay hb" role="dialog" aria-modal="true" aria-label="Renew Heartbeat">
          <div className="hb-modal">
            <div className="hb-title">Renew heartbeat?</div>
            <p className="hb-text">
              You’re about to renew your heartbeat. This will reset your <b>35-day</b> timer.
              Continue?
            </p>
            <div className="hb-actions">
              <button className="mini-btn" disabled={hbBusy} onClick={() => setHbOpen(false)}>
                Cancel
              </button>
              <button className="mini-btn solid" disabled={hbBusy} onClick={handleRenewHeartbeat}>
                {hbBusy ? "Renewing…" : "Yes, reset"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* === Toast === */}
      {toast && <div className="toast">{toast}</div>}
    </main>
  );
}
