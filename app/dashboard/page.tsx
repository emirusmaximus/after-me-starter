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

      {/* PLANS */}
      <section className="plans">
        <div className="container center">
          <h2 className="ph-title">Plans</h2>
          <p className="ph-sub">Choose your legacy.</p>
        </div>

        {/* KÜÇÜK ve ORTALI DIŞ ÇERÇEVE */}
        <div className="frame">
          {/* Dikey ayırıcı düz beyaz çizgiler */}
          <span className="divider d1" aria-hidden />
          <span className="divider d2" aria-hidden />

          <div className="grid">
            <Compartment
              title="Premium"
              price="$2/mo"
              features={["Encrypted vault", "Priority support", "Early access"]}
              cta="Upgrade 💎"
              type="premium"
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

        {/* POST CHOOSEN: Ayrı küçük dikdörtgen (beyaz çerçeve + beyaz iç, siyah yazı) */}
        <div className="postCard" aria-label="post choosen">post choosen</div>
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

        /* DIŞ ÇERÇEVE (kısaltılmış ve ortalı) */
        .frame{
          position:relative;
          width:100%;
          max-width:760px;
          margin:0 auto;
          border:2px solid #fff;
          border-radius:20px;
          background:#000;
          padding:20px;
          min-height:420px;
          overflow:hidden;
        }

        /* DİKEY BEYAZ AYIRICI ÇİZGİLER */
        .divider{
          position:absolute;
          top:20px; bottom:20px;
          width:0; border-left:2px solid #fff;
          z-index:20;
        }
        .d1{ left:calc(33.333%); }
        .d2{ left:calc(66.666%); }

        /* 3 bölme */
        .grid{
          display:grid;
          grid-template-columns:repeat(3,1fr);
          align-items:stretch;
          min-height:380px;
          position:relative;
          z-index:10;
        }

        /* ——— YAZILARI BÜYÜTTÜM (yaklaşık 16pt ve üstü) ——— */
        .compartment{
          background:#000;
          padding:22px 22px 24px;            /* içeriyi daha dolu göstersin */
          display:flex;
          flex-direction:column;
          justify-content:flex-start;
          position:relative;
        }
        .hdr h3{
          font-size:22px;                    /* ~16pt+ (12→22px) */
          text-transform:uppercase;
          font-weight:900;
          margin:0 0 10px;
          line-height:1.15;
        }
        .price{
          font-size:38px;                    /* başlıca vurgu */
          font-weight:900;
          margin-bottom:14px;
          line-height:1.05;
        }
        .feat{
          list-style:none; padding:0; margin:14px 0 26px; text-align:left
        }
        .feat li{
          margin:8px 0;
          font-size:22px;                    /* 14→22px */
          color:#eee;
          line-height:1.3;
        }
        .cta{
          width:100%; height:54px; border-radius:14px;
          font-weight:900; font-size:24px;   /* 15→24px */
          cursor:pointer; transition:.18s;
          border:1px solid #fff; background:#111; color:#fff; margin-top:auto
        }
        .cta:hover{ background:#161616 }

        /* POST CHOOSEN — AYRI KÜÇÜK DİKDÖRTGEN (beyaz çerçeve + beyaz iç, siyah yazı) */
        .postCard{
          margin:18px auto 0;
          width: 220px;
          border:2px solid #fff;    /* dış çevresi beyaz */
          border-radius:8px;
          background:#fff;          /* içi beyaz */
          color:#000;               /* yazı siyah */
          font-weight:900;
          text-transform:uppercase;
          letter-spacing:.6px;
          font-size:16px;
          line-height:1;
          padding:12px 14px;
          text-align:center;
          box-shadow:0 4px 18px rgba(255,255,255,.25), 0 6px 22px rgba(0,0,0,.35);
        }

        @media(max-width:1000px){
          .frame{ max-width:90vw; min-height:auto; padding:16px }
          .divider{ display:none }
          .grid{ grid-template-columns:1fr }
          .hdr h3{ font-size:20px }
          .price{ font-size:34px }
          .feat li{ font-size:20px }
          .cta{ font-size:22px; height:52px }
          .postCard{ width:200px; font-size:15px; padding:10px 12px }
        }
      `}</style>
    </main>
  );
}

/* === BÖLME === */
function Compartment({
  title, price, features, cta, type
}:{
  title:string; price:string; features:string[]; cta:string;
  type:"premium"|"free"|"lifetime";
}){
  return(
    <div className={`compartment ${type}`}>
      {/* DİKKAT: "most choosen" burada YOK (tamamen kaldırıldı) */}
      <div className="hdr">
        <h3>{title}</h3>
        <div className="price">{price}</div>
      </div>
      <ul className="feat">{features.map((f,i)=><li key={i}>{f}</li>)}</ul>
      <button className="cta">{cta}</button>
    </div>
  );
}
