"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

type UserMeta = { username?: string };

export default function GhostVaultDashboardV3() {
  const router = useRouter();
  const [username, setUsername] = useState<string>("…");
  const [loading, setLoading] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);

  // demo metrikler – backend bağlanınca bu kısım supabase sorgularına dönecek
  const [stats, setStats] = useState({ letters: 0, scheduled: 0, delivered: 0 });
  const [accounts, setAccounts] = useState([
    { name: "Google", connected: true },
    { name: "Instagram", connected: false },
    { name: "X (Twitter)", connected: true },
  ]);
  const nextCheckIn = "12 Kasım 2025"; // örnek; edge function ile hesaplanacak

  useEffect(() => {
    (async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { router.push("/login"); return; }
      const meta = (user.user_metadata || {}) as UserMeta;
      const u = meta.username || user.email?.split("@")[0] || "misafir";
      setUsername(u);
      // TODO: supabase.from("messages") ile gerçek sayıları çek
      setStats({ letters: 0, scheduled: 0, delivered: 0 });
      setLoading(false);
    })();
  }, [router]);

  const onLogout = async () => { await supabase.auth.signOut(); router.push("/"); };

  // geçici – composer gelene kadar
  const onCompose = () => alert("Composer burada açılacak (AES-GCM istemci tarafı şifreleme).");

  return (
    <div className="wrap">
      {/* TOPBAR — logo: kesinlikle anasayfa (`/`) */}
      <header className="topbar" aria-label="Üst çubuk">
        <Link className="logoBtn" href="/" aria-label="Ana sayfa">
          <div className="logoWrap">
            <Image src="/logo.svg" alt="After.Me" width={28} height={28} priority />
          </div>
          <span className="brand">After.Me</span>
        </Link>

        <div className="topRight">
          {!loading && <div className="userPill">@{username}</div>}
          <button
            className="hamburger"
            aria-label={menuOpen ? "Menüyü kapat" : "Menüyü aç"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(v => !v)}
          >
            <span /><span /><span />
          </button>
        </div>
      </header>

      {/* HERO — hikâye + sıcak güven */}
      <section className="hero">
        <div className="halo" aria-hidden />
        <p className="eyebrow">GhostVault — Your Digital Legacy</p>
        <h1>Hoş geldin, {loading ? "…" : username}.</h1>
        <p className="sub">
          “Bir gün gidersen, dijital kimliğini kim devralacak?” <br/>
          Sözlerin cihazından çıkmadan şifrelenir. Biz okuyamayız — maksat da bu.
        </p>
        <div className="ctaRow">
          <button className="primary" onClick={onCompose}>+ Yeni mesaj yaz</button>
          <button
            className="ghost"
            onClick={() => document.getElementById("vault")?.scrollIntoView({ behavior: "smooth" })}
          >
            Kasayı aç
          </button>
        </div>
        <ul className="trust">
          <li>İstemci tarafı AES-256</li>
          <li>Sıfır Bilgi (Zero-knowledge)</li>
          <li>Zamanında / koşullu teslim</li>
        </ul>
      </section>

      {/* STATS — premium, sade, okunaklı */}
      <section className="stats">
        <StatCard label="Yazılmış Mektup" value={stats.letters} />
        <StatCard label="Planlı Teslim" value={stats.scheduled} />
        <StatCard label="Teslim Edildi" value={stats.delivered} />
      </section>

      {/* İKİLİ GRID — Kasa önizleme + Bağlı hesaplar */}
      <section className="dual">
        <div className="panel vault" id="vault">
          <h2>Kasan</h2>
          <p className="muted">{stats.letters === 0 ? "Henüz mesaj yok. İlk mektubunu bugün bırak." : "Son mektupların buraya düşer."}</p>
          <div className="empty">
            <div className="placeholder" />
            <button className="primary" onClick={onCompose}>Yazmaya başla</button>
          </div>
          <div className="timeline">
            <div className="tTitle">Zaman Çizgisi</div>
            <div className="tLine">
              <span className="dot past" /> <span>“Anneme not” — Teslim edildi</span>
            </div>
            <div className="tLine">
              <span className="dot future" /> <span>“18. yaş mektubu” — 2033’e planlandı</span>
            </div>
          </div>
        </div>

        <div className="panel accounts">
          <h2>Bağlı Hesaplar</h2>
          <p className="muted">“Eğer 1 yıl giriş yapmazsam…” kuralı için tavsiye edilir.</p>
          <ul className="accList">
            {accounts.map(acc => (
              <li key={acc.name}>
                <span className={`badge ${acc.connected ? "ok" : "no"}`} aria-hidden />
                <span>{acc.name}</span>
                <button className={acc.connected ? "ghost small" : "primary small"}>
                  {acc.connected ? "Bağlandı" : "Bağla"}
                </button>
              </li>
            ))}
          </ul>
          <div className="checkin">
            <div className="mini">Bir sonraki “yaşıyor musun?” e-postası</div>
            <div className="date">{nextCheckIn}</div>
            <p className="muted sm">E-postadaki linke tıklamazsan işaretlediğin kişilere vasiyetin teslim edilir.</p>
          </div>
        </div>
      </section>

      {/* PLANLAR — nazik, ama görünür */}
      <section className="plans">
        <h2 className="plansTitle">Digital continuity is peace of mind.</h2>
        <div className="planGrid">
          <div className="plan">
            <h3>Free</h3>
            <p className="muted">Başlamak için yeterli.</p>
            <ul>
              <li>Metin mesajları</li>
              <li>Temel zamanlama</li>
              <li>İstemci tarafı şifreleme</li>
            </ul>
            <button className="ghost">Devam et</button>
          </div>
          <div className="plan featured">
            <div className="ring" aria-hidden />
            <h3>Premium</h3>
            <p className="muted">Daha çok anı, daha çok kontrol.</p>
            <ul>
              <li>Gelişmiş zamanlama</li>
              <li>Öncelikli teslim kuyruğu</li>
              <li>Güvenilen kişiler (2-of-N)</li>
            </ul>
            <a className="primaryLink" href="https://checkout.stripe.com/c/test_..." target="_blank" rel="noreferrer">
              Premium’a geç →
            </a>
          </div>
          <div className="plan">
            <h3>Lifetime</h3>
            <p className="muted">Bir kere, sonsuza dek.</p>
            <ul>
              <li>Tüm Premium özellikleri</li>
              <li>Ömür boyu erişim</li>
              <li>Öncelikli destek</li>
            </ul>
            <a className="ghostLink" href="https://checkout.stripe.com/c/test_..." target="_blank" rel="noreferrer">
              Satın al →
            </a>
          </div>
        </div>
      </section>

      {/* HAMBURGER DRAWER */}
      <aside className={`drawer ${menuOpen ? "open" : ""}`} aria-hidden={!menuOpen}>
        <div className="drawerHead">
          <Link className="logoBtn mini" href="/" aria-label="Ana sayfa">
            <div className="logoWrap mini">
              <Image src="/logo.svg" alt="After.Me" width={22} height={22} />
            </div>
            <span className="brand">After.Me</span>
          </Link>
          <button className="close" aria-label="Menüyü kapat" onClick={() => setMenuOpen(false)}>✕</button>
        </div>
        <nav className="menu">
          <button onClick={onCompose}>+ Yeni Mesaj</button>
          <button onClick={() => document.getElementById("vault")?.scrollIntoView({ behavior: "smooth" })}>Kasa</button>
          <button onClick={() => alert("Güvenilen Kişiler yakında")}>Güvenilen Kişiler</button>
          <button onClick={() => alert("Zaman Çizgisi yakında")}>Zaman Çizgisi</button>
          <button onClick={() => document.querySelector(".plans")?.scrollIntoView({ behavior: "smooth" })}>Planlar</button>
          <button onClick={() => alert("Ayarlar yakında")}>Ayarlar</button>
          <hr />
          <button className="danger" onClick={onLogout}>Çıkış Yap</button>
        </nav>
      </aside>
      {menuOpen && <button className="backdrop" aria-label="Menüyü kapat" onClick={() => setMenuOpen(false)} />}

      <style jsx>{styles}</style>
    </div>
  );
}

