"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@supabase/supabase-js";

// İstersen lib/supabaseClient.ts kullanabilirsin; burada bağımsız tutuyorum.
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

type UserMeta = { username?: string };

export default function DashboardPage() {
  const router = useRouter();
  const [username, setUsername] = useState<string>("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push("/login");
        return;
      }
      const meta = (user.user_metadata || {}) as UserMeta;
      setUsername(meta.username || user.email?.split("@")[0] || "friend");
      setLoading(false);
    })();
  }, [router]);

  const onLogout = async () => {
    await supabase.auth.signOut();
    router.push("/");
  };

  // Geçici: Composer henüz yoksa, burada modal yerine alert gösteriyoruz.
  const onCompose = () => {
    alert("Composer burada açılacak: AES-GCM ile istemci tarafında şifreleyip Supabase'e kaydedeceğiz.");
  };

  if (loading) {
    return (
      <div className="wrap">
        <div className="topbar">
          <button className="link" disabled>← Back to Home</button>
          <div className="right">
            <div className="badge muted">@…</div>
            <div className="avatar">•</div>
            <button className="ghost" disabled>Loading…</button>
          </div>
        </div>
        <div className="skel hero" />
        <div className="skel row" />
        <div className="skel block" />
        <style jsx>{styles}</style>
      </div>
    );
  }

  return (
    <div className="wrap">
      {/* TOP BAR */}
      <div className="topbar">
        <button className="link" onClick={() => router.push("/")}>← Back to Home</button>
        <div className="right">
          <div className="badge">@{username}</div>
          <div className="avatar" aria-label="Avatar">{username.slice(0,1).toUpperCase()}</div>
          <button className="ghost" onClick={onLogout}>Log out</button>
        </div>
      </div>

      {/* HERO — sıcak güven + sessiz lüks */}
      <section className="heroCard">
        <div className="heroInner">
          <div className="portrait" aria-hidden />
          <div className="heroText">
            <p className="eyebrow">Your private space</p>
            <h1>Welcome, {username}.</h1>
            <p className="sub">
              People vanish. Words remain. Here your words are encrypted before they leave your device.
              We can’t read them — and that’s the point.
            </p>
            <div className="ctaRow">
              <button className="primary" onClick={onCompose}>+ Write a new message</button>
              <button className="ghost" onClick={() => document.getElementById("vault")?.scrollIntoView({behavior:"smooth"})}>
                Open your vault
              </button>
            </div>
            <div className="trustRow" role="note">
              <span className="dot" /> Client-side AES-256
              <span className="sep">•</span> Zero-knowledge
              <span className="sep">•</span> Scheduled delivery
            </div>
          </div>
        </div>
      </section>

      {/* QUICK ACTIONS — sade ama dolu */}
      <section className="quick">
        <button className="qcard" onClick={onCompose}>
          <div className="ic quill" /> <div>
            <h3>Start a letter</h3>
            <p>Say the thing that matters — in your own voice.</p>
          </div>
        </button>
        <button className="qcard" onClick={() => document.getElementById("vault")?.scrollIntoView({behavior:"smooth"})}>
          <div className="ic vault" /> <div>
            <h3>Your vault</h3>
            <p>Keep, schedule, and review your messages.</p>
          </div>
        </button>
        <div className="qcard static">
          <div className="ic lock" /> <div>
            <h3>Why it’s safe</h3>
            <p>We can’t read your words. They belong only to you.</p>
          </div>
        </div>
      </section>

      {/* MEMORY SPARKS — yazdıran kıvılcımlar */}
      <section className="sparks">
        <p className="eyebrow">Memory Sparks</p>
        <div className="chips">
          {[
            "A lesson I wish I learned earlier…",
            "For my child on their 18th birthday…",
            "If I’m gone, read this on our anniversary…",
            "To my future self: please remember…",
            "The story I never told anyone…",
          ].map((t) => (
            <button key={t} className="chip" onClick={() => alert(`Composer’a öneri olarak eklenecek: ${t}`)}>
              {t}
            </button>
          ))}
        </div>
      </section>

      {/* VAULT — boş durum (ileride mesaj listesine dönüşür) */}
      <section id="vault" className="vault">
        <div className="vaultHead">
          <h2>Your Vault</h2>
          <p className="muted">No messages yet. Start your first letter.</p>
        </div>
        <div className="empty">
          <div className="homeIcon" />
          <button className="primary" onClick={onCompose}>Start writing</button>
        </div>
      </section>

      {/* GENTLE UPSELL — en altta, beyaz gürültü yok */}
      <section className="upsell">
        <div className="upsellInner">
          <div className="upCopy">
            <h3>Preserve more memories, quietly.</h3>
            <p>Premium lifts your limits and unlocks scheduled delivery — no rush, no noise.</p>
          </div>
          <a className="softBtn" href="https://checkout.stripe.com/c/test_..." target="_blank" rel="noreferrer">
            Consider Premium →
          </a>
        </div>
        <p className="micro">© 2025 After.Me — A product of CobsVault Labs</p>
      </section>

      <style jsx>{styles}</style>
    </div>
  );
}

