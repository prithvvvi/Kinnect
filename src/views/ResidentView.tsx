import { useState } from 'react'
import { motion } from 'framer-motion'
import Header from '../components/layout/Header'
import MoodRow from '../components/shared/MoodRow'
import VoiceCard from '../components/shared/VoiceCard'
import CallButton from '../components/shared/CallButton'
import type { Mood, Photo, VoiceMessage } from '../types'

// ── Static sample data (replaced by Supabase in Phase 3–4) ─────────────────

const PHOTOS: Photo[] = [
  { id: '1', emoji: '🌳', label: 'Morning walk', gradient: 'from-[#c7f2e8] to-[#9dd9cf]' },
  { id: '2', emoji: '🍱', label: "Priya's lunch",  gradient: 'from-[#fde8c8] to-[#f9c784]' },
  { id: '3', emoji: '🎉', label: 'Weekend fun',   gradient: 'from-[#d4e8ff] to-[#a8c8f0]' },
]

const VOICE_MESSAGES: VoiceMessage[] = [
  { id: '1', from: 'Daughter — Priya',    preview: '"Mom, we are coming Sunday..."', duration: '0:22' },
  { id: '2', from: 'Grandson — Arjun',   preview: '"Nani, I got an A in Math!"',    duration: '0:15' },
]

// ── Photo tile ──────────────────────────────────────────────────────────────
function PhotoTile({ photo }: { photo: Photo }) {
  return (
    <motion.div
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.97 }}
      className={`flex-1 rounded-xl overflow-hidden h-24 relative cursor-pointer bg-gradient-to-br ${photo.gradient}`}
      role="img"
      aria-label={photo.label}
    >
      <div className="w-full h-full flex items-center justify-center text-3xl">
        {photo.emoji}
      </div>
      <div className="absolute bottom-0 left-0 right-0 bg-black/35 text-white text-[11px] font-bold px-2 py-1">
        {photo.label}
      </div>
    </motion.div>
  )
}

// ── Quick action button (bottom nav quick-actions) ───────────────────────────
function QuickAction({ emoji, label, color, onClick }: {
  emoji: string; label: string; color: string; onClick: () => void
}) {
  const [busy, setBusy] = useState(false)
  function act() {
    setBusy(true)
    onClick()
    setTimeout(() => setBusy(false), 2000)
  }
  return (
    <motion.button
      whileTap={{ scale: 0.95 }}
      onClick={act}
      className={`flex-1 ${color} rounded-xl py-4 flex flex-col items-center gap-2 border-none cursor-pointer`}
    >
      <span className="text-2xl">{busy ? '⏳' : emoji}</span>
      <span className="text-[12px] font-bold">{busy ? 'Opening...' : label}</span>
    </motion.button>
  )
}

// ── Main ResidentView ────────────────────────────────────────────────────────
export default function ResidentView() {
  const [mood, setMood] = useState<Mood | null>(null)

  return (
    <div className="phone-frame">
      {/* Header */}
      <Header variant="teal" showGreeting residentName="Margaret" />

      {/* Call button */}
      <div className="px-5 pt-5 pb-3">
        <CallButton />
      </div>

      {/* Mood check-in */}
      <section className="px-5 pb-4" aria-label="Mood check-in">
        <p className="sec-title">How are you feeling today?</p>
        <MoodRow selected={mood} onSelect={setMood} />
      </section>

      {/* Today from family */}
      <section className="px-5 pb-4" aria-label="Photos from your family">
        <p className="sec-title">Today from your family</p>
        <div className="flex gap-2">
          {PHOTOS.map(p => <PhotoTile key={p.id} photo={p} />)}
        </div>
      </section>

      {/* Voice messages */}
      <section className="px-5 pb-4" aria-label="Voice messages">
        <p className="sec-title">Voice messages</p>
        {VOICE_MESSAGES.map(m => <VoiceCard key={m.id} message={m} />)}
      </section>

      {/* Memory journal */}
      <section className="px-5 pb-4" aria-label="Memory journal">
        <p className="sec-title">Memory journal</p>
        <div className="bg-amber-light border border-amber/20 rounded-lg px-4 py-3 flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-amber flex items-center justify-center text-[18px] flex-shrink-0">
            📖
          </div>
          <div>
            <p className="text-[13px] font-bold text-amber-dark">Margaret's garden story</p>
            <p className="text-[12px] text-amber-dark/70 mt-0.5">Recorded 3 days ago · 1 min 45 sec</p>
          </div>
        </div>
      </section>

      {/* Bottom nav */}
      <nav className="bot-nav" aria-label="Main navigation">
        <div className="nav-item active">
          <HomeIcon color="#1A6B6B" /><span className="nav-label">Home</span>
          <div className="nav-dot bg-teal" />
        </div>
        <div className="nav-item"><PhotosIcon /><span className="nav-label">Photos</span><div className="nav-dot" /></div>
        <div className="nav-item"><MsgIcon /><span className="nav-label">Messages</span><div className="nav-dot" /></div>
        <div className="nav-item"><ProfileIcon /><span className="nav-label">Profile</span><div className="nav-dot" /></div>
      </nav>

      <footer className="text-center text-[11px] text-muted py-3 border-t border-black/[0.06]">
        built with ♥ by <strong className="text-teal font-extrabold">Prithvvi</strong> · Kinnect 2025
      </footer>
    </div>
  )
}

// ── Inline SVG nav icons ─────────────────────────────────────────────────────
const s = { width: 22, height: 22, viewBox: '0 0 24 24', fill: 'none', stroke: '#9A928A', strokeWidth: 2.5, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const }
function HomeIcon({ color = '#9A928A' }) {
  return <svg {...s} stroke={color}><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
}
function PhotosIcon() {
  return <svg {...s}><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
}
function MsgIcon() {
  return <svg {...s}><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>
}
function ProfileIcon() {
  return <svg {...s}><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
}
