"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function Dashboard() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (!data.user) router.push("/login");
      else setUser(data.user);
    });
  }, [router]);

  async function handleLogout() {
    await supabase.auth.signOut();
    router.push("/login");
  }

  if (!user)
    return (
      <div style={{ textAlign: "center", paddingTop: 80 }}>
        <h2>Loading vault...</h2>
      </div>
    );

  return (
    <main className="dashboard">
      <header className="dash-header">
        <h1>Welcome, {user.email}</h1>
        <button onClick={handleLogout}>Log Out</button>
      </header>

      <section className="vault">
        <h2>Your Vault</h2>
        <p>No messages yet. Start by writing your first memory 🌙</p>
        <button className="btn btn--light" style={{ marginTop: 16 }}>
          + New Message
        </button>
      </section>
    </main>
  );
}
