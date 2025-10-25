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
    <div style={{ flex: "1 1 320px" }}>
      <img src="https://cdn-icons-png.flaticon.com/512/3064/3064197.png" alt="lock icon"
           style={{ width: 100, filter: "invert(1)", opacity: 0.9 }}/>
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
      style={{
        display: "flex",
        justifyContent: "center",
        gap: 10,
        flexWrap: "wrap",
      }}
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
      <button
        type="submit"
        className="btn btn--light pulse"
        style={{ minWidth: 140 }}
      >
        Notify Me
      </button>
    </form>
  </div>
</motion.section>