/* DESIGN TOKENS’A SADIK STYLED-JSX */
const styles = /* css */ `
.wrap{
  --bg:#050505; --fg:#f5f5f5; --card:#0b0b0b; --border:#1a1a1a; --muted:#c7c7c7;
  color:var(--fg); background:var(--bg); min-height:100dvh;
  padding:24px 20px 72px; display:grid; gap:28px; justify-items:center;
}
.topbar{ width:100%; max-width:1100px; display:flex; justify-content:space-between; align-items:center; }
.right{ display:flex; align-items:center; gap:10px; }
.link{
  background:transparent; color:var(--fg); border:1px solid var(--border);
  padding:8px 12px; border-radius:12px; cursor:pointer; transition:transform 120ms ease, background 120ms ease;
}
.link:hover{ transform:scale(1.03); background:#0c0c0c; }
.badge{ color:var(--muted); font-size:14px; }
.avatar{
  width:32px; height:32px; border-radius:999px; background:#111; border:1px solid var(--border);
  display:grid; place-items:center; font-weight:700;
}
.ghost{
  background:transparent; color:var(--fg); border:1px solid var(--border);
  padding:8px 12px; border-radius:12px; cursor:pointer; transition:transform 120ms ease, background 120ms ease;
}
.ghost:hover{ transform:scale(1.03); background:#0d0d0d; }

.heroCard{ width:100%; max-width:1100px; }
.heroInner{
  border:1px solid var(--border); border-radius:20px; padding:20px;
  background: radial-gradient(140% 120% at 50% -10%, rgba(255,255,255,0.04), rgba(0,0,0,0)) , var(--card);
  box-shadow: 0 0 24px rgba(255,255,255,0.05);
  display:grid; grid-template-columns: 120px 1fr; gap:18px; align-items:center;
}
.portrait{
  width:100%; height:120px; border-radius:16px;
  background: linear-gradient(180deg,#111,#0a0a0a); border:1px solid var(--border);
  box-shadow: inset 0 0 24px rgba(255,255,255,.05);
}
.heroText h1{ margin:0; font-size:36px; line-height:1.1; }
.eyebrow{ color:var(--muted); font-size:13px; margin:0 0 4px 0; letter-spacing:.3px; }
.sub{ color:#d9d9d9; margin:8px 0 0 0; max-width:720px; }
.ctaRow{ display:flex; gap:10px; flex-wrap:wrap; margin-top:12px; }
.primary{
  background:#fff; color:#000; border:none; border-radius:14px; padding:10px 14px; font-weight:700; cursor:pointer;
  transition:transform 120ms ease, filter 120ms ease;
}
.primary:hover{ transform:scale(1.04); filter:brightness(.95); }
.trustRow{ margin-top:10px; color:#bdbdbd; display:flex; align-items:center; gap:10px; flex-wrap:wrap; }
.dot{ width:6px; height:6px; background:#bdbdbd; border-radius:999px; display:inline-block; }
.sep{ opacity:.5; }

.quick{
  width:100%; max-width:1100px; display:grid; grid-template-columns: repeat(3, minmax(0,1fr)); gap:14px;
}
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
.ic{ width:36px; height:36px; border-radius:10px; border:1px solid var(--border); background:#101010; box-shadow: inset 0 0 24px rgba(255,255,255,.05); }
.ic.quill{ background-image: radial-gradient(circle at 70% 30%, rgba(255,255,255,.08), transparent 40%); }
.ic.vault{ background-image: radial-gradient(circle at 30% 70%, rgba(255,255,255,.08), transparent 40%); }
.ic.lock{ background-image: radial-gradient(circle at 50% 50%, rgba(255,255,255,.08), transparent 40%); }

.sparks{ width:100%; max-width:1100px; text-align:center; display:grid; gap:10px; }
.chips{ display:flex; gap:10px; flex-wrap:wrap; justify-content:center; }
.chip{
  border:1px solid var(--border); background:#0c0c0c; color:#ededed; border-radius:999px; padding:8px 12px;
  cursor:pointer; transition:transform 120ms ease, background 120ms ease;
}
.chip:hover{ transform:scale(1.03); background:#111; }

.vault{ width:100%; max-width:1100px; display:grid; gap:12px; }
.vaultHead{ display:flex; align-items:baseline; gap:12px; }
.vault h2{ margin:0; }
.muted{ color:var(--muted); }
.empty{
  border:1px solid var(--border); background:var(--card); border-radius:18px; padding:24px;
  display:grid; gap:12px; place-items:center; text-align:center;
}
.homeIcon{
  width:56px; height:56px; border-radius:14px; background:linear-gradient(180deg,#111,#0a0a0a);
  border:1px solid var(--border); box-shadow: inset 0 0 24px rgba(255,255,255,.06);
}

.upsell{ width:100%; max-width:1100px; }
.upsellInner{
  border:1px solid var(--border); background:linear-gradient(180deg, rgba(255,255,255,0.02), rgba(0,0,0,0)) , var(--card);
  border-radius:18px; padding:16px; display:flex; align-items:center; justify-content:space-between; gap:14px; flex-wrap:wrap;
}
.upCopy h3{ margin:0 0 6px 0; }
.upCopy p{ margin:0; color:#d0d0d0; }
.softBtn{
  display:inline-block; padding:10px 14px; border-radius:12px; border:1px solid var(--border);
  text-decoration:none; background:#111; color:#f5f5f5; transition:transform 120ms ease, background 120ms ease;
}
.softBtn:hover{ transform:scale(1.03); background:#141414; }
.micro{ color:var(--muted); margin-top:8px; text-align:center; font-size:12px; }

.skel{ width:100%; max-width:1100px; border:1px solid var(--border); background:#0a0a0a; border-radius:18px; animation:pulse 1.2s ease-in-out infinite; }
.skel.hero{ height:160px; }
.skel.row{ height:80px; }
.skel.block{ height:180px; }
@keyframes pulse{ 0%{opacity:.6} 50%{opacity:1} 100%{opacity:.6} }

@media (max-width: 860px){
  .heroInner{ grid-template-columns: 1fr; }
  .portrait{ height:80px; }
  .quick{ grid-template-columns: 1fr; }
  .heroText h1{ font-size:30px; }
}
`;
