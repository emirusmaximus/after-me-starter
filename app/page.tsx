"use client";

import Link from "next/link";
import React from "react";
import { motion } from "framer-motion";

export default function HomePage() {
  // Hover parıltısı için mouse konumu
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    const mx = ((e.clientX - r.left) / r.width) * 100;
    const my = ((e.clientY - r.top) / r.height) * 100;
    el.style.setProperty("--mx", `${mx}%`);
    el.style.setProperty("--my", `${my}%`);
  };

  return (
    <>
      {/* Navbar */}
      <nav className="navbar">
        <div className="container navbar-inner">
          <div className="brand">
            <span className="brand-badge" />
            <span>After.Me</span>
          </div>
          <div className="nav-actions">
            <Link href="/login" className="btn btn--ghost">Log In</Link>
            <Link href="/signup" className="btn btn--accent">Sign Up</Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <header className="hero">
        {/* Arkaplan orblar */}
        <div className="container" style={{ position: "relative" }}>
          <div className="bg-orb bg-orb--indigo" style={{ left: -80, top: -40 }} />
          <div className="bg-orb bg-orb--cyan" style={{ right: -120, top: -60 }} />

          <div className="hero-wrap">
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease: "easeOut" }}
            >
              <div className="hero-eyebrow">
                <span className="pulse-dot" />
                Future-release digital vault
              </div>

              <h1 className="hero-title">
                One day you’ll be gone, <br />
                but your <em style={{ color: "var(--accent-2)", fontStyle: "normal" }}>words</em> can remain.
              </h1>

              <p className="hero-sub">
                <strong>After.Me</strong> — your digital vault of final words, memories, and messages.
                Write now, store encrypted, deliver later.
              </p>

              <motion.div
                className="hero-cta"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, ease: "easeOut", delay: 0.15 }}
              >
                <Link href="/signup" className="btn btn--accent">Sign Up Now</Link>
                <Link href="/login" className="btn">Log In</Link>
              </motion.div>
            </motion.div>

            <motion.div
              className="hero-card"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
            >
              <code className="hero-code">
{`// Client-side AES (planned)
const secret = generateKey();
const ciphertext = encrypt(message, secret);
await supabase.from("vault").insert({ ciphertext });`}
              </code>
            </motion.div>
          </div>
        </div>
      </header>

      {/* Features */}
      <section className="section">
        <div className="container">
          <h3 className="section-title">What you can do</h3>
          <div className="features">
            <motion.div
              className="feature"
              onMouseMove={handleMouseMove}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-20% 0px -20% 0px" }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              <div className="feature-icon" />
              <h4>Write</h4>
              <p>Capture final words, letters, and instructions in your own voice, whenever you’re ready.</p>
            </motion.div>

            <motion.div
              className="feature"
              onMouseMove={handleMouseMove}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, ease: "easeOut", delay: 0.05 }}
            >
              <div className="feature-icon" />
              <h4>Store</h4>
              <p>Keep them encrypted in your private vault. You’re in control of what’s visible and when.</p>
            </motion.div>

            <motion.div
              className="feature"
              onMouseMove={handleMouseMove}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
            >
              <div className="feature-icon" />
              <h4>Deliver</h4>
              <p>Schedule delivery to loved ones or to your future self — only when the time is right.</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats + Testimonial */}
      <section className="section">
        <div className="container">
          <div className="stats">
            <motion.div
              className="stat"
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35 }}
            >
              <b>99.9%</b>
              <div>Uptime on Vercel</div>
            </motion.div>

            <motion.div
              className="stat"
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: 0.05 }}
            >
              <b>Supabase</b>
              <div>Auth & Postgres</div>
            </motion.div>

            <motion.div
              className="stat"
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: 0.1 }}
            >
              <b>Client-first</b>
              <div>Encryption roadmap</div>
            </motion.div>
          </div>

          <motion.div
            className="testimonial"
            initial={{ opacity: 0, y: 6 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.05 }}
          >
            “After.Me helped me put into words what matters. I wrote it once — now it will reach them when it should.”
          </motion.div>
        </div>
      </section>

      {/* CTA Footer */}
      <section className="container">
        <motion.div
          className="cta"
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          <div>
            <div style={{ opacity: .7, fontSize: 13 }}>Ready to begin?</div>
            <div style={{ fontSize: 20, fontWeight: 800 }}>Create your vault today.</div>
          </div>
          <div style={{ display: "flex", gap: 10 }}>
            <Link href="/signup" className="btn btn--accent">Get Started</Link>
            <Link href="/login" className="btn">I already have an account</Link>
          </div>
        </motion.div>
      </section>

      {/* Sticky mobile Sign Up bar */}
      <div className="signbar">
        <div className="signbar-inner">
          <span style={{ color: "var(--text-muted)", fontSize: 13 }}>
            Start your legacy vault on After.Me
          </span>
          <div style={{ display: "flex", gap: 8 }}>
            <Link href="/login" className="btn btn--ghost">Log In</Link>
            <Link href="/signup" className="btn btn--accent">Sign Up</Link>
          </div>
        </div>
      </div>
    </>
  );
}
