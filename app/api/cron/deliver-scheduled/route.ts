// app/api/cron/deliver-scheduled/route.ts
import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// Build-time evaluation'ı kapat (statik analizde çalışmasın)
export const dynamic = "force-dynamic";
export const runtime = "nodejs"; // veya "edge" kullanmıyorsan nodejs kalsın

export async function GET() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey =
    process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  // Env eksikse: build kırılmasın, sadece runtime'da kontrollü hata ver
  if (!url || !serviceKey) {
    return new NextResponse("Missing Supabase env (URL or KEY).", { status: 500 });
  }

  // ⚠️ Client'ı sadece handler içinde oluştur (modül seviyesinde değil!)
  const supabase = createClient(url, serviceKey, { auth: { persistSession: false } });

  // (Şimdilik no-op: sadece canlıya çıktıktan sonra gerçek iş mantığını eklersin)
  // Örn: scheduled mektupları çek → gönder → durum güncelle
  // const { data, error } = await supabase.from("letters")...

  return NextResponse.json({ ok: true });
}
