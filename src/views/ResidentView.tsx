import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Header from '../components/layout/Header'
import MoodRow from '../components/shared/MoodRow'
import VoiceCard from '../components/shared/VoiceCard'
import CallButton from '../components/shared/CallButton'
import { supabase } from '../lib/supabase'
import type { VoiceMessage } from '../types'

const VOICE_MESSAGES: VoiceMessage[] = [
  { id: '1', from: 'Daughter — Priya',  preview: '"Mom, we are coming Sunday..."', duration: '0:22' },
  { id: '2', from: 'Grandson — Arjun', preview: '"Nani, I got an A in Math!"',    duration: '0:15' },
]

interface ResidentViewProps {
  userId: string
}

export default function ResidentView({ userId }: ResidentViewProps) {
  const [photos, setPhotos] = useState<string[]>([])

  // Load real photos from Supabase storage
  useEffect(() => {
    async function loadPhotos() {
      const { data, error } = await supabase.storage
        .from('Kinnect-photos')
        .list(userId, {
          limit: 3,
          sortBy: { column: 'created_at', order: 'desc' },
        })

      if (error) {
        console.error('Error loading photos:', error)
        return
      }

      if (data) {
        const urls = data.map(file => {
          const { data: urlData } = supabase.storage
            .from('Kinnect-photos')
            .getPublicUrl(`${userId}/${file.name}`)
          return urlData.publicUrl
        })
        setPhotos(urls)
      }
    }

    if (userId) loadPhotos()
  }, [userId])

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
        <MoodRow residentId={userId} />
      </section>

      {/* Today from family */}
      <section className="px-5 pb-4" aria-label="Photos from your family">
        <p className="sec-title">Today from your family</p>
        {photos.length > 0 ? (
          <div className="flex gap-2">
            {photos.map((url, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="flex-1 rounded-xl overflow-hidden h-24 relative cursor-pointer bg-cream"
              >
                <img
                  src={url}
                  alt="Family photo"
                  className="w-full h-full object-cover"
                />
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="bg-cream border border-black/[0.07] rounded-xl px-4 py-6 text-center">
            <p className="text-[13px] text-muted">No photos yet — your family will share some soon 💛</p>
          </div>
        )}
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
          <HomeIcon color="#1A6B6B" />
          <span className="nav-label">Home</span>
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