// app/login/page.tsx
export const dynamic = "force-dynamic";

import { Suspense } from "react";
import LoginClient from "./_LoginClient";

export default function LoginPage() {
  return (
    <Suspense fallback={<div style={{ padding: 24 }}>Loading…</div>}>
      <LoginClient />
    </Suspense>
  );
}
