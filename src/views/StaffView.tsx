import { useState } from 'react'
import { motion } from 'framer-motion'
import Header from '../components/layout/Header'
import type { AlertItem, ResidentRow, StatCard, MoodStat } from '../types'

// ── Static sample data (replaced by Supabase in Phase 5) ───────────────────

const STATS: StatCard[] = [
  { value: 24, label: 'Total residents', sub: 'All rooms active',    color: 'teal' },
  { value: 18, label: 'Checked in today', sub: '75% response rate',  color: 'green' },
  { value: 12, label: 'Family calls today', sub: '↑ 3 vs yesterday', color: 'amber' },
  { value: 3,  label: 'Need attention', sub: 'Check alerts below',   color: 'red' },
]

const MOOD_STATS: MoodStat[] = [
  { emoji: '😊', label: 'Happy', count: 12, total: 18 },
  { emoji: '😐', label: 'Okay',  count: 4,  total: 18 },
  { emoji: '😔', label: 'Sad',   count: 2,  total: 18 },
]

const ALERTS: AlertItem[] = [
  { id:'1', type:'danger',  emoji:'😔', title:'Robert Chen — feeling sad',        subtitle:'Room 12 · No family contact in 4 days', action:'Contact' },
  { id:'2', type:'warning', emoji:'⏰', title:'Dorothy White — not checked in',   subtitle:'Room 7 · Usually checks in by 10am',    action:'Check in' },
  { id:'3', type:'info',    emoji:'🎂', title:'Margaret Thompson — birthday tomorrow', subtitle:'Room 4 · Notify family to send a message', action:'Notify' },
]

const ROSTER: ResidentRow[] = [
  { id:'1', initials:'MT', name:'Margaret Thompson', room:'Room 4', wing:'Wing A', mood:'happy', status:'connected',       avatarColor:'bg-teal-light text-teal' },
  { id:'2', initials:'RC', name:'Robert Chen',       room:'Room 12',wing:'Wing B', mood:'sad',   status:'no-contact',      avatarColor:'bg-amber-light text-amber-dark' },
  { id:'3', initials:'EP', name:'Eleanor Patterson', room:'Room 8', wing:'Wing A', mood:'happy', status:'connected',       avatarColor:'bg-green-light text-green' },
  { id:'4', initials:'DW', name:'Dorothy White',     room:'Room 7', wing:'Wing B', mood: null,   status:'not-checked-in',  avatarColor:'bg-slate-light text-slate' },
  { id:'5', initials:'WJ', name:'William Johnson',   room:'Room 15',wing:'Wing C', mood:'okay',  status:'connected',       avatarColor:'bg-[#EDE9FE] text-[#5B21B6]' },
]

const MOOD_EMOJI: Record<string, string> = { happy:'😊', okay:'😐', sad:'😔' }

const ALERT_STYLES: Record<string, { bg:string; title:string; action:string; border:string }> = {
  danger:  { bg:'bg-red-light',      border:'border-red/20',    title:'text-red',        action:'bg-red/10 text-red' },
  warning: { bg:'bg-[#FFFBEC]',      border:'border-amber/30',  title:'text-amber-dark', action:'bg-amber/15 text-amber-dark' },
  info:    { bg:'bg-slate-light',    border:'border-slate/15',  title:'text-slate',      action:'bg-slate/10 text-slate' },
}

const STAT_STYLES: Record<string, { bg:string; text:string }> = {
  teal:  { bg:'bg-teal-light border-teal/15',   text:'text-teal' },
  green: { bg:'bg-green-light border-green/15', text:'text-green' },
  amber: { bg:'bg-amber-light border-amber/15', text:'text-amber-dark' },
  red:   { bg:'bg-red-light border-red/15',     text:'text-red' },
}

const CONN_STYLES: Record<string, string> = {
  'connected':       'bg-green-light text-green',
  'no-contact':      'bg-red-light text-red',
  'not-checked-in':  'bg-red-light text-red',
}

const CONN_LABELS: Record<string, string> = {
  'connected': 'Connected', 'no-contact': 'No contact', 'not-checked-in': 'Not checked in',
}

