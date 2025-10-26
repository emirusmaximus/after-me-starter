"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function LoginPage() {
  const router = useRouter();
  const params = useSearchParams();
  const redirectTo = params.get("redirectTo") || "/dashboard";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) {
      setError(error.message);
      return;
    }
    router.replace(redirectTo); // push yerine replace: history temiz
  }

  return (
    <main className="auth-page">
      <div className="auth-card">
        <h1>Welcome back 👋</h1>
        <p>Access your digital vault</p>

        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit" disabled={loading}>
            {loading ? "Logging in…" : "Log In"}
          </button>

          {error && <p className="error">{error}</p>}
        </form>

        <p className="switch">
          Don’t have an account?{" "}
          <a href={`/signup?redirectTo=${encodeURIComponent(redirectTo)}`}>Sign up</a>
        </p>
      </div>
    </main>
  );
}
