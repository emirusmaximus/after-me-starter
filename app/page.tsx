"use client";

import Link from "next/link";
import React from "react";
import { motion } from "framer-motion";

export default function HomePage(): JSX.Element {
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

      {/* Hero (CENTERED) */}
      <header className="hero">
        <div className="container">
          <div className="hero-wrap">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease: "easeOut" }}
              style={{ width: "100%" }}
            >
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
                <Link href="/signup" className="btn btn--light">Sign Up Now</Link>
                <Link href="/login" className="btn">Log In</Link>
              </div>

              {/* Quote moved near top */}
              <div className="quote-top">
                “He left us his voice. We still hear it every year on his birthday.”
                <small>A Daughter</small>
              </div>
            </motion.div>

            {/* Soft spotlight card (no code block) */}
            <div className="hero-spot" />
          </div>
        </div>
      </header>

      {/* KPIs */}
      <section className="section">
        <div className="container">
          <div className="stats">
            <div className="kpi">
              <b>12,842</b>
              <span>Messages stored</span>
            </div>
            <div className="kpi">
              <b>3,427</b>
              <span>Time capsules waiting</span>
            </div>
            <div className="kpi">
              <b>529</b>
              <span>Final letters delivered</span>
            </div>
          </div>
        </div>
      </section>

      {/* Process (centered) */}
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

      {/* Contact (centered) */}
      <section className="section">
        <div className="container form-wrap" style={{ textAlign: "center" }}>
          <h2 style={{ margin: 0, fontWeight: 800 }}>Contact After.Me</h2>
          <div style={{ marginTop: 2, color: "var(--muted)", fontSize: 22, fontWeight: 700 }}>
            We’re here to help.
          </div>

          <form className="form" onSubmit={(e) => e.preventDefault()}>
            <div style={{ textAlign: "left" }}>
              <label style={{ fontSize: 13, color: "var(--muted)" }}>Name</label>
              <input className="input" placeholder="Jane Smith" />
            </div>
            <div style={{ textAlign: "left" }}>
              <label style={{ fontSize: 13, color: "var(--muted)" }}>Email</label>
              <input className="input" placeholder="jane@framer.com" type="email" />
            </div>
            <div style={{ textAlign: "left" }}>
              <label style={{ fontSize: 13, color: "var(--muted)" }}>Message</label>
              <textarea className="textarea" placeholder="Your message..." />
            </div>
            <div>
              <button className="btn btn--light" type="submit" style={{ width: 160 }}>Submit</button>
            </div>
          </form>
        </div>
      </section>

      {/* Footer (CobsVault Labs) */}
      <section className="container">
        <div className="footer">
          <div style={{ display: "flex", gap: 18, alignItems: "center", flexWrap: "wrap" }}>
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
