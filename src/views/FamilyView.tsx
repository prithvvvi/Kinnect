import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { supabase } from '../lib/supabase'
import type { ActivityItem, Mood } from '../types'

const ACTIVITY: ActivityItem[] = [
  { id:'1', icon:'📞', iconBg:'bg-teal-light',  title:'Video call — 18 minutes', subtitle:'Yesterday at 6:30 pm', ago:'1d' },
  { id:'2', icon:'📷', iconBg:'bg-amber-light', title:'3 photos shared by Priya', subtitle:'Morning walk · Lunch · Weekend', ago:'Today' },
  { id:'3', icon:'🎙️', iconBg:'bg-green-light', title:'Voice note from Arjun', subtitle:'"Nani, I got an A in Math!"', ago:'Today' },
  { id:'4', icon:'📖', iconBg:'bg-slate-light', title:'Memory recorded by staff', subtitle:"Margaret's garden story · 1:45", ago:'3d' },
]

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

interface FamilyViewProps {
  residentId: string
}

export default function FamilyView({ residentId }: FamilyViewProps) {
  const [currentMood, setCurrentMood] = useState<Mood | null>(null)

  // Load current mood and subscribe to real-time updates
  useEffect(() => {
    async function loadMood() {
      const { data } = await supabase
        .from('mood_logs')
        .select('mood')
        .eq('resident_id', residentId)
        .order('logged_at', { ascending: false })
        .limit(1)
        .single()

      if (data) setCurrentMood(data.mood as Mood)
    }

    if (residentId) loadMood()

    // Real-time subscription
    const channel = supabase
      .channel('mood-changes')
      .on('postgres_changes', {
        event: 'INSERT',
        schema: 'public',
        table: 'mood_logs',
        filter: `resident_id=eq.${residentId}`,
      }, (payload) => {
        setCurrentMood(payload.new.mood as Mood)
      })
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [residentId])

  const moodEmoji = currentMood === 'happy' ? '😊'
    : currentMood === 'okay' ? '😐'
    : currentMood === 'sad' ? '😔'
    : '🤍'

  const moodLabel = currentMood
    ? `Feeling ${currentMood}`
    : 'No check-in yet today'

  return (
    <div className="phone-frame">
      {/* Header */}
      <div className="bg-amber px-6 pt-7 pb-5 relative overflow-hidden">
        <div className="hdr-circle-top" />
        <div className="hdr-circle-bottom" />
        <div className="relative z-10 flex items-start justify-between">
          <div>
            <h1 className="font-serif text-[32px] font-semibold text-white tracking-tight leading-none">
              Kinnect.
            </h1>
            <p className="text-[12px] text-white/65 italic mt-1">
              Stay close to those you love
            </p>
          </div>
          <div className="bg-white/[0.15] border border-white/20 text-white text-[11px] font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5">
            <motion.div
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-2 h-2 rounded-full bg-green-400"
            />
            Live
          </div>
        </div>
        <div className="relative z-10 mt-3">
          <p className="text-[16px] font-bold text-white/90">
            Margaret's dashboard
          </p>
        </div>
      </div>

      {/* Mood status card */}
      <div className="mx-5 mt-5 bg-white rounded-2xl shadow-card flex items-center gap-4 px-5 py-4">
        <motion.div
          key={currentMood}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 400, damping: 20 }}
          className="text-[44px] flex-shrink-0"
        >
          {moodEmoji}
        </motion.div>
        <div className="flex-1">
          <p className="text-[11px] font-extrabold text-muted uppercase tracking-wide">
            Today's mood
          </p>
          <p className="text-[19px] font-extrabold text-ink mt-1">
            {moodLabel}
          </p>
          <p className="text-[12px] text-muted mt-0.5">
            Updates in real-time
          </p>
        </div>
        {currentMood && (
          <div className="bg-green-light text-green text-[11px] font-bold px-3 py-1.5 rounded-full flex-shrink-0">
            ✓ Live
          </div>
        )}
      </div>

      {/* Quick actions */}
      <div className="flex gap-2 px-5 pt-4 pb-2">
        <QuickBtn emoji="📷" label="Share Photo"  colorClass="bg-teal-light text-teal"      onClick={() => {}} />
        <QuickBtn emoji="🎙️" label="Voice Note"  colorClass="bg-amber-light text-amber-dark" onClick={() => {}} />
        <QuickBtn emoji="📞" label="Call Now"    colorClass="bg-green-light text-green"      onClick={() => {}} />
      </div>

      {/* Recent activity */}
      <section className="px-5 pt-3 pb-2">
        <p className="sec-title">Recent activity</p>
      </section>
      <div className="mx-5 bg-white border border-black/[0.07] rounded-xl overflow-hidden mb-4">
        {ACTIVITY.map(item => <ActivityRow key={item.id} item={item} />)}
      </div>

      {/* Bottom nav */}
      <nav className="bot-nav">
        <div className="nav-item active">
          <FamHomeIcon />
          <span className="nav-label">Dashboard</span>
          <div className="nav-dot bg-amber" />
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