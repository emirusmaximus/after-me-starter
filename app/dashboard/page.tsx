"use client";

import Link from "next/link";
import { useMemo } from "react";

export default function DashboardPage(): JSX.Element {
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
        features: [
          "Unlimited messages",
          "Lifetime storage",
          "VIP legacy badge",
        ],
        cta: "Unlock ✨",
        variant: "lifetime" as const,
        ribbon: "Most Chosen", // Kurdele Lifetime'da
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
            Your vault has {stats.letters} letters — {stats.waiting} waiting for
            delivery.
          </p>
        </div>
        <div className="container center">
          <h1>Welcome back, @{username}</h1>
          <p className="muted">You haven’t written in {stats.days} days.</p>
          <div className="progress">
            <span style={{ width: `${stats.progress}%` }} />
          </div>
          <small className="muted">Vault Progress: {stats.progress}%</small>
        </div>
      </section>

      {/* PLANS */}
      <section className="plans">
        <div className="container center">
          <h2 className="ph-title">Plans</h2>
          <p className="ph-sub">Choose your legacy.</p>
        </div>

        <div className="container plans-row">
          {plans.map((p) => (
            <PlanCard
              key={p.key}
              title={p.title}
              price={p.price}
              features={p.features}
              button={p.button}
              variant={p.variant}
              ribbon={p.ribbon}
            />
          ))}
        </div>
      </section>

      {/* STİL BLOĞU (Temizlenmiş Versiyon) */}
      <style jsx>{`
        /* Global stiller (body, *, .container) 'app/globals.css' dosyasından geliyor.
          Burada sadece bu sayfaya özel stiller var.
        */
        .dashboard {
          /* Bu değişkenler artık app/globals.css'teki :root içinden okunacak.
          --bg, --fg, --muted, --card-bg, --card-border, --btn-dark-bg, etc.
          */
          font-family: system-ui, -apple-system, Segoe UI, Roboto, Manrope,
            sans-serif;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }

        .center {
          text-align: center;
        }

        /* HEADER */
        .top {
          border-bottom: 1px solid #1f1f1f;
          padding: 14px 0;
          background: rgba(0, 0, 0, 0.6);
          backdrop-filter: blur(6px);
          position: sticky;
          top: 0;
          z-index: 10;
        }
        .topin {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .brand {
          display: flex;
          align-items: center;
          gap: 8px;
          font-weight: 800;
          text-decoration: none;
          color: var(--fg);
        }
        .nav a {
          color: #9aa;
          margin-left: 16px;
          text-decoration: none;
          font-size: 15px;
        }
        .nav a:hover {
          color: #fff;
        }

        /* HERO */
        .hero {
          text-align: center;
          padding: 40px 0 20px;
        }
        .muted {
          color: var(--muted); /* Bu artık globals.css'ten gelecek */
        }
        .progress {
          width: 280px;
          margin: 10px auto;
          height: 6px;
          border: 1px solid #222;
          background: #050505;
          border-radius: 6px;
          overflow: hidden;
        }
        .progress span {
          display: block;
          height: 100%;
          background: #fff;
          border-radius: 6px;
        }

        /* PLANS */
        .plans {
          text-align: center;
          padding: 40px 0 60px;
        }
        .ph-title {
          font-size: 28px;
          font-weight: 800;
          margin-bottom: 4px;
        }
        .ph-sub {
          color: var(--muted);
          margin-bottom: 24px;
          font-weight: 600;
          font-size: 18px;
        }

        .plans-row {
          display: flex;
          gap: 20px;
          justify-content: center;
          align-items: stretch;
          flex-wrap: wrap;
        }
        @media (max-width: 900px) {
          .plans-row {
            gap: 18px;
            justify-content: center;
          }
        }

        /* PLAN KARTI: Resimdeki tasarıma uygun */
        .plan {
          flex: 1 1 320px;
          max-width: 340px;
          min-height: 380px;
          border: 1px solid var(--card-border); /* Değişken globals.css'ten */
          border-radius: 16px;
          background: var(--card-bg); /* Değişken globals.css'ten */
          padding: 28px;
          display: flex;
          flex-direction: column;
          position: relative;
          overflow: hidden;
          text-align: left;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        .plan:hover {
          transform: translateY(-4px);
          box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
        }

        /* İç hiza */
        .hdr {
          min-height: 90px;
          display: grid;
          align-content: start;
        }
        .hdr h3 {
          font-size: 14px;
          letter-spacing: 0.5px;
          text-transform: uppercase;
          font-weight: 700;
          color: var(--muted);
          margin: 0 0 8px;
        }
        .price {
          font-size: 34px;
          font-weight: 800;
          line-height: 1;
          color: var(--fg);
        }
        .feat {
          list-style: none;
          padding: 0;
          margin: 24px 0;
          flex-grow: 1; /* Butonları en alta iter */
        }
        .feat li {
          position: relative;
          padding-left: 24px;
          margin-bottom: 12px;
          font-size: 15px;
          color: var(--fg);
        }
        .feat li::before {
          content: "✓";
          position: absolute;
          left: 0;
          top: 1px;
          opacity: 0.9;
          color: var(--muted);
        }

        /* CTA’lar (Butonlar) */
        .cta {
          width: 100%;
          height: 48px;
          border-radius: 12px;
          font-weight: 700;
          font-size: 16px;
          cursor: pointer;
          transition: 0.18s;
          user-select: none;
          border: none;
        }
        /* Premium ve Lifetime (Koyu Buton) */
        .cta-premium,
        .cta-life {
          color: var(--fg);
          background: var(--btn-dark-bg); /* Değişken globals.css'ten */
          border: 1px solid var(--card-border); /* Değişken globals.css'ten */
        }
        .cta-premium:hover,
        .cta-life:hover {
          background: var(--btn-dark-hover); /* Değişken globals.css'ten */
        }

        /* Free (Beyaz Buton) */
        .cta-free {
          background: #fff;
          color: #111;
          border: 1px solid #e9e9e9;
        }
        .cta-free:hover {
          background: #f2f2f2;
        }

        /* “Most Chosen” Kurdele Stili */
        .ribbon {
          position: absolute;
          top: 18px;
          right: -50px;
          z-index: 2;
          transform: rotate(45deg);
          background: var(--ribbon-bg); /* Değişken globals.css'ten */
          color: #fff;
          font-weight: 700;
          font-size: 12px;
          letter-spacing: 0.5px;
          padding: 6px 0;
          width: 200px;
          text-align: center;
          text-transform: uppercase;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
        }
      `}</style>
    </main>
  );
}

/* === PLAN CARD === */
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
    <div className={`plan ${variant}`} data-variant={variant}>
      {/* Kurdele 'lifetime' için gösteriliyor */}
      {variant === "lifetime" && ribbon ? (
        <div className="ribbon">{ribbon}</div>
      ) : null}

      <div className="hdr">
        <h3>{title}</h3>
        <div className="price">{price}</div>
      </div>

      <ul className="feat">
        {features.map((f, i) => (
          <li key={i}>{f}</li>
        ))}
      </ul>

      <button
        className={
          variant === "premium"
            ? "cta cta-premium"
            : variant === "lifetime"
            ? "cta cta-life"
            : "cta cta-free"
        }
      >
        {button}
      </button>
    </div>
  );
}
