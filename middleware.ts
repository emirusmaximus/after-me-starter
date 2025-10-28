// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // 1) ŞU YOLLAR HER ZAMAN PUBLIC (login isteme):
  if (
    pathname.startsWith("/api/cron/") ||    // tüm cron endpoint'leri
    pathname.startsWith("/api/heartbeat")   // e-postadaki heartbeat linki
  ) {
    return NextResponse.next();
  }

  // 2) STATIC/ASSET dosyalarına dokunma
  if (
    pathname.startsWith("/_next/") ||
    pathname.startsWith("/favicon") ||
    pathname.startsWith("/assets") ||
    pathname === "/"
  ) {
    return NextResponse.next();
  }

  // 3) (İSTEĞE BAĞLI) /dashboard ve /vault sayfalarını login’e zorla
  //    Eğer şu an hiçbir sayfayı korumuyorsan bu bloğu komple silebilirsin.
  const needsAuth =
    pathname.startsWith("/dashboard") ||
    pathname.startsWith("/vault");

  if (!needsAuth) return NextResponse.next();

  // Supabase auth cookie var mı? (senin projende cookie adı farklıysa ekle)
  const hasSession =
    req.cookies.get("sb-access-token")?.value ||
    req.cookies.get("sb:token")?.value;

  if (!hasSession) {
    const url = req.nextUrl.clone();
    url.pathname = "/login";
    url.searchParams.set("redirectTo", pathname);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

// Bu middleware’in hangi yollarda çalışacağını belirliyoruz.
// NOT: api/cron ve api/heartbeat hariç her şeyde çalışır.
export const config = {
  matcher: ["/((?!api/cron/|api/heartbeat|_next/|favicon|assets).*)"],
};
