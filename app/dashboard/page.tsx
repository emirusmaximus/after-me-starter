"use client";

import Link from "next/link";

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

      {/* OUTER FRAME */}
      <section className="plans">
        <div className="container center">
          <h2 className="ph-title">Plans</h2>
          <p className="ph-sub">Choose your legacy.</p>
        </div>

        <div className="frame">
          {/* AYIRICI ÇİZGİLER */}
          <span className="divider d1" />
          <span className="divider d2" />

          <div className="grid">
            <Compartment
              title="Premium"
              price="$2/mo"
              features={["Encrypted vault", "Priority support", "Early access"]}
              cta="Upgrade 💎"
              type="premium"
              ribbon="Most Chosen"
            />
            <Compartment
              title="Free"
              price="$0"
              features={["Up to 3 letters", "Basic vault", "Standard support"]}
              cta="Current Plan"
              type="free"
            />
            <Compartment
              title="Lifetime"
              price="$15"
              features={["Unlimited messages", "Lifetime storage", "VIP legacy badge"]}
              cta="Unlock ✨"
              type="lifetime"
            />
          </div>
        </div>
      </section>

      <style jsx>{`
        :root{ --bg:#000; --fg:#fff; --muted:#BBB; }

        *{ box-sizing:border-box }
        body, .dashboard{ background:var(--bg); color:var(--fg); font-family:system-ui,-apple-system,Segoe UI,Roboto,Manrope,sans-serif }

        .container{ max-width:1100px; margin:0 auto; padding:0 20px }
        .top{ border-bottom:1px solid #111; padding:14px 0; background:rgba(0,0,0,.6); backdrop-filter:blur(6px) }
        .topin{ display:flex; align-items:center; justify-content:space-between }
        .brand{ display:flex; align-items:center; gap:8px; font-weight:800 }
        .nav a{ color:#9aa; margin-left:16px } .nav a:hover{ color:#fff }

        .hero{ text-align:center; padding:38px 0 18px }
        .muted{ color:var(--muted) }
        .progress{ width:280px; margin:10px auto; height:6px; border:1px solid #222; background:#050505 }
        .progress span{ display:block; height:100%; background:#fff }

        .plans{ text-align:center; padding:30px 0 50px }
        .ph-title{ font-size:28px; font-weight:800; margin-bottom:4px }
        .ph-sub{ color:var(--muted); margin-bottom:18px; font-weight:600 }

        /* KÜÇÜLTÜLMÜŞ DIŞ ÇERÇEVE */
        .frame{
          position:relative;
          width:100%;
          max-width:760px;      /* daha kısa */
          margin:0 auto;
          border:2px solid #fff;
          border-radius:20px;
          background:#000;
          padding:20px;
          min-height:420px;
          overflow:hidden;
        }

        .divider{
          position:absolute;
          top:20px; bottom:20px;
          width:0; border-left:2px solid #fff;
          z-index:20;
        }
        .d1{ left:calc(33.333%) }
        .d2{ left:calc(66.666%) }

        .grid{
          display:grid;
          grid-template-columns:repeat(3,1fr);
          align-items:stretch;
          min-height:380px;
          position:relative;
          z-index:10;
        }

        .compartment{
          background:#000;
          padding:16px 18px 22px;
          display:flex;
          flex-direction:column;
          justify-content:flex-start;
          position:relative;
        }
        .hdr h3{ font-size:12px; text-transform:uppercase; font-weight:900; margin:0 0 6px }
        .price{ font-size:26px; font-weight:900; margin-bottom:6px }
        .feat{ list-style:none; padding:0; margin:8px 0 18px; text-align:left }
        .feat li{ margin:5px 0; font-size:14px; color:#ddd }
        .cta{ width:100%; height:42px; border-radius:12px; font-weight:900; font-size:15px; cursor:pointer;
              border:1px solid #fff; background:#111; color:#fff; margin-top:auto }
        .cta:hover{ background:#161616 }

        /* BEYAZ FONLU MOST CHOSEN DİKDÖRTGENİ */
        .ribbon{
          position:absolute;
          top:-16px;
          left:50%;
          width:180px;
          transform:rotate(-25deg) translateX(-50%);
          transform-origin:center;
          z-index:30;
          background:#fff;
          color:#000;
          font-weight:900;
          font-size:14px;
          letter-spacing:.5px;
          text-transform:uppercase;
          text-align:center;
          padding:10px 0;
          border-radius:6px;
          box-shadow:0 4px 18px rgba(255,255,255,.35);
          pointer-events:none;
        }

        @media(max-width:1000px){
          .frame{ max-width:90vw; min-height:auto; padding:16px }
          .divider{ display:none }
          .grid{ grid-template-columns:1fr }
          .ribbon{ width:160px; font-size:13px; top:-12px; transform:rotate(-25deg) translateX(-50%) }
        }
      `}</style>
    </main>
  );
}

/* === KUTU === */
function Compartment({ title, price, features, cta, type, ribbon }:{
  title:string; price:string; features:string[]; cta:string;
  type:"premium"|"free"|"lifetime"; ribbon?:string;
}){
  return(
    <div className={`compartment ${type}`}>
      {type==="premium"&&ribbon?<div className="ribbon">{ribbon}</div>:null}
      <div className="hdr">
        <h3>{title}</h3>
        <div className="price">{price}</div>
      </div>
      <ul className="feat">{features.map((f,i)=><li key={i}>{f}</li>)}</ul>
      <button className="cta">{cta}</button>
    </div>
  );
}
