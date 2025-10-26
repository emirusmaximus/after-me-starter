"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import Link from "next/link";
import { motion } from "framer-motion";

export default function SignupPage() {
  return (
    <Suspense fallback={<main className="auth-shell"><div className="glass">Loading…</div></main>}>
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

    const { error } = await supabase.auth.signUp({ email, password });

    setLoading(false);
    if (error) return setErr(error.message);

    // Eğer verify-email sayfasını eklediysen yorum satırını aç:
    // router.replace("/verify-email");
    router.replace(`/username?redirectTo=${encodeURIComponent(redirectTo)}`);
  }

  return (
    <main className="auth-shell">
      <motion.div
        className="glass"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
      >
        <Link href="/" className="brand" aria-label="Back to Home">
          <span className="badge"><img src="/logo.svg" alt="" width={22} height={22}/></span>
          <span>After.Me</span>
        </Link>

        <h1 className="title">Create your vault ✨</h1>
        <p className="sub">Write now. Store encrypted. Deliver later.</p>

        <form onSubmit={handleSignup} className="form">
          <label>Email</label>
          <input
            type="email"
            placeholder="you@example.com"
            autoComplete="email"
            value={email}
            onChange={e=>setEmail(e.target.value)}
            required
          />

          <label>Password</label>
          <input
            type="password"
            placeholder="••••••••"
            autoComplete="new-password"
            value={password}
            onChange={e=>setPassword(e.target.value)}
            required
          />

          <button className="btn btn-primary" type="submit" disabled={loading}>
            {loading ? "Creating…" : "Sign Up"}
          </button>

          {err && <p className="error">{err}</p>}
        </form>

        <p className="alt">
          Already have an account?{" "}
          <Link href={`/login?redirectTo=${encodeURIComponent(redirectTo)}`} className="link">Log in</Link>
        </p>

        <div className="trust">
          <span className="dot" />
          AES-256 client-side encryption. We can’t read your words — and that’s the point.
        </div>
      </motion.div>

      <style jsx>{`
        :root{
          --bg:#050505; --fg:#f5f5f5; --muted:#c7c7c7; --border:#1a1a1a;
          --glass: rgba(255,255,255,0.06); --glass-b: rgba(255,255,255,0.12);
          --grad: linear-gradient(135deg,#6C63FF 0%,#8A7CFF 100%);
        }
        body{
          background:
            radial-gradient(60% 60% at 50% 15%, rgba(255,255,255,.06) 0%, transparent 60%),
            #050505;
          color:var(--fg);
        }
        .auth-shell{min-height:100dvh;display:grid;place-items:center;padding:24px}
        .glass{
          width:min(460px,92vw);
          background:var(--glass);
          border:1px solid var(--glass-b);
          border-radius:18px;
          backdrop-filter: blur(12px) saturate(1.2);
          box-shadow:0 10px 40px rgba(0,0,0,.45), inset 0 0 1px rgba(255,255,255,.25);
          padding:24px 22px;
          display:grid;gap:14px;
        }

        .brand{
          display:inline-flex;align-items:center;gap:10px;
          text-decoration:none;color:#fff;font-weight:700;letter-spacing:.2px;
        }
        .badge{
          display:grid;place-items:center;border:1px solid #2a2a2a;border-radius:10px;padding:4px;background:#0d0d0d
        }

        .title{font-size:26px;margin:4px 0 2px}
        .sub{color:var(--muted);margin:0 0 4px}

        .form{display:grid;gap:10px;margin-top:4px}
        label{font-size:13px;color:#dcdcdc}
        input{
          background:#0a0a0a;border:1px solid var(--border);
          border-radius:12px;color:#fff;padding:12px 14px;
          outline:none; transition: box-shadow .2s, border-color .2s;
        }
        input:focus{ border-color:#5f5f5f; box-shadow:0 0 0 3px rgba(138,124,255,.18) }

        .btn{
          appearance:none;border:0;border-radius:12px;padding:12px 16px;
          font-weight:800;letter-spacing:.2px;cursor:pointer;transition:transform .15s ease, box-shadow .2s;
        }
        .btn:disabled{opacity:.8;cursor:default}
        .btn-primary{
          background:var(--grad); color:#0b0b0b;
          box-shadow:0 8px 20px rgba(138,124,255,.25);
        }
        .btn-primary:hover{ transform:translateY(-1px) }
        .btn-primary:active{ transform:translateY(0) }

        .alt{color:var(--muted);margin-top:2px}
        .link{
          color:#f0f0f0;text-decoration:none;border-bottom:1px dashed rgba(240,240,240,.35);
        }

        .trust{
          display:flex;align-items:center;gap:8px;
          font-size:12.5px;color:#bdbdbd;margin-top:2px
        }
        .dot{width:6px;height:6px;border-radius:50%;background:#fff;box-shadow:0 0 12px #fff;display:inline-block}

        .error{
          color:#ffb4b4;border:1px solid rgba(255,180,180,.35);
          background:rgba(255,100,100,.1);
          padding:10px;border-radius:12px;margin-top:4px
        }

        /* Mavi default link görünümünü kırmak için */
        :global(a){ color:inherit }
      `}</style>
    </main>
  );
}
