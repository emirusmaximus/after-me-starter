import { createClient } from "@supabase/supabase-js";

// Supabase'i kalıcı oturumla oluşturuyoruz
export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL as string,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string,
  {
    auth: {
      persistSession: true,        // ✅ Oturum localStorage'da saklanır
      autoRefreshToken: true,      // ✅ Token süresi dolunca otomatik yeniler
      detectSessionInUrl: true,    // ✅ Email doğrulama linklerini destekler
      storage:
        typeof window !== "undefined"
          ? window.localStorage    // ✅ Tarayıcıyı kapatsan bile giriş hatırlanır
          : undefined,
    },
  }
);
