"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function SignupPage() {
  const router = useRouter();
  const params = useSearchParams();
  const redirectTo = params.get("redirectTo") || "/dashboard";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSignup(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setLoading(true);
    const { error } = await supabase.auth.signUp({ email, password });
    setLoading(false);
    if (error) {
      setError(error.message);
      return;
    }
    // Eğer email confirm açıksa: kullanıcı önce mailini onaylar, sonra login olur.
    router.replace(redirectTo);
  }

  return (
    <main className="auth-page">
      <div className="auth-card">
        <h1>Create your vault ✨</h1>
        <p>Write now. Deliver later.</p>

        <form onSubmit={handleSignup}>
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
            autoComplete="new-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit" disabled={loading}>
            {loading ? "Creating…" : "Sign Up"}
          </button>

          {error && <p className="error">{error}</p>}
        </form>

        <p className="switch">
          Already have an account?{" "}
          <a href={`/login?redirectTo=${encodeURIComponent(redirectTo)}`}>Log in</a>
        </p>
      </div>
    </main>
  );
}
