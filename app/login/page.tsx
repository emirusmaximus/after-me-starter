// app/login/page.tsx
"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function LoginPage() {
  const router = useRouter();
  const qp = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); setBusy(true); setErr(null);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setBusy(false);
    if (error) setErr(error.message);
    else router.replace(qp.get("redirectTo") || "/dashboard");
  };

  return (
    <main className="auth">
      <div className="box">
        <header className="hd">
          <Link href="/" className="brand">
            <img src="/logo.svg" width={24} height={24} alt="After.Me"/><span>After.Me</span>
          </Link>
          <h1>Sign in</h1>
          <p className="muted">Welcome back. Enter your email and password.</p>
        </header>

        <form onSubmit={onSubmit} className="form">
          <label>Email</label>
          <input required type="email" placeholder="you@example.com" value={email} onChange={e=>setEmail(e.target.value)} />
          <label>Password</label>
          <div className="pw">
            <input required type={show ? "text" : "password"} placeholder="Your password" value={password} onChange={e=>setPassword(e.target.value)} />
            <button type="button" className="tog" onClick={()=>setShow(s=>!s)}>{show ? "Hide" : "Show"}</button>
          </div>
          {err && <p className="err">{err}</p>}
          <button className="btn solid full" disabled={busy}>{busy ? "Signing in…" : "Sign in"}</button>
        </form>

        <div className="row">
          <span className="muted">New here?</span> <Link href="/signup">Create an account</Link>
        </div>
      </div>

      <style jsx>{`
        .auth{ min-height:100dvh; display:grid; place-items:center; background:var(--bg); color:var(--fg) }
        .box{ width:min(420px,92vw); border:1px solid var(--line); background:#0a0a0a; padding:22px }
        .hd{ display:grid; gap:6px; text-align:center }
        .brand{ display:inline-flex; gap:10px; align-items:center; margin:0 auto 4px; color:#fff; font-weight:800 }
        .muted{ color:var(--muted) }
        .form{ display:grid; gap:8px; margin-top:10px }
        input{ background:#0a0a0a; border:1px solid var(--line); color:#fff; padding:12px 12px; border-radius:0 }
        .pw{ display:grid; grid-template-columns:1fr auto; align-items:center; gap:8px }
        .tog{ border:1px solid var(--line); background:#0c0c0c; color:#fff; padding:10px 12px; border-radius:0 }
        .err{ color:#ffb3b3; margin:6px 0 0 }
        .btn{ border:1px solid #2f2f2f; background:#fff; color:#000; padding:12px 14px; font-weight:800; border-radius:0 }
        .btn.full{ width:100% }
        .row{ display:flex; gap:8px; justify-content:center; margin-top:12px }
      `}</style>
    </main>
  );
}
