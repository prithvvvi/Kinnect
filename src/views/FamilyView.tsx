import { useState } from 'react'
import { motion } from 'framer-motion'
import Header, { LiveBadge } from '../components/layout/Header'
import type { ActivityItem } from '../types'

// ── Static sample data (replaced by Supabase in Phase 3–4) ─────────────────
const ACTIVITY: ActivityItem[] = [
  { id:'1', icon:'📞', iconBg:'bg-teal-light',  title:'Video call — 18 minutes', subtitle:'Yesterday at 6:30 pm', ago:'1d' },
  { id:'2', icon:'📷', iconBg:'bg-amber-light', title:'3 photos shared by Priya', subtitle:'Morning walk · Lunch · Weekend', ago:'Today' },
  { id:'3', icon:'🎙️', iconBg:'bg-green-light', title:'Voice note from Arjun', subtitle:'"Nani, I got an A in Math!"', ago:'Today' },
  { id:'4', icon:'📖', iconBg:'bg-slate-light', title:'Memory recorded by staff', subtitle:"Margaret's garden story · 1:45", ago:'3d' },
]

// ── Quick action button ───────────────────────────────────────────────────────
function QuickBtn({ emoji, label, colorClass, onClick }: {
  emoji: string; label: string; colorClass: string; onClick: () => void
}) {
  const [busy, setBusy] = useState(false)
  return (
    <motion.button
      whileTap={{ scale: 0.95 }}
      whileHover={{ y: -2 }}
      onClick={() => { setBusy(true); onClick(); setTimeout(() => setBusy(false), 2000) }}
      className={`flex-1 ${colorClass} rounded-xl py-4 border-none cursor-pointer flex flex-col items-center gap-2`}
    >
      <span className="text-[22px]">{busy ? '⏳' : emoji}</span>
      <span className="text-[12px] font-bold">{label}</span>
    </motion.button>
  )
}

// ── Activity row ──────────────────────────────────────────────────────────────
function ActivityRow({ item }: { item: ActivityItem }) {
  return (
    <motion.div
      whileHover={{ backgroundColor: 'rgba(255,248,241,0.8)' }}
      className="flex items-center gap-3 px-4 py-3 border-b border-black/[0.06] last:border-b-0 cursor-pointer"
    >
      <div className={`w-9 h-9 rounded-full ${item.iconBg} flex items-center justify-center text-[17px] flex-shrink-0`}>
        {item.icon}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-[13px] font-bold text-ink truncate">{item.title}</p>
        <p className="text-[12px] text-muted mt-0.5 truncate">{item.subtitle}</p>
      </div>
      <span className="text-[11px] font-semibold text-muted flex-shrink-0">{item.ago}</span>
    </motion.div>
  )
}

// ── Main FamilyView ───────────────────────────────────────────────────────────
export default function FamilyView() {
  return (
    <div className="phone-frame">
      {/* Header */}
      <Header
        variant="amber"
        subtitle="Margaret's dashboard"
        pill={<LiveBadge />}
      />

      {/* Mood status card */}
      <div className="mx-5 mt-5 bg-white rounded-2xl shadow-card flex items-center gap-4 px-5 py-4">
        <motion.div
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          className="text-[44px] flex-shrink-0"
          aria-label="Margaret is feeling happy"
        >
          😊
        </motion.div>
        <div className="flex-1">
          <p className="text-[11px] font-extrabold text-muted uppercase tracking-wide">Today's mood</p>
          <p className="text-[19px] font-extrabold text-ink mt-1">Feeling happy</p>
          <p className="text-[12px] text-muted mt-0.5">Checked in 2 hours ago</p>
        </div>
        <div className="bg-green-light text-green text-[11px] font-bold px-3 py-1.5 rounded-full flex-shrink-0">
          ✓ Notified
        </div>
      </div>

      {/* Quick actions */}
      <div className="flex gap-2 px-5 pt-4 pb-2">
        <QuickBtn emoji="📷" label="Share Photo"  colorClass="bg-teal-light text-teal" onClick={() => {}} />
        <QuickBtn emoji="🎙️" label="Voice Note"  colorClass="bg-amber-light text-amber-dark" onClick={() => {}} />
        <QuickBtn emoji="📞" label="Call Now"    colorClass="bg-green-light text-green" onClick={() => {}} />
      </div>

      {/* Recent activity */}
      <section className="px-5 pt-3 pb-2" aria-label="Recent activity">
        <p className="sec-title">Recent activity</p>
      </section>
      <div className="mx-5 bg-white border border-black/[0.07] rounded-xl overflow-hidden mb-4">
        {ACTIVITY.map(item => <ActivityRow key={item.id} item={item} />)}
      </div>

      {/* Bottom nav */}
      <nav className="bot-nav" aria-label="Family navigation">
        <div className="nav-item active">
          <FamHomeIcon /><span className="nav-label">Dashboard</span><div className="nav-dot bg-amber" />
        </div>
        <div className="nav-item"><GalleryIcon /><span className="nav-label">Gallery</span><div className="nav-dot" /></div>
        <div className="nav-item"><FamMsgIcon /><span className="nav-label">Messages</span><div className="nav-dot" /></div>
        <div className="nav-item"><SettingsIcon /><span className="nav-label">Settings</span><div className="nav-dot" /></div>
      </nav>

      <footer className="text-center text-[11px] text-muted py-3 border-t border-black/[0.06]">
        built with ♥ by <strong className="text-teal font-extrabold">Prithvvi</strong> · Kinnect 2025
      </footer>
    </div>
  )
}

// ── Inline SVG nav icons ──────────────────────────────────────────────────────
const s = { width: 22, height: 22, viewBox: '0 0 24 24', fill: 'none', strokeWidth: 2.5, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const }
function FamHomeIcon() {
  return <svg {...s} stroke="#F4883A"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
}
function GalleryIcon() {
  return <svg {...s} stroke="#9A928A"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
}
function FamMsgIcon() {
  return <svg {...s} stroke="#9A928A"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>
}
function SettingsIcon() {
  return <svg {...s} stroke="#9A928A"><circle cx="12" cy="12" r="3"/><path d="M19.07 4.93a10 10 0 010 14.14M4.93 4.93a10 10 0 000 14.14"/></svg>
}
