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

      {/* OUTER FRAME (BEYAZ KENARLI, İÇİ SİYAH) + İÇ DİKEY AYIRICI ÇİZGİLER */}
      <section className="plans">
        <div className="container center">
          <h2 className="ph-title">Plans</h2>
          <p className="ph-sub">Choose your legacy.</p>
        </div>

        <div className="container">
          <div className="frame">
            {/* Ayırıcı çizgiler (üstten alta düz beyaz çizgi) */}
            <span className="divider d1" aria-hidden />
            <span className="divider d2" aria-hidden />

            {/* İçeride: üç küçük beyaz çerçeveli siyah kutu */}
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
          border:2px solid #FFFFFF;    /* Dış beyaz çizgi */
          border-radius:22px;
          background:#000;             /* içi siyah */
          padding:28px;
          box-shadow:0 0 0 1px rgba(255,255,255,.08) inset;
          overflow:hidden;             /* ayırıcı çizgiler taşmasın */
        }

        /* Dikey ayırıcı çizgiler: üstten alta beyaz düz çizgi */
        .divider{
          position:absolute;
          top:22px;
          bottom:22px;
          width:0;
          border-left:2px solid #FFFFFF;
          opacity:.95;
          z-index:1; /* kartların arkasında kalsın ama görünür olsun */
        }
        /* 3 sütunu ayırmak için 2 çizgi: %33.33 ve %66.66 */
        .d1{ left: calc(33.333%); }
        .d2{ left: calc(66.666%); }

        /* İçte üç küçük BEYAZ ÇİZGİLİ siyah kutu (çizgilerle hizalı) */
        .inner-row{
          display:grid;
          grid-template-columns: repeat(3, 1fr);
          gap:24px;
          position:relative;
          z-index:2; /* ayırıcı çizgilerin üzerinde içerik */
        }

        .plan{
          background:#0b0b0b;          /* iç siyah */
          border:2px solid #FFFFFF;    /* İç beyaz çizgi */
          border-radius:18px;
          padding:20px;
          min-height:520px;
          display:flex; flex-direction:column;
          position:relative; overflow:visible;
          transition:transform .18s ease, box-shadow .18s ease;
        }
        .plan:hover{
          transform:translateY(-4px);
          box-shadow:0 0 28px rgba(255,255,255,.10);
        }

        /* İç hiza */
        .hdr{ min-height:96px; display:grid; align-content:start; }
        .hdr h3{ font-size:13px; letter-spacing:.6px; text-transform:uppercase; font-weight:900; opacity:.95; margin:0 0 6px; }
        .price{ font-size:34px; font-weight:900; line-height:1; }
        .feat{ list-style:none; padding:0; margin:12px 0 22px; text-align:left; }
        .feat li{ position:relative; padding-left:16px; margin-bottom:10px; font-size:15px; }
        .feat li::before{ content:""; } /* nokta yok */

        /* CTA */
        .cta{ width:100%; height:48px; border-radius:14px; font-weight:900; font-size:16px; cursor:pointer; transition:.18s; user-select:none; }
        .cta-premium{ color:#000; background:#fff; border:1px solid #fff; }
        .cta-premium:hover{ background:#f2f2f2; }
        .cta-free{ background:#111; color:#fff; border:1px solid #fff; }
        .cta-free:hover{ background:#161616; }
        .cta-life{ background:#111; color:#fff; border:1px solid #fff; }
        .cta-life:hover{ background:#161616; }

        .premium{ background:#0b0b0b; }
        .free{ background:#0b0b0b; }
        .lifetime{ background:#0b0b0b; }

        /* === "Most Chosen" — Premium kartın ÜST tarafında, beyaz kenarın ÜZERİNDEN ÇAPRAZ === */
        .ribbon{
          position:absolute;
          top: -18px;       /* üst kısa kenarın biraz dışı */
          left: 50%;        /* üst kenar ortasını hedefle */
          width: 230px;
          transform: rotate(35deg) translateX(-50%);
          transform-origin: center;
          z-index: 6;       /* kart kenarının üstünde */
          background:#000;  /* manşet bant siyah */
          color:#fff;
          text-transform:uppercase;
          font-weight:1000;
          letter-spacing:.8px;
          font-size:12px;
          text-align:center;
          padding:10px 0;
          border:2px solid #FFFFFF;     /* şerit kenarı: BEYAZ */
          box-shadow:0 0 18px rgba(255,255,255,.25);
          pointer-events:none;
        }

        @media (max-width: 1000px){
          .inner-row{ grid-template-columns: 1fr; gap:18px; }
          .divider{ display:none; } /* mobilde ayırıcı çizgileri gizle */
          .ribbon{ left: 55%; width: 220px; transform: rotate(35deg) translateX(-50%); }
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
      {/* Premium: üstten beyaz kenarın ÜSTÜNDEN çapraz şerit */}
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
