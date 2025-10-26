"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";

export default function UsernamePage() {
  const router = useRouter();
  const params = useSearchParams();
  const redirectTo = params.get("redirectTo") || "/dashboard";

  const [userReady, setUserReady] = useState(false);
  const [emailConfirmed, setEmailConfirmed] = useState<boolean | null>(null);
  const [username, setUsername] = useState("");
  const [err, setErr] = useState("");
  const [saving, setSaving] = useState(false);

  // Guard + mevcut profil verisini çek
  useEffect(() => {
    let cancelled = false;
    (async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (cancelled) return;

      if (!user) {
        // Kayıt olmuş ama confirm gerektiren projelerde user boş olabilir
        setEmailConfirmed(false);
        setUserReady(true);
        return;
      }

      setEmailConfirmed(true);

      const { data } = await supabase
        .from("profiles")
        .select("username")
        .eq("id", user.id)
        .maybeSingle();

      if (data?.username) setUsername(data.username);
      setUserReady(true);
    })();
    return () => { cancelled = true; };
  }, []);

  async function saveUsername(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErr("");
    if (!username.trim()) return setErr("Please choose a name.");

    setSaving(true);
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      setSaving(false);
      return setErr("Please confirm your email, then come back to set your name.");
    }

    const { error } = await supabase
      .from("profiles")
      .upsert({ id: user.id, username }, { onConflict: "id" });

    setSaving(false);
    if (error) return setErr(error.message);

    router.replace(redirectTo);
  }

  if (!userReady) {
    return (
      <main className="auth-shell"><div className="glass">Loading…</div></main>
    );
  }

  return (
    <main className="auth-shell">
      <motion.div
        className="glass"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <Link href="/" className="brand">
          <span className="badge"><img src="/logo.svg" alt="" width={22} height={22}/></span>
          <span>After.Me</span>
        </Link>

        <h1>✨ Welcome to After.Me</h1>
        <p className="muted">Choose a name to sign your letters.</p>

        {emailConfirmed === false && (
          <p className="warn">
            Please check your inbox and confirm your email to proceed.
          </p>
        )}

        <form onSubmit={saveUsername} className="form">
          <label>Vault name (username)</label>
          <input
            placeholder="e.g., emir, aydin, mira"
            value={username}
            onChange={e=>setUsername(e.target.value)}
            disabled={emailConfirmed === false}
          />
          <button className="btn solid" type="submit" disabled={saving || emailConfirmed === false}>
            {saving ? "Saving…" : "Continue"}
          </button>
          {err && <p className="error">{err}</p>}
        </form>

        <div className="tiny muted">
          This name appears on your messages and can be changed later in Settings.
        </div>
      </motion.div>

      <style jsx>{`
        :root{--bg:#050505;--fg:#f5f5f5;--muted:#c7c7c7;--border:#1a1a1a}
        body{background:radial-gradient(60% 60% at 50% 20%, #0e0e0e 0%, #050505 100%);color:var(--fg)}
        .auth-shell{min-height:100dvh;display:grid;place-items:center;padding:24px}
        .glass{
          width:min(520px,92vw);
          background:rgba(255,255,255,0.06);
          border:1px solid rgba(255,255,255,0.12);
          border-radius:18px;padding:22px 20px;backdrop-filter: blur(10px) saturate(1.2);
          box-shadow:0 0 32px rgba(255,255,255,.05);
          display:grid;gap:12px;text-align:left;
        }
        .brand{display:inline-flex;align-items:center;gap:10px;color:#fff;font-weight:600;text-decoration:none}
        .badge{display:grid;place-items:center;border:1px solid #2a2a2a;border-radius:10px;padding:4px;background:#0d0d0d}
        h1{margin:6px 0 2px;font-size:24px}
        .muted{color:var(--muted)}
        .warn{color:#ffd56a;border:1px solid rgba(255,213,106,.3);background:rgba(255,213,106,.08);padding:8px;border-radius:10px}
        .form{display:grid;gap:8px;margin-top:6px}
        label{font-size:13px;color:#d8d8d8}
        input{
          background:#0a0a0a;border:1px solid var(--border);border-radius:10px;color:#fff;padding:12px 12px;
        }
        .btn{border-radius:10px;padding:12px 14px;font-weight:700;transition:.2s}
        .btn.solid{background:#fff;color:#000}
        .tiny{font-size:12px;margin-top:2px}
        .error{color:#ffb4b4;border:1px solid rgba(255,180,180,.3);background:rgba(255,100,100,.1);padding:8px;border-radius:10px}
      `}</style>
    </main>
  );
}
