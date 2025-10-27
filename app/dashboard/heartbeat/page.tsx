"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

type ProfileRow = {
  last_heartbeat_at: string | null;
  heartbeat_grace_days?: number | null;
};

export default function HeartbeatPage() {
  const router = useRouter();
  const qs = useSearchParams();

  const [busy, setBusy] = useState(false);
  const [row, setRow] = useState<ProfileRow | null>(null);
  const [err, setErr] = useState<string | null>(null);

  // Veriyi çek
  useEffect(() => {
    (async () => {
      setErr(null);
      const { data: userRes } = await supabase.auth.getUser();
      const user = userRes?.user;
      if (!user) {
        router.replace("/login?redirectTo=/dashboard/heartbeat");
        return;
      }

      // Profilden son heartbeat ve varsa kullanıcıya özel grace gün sayısı
      const { data, error } = await supabase
        .from("profiles")
        .select("last_heartbeat_at, heartbeat_grace_days")
        .eq("id", user.id)
        .maybeSingle();

      if (error) {
        setErr(error.message);
        setRow(null);
        return;
      }

      // Kayıt yoksa null döner → UI “No heartbeat on record yet.” gösterir
      setRow({
        last_heartbeat_at: data?.last_heartbeat_at ?? null,
        heartbeat_grace_days: data?.heartbeat_grace_days ?? null,
      });
    })();
  }, [router, qs]);

  // Kalan / geciken gün hesapları
  const pretty = useMemo(() => {
    if (!row?.last_heartbeat_at) {
      return {
        lastStr: null as string | null,
        dueStr: null as string | null,
        daysLeft: null as number | null,
        daysOverdue: null as number | null,
        graceDays: row?.heartbeat_grace_days ?? 35,
      };
    }

    const graceDays = (row.heartbeat_grace_days ?? 35) || 35;
    const lastDate = new Date(row.last_heartbeat_at);
    const due = new Date(lastDate.getTime() + graceDays * 24 * 60 * 60 * 1000);

    const msDiff = due.getTime() - Date.now();
    const daysLeft =
      msDiff >= 0 ? Math.ceil(msDiff / (1000 * 60 * 60 * 24)) : 0;
    const daysOverdue =
      msDiff < 0 ? Math.ceil(Math.abs(msDiff) / (1000 * 60 * 60 * 24)) : 0;

    return {
      lastStr: lastDate.toLocaleString(),
      dueStr: due.toLocaleString(),
      daysLeft,
      daysOverdue,
      graceDays,
    };
  }, [row]);

  // Yenile (I'm alive)
  const renew = async () => {
    try {
      setBusy(true);
      setErr(null);

      const { data: userRes } = await supabase.auth.getUser();
      const user = userRes?.user;
      if (!user) {
        setBusy(false);
        router.replace("/login?redirectTo=/dashboard/heartbeat");
        return;
      }

      const nowIso = new Date().toISOString();

      // Profil var/yok fark etmez → upsert
      const { error } = await supabase
        .from("profiles")
        .upsert(
          { id: user.id, last_heartbeat_at: nowIso },
          { onConflict: "id" }
        );

      setBusy(false);

      if (error) {
        setErr(error.message || "Update failed.");
        alert(error.message || "Update failed.");
        return;
      }

      // Başarı → dashboard’a dön, küçük bir sinyal de geç
      router.replace("/dashboard?heartbeat=ok");
    } catch (e: any) {
      setBusy(false);
      const msg = e?.message || "Unexpected error.";
      setErr(msg);
      alert(msg);
    }
  };

  return (
    <main className="px-6 py-10 max-w-xl mx-auto text-center">
      <h1 className="text-2xl mb-2">Renew heartbeat</h1>

      {err && (
        <p className="text-red-500 text-sm mb-3">
          {err}
        </p>
      )}

      {row?.last_heartbeat_at ? (
        <>
          <p className="opacity-80 mb-1">
            Last confirmed: <b>{pretty.lastStr}</b>
          </p>
          <p className="opacity-70 mb-1">
            Grace window: <b>{pretty.graceDays} days</b>
          </p>

          {pretty.dueStr && pretty.daysOverdue === 0 && (
            <p className="opacity-70 mb-6">
              Next due: <b>{pretty.dueStr}</b> ({pretty.daysLeft} days left)
            </p>
          )}

          {pretty.daysOverdue !== null && pretty.daysOverdue > 0 && (
            <p className="opacity-70 mb-6">
              <b>Overdue:</b> missed by {pretty.daysOverdue} day
              {pretty.daysOverdue > 1 ? "s" : ""} (due was {pretty.dueStr})
            </p>
          )}
        </>
      ) : (
        <>
          <p className="opacity-80 mb-1">No heartbeat on record yet.</p>
          <p className="opacity-70 mb-6">
            Grace window: <b>{(row?.heartbeat_grace_days ?? 35) || 35} days</b>
          </p>
        </>
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
