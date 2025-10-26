export const metadata = {
  title: "After.Me",
  description: "Write now, store encrypted, deliver later.",
  viewport: "width=device-width, initial-scale=1, maximum-scale=1",
};

import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
