"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function LoginPage(){
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(true);
  const [err, setErr] = useState<string|null>(null);
  const [busy, setBusy] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); setErr(null); setBusy(true);

    if (typeof window !== "undefined") {
      localStorage.setItem("afterme_remember", rememberMe ? "1" : "0");
    }

    const { error } = await supabase.auth.signInWithPassword({ email, password });
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
          <h1>Welcome back 👋</h1>
          <p className="muted">Your words outlive you. Access your vault.</p>
        </header>

        <form onSubmit={onSubmit} className="form">
          <label>Email</label>
          <input required type="email" placeholder="you@example.com"
            value={email} onChange={e=>setEmail(e.target.value)}/>
          <label>Password</label>
          <input required type="password" placeholder="••••••••"
            value={password} onChange={e=>setPassword(e.target.value)}/>

          {/* ✅ Remember me */}
          <label style={{display:"flex",alignItems:"center",gap:8,marginTop:4}}>
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e)=>setRememberMe(e.target.checked)}
              style={{accentColor:"#8A7CFF"}}
            />
            <span className="muted small">Remember me</span>
          </label>

          {err && <p className="err">{err}</p>}

          <button className="btn solid full" disabled={busy}>
            {busy ? "Logging in…" : "Sign in"}
          </button>
        </form>

        <div className="row">
          <span className="muted">Don’t have an account?</span> <Link href="/signup">Sign up</Link>
        </div>
      </div>

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
        .auth{min-height:100dvh;display:grid;place-items:center;padding:24px}
        .box{
          width:min(460px,92vw);
          background:var(--glass);
          border:1px solid var(--glass-b);
          border-radius:18px;
          backdrop-filter: blur(12px) saturate(1.2);
          box-shadow:0 10px 40px rgba(0,0,0,.45), inset 0 0 1px rgba(255,255,255,.25);
          padding:24px 22px;
          display:grid;gap:14px;
        }
        .hd{text-align:left;display:grid;gap:6px}
        .brand{display:inline-flex;align-items:center;gap:10px;text-decoration:none;color:#fff;font-weight:700}
        h1{font-size:26px;margin:4px 0 2px}
        .muted{color:var(--muted)}
        .small{font-size:13px}
        .form{display:grid;gap:10px;margin-top:4px}
        label{font-size:13px;color:#dcdcdc}
        input{
          background:#0a0a0a;border:1px solid var(--border);
          border-radius:12px;color:#fff;padding:12px 14px;
          outline:none;transition: box-shadow .2s, border-color .2s;
        }
        input:focus{border-color:#5f5f5f;box-shadow:0 0 0 3px rgba(138,124,255,.18)}
        .btn{
          appearance:none;border:0;border-radius:12px;padding:12px 16px;
          font-weight:800;letter-spacing:.2px;cursor:pointer;
          transition:transform .15s ease, box-shadow .2s;
        }
        .btn.solid{
          background:var(--grad);color:#0b0b0b;
          box-shadow:0 8px 20px rgba(138,124,255,.25);
        }
        .btn.solid:hover{transform:translateY(-1px)}
        .btn.solid:active{transform:translateY(0)}
        .btn.full{width:100%}
        .row{display:flex;gap:8px;justify-content:center;margin-top:4px}
        .err{
          color:#ffb4b4;border:1px solid rgba(255,180,180,.35);
          background:rgba(255,100,100,.1);
          padding:10px;border-radius:12px;margin-top:4px
        }
        a{color:#fff;border-bottom:1px dashed rgba(240,240,240,.35)}
      `}</style>
    </main>
  );
}
