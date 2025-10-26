"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import Link from "next/link";
import { motion } from "framer-motion";

export default function SignupPage() {
  return (
    <Suspense
      fallback={<main className="auth-shell"><div className="glass">Loading…</div></main>}
    >
      <SignupInner />
    </Suspense>
  );
}

function SignupInner() {
  const router = useRouter();
  const params = useSearchParams();
  const redirectTo = params.get("redirectTo") || "/dashboard";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSignup(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErr("");
    setLoading(true);

    const { data, error } = await supabase.auth.signUp({ email, password });
    setLoading(false);

    if (error) return setErr(error.message);

    // E-posta onayı açıksa user null olabilir; username adımında da kontrol edeceğiz.
    // Burada doğrudan username ekranına yönlendiriyoruz, oradan /dashboard.
    router.replace(`/username?redirectTo=${encodeURIComponent(redirectTo)}`);
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

        <h1>Create your vault ✨</h1>
        <p className="muted">Write now. Store encrypted. Deliver later.</p>

        <form onSubmit={handleSignup} className="form">
          <label>Email</label>
          <input
            type="email" autoComplete="email" placeholder="you@example.com"
            value={email} onChange={e=>setEmail(e.target.value)} required
          />
          <label>Password</label>
          <input
            type="password" autoComplete="new-password" placeholder="••••••••"
            value={password} onChange={e=>setPassword(e.target.value)} required
          />
          <button className="btn solid" type="submit" disabled={loading}>
            {loading ? "Creating…" : "Sign Up"}
          </button>
          {err && <p className="error">{err}</p>}
        </form>

        <p className="switch muted">
          Already have an account?{" "}
          <Link href={`/login?redirectTo=${encodeURIComponent(redirectTo)}`} className="link">Log in</Link>
        </p>

        <div className="tiny muted">
          Zero-knowledge: We can’t read your words — and that’s the point.
        </div>
      </motion.div>

      <style jsx>{`
        :root{--bg:#050505;--fg:#f5f5f5;--muted:#c7c7c7;--border:#1a1a1a}
        body{background:radial-gradient(60% 60% at 50% 20%, #0e0e0e 0%, #050505 100%);color:var(--fg)}
        .auth-shell{min-height:100dvh;display:grid;place-items:center;padding:24px}
        .glass{
          width:min(440px,92vw);
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
        .form{display:grid;gap:8px;margin-top:6px}
        label{font-size:13px;color:#d8d8d8}
        input{
          background:#0a0a0a;border:1px solid var(--border);border-radius:10px;color:#fff;padding:12px 12px;
        }
        .btn{border-radius:10px;padding:12px 14px;font-weight:700;transition:.2s}
        .btn.solid{background:#fff;color:#000}
        .btn:disabled{opacity:.7}
        .switch{margin-top:4px}
        .link{color:#fff;border-bottom:1px dashed #3a3a3a}
        .tiny{font-size:12px;margin-top:2px}
        .error{color:#ffb4b4;border:1px solid rgba(255,180,180,.3);background:rgba(255,100,100,.1);padding:8px;border-radius:10px}
      `}</style>
    </main>
  );
}
