export const metadata = {
  title: "After Me",
  description: "Bir gün gidersen, dijital kimliğini kim devralacak?",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr">
      <body style={{ background: "#0b0c10", color: "#fff", fontFamily: "system-ui, sans-serif", padding: 40 }}>
        {children}
      </body>
    </html>
  );
}
