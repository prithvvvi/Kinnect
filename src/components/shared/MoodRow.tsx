import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { supabase } from '../../lib/supabase'
import type { Mood, MoodOption } from '../../types'

const MOOD_OPTIONS: MoodOption[] = [
  { value: 'happy', emoji: '😊', label: 'Happy' },
  { value: 'okay',  emoji: '😐', label: 'Okay' },
  { value: 'sad',   emoji: '😔', label: 'Sad' },
]

interface MoodButtonProps {
  option: MoodOption
  selected: boolean
  onSelect: (mood: Mood) => void
}

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
      <span className="text-3xl leading-none">{option.emoji}</span>
      <span className={`text-[13px] font-bold ${selected ? 'text-teal' : 'text-ink-2'}`}>
        {option.label}
      </span>
    </motion.button>
  )
}

interface MoodRowProps {
  residentId: string
}

export default function MoodRow({ residentId }: MoodRowProps) {
  const [selected, setSelected] = useState<Mood | null>(null)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  // Load today's mood when component mounts
  useEffect(() => {
    async function loadTodaysMood() {
      const today = new Date()
      today.setHours(0, 0, 0, 0)

      const { data } = await supabase
        .from('mood_logs')
        .select('mood')
        .eq('resident_id', residentId)
        .gte('logged_at', today.toISOString())
        .order('logged_at', { ascending: false })
        .limit(1)
        .single()

      if (data) setSelected(data.mood as Mood)
    }

    if (residentId) loadTodaysMood()
  }, [residentId])

  async function handleSelect(mood: Mood) {
    setSelected(mood)
    setSaving(true)
    setSaved(false)

    const { data: { user } } = await supabase.auth.getUser()

const { error } = await supabase
  .from('mood_logs')
  .insert({
    resident_id: user?.id,
    mood: mood,
  })

    if (error) {
      console.error('Error saving mood:', error)
    } else {
      setSaved(true)
    }

    setSaving(false)
  }

  const selectedOption = MOOD_OPTIONS.find(o => o.value === selected)

  return (
    <div>
      <div className="flex gap-2">
        {MOOD_OPTIONS.map(option => (
          <MoodButton
            key={option.value}
            option={option}
            selected={selected === option.value}
            onSelect={handleSelect}
          />
        ))}
      </div>

      {/* Status message */}
      {saving && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-3 rounded-lg px-4 py-3 text-[13px] font-bold text-center"
          style={{ backgroundColor: '#E6F4F4', color: '#1A6B6B' }}
        >
          Saving...
        </motion.div>
      )}

      {saved && selectedOption && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: 'spring', stiffness: 400, damping: 20 }}
          className="mt-3 rounded-lg px-4 py-3 text-[13px] font-bold text-center"
          style={{ backgroundColor: '#E8F5EE', color: '#2D7A4F' }}
          role="status"
        >
          {selectedOption.emoji}&nbsp;&nbsp;Family notified — feeling {selectedOption.label.toLowerCase()} today.
        </motion.div>
      )}
    </div>
  )
}