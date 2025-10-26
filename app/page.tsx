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
    const animate = (setter: (n: number) => void, target: number, ms = 1800) => {
      const t0 = performance.now();
      const step = (now: number) => {
        const p = Math.min((now - t0) / ms, 1);
        setter(Math.floor(target * p));
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    };
    animate(setMessages, 12842);
    animate(setCapsules, 3427);
    animate(setLetters, 529);
  }, []);

  return (
    <>
      {/* NAVBAR */}
      <nav className="nav">
        <div className="container nav-in">
          <Link href="/" className="brand">
            <span className="badge">
              <img src="/logo.svg" alt="After.Me logo" width={26} height={26} />
            </span>
            <span>After.Me</span>
          </Link>
          <div className="actions">
            <Link href="/login" className="btn ghost">Log In</Link>
            <Link href="/signup" className="btn solid">Sign Up</Link>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <motion.header
        className="hero"
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="container">
          <div className="eyebrow"><span className="dot" /> Future-release digital vault</div>

          <h1 className="title">
            One day you’ll be gone,<br />but your words can remain.
          </h1>

          <p className="subtitle">
            <strong>After.Me</strong> — your digital vault of final words, memories, and messages.
            Write now, store encrypted, deliver later.
          </p>

          <div className="cta">
            <Link href="/signup" className="btn solid lg">Sign Up Now</Link>
            <Link href="/login" className="btn ghost lg">Log In</Link>
          </div>

          <p className="quote">
            “He left us his voice. We still hear it every year on his birthday.”
            <small> — A Daughter</small>
          </p>
        </div>
      </motion.header>

      {/* STATS */}
      <section className="section">
        <div className="container stats">
          <div className="kpi"><b>{messages.toLocaleString()}</b><span>Messages stored</span></div>
          <div className="kpi"><b>{capsules.toLocaleString()}</b><span>Time capsules waiting</span></div>
          <div className="kpi"><b>{letters.toLocaleString()}</b><span>Final letters delivered</span></div>
        </div>
      </section>

      {/* WHAT IS AFTER.ME */}
      <motion.section
        className="section intro"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="container center">
          <div className="intro-icon">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
              <path
                d="M12 2L20 7v10l-8 5-8-5V7l8-5z"
                stroke="#fff"
                strokeOpacity=".8"
                strokeWidth="1.5"
              />
            </svg>
          </div>
          <h2 className="h2">What is After.Me?</h2>
          <p>
            After.Me is a secure digital vault where you can store your last words, thoughts, and memories.
          </p>
          <p>
            If you disappear, your chosen people will receive what you left behind — encrypted, private, and timeless.
          </p>
        </div>
      </motion.section>

      {/* WHY */}
      <motion.section
        className="section"
        initial={{ opacity: 0, y: 22 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="container">
          <div className="slab">
            <div className="slab-icon">
              <svg width="34" height="34" viewBox="0 0 24 24" fill="none">
                <path
                  d="M12 2L2 22h20L12 2z"
                  stroke="#fff"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <circle cx="12" cy="16" r="1.3" fill="#fff" />
              </svg>
            </div>
            <div className="slab-body">
              <h3 className="slab-title">Why After.Me Exists</h3>
              <p className="slab-muted">
                People vanish. Words remain. After.Me was born from the desire to preserve our voices — not data,
                but <em>legacy</em>. It’s where silence meets continuity; where what you write today can comfort someone tomorrow.
              </p>
            </div>
          </div>
        </div>
      </motion.section>

      {/* SECURITY */}
      <motion.section
        className="section"
        initial={{ opacity: 0, y: 22 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="container">
          <div className="slab">
            <div className="slab-icon">
              <svg width="34" height="34" viewBox="0 0 24 24" fill="none">
                <path
                  d="M6 10V8a6 6 0 0112 0v2"
                  stroke="#fff"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                />
                <rect
                  x="5"
                  y="10"
                  width="14"
                  height="10"
                  rx="2"
                  stroke="#fff"
                  strokeWidth="1.4"
                />
              </svg>
            </div>
            <div className="slab-body">
              <h3 className="slab-title">Security & Privacy First</h3>
              <p className="slab-muted">
                Every message is encrypted before it leaves your device. We can’t read your words — and that’s the point.
                Your vault belongs only to you, protected with client-side AES-256 encryption and stored securely on Supabase.
              </p>
            </div>
          </div>
        </div>
      </motion.section>

      {/* FOOTER */}
      <section className="container footer">
        <div className="links">
          <span>Contact</span>
          <a href="#">Email</a><a href="#">Twitter</a><a href="#">Instagram</a>
        </div>
        <div className="legal">
          <div>© 2025 After.Me — A product of <b>CobsVault Labs</b></div>
          <div className="legal-links"><a href="#">Privacy Policy</a><a href="#">Terms</a></div>
        </div>
      </section>

      {/* STYLES */}
      <style jsx global>{`
        ${/* CSS blokunu kısalttım: buraya son attığım CSS’i birebir kopyala */""}
      `}</style>
    </>
  );
}
