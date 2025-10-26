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

        {/* ÜÇ AYRI NEON YEŞİL KENARLI DİKDÖRTGEN — YAN YANA */}
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
          --bg:#000; --fg:#fff; --muted:#BBB;
          --prem-a:#6C63FF; --prem-b:#8A7CFF;      /* Premium bg gradient */
          --life-a:#F2C94C; --life-b:#F9E79F;      /* Lifetime bg gradient */
          --neon:#39FF14;                          /* NEON GREEN */
          --neonGlow: rgba(57,255,20,.45);
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

        /* === ÜÇ AYRI DİKDÖRTGEN — ORTALANMIŞ, NEON AYRIK === */
        .plans-row{
          display:flex;
          gap:28px;                     /* kartlar birbirinden AYRI dursun */
          justify-content:center;
          align-items:stretch;
          flex-wrap:nowrap;
          overflow-x:auto;               /* mobilde yana kaydır */
          -webkit-overflow-scrolling:touch;
          padding:6px 4px 10px;
          scrollbar-width:thin;
        }
        @media (max-width:900px){ .plans-row{ gap:18px; justify-content:flex-start; } }

        /* === KART: NEON YEŞİL KENARLI, DİKEY DİKDÖRTGEN === */
        .plan{
          flex:0 0 320px;                /* dikey görünüm */
          height:560px;
          border:2px solid var(--neon);  /* *** NEON YEŞİL ÇİZGİ *** */
          border-radius:18px;
          background:#0b0b0b;            /* siyah zeminde neon belirgin */
          padding:22px;
          display:flex;
          flex-direction:column;
          position:relative;
          overflow:visible;              /* ribbon dışarı taşsın */
          transition:transform .18s ease, box-shadow .18s ease, filter .18s ease;
          box-shadow:
            0 0 0 1px rgba(57,255,20,.12) inset,
            0 0 22px var(--neonGlow);    /* sabit glow */
          isolation:isolate;
        }
        /* Ek dış parlama için pseudo halkası */
        .plan::after{
          content:"";
          position:absolute; inset:-6px;
          border-radius:22px;
          pointer-events:none;
          box-shadow: 0 0 28px var(--neonGlow), 0 0 56px rgba(57,255,20,.15);
          z-index:-1;
        }
        .plan:hover{
          transform:translateY(-4px);
          box-shadow:
            0 0 0 1px rgba(57,255,20,.18) inset,
            0 0 34px var(--neonGlow),
            0 0 64px rgba(57,255,20,.25);
          filter: drop-shadow(0 0 14px rgba(57,255,20,.18));
        }

        /* İç hiza */
        .hdr{ min-height:96px; display:grid; align-content:start; }
        .hdr h3{ font-size:13px; letter-spacing:.6px; text-transform:uppercase; font-weight:800; opacity:.95; margin:0 0 6px; }
        .price{ font-size:34px; font-weight:900; line-height:1; }
        .feat{ list-style:none; padding:0; margin:12px 0 22px; }
        .feat li{ position:relative; padding-left:20px; margin-bottom:10px; font-size:15px; }
        .feat li::before{ content:"✓"; position:absolute; left:0; top:0; opacity:.9; color:var(--neon); text-shadow:0 0 6px var(--neonGlow); }

        /* === CTA: ÜÇ VARYANT === */
        .cta{ width:100%; height:48px; border-radius:16px; font-weight:900; font-size:16px; cursor:pointer; transition:.18s; user-select:none; }

        .cta-premium{
          color:#fff;
          background:rgba(255,255,255,.06);
          border:1px solid rgba(255,255,255,.12);
        }
        .cta-premium:hover{ background:rgba(255,255,255,.10); box-shadow:0 0 12px var(--neonGlow); }

        .cta-free{ background:#fff; color:#111; border:1px solid #E9E9E9; }
        .cta-free:hover{ background:#f2f2f2; box-shadow:0 0 10px var(--neonGlow); }

        .cta-life{ color:#241A00; background: rgba(255,214,102,.18); border:1px solid rgba(242,201,76,.65); }
        .cta-life:hover{ background: rgba(255,214,102,.28); box-shadow:0 0 12px var(--neonGlow); }

        /* === VARYANT ARKAPLANLARI (kenar neon kalır) === */
        .premium{ background: linear-gradient(160deg, rgba(108,99,255,.14), rgba(138,124,255,.05)) #0b0b0b; }
        .free{ background: linear-gradient(160deg, #0e0e0e, #1c1c1c); }
        .lifetime{
          background: linear-gradient(160deg, var(--life-a), var(--life-b));
          color:#241A00;
        }

        /* === “Most Chosen” RIBBON — gazete manşeti gibi, NEON çizginin ÜSTÜNDEN === */
        .ribbon{
          position:absolute;
          top:-18px;                 /* kutunun dışından başlasın */
          right:-66px;               /* dışarı taşsın */
          z-index:5;                 /* kenarın ÜZERİNDE */
          transform:rotate(42deg);
          background:#0b0b0b;        /* manşet bant siyah */
          color:#fff;
          font-weight:1000;
          font-size:12px;
          letter-spacing:.7px;
          padding:9px 0;
          width: 220px;
          text-align:center;
          text-transform:uppercase;
          border:2px solid var(--neon);             /* NEON kenar */
          box-shadow: 0 0 18px var(--neonGlow), 0 0 36px rgba(57,255,20,.25);
        }
        /* manşet bandın üzerinde hafif neon çizgi vurgusu */
        .ribbon::after{
          content:"";
          position:absolute;
          inset:-2px;
          border-radius:2px;
          box-shadow: inset 0 0 18px var(--neonGlow);
          pointer-events:none;
        }

        /* === Lifetime shimmer (light sweep) === */
        .lifetime .shimmer{
          position:absolute;
          inset:0;
          overflow:hidden;
          border-radius:18px;
          pointer-events:none;
        }
        .lifetime .shimmer::before{
          content:"";
          position:absolute;
          top:-60%;
          left:-40%;
          width:60%;
          height:220%;
          transform:rotate(20deg);
          background:linear-gradient(90deg,
            rgba(255,255,255,0) 0%,
            rgba(255,255,255,.35) 45%,
            rgba(255,255,255,0) 100%);
          filter:blur(8px);
