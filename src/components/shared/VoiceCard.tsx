import { useState } from 'react'
import { motion } from 'framer-motion'
import type { VoiceMessage } from '../../types'

interface VoiceCardProps {
  message: VoiceMessage
}

export default function VoiceCard({ message }: VoiceCardProps) {
  const [playing, setPlaying] = useState(false)

  function handlePlay() {
    if (playing) return
    setPlaying(true)
    // Phase 4: replace with real audio playback from Supabase storage
    setTimeout(() => setPlaying(false), 2200)
  }

  return (
    <motion.div
      whileHover={{ x: 3 }}
      onClick={handlePlay}
      role="button"
      aria-label={`Play voice message from ${message.from}`}
      tabIndex={0}
      onKeyDown={e => e.key === 'Enter' && handlePlay()}
      className="bg-cream border border-black/[0.07] rounded-lg px-4 py-3 mb-2
                 flex items-center gap-3 cursor-pointer transition-colors duration-150
                 hover:bg-teal-light hover:border-teal"
    >
      {/* Play button */}
      <motion.div
        animate={{ backgroundColor: playing ? '#2D7A4F' : '#1A6B6B' }}
        className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
      >
        {playing ? (
          // Waveform bars while playing
          <div className="flex items-center gap-[3px]">
            {[1, 1.6, 0.8, 1.3, 0.9].map((h, i) => (
              <motion.div
                key={i}
                className="w-[2px] bg-white rounded-full"
                animate={{ scaleY: [1, h, 1] }}
                transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.1 }}
                style={{ height: 10, originY: 'center' }}
              />
            ))}
          </div>
        ) : (
          <svg width="11" height="13" viewBox="0 0 12 14" fill="white">
            <polygon points="0,0 12,7 0,14" />
          </svg>
        )}
      </motion.div>

      {/* Text */}
      <div className="flex-1 min-w-0">
        <div className="text-[13px] font-bold text-ink truncate">{message.from}</div>
        <div className="text-[12px] text-muted mt-0.5 truncate">
          {playing ? '▶  Playing...' : message.preview}
        </div>
      </div>

      {/* Duration */}
      <div className="text-[11px] font-semibold text-muted flex-shrink-0">
        {message.duration}
      </div>
    </motion.div>
  )
}
