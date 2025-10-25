"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@supabase/supabase-js";

// Not: İstersen ../../lib/supabaseClient importunu kullan.
// Burada bağımlılık sızıntısı olmasın diye local client oluşturuyoruz.
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

type UserMeta = {
  username?: string;
};

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

  const onCompose = () => {
    // Geçici: Composer modal henüz yoksa /dashboard#compose anchor’ına veya gelecekteki route’a gidebilir.
    // Şimdilik basit bir alert. Roadmap 1: Composer modal implement edilecek.
    alert("Composer (Yeni Mesaj) burada açılacak. Roadmap #1’e göre AES-GCM ile istemci tarafında şifreleyip kaydedeceğiz.");
  };

  if (loading) {
    return (
      <div className="wrap">
        <div className="topbar">
          <button className="ghost" onClick={() => router.push("/")}>← Back to Home</button>
          <div className="right">
            <div className="avatar">{(username || "U").slice(0,1).toUpperCase()}</div>
            <button className="ghost" disabled>Loading…</button>
          </div>
        </div>
        <div className="skeleton" />
        <style jsx>{styles}</style>
      </div>
    );
  }

  return (
    <div className="wrap">
      {/* Top Bar */}
      <div className="topbar">
        <button className="ghost" onClick={() => router.push("/")}>← Back to Home</button>
        <div className="right">
          <div className="handle">@{username}</div>
          <div className="avatar">{username.slice(0,1).toUpperCase()}</div>
          <button className="ghost" onClick={onLogout}>Log out</button>
        </div>
      </div>

      {/* Hero — Sessiz lüks, duygusal */}
      <section className="hero">
        <p className="eyebrow">Your private space</p>
        <h1>Welcome, {username}.</h1>
        <p className="sub">People vanish. Words remain. This is where your voice can outlive you — calm, encrypted, yours.</p>
        <div className="ctaRow">
          <button className="solid" onClick={onCompose}>+ Write a new message</button>
          <button className="ghost" onClick={() => router.push("/dashboard#vault")}>Open your vault</button>
        </div>
      </section>

      {/* Journey — 3 adımda hikâye */}
      <section className="journey">
        <div className="card">
          <div className="node">1</div>
          <h3>Write</h3>
          <p>Say the thing that matters. A letter, a memory, a final word — in your own voice.</p>
        </div>
        <div className="card">
          <div className="node">2</div>
          <h3>Encrypt</h3>
          <p>Your message is encrypted <em>before</em> it leaves your device. We can’t read your words — and that’s the point.</p>
        </div>
        <div className="card">
          <div className="node">3</div>
          <h3>Deliver</h3>
          <p>Choose a date or a condition. Your words arrive when they should — quietly, on time.</p>
        </div>
      </section>

      {/* Memory Sparks — yazma kıvılcımları */}
      <section className="sparks">
        <p className="eyebrow">Memory Sparks</p>
        <div className="chips">
          {[
            "A lesson I wish I learned earlier…",
            "To my future self: please remember…",
            "For my child on their 18th birthday…",
            "The story I never told anyone…",
            "If I’m gone, read this on our anniversary…",
          ].map((t) => (
            <button key={t} className="chip" onClick={() => alert(`Composer’a eklenecek öneri: ${t}`)}>{t}</button>
          ))}
        </div>
      </section>

      {/* Vault — boş durum */}
      <section id="vault" className="vault">
        <h2>Your Vault</h2>
        <div className="empty">
          <div className="homeIcon" />
          <p>No messages yet. Start your first letter.</p>
          <button className="solid" onClick={onCompose}>Start writing</button>
        </div>
      </section>

      {/* Gentle Upsell — en altta, sessiz */}
      <section className="upsell">
        <div className="upsellInner">
          <div>
            <h3>Preserve more memories, quietly.</h3>
            <p>Premium lifts your limits and schedules deliveries — no rush, no noise.</p>
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

/** Styles (design tokensa saygılı) */
const styles = /* css */ `
.wrap {
  --bg:#050505; --fg:#f5f5f5; --card:#0b0b0b; --border:#1a1a1a; --muted:#c7c7c7;
  color: var(--fg);
  background: var(--bg);
  min-height: 100dvh;
  padding: 24px 20px 64px;
  display: grid;
  gap: 32px;
  justify-items: center;
}
.topbar{
  width: 100%;
  max-width: 1100px;
  display:flex; align-items:center; justify-content:space-between;
}
.right{ display:flex; gap:12px; align-items:center; }
.avatar{
  width:32px; height:32px; border-radius:50%; background:#111; border:1px solid var(--border);
  display:grid; place-items:center; font-weight:600;
}
.handle{ color:var(--muted); font-size:14px; }
.ghost{
  background:transparent; color:var(--fg); border:1px solid var(--border);
  padding:8px 12px; border-radius:12px; cursor:pointer;
  transition:transform 120ms ease, background 120ms ease;
}
.ghost:hover{ transform:scale(1.03); background:#0a0a0a; }
.solid{
  background:#fff; color:#000; border:none; padding:10px 14px; border-radius:14px; cursor:pointer; font-weight:600;
  transition:transform 120ms ease, filter 120ms ease;
}
.solid:hover{ transform:scale(1.04); filter:brightness(0.95); }

.hero{
  width:100%; max-width:900px; text-align:center; margin-top:8px;
  display:grid; gap:14px;
}
.eyebrow{ color:var(--muted); font-size:13px; letter-spacing:.3px; }
.hero h1{ font-size:40px; line-height:1.1; margin:0; }
.sub{ color:#d9d9d9; max-width:720px; margin:0 auto; }
.ctaRow{ display:flex; gap:10px; justify-content:center; margin-top:4px; flex-wrap:wrap; }

.journey{
  width:100%; max-width:1000px;
  display:grid; grid-template-columns: repeat(3, minmax(0,1fr)); gap:16px;
}
.card{
  background: radial-gradient(120% 120% at 50% 0%, rgba(255,255,255,0.03), rgba(0,0,0,0)) , var(--card);
  border:1px solid var(--border); border-radius:16px; padding:18px; box-shadow: 0 0 24px rgba(255,255,255,0.05);
}
.card h3{ margin:8px 0 6px; }
.card p{ color:#d0d0d0; }
.node{
  width:28px; height:28px; border-radius:999px; display:grid; place-items:center;
  background:#0f0f0f; border:1px solid var(--border); color:#bbb; font-weight:600; font-size:13px;
}

.sparks{
  width:100%; max-width:1000px; text-align:center; display:grid; gap:12px; margin-top:4px;
}
.chips{ display:flex; gap:10px; flex-wrap:wrap; justify-content:center; }
.chip{
  border:1px solid var(--border); background:#0c0c0c; color:#eaeaea; border-radius:999px; padding:8px 12px;
  cursor:pointer; transition:transform 120ms ease, background 120ms ease;
}
.chip:hover{ transform:scale(1.03); background:#111; }

.vault{ width:100%; max-width:1000px; text-align:center; display:grid; gap:14px; }
.vault h2{ margin-top:8px; }
.empty{
  border:1px solid var(--border); background:var(--card); border-radius:18px;
  padding:28px; display:grid; gap:10px; place-items:center;
}
.homeIcon{
  width:56px; height:56px; border-radius:14px; background: linear-gradient(180deg, #111, #0a0a0a);
  border:1px solid var(--border); box-shadow: inset 0 0 24px rgba(255,255,255,.05);
}
.upsell{
  width:100%; max-width:1000px; margin-top:6px;
}
.upsellInner{
  display:flex; align-items:center; justify-content:space-between; gap:14px; flex-wrap:wrap;
  border:1px solid var(--border); background:linear-gradient(180deg, rgba(255,255,255,0.02), rgba(0,0,0,0)) , var(--card);
  border-radius:18px; padding:16px 18px;
}
.softBtn{
  display:inline-block; padding:10px 14px; border-radius:12px;
  background:#111; color:#f5f5f5; border:1px solid var(--border); text-decoration:none;
  transition:transform 120ms ease, background 120ms ease;
}
.softBtn:hover{ transform:scale(1.03); background:#141414; }
.micro{ color:var(--muted); margin-top:8px; text-align:center; font-size:12px; }

.skeleton{
  width:100%; max-width:900px; height:180px; border-radius:18px; background:#0a0a0a; border:1px solid var(--border);
  animation: pulse 1.2s ease-in-out infinite;
}
@keyframes pulse{
  0%{opacity:.6} 50%{opacity:1} 100%{opacity:.6}
}

/* Responsive */
@media (max-width: 900px){
  .hero h1{ font-size:32px; }
  .journey{ grid-template-columns: 1fr; }
}
`;
