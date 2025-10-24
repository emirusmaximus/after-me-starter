"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

export default function Dashboard() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (!data?.user) router.replace("/login");
      else setUser(data.user);
    });
  }, [router]);

  const logout = async () => {
    await supabase.auth.signOut();
    router.replace("/login");
  };

  if (!user) return <main>Yükleniyor…</main>;

  return (
    <main>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h1 style={{ fontSize: 24, fontWeight: 600 }}>Dashboard</h1>
        <button onClick={logout} style={{ padding: 8, borderRadius: 10, background: "rgba(255,255,255,.1)", border: "1px solid rgba(255,255,255,.2)" }}>
          Çıkış Yap
        </button>
      </div>
      <div style={{ marginTop: 16, padding: 16, borderRadius: 16, background: "rgba(255,255,255,.06)" }}>
        Hoş geldin, <b>{user.email}</b>
      </div>
    </main>
  );
}
