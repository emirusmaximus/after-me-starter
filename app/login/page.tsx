"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../lib/supabaseClient";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErr("");
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) return setErr(error.message);
    router.push("/dashboard");
  };

  return (
    <main style={{ padding: 40, maxWidth: 520, margin: "0 auto" }}>
      <h1 style={{ fontSize: 26, fontWeight: 800 }}>Log In</h1>
      <form onSubmit={onSubmit} style={{ display: "grid", gap: 12, marginTop: 16 }}>
        <input placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)} />
        <input type="password" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)} />
        {err && <p style={{ color: "#ff8a8a" }}>{err}</p>}
        <button style={{ padding: 10, borderRadius: 10, background: "#fff", color: "#000", fontWeight: 700 }}>
          Log In
        </button>
      </form>
      <p style={{ opacity: .8, marginTop: 10 }}>
        New here? <a href="/signup" style={{ textDecoration: "underline", color: "white" }}>Create an account</a>
      </p>
    </main>
  );
}
