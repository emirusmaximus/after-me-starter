const CRON_SECRET = process.env.CRON_SECRET || "";
import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const service = process.env.SUPABASE_SERVICE_ROLE!;
const resendKey = process.env.RESEND_API_KEY || "";
const fromEmail = process.env.FROM_EMAIL || "After.Me <noreply@example.com>";

const admin = createClient(url, service, { auth: { persistSession: false } });

export async function GET(req: Request) {
  // ✅ 1) Gizli anahtar kontrolü
  const urlObj = new URL(req.url);
  const key = urlObj.searchParams.get("key");
  if (!CRON_SECRET || key !== CRON_SECRET) {
    return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });
  }

  try {
    const today = new Date().toISOString().slice(0, 10);

    // 2) zamanı gelmiş mektupları çek
    const { data: letters, error: lerr } = await admin
      .from("letters")
      .select("id,title,message")
      .lte("unlock_date", today)
      .is("delivered_at", null);

    if (lerr) throw lerr;
    if (!letters?.length) return NextResponse.json({ ok: true, sent: 0 });

    let sent = 0;

    for (const l of letters) {
      // alıcıları çek
      const { data: recips, error: rerr } = await admin
        .from("letter_recipients")
        .select("email")
        .eq("letter_id", l.id);

      if (rerr) continue;
      const toList = (recips || []).map(r => r.email).filter(Boolean);
      if (!toList.length) continue;

      // 3) e-posta gönder (Resend varsa)
      if (resendKey) {
        await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${resendKey}`,
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            from: fromEmail,
            to: toList,
            subject: l.title,
            html: `<pre style="font-family:ui-monospace,Menlo,monospace">${escapeHtml(l.message)}</pre>`
          })
        });
      } else {
        console.log("[EMAIL DEMO]", { toList, subject: l.title, body: l.message });
      }

      // 4) delivered işaretle
      await admin
        .from("letters")
        .update({ delivered_at: new Date().toISOString(), status: "delivered" })
        .eq("id", l.id);

      sent++;
    }

    return NextResponse.json({ ok: true, sent });
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: e?.message || "error" }, { status: 500 });
  }
}

// HTML kaçış fonksiyonu
function escapeHtml(s: string) {
  return s.replace(/[&<>"']/g, (m) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "\"": "&quot;", "'": "&#039;" }[m] as string)
  );
}
