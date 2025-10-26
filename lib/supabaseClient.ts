import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL as string,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string,
  {
    auth: {
      persistSession: true,        // ✅ Kullanıcı oturumu tarayıcıda saklanır
      autoRefreshToken: true,      // ✅ Token otomatik yenilenir
      detectSessionInUrl: true,
      storage:
        typeof window !== "undefined"
          ? window.localStorage
          : undefined,
    },
  }
);
