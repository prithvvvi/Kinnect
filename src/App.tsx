import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import ResidentView from './views/ResidentView'
import FamilyView from './views/FamilyView'
import StaffView from './views/StaffView'
import type { ActiveTab } from './types'

// ── Tab bar config ───────────────────────────────────────────────────────────
const TABS: { id: ActiveTab; label: string; activeClass: string; icon: React.ReactNode }[] = [
  {
    id: 'resident',
    label: 'Resident',
    activeClass: 'bg-teal text-white shadow-teal',
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
        <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/>
      </svg>
    ),
  },
  {
    id: 'family',
    label: 'Family',
    activeClass: 'bg-amber text-white shadow-amber',
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/>
      </svg>
    ),
  },
  {
    id: 'staff',
    label: 'Staff',
    activeClass: 'bg-slate text-white shadow-slate',
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
        <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/>
        <rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>
      </svg>
    ),
  },
]

// ── View transition variants ─────────────────────────────────────────────────
const viewVariants = {
  enter: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.38, ease: [0.22, 1, 0.36, 1] } },
  exit: { opacity: 0, y: -12, transition: { duration: 0.22 } },
}

// ── Main App ─────────────────────────────────────────────────────────────────
export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('resident')

  return (
    <div className="min-h-screen bg-cream flex flex-col items-center py-4 px-3 pb-10">
      {/* Tab bar */}
      <div className="w-full max-w-[480px] bg-white rounded-[50px] px-1.5 py-1.5 flex gap-1
                      mb-5 shadow-card-sm border border-black/[0.07]"
        role="tablist"
        aria-label="Switch view"
      >
        {TABS.map(tab => (
          <motion.button
            key={tab.id}
            role="tab"
            aria-selected={activeTab === tab.id}
            aria-controls={`panel-${tab.id}`}
            whileTap={{ scale: 0.97 }}
            onClick={() => setActiveTab(tab.id)}
            className={`
              flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-[40px]
              text-[12px] font-bold cursor-pointer border-none transition-all duration-250
              ${activeTab === tab.id
                ? tab.activeClass
                : 'text-muted bg-transparent hover:text-ink-2'
              }
            `}
          >
            {tab.icon}
            {tab.label}
          </motion.button>
        ))}
      </div>

      {/* Animated view panel */}
      <div className="w-full max-w-[480px]" role="tabpanel" id={`panel-${activeTab}`}>
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            variants={viewVariants}
            initial="enter"
            animate="visible"
            exit="exit"
          >
            {activeTab === 'resident' && <ResidentView />}
            {activeTab === 'family'   && <FamilyView />}
            {activeTab === 'staff'    && <StaffView />}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}
