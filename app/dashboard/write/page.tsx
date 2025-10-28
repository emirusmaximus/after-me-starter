"use client";

import Link from "next/link";
import { useState } from "react";

export default function WritePage() {
  const [title, setTitle] = useState("");
  const [to, setTo] = useState("");
  const [date, setDate] = useState("");
  const [content, setContent] = useState("");

  return (
    <main style={{minHeight:"100vh", background:"#000", color:"#fff"}}>
      <nav style={{display:"flex", alignItems:"center", gap:12, padding:"16px 20px", borderBottom:"1px solid #1a1a1a"}}>
        <Link href="/dashboard" aria-label="Back to Dashboard">
          <img src="/logo.svg" width={28} height={28} alt="After.Me" />
        </Link>
        <span style={{opacity:.9,fontWeight:800}}>New Letter</span>
      </nav>

      <div style={{maxWidth:840, margin:"20px auto", padding:"0 20px"}}>
        <div style={{
          background:"#0b0b0b", border:"1px solid #1a1a1a", borderRadius:16, padding:20,
          boxShadow:"0 0 24px rgba(255,255,255,.05)"
        }}>
          <div style={{display:"grid", gap:10}}>
            <label>Title</label>
            <input
              value={title} onChange={e=>setTitle(e.target.value)} placeholder="E.g., Letter to Mom"
              style={inp}
            />
            <label>Recipient Email</label>
            <input
              value={to} onChange={e=>setTo(e.target.value)} placeholder="name@example.com"
              style={inp}
            />
            <label>Unlock Date</label>
            <input
              type="date" value={date} onChange={e=>setDate(e.target.value)}
              style={inp}
            />
            <label>Message</label>
            <textarea
              rows={10} value={content} onChange={e=>setContent(e.target.value)} placeholder="Write your words…"
              style={{...inp, resize:"vertical"}}
            />
            <div style={{display:"flex", gap:10, marginTop:6}}>
              <button
                onClick={()=>{ alert("Draft saved locally (demo). V1: client-side AES + Supabase."); }}
                style={btnSolid}
              >Encrypt & Save (Demo)</button>
              <Link href="/dashboard" style={btnGhost}>Cancel</Link>
            </div>
            <small style={{opacity:.7}}>Client-side AES-256 şifreleme V1’de eklenecek.</small>
          </div>
        </div>
      </div>
    </main>
  );
}

const inp: React.CSSProperties = {
  background:"#0a0a0a", border:"1px solid #1a1a1a", borderRadius:10, color:"#fff", padding:"12px 12px", outline:"none"
};
const btnSolid: React.CSSProperties = {
  appearance:"none", border:"0", borderRadius:12, padding:"12px 16px", fontWeight:900, background:"#fff", color:"#000", cursor:"pointer"
};
const btnGhost: React.CSSProperties = {
  border:"1px solid #3a3a3a", borderRadius:12, padding:"12px 16px", fontWeight:900, color:"#fff", textDecoration:"none", background:"#0c0c0c"
};
// ... (senin mevcut kodun başı aynı)

            <div style={{display:"flex", gap:10, marginTop:6}}>
              <button
                onClick={()=>{ alert("Draft saved locally (demo). V1: client-side AES + Supabase."); }}
                style={btnSolid}
              >Encrypt & Save (Demo)</button>

              {/* YENİ: Heartbeat Vault linki */}
              <Link href="/dashboard/vault/new" style={btnGhost}>
                Create Heartbeat Vault (Premium/Lifetime)
              </Link>

              <Link href="/dashboard" style={btnGhost}>Cancel</Link>
            </div>

// ... (geri kalanı aynı)
