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

      {/* OUTER FRAME (kısaltılmış) */}
      <section className="plans">
        <div className="container center">
          <h2 className="ph-title">Plans</h2>
          <p className="ph-sub">Choose your legacy.</p>
        </div>

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

        /* KÜÇÜK ve ORTALI DIŞ ÇERÇEVE (kısaltılmış) */
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

        /* İÇ YAZILAR +6px BÜYÜTÜLDÜ */
        .compartment{
          background:#000;
          padding:16px 18px 22px;
          display:flex;
          flex-direction:column;
          justify-content:flex-start;
          position:relative;
        }
        .hdr h3{ font-size:18px; text-transform:uppercase; font-weight:900; margin:0 0 8px }   /* 12→18 */
        .price{ font-size:32px; font-weight:900; margin-bottom:10px }                          /* 26→32 */
        .feat{ list-style:none; padding:0; margin:12px 0 22px; text-align:left }
        .feat li{ margin:7px 0; font-size:20px; color:#ddd }                                   /* 14→20 */
        .cta{
          width:100%; height:48px; border-radius:12px;
          font-weight:900; font-size:21px;                                                     /* 15→21 */
          cursor:pointer; transition:.18s;
          border:1px solid #fff; background:#111; color:#fff; margin-top:auto
        }
        .cta:hover{ background:#161616 }

        /* PREMIUM üzerindeki küçük beyaz dikdörtgen etiket (most choosen) */
        .badge{
          position:absolute;
          top:-14px;                 /* üst kenarın HEMEN üstünden başlasın */
          left:-14px;                /* sol kenarı keserek girsin */
          width:180px;
          transform:rotate(-35deg);  /* sol-üstten sağ-alt yönüne çapraz */
          transform-origin:left top;
          z-index:30;
          background:#fff;           /* içi beyaz */
          color:#000;                /* yazı siyah */
          border:2px solid #fff;     /* dış çevresi beyaz */
          border-radius:6px;
          text-transform:uppercase;
          font-weight:900;
          font-size:14px;
          letter-spacing:.6px;
          text-align:center;
          padding:10px 0;
          box-shadow:0 6px 22px rgba(0,0,0,.45);
          pointer-events:none;
        }

        @media(max-width:1000px){
          .frame{ max-width:90vw; min-height:auto; padding:16px }
          .divider{ display:none }
          .grid{ grid-template-columns:1fr }
          .badge{ width:160px; font-size:13px; top:-12px; left:-12px; transform:rotate(-33deg) }
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
      {/* Premium’un üst & sol kenarını çapraz kesecek beyaz etiket */}
      {type==="premium" ? <div className="badge">most choosen</div> : null}

      <div className="hdr">
        <h3>{title}</h3>
        <div className="price">{price}</div>
      </div>
      <ul className="feat">{features.map((f,i)=><li key={i}>{f}</li>)}</ul>
      <button className="cta">{cta}</button>
    </div>
  );
}