// ── Stat card ─────────────────────────────────────────────────────────────────
function StatCardCmp({ stat }: { stat: StatCard }) {
  const st = STAT_STYLES[stat.color]
  return (
    <div className={`rounded-xl p-4 border ${st.bg}`}>
      <p className={`text-[28px] font-black leading-none ${st.text}`}>{stat.value}</p>
      <p className="text-[12px] font-bold text-ink-2 mt-1">{stat.label}</p>
      <p className="text-[11px] text-muted mt-0.5">{stat.sub}</p>
    </div>
  )
}

// ── Mood bar row ──────────────────────────────────────────────────────────────
function MoodBar({ stat }: { stat: MoodStat }) {
  const pct = Math.round((stat.count / stat.total) * 100)
  const fillColor = stat.label === 'Happy' ? 'bg-green' : stat.label === 'Okay' ? 'bg-amber' : 'bg-red'
  return (
    <div className="flex items-center gap-3 mb-2 last:mb-0">
      <span className="text-[18px] w-7 text-center flex-shrink-0">{stat.emoji}</span>
      <span className="text-[12px] font-bold text-ink-2 w-12 flex-shrink-0">{stat.label}</span>
      <div className="flex-1 bg-cream rounded-full h-2.5 overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          className={`h-full rounded-full ${fillColor}`}
        />
      </div>
      <span className="text-[12px] font-extrabold text-muted w-7 text-right flex-shrink-0">{stat.count}</span>
    </div>
  )
}

// ── Alert card ────────────────────────────────────────────────────────────────
function AlertCard({ alert }: { alert: AlertItem }) {
  const [label, setLabel] = useState(alert.action)
  const st = ALERT_STYLES[alert.type]

  function act() {
    setLabel('Sending...')
    setTimeout(() => setLabel(alert.action), 2000)
  }

  return (
    <div className={`${st.bg} border ${st.border} rounded-lg px-4 py-3 flex items-start gap-3 mb-2`}>
      <span className="text-[20px] flex-shrink-0 mt-0.5">{alert.emoji}</span>
      <div className="flex-1 min-w-0">
        <p className={`text-[13px] font-bold ${st.title}`}>{alert.title}</p>
        <p className="text-[12px] text-muted mt-0.5">{alert.subtitle}</p>
      </div>
      <motion.button
        whileTap={{ scale: 0.95 }}
        onClick={act}
        className={`${st.action} text-[11px] font-bold px-3 py-1.5 rounded-full border-none cursor-pointer flex-shrink-0`}
      >
        {label}
      </motion.button>
    </div>
  )
}

// ── Staff quick action ────────────────────────────────────────────────────────
function SqBtn({ emoji, label }: { emoji:string; label:string }) {
  const [busy, setBusy] = useState(false)
  return (
    <motion.button
      whileTap={{ scale: 0.95 }}
      whileHover={{ y: -2 }}
      onClick={() => { setBusy(true); setTimeout(() => setBusy(false), 2000) }}
      className="border border-black/[0.08] rounded-xl py-4 bg-white flex flex-col items-center gap-2
                 cursor-pointer text-[11px] font-bold text-ink-2 hover:bg-slate-light transition-colors"
    >
      <span className="text-[22px]">{busy ? '⏳' : emoji}</span>
      {label}
    </motion.button>
  )
}

