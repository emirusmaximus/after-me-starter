"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

export default function DashboardPage() {
  const username = "emir";
  const stats = { letters: 3, waiting: 1, days: 22, progress: 40 };

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

      {/* PLANS SECTION */}
      <section className="plans">
        <div className="container center">
          <h2 className="ph-title">Plans</h2>
          <p className="ph-sub">Choose your legacy.</p>
        </div>

        <div className="container plans-grid">
          <PlanCard
            title="Premium"
            price="$2/mo"
            features={["Encrypted vault", "Priority support", "Early access"]}
            button="Upgrade 💎"
            type="dark"
          />
          <PlanCard
            title="Free"
            price="$0"
            features={["Up to 3 letters", "Basic vault", "Standard support"]}
            button="Current Plan"
            type="light"
          />
          <PlanCard
            title="Lifetime"
            price="$15"
            features={["Unlimited messages", "Lifetime storage", "VIP legacy badge"]}
            button="Unlock ✨"
            type="dark"
          />
        </div>
      </section>

      <style jsx>{`
        :root {
          --bg: #000;
          --fg: #fff;
          --muted: #bbb;
        }
        body, .dashboard { background: var(--bg); color: var(--fg); }

        .container { max-width: 1100px; margin: 0 auto; padding: 0 20px; }
        .top { border-bottom: 1px solid #111; padding: 14px 0; background: rgba(0,0,0,0.6); backdrop-filter: blur(6px); }
        .topin { display: flex; align-items: center; justify-content: space-between; }
        .brand { display: flex; align-items: center; gap: 8px; font-weight: 800; }

        .hero { text-align: center; padding: 40px 0 20px; }
        .muted { color: var(--muted); }
        .progress { width: 280px; margin: 10px auto; height: 6px; border: 1px solid #222; background: #050505; }
        .progress span { display: block; height: 100%; background: #fff; }

        .plans { text-align: center; padding: 40px 0 60px; }
        .ph-title { font-size: 28px; margin-bottom: 4px; }
        .ph-sub { color: var(--muted); margin-bottom: 32px; }

        .plans-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
        }

        .plan {
          background: #111;
          border: 1px solid #222;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: 28px 22px;
          box-shadow: 0 8px 20px rgba(0,0,0,0.4);
          color: #fff;
          border-radius: 0;
          min-height: 340px;
          text-align: left;
        }
        .plan h3 { font-size: 14px; opacity: 0.9; margin: 0 0 4px; }
        .plan .price { font-size: 30px; font-weight: 800; margin-bottom: 12px; }
        .plan ul { list-style: none; padding: 0; margin: 0 0 20px; }
        .plan li { position: relative; padding-left: 20px; margin-bottom: 8px; }
        .plan li::before { content: "✓"; position: absolute; left: 0; top: 0; opacity: 0.9; }
        .plan button {
          width: 100%;
          border: 1px solid #333;
          padding: 12px 14px;
          font-weight: 700;
          border-radius: 0;
          cursor: pointer;
        }
        .plan.dark button { background: #1a1a1a; color: #fff; }
        .plan.light button { background: #fff; color: #000; border-color: #fff; }
        @media(max-width:900px){
          .plans-grid{ grid-template-columns: 1fr; }
        }
      `}</style>
    </main>
  );
}

/* PLAN CARD COMPONENT */
function PlanCard({
  title,
  price,
  features,
  button,
  type,
}: {
  title: string;
  price: string;
  features: string[];
  button: string;
  type: "dark" | "light";
}) {
  return (
    <div className={`plan ${type}`}>
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
