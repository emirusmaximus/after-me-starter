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
            <Link href="/
