import { useState } from 'react'
import { motion } from 'framer-motion'

export default function CallButton() {
  const [calling, setCalling] = useState(false)

  function handleCall() {
    if (calling) return
    setCalling(true)
    // Phase 6: replace with Daily.co video call integration
    setTimeout(() => setCalling(false), 2800)
  }

  return (
    <motion.button
      whileTap={{ scale: 0.97 }}
      onClick={handleCall}
      aria-label="Call my family"
      className={`
        w-full rounded-2xl p-5 flex items-center gap-4 transition-colors duration-300
        shadow-teal cursor-pointer border-none text-left
        ${calling ? 'bg-green' : 'bg-teal hover:bg-teal-medium'}
      `}
    >
      {/* Pulsing ring icon */}
      <motion.div
        animate={calling ? {} : { boxShadow: ['0 0 0 0 rgba(255,255,255,0.3)', '0 0 0 12px rgba(255,255,255,0)', '0 0 0 0 rgba(255,255,255,0)'] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
        className="w-14 h-14 rounded-full bg-white/[0.18] flex items-center justify-center flex-shrink-0"
      >
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.67A2 2 0 012 .94h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 8.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
        </svg>
      </motion.div>

      {/* Text */}
      <div className="flex-1">
        <div className="text-[19px] font-extrabold text-white">
          {calling ? 'Calling family...' : 'Call My Family'}
        </div>
        <div className="text-[13px] text-white/70 mt-0.5">
          {calling ? 'Please wait — connecting now' : 'One tap — connects instantly'}
        </div>
      </div>

      {/* Arrow */}
      <span className="text-white/40 text-2xl ml-auto">›</span>
    </motion.button>
  )
}
