"use client";

import Link from "next/link";
import { useMemo } from "react";

export default function DashboardPage() {
  const username = "emir";
  const stats = { letters: 3, waiting: 1, days: 22, progress: 40 };

  const plans = useMemo(
    () => [
      {
        key: "premium",
        title: "Premium",
        price: "$2/mo",
        features: ["Encrypted vault", "Priority support", "Early access"],
        cta: "Upgrade 💎",
        variant: "premium" as const,
        ribbon: "Most Chosen",
      },
      {
        key: "free",
        title: "Free",
        price: "$0",
        features: ["Up to 3 letters", "Basic vault", "Standard support"],
        cta: "Current Plan",
        variant: "free" as const,
      },
      {
        key: "lifetime",
        title: "Lifetime",
        price: "$15",
        features: ["Unlimited messages", "Lifetime storage", "VIP legacy badge"],
        cta: "Unlock ✨",
        variant: "lifetime" as const,
      },
    ],
    []
  );

  return (
    <main className="dashboard">
      {/* HEADER */}
      <header className="top">
        <div className="container topin">
          <Link href="/" className="brand">
            <img src="/logo.svg" width={24} height={24} alt="After.Me" />
            <span>After.Me</span>
          </Link>
          <nav className="nav">
            <Link href="/dashboard">Dashboard</Link>
            <Link href="/settings">Settings</Link>
          </nav>
        </div>
      </header>

      {/* HERO */}
      <section className="hero">
        <div className="container center">
          <p className="muted small">
            Your vault has {stats.letters} letters — {stats.waiting} waiting for delivery.
          </p>
          <h1>Welcome back, @{username}</h1>
          <p className="muted">You haven’t written in {stats.days} days.</p>
          <div className="progress"><span style={{ width: `${stats.progress}%` }} /></div>
          <small className="muted">Vault Progress: {stats.progress}%</small>
        </div>
      </section>

      {/* PLANS */}
      <section className="plans">
        <div className="container center">
          <h2 className="ph-title">Plans</h2>
          <p className="ph-sub">Choose your legacy.</p>
        </div>

        {/* Ortada duran tek dikdörtgen kapsayıcı */}
        <div className="plans-container">
          {plans.map((p) => (
            <PlanCard
              key={p.key}
              title={p.title}
              price={p.price}
              features={p.features}
              button={p.cta}
              variant={p.variant}
              ribbon={p.ribbon}
            />
          ))}
        </div>
      </section>

      <style jsx>{`
        :root{
          --bg:#000; --fg:#fff; --muted:#bbb;
          --free-a:#1A1A1A; --free-b:#2A2A2A;
          --prem-a:#6C63FF; --prem-b:#8A7CFF;
          --life-a:#F2C94C; --life-b:#F9E79F;
        }
        body, .dashboard { background:var(--bg); color:var(--fg); }

        .container{ max-width:1100px; margin:0 auto; padding:0 20px; }
        .top{ border-bottom:1px solid #111; padding:14px 0; background:rgba(0,0,0,.6); backdrop-filter:blur(6px); }
        .topin{ display:flex; align-items:center; justify-content:space-between; }
        .brand{ display:flex; align-items:center; gap:8px; font-weight:800; }

        .hero{ text-align:center; padding:40px 0 20px; }
        .muted{ color:var(--muted); }
        .progress{ width:280px; margin:10px auto; height:6px; border:1px solid #222; background:#050505; }
        .progress span{ display:block; height:100%; background:#fff; }

        .plans{ text-align:center; padding:40px 0 60px; }
        .ph-title{ font-size:28px; margin-bottom:4px; }
        .ph-sub{ color:var(--muted); margin-bottom:20px; }

        /* === Ortadaki büyük kapsayıcı === */
        .plans-container {
          width: 90%;
          max-width: 1000px;
          margin: 0 auto;
          background: #0e0e0e;
          border: 1px solid #222;
          border-radius: 24px;
          padding: 40px;
          display: flex;
          justify-content: center;
          align-items: stretch;
          gap: 24px;
          box-shadow: 0 0 25px rgba(255,255,255,0.05);
        }

        /* Her plan dik duran kutu */
        .plan {
          flex: 1;
          min-width: 260px;
          background: #111;
          border: 1px solid #222;
          border-radius: 16px;
          padding: 24px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          position: relative;
          transition: all 0.25s ease;
        }

        .plan:hover {
          transform: translateY(-5px);
          box-shadow: 0 0 20px rgba(255,255,255,0.1);
        }

        /* Plan tipleri */
        .premium {
          background: linear-gradient(160deg, rgba(108,99,255,0.25), rgba(138,124,255,0.1));
          border-color: rgba(124,118,255,0.35);
        }

        .free {
          background: linear-gradient(160deg, var(--free-a), var(--free-b));
        }

        .lifetime {
          background: linear-gradient(160deg, var(--life-a), var(--life-b));
          color: #241a00;
          border-color: rgba(242,201,76,0.5);
          overflow: hidden;
        }

        .lifetime::after {
          content: "";
          position: absolute;
          top: -20%;
          left: -60%;
          width: 40%;
          height: 140%;
          transform: rotate(20deg);
          background: linear-gradient(90deg, rgba(255,255,255,0), rgba(255,255,255,.45), rgba(255,255,255,0));
          filter: blur(8px);
          animation: shimmer 3s linear infinite;
        }

        @keyframes shimmer {
          0% { left: -60%; }
          100% { left: 130%; }
        }

        /* Ribbon (sadece Premium’da) */
        .ribbon {
          position: absolute;
          top: 16px;
          right: -36px;
          transform: rotate(35deg);
          background: linear-gradient(90deg, var(--prem-a), var(--prem-b));
          color: #fff;
          font-weight: 900;
          font-size: 12px;
          padding: 6px 44px;
          border-radius: 6px;
        }

        .plan h3 { font-size: 14px; text-transform: uppercase; opacity: 0.9; margin: 0 0 6px; }
        .plan .price { font-size: 30px; font-weight: 800; margin-bottom: 12px; }
        .plan ul { list-style: none; padding: 0; margin: 0 0 20px; }
        .plan li { position: relative; padding-left: 18px; margin-bottom: 8px; }
        .plan li::before { content: "✓"; position: absolute; left: 0; top: 0; }
        .plan button {
          border: none;
          border-radius: 12px;
          padding: 12px;
          font-weight: 700;
          cursor: pointer;
        }
        .plan.dark button { background: #1a1a1a; color: #fff; }
        .plan.light button { background: #fff; color: #000; }
      `}</style>
    </main>
  );
}

/* PLAN CARD */
function PlanCard({
  title,
  price,
  features,
  button,
  variant,
  ribbon,
}: {
  title: string;
  price: string;
  features: string[];
  button: string;
  variant: "premium" | "free" | "lifetime";
  ribbon?: string;
}) {
  return (
    <div className={`plan ${variant}`}>
      {ribbon && <div className="ribbon">{ribbon}</div>}
      <div>
        <h3>{title}</h3>
        <div className="price">{price}</div>
        <ul>
          {features.map((f, i) => (
            <li key={i}>{f}</li>
          ))}
        </ul>
      </div>
      <button>{button}</button>
    </div>
  );
}
