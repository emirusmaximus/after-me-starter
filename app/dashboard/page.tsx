"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { createClient } from "@supabase/supabase-js";

// İstersen lib/supabaseClient.ts kullan; burada bağımsız tutuyorum.
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

type UserMeta = { username?: string };

export default function DashboardPage() {
  const router = useRouter();
  const [username, setUsername] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    (async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { router.push("/login"); return; }
      const meta = (user.user_metadata || {}) as UserMeta;
      setUsername(meta.username || user.email?.split("@")[0] || "misafir");
      setLoading(false);
    })();
  }, [router]);

  const goHome = () => router.push("/"); // GERÇEK anasayfa
  const onLogout = async () => { await supabase.auth.signOut(); router.push("/"); };

  // Geçici: Composer gelene kadar
  const onCompose = () => alert("Composer burada açılacak (AES-GCM istemci tarafı şifreleme ile).");

  return (
    <div className="wrap">
      {/* Top Bar */}
      <header className="topbar" aria-label="Üst çubuk">
        <button className="logoBtn" onClick={goHome} aria-label="After.Me ana sayfaya dön">
          <div className="logoWrap">
            {/* Logo yoksa kare placeholder render’lar */}
            <Image
              src="/logo.svg"
              alt="After.Me"
              width={28}
              height={28}
              onError={(e) => {
                // SSR yok, client’te basit fallback rengi bırakıyoruz
              }}
            />
          </div>
          <span className="brand">After.Me</span>
        </button>

        <div className="topRight">
          <div className="userPill">@{username}</div>
          <button
            className="hamburger"
            aria-label={menuOpen ? "Menüyü kapat" : "Menüyü aç"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
          >
            <span /><span /><span />
          </button>
        </div>
      </header>

      {/* Hero — sıcak & güven */}
      <section className="hero">
        <h1>Hoş geldin, {username}.</h1>
        <p className="sub">
          İnsanlar yok olur. Sözler kalır. Burada sözlerin cihazından çıkmadan şifrelenir.
          Biz okuyamayız — maksat da bu.
        </p>
        <div className="ctaRow">
          <button className="primary" onClick={onCompose}>+ Yeni mesaj yaz</button>
          <button className="ghost" onClick={() => document.getElementById("vault")?.scrollIntoView({behavior:"smooth"})}>
            Kasayı aç
          </button>
        </div>
        <ul className="trust">
          <li>İstemci tarafı AES-256</li>
          <li>Sıfır Bilgi (Zero-knowledge)</li>
          <li>Zamanında / koşullu teslim</li>
        </ul>
      </section>

      {/* Hızlı Kartlar — sade ama dolu */}
      <section className="quick">
        <button className="qcard" onClick={onCompose}>
          <div className="ic" aria-hidden />
          <div>
            <h3>Bir mektup başlat</h3>
            <p>Önemli olanı söyle — kendi sesinle.</p>
          </div>
        </button>
        <button className="qcard" onClick={() => document.getElementById("vault")?.scrollIntoView({behavior:"smooth"})}>
          <div className="ic" aria-hidden />
          <div>
            <h3>Kasana bak</h3>
            <p>Taslakları ve planlı teslimleri gör.</p>
          </div>
        </button>
        <div className="qcard static">
          <div className="ic" aria-hidden />
          <div>
            <h3>Neden güvenli?</h3>
            <p>Sözlerini görmeyiz. Yalnızca sana aittir.</p>
          </div>
        </div>
      </section>

      {/* Memory Sparks */}
      <section className="sparks">
        <p className="eyebrow">Memory Sparks</p>
        <div className="chips">
          {[
            "Keşke daha erken öğrenseydim…",
            "18. yaşında okuyacağın mektup…",
            "Eğer ben yokken, yıldönümümüzde oku…",
            "Gelecekteki bana: lütfen hatırla…",
            "Kimseye anlatmadığım hikâye…",
          ].map((t) => (
            <button key={t} className="chip" onClick={() => alert(`Composer’a öneri olarak eklenecek: ${t}`)}>{t}</button>
          ))}
        </div>
      </section>

      {/* Vault */}
      <section id="vault" className="vault">
        <div className="vaultHead">
          <h2>Kasan</h2>
          <p className="muted">Henüz mesaj yok. İlk mektubunu bugün bırak.</p>
        </div>
        <div className="empty">
          <div className="placeholder" />
          <button className="primary" onClick={onCompose}>Yazmaya başla</button>
        </div>
      </section>

      {/* Planlar — biraz daha görünür ama nazik */}
      <section className="plans">
        <h2 className="plansTitle">Sessizce daha fazlasını koru</h2>
        <div className="planGrid">
          <div className="plan">
            <h3>Free</h3>
            <p className="muted">Başlamak için yeterli.</p>
            <ul>
              <li>Metin mesajları</li>
              <li>Temel zamanlama</li>
              <li>İstemci tarafı şifreleme</li>
            </ul>
            <button className="ghost" disabled>Aktif</button>
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

      {/* Drawer (Hamburger Menüsü) */}
      <aside className={`drawer ${menuOpen ? "open" : ""}`} aria-hidden={!menuOpen}>
        <div className="drawerHead">
          <button className="logoBtn mini" onClick={goHome} aria-label="Ana sayfa">
            <div className="logoWrap mini">
              <Image src="/logo.svg" alt="After.Me" width={22} height={22} />
            </div>
            <span className="brand">After.Me</span>
          </button>
          <button className="close" aria-label="Menüyü kapat" onClick={() => setMenuOpen(false)}>✕</button>
        </div>
        <nav className="menu">
          <button onClick={onCompose}>+ Yeni Mesaj</button>
          <button onClick={() => document.getElementById("vault")?.scrollIntoView({behavior:"smooth"})}>Kasa</button>
          <button onClick={() => alert("Güvenilen Kişiler yakında")}>Güvenilen Kişiler</button>
          <button onClick={() => alert("Zaman Çizgisi yakında")}>Zaman Çizgisi</button>
          <button onClick={() => document.querySelector(".plans")?.scrollIntoView({behavior:"smooth"})}>Planlar</button>
          <button onClick={() => alert("Ayarlar yakında")}>Ayarlar</button>
          <hr />
          <button className="danger" onClick={onLogout}>Çıkış Yap</button>
        </nav>
      </aside>

      {/* Arkaplan maske */}
      {menuOpen && <button className="backdrop" aria-label="Menüyü kapat" onClick={() => setMenuOpen(false)} />}

      <style jsx>{styles}</style>
    </div>
  );
}

