import { motion } from 'framer-motion'
import type { Mood, MoodOption } from '../../types'

interface MoodButtonProps {
  option: MoodOption
  selected: boolean
  onSelect: (mood: Mood) => void
}

const MOOD_OPTIONS: MoodOption[] = [
  { value: 'happy', emoji: '😊', label: 'Happy' },
  { value: 'okay',  emoji: '😐', label: 'Okay' },
  { value: 'sad',   emoji: '😔', label: 'Sad' },
]

// ── Single MoodButton ───────────────────────────────────────────────────────
function MoodButton({ option, selected, onSelect }: MoodButtonProps) {
  return (
    <motion.button
      whileTap={{ scale: 0.94 }}
      whileHover={{ y: -2 }}
      onClick={() => onSelect(option.value)}
      aria-pressed={selected}
      aria-label={`I am feeling ${option.label}`}
      className={`
        flex-1 flex flex-col items-center gap-2 py-4 px-2 rounded-xl border-2
        transition-colors duration-200 cursor-pointer select-none
        ${selected
          ? 'border-teal bg-teal-light'
          : 'border-black/[0.08] bg-white hover:border-teal hover:bg-teal-light'
        }
      `}
    >
      <span className="text-3xl leading-none" role="img" aria-hidden="true">
        {option.emoji}
      </span>
      <span className={`text-[13px] font-bold ${selected ? 'text-teal' : 'text-ink-2'}`}>
        {option.label}
      </span>
    </motion.button>
  )
}

// ── MoodRow — all 3 buttons + confirmation ──────────────────────────────────
interface MoodRowProps {
  selected: Mood | null
  onSelect: (mood: Mood) => void
}

export default function MoodRow({ selected, onSelect }: MoodRowProps) {
  const selectedOption = MOOD_OPTIONS.find(o => o.value === selected)

  return (
    <div>
      <div className="flex gap-2">
        {MOOD_OPTIONS.map(option => (
          <MoodButton
            key={option.value}
            option={option}
            selected={selected === option.value}
            onSelect={onSelect}
          />
        ))}
      </div>

      {/* Confirmation message */}
      {selected && selectedOption && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: 'spring', stiffness: 400, damping: 20 }}
          className="mt-3 bg-green-light rounded-lg px-4 py-3 text-[13px] font-bold text-green text-center"
          role="status"
          aria-live="polite"
        >
          {selectedOption.emoji}&nbsp;&nbsp;Family notified — feeling {selectedOption.label.toLowerCase()} today.
        </motion.div>
      )}
    </div>
  )
}
