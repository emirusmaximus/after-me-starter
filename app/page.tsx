"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function HomePage(): JSX.Element {
  const [messages, setMessages] = useState(0);
  const [capsules, setCapsules] = useState(0);
  const [letters, setLetters] = useState(0);

  useEffect(() => {
    // Basit sayıcı animasyonu (redirect YOK)
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
      <nav className="nav" aria-label="Primary">
        <div className="container nav-in">
          <Link href="/" className="brand" title="Go to Home" aria-label="After.Me — Home">
            <span className="badge" aria-hidden>
              <img src="/logo.svg" alt="" width={26} height={26} />
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
          <h1 className="title">One day you’ll be gone,<br />but your words can remain.</h1>
          <p className="subtitle">
            <strong>After.Me</strong> — your digital vault of final words, memories, and messages.
            Write now, store encrypted, deliver later.
          </p>
          <div className="cta">
            <Link href="/signup" className="btn solid lg">Sign Up Now</Link>
            <Link href="/login" className="btn ghost lg">Log In</Link>
          </div>
          <p className="quote">
            “He left us his voice. We still hear it every year on his birthday.”<small> — A Daughter</small>
          </p>
        </div>
      </motion.header>

      {/* STATS */}
      <section className="section" aria-label="Stats">
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
          <div className="intro-icon" aria-hidden>
            <svg width="52" height="52" viewBox="0 0 52 52" fill="none" role="img" aria-label="Clock">
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
            <div className="slab-icon" aria-hidden>
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
            <div className="slab-icon" aria-hidden>
              <svg width="48" height="48" viewBox="0 0 48 48" fill="none" role="img" aria-label="Lock">
                <rect x="12" y="22" width="24" height="16" rx="6" stroke="white" strokeOpacity=".9" />
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
        <div className="container grid" aria-label="Features">
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
          <form className="waitlist" onSubmit={(e) => e.preventDefault()} aria-label="Waitlist form">
            <label className="sr-only" htmlFor="waitlist-email">Email</label>
            <input id="waitlist-email" type="email" placeholder="Your email address" />
            <button className="btn solid" type="submit">Notify Me</button>
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
        <div className="container sparks" aria-live="polite">
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
      <section className="container footer" aria-label="Footer">
        <div className="links">
          <span>Contact</span>
          <a href="#" aria-label="Email">Email</a>
          <a href="#" aria-label="Twitter">Twitter</a>
          <a href="#" aria-label="Instagram">Instagram</a>
        </div>
        <div className="legal">
          <div>© 2025 After.Me — A product of <b>CobsVault Labs</b></div>
          <div className="legal-links"><a href="#">Privacy Policy</a><a href="#">Terms of Service</a></div>
        </div>
      </section>

      {/* STYLES */}
      <style jsx global>{`
        :root{--bg:#050505;--fg:#f5f5f5;--muted:#c7c7c7;--card:#0b0b0b;--border:#1a1a1a}
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
        .h2{font-size:26px;margin-bottom:10px}
        .h3{font-size:22px;margin-bottom:8px}
        .muted{color:var(--muted)}
        .narrow{max-width:700px;margin:0 auto}
        .grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:18px}
        .card{background:var(--card);border:1px solid var(--border);border-radius:16px;padding:22px;transition:.2s}
        .card:hover{transform:translateY(-3px);box-shadow:0 0 24px rgba(255,255,255,.05)}
        .quote-sm{font-style:italic;color:#eaeaea}
        .waitlist{display:flex;gap:10px;justify-content:center;flex-wrap:wrap;margin-top:12px}
        .waitlist input{width:260px;border:1px solid var(--border);background:#0a0a0a;color:#fff;border-radius:10px;padding:12px 14px}
        .sparks{background:radial-gradient(80% 80% at 50% 50%,#111 0%,#050505 100%);border:1px solid var(--border);border-radius:20px;text-align:center;padding:60px 20px}
        .sparks-title{font-size:28px;margin-bottom:10px;background:linear-gradient(90deg,#fff,#bfbfbf);-webkit-background-clip:text;color:transparent}
        .spark{display:block;width:6px;height:6px;border-radius:50%;background:#fff;margin:16px auto 0;box-shadow:0 0 20px 4px #fff;animation:pulse 2s ease-in-out infinite alternate}
        @keyframes pulse{from{opacity:.15;transform:translateY(0)}to{opacity:.35;transform:translateY(-2px)}}
        .hr{height:1px;background:var(--border);margin:28px 0}
        .steps{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:18px}
        .step{background:var(--card);border:1px solid var(--border);border-radius:16px;padding:22px}
        .footer{display:flex;justify-content:space-between;align-items:center;gap:20px;padding:24px 0;border-top:1px solid var(--border);flex-wrap:wrap}
        .footer .links{display:flex;gap:16px;align-items:center}
        .footer .links span{opacity:.8}
        .footer a{color:#fff;opacity:.85}
        .legal{display:flex;flex-direction:column;gap:6px;align-items:flex-end}
        .legal-links{display:flex;gap:16px}

        /* WHAT IS */
        .intro{padding:64px 0 40px;background:radial-gradient(100% 90% at 50% 30%,rgba(255,255,255,0.03),transparent);border-top:1px solid var(--border);border-bottom:1px solid var(--border)}
        .intro-icon{display:grid;place-items:center;width:68px;height:68px;border-radius:16px;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.1);margin:0 auto 18px}

        /* SLABS */
        .slab{display:flex;gap:18px;align-items:center;border:1px solid var(--border);background:var(--card);border-radius:16px;padding:22px 20px;box-shadow:0 0 16px rgba(255,255,255,0.04)}
        .slab-icon{width:72px;height:72px;min-width:72px;min-height:72px;border:1px solid var(--border);border-radius:14px;display:grid;place-items:center;background:#0c0c0c}
        .slab-body{display:grid;gap:8px}
        .slab-title{margin:0;font-size:24px;line-height:1.2}
        .slab-muted{margin:0;color:var(--muted);max-width:760px}

        /* Prefers-reduced-motion: animasyonları sakinleştir */
        @media (prefers-reduced-motion: reduce) {
          .btn:hover{transform:none}
          .spark{animation:none}
        }

        /* Responsive (landing) */
        @media (max-width: 1024px){
          .container{padding:0 16px}
          .title{font-size:40px}
          .subtitle{max-width:700px}
          .grid{grid-template-columns:repeat(auto-fit,minmax(240px,1fr))}
          .slab{padding:20px 18px;gap:16px}
          .intro{padding:56px 0 36px}
        }
        @media (max-width: 480px){
          .nav-in{height:58px}
          .badge{padding:3px;border-radius:8px}
          .btn{padding:9px 12px;border-radius:9px}
          .btn.lg{padding:10px 14px}
          .hero{padding:56px 0 28px}
          .title{font-size:30px;line-height:1.18}
          .subtitle{font-size:15px}
          .stats{grid-template-columns:1fr}
          .kpi{padding:16px}
          .slab{flex-direction:column;text-align:center}
          .slab-icon{width:60px;height:60px;min-width:60px;min-height:60px}
          .grid{grid-template-columns:1fr}
          .waitlist{gap:8px}
          .waitlist input{width:100%}
          .sparks{padding:40px 16px}
          .steps{grid-template-columns:1fr}
          .footer{gap:14px}
          .legal{align-items:flex-start}
        }
        @supports (padding:max(0px)){
          .nav{padding-left:max(0px,env(safe-area-inset-left));padding-right:max(0px,env(safe-area-inset-right))}
          .footer{padding-left:max(0px,env(safe-area-inset-left));padding-right:max(0px,env(safe-area-inset-right))}
        }
        /* Ekran okuyucu için yardımcı sınıf */
        .sr-only{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0}
      `}</style>
    </>
  );
}
