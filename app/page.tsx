import Link from "next/link";

export default function Home() {
  return (
    <main style={{ textAlign: "center", marginTop: "20vh" }}>
      <h1 style={{ fontSize: "2.5rem", fontWeight: 700 }}>After Me</h1>
      <p style={{ marginTop: 12, fontSize: "1.1rem", opacity: 0.8 }}>
        “Bir gün gidersen, dijital kimliğini kim devralacak?”
      </p>

      <div style={{ marginTop: 30 }}>
        <Link
          href="/signup"
          style={{
            marginRight: 16,
            padding: "10px 18px",
            background: "#fff",
            color: "#000",
            borderRadius: 8,
            textDecoration: "none",
            fontWeight: 600,
          }}
        >
          Üye Ol
        </Link>
        <Link
          href="/login"
          style={{
            padding: "10px 18px",
            border: "2px solid #fff",
            borderRadius: 8,
            textDecoration: "none",
            fontWeight: 600,
          }}
        >
          Giriş Yap
        </Link>
      </div>
    </main>
  );
}
