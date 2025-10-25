// app/layout.tsx
import "./globals.css";
import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "After.Me — Your Digital Vault of Final Words",
  description: "Write now, store encrypted, deliver later.",
  openGraph: {
    title: "After.Me",
    description: "Your digital vault of final words, memories, and messages.",
    url: "https://app.afterme.app",
    siteName: "After.Me",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "After.Me" }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "After.Me",
    description: "Write now, store encrypted, deliver later.",
    images: ["/og.png"],
  },
  metadataBase: new URL("https://app.afterme.app"),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={jakarta.variable}>{children}</body>
    </html>
  );
}
