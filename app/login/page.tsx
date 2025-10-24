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
    <main style={{ padding: 40, textAlign: "center" }}>
      <h1>Giriş Yap</h1>
      <form onSubmit={onSubmit} style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        <input type="email" placeholder="E-posta" value={email} onChange={(e)=>setEmail(e.target.value)} />
        <input type="password" placeholder="Şifre" value={password} onChange={(e)=>setPassword(e.target.value)} />
        {err && <p style={{ color: "red" }}>{err}</p>}
        <button type="submit">Giriş</button>
      </form>
    </main>
  );
}
