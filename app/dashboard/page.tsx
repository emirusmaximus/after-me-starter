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

  // Username seçimi ekranı
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

  // Asıl Dashboard ekranı
  return (
    <main className="dashboard" style={{ padding: "60px 20px", color: "#fff" }}>
      <header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 40,
        }}
      >
        <h1>Welcome, {username} 🌙</h1>
        <button
          onClick={handleLogout}
          style={{
            background: "transparent",
            border: "1px solid #444",
            color: "#fff",
            padding: "8px 16px",
            borderRadius: 8,
          }}
        >
          Log Out
        </button>
      </header>

      <section style={{ marginBottom: 50 }}>
        <h2 style={{ fontSize: 22, marginBottom: 12 }}>Your Plan</h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: 20,
          }}
        >
          {["Free", "Premium", "Lifetime"].map((p) => (
            <div
              key={p}
              style={{
                background: plan === p.toLowerCase() ? "#111" : "#0a0a0a",
                border: plan === p.toLowerCase() ? "1px solid #fff" : "1px solid #222",
                borderRadius: 16,
                padding: 24,
                textAlign: "center",
                transition: "0.3s",
                cursor: "pointer",
              }}
              onClick={() => setPlan(p.toLowerCase())}
            >
              <h3 style={{ fontSize: 18, marginBottom: 6 }}>{p}</h3>
              <p style={{ fontSize: 14, opacity: 0.7 }}>
                {p === "Free" && "Basic storage and 5 messages"}
                {p === "Premium" && "Unlimited messages + scheduled delivery"}
                {p === "Lifetime" && "All features forever"}
              </p>
              {p !== "Free" && (
                <button
                  style={{
                    marginTop: 12,
                    background: "#fff",
                    color: "#000",
                    borderRadius: 8,
                    padding: "10px 20px",
                    fontWeight: 600,
                  }}
                >
                  Upgrade →
                </button>
              )}
            </div>
          ))}
        </div>
      </section>

      <section style={{ textAlign: "center", marginTop: 60 }}>
        <h2 style={{ fontSize: 22 }}>Your Vault</h2>
        <p style={{ opacity: 0.7 }}>You have no saved messages yet.</p>
        <button
          style={{
            marginTop: 16,
            background: "transparent",
            border: "1px solid #fff",
            color: "#fff",
            borderRadius: 8,
            padding: "10px 20px",
            fontWeight: 500,
          }}
        >
          + New Message
        </button>
      </section>

      <footer style={{ textAlign: "center", marginTop: 80, opacity: 0.6 }}>
        <p>© 2025 After.Me • Secure digital legacy platform</p>
      </footer>
    </main>
  );
}
