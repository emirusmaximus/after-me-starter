"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

export default function HeartbeatPage() {
  const [busy, setBusy] = useState(false);
  const [last, setLast] = useState<string>();
  const router = useRouter();

  useEffect(() => {
    (async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { router.replace("/login?redirectTo=/dashboard/heartbeat"); return; }
      const { data } = await supabase.from("profiles").select("last_heartbeat_at").eq("id", user.id).maybeSingle();
      if (data?.last_heartbeat_at) setLast(new Date(data.last_heartbeat_at).toLocaleString());
    })();
  }, [router]);

  const renew = async () => {
    setBusy(true);
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) { setBusy(false); return; }
    const { error } = await supabase.from("profiles")
      .update({ last_heartbeat_at: new Date().toISOString() })
      .eq("id", user.id);
    setBusy(false);
    if (!error) router.replace("/dashboard?heartbeat=ok");
  };

  return (
    <main className="px-6 py-8 max-w-xl mx-auto text-center">
      <h1 className="text-2xl mb-2">Renew heartbeat</h1>
      <p className="opacity-80 mb-6">
        {last ? <>Last confirmed: <b>{last}</b></> : "No heartbeat on record yet."}
      </p>
      <button onClick={renew} disabled={busy} className="rounded-xl border border-emerald-500 px-5 py-2">
        {busy ? "Updating…" : "I’m alive — update now"}
      </button>
    </main>
  );
}
