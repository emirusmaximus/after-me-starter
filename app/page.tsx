"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function HomePage() {
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

      {/* Hero (centered, tighter spacing) */}
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

            {/* Quote moved near top */}
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

      {/* Process */}
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