// ── Roster row ─────────────────────────────────────────────────────────────────
function RosterRow({ resident }: { resident: ResidentRow }) {
  return (
    <motion.div
      whileHover={{ backgroundColor: 'rgba(255,248,241,0.8)' }}
      className="flex items-center gap-3 px-4 py-3 border-b border-black/[0.06] last:border-b-0 cursor-pointer"
    >
      <div className={`w-10 h-10 rounded-full flex items-center justify-center text-[15px] font-extrabold flex-shrink-0 ${resident.avatarColor}`}>
        {resident.initials}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-[13px] font-bold text-ink">{resident.name}</p>
        <p className="text-[12px] text-muted mt-0.5">{resident.room} · {resident.wing}</p>
      </div>
      <span className="text-[18px] flex-shrink-0">
        {resident.mood ? MOOD_EMOJI[resident.mood] : '—'}
      </span>
      <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full flex-shrink-0 ${CONN_STYLES[resident.status]}`}>
        {CONN_LABELS[resident.status]}
      </span>
    </motion.div>
  )
}

// ── Main StaffView ────────────────────────────────────────────────────────────
export default function StaffView() {
  return (
    <div className="phone-frame">
      {/* Header */}
      <Header
        variant="slate"
        title="Staff management dashboard"
        subtitle="Good morning, Nurse Sarah 👩‍⚕️"
      />

      {/* Stat cards */}
      <div className="grid grid-cols-2 gap-2.5 px-5 pt-4 pb-2">
        {STATS.map((s, i) => <StatCardCmp key={i} stat={s} />)}
      </div>

      {/* Mood overview */}
      <section className="px-5 pt-3 pb-1" aria-label="Today's mood overview">
        <p className="sec-title">Today's mood overview — 18 residents</p>
      </section>
      <div className="mx-5 bg-white border border-black/[0.07] rounded-xl p-4 mb-2">
        {MOOD_STATS.map((m, i) => <MoodBar key={i} stat={m} />)}
      </div>

      {/* Alerts */}
      <section className="px-5 pt-3 pb-1" aria-label="Alerts requiring attention">
        <p className="sec-title">⚡ Alerts requiring attention</p>
      </section>
      <div className="px-5">
        {ALERTS.map(a => <AlertCard key={a.id} alert={a} />)}
      </div>

      {/* Staff quick actions */}
      <section className="px-5 pt-3 pb-1" aria-label="Staff actions">
        <p className="sec-title">Staff actions</p>
      </section>
      <div className="grid grid-cols-3 gap-2.5 px-5 pb-3">
        <SqBtn emoji="📢" label="Group Message" />
        <SqBtn emoji="📋" label="Add Note" />
        <SqBtn emoji="📅" label="Schedule Activity" />
        <SqBtn emoji="📊" label="Weekly Report" />
        <SqBtn emoji="🏠" label="Room Overview" />
        <SqBtn emoji="👨‍👩‍👧" label="Family Directory" />
      </div>

      {/* Resident roster */}
      <section className="px-5 pt-1 pb-1" aria-label="Resident roster">
        <p className="sec-title">Resident roster — today</p>
      </section>
      <div className="mx-5 bg-white border border-black/[0.07] rounded-xl overflow-hidden mb-3">
        {ROSTER.map(r => <RosterRow key={r.id} resident={r} />)}
      </div>

      {/* Bottom nav */}
      <nav className="bot-nav" aria-label="Staff navigation">
        <div className="nav-item active">
          <DashIcon /><span className="nav-label">Dashboard</span><div className="nav-dot bg-slate" />
        </div>
        <div className="nav-item" style={{ position:'relative' }}>
          <BellIcon /><span className="nav-label">Alerts</span><div className="nav-dot" />
          <span className="absolute -top-1 -right-2 w-4 h-4 bg-red text-white text-[9px] font-extrabold rounded-full flex items-center justify-center">3</span>
        </div>
        <div className="nav-item"><PeopleIcon /><span className="nav-label">Residents</span><div className="nav-dot" /></div>
        <div className="nav-item"><ReportsIcon /><span className="nav-label">Reports</span><div className="nav-dot" /></div>
      </nav>

      <footer className="text-center text-[11px] text-muted py-3 border-t border-black/[0.06]">
        built with ♥ by <strong className="text-teal font-extrabold">Prithvvi</strong> · Kinnect 2025
      </footer>
    </div>
  )
}

// ── Inline SVG nav icons ──────────────────────────────────────────────────────
const s = { width: 22, height: 22, viewBox: '0 0 24 24', fill: 'none', strokeWidth: 2.5, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const }
function DashIcon() {
  return <svg {...s} stroke="#2C3E50"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>
}
function BellIcon() {
  return <svg {...s} stroke="#9A928A"><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 01-3.46 0"/></svg>
}
function PeopleIcon() {
  return <svg {...s} stroke="#9A928A"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></svg>
}
function ReportsIcon() {
  return <svg {...s} stroke="#9A928A"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>
}
