"use client";

import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function Dashboard() {
  const [user, setUser] = useState<any>(null);
  const [username, setUsername] = useState("");
  const [plan, setPlan] = useState("free");
  const [loading, setLoading] = useState(true);
  const router = useRouter();

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
      <div className="dash-loading">
        <h2>Loading your vault...</h2>
      </div>
    );
  }

  if (!username) {
    return (
      <main className="dashboard-center">
        <div className="username-card">
          <h1>Welcome {user.email.split("@")[0]} 👋</h1>
          <p className="subtitle">Before continuing, choose your username</p>
          <form onSubmit={saveUsername}>
            <input
              type="text"
              placeholder="Your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <button type="submit">Save</button>
          </form>
        </div>
      </main>
    );
  }

  return (
    <main className="dashboard-wrapper">
      <nav className="dashboard-nav">
        <div className="logo">After.Me</div>
        <button className="logout" onClick={handleLogout}>
          Log out
        </button>
      </nav>

      <section className="hero-section">
        <h1>Hello, {username} 🌙</h1>
        <p className="tagline">
          Your words will outlive you. This is your personal digital legacy vault.
        </p>
      </section>

      <section className="plans-section">
        <h2>Choose Your Plan</h2>
        <div className="plans-grid">
          {[
            { title: "Free", desc: "5 messages stored securely forever" },
            { title: "Premium", desc: "Unlimited vaults + timed releases", highlight: true },
            { title: "Lifetime", desc: "Access everything, forever" },
          ].map((p) => (
            <div
              key={p.title}
              className={`plan-card ${p.highlight ? "highlight" : ""}`}
              onClick={() => setPlan(p.title.toLowerCase())}
            >
              <h3>{p.title}</h3>
              <p>{p.desc}</p>
              {p.title !== "Free" && <button className="upgrade-btn">Upgrade →</button>}
            </div>
          ))}
        </div>
      </section>

      <section className="vault-section">
        <h2>Your Vault</h2>
        <p>You haven’t written any messages yet.</p>
        <button className="new-message">+ Create New Message</button>
      </section>

      <footer className="dashboard-footer">
        <p>© 2025 After.Me — Crafted by CobsVault Labs</p>
      </footer>
    </main>
  );
}
