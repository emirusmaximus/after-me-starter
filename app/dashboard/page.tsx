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

      {/* PLANS (kareli rehberli versiyon) */}
      <section className="plans">
        <div className="container center">
          <h2 className="ph-title">Plans</h2>
          <p className="ph-sub">Choose your legacy.</p>
        </div>

        {/* ORTALI ve KISA dış çerçeve + grid overlay */}
        <div className="frame grid-bg">
          {/* Dikey beyaz ayırıcı çizgiler */}
          <span className="divider d1" aria-hidden />
          <span className="divider d2" aria-hidden />

          <div className="grid">
            <Compartment
              title="Premium"
              price="$2/mo"
              features={["Encrypted vault", "Priority support", "Early access"]}
              cta="Upgrade 💎"
              type="premium"
              showBadge
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
        :root{
          --bg:#000; --fg:#fff; --muted:#BBB;

          /* === MOST CHOOSEN konum/ölçü ayarları (koordinat ver için) === */
          --badge-top:-18px;       /* ÜST kenara göre px */
          --badge-left:-22px;      /* SOL kenara göre px */
          --badge-rotate:-32deg;   /* açı */
          --badge-width: 210px;    /* genişlik */
        }

        *{ box-sizing:border-box }
        body, .dashboard{ background:var(--bg); color:var(--fg); font-family:system-ui,-apple-system,Segoe UI,Roboto,Manrope,sans-serif }

        .container{ max-width:1100px; margin:0 auto; padding:0 20px }
        .top{ border-bottom:1px solid #111; padding:14px 0; background:rgba(0,0,0,.6); backdrop-filter:blur(6px) }
        .topin{ display:flex; align-items:center; justify-content:space-between }
        .brand{ display:flex; align-items:center; gap:8px; font-weight:800 }
        .nav a{ color:#9aa; margin-left:16px } .nav a:hover{ color:#fff }

        .hero{ text-align:center; padding:34px 0 16px }
        .muted{ color:var(--muted) }
        .progress{ width:280px; margin:10px auto; height:6px; border:1px solid #222; background:#050505 }
        .progress span{ display:block; height:100%; background:#fff }

        .plans{ text-align:center; padding:26px 0 44px }
        .ph-title{ font-size:28px; font-weight:800; margin-bottom:4px }
        .ph-sub{ color:var(--muted); margin-bottom:16px; font-weight:600 }

        /* === DIŞ ÇERÇEVE (kısa, ortalı) + GRID OVERLAY === */
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
          isolation:isolate;
        }
        /* Kareli zemin (20px ince grid + 100px kalın grid) */
        .grid-bg::before{
          content:"";
          position:absolute; inset:0;
          background:
            linear-gradient(transparent 19px, rgba(255,255,255,.07) 20px),
            linear-gradient(90deg, transparent 19px, rgba(255,255,255,.07) 20px),
            linear-gradient(transparent 99px, rgba(255,255,255,.14) 100px),
            linear-gradient(90deg, transparent 99px, rgba(255,255,255,.14) 100px);
          background-size: 20px 20px, 20px 20px, 100px 100px, 100px 100px;
          z-index:0;
          pointer-events:none;
        }

        /* DİKEY BEYAZ AYIRICI ÇİZGİLER (üstten alta) */
        .divider{
          position:absolute;
          top:20px; bottom:20px;
          width:0; border-left:2px solid #fff;
          z-index:3; /* içerik üzerinde */
        }
        .d1{ left:calc(33.333%) }
        .d2{ left:calc(66.666%) }

        /* 3 bölme alanı */
        .grid{
          display:grid;
          grid-template-columns:repeat(3,1fr);
          align-items:stretch;
          min-height:380px;
          position:relative;
          z-index:2;
        }

        /* ——— DEV PUNTO İSTEDİĞİN GİBİ ———
           Başlıklar: 45px
           Diğer tüm metinler (fiyat, özellikler, CTA): 36px
        */
        .compartment{
          background:transparent;
          padding:22px 22px 24px;
          display:flex;
          flex-direction:column;
          position:relative;
        }
        .hdr h3{
          font-size:45px;              /* BAŞLIKLAR */
          text-transform:uppercase;
          font-weight:1000;
          margin:0 0 14px;
          line-height:1.05;
        }
        .price{
          font-size:36px;              /* DİĞER METİNLER */
          font-weight:900;
          margin-bottom:14px;
          line-height:1.1;
        }
        .feat{
          list-style:none; padding:0; margin:12px 0 24px; text-align:left
        }
        .feat li{
          margin:10px 0;
          font-size:36px;              /* DİĞER METİNLER */
          color:#eee;
          line-height:1.25;
        }
        .cta{
          width:100%; height:64px; border-radius:14px;
          font-weight:1000; font-size:36px;  /* DİĞER METİNLER */
          cursor:pointer; transition:.18s;
          border:2px solid #fff; background:#111; color:#fff; margin-top:auto
        }
        .cta:hover{ background:#161616 }

        /* === "most choosen" küçük beyaz DİKDÖRTGEN — Premium üstüne ÇAPRAZ ===
           Konum ve açı değişkenlerden: --badge-top / --badge-left / --badge-rotate / --badge-width
        */
        .badge{
          position:absolute;
          top: var(--badge-top);
          left: var(--badge-left);
          width: var(--badge-width);
          transform: rotate(var(--badge-rotate));
          transform-origin: left top;
          z-index:5;
          background:#fff;      /* içi beyaz */
          color:#000;           /* yazı siyah */
          border:2px solid #fff;
          border-radius:8px;
          font-weight:1000;
          text-transform:uppercase;
          letter-spacing:.6px;
          font-size:18px;
          line-height:1;
          text-align:center;
          padding:12px 14px;
          box-shadow:0 6px 22px rgba(0,0,0,.45);
          pointer-events:none;
        }

        @media(max-width:1000px){
          .frame{ max-width:90vw; min-height:auto; padding:16px }
          .divider{ display:none }
          .grid{ grid-template-columns:1fr }
          .hdr h3{ font-size:38px }
          .price, .feat li, .cta{ font-size:30px }
          .badge{ font-size:16px; }
        }
      `}</style>
    </main>
  );
}

/* === Bölme === */
function Compartment({
  title, price, features, cta, type, showBadge
}:{
  title:string; price:string; features:string[]; cta:string;
  type:"premium"|"free"|"lifetime"; showBadge?:boolean;
}){
  return(
    <div className={`compartment ${type}`}>
      {/* Premium'un ÜZERİNE çapraz beyaz küçük dikdörtgen */}
      {type==="premium" && showBadge ? <div className="badge">most choosen</div> : null}

      <div className="hdr">
        <h3>{title}</h3>
        <div className="price">{price}</div>
      </div>

      <ul className="feat">{features.map((f,i)=><li key={i}>{f}</li>)}</ul>
      <button className="cta">{cta}</button>
    </div>
  );
}
