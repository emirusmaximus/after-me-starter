import { NextResponse } from "next/server";
import { admin } from "@/lib/supabaseAdmin";
import { Resend } from "resend";

export const dynamic = "force-dynamic";

function deny(msg:string, status=401) {
  return NextResponse.json({ ok:false, error: msg }, { status });
}

const resend = new Resend(process.env.RESEND_API_KEY!);

export async function GET(req: Request) {
  const url = new URL(req.url);
  const key = url.searchParams.get("key") || req.headers.get("x-cron-key") || "";
  if (!process.env.CRON_SECRET) return deny("CRON_SECRET missing", 500);
  if (key !== process.env.CRON_SECRET) return deny("invalid key");

  const FROM = process.env.FROM_EMAIL || "After.Me <noreply@example.com>";

  // 35+ gün geciken kullanıcılar
  const { data: users, error: uErr } = await admin.rpc("get_users_due_for_heartbeat_release");
  if (uErr) return NextResponse.json({ ok:false, error:uErr.message }, { status: 500 });

  let deliveredCount = 0;

  for (const u of users || []) {
    // Kullanıcının açık vault'ları
    const { data: vaults } = await admin
      .from("vaults")
      .select(`
        id, title, note,
        vault_recipients (email, name),
        vault_items (kind, encrypted_payload, storage_path)
      `)
      .eq("user_id", u.id)
      .eq("status","open");

    for (const vault of vaults || []) {
      // Dosyalar için 24 saatlik signed URL’ler
      const links: string[] = [];
      for (const it of vault.vault_items || []) {
        if (it.storage_path) {
          const { data } = await admin.storage.from("vaults")
            .createSignedUrl(it.storage_path, 60*60*24);
          if (data?.signedUrl) links.push(data.signedUrl);
        }
      }

      for (const rcpt of vault.vault_recipients || []) {
        const text = [
          `Merhaba ${rcpt.name || ""}`.trim() + ",",
          `Bu e-posta, ${u.email || "After.Me üyesi"} adına kayıtlı vasiyet havuzunun otomatik teslimidir.`,
          vault.title ? `Başlık: ${vault.title}` : "",
          vault.note ? `Not: ${vault.note}` : "",
          links.length ? ["", "Dosyalar (zaman kısıtlı linkler):", ...links].join("\n") : "",
          "",
          `Güvenli görüntüleme: https://app.afterme.app/vault/view?vault=${vault.id}`,
          "Not: Gönderen 35 gün boyunca heartbeat yenilemediği için bu teslim gerçekleşti."
        ].join("\n");

        if (process.env.RESEND_API_KEY) {
          await resend.emails.send({
            from: FROM, to: rcpt.email,
            subject: `After.Me — ${vault.title ?? "Vasiyet Havuzu"}`,
            text
          });
        } else {
          console.log("[EMAIL DEMO]", rcpt.email, text);
        }
        deliveredCount++;
      }

      // En az bir alıcı varsa vault'u delivered yap
      if ((vault.vault_recipients || []).length > 0) {
        await admin.from("vaults").update({ status: "delivered" }).eq("id", vault.id);
      }
    }
  }

  return NextResponse.json({ ok:true, deliveredCount });
}
