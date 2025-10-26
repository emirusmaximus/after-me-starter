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
        ribbon: "Most Chosen",
      },
      {
        key: "free",
        title: "Free",
        price: "$0",
        features: ["Up to 3 letters", "Basic vault", "Standard support"],
        cta: "Current Plan",
      },
      {
        key: "lifetime",
        title: "Lifetime",
        price: "$15",
        features: ["Unlimited messages", "Lifetime storage", "VIP legacy badge"],
        cta: "Unlock ✨",
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

      {/* OUTER FRAME (BEYAZ KENARLI, İÇİ SİYAH) + İÇ BEYAZ DİKEY ÇİZGİLER */}
      <section className="plans">
        <div className="container center">
          <h2 className="ph-title">Plans</h2>
          <p className="ph-sub">Choose your legacy.</p>
        </div>

        <div className="container">
          <div className="frame">
            {/* Dikey ayırıcı beyaz çizgiler (üstten alta) */}
            <span className="divider d1" aria-hidden />
            <span className="divider d2" aria-hidden />

            {/* Üç bölme (ekstra kenarlık yok; sınırlar dış çerçeve + çizgiler) */}
            <div className="grid">
              <Compartment type="premium" ribbon="Most Chosen" {...plans[0]} />
              <Compartment type="free" {...plans[1]} />
              <Compartment type="lifetime" {...plans[2]} />
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

        /* === DIŞ ÇERÇEVE — BEYAZ KENAR, İÇİ SİYAH === */
        .frame{
          position:relative;
          border:2px solid #FFFFFF;    /* Dış beyaz çizgi */
          border-radius:22px;
          background:#000;             /* içi siyah */
          padding:28px;
          box-shadow:0 0 0 1px rgba(255,255,255,.08) inset;
          overflow:hidden;             /* çizgiler taşmasın */
          min-height:560px;
        }

        /* Dikey ayırıcı düz beyaz çizgiler (üstten alta) */
        .divider{
          position:absolute;
          top:22px;
          bottom:22px;
          width:0;
          border-left:2px solid #FFFFFF;
          opacity:.95;
          z-index:1;
        }
        .d1{ left: calc(33.333%); }
        .d2{ left: calc(66.666%); }

        /* Üç bölme alanı */
        .grid{
          position:relative;
          z-index:2;                /* çizgilerin üstünde içerik */
          display:grid;
          grid-template-columns: repeat(3, 1fr);
          gap:0;                    /* boşluk yok: sınırlar çizgilerle */
          align-items:stretch;
          min-height:504px;
        }

        /* Bölme içerikleri — siyah panel, iç dolgu */
        .compartment{
          position:relative;
          background:#000;          /* iç siyah */
          padding:22px 22px 24px;
          display:flex;
          flex-direction:column;
          justify-content:flex-start;
        }

        .hdr h3{ font-size:13px; letter-spacing:.6px; text-transform:uppercase; font-weight:900; opacity:.95; margin:0 0 6px; }
        .price{ font-size:34px; font-weight:900; line-height:1; margin-bottom:6px; }
        .feat{ list-style:none; padding:0; margin:12px 0 22px; text-align:left; }
        .feat li{ margin:8px 0; font-size:15px; color:#ddd; }

        .cta{ width:100%; height:48px; border-radius:14px; font-weight:900; font-size:16px; cursor:pointer; transition:.18s; user-select:none; border:1px solid #fff; background:#111; color:#fff; }
        .cta:hover{ background:#161616; }

        /* === "Most Chosen" — Premium bölmesinin üst kısa kenar ortasından başlayıp
               sağ uzun kenar ortasına diyagonal; beyaz çizginin ÜSTÜNDEN geçer === */
        .ribbon{
          position:absolute;
          top:-18px;            /* üst kısa kenarın biraz dışı */
          left:50%;             /* üst kenar ORTASI */
          width:240px;
          transform: rotate(35deg) translateX(-50%);
          transform-origin: center;
          z-index: 5;           /* ayırıcı çizgi ve dış kenarın ÜZERİNDE */
          background:#000;      /* manşet bant: siyah */
          color:#fff;
          text-transform:uppercase;
          font-weight:1000;
          letter-spacing:.8px;
          font-size:12px;
          text-align:center;
          padding:10px 0;
          border:2px solid #FFFFFF;      /* beyaz kontür */
          box-shadow:0 0 18px rgba(255,255,255,.25);
          pointer-events:none;
        }

        @media (max-width: 1000px){
          .frame{ padding:20px; }
          .divider{ display:none; }      /* mobilde çizgiler kalksın, sıralı görünüm */
          .grid{ grid-template-columns: 1fr; }
          .ribbon{ left:55%; width:220px; transform: rotate(35deg) translateX(-50%); }
        }
      `}</style>
    </main>
  );
}

/* === BÖLME BİLEŞENİ === */
function Compartment({
  title, price, features, cta, type, ribbon,
}: {
  title: string;
  price: string;
  features: string[];
  cta: string;
  type: "premium" | "free" | "lifetime";
  ribbon?: string;
}) {
  return (
    <div className={`compartment ${type}`}>
      {/* Sadece Premium'da manşet şeridi */}
      {type === "premium" && ribbon ? <div className="ribbon">{ribbon}</div> : null}

      <div className="hdr">
        <h3>{title}</h3>
        <div className="price">{price}</div>
      </div>

      <ul className="feat">
        {features.map((f, i) => <li key={i}>{f}</li>)}
      </ul>

      <button className="cta">{cta}</button>
    </div>
  );
}
