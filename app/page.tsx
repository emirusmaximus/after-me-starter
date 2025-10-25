"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function HomePage(): JSX.Element {
  // animated counters
  const [messages, setMessages] = useState(0);
  const [capsules, setCapsules] = useState(0);
  const [letters, setLetters] = useState(0);

  useEffect(() => {
    const animateValue = (set: any, target: number) => {
      let start = 0;
      const step = () => {
        start += (target - start) * 0.12;
        if (Math.abs(target - start) < 1) {
          set(target);
          return;
        }
        set(Math.floor(start));
        requestAnimationFrame(step);
      };
      step();
    };
    animateValue(setMessages, 12842);
    animateValue(setCapsules, 3427);
    animateValue(setLetters, 529);
  }, []);

  return (
    <>
      <nav
        className="navbar"
        style={{
          position: "sticky",
          top: 0,
          zIndex: 50,
          backdropFilter: "blur(10px)",
          background: "rgba(0,0,0,0.75)",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        <div
          className="container navbar-inner"
          style={{
            height: "72px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div
            className="brand"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              fontWeight: 800,
              letterSpacing: "0.2px",
            }}
          >
            <span
              className="brand-badge"
              style={{
                width: "28px",
                height: "28px",
                borderRadius: "6px",
                overflow: "hidden",
              }}
            >
              <img
                src="/logo.svg"
                alt="After.Me logo"
                width={28}
                height={28}
              />
            </span>
            <span>After.Me</span>
          </div>
          <div className="nav-actions" style={{ display: "flex", gap: "10px" }}>
            <Link
              href="/login"
              className="btn"
              style={{
                padding: "10px 16px",
                borderRadius: "10px",
                border: "1px solid rgba(255,255,255,0.1)",
              }}
            >
              Log In
            </Link>
            <Link
              href="/signup"
              className="btn btn--light"
              style={{
                background: "#fff",
                color: "#000",
                padding: "10px 16px",
                borderRadius: "10px",
              }}
            >
              Sign Up
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <motion.header
        className="hero"
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: "easeOut" }}
        style={{
          background: "linear-gradient(180deg,#050505 0%,#0a0a0a 100%)",
          color: "#fff",
          textAlign: "center",
          padding: "70px 0 40px",
        }}
      >
        <div className="container" style={{ maxWidth: 900, margin: "0 auto" }}>
          <div
            style={{
              display: "inline-flex",
              gap: "8px",
              alignItems: "center",
              fontSize: "13px",
              color: "rgba(255,255,255,0.6)",
              border: "1px solid rgba(255,255,255,0.08)",
              padding: "6px 10px",
              borderRadius: "999px",
              background: "rgba(255,255,255,0.03)",
              marginBottom: 16,
            }}
          >
            <span
              style={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                background: "#fff",
                boxShadow: "0 0 10px #fff",
              }}
            />
            Future-release digital vault
          </div>

          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.1 }}
            style={{
              margin: "14px 0 10px",
              fontWeight: 800,
              lineHeight: 1.05,
              letterSpacing: "-.02em",
              fontSize: "clamp(36px,5vw,60px)",
            }}
          >
            One day you’ll be gone,<br /> but your{" "}
            <span style={{ color: "#fff" }}>words</span> can remain.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.3 }}
            style={{
              color: "rgba(255,255,255,0.6)",
              fontSize: 18,
              maxWidth: 620,
              margin: "0 auto",
            }}
          >
            <strong>After.Me</strong> — your digital vault of final words,
            memories, and messages. Write now,
