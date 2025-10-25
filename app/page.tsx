"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function HomePage(): JSX.Element {
  // Animated counters
  const [messages, setMessages] = useState(0);
  const [capsules, setCapsules] = useState(0);
  const [letters, setLetters] = useState(0);

  useEffect(() => {
    const animate = (setter: (v: number) => void, target: number, ms = 1800) => {
      const start = performance.now();
      const tick = (now: number) => {
        const p = Math.min((now - start) / ms, 1);
        setter(Math.floor(target * p));
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    };
    animate(setMessages, 12842);
    animate(setCapsules, 3427);
    animate(setLetters, 529);
  }, []);

  return (
    <>
      {/* Navbar */}
      <nav className="navbar">
        <div className="container navbar-inner">
          <div className="brand">
            <span className="brand-badge">
              <img src="/logo.svg" alt="After.Me logo" width={28} height={28} />
            </span>
            <span>After.Me</span>
          </div>
          <div className="nav-actions">
            <Link href="/login" className="btn">Log In</Link>
            <Link href="/signup" className="btn btn--light">Sign Up</Link>
          </div>
        </div>
      </nav>

      {/* Hero (centered, balanced spacing) */}
      <motion.header
        className="hero"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        <div className="container">
          <div className="hero-wrap">
            <div className="eyebrow">
              <span className="dot" /> Future-release digital vault
            </div>

            <h1 className="title">
              One day you’ll be gone, <br />
              but your <em style={{ fontStyle: "normal" }}>words</em> can remain.
            </h1>

            <p className="subtitle">
              <strong>After.Me</strong> — your digital vault of final words, memories, and messages.
              Write now, store encrypted, deliver later.
            </p>

            <div className="cta">
              <Link href="/signup" className="btn btn--light pulse">Sign Up Now</Link>
              <Link href="/login" className="btn">Log In</Link>
            </div>

            {/* Quote near top */}
            <p className="quote-top">
              “He left us his voice. We still hear it every year on his birthday.”
              <small>A Daughter</small>
            </p>
          </div>
        </div>
      </motion.header>

      {/* Stats */}
      <motion.section
        className="section"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="container">
          <div className="stats">
            <div className="kpi">
              <b>{messages.toLocaleString()}</b>
              <span>Messages stored</span>
            </div>
            <div className="kpi">
              <b>{capsules.toLocaleString()}</b>
              <span>Time capsules waiting</span>
            </div>
            <div className="kpi">
              <b>{letters.toLocaleString()}</b>
              <span>Final letters delivered</span>
            </div>
          </div>
        </div>
      </motion.section>

      {/* ===== NEW SECTIONS (below stats) ===== */}

      {/* WHY AFTER.ME EXISTS */}
      <motion.section
        className="section"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="container" style={{ textAlign: "center" }}>
          <h2 style={{ fontSize: 26, marginBottom: 16 }}>Why After.Me Exists</h2>
          <p style={{ color: "var(--muted)", maxWidth: 680, margin: "0 auto", lineHeight: 1.7 }}>
            People vanish. Words remain.<br />
            After.Me was born from the desire to preserve our voices — not data, but <em>legacy</em>.
            It’s where silence meets continuity; where what you write today can comfort someone tomorrow.
          </p>
        </div>
      </motion.section>

      {/* SECURITY & PRIVACY */}
      <motion.section
        className="section"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="container" style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "40px" }}>
          <div style={{ flex: "1 1 320px", display: "flex", justifyContent: "center" }}>
            {/* basit kilit ikonu (inverted) */}
            <img
              src="https://cdn-icons-png.flaticon.com/512/3064/3064197.png"
              alt="lock icon"
              style={{ width: 90, filter: "invert(1)", opacity: 0.9 }}
            />
          </div>
          <div style={{ flex: "2 1 480px" }}>
            <h3 style={{ fontSize: 22, marginBottom: 8 }}>Security & Privacy First</h3>
            <p style={{ color: "var(--muted)", lineHeight: 1.7 }}>
              Every message is encrypted <strong>before</strong> it leaves your device.
              We can’t read your words — and that’s the point.
              Your vault belongs only to you, protected with client-side AES-256 encryption
              and stored securely on distributed Supabase servers.
            </p>
          </div>
        </div>
      </motion.section>

      {/* ADVANCED FEATURES */}
      <motion.section
        className="section"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="container" style={{ textAlign: "center" }}>
          <h2 style={{ fontSize: 26, marginBottom: 20 }}>Beyond a Time Capsule</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))", gap: 24 }}>
            <div style={{ border: "1px solid var(--border)", borderRadius: 12, padding: 20 }}>
              <h4>Trusted Contacts</h4>
              <p style={{ color: "var(--muted)" }}>Nominate people who can access your vault after confirmation of life events.</p>
            </div>
            <div style={{ border: "1px solid var(--border)", borderRadius: 12, padding: 20 }}>
              <h4>Posthumous Delivery</h4>
              <p style={{ color: "var(--muted)" }}>Automated releases triggered after inactivity periods or verified passing.</p>
            </div>
            <div style={{ border: "1px solid var(--border)", borderRadius: 12, padding: 20 }}>
              <h4>Time-Locked Messages</h4>
              <p style={{ color: "var(--muted)" }}>Choose a specific date in the future — your message will unlock only then.</p>
            </div>
          </div>
        </div>
      </motion.section>

      {/* HUMAN STORIES */}
      <motion.section
        className="section"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="container" style={{ textAlign: "center" }}>
          <h2 style={{ fontSize: 26, marginBottom: 16 }}>Real Messages. Real People.</h2>
          <p style={{ color: "var(--muted)", maxWidth: 640, margin: "0 auto 28px" }}>
            Anonymous stories from those who’ve already left their mark.
          </p>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", gap: 20 }}>
            <div style={{ border: "1px solid var(--border)", borderRadius: 12, padding: 20 }}>
              <p style={{ fontStyle: "italic", color: "#eaeaea" }}>
                “To my son: May you never fear the unknown. The stars are closer than they look.”
              </p>
              <small style={{ color: "var(--muted)" }}>– A Father, 2024</small>
            </div>
            <div style={{ border: "1px solid var(--border)", borderRadius: 12, padding: 20 }}>
              <p style={{ fontStyle: "italic", color: "#eaeaea" }}>
                “I wrote this letter when I was 25. If you’re reading it, it means I finally had courage.”
              </p>
              <small style={{ color: "var(--muted)" }}>– A Stranger, 2023</small>
            </div>
            <div style={{ border: "1px solid var(--border)", borderRadius: 12, padding: 20 }}>
              <p style={{ fontStyle: "italic", color: "#eaeaea" }}>
                “He left us his voice. We still hear it every year on his birthday.”
              </p>
              <small style={{ color: "var(--muted)" }}>– A Daughter</small>
            </div>
          </div>
        </div>
      </motion.section>

      {/* JOIN THE WAITLIST */}
      <motion.section
        className="section"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="container" style={{ textAlign: "center" }}>
          <h2 style={{ fontSize: 26, marginBottom: 12 }}>Join the Waitlist</h2>
          <p style={{ color: "var(--muted)", marginBottom: 20 }}>
            Be among the first to experience the full release of After.Me Premium.
          </p>
          <form
            style={{ display: "flex", justifyContent: "center", gap: 10, flexWrap: "wrap" }}
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              type="email"
              placeholder="Your email address"
              style={{
                padding: "12px 14px",
                borderRadius: 10,
                border: "1px solid var(--border)",
                background: "#0c0c0c",
                color: "#fff",
                width: 260,
              }}
            />
            <button type="submit" className="btn btn--light pulse" style={{ minWidth: 140 }}>
              Notify Me
            </button>
          </form>
        </div>
      </motion.section>

      {/* ===== END NEW SECTIONS ===== */}

      {/* Process (keep) */}
      <section className="section">
        <div className="container" style={{ textAlign: "center" }}>
          <h3 style={{ fontSize: 22, color: "var(--muted)", marginBottom: 12 }}>
            🕰️ How your words travel through time.
          </h3>
          <div style={{ color: "var(--muted)" }}>A simple process built to last beyond us.</div>
        </div>
        <div className="hr" />
        <div className="steps">
          <div className="step">
            <h4>1) Write</h4>
            <p>Compose letters, memories, and instructions. Save drafts whenever you need.</p>
          </div>
          <div className="step">
            <h4>2) Store</h4>
            <p>Encrypted in your vault. You control visibility and release conditions.</p>
          </div>
          <div className="step">
            <h4>3) Deliver</h4>
            <p>Schedule to loved ones or your future self — only when the time is right.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <section className="container">
        <div className="footer">
          <div style={{ display: "flex", gap: 18 }}>
            <span style={{ opacity: 0.8 }}>Contact</span>
            <a href="#">Email</a>
            <a href="#">Twitter</a>
            <a href="#">Instagram</a>
          </div>
          <div>
            <div>© 2025 After.Me — A product of <b>CobsVault Labs</b></div>
            <div style={{ display: "flex", gap: 18 }}>
              <a href="#">Privacy Policy</a>
              <a href="#">Terms of Service</a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
