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
          <Link href="/" className="brand" title="Go to Home">
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

      {/* WHAT IS AFTER.ME (Stats'ın hemen altı) */}
      <motion.section
        className="section intro"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="container center">
          <div className="intro-icon" aria-hidden>
            {/* minimal clock / continuity icon */}
            <svg width="52" height="52" viewBox="0 0 52 52" fill="none">
              <circle cx="26" cy="26" r="24" stroke="rgba(255,255,255,0.12)" strokeWidth="1.6"/>
              <path d="M26 12v14l8 5" stroke="#fff" strokeWidth="1.6" strokeLinecap="round"/>
            </svg>
          </div>
          <h2 className="h2">What is After.Me?</h2>
          <p className="muted narrow">
            After.Me is a digital vault where your words outlive you. You can write messages, memories, and letters —
            all encrypted before they leave your device — and have them delivered to your chosen people at the right time.
          </p>
          <p className="muted narrow">
            It’s not about data. It’s about <em>legacy</em> — creating a bridge between who you are now and those who’ll read your words in the future.
          </p>
          <div className="cta" style={{ marginTop: 20 }}>
            <Link href="/signup" className="btn solid lg">Start Writing</Link>
            <Link href="/login" className="btn ghost lg">Learn More</Link>
          </div>
        </div>
      </motion.section>

      {/* WHY (Minimal Slab + minimal envelope icon) */}
      <motion.section
        className="section"
        initial={{ opacity: 0, y: 22 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="container">
          <div className="slab">
            <div className="slab-icon" aria-hidden>
              {/* envelope */}
              <svg width="48" height="48" viewBox="0 0 48 48" fill="none" role="img" aria-label="Envelope">
                <rect x="8" y="12" width="32" height="24" rx="6" stroke="white" strokeOpacity=".9" />
                <path d="M10 16 L24 26 L38 16" stroke="white" strokeOpacity=".9" />
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

      {/* SECURITY (Minimal Slab + centered lock) */}
      <motion.section
        className="section"
        initial={{ opacity: 0, y: 22 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="container">
          <div className="slab">
            <div className="slab-icon" aria-hidden>
              {/* lock — shackle centered */}
              <svg width="48" height="48" viewBox="0 0 48 48" fill="none" role="img" aria-label="Lock">
                <rect x="12" y="22" width="24" height="16" rx="6" stroke="white" strokeOpacity=".9" />
                {/* centered shackle: vertical + arc (8 radius) */}
                <path d="M16 22 v-3 a8 8 0 0 1 16 0 v3" stroke="white" strokeOpacity=".9" />
                <circle cx="24" cy="30" r="2" fill="white" />
              </svg>
            </div>
            <div className="slab-body">
              <h3 className="slab-title">Security & Privacy First</h3>
              <p className="slab-muted">
                Every message is encrypted <strong>before</strong> it leaves your device. We can’t read your words — and that’s the point.
                Your vault belongs only to you, protected with client-side AES-256 and stored securely on Supabase.
              </p>
            </div>
          </div>
        </div>
      </motion.section>

      {/* FEATURES */}
      <motion.section
        className="section"
        initial={{ opacity: 0, y: 22 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="container grid">
          <div className="card">
            <h4>Trusted Contacts</h4>
            <p className="muted">Nominate people who can access your vault after verified events.</p>
          </div>
          <div className="card">
            <h4>Posthumous Delivery</h4>
            <p className="muted">Automated releases after inactivity periods or confirmed passing.</p>
          </div>
          <div className="card">
            <h4>Time-Locked Messages</h4>
            <p className="muted">Unlock on a specific future date — not a moment sooner.</p>
          </div>
        </div>
      </motion.section>

      {/* HUMAN STORIES */}
      <motion.section
        className="section"
        initial={{ opacity: 0, y: 22 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="container center">
          <h2 className="h2">Real Messages. Real People.</h2>
          <p className="muted narrow">Anonymous stories from those who’ve already left their mark.</p>
        </div>
        <div className="container grid">
          <div className="card">
            <p className="quote-sm">“To my son: May you never fear the unknown. The stars are closer than they look.”</p>
            <small className="muted">— A Father, 2024</small>
          </div>
          <div className="card">
            <p className="quote-sm">“I wrote this letter when I was 25. If you’re reading it, it means I finally had courage.”</p>
            <small className="muted">— A Stranger, 2023</small>
          </div>
          <div className="card">
            <p className="quote-sm">“He left us his voice. We still hear it every year on his birthday.”</p>
            <small className="muted">— A Daughter</small>
          </div>
        </div>
      </motion.section>

      {/* WAITLIST */}
      <motion.section
        className="section"
        initial={{ opacity: 0, y: 22 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="container center">
          <h2 className="h2">Join the Waitlist</h2>
          <p className="muted">Be among the first to experience After.Me Premium.</p>
          <form className="waitlist" onSubmit={(e) => e.preventDefault()}>
            <input type="email" placeholder="Your email address" />
            <button className="btn solid">Notify Me</button>
          </form>
        </div>
      </motion.section>

      {/* MEMORY SPARKS */}
      <motion.section
        className="section"
        initial={{ opacity: 0, y: 22 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="container sparks">
          <h3 className="sparks-title">“A million words waiting for their moment.”</h3>
          <p className="muted">Every 14 seconds, someone writes their final message.</p>
          <span className="spark" aria-hidden />
        </div>
      </motion.section>

      {/* PROCESS */}
      <section className="section">
        <div className="container center">
          <h3 className="h3 muted">🕰️ How your words travel through time.</h3>
          <div className="muted">A simple process built to last beyond us.</div>
        </div>
        <div className="hr" />
        <div className="container steps">
          <div className="step"><h4>1) Write</h4><p>Compose letters, memories, instructions. Save drafts anytime.</p></div>
          <div className="step"><h4>2) Store</h4><p>Encrypted in your vault. You control visibility and rules.</p></div>
          <div className="step"><h4>3) Deliver</h4><p>Schedule to loved ones or your future self — only when it’s time.</p></div>
        </div>
      </section>

      {/* FOOTER */}
      <section className="container footer">
        <div className="links">
          <span>Contact</span>
          <a href="#">Email</a><a href="#">Twitter</a><a href="#">Instagram</a>
        </div>
        <div className="legal">
          <div>© 2025 After.Me — A product of <b>CobsVault Labs</b></div>
          <div className="legal-links"><a href="#">Privacy Policy</a><a href="#">Terms of Service</a></div>
        </div>
      </section>

      {/* STYLES — Global */}
      <style jsx global>{`
        :root{
          --bg:#050505; --fg:#f5f5f5; --muted:#c7c7c7; --card:#0b0b0b; --border:#1a1a1a;
        }
        body{background:var(--bg);color:var(--fg)}
        .container{max-width:1100px;margin:0 auto;padding:0 20px}
        .nav{border-bottom:1px solid var(--border);backdrop-filter:saturate(1.2) blur(6px)}
        .nav-in{display:flex;justify-content:space-between;align-items:center;height:64px}
        .brand{display:flex;align-items:center;gap:10px;color:#fff}
        .badge{display:grid;place-items:center;border:1px solid #2a2a2a;border-radius:10px;padding:4px;background:#0d0d0d}
        .actions{display:flex;gap:10px}
        .btn{border-radius:10px;padding:10px 14px;font-weight:600;transition:.2s ease}
        .btn.solid{background:#fff;color:#000}
        .btn.ghost{border:1px solid #3a3a3a;color:#fff}
        .btn.lg{padding:12px 18px}
        .btn:hover{transform:translateY(-1px)}
        .hero{padding:72px 0 36px;text-align:center}
        .eyebrow{display:inline-flex;align-items:center;gap:8px;border:1px solid #2b2b2b;border-radius:999px;padding:6px 12px;color:#bdbdbd;font-size:12.5px}
        .dot{width:6px;height:6px;border-radius:50%;background:#fff;box-shadow:0 0 12px #fff}
        .title{font-size:48px;line-height:1.08;margin:16px 0;background:linear-gradient(90deg,#fff,#dcdcdc);-webkit-background-clip:text;color:transparent}
        .subtitle{max-width:820px;margin:0 auto;color:#e6e6e6}
        .cta{display:flex;gap:10px;justify-content:center;margin-top:18px;flex-wrap:wrap}
        .quote{margin-top:18px;opacity:.9}
        .section{padding:48px 0}
        .stats{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:14px;text-align:center}
        .kpi{background:var(--card);border:1px solid var(--border);border-radius:16px;padding:20px;transition:.2s}
        .kpi:hover{transform:translateY(-3px);box-shadow:0 0 24px rgba(255,255,255,.05)}
        .kpi b{display:block;font-size:28px}
        .kpi span{color:var(--muted)}
        .center{text-align:center}
        .h2{font-size:26px;margin-bottom:10
