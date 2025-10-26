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

        {/* SADECE 3 AYRI DİKDÖRTGEN YAN YANA */}
        <div className="container plans-row">
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
        @import url('https://fonts.googleapis.com/css2?family=Manrope:wght@400;600;700;800&display=swap');

        :root{
          --bg:#000; --fg:#fff; --muted:#BBB; --border:#1a1a1a;
          --free-a:#1A1A1A; --free-b:#2A2A2A;
          --prem-a:#6C63FF; --prem-b:#8A7CFF;
          --life-a:#F2C94C; --life-b:#F9E79F;
        }
        *{ box-sizing:border-box }
        body, .dashboard { background:var(--bg); color:var(--fg); font-family: Manrope, system-ui, -apple-system, Segoe UI, Roboto, sans-serif; }

        .container{ max-width:1100px; margin:0 auto; padding:0 20px; }
        .top{ border-bottom:1px solid #111; padding:14px 0; background:rgba(0,0,0,.6); backdrop-filter:blur(6px); }
        .topin{ display:flex; align-items:center; justify-content:space-between; }
        .brand{ display:flex; align-items:center; gap:8px; font-weight:800; }
        .nav a{ color:#9aa; margin-left:16px; } .nav a:hover{ color:#fff; }

        .hero{ text-align:center; padding:40px 0 20px; }
        .muted{ color:var(--muted); }
        .progress{ width:280px; margin:10px auto; height:6px; border:1px solid #222; background:#050505; }
        .progress span{ display:block; height:100%; background:#fff; }

        .plans{ text-align:center; padding:40px 0 60px; }
        .ph-title{ font-size:28px; font-weight:800; margin-bottom:4px; }
        .ph-sub{ color:var(--muted); margin-bottom:24px; font-weight:600; }

        /* === 3 AYRI DİKDÖRTGEN YAN YANA, ORTADA === */
        .plans-row{
          display:flex;
          gap:24px;
          justify-content:center;  /* ortala */
          align-items:stretch;
          flex-wrap:nowrap;        /* kırma yok */
          overflow-x:auto;         /* mobilde yana kaydır */
          -webkit-overflow-scrolling:touch;
          padding:4px;
          scrollbar-width: thin;
        }
        @media (max-width:900px){ .plans-row{ gap:16px; justify-content:flex-start; } }

        /* === HER PLAN KENDİ DİKDÖRTGENİNDE === */
        .plan{
          flex:0 0 320px;           /* sabit en -> dikey dikdörtgen */
          height:560px;             /* net dikey görünüm */
          border:1px solid var(--border);
          border-radius:20px;
          background:#111;
          padding:22px;
          display:flex;
          flex-direction:column;
          position:relative;
          box-shadow:0 0 14px rgba(255,255,255,.05);
          transition:transform .2s, box-shadow .2s, outline-color .2s;
          outline:0 solid transparent;
        }
        .plan:hover{ transform:translateY(-4px); box-shadow:0 0 36px rgba(255,255,255,.16); outline:2px solid rgba(255,255,255,.10); }

        /* İç hiza: başlık/fiyat yüksekliği sabit, butonlar altta hizalı */
        .hdr{ min-height:96px; display:grid; align-content:start; }
        .hdr h3{ font-size:13px; letter-spacing:.6px; text-transform:uppercase; font-weight:700; opacity:.9; margin:0 0 6px; }
        .price{ font-size:34px; font-weight:800; line-height:1; }
        .content{ flex:1; display:flex; flex-direction:column; }
        .feat{ list-style:none; padding:0; margin:12px 0 22px; }
        .feat li{ position:relative; padding-left:20px; margin-bottom:10px; font-size:15px; }
        .feat li::before{ content:"✓"; position:absolute; left:0; top:0; opacity:.9; }

        /* CTA — üç farklı tema, aynı ölçü */
        .cta{ width:100%; height:48px; border-radius:16px; font-weight:800; font-size:16px; cursor:pointer; transition:.2s; user-select:none; }

        /* Premium — mor-mavi + glass + köşe şerit */
        .premium{
          background: linear-gradient(160deg, rgba(108,99,255,.22), rgba(138,124,255,.10)) #0c0c0f;
          border-color: rgba(124,118,255,.35);
          box-shadow: 0 0 24px rgba(124,118,255,.12);
        }
        .premium:hover{ box-shadow:0 0 36px rgba(124,118,255,.24); }
        .cta-premium{
          color:#fff; background:rgba(255,255,255,.06);
          border:1px solid transparent;
          background-clip: padding-box, border-box;
          border-image: linear-gradient(90deg, var(--prem-a), var(--prem-b)) 1;
        }
        .cta-premium:hover{ background:rgba(255,255,255,.10); }
        .cta-premium:focus-visible{ box-shadow:0 0 0 3px rgba(124,118,255,.35); outline:0; }

        /* Köşeden çapraz ribbon (Most Chosen) */
        .ribbon{
          position:absolute;
          top:14px; right:-56px;
          width:190px; text-align:center;
          transform:rotate(45deg);
          background: linear-gradient(90deg, var(--prem-a), var(--prem-b));
          color:#fff; font-weight:900; font-size:12px; letter-spacing:.6px;
          padding:6px 0; box-shadow:0 6px 14px rgba(0,0,0,.35);
        }

        /* Free — nötr koyu + beyaz inverted buton */
        .free{ background: linear-gradient(160deg, var(--free-a), var(--free-b)); border-color:#2E2E2E; }
        .cta-free{ background:#fff; color:#111; border:1px solid #E9E9E9; }
        .cta-free:hover{ background:#f2f2f2; }
        .cta-free:focus-visible{ box-shadow:0 0 0 3px rgba(255,255,255,.35); outline:0; }

        /* Lifetime — altın + shimmer + altın kontür buton */
        .lifetime{
          background: linear-gradient(160deg, var(--life-a), var(--life-b));
          color:#241A00; border-color: rgba(242,201,76,.55);
          overflow:hidden;
        }
        .lifetime::after{
          content:""; position:absolute; top:-20%; left:-60%;
          width:40%; height:140%; transform:rotate(20deg);
          background: linear-gradient(90deg, rgba(255,255,255,0), rgba(255,255,255,.45), rgba(255,255,255,0));
          filter: blur(8px); animation: shimmer 3.2s linear infinite;
        }
        @keyframes shimmer{ 0%{left:-60%} 100%{left:130%} }
        .cta-life{ color:#241A00; background: rgba(255,214,102,.18); border:1px solid rgba(242,201,76,.65); }
        .cta-life:hover{ background: rgba(255,214,102,.28); }
        .cta-life:focus-visible{ box-shadow:0 0 0 3px rgba(242,201,76,.55); outline:0; }
      `}</style>
    </main>
  );
}

/* === PLAN CARD === */
function PlanCard({
  title, price, features, button, variant, ribbon,
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
      {variant === "premium" && ribbon ? <div className="ribbon">{ribbon}</div> : null}

      <div className="content">
        <div className="hdr">
          <h3>{title}</h3>
          <div className="price">{price}</div>
        </div>

        <ul className="feat">
          {features.map((f, i) => <li key={i}>{f}</li>)}
        </ul>

        <div style={{ marginTop: "auto" }} />
      </div>

      <button
        className={
          variant === "premium" ? "cta cta-premium" :
          variant === "lifetime" ? "cta cta-life" :
          "cta cta-free"
        }
      >
        {button}
      </button>
    </div>
  );
}
