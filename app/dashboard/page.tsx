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

      {/* OUTER FRAME (BEYAZ KENARLI, İÇİ SİYAH) */}
      <section className="plans">
        <div className="container center">
          <h2 className="ph-title">Plans</h2>
          <p className="ph-sub">Choose your legacy.</p>
        </div>

        <div className="container">
          <div className="frame">
            {/* İÇERİDE: 3 ADET NEON YEŞİL KENARLI, SİYAH DİKDÖRTGEN */}
            <div className="inner-row">
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
          </div>
        </div>
      </section>

      <style jsx>{`
        :root{
          --bg:#000; --fg:#fff; --muted:#BBB;
          --prem-a:#6C63FF; --prem-b:#8A7CFF;
          --life-a:#F2C94C; --life-b:#F9E79F;
          --neon:#39FF14;                   /* NEON YEŞİL */
          --neonGlow: rgba(57,255,20,.45);
        }

        *{ box-sizing:border-box }
        body, .dashboard { background:var(--bg); color:var(--fg); font-family: system-ui, -apple-system, Segoe UI, Roboto, Manrope, sans-serif; }

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

        /* === DIŞ ÇERÇEVE — BEYAZ KENAR, SİYAH İÇ === */
        .frame{
          position:relative;
          border:2px solid #FFFFFF;    /* beyaz kenar */
          border-radius:22px;
          background:#000;             /* içi siyah */
          padding:28px;                /* içteki neon kutular için boşluk */
          box-shadow:0 0 0 1px rgba(255,255,255,.08) inset;
        }

        /* İçte 3 küçük neon dikdörtgen — birbirinden AYRI */
        .inner-row{
          display:flex;
          gap:26px;
          justify-content:center;
          align-items:stretch;
          flex-wrap:nowrap;
          overflow-x:auto;
          -webkit-overflow-scrolling:touch;
          padding:2px;
        }

        /* === KÜÇÜK KUTU: NEON YEŞİL KENARLI, SİYAH İÇ === */
        .plan{
          flex:0 0 300px;         /* sabit dikey görünüm */
          height:520px;
          background:#0b0b0b;     /* iç siyah */
          border:2px solid var(--neon);   /* NEON kenar */
          border-radius:18px;
          padding:20px;
          display:flex;
          flex-direction:column;
          position:relative;
          overflow:visible;
          box-shadow:
            0 0 0 1px rgba(57,255,20,.10) inset,
            0 0 22px var(--neonGlow);
          transition:transform .18s ease, box-shadow .18s ease;
          isolation:isolate;
        }
        .plan:hover{
          transform:translateY(-4px);
          box-shadow:
            0 0 0 1px rgba(57,255,20,.18) inset,
            0 0 34px var(--neonGlow),
            0 0 64px rgba(57,255,20,.25);
        }

        /* İç hiza */
        .hdr{ min-height:96px; display:grid; align-content:start; }
        .hdr h3{ font-size:13px; letter-spacing:.6px; text-transform:uppercase; font-weight:900; opacity:.95; margin:0 0 6px; }
        .price{ font-size:34px; font-weight:900; line-height:1; }
        .feat{ list-style:none; padding:0; margin:12px 0 22px; text-align:left; }
        .feat li{ position:relative; padding-left:20px; margin-bottom:10px; font-size:15px; }
        .feat li::before{ content:"✓"; position:absolute; left:0; top:0; color:var(--neon); text-shadow:0 0 6px var(--neonGlow); }

        /* CTA */
        .cta{ width:100%; height:48px; border-radius:16px; font-weight:900; font-size:16px; cursor:pointer; transition:.18s; user-select:none; }
        .cta-premium{ color:#fff; background:rgba(255,255,255,.06); border:1px solid rgba(255,255,255,.12); }
        .cta-premium:hover{ background:rgba(255,255,255,.10); box-shadow:0 0 12px var(--neonGlow); }
        .cta-free{ background:#fff; color:#111; border:1px solid #E9E9E9; }
        .cta-free:hover{ background:#f2f2f2; box-shadow:0 0 10px var(--neonGlow); }
        .cta-life{ color:#241A00; background: rgba(255,214,102,.18); border:1px solid rgba(242,201,76,.65); }
        .cta-life:hover{ background: rgba(255,214,102,.28); box-shadow:0 0 12px var(--neonGlow); }

        /* Premium/Free/Lifetime arka planları (kenar neon, iç siyah kalır) */
        .premium{ background: linear-gradient(160deg, rgba(108,99,255,.12), rgba(138,124,255,.04)) #0b0b0b; }
        .free{ background: linear-gradient(160deg, #0e0e0e, #1a1a1a); }
        .lifetime{ background: linear-gradient(160deg, var(--life-a) 0%, var(--life-b) 0%) #0b0b0b; color:#d1a800; }

        /* === "Most Chosen" manşeti — Premium ÜST taraf, NEON kenarın ÜZERİNDEN === */
        .ribbon{
          position:absolute;
          /* Üst kenar ortasını hedef al, sağ kenar ortasına doğru diyagonal */
          top: -20px;           /* üstten biraz dışarı */
          left: 55%;            /* ortalanıp sağa doğru kaydır */
          width: 240px;
          transform: rotate(35deg) translateX(-50%);
          transform-origin: center;
          z-index: 6;           /* neon kenarın ÜSTÜNDE */
          background: #000;     /* manşet bant siyah */
          color: #fff;
          text-transform: uppercase;
          font-weight: 1000;
          letter-spacing: .8px;
          font-size: 12px;
          text-align: center;
          padding: 10px 0;
          border: 2px solid var(--neon);     /* neon kontür */
          box-shadow: 0 0 18px var(--neonGlow), 0 0 36px rgba(57,255,20,.25);
          pointer-events: none;
        }
        .ribbon::after{
          content:"";
          position:absolute; inset:-2px; border-radius:2px; pointer-events:none;
          box-shadow: inset 0 0 18px var(--neonGlow);
        }

        @media (max-width: 980px){
          .plan{ flex-basis: 260px; height: 500px; }
          .ribbon{ left: 60%; width: 220px; transform: rotate(35deg) translateX(-50%); }
        }
      `}</style>
    </main>
  );
}

/* === PLAN KARTI === */
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
    <div className={`plan ${variant}`} data-variant={variant}>
      {/* Premium: manşet şerit üstte, NEON kenarın ÜZERİNDEN çapraz */}
      {variant === "premium" && ribbon ? <div className="ribbon">{ribbon}</div> : null}

      <div className="hdr">
        <h3>{title}</h3>
        <div className="price">{price}</div>
      </div>

      <ul className="feat">
        {features.map((f, i) => <li key={i}>{f}</li>)}
      </ul>

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
