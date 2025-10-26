"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/lib/supabaseClient";

/**
 * After.Me — Premium Dashboard (separate route, does NOT touch /dashboard)
 * - Purple/blue premium gradient
 * - Gold shimmer for Lifetime
 * - Diagonal "Most Chosen" ribbon on Premium
 * - Hover glow, clean typography (title 28–32px, plan 25px, features 18px)
 * - Prices (UPDATED): Premium $2/mo, Lifetime $15 one-time
 */

export default function PremiumDashboardPage() {
  const [ready, setReady] = useState(true); // İstersen auth guard'ı aç
  // Auth guard istersen aç:
  // useEffect(() => {
  //   let cancel = false;
  //   (async () => {
  //     const { data } = await supabase.auth.getUser();
  //     if (!cancel) {
  //       if (!data.user) window.location.replace("/login?redirectTo=/dashboard/premium");
  //       else setReady(true);
  //     }
  //   })();
  //   return () => { cancel = true; };
  // }, []);

  if (!ready) {
    return <main className="shell"><div className="loading">Loading…</div></main>;
  }

  return (
    <main className="shell">
      {/* HERO */}
      <motion.section
        className="hero"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
      >
        <div className="container hero-in">
          <Link href="/" className="brand" title="Back to Home">
            <img src="/logo.svg" width={26} height={26} alt="After.Me" />
            <span>After.Me</span>
          </Link>

          <h1 className="title">Your Premium Vault</h1>
          <p className="sub">Quiet luxury, zero-knowledge, future delivery.</p>

          <div className="cta">
            <Link href="/dashboard" className="btn ghost">Back to Classic</Link>
            <Link href="#plans" className="btn solid">See Plans</Link>
          </div>
        </div>
      </motion.section>

      {/* PLANS */}
      <section id="plans" className="section">
        <div className="container plans-3">
          {/* PREMIUM — Most Chosen */}
          <PlanCard
            variant="premium"
            ribbon="Most Chosen"
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

          {/* FREE */}
          <PlanCard
            variant="free"
            title="Free"
            price="$0"
            features={[
              "3 letters",
              "Client-side encryption",
              "Date-based delivery",
            ]}
            cta="Continue Free"
            href="/dashboard/upgrade?plan=free"
          />

          {/* LIFETIME — Gold shimmer */}
          <PlanCard
            variant="lifetime"
            title="Lifetime"
            price="$15 one-time"
            features={[
              "All Premium features",
              "Priority legacy support",
              "One-time payment",
            ]}
            cta="Buy Lifetime"
            href="/dashboard/upgrade?plan=lifetime"
          />
        </div>
      </section>

      {/* STYLES */}
      <style jsx>{`
        /* ---------- Tokens ---------- */
        :root{
          --bg:#07060c;         /* koyu morumsu-siyah */
          --fg:#f6f6f9;
          --muted:#cfcfe6;
          --card:#0d0c14;
          --border:#1b1930;
          --glow:0 0 24px rgba(255,255,255,.07), 0 0 1px rgba(255,255,255,.18) inset;

          /* Premium gradients */
          --grad-premium: linear-gradient(160deg, #6C63FF 0%, #8A7CFF 100%);
          --grad-free: linear-gradient(160deg, #181826 0%, #24243a 100%);
          --grad-lifetime: linear-gradient(160deg, #F2C94C 0%, #F9E79F 100%);
        }

        body{ background:var(--bg); color:var(--fg); }
        .container{ max-width:1100px; margin:0 auto; padding:0 20px; }

        /* ---------- Hero ---------- */
        .hero{
          padding:56px 0 32px;
          position:relative;
          background:
            radial-gradient(60% 50% at 50% 0%, rgba(138,124,255,.15), transparent 65%),
            radial-gradient(30% 25% at 15% 0%, rgba(108,99,255,.18), transparent 60%);
          border-bottom:1px solid rgba(255,255,255,.06);
        }
        .hero-in{ display:grid; gap:12px; place-items:center; text-align:center; }
        .brand{ display:inline-flex; align-items:center; gap:10px; color:#fff; opacity:.95; text-decoration:none; }
        .title{ font-size:32px; line-height:1.18; margin:6px 0 0; letter-spacing:.2px; }
        .sub{ color:var(--muted); margin:0; }
        .cta{ margin-top:10px; display:flex; gap:10px; flex-wrap:wrap; justify-content:center; }
        .btn{ border-radius:12px; padding:12px 16px; font-weight:800; letter-spacing:.2px; transition:.18s }
        .btn.solid{ background:#fff; color:#09090b }
        .btn.ghost{ border:1px solid #343455; color:#fff; background:#0c0c18 }

        /* ---------- Section ---------- */
        .section{ padding:36px 0 44px; }

        /* ---------- Plans Row ---------- */
        .plans-3{
          display:grid;
          grid-template-columns:repeat(3,1fr);
          gap:16px;
          align-items:stretch;
        }
        .plan{
          position:relative;
          border-radius:18px;
          padding:20px 18px;
          border:1px solid var(--border);
          background:var(--card);
          box-shadow:0 0 16px rgba(255,255,255,.05);
          transition:transform .25s, box-shadow .25s, filter .25s;
          display:grid; gap:12px;
        }
        .plan:hover{
          transform:translateY(-5px);
          box-shadow:0 0 30px rgba(138,124,255,.2);
          filter:saturate(1.06);
        }
        .hdr{ display:flex; justify-content:space-between; align-items:center; }
        .title4{ margin:0; font-weight:800; font-size:25px; letter-spacing:.2px; }
        .price{ font-weight:800; opacity:.96; font-size:22px; }

        ul{ margin:0; padding-left:18px; color:#e9e9ff; display:grid; gap:6px; }
        li{ font-size:18px; }

        .cta-row{ display:flex; gap:10px; flex-wrap:wrap; }
        .btn.small{ padding:10px 14px; border-radius:10px; font-weight:800; }
        .ghost{ border:1px solid rgba(255,255,255,.18); color:#fff; background:#101022; }
        .solid{ background:#fff; color:#111; }

        /* Variants */
        .premium{
          background:var(--grad-premium);
          color:#0b0b0b;
          border-color:rgba(255,255,255,.22);
        }
        .premium .ghost{ border-color:rgba(0,0,0,.28); color:#0b0b0b; background:rgba(255,255,255,.72); }
        .premium .solid{ background:#0b0b0b; color:#fff; }

        .free{
          background:var(--grad-free);
        }

        .lifetime{
          background:var(--grad-lifetime);
          color:#0b0b0b;
          border-color:rgba(0,0,0,.15);
          overflow:hidden;
        }
        .lifetime:before{
          content:"";
          position:absolute; inset:0;
          background: linear-gradient(110deg, transparent 0%, rgba(255,255,255,.38) 20%, transparent 43%);
          transform: translateX(-120%);
          animation: shimmer 3.2s ease-in-out infinite;
        }
        @keyframes shimmer{
          0%{ transform: translateX(-120%) }
          60%{ transform: translateX(120%) }
          100%{ transform: translateX(120%) }
        }

        /* Ribbon — diagonal */
        .ribbon{
          position:absolute;
          top:16px;
          left:-44px;
          transform:rotate(-45deg);
          background:rgba(11,11,11,.9);
          color:#fff;
          padding:6px 66px;
          font-size:13px;
          font-weight:900;
          letter-spacing:.4px;
          border:1px solid rgba(255,255,255,.28);
          box-shadow:var(--glow);
          text-transform:uppercase;
        }

        /* Responsive */
        @media (max-width: 960px){
          .plans-3{ grid-template-columns:1fr; }
        }
      `}</style>
    </main>
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
  ribbon,
}: {
  variant: "premium" | "free" | "lifetime";
  title: string;
  price: string;
  features: string[];
  cta: string;
  href: string;
  ribbon?: string;
}) {
  return (
    <div className={`plan ${variant}`}>
      {ribbon && <div className="ribbon">{ribbon}</div>}

      <div className="hdr">
        <h4 className="title4">{title}</h4>
        <div className="price">{price}</div>
      </div>

      <ul>{features.map((f, i) => <li key={i}>{f}</li>)}</ul>

      <div className="cta-row">
        <Link className="btn solid small" href={href}>{cta}</Link>
        {variant !== "free" && (
          <Link className="btn ghost small" href="/dashboard/plan">Details</Link>
        )}
      </div>
    </div>
  );
}
