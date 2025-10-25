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
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
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
    if (!username.trim()) return;
    await supabase.auth.updateUser({ data: { username } });
    window.location.reload();
  }

  if (loading)
    return (
      <div className="dash-loading">
        <h2>Loading your vault...</h2>
      </div>
    );

  // === USERNAME SEÇME EKRANI ===
  if (!username) {
    return (
      <main className="username-page">
        <div className="username-card">
          <h1>Welcome to After.Me 👋</h1>
          <p className="subtitle">
            Before you enter your digital vault, choose a name that will echo in time.
          </p>
          <form onSubmit={saveUsername}>
            <input
              type="text"
              placeholder="Choose your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <button type="submit">Continue</button>
          </form>
        </div>
      </main>
    );
  }

  // === DASHBOARD ANA SAYFA ===
  return (
    <main className="dashboard-wrapper">
      <nav className="dashboard-nav">
        <div className="nav-left">
          <button className="back-home" onClick={() => router.push("/")}>
            ← Back to Home
          </button>
        </div>
        <div className="nav-right">
          <span className="username">@{username}</span>
          <button className="logout" onClick={handleLogout}>
            Log out
          </button>
        </div>
      </nav>

      <section className="hero">
        <h1>Welcome, {username} 🌙</h1>
        <p>
          Every word you write here will become a part of your legacy.  
          This is your space — your thoughts, your memories, your truth.
        </p>
        <button className="create-message">+ Write a new message</button>
      </section>

      <section className="plans">
        <h2>Choose Your Vault Plan</h2>
        <p className="plans-sub">
          Decide how far your words will travel.
        </p>
        <div className="plan-container">
          <div className="plan-card">
            <h3>Free</h3>
            <p>Write up to 5 messages. Simple, eternal, secure.</p>
          </div>
          <div className="plan-card highlight">
            <h3>Premium</h3>
            <p>Unlimited messages, scheduled deliveries, and encrypted storage.</p>
            <button className="upgrade-btn">Upgrade →</button>
          </div>
          <div className="plan-card">
            <h3>Lifetime</h3>
            <p>Everything unlocked. Your voice, forever preserved.</p>
            <button className="upgrade-btn">Upgrade →</button>
          </div>
        </div>
      </section>

      <section className="story">
        <h2>Your Journey So Far</h2>
        <div className="story-timeline">
          <div className="story-item">
            <span className="dot" />
            <p>You created your account.</p>
          </div>
          <div className="story-item">
            <span className="dot" />
            <p>You wrote your first words to be remembered.</p>
          </div>
          <div className="story-item">
            <span className="dot" />
            <p>One day, these words will reach someone you chose.</p>
          </div>
        </div>
      </section>

      <footer className="footer">
        <p>© 2025 After.Me • Crafted by CobsVault Labs</p>
      </footer>
    </main>
  );
}
