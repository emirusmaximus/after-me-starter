"use client";
import Link from "next/link";
import { motion } from "framer-motion";

export default function DashboardPage() {
  return (
    <main className="dashboard-wrap">
      <div className="outer-box">
        <h1 className="title">Choose Your Plan</h1>

        <div className="plans">
          {/* PREMIUM */}
          <div className="plan-card premium">
            <div className="ribbon">Most Chosen</div>
            <h2>Premium</h2>
            <p className="price">$2 / month</p>
            <ul>
              <li>Unlimited letters</li>
              <li>Trusted contacts (quorum)</li>
              <li>Inactivity trigger (heartbeat)</li>
            </ul>
            <Link href="#" className="btn">Upgrade Now</Link>
          </div>

          {/* FREE */}
          <div className="plan-card free">
            <h2>Free</h2>
            <p className="price">$0</p>
            <ul>
              <li>3 letters</li>
              <li>Client-side encryption</li>
              <li>Date-based delivery</li>
            </ul>
            <Link href="#" className="btn">Current Plan</Link>
          </div>

          {/* LIFETIME */}
          <div className="plan-card lifetime">
            <h2>Lifetime</h2>
            <p className="price">$15 (one-time)</p>
            <ul>
              <li>All Premium features</li>
              <li>Priority legacy support</li>
              <li>One-time payment</li>
            </ul>
            <Link href="#" className="btn">Buy Lifetime</Link>
          </div>
        </div>
      </div>

      <style jsx>{`
        .dashboard-wrap {
          min-height: 100vh;
          background: #fff;
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 40px 20px;
        }

        .outer-box {
          background: #fff;
          border: 3px solid #000;
          border-radius: 22px;
          max-width: 1100px;
          width: 100%;
          padding: 50px 30px;
          text-align: center;
          box-shadow: 0 0 30px rgba(0,0,0,0.08);
        }

        .title {
          font-size: 28px;
          margin-bottom: 40px;
          color: #000;
          font-weight: 800;
        }

        .plans {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
        }

        .plan-card {
          position: relative;
          background: #fff;
          border: 2px solid #000;
          border-radius: 18px;
          padding: 24px 20px;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          transition: transform 0.25s ease, box-shadow 0.25s ease;
        }

        .plan-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 8px 30px rgba(0,0,0,0.1);
        }

        .plan-card h2 {
          font-size: 25px;
          font-weight: 800;
          color: #000;
          margin: 0 0 8px;
        }

        .price {
          font-size: 22px;
          color: #000;
          margin-bottom: 14px;
        }

        ul {
          list-style: none;
          padding: 0;
          margin: 0 0 20px;
        }
        ul li {
          color: #000;
          font-size: 18px;
          margin-bottom: 6px;
        }

        .btn {
          background: #000;
          color: #fff;
          text-decoration: none;
          padding: 10px 18px;
          border-radius: 10px;
          font-weight: 700;
          transition: background 0.2s;
        }
        .btn:hover { background: #333; }

        /* Ribbon (çapraz köşe) */
        .ribbon {
          position: absolute;
          top: 18px;
          left: -40px;
          transform: rotate(-45deg);
          background: #000;
          color: #fff;
          padding: 6px 60px;
          font-size: 13px;
          font-weight: 700;
          box-shadow: 0 4px 10px rgba(0,0,0,0.25);
        }

        @media (max-width: 900px) {
          .plans { grid-template-columns: 1fr; }
          .outer-box { padding: 30px 20px; }
        }
      `}</style>
    </main>
  );
}
