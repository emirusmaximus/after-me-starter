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
  const [ready, setReady] = useState(false);
  const [username, setUsername] = useState<string>("emir");

  useEffect(() => {
    let cancel = false;
    (async () => {
      const { data } = await supabase.auth.getUser();
      if (!cancel) {
        if (!data.user) {
          window.location.replace("/login?redirectTo=/dashboard");
        } else {
          setReady(true);
        }
      }
    })();
    return () => {
      cancel = true;
    };
  }, []);

  const [menuOpen, setMenuOpen] = useState(false);
  const [composeOpen, setComposeOpen] = useState(false);

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
      <main style={{ padding: "24px" }}>
        <div style={{ opacity: 0.8 }}>Loading your vault…</div>
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
              {badges.map((b) => (
                <span
                  key={b.id}
                  className={`badge ${b.done ? "ok" : "dim"}`}
                  title={b.label}
                >
                  <span aria-hidden>{b.icon}</span>
                </span>
              ))}
            </div>
            <button
              className="hamburger"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Menu"
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </div>
      </header>

      {/* Menu */}
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
              <button
                onClick={() => {
                  setComposeOpen(true);
                  setMenuOpen(false);
                }}
              >
                ✉️ Write a Letter
              </button>
              <Link href="/dashboard/vault" onClick={() => setMenuOpen(false)}>
                📜 My Vault
              </Link>
              <Link href="/dashboard/plan" onClick={() => setMenuOpen(false)}>
                💳 Manage Plan
              </Link>
              <Link href="/dashboard/progress" onClick={() => setMenuOpen(false)}>
                📊 Legacy Progress
              </Link>
              <Link href="/settings" onClick={() => setMenuOpen(false)}>
                ⚙️ Settings
              </Link>
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
          <div className="eyebrow">
            <span className="dot" /> Your private legacy workspace
          </div>
          <h1 className="title">Welcome back, @{username}</h1>
          <p className="subtitle">
            You have <b>{vaultStats.letters}</b> letters in your vault —{" "}
            <b>{vaultStats.scheduled}</b> waiting and{" "}
            <b>{vaultStats.delivered}</b> delivered.
          </p>

          <div className="cta">
            <button className="btn solid lg" onClick={() => setComposeOpen(true)}>
              Write Letter ✍️
            </button>
            <Link className="btn ghost lg" href="/dashboard/plan">
              Upgrade Plan 💎
            </Link>
          </div>

          <div className="progress-wrap">
            <div className="progress">
              <span style={{ width: "40%" }} />
            </div>
            <small className="muted">
              Vault Progress: 40% — add a trusted contact to improve your legacy
              health.
            </small>
          </div>
        </div>
      </motion.section>

      {/* Plans Row */}
      <section className="section">
        <div className="container plans-3">
          <PlanCard
            variant="premium"
            mostChosen
            title="Premium"
            price="$2/mo"
            features={[
              "Unlimited letters",
              "Trusted contacts (quorum)",
              "Inactivity trigger (heartbeat)",
            ]}
            cta="Upgrade Now"
            href="/dashboard/upgrade?plan=premium"
          />

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

          <PlanCard
            variant="lifetime"
            title="Lifetime"
            price="$15"
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

      {/* Compose Modal */}
      <ComposeModal open={composeOpen} onClose={() => setComposeOpen(false)} />

      <style jsx>{`
        :root {
          --bg: #050505;
          --fg: #f5f5f5;
          --muted: #c7c7c7;
          --card: #0b0b0b;
          --border: #1a1a1a;
          --glow: 0 0 24px rgba(255, 255, 255, 0.06),
            0 0 1px rgba(255, 255, 255, 0.25) inset;
        }
        body {
          background: var(--bg);
          color: var(--fg);
        }
        .container {
          max-width: 1100px;
          margin: 0 auto;
          padding: 0 20px;
        }
        .section {
          padding: 32px 0;
        }
        .plans-3 {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
          align-items: stretch;
        }
        .plan {
          position: relative;
          border-radius: 18px;
          padding: 18px;
          border: 1px solid var(--border);
          background: var(--card);
          display: grid;
          gap: 12px;
          box-shadow: 0 0 16px rgba(255, 255, 255, 0.04);
          transition: 0.25s;
        }
        .plan:hover {
          transform: translateY(-4px);
          box-shadow: 0 0 26px rgba(255, 255, 255, 0.08);
        }

        /* --- Yeni Plan Bandı + Ribbon + Fontlar --- */
        .plan .hdr .title {
          font-size: 25px;
          line-height: 1.1;
          font-weight: 800;
          margin: 0;
        }
        .plan .hdr .price {
          font-size: 25px;
          font-weight: 800;
          opacity: 0.95;
        }
        .plan ul li {
          font-size: 22px;
          line-height: 1.25;
        }
        .plan .cta-row .btn {
          font-size: 22px;
          padding: 12px 16px;
        }
        .band {
          position: relative;
          border-radius: 14px;
          padding: 16px;
          background: repeating-linear-gradient(
            90deg,
            #db5fa3 0 120px,
            #0a0a0a 120px 140px
          );
          border: 1px solid rgba(255, 255, 255, 0.15);
          box-shadow: inset 0 0 1px rgba(255, 255, 255, 0.25);
        }
        .band .hdr {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 8px;
        }
        .ribbon {
          position: absolute;
          top: 12px;
          left: -44px;
          transform: rotate(-24deg);
          transform-origin: left top;
          background: rgba(11, 11, 11, 0.9);
          color: #fff;
          padding: 6px 48px;
          letter-spacing: 0.2px;
          font-weight: 800;
          border: 1px solid rgba(255, 255, 255, 0.28);
          box-shadow: 0 6px 16px rgba(0, 0, 0, 0.45), var(--glow);
        }
        .premium .band {
          border-color: rgba(0, 0, 0, 0.25);
        }
        .free .band {
          border-color: #2a2a2a;
        }
        .lifetime .band {
          border-color: rgba(0, 0, 0, 0.2);
        }
        /* --- Son --- */

        @media (max-width: 960px) {
          .plans-3 {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </>
  );
}

/* ---------- Components ---------- */
function PlanCard({
  variant,
  title,
  price,
  features,
  cta,
  href,
  mostChosen = false,
  active = false,
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
    <div className={`plan ${variant} ${active ? "current" : ""}`}>
      {mostChosen && <div className="ribbon">Most Chosen</div>}
      <div className="band">
        <div className="hdr">
          <h4 className="title">{title}</h4>
          <div className="price">{price}</div>
        </div>
        <ul>
          {features.map((f, i) => (
            <li key={i}>{f}</li>
          ))}
        </ul>
        <div className="cta-row">
          <Link className="btn solid" href={href}>
            {cta}
          </Link>
          {variant !== "free" && (
            <Link className="btn ghost" href="/dashboard/plan">
              Details
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

/* Compose modal (demo) */
function ComposeModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
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
              <h3 style={{ margin: 0 }}>New Letter</h3>
              <button className="ghost" onClick={onClose}>
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
                placeholder="Write your words here..."
              />
              <button
                className="btn solid full"
                onClick={() => {
                  onClose();
                  alert(
                    "Draft saved locally (demo). Next step: client-side AES + Supabase."
                  );
                }}
              >
                Encrypt & Save (Demo)
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