/** küçük stat kartı bileşeni (aynı dosyada tutuyoruz) */
function StatCard({ label, value }: { label: string; value: number }) {
  return (
    <div className="stat">
      <div className="value">{value}</div>
      <div className="label">{label}</div>
      <style jsx>{`
        .stat{
          border:1px solid var(--border); background:var(--card); border-radius:16px; padding:16px;
          display:grid; gap:6px; place-items:center; text-align:center;
          animation: rise .6s ease var(--delay, 0ms) both;
        }
        .value{ font-size:28px; font-weight:700; letter-spacing:.3px; }
        .label{ color:var(--muted); font-size:14px; }
        @keyframes rise{
          from{ transform: translateY(8px); opacity:0 }
          to{ transform: translateY(0); opacity:1 }
        }
        @media (prefers-reduced-motion: reduce){
          .stat{ animation: none }
        }
      `}</style>
    </div>
  );
}

/* ===== styled-jsx (tokenlara sadık, nazik animasyonlar) ===== */
const styles = /* css */`
.wrap{
  --bg:#050505; --fg:#f5f5f5; --card:#0b0b0b; --border:#1a1a1a; --muted:#c7c7c7;
  color:var(--fg); background:var(--bg); min-height:100dvh;
  padding:18px 16px 84px; display:grid; gap:24px; justify-items:center;
}

/* topbar */
.topbar{ width:100%; max-width:1120px; display:flex; align-items:center; justify-content:space-between; }
.logoBtn{ display:flex; align-items:center; gap:10px; text-decoration:none; color:var(--fg); }
.logoWrap{
  width:32px; height:32px; border-radius:10px; border:1px solid var(--border); background:#0f0f0f;
  display:grid; place-items:center; box-shadow: inset 0 0 24px rgba(255,255,255,.06);
  animation: logoGlow 3800ms ease-in-out infinite;
}
.logoWrap:hover{ animation-play-state: paused; }
@keyframes logoGlow{
  0%{box-shadow: inset 0 0 18px rgba(255,255,255,.05)}
  50%{box-shadow: inset 0 0 28px rgba(255,255,255,.09)}
  100%{box-shadow: inset 0 0 18px rgba(255,255,255,.05)}
}
.brand{ font-weight:600; letter-spacing:.2px; }
.topRight{ display:flex; align-items:center; gap:10px; }
.userPill{ color:var(--muted); font-size:14px; }
.hamburger{
  width:38px; height:32px; border:1px solid var(--border); background:#0f0f0f; border-radius:10px; cursor:pointer;
  display:grid; place-items:center; padding:0 6px;
}
.hamburger span{ display:block; width:100%; height:2px; background:#dcdcdc; margin:3px 0; border-radius:2px; }

/* hero */
.hero{ width:100%; max-width:980px; text-align:center; display:grid; gap:10px; margin-top:4px; position:relative; }
.eyebrow{ color:var(--muted); font-size:13px; letter-spacing:.3px; }
.hero h1{ margin:0; font-size:34px; line-height:1.15; animation: fadeUp .6s ease both; }
.sub{ color:#d8d8d8; margin:0 auto; max-width:740px; animation: fadeUp .7s ease 60ms both; }
.ctaRow{ display:flex; gap:10px; justify-content:center; flex-wrap:wrap; margin-top:8px; animation: fadeUp .7s ease 90ms both; }
.primary{
  background:#fff; color:#000; border:0; border-radius:14px; padding:10px 14px; font-weight:700; cursor:pointer;
  transition: transform 120ms ease, filter 120ms ease;
}
.primary:hover{ transform: scale(1.04); filter: brightness(.95); }
.ghost{
  background:transparent; color:var(--fg); border:1px solid var(--border);
  padding:10px 14px; border-radius:14px; cursor:pointer; transition: transform 120ms ease, background 120ms ease;
}
.ghost:hover{ transform: scale(1.03); background:#0d0d0d; }
.trust{ list-style:none; padding:0; margin:8px 0 0 0; display:flex; gap:12px; justify-content:center; flex-wrap:wrap; color:#bdbdbd; font-size:14px; animation: fadeUp .7s ease 120ms both; }

.halo{
  position:absolute; inset:auto 0 -18px 0; height:2px; background:linear-gradient(90deg, transparent, rgba(255,255,255,.25), transparent);
  animation: sweep 3.6s ease-in-out infinite;
}
@keyframes sweep{
  0%{transform: translateX(-40%); opacity:.0}
  50%{transform: translateX(0%); opacity:1}
  100%{transform: translateX(40%); opacity:.0}
}
@keyframes fadeUp{ from{ opacity:0; transform: translateY(6px)} to{ opacity:1; transform: translateY(0)} }
@media (prefers-reduced-motion: reduce){
  .halo{ animation:none }
  .hero h1, .sub, .ctaRow, .trust{ animation:none }
  .logoWrap{ animation:none }
}

/* stats */
.stats{ width:100%; max-width:1120px; display:grid; grid-template-columns: repeat(3,minmax(0,1fr)); gap:12px; }

/* double panel */
.dual{ width:100%; max-width:1120px; display:grid; grid-template-columns: 1.4fr .9fr; gap:12px; align-items:start; }
.panel{
  border:1px solid var(--border); background:var(--card); border-radius:18px; padding:18px; position:relative;
  animation: fadeUp .6s ease both;
}
.panel h2{ margin:0 0 4px 0; }
.muted{ color:var(--muted); }
.empty{
  border:1px dashed var(--border); border-radius:14px; padding:20px; display:grid; place-items:center; gap:10px; text-align:center;
  margin:10px 0 14px 0;
}
.placeholder{
  width:56px; height:56px; border-radius:14px; background:linear-gradient(180deg,#111,#0a0a0a);
  border:1px solid var(--border); box-shadow: inset 0 0 24px rgba(255,255,255,.06);
}

/* timeline */
.timeline{ display:grid; gap:8px; }
.tTitle{ color:#eaeaea; font-weight:600; margin:6px 0 2px 0; }
.tLine{ display:flex; align-items:center; gap:10px; color:#d0d0d0; }
.dot{ width:10px; height:10px; border-radius:999px; display:inline-block; }
.dot.past{ background:#2a2a2a; border:1px solid #333; }
.dot.future{ background:#fafafa; border:1px solid #bbb; }

/* accounts */
.accList{ list-style:none; padding:0; margin:8px 0 0 0; display:grid; gap:8px; }
.accList li{ display:flex; align-items:center; justify-content:space-between; gap:10px; border:1px solid var(--border); border-radius:12px; padding:10px 12px; }
.badge{ width:10px; height:10px; border-radius:999px; display:inline-block; margin-right:4px; }
.badge.ok{ background:#b8f5c2; border:1px solid #79c08b; }
.badge.no{ background:#f5d0b8; border:1px solid #c08b79; }
.small{ padding:8px 12px; border-radius:12px; font-size:14px; }
.primary.small{ background:#fff; color:#000; border:0; }
.primary.small:hover{ filter:brightness(.95) }
.ghost.small{ background:transparent; color:var(--fg); border:1px solid var(--border); }
.ghost.small:hover{ background:#111 }

/* check-in */
.checkin{
  margin-top:12px; border:1px solid var(--border); border-radius:14px; padding:12px;
  background: radial-gradient(140% 120% at 50% -10%, rgba(255,255,255,0.04), rgba(0,0,0,0)), var(--card);
}
.mini{ color:#cfcfcf; font-size:13px; }
.date{ font-weight:700; margin:4px 0 4px 0; }

/* plans */
.plans{ width:100%; max-width:1120px; display:grid; gap:12px; text-align:center; }
.plansTitle{ margin:6px 0 0 0; }
.planGrid{ display:grid; grid-template-columns:repeat(3, minmax(0,1fr)); gap:12px; }
.plan{
  border:1px solid var(--border); background:var(--card); border-radius:18px; padding:18px; text-align:left; position:relative; overflow:hidden;
  transition: transform 120ms ease, background 120ms ease;
}
.plan:hover{ transform: translateY(-2px); background:#0d0d0d; }
.plan h3{ margin:0 0 6px 0; }
.plan ul{ margin:10px 0 0 18px; color:#d0d0d0; }
.primaryLink, .ghostLink{
  display:inline-block; margin-top:12px; text-decoration:none; padding:10px 14px; border-radius:14px; border:1px solid var(--border);
}
.primaryLink{ background:#fff; color:#000; border:0; font-weight:700; }
.primaryLink:hover{ filter:brightness(.95); }
.ghostLink{ background:#0f0f0f; color:#f5f5f5; }
.ghostLink:hover{ background:#141414; }
.plan.featured{ box-shadow: 0 0 24px rgba(255,255,255,.06); }
.plan.featured .ring{
  position:absolute; inset:-40% -20% auto auto; width:260px; height:260px; border-radius:50%;
  border:1px solid rgba(255,255,255,.09); pointer-events:none;
}

/* drawer */
.drawer{
  position:fixed; top:0; right:-320px; width:300px; height:100dvh; background:#0b0b0b; border-left:1px solid var(--border);
  transition:right 180ms ease; z-index:40; display:flex; flex-direction:column; padding:14px;
}
.drawer.open{ right:0; }
.drawerHead{ display:flex; align-items:center; justify-content:space-between; }
.logoBtn.mini .logoWrap{ width:26px; height:26px; border-radius:8px; }
.close{
  background:#111; color:#eee; border:1px solid var(--border); border-radius:10px; padding:6px 10px; cursor:pointer;
}
.menu{ display:grid; gap:8px; margin-top:10px; }
.menu button{
  text-align:left; padding:10px 12px; border:1px solid var(--border); background:#0f0f0f; color:#f5f5f5; border-radius:12px; cursor:pointer;
}
.menu button:hover{ background:#141414; }
.menu .danger{ border-color:#3a1a1a; background:#140f0f; }
.menu hr{ border:0; height:1px; background:#1a1a1a; margin:8px 0; }

/* backdrop */
.backdrop{ position:fixed; inset:0; background:rgba(0,0,0,.35); z-index:30; border:0; }

/* responsive */
@media (max-width: 980px){
  .stats{ grid-template-columns: 1fr; }
  .dual{ grid-template-columns: 1fr; }
  .planGrid{ grid-template-columns: 1fr; }
  .hero h1{ font-size: 28px; }
}
`;
