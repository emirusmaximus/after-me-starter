"use client";

import Link from "next/link";
import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function ComposePage() {
  const [title, setTitle] = useState("");
  const [toEmail, setToEmail] = useState("");
  const [unlockDate, setUnlockDate] = useState(""); // YYYY-MM-DD
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      setBusy(true);

      // (Opsiyonel) Auth kullanıcı kontrolü
      const { data: { user }, error: uErr } = await supabase.auth.getUser();
      if (uErr) throw uErr;
      if (!user) throw new Error("Not signed in.");

      // TS hatasını çıkaran satır: unlock_date tanımsızdı.
      // Doğrusu: state'teki unlockDate'i, DB sütunu olan unlock_date'e map etmek.
      const { data, error } = await supabase
        .from("letters")
        .insert({
          user_id: user.id,
          title,
          message,
          unlock_date: unlockDate, // ✅ kritik düzeltme
          to_email: toEmail || null,
          status: "draft",
        })
        .select("id")
        .single();

      if (error) throw error;

      setToast("Draft saved. ✨");
      setTitle("");
      setToEmail("");
      setUnlockDate("");
      setMessage("");
    } catch (err: any) {
      setToast(err?.message ?? "Unexpected error.");
    } finally {
      setBusy(false);
      setTimeout(() => setToast(null), 2500);
    }
  }

  return (
    <main className="wrap">
      <div className="outer" style={{ maxWidth: 860, marginInline: "auto", textAlign: "left" }}>
        <div className="topbar" style={{ marginBottom: 16 }}>
          <Link href="/dashboard" className="brand" aria-label="Back to Dashboard">
            ← Back
          </Link>
        </div>

        <h1 className="title" style={{ textAlign: "left" }}>Compose</h1>

        <form className="form" onSubmit={handleSubmit} style={{ display: "grid", gap: 12 }}>
          <label>Title</label>
          <input
            placeholder="E.g., Letter to Mom"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <label>Recipient Email (optional)</label>
          <input
            type="email"
            placeholder="name@example.com"
            value={toEmail}
            onChange={(e) => setToEmail(e.target.value)}
          />

          <label>Unlock Date</label>
          <input
            type="date"
            value={unlockDate}
            onChange={(e) => setUnlockDate(e.target.value)}
          />

          <label>Message</label>
          <textarea
            rows={10}
            placeholder="Write your words…"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />

          <div style={{ display: "flex", gap: 8, marginTop: 4 }}>
            <button className="btn solid" type="submit" disabled={busy}>
              {busy ? "Saving…" : "Encrypt & Save (Demo)"}
            </button>
            <Link className="btn ghost" href="/dashboard">
              Cancel
            </Link>
          </div>
        </form>

        {toast && (
          <div className="toast" role="status" aria-live="polite" style={{ marginTop: 16 }}>
            {toast}
          </div>
        )}
      </div>
    </main>
  );
}
