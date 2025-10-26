"use client";
import Link from "next/link";

export default function InverseDashboard() {
  return (
    <main className="wrap">
      <div className="outer">
        <h1 className="title">Choose Your Plan</h1>

        <div className="plans">
          {/* PREMIUM */}
          <div className="card premium">
            <div className="ribbon">Most Chosen</div>
            <h2>Premium</h2>
            <p className="price">$2 / month</p>
            <ul>
              <li>Unlimited letters</li>
              <li>Trusted contacts (quorum)</li>
              <li>Inactivity trigger (heartbeat)</li>
            </ul>
            <Link href="#" className="btn">Upgrade Now</Link>
          </div>

          {/* FREE */}
          <div className="card free">
            <h2>Free</h2>
            <p className="price">$0</p>
            <ul>
              <li>3 letters</li>
              <li>Client-side encryption</li>
              <li>Date-based delivery</li>
            </ul>
            <Link href="#" className="btn">Continue Free</Link>
          </div>

          {/* LIFETIME */}
          <div className="card lifetime">
            <h2>Lifetime</h2>
            <p className="price">$15 (one-time)</p>
            <ul>
              <li>All Premium features</li>
              <li>Priority legacy support</li>
              <li>One-time payment</li>
            </ul>
            <Link href="#" className="btn">Buy Lifetime</Link>
          </div>
        </div>
      </div>

      <style jsx>{`
        /* Sayfa zemini siyah, içerik kontrastı yüksek beyaz */
        .wrap{
          min-height:100vh;
          background:#000;               /* (beyazın zıttı) */
          display:flex;justify-content:center;align-items:center;
          padding:40px 20px;
          color:#fff;                    /* (siyahın zıttı) */
        }

        /* Dış büyük dikdörtgen: siyah zemin, beyaz çerçeve */
        .outer{
          background:#000;               /* (beyazın zıttı) */
          border:3px solid #fff;         /* (siyahın zıttı) */
          border-radius:22px;
          max-width:1100px;width:100%;
          padding:50px 30px;
          text-align:center;
          box-shadow:0 0 32px rgba(255,255,255,0.06);
        }

        /* Tipografi hiyerarşisi (kullanılabilirlik) */
        .title{font-size:32px;margin-bottom:38px;font-weight:900;letter-spacing:.2px}
        .plans{display:grid;grid-template-columns:repeat(3,1fr);gap:24px}

        /* İç küçük dikdörtgenler: siyah arka plan, beyaz yazı */
        .card{
          position:relative;
          background:#111;               /* iç kartlar için koyu siyah */
          border:2px solid #fff;         /* beyaz kenarlık */
          border-radius:18px;
          padding:24px 20px;
          display:flex;flex-direction:column;align-items:center;text-align:center;
          transition:transform .2s ease, box-shadow .2s ease, border-color .2s;
        }
        .card:hover{transform:translateY(-6px);box-shadow:0 10px 26px rgba(255,255,255,.12);border-color:#eaeaea}

        .card h2{font-size:25px;font-weight:900;margin:0 0 8px}
        .price{font-size:22px;margin:0 0 14px}

        ul{list-style:none;margin:0 0 20px;padding:0;display:grid;gap:6px}
        li{font-size:18px;opacity:.95}

        /* CTA: zıt renk — beyaz buton, siyah yazı */
        .btn{
          background:#fff;color:#000;text-decoration:none;
          padding:12px 18px;border-radius:12px;font-weight:900;
          transition:filter .15s, transform .15s;
        }
        .btn:hover{filter:brightness(.92);transform:translateY(-1px)}

        /* Çapraz şerit: (zıt) beyaz zemin + siyah yazı */
        .ribbon{
          position:absolute;top:16px;left:-44px;
          transform:rotate(-45deg);
          background:#fff;color:#000;
          padding:6px 66px;
          font-size:13px;font-weight:900;letter-spacing:.3px;text-transform:uppercase;
          box-shadow:0 4px 12px rgba(255,255,255,.18);
        }

        /* Varyant dokunuşları (opsiyonel farklılık) */
        .premium{background:#181818}
        .free{background:#141414}
        .lifetime{
          background:#1a1a1a;overflow:hidden;
        }
        .lifetime:before{
          content:"";position:absolute;inset:0;
          background:linear-gradient(110deg, transparent 0%, rgba(255,255,255,.15) 20%, transparent 43%);
          transform:translateX(-120%);animation:shimmer 3.2s ease-in-out infinite;
        }
        @keyframes shimmer{
          0%{transform:translateX(-120%)} 60%{transform:translateX(120%)} 100%{transform:translateX(120%)}
        }

        /* Erişilebilirlik: küçük ekranda tek sütun */
        @media (max-width:900px){
          .plans{grid-template-columns:1fr}
          .outer{padding:32px 18px}
        }
      `}</style>
    </main>
  );
}
