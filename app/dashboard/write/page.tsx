"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import { encryptText } from "@/lib/crypto";

function parseEmails(raw: string): string[] {
  return raw
    .split(/[,\n; ]+/)
    .map(e => e.trim().toLowerCase())
    .filter(e => !!e && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e));
}

export default function WriteNowPage() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [emails, setEmails] = useState(""); // virgül veya alt alta
  const [mode, setMode] = useState<"date"|"heartbeat">("date");
  const [deliverAt, setDeliverAt] = useState("");        // YYYY-MM-DDTHH:mm
  const [days, setDays] = useState(30);                  // inactivity gün sayısı
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string|null>(null);

  const recipients = useMemo(() => parseEmails(emails), [emails]);

  const onSave = async (e: React.FormEvent) => {
    e.preventDefault(); setErr(null);

    if (!title || !body) { setErr("Title and message are required."); return; }
    if (recipients.length === 0) { setErr("Add at least one recipient email."); return; }
    if (mode === "date" && !deliverAt) { setErr("Pick a delivery date & time."); return; }

    setBusy(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Please sign in again.");

      const { ciphertext, iv } = await encryptText(body);

      const payload: any = {
        user_id: user.id,
        title,
        ciphertext,
        iv,
        recipients,
        delivery_mode: mode,
        status: "draft",
      };

      if (mode === "date") {
        payload.deliver_at = new Date(deliverAt).toISOString();
        payload.inactivity_days = null;
      } else {
        payload.deliver_at = null;
        payload.inactivity_days = days;
      }

      const { error } = await supabase.from("letters").insert(payload);
      if (error) throw error;

      router.replace("/dashboard?saved=1");
    } catch (e: any) {
      setErr(e.message || "Save failed.");
      setBusy(false);
    }
  };

  return (
    <main className="px-6 py-8 max-w-2xl mx-auto">
      <h1 className="text-2xl mb-4">Write a message</h1>

      <form onSubmit={onSave} className="space-y-4">
        <input
          className="w-full rounded-lg border border-gray-700 bg-transparent px-3 py-2"
          placeholder="Title"
          value={title}
          onChange={e=>setTitle(e.target.value)}
        />

        <textarea
          className="w-full min-h-[220px] rounded-lg border border-gray-700 bg-transparent px-3 py-2"
          placeholder="Your message (encrypted on your device)"
          value={body}
          onChange={e=>setBody(e.target.value)}
        />

        <div>
          <label className="block mb-1 opacity-80">Recipients (emails)</label>
          <textarea
            className="w-full min-h-[90px] rounded-lg border border-gray-700 bg-transparent px-3 py-2"
            placeholder="e.g. alice@mail.com, bob@mail.com"
            value={emails}
            onChange={e=>setEmails(e.target.value)}
          />
          <div className="text-sm opacity-70 mt-1">Parsed: {recipients.length} email</div>
        </div>

        <div className="rounded-xl border border-gray-700 p-3">
          <div className="flex gap-4 mb-3">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="radio" name="mode" checked={mode==="date"} onChange={()=>setMode("date")} />
              <span>Deliver on a date</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="radio" name="mode" checked={mode==="heartbeat"} onChange={()=>setMode("heartbeat")} />
              <span>Deliver after inactivity</span>
            </label>
          </div>

          {mode === "date" ? (
            <div className="flex items-center gap-3">
              <label className="opacity-80 min-w-40">Delivery date & time</label>
              <input
                type="datetime-local"
                className="rounded-lg border border-gray-700 bg-transparent px-3 py-2"
                value={deliverAt}
                onChange={e=>setDeliverAt(e.target.value)}
              />
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <label className="opacity-80 min-w-40">Days after last heartbeat</label>
              <input
                type="number" min={1}
                className="w-28 rounded-lg border border-gray-700 bg-transparent px-3 py-2"
                value={days}
                onChange={e=>setDays(parseInt(e.target.value||"0",10))}
              />
              <span className="opacity-70 text-sm">e.g. 30</span>
            </div>
          )}
        </div>

        {err && <div className="text-red-400 text-sm">{err}</div>}
        <button disabled={busy} className="rounded-xl border border-purple-500 px-4 py-2">
          {busy ? "Saving…" : "Save (encrypted)"}
        </button>
      </form>
    </main>
  );
}
