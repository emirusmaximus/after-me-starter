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
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(true);
  const [plan, setPlan] = useState("free");

  useEffect(() => {
    supabase.auth.getUser().then(async ({ data }) => {
      if (!data.user) {
        router.push("/login");
        return;
      }
      setUser(data.user);
      setUsername(data.user.user_metadata?.username || "");
      setLoading(false);
    });
  }, [router]);

  async function handleLogout() {
    await supabase.auth.signOut();
    router.push("/login");
  }

  async function saveUsername(e: any) {
    e.preventDefault();
    if (!username) return;
    await supabase.auth.updateUser({ data: { username } });
    window.location.reload();
  }

  if (loading) {
    return (
      <div style={{ textAlign: "center", paddingTop: 100 }}>
        <h2>Loading your vault...</h2>
      </div>
    );
  }

  // === Eğer username yoksa, isim seçimi ekranı ===
  if (!username) {
    return (
      <main className="dashboard choose-username">
        <div className="auth-card">
          <h1>Welcome {user.email.split("@")[0]} 👋</h1>
          <p>Before continuing, choose your display name.</p>
          <form onSubmit={saveUsername}>
            <input
              type="text"
              placeholder="Pick a username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <button type="submit">Save & Continue</button>
          </form>
        </div>
      </main>
    );
  }

  // === Asıl Dashboard ===
  return (
    <main className="dashboard">
      <header className="dash-header">
        <h1>Welcome, {username} 🌙</h1>
        <button onClick={handleLogout}>Log Out</button>
      </header>

      <section className="plans">
        <h2>Your Plan</h2>
        <div className="plan-grid">
          {["Free", "Premium", "Lifetime"].map((p) => (
            <div
              key={p}
              className={`plan-card ${plan === p.toLowerCase() ? "active" : ""}`}
              onClick={() => setPlan(p.toLowerCase())}
            >
              <h3>{p}</h3>
              <p>
                {p === "Free" && "Basic storage and 5 messages"}
                {p === "Premium" && "Unlimited messages + scheduled delivery"}
                {p === "Lifetime" && "All features forever"}
              </p>
              {p !== "Free" && <button className="btn">Upgrade →</button>}
            </div>
          ))}
        </div>
      </section>

      <section className="vault" style={{ textAlign: "center", marginTop: 60 }}>
        <h2>Your Vault</h2>
        <p>You have no saved messages yet.</p>
        <button className="btn btn--light" style={{ marginTop: 16 }}>
          + New Message
        </button>
      </section>

      <footer style={{ textAlign: "center", marginTop: 80, opacity: 0.6 }}>
        <p>© 2025 After.Me • Secure digital legacy platform</p>
      </footer>
    </main>
  );
}
