"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../lib/supabaseClient";

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

  if (!user) return <main style={{ padding: 40 }}>Loading…</main>;

  return (
    <main style={{ padding: 40 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", maxWidth: 980, margin: "0 auto" }}>
        <h1 style={{ fontSize: 26, fontWeight: 800 }}>Dashboard</h1>
        <button onClick={logout} style={{ padding: "8px 12px", borderRadius: 10, border: "1px solid rgba(255,255,255,.25)" }}>
          Log Out
        </button>
      </div>
      <div style={{ maxWidth: 980, margin: "16px auto 0", padding: 16, borderRadius: 16, background: "rgba(255,255,255,.06)", border: "1px solid rgba(255,255,255,.08)" }}>
        Welcome, <b>{user.email}</b>
      </div>
    </main>
  );
}
