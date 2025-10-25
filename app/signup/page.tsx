"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function SignupPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleSignup(e: any) {
    e.preventDefault();
    const { error } = await supabase.auth.signUp({ email, password });
    if (error) setError(error.message);
    else router.push("/dashboard");
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
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Sign Up</button>
          {error && <p className="error">{error}</p>}
        </form>

        <p className="switch">
          Already have an account? <a href="/login">Log in</a>
        </p>
      </div>
    </main>
  );
}
