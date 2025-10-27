"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

export default function HeartbeatPage() {
  const [busy, setBusy] = useState(false);
  const [last, setLast] = useState<string | null>(null);
  const router = useRouter();

  // Veriyi çek
  useEffect(() => {
    (async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { router.replace("/login?redirectTo=/dashboard/heartbeat"); return; }

      const { data, error } = await supabase
        .from("profiles")
        .select("last_heartbeat_at")
        .eq("id", user.id)
        .maybeSingle();

      if (!error && data?.last_heartbeat_at) {
        setLast(data.last_heartbeat_at);
      } else {
        setLast(null);
      }
    })();
  }, [router]);

  // Kalan gün / due hesapları (UI için)
  const pretty = useMemo(() => {
    if (!last) return { lastStr: null, dueStr: null, daysLeft: null };
    const lastDate = new Date(last);
    const due = new Date(lastDate.getTime() + 35 * 24 * 60 * 60 * 1000);
    const daysLeft = Math.max(0, Math.ceil((due.getTime() - Date.now()) / (1000 * 60 * 60 * 24)));
    return {
      lastStr: lastDate.toLocaleString(),
      dueStr: due.toLocaleString(),
      daysLeft,
    };
  }, [last]);

  // Yenile
  const renew = async () => {
    try {
      setBusy(true);
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { setBusy(false); return; }

      const nowIso = new Date().toISOString();

      // Profili olmayan kullanıcıyı da kapsasın diye upsert
      const { error } = await supabase
        .from("profiles")
        .upsert(
          { id: user.id, last_heartbeat_at: nowIso },
          { onConflict: "id" }
        );

      setBusy(false);
      if (!error) {
        // başarı: dashboard’a küçük toast sinyali
        router.replace("/dashboard?heartbeat=ok");
      } else {
        alert(error.message || "Update failed.");
      }
    } catch (e: any) {
      setBusy(false);
      alert(e?.message || "Unexpected error.");
    }
  };

  return (
    <main className="px-6 py-8 max-w-xl mx-auto text-center">
      <h1 className="text-2xl mb-2">Renew heartbeat</h1>

      {pretty.lastStr ? (
        <p className="opacity-80 mb-1">
          Last confirmed: <b>{pretty.lastStr}</b>
        </p>
      ) : (
        <p className="opacity-80 mb-1">No heartbeat on record yet.</p>
      )}
      {pretty.dueStr && (
        <p className="opacity-70 mb-6">
          Next due: <b>{pretty.dueStr}</b> ({pretty.daysLeft} days left)
        </p>
      )}

      <button
        onClick={renew}
        disabled={busy}
        className="rounded-xl border border-emerald-500 px-5 py-2 disabled:opacity-60"
      >
        {busy ? "Updating…" : "I’m alive — update now"}
      </button>
    </main>
  );
}