/* ======= STYLES (Design tokenlara sadık) ======= */
const styles = /* css */`
.wrap{
  --bg:#050505; --fg:#f5f5f5; --card:#0b0b0b; --border:#1a1a1a; --muted:#c7c7c7;
  color:var(--fg); background:var(--bg); min-height:100dvh;
  padding:18px 16px 80px; display:grid; gap:24px; justify-items:center;
}

/* Topbar */
.topbar{ width:100%; max-width:1120px; display:flex; align-items:center; justify-content:space-between; }
.logoBtn{
  display:flex; align-items:center; gap:10px; background:transparent; border:0; cursor:pointer;
}
.logoWrap{
  width:32px; height:32px; border-radius:10px; border:1px solid var(--border); background:#0f0f0f;
  display:grid; place-items:center; box-shadow: inset 0 0 24px rgba(255,255,255,.06);
  animation: logoGlow 3s ease-in-out infinite;
}
.logoWrap:hover{ animation-play-state: paused; }
@keyframes logoGlow{ 0%{box-shadow: inset 0 0 18px rgba(255,255,255,.05)} 50%{box-shadow: inset 0 0 28px rgba(255,255,255,.09)} 100%{box-shadow: inset 0 0 18px rgba(255,255,255,.05)} }
.brand{ font-weight:600; letter-spacing:.2px; }
.topRight{ display:flex; align-items:center; gap:10px; }
.userPill{ color:var(--muted); font-size:14px; }
.hamburger{ width:38px; height:32px; border:1px solid var(--border); background:#0f0f0f; border-radius:10px; cursor:pointer;
  display:grid; place-items:center; padding:0 6px; }
.hamburger span{ display:block; width:100%; height:2px; background:#dcdcdc; margin:3px 0; border-radius:2px; }

/* Hero */
.hero{ width:100%; max-width:900px; text-align:center; display:grid; gap:10px; margin-top:4px; }
.hero h1{ margin:0; font-size:34px; line-height:1.15; }
.sub{ color:#d8d8d8; margin:0 auto; max-width:720px; }
.ctaRow{ display:flex; gap:10px; justify-content:center; flex-wrap:wrap; margin-top:8px; }
.primary{
  background:#fff; color:#000; border:0; border-radius:14px; padding:10px 14px; font-weight:700; cursor:pointer;
  transition:transform 120ms ease, filter 120ms ease;
}
.primary:hover{ transform:scale(1.04); filter:brightness(.95); }
.ghost{
  background:transparent; color:var(--fg); border:1px solid var(--border);
  padding:10px 14px; border-radius:14px; cursor:pointer; transition:transform 120ms ease, background 120ms ease;
}
.ghost:hover{ transform:scale(1.03); background:#0d0d0d; }
.trust{ list-style:none; padding:0; margin:8px 0 0 0; display:flex; gap:12px; justify-content:center; flex-wrap:wrap; color:#bdbdbd; font-size:14px; }

/* Quick cards */
.quick{ width:100%; max-width:1120px; display:grid; grid-template-columns:repeat(3,minmax(0,1fr)); gap:12px; }
.qcard{
  display:flex; gap:12px; align-items:flex-start; text-align:left; width:100%;
  border:1px solid var(--border); border-radius:16px; background:var(--card); padding:16px;
  transition:transform 120ms ease, background 120ms ease; cursor:pointer;
}
.qcard:hover{ transform:scale(1.02); background:#0e0e0e; }
.qcard.static{ cursor:default; }
.qcard.static:hover{ transform:none; background:var(--card); }
.qcard h3{ margin:0 0 4px 0; }
.qcard p{ margin:0; color:#d0d0d0; }
.ic{
  width:36px; height:36px; border-radius:10px; border:1px solid var(--border); background:#111;
  box-shadow: inset 0 0 24px rgba(255,255,255,.06);
}

/* Sparks */
.sparks{ width:100%; max-width:1120px; display:grid; gap:10px; text-align:center; }
.eyebrow{ color:var(--muted); font-size:13px; letter-spacing:.3px; }
.chips{ display:flex; gap:10px; flex-wrap:wrap; justify-content:center; }
.chip{
  border:1px solid var(--border); background:#0c0c0c; color:#ededed; border-radius:999px; padding:8px 12px;
  cursor:pointer; transition:transform 120ms ease, background 120ms ease;
}
.chip:hover{ transform:scale(1.03); background:#111; }

/* Vault */
.vault{ width:100%; max-width:1120px; display:grid; gap:12px; }
.vaultHead{ display:flex; align-items:baseline; gap:10px; }
.vault h2{ margin:0; }
.muted{ color:var(--muted); }
.empty{
  border:1px solid var(--border); background:var(--card); border-radius:18px; padding:24px;
  display:grid; gap:12px; place-items:center; text-align:center;
}
.placeholder{
  width:56px; height:56px; border-radius:14px; background:linear-gradient(180deg,#111,#0a0a0a);
  border:1px solid var(--border); box-shadow: inset 0 0 24px rgba(255,255,255,.06);
}

/* Plans */
.plans{ width:100%; max-width:1120px; display:grid; gap:12px; text-align:center; }
.plansTitle{ margin:6px 0 0 0; }
.planGrid{ display:grid; grid-template-columns:repeat(3, minmax(0,1fr)); gap:12px; }
.plan{
  border:1px solid var(--border); background:var(--card); border-radius:18px; padding:18px; text-align:left;
  position:relative; overflow:hidden;
}
.plan h3{ margin:0 0 6px 0; }
.plan ul{ margin:10px 0 0 18px; color:#d0d0d0; }
.plan .ghost{ width:100%; margin-top:12px; }
.plan .primaryLink, .plan .ghostLink{
  display:inline-block; margin-top:12px; text-decoration:none; padding:10px 14px; border-radius:14px; border:1px solid var(--border);
}
.plan .primaryLink{ background:#fff; color:#000; border:0; font-weight:700; }
.plan .primaryLink:hover{ filter:brightness(.95); }
.plan .ghostLink{ background:#0f0f0f; color:#f5f5f5; }
.plan .ghostLink:hover{ background:#141414; }
.plan.featured{ box-shadow: 0 0 24px rgba(255,255,255,.06); }
.plan.featured .ring{
  position:absolute; inset:-40% -20% auto auto; width:260px; height:260px; border-radius:50%;
  border:1px solid rgba(255,255,255,.09); pointer-events:none;
}

/* Drawer */
.drawer{
  position:fixed; top:0; right:-320px; width:300px; height:100dvh; background:#0b0b0b; border-left:1px solid var(--border);
  transition:right 180ms ease; z-index:40; display:flex; flex-direction:column; padding:14px;
}
.drawer.open{ right:0; }
.drawerHead{ display:flex; align-items:center; justify-content:space-between; }
.logoBtn.mini .logoWrap{ width:26px; height:26px; border-radius:8px; }
.logoWrap.mini{ animation:none; }
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

/* Backdrop */
.backdrop{
  position:fixed; inset:0; background:rgba(0,0,0,.35); z-index:30; border:0;
}

/* Responsive */
@media (max-width: 900px){
  .quick{ grid-template-columns:1fr; }
  .planGrid{ grid-template-columns:1fr; }
  .hero h1{ font-size:28px; }
}
`;
