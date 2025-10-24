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

  if (!user) return <main style={{ padding: 40 }}>Yükleniyor…</main>;

  return (
    <main style={{ padding: 40 }}>
      <h1>Dashboard</h1>
      <p>Hoş geldin, <b>{user.email}</b></p>
      <button onClick={logout} style={{ marginTop: 12 }}>Çıkış Yap</button>
    </main>
  );
}
