"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabaseClient";

type Plan = "free" | "premium" | "lifetime" | string;

export default function ComposePage() {
  const [plan, setPlan] = useState<Plan>("free");
  const [loading, setLoading] = useState(true);

  // Zamanlı Mesaj form state
  const [title, setTitle] = useState("");
  const [recipients, setRecipients] = useState(""); // virgülle ayrılmış e-postalar
  const [unlockDate, setUnlockDate] = useState("");
  const [message, setMessage] = useState("");

  // Dijital vasiyet form state
  const [willRecipients, setWillRecipients] = useState("");
  const [pool, setPool] = useState<{ id: string; kind: "audio" | "video" | "text"; ref: string }[]>([]);
  const [kind, setKind] = useState<"audio" | "video" | "text">("text");
  const [ref, setRef] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
          // window.location.href = "/login?redirectTo=/dashboard/compose";
          setLoading(false);
          return;
        }
        const { data, error } = await supabase
          .from("profiles")
          .select("plan")
          .eq("id", user.id)
          .maybeSingle();

        if (!error && data?.plan) setPlan((data.plan as Plan) || "free");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const isPremium = useMemo(() => ["premium", "lifetime"].includes(plan), [plan]);

  // ✅ GERÇEK KAYIT: letters + letter_recipients
  const saveScheduled = async () => {
    // 1) Basit doğrulama
    if (!title || !recipients || !unlockDate || !message) {
      alert("Please fill all fields.");
      return;
    }

    // 2) Kullanıcı
    const { data: { user }, error: uErr } = await supabase.auth.getUser();
    if (uErr) return alert(uErr.message);
    if (!user) return alert("Please log in.");

    // 3) Letters insert
    const { data: letter, error: lErr } = await supabase
      .from("letters")
      .insert({
        user_id: user.id,
        title,
        message,       // V2'de client-side şifreleme eklenebilir
        unlock_date    // input type="date" → YYYY-MM-DD
      })
      .select("id")
      .single();

    if (lErr) return alert(lErr.message);

    // 4) Recipients insert
    const emails = recipients.split(",").map(e => e.trim()).filter(Boolean);
    if (emails.length) {
      const rows = emails.map(email => ({ letter_id: letter.id, email }));
      const { error: rErr } = await supabase.from("letter_recipients").insert(rows);
      if (rErr) return alert(rErr.message);
    }

    // 5) Temizlik ve bildirim
    setTitle("");
    setRecipients("");
    setUnlockDate("");
    setMessage("");
    alert("Scheduled message saved!");
  };

  const addPoolItem = () => {
    if (!ref) { alert("Asset link / text boş olamaz."); return; }
    setPool(prev => [...prev, { id: crypto.randomUUID(), kind, ref }]);
    setRef("");
  };

  const saveWill = async () => {
    if (!isPremium) { alert("This is a Premium / Lifetime feature."); return; }
    if (!willRecipients || pool.length === 0) {
      alert("Please choose recipients and add at least one asset.");
      return;
    }
    // TODO: wills, will_assets, will_recipients tabloları ile insert
    alert("Digital will saved (demo). On heartbeat expiry, emails will be sent automatically.");
  };

  if (loading) {
    return (
      <main className="min-h-[60vh] grid place-items-center text-sm opacity-80">
        Loading…
      </main>
    );
  }

  return (
    <main className="wrap px-4 py-8">
      <div className="outer max-w-5xl mx-auto">
        {/* HEADER */}
        <div className="topbar flex items-center justify-between mb-6">
          <Link href="/dashboard" className="brand inline-flex items-center gap-2">
            <img src="/logo.svg" width={28} height={28} alt="After.Me" />
            <span className="font-extrabold tracking-tight">After.Me</span>
          </Link>
          <div className="text-sm opacity-80">
            Plan: <b className="uppercase">{plan}</b>
          </div>
        </div>

        <h1 className="title text-center text-2xl font-black mb-2">Create</h1>
        <p className="text-center opacity-80 mb-8">
          Choose what you want to set up today.
        </p>

        {/* GRID */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* SCHEDULED MESSAGE */}
          <section className="rounded-2xl border border-white/15 bg-[#0b0b0b] p-4">
            <h2 className="font-extrabold text-lg mb-1">Scheduled Message</h2>
            <p className="text-sm opacity-80 mb-4">
              Write a message to be delivered on a future date. Pick recipients and an unlock date.
            </p>

            <div className="grid gap-3">
              <label className="text-sm opacity-90">Title</label>
              <input
                className="bg-[#0a0a0a] border border-white/15 rounded-lg px-3 py-2"
                value={title} onChange={e=>setTitle(e.target.value)} placeholder="E.g., Letter to Mom"
              />

              <label className="text-sm opacity-90">Recipient Emails (comma-separated)</label>
              <input
                className="bg-[#0a0a0a] border border-white/15 rounded-lg px-3 py-2"
                value={recipients} onChange={e=>setRecipients(e.target.value)} placeholder="name1@example.com, name2@example.com"
              />

              <label className="text-sm opacity-90">Unlock Date</label>
              <input
                type="date"
                className="bg-[#0a0a0a] border border-white/15 rounded-lg px-3 py-2"
                value={unlockDate} onChange={e=>setUnlockDate(e.target.value)}
              />

              <label className="text-sm opacity-90">Message</label>
              <textarea
                rows={6}
                className="bg-[#0a0a0a] border border-white/15 rounded-lg px-3 py-2"
                value={message} onChange={e=>setMessage(e.target.value)} placeholder="Write your words…"
              />

              <button onClick={saveScheduled}
                className="mini-btn solid mt-2 inline-block rounded-xl bg-white text-black font-extrabold px-4 py-2">
                Encrypt & Save (Demo)
              </button>
            </div>
          </section>

          {/* DIGITAL WILL */}
          <section className={`rounded-2xl border border-white/15 p-4 ${isPremium ? "bg-[#0b0b0b]" : "bg-[#0b0b0b]/60"}`}>
            <div className="flex items-center gap-2">
              <h2 className="font-extrabold text-lg">Digital Will</h2>
              {!isPremium && <span className="text-xs px-2 py-1 rounded-full border border-white/20 opacity-80">Premium</span>}
            </div>
            <p className="text-sm opacity-80 mb-4">
              Keep an asset pool (audio, video, text). If your heartbeat expires and you don’t renew, we will email selected assets to chosen recipients automatically.
            </p>

            <fieldset disabled={!isPremium} className={`${!isPremium ? "opacity-60 pointer-events-none select-none" : ""}`}>
              <div className="grid gap-3 mb-4">
                <label className="text-sm opacity-90">Recipients (comma-separated)</label>
                <input
                  className="bg-[#0a0a0a] border border-white/15 rounded-lg px-3 py-2"
                  value={willRecipients} onChange={e=>setWillRecipients(e.target.value)} placeholder="heir1@example.com, heir2@example.com"
                />

                <div className="grid md:grid-cols-[140px,1fr,auto] gap-2 items-end">
                  <div>
                    <label className="text-sm opacity-90">Asset Type</label>
                    <select
                      className="bg-[#0a0a0a] border border-white/15 rounded-lg px-3 py-2 w-full"
                      value={kind} onChange={e=>setKind(e.target.value as any)}
                    >
                      <option value="text">Text</option>
                      <option value="audio">Audio</option>
                      <option value="video">Video</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-sm opacity-90">Asset (link or text)</label>
                    <input
                      className="bg-[#0a0a0a] border border-white/15 rounded-lg px-3 py-2 w-full"
                      value={ref} onChange={e=>setRef(e.target.value)} placeholder="Paste a URL or write text"
                    />
                  </div>

                  <button type="button" onClick={addPoolItem}
                    className="rounded-xl border border-white/20 px-4 py-2 font-extrabold">
                    Add
                  </button>
                </div>

                {pool.length > 0 && (
                  <div className="mt-2 border border-white/10 rounded-xl p-3">
                    <div className="text-sm font-bold mb-2">Will Pool</div>
                    <ul className="grid gap-2 text-sm">
                      {pool.map(item => (
                        <li key={item.id} className="flex items-start justify-between gap-3 bg-black/40 rounded-lg p-2">
                          <span className="opacity-80">
                            <b className="uppercase text-xs">{item.kind}</b> — {item.ref}
                          </span>
                          <button
                            className="text-xs opacity-70 hover:opacity-100 underline"
                            onClick={() => setPool(prev => prev.filter(p => p.id !== item.id))}
                          >
                            remove
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <button onClick={saveWill}
                  className="mini-btn solid mt-2 inline-block rounded-xl bg-white text-black font-extrabold px-4 py-2">
                  Save Digital Will (Demo)
                </button>
              </div>
            </fieldset>

            {/* Upsell */}
            {!isPremium && (
              <div className="mt-4 border-t border-white/10 pt-4">
                <p className="text-sm opacity-80 mb-2">Upgrade to unlock Digital Will:</p>
                <div className="flex flex-wrap gap-2">
                  <Link href="/pricing" className="btn-upgrade">Upgrade to Premium</Link>
                  <Link href="/pricing" className="btn-upgrade-alt">Go Lifetime</Link>
                </div>
              </div>
            )}
          </section>
        </div>

        {/* Genel upsell alt bloğu */}
        {!isPremium && (
          <div className="mt-8 text-center">
            <div className="inline-block rounded-2xl border border-white/15 px-5 py-4 bg-black/30">
              <div className="font-black mb-1">Premium & Lifetime Perks</div>
              <ul className="text-sm opacity-85 mb-3 text-left list-disc list-inside">
                <li>Digital Will (auto-send after heartbeat expiry)</li>
                <li>Trusted contacts (2-of-N quorum)</li>
                <li>Priority legacy support</li>
              </ul>
              <div className="flex gap-2 justify-center">
                <Link href="/pricing" className="btn-upgrade">Upgrade to Premium</Link>
                <Link href="/pricing" className="btn-upgrade-alt">Go Lifetime</Link>
              </div>
            </div>
          </div>
        )}

      </div>

      {/* Basit stiller */}
      <style jsx>{`
        .wrap { min-height:100vh; background:#000; color:#fff; }
        .outer { background:#000; border-radius:22px; padding:24px; box-shadow:0 0 32px rgba(255,255,255,.06); }
        .btn-upgrade {
          background:#fff; color:#000; font-weight:900; border-radius:12px; padding:10px 14px;
        }
        .btn-upgrade-alt {
          background:transparent; color:#fff; font-weight:900; border-radius:12px; padding:10px 14px;
          border:1px solid rgba(255,255,255,.25);
        }
        .mini-btn.solid { background:#fff; color:#000; border:1px solid #fff; }
      `}</style>
    </main>
  );
}
