// app/signup/page.tsx
"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function SignupPage(){
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [err, setErr] = useState<string|null>(null);
  const [busy, setBusy] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); setErr(null);
    if(password !== confirm){ setErr("Passwords do not match."); return; }
    setBusy(true);
    const { error } = await supabase.auth.signUp({ email, password });
    setBusy(false);
    if(error) setErr(error.message);
    else router.replace("/dashboard");
  };

  return (
    <main className="auth">
      <div className="box">
        <header className="hd">
          <Link href="/" className="brand">
            <img src="/logo.svg" width={24} height={24} alt="After.Me"/><span>After.Me</span>
          </Link>
          <h1>Create account</h1>
          <p className="muted">Write now, store encrypted, deliver later.</p>
        </header>

        <form onSubmit={onSubmit} className="form">
          <label>Email</label>
          <input required type="email" placeholder="you@example.com" value={email} onChange={e=>setEmail(e.target.value)}/>
          <label>Password</label>
          <input required type="password" placeholder="At least 8 characters" value={password} onChange={e=>setPassword(e.target.value)}/>
          <label>Confirm Password</label>
          <input required type="password" placeholder="Repeat password" value={confirm} onChange={e=>setConfirm(e.target.value)}/>
          {err && <p className="err">{err}</p>}
          <button className="btn solid full" disabled={busy}>{busy ? "Creating…" : "Create account"}</button>
          <div className="muted small" style={{marginTop:8}}>
            By signing up you agree to our <a href="/legal/terms">Terms</a> and <a href="/legal/privacy">Privacy</a>.
          </div>
        </form>

        <div className="row">
          <span className="muted">Already have an account?</span> <Link href="/login">Sign in</Link>
        </div>

        {/* Small plan nudge */}
        <div className="nudge">
          <div className="ncol premium"><div className="t">Premium</div><div className="p">$2/mo</div></div>
          <div className="ncol lifetime"><div className="t">Lifetime</div><div className="p">$15</div></div>
        </div>
      </div>

      <style jsx>{`
        .auth{ min-height:100dvh; display:grid; place-items:center; background:var(--bg); color:var(--fg) }
        .box{ width:min(520px,92vw); border:1px solid var(--line); background:#0a0a0a; padding:22px }
        .hd{ display:grid; gap:6px; text-align:center }
        .brand{ display:inline-flex; gap:10px; align-items:center; margin:0 auto 4px; color:#fff; font-weight:800 }
        .muted{ color:var(--muted) }
        .small{ font-size:12.5px }
        .form{ display:grid; gap:8px; margin-top:10px }
        input{ background:#0a0a0a; border:1px solid var(--line); color:#fff; padding:12px 12px; border-radius:0 }
        .err{ color:#ffb3b3; margin:6px 0 0 }
        .btn{ border:1px solid #2f2f2f; background:#fff; color:#000; padding:12px 14px; font-weight:800; border-radius:0 }
        .btn.full{ width:100% }
        .row{ display:flex; gap:8px; justify-content:center; margin-top:12px }
        .nudge{ display:grid; grid-template-columns:1fr 1fr; gap:10px; margin-top:14px }
        .ncol{ display:grid; grid-template-columns:1fr auto; align-items:center; border:1px solid var(--line); padding:10px; background:#0b0b0b }
        .ncol .t{ font-weight:800 }
        .ncol .p{ font-weight:900 }
        .ncol.premium{ background:linear-gradient(165deg, #6C63FF 0%, #8A7CFF 100%); color:#0b0b0b; border-color:rgba(255,255,255,.25) }
        .ncol.lifetime{ background:linear-gradient(165deg, #F2C94C 0%, #F9E79F 100%); color:#0b0b0b; border-color:rgba(0,0,0,.2) }
      `}</style>
    </main>
  );
}
