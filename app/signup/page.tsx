"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { supabase } from "@/lib/supabaseClient";

export default function SignupPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErr(""); setLoading(true);
    const { error } = await supabase.auth.signUp({ email, password });
    setLoading(false);
    if (error) return setErr(error.message);
    router.push("/dashboard");
  };

  return (
    <main>
      <h1 style={{ fontSize: 24, fontWeight: 600 }}>Üye Ol</h1>
      <form onSubmit={onSubmit} style={{ display: "grid", gap: 12, marginTop: 16 }}>
        <input placeholder="E-posta" value={email} onChange={(e)=>setEmail(e.target.value)} />
        <input type="password" placeholder="Şifre (min 6)" value={password} onChange={(e)=>setPassword(e.target.value)} />
        {err && <p style={{ color: "#ff8080" }}>{err}</p>}
        <button disabled={loading} style={{ padding: 10, borderRadius: 10, background: "#fff", color: "#000", fontWeight: 600, opacity: loading? .6:1 }}>
          {loading ? "Hesap oluşturuluyor..." : "Hesap Oluştur"}
        </button>
      </form>
      <p style={{ opacity: .75, marginTop: 12 }}>
        Zaten hesabın var mı? <Link href="/login" style={{ textDecoration: "underline" }}>Giriş yap</Link>
      </p>
    </main>
  );
}
