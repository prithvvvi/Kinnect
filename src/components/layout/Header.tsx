import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

type HeaderVariant = 'teal' | 'amber' | 'slate'

interface HeaderProps {
  variant: HeaderVariant
  title?: string
  subtitle?: string
  showGreeting?: boolean
  residentName?: string
  pill?: React.ReactNode
}

function useClock() {
  const [time, setTime] = useState(() => formatTime(new Date()))
  useEffect(() => {
    const id = setInterval(() => setTime(formatTime(new Date())), 30_000)
    return () => clearInterval(id)
  }, [])
  return time
}

function formatTime(d: Date) {
  const h = d.getHours() % 12 || 12
  const m = String(d.getMinutes()).padStart(2, '0')
  const ap = d.getHours() >= 12 ? 'PM' : 'AM'
  return `${h}:${m} ${ap}`
}

function useGreeting(name: string) {
  const h = new Date().getHours()
  const greeting = h < 12 ? 'Good morning' : h < 17 ? 'Good afternoon' : 'Good evening'
  const emoji = h < 12 ? '🌸' : h < 17 ? '☀️' : '🌙'
  return `${greeting}, ${name} ${emoji}`
}

function useDate() {
  const d = new Date()
  const days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']
  const months = ['January','February','March','April','May','June','July','August','September','October','November','December']
  return `${days[d.getDay()]}, ${months[d.getMonth()]} ${d.getDate()}`
}

const BG: Record<HeaderVariant, string> = {
  teal:  'bg-teal',
  amber: 'bg-amber',
  slate: 'bg-slate',
}

const DOT_COLOR: Record<HeaderVariant, string> = {
  teal:  'text-amber',
  amber: 'text-white/60',
  slate: 'text-amber',
}

export default function Header({ variant, title, subtitle, showGreeting, residentName = 'Margaret', pill }: HeaderProps) {
  const time = useClock()
  const greeting = useGreeting(residentName)
  const date = useDate()

  return (
    <div className={`${BG[variant]} px-6 pt-7 pb-5 relative overflow-hidden`}>
      {/* Decorative circles */}
      <div className="hdr-circle-top" aria-hidden="true" />
      <div className="hdr-circle-bottom" aria-hidden="true" />

      {/* Top row */}
      <div className="relative z-10 flex items-start justify-between">
        <div>
          <h1 className="font-serif text-[32px] font-semibold text-white tracking-tight leading-none">
            Kinnect<span className={DOT_COLOR[variant]}>.</span>
          </h1>
          {title
            ? <p className="text-[12px] text-white/65 italic mt-1">{title}</p>
            : <p className="text-[12px] text-white/65 italic mt-1">Stay close to those you love</p>
          }
          {variant === 'teal' && (
            <p className="text-[10px] text-white/30 mt-0.5 tracking-wide">
              inspired by Sparsh · स्पर्श · touch
            </p>
          )}
        </div>

        {/* Clock pill */}
        <div className="bg-white/[0.15] border border-white/20 text-white text-[12px] font-bold px-3 py-1.5 rounded-full">
          {time}
        </div>
      </div>

      {/* Bottom row */}
      <div className="relative z-10 mt-4 flex items-center justify-between">
        {showGreeting ? (
          <div>
            <p className="text-[16px] font-bold text-white/90">{greeting}</p>
            <p className="text-[12px] text-white/45 mt-0.5">{date}</p>
          </div>
        ) : (
          <div>
            <p className="text-[16px] font-bold text-white/90">{subtitle}</p>
          </div>
        )}
        {pill}
      </div>
    </div>
  )
}

// ── Live badge (used on Family view) ────────────────────────────────────────
export function LiveBadge() {
  return (
    <div className="bg-white/[0.15] border border-white/20 text-white text-[11px] font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5">
      <motion.div
        animate={{ opacity: [1, 0.3, 1] }}
        transition={{ duration: 1.5, repeat: Infinity }}
        className="w-2 h-2 rounded-full bg-green-400"
      />
      Live
    </div>
  )
}
