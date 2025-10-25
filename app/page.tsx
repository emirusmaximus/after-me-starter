"use client";

import Link from "next/link";
import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";

export default function HomePage(): JSX.Element {
  // ===== Starfield (canvas) =====
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const c = canvasRef.current;
    if (!c) return;

    const ctx = c.getContext("2d");
    if (!ctx) return;

    let raf = 0;

    const dpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1));
    const resize = () => {
      c.width = Math.floor(window.innerWidth * dpr);
      c.height = Math.floor(window.innerHeight * dpr);
    };
    resize();
    window.addEventListener("resize", resize);

    const stars = Array.from({ length: 220 }).map(() => ({
      x: Math.random() * c.width,
      y: Math.random() * c.height,
      r: Math.random() * 1.8 + 0.3,
      s: Math.random() * 0.015 + 0.003, // twinkle speed
      t: Math.random() * Math.PI * 2,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, c.width, c.height);
      for (const s of stars) {
        s.t += s.s;
        const alpha = 0.4 + 0.6 * (0.5 + 0.5 * Math.cos(s.t));
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r * dpr, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${alpha})`;
        ctx.fill();
      }
      raf = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  // ===== Floating message packets (CSS-only; random seeds) =====
  useEffect(() => {
    const root = document.body;
    const count = 12;
    const nodes: HTMLDivElement[] = [];

    for (let i = 0; i < count; i++) {
      const p = document.createElement("div");
      p.className = "packet";
      p.style.setProperty("--x", `${Math.random() * window.innerWidth - window.innerWidth * 0.2}px`);
      p.style.setProperty("--dx", `${(Math.random() * 0.5 + 0.35) * window.innerWidth}px`);
      p.style.setProperty("--dur", `${18 + Math.random() * 10}s`);
      p.style.left = `${Math.random() * 100}vw`;
      p.style.top = `${Math.random() * 60}vh`;
      root.appendChild(p);
      nodes.push(p);
    }

    return () => {
      nodes.forEach((n) => n.remove());
    };
  }, []);

  return (
    <>
      {/* Starfield Background */}
      <div className="starfield" aria-hidden>
        <canvas ref={canvasRef} className="starfield-canvas" />
      </div>

      {/* Navbar */}
      <nav className="navbar">
        <div className="container navbar-inner">
          <div className="brand">
            <span className="brand-badge" />
            <span>After.Me</span>
          </div>
          <div className="nav-actions">
            <Link href="/login" className="btn btn--ghost">
              Log In
            </Link>
            <Link href="/signup" className="btn btn--light">
              Sign Up
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <header className="hero">
        <div className="container">
          <div className="hero-wrap">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease: "easeOut" }}
            >
              <div className="eyebrow">
                <span className="dot" /> Future-release digital vault
              </div>
              <h1 className="title">
                One day you’ll be gone, <br /> but your <em style={{ fontStyle: "normal", color: "#fff" }}>words</em> can
                remain.
              </h1>
              <p className="subtitle">
                <strong>After.Me</strong> — your digital vault of final words, memories, and messages. Write now, store
                encrypted, deliver later.
              </p>
              <div className="cta">
                <Link href="/signup" className="btn btn--light">
                  Sign Up Now
                </Link>
                <Link href="/login" className="btn">
                  Log In
                </Link>
              </div>
            </motion.div>

            <motion.div
              className="hero-card"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
            >
              <code className="code">
                {`// Client-side AES (planned)
const secret = generateKey();
const ciphertext = encrypt(message, secret);
await supabase.from("vault").insert({ ciphertext });`}
              </code>
            </motion.div>
          </div>
        </div>
      </header>

      {/* KPIs */}
      <section className="section">
        <div className="container">
          <div className="stats">
            <div className="kpi">
              <b>12,842</b>
