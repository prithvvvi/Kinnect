import { useState } from 'react'
import { motion } from 'framer-motion'
import { supabase } from '../lib/supabase'

interface SignupViewProps {
  onSignup: () => void
  onBackToLogin: () => void
}

export default function SignupView({ onSignup, onBackToLogin }: SignupViewProps) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState<'resident' | 'family' | 'staff'>('family')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleSignup() {
    if (!name || !email || !password) {
      setError('Please fill in all fields.')
      return
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters.')
      return
    }

    setLoading(true)
    setError('')

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { name, role }
      }
    })

    if (error) {
      setError(error.message)
      setLoading(false)
      return
    }

    onSignup()
  }

  const roles: { value: 'resident' | 'family' | 'staff'; label: string; emoji: string; desc: string }[] = [
    { value: 'resident', emoji: '🏠', label: 'Resident', desc: 'I live at the care home' },
    { value: 'family',   emoji: '👨‍👩‍👧', label: 'Family',   desc: 'I have a loved one there' },
    { value: 'staff',    emoji: '👩‍⚕️', label: 'Staff',    desc: 'I work at the care home' },
  ]

  return (
    <div className="min-h-screen flex items-center justify-center px-5 py-8"
         style={{ backgroundColor: '#FFF8F1' }}>
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="w-full max-w-[420px]"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="font-serif text-4xl font-semibold"
              style={{ color: '#1A6B6B' }}>
            Kinnect.
          </h1>
          <p className="text-sm mt-2" style={{ color: '#9A928A' }}>
            Create your account
          </p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-3xl p-8 shadow-card">
          <h2 className="text-xl font-bold mb-1" style={{ color: '#1E1A14' }}>
            Join Kinnect
          </h2>
          <p className="text-sm mb-6" style={{ color: '#9A928A' }}>
            Stay close to those you love
          </p>

          {/* Error message */}
          {error && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="rounded-xl px-4 py-3 mb-4 text-sm font-semibold"
              style={{ backgroundColor: '#FDEDED', color: '#C0392B' }}
            >
              {error}
            </motion.div>
          )}

          {/* Name field */}
          <div className="mb-4">
            <label className="text-xs font-bold uppercase tracking-wide mb-2 block"
                   style={{ color: '#9A928A' }}>
              Full name
            </label>
            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="Your full name"
              className="w-full rounded-xl px-4 py-3 text-sm outline-none border"
              style={{ borderColor: '#E8E4DE', backgroundColor: '#FAFAF7' }}
            />
          </div>

          {/* Email field */}
          <div className="mb-4">
            <label className="text-xs font-bold uppercase tracking-wide mb-2 block"
                   style={{ color: '#9A928A' }}>
              Email address
            </label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="w-full rounded-xl px-4 py-3 text-sm outline-none border"
              style={{ borderColor: '#E8E4DE', backgroundColor: '#FAFAF7' }}
            />
          </div>

          {/* Password field */}
          <div className="mb-5">
            <label className="text-xs font-bold uppercase tracking-wide mb-2 block"
                   style={{ color: '#9A928A' }}>
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="At least 6 characters"
              className="w-full rounded-xl px-4 py-3 text-sm outline-none border"
              style={{ borderColor: '#E8E4DE', backgroundColor: '#FAFAF7' }}
            />
          </div>

          {/* Role selector */}
          <div className="mb-6">
            <label className="text-xs font-bold uppercase tracking-wide mb-3 block"
                   style={{ color: '#9A928A' }}>
              I am a...
            </label>
            <div className="flex gap-2">
              {roles.map(r => (
                <motion.button
                  key={r.value}
                  whileTap={{ scale: 0.96 }}
                  onClick={() => setRole(r.value)}
                  className="flex-1 rounded-xl py-3 px-2 border-2 flex flex-col
                             items-center gap-1 cursor-pointer transition-colors"
                  style={{
                    borderColor: role === r.value ? '#1A6B6B' : '#E8E4DE',
                    backgroundColor: role === r.value ? '#E6F4F4' : 'white'
                  }}
                >
                  <span className="text-xl">{r.emoji}</span>
                  <span className="text-xs font-bold"
                        style={{ color: role === r.value ? '#1A6B6B' : '#4A4540' }}>
                    {r.label}
                  </span>
                  <span className="text-[10px] text-center leading-tight"
                        style={{ color: '#9A928A' }}>
                    {r.desc}
                  </span>
                </motion.button>
              ))}
            </div>
          </div>

          {/* Signup button */}
          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={handleSignup}
            disabled={loading}
            className="w-full py-4 rounded-2xl text-white font-bold text-sm
                       cursor-pointer border-none mb-4"
            style={{ backgroundColor: loading ? '#9A928A' : '#1A6B6B' }}
          >
            {loading ? 'Creating account...' : 'Create account'}
          </motion.button>

          {/* Back to login */}
          <button
            onClick={onBackToLogin}
            className="w-full py-2 text-sm font-semibold cursor-pointer
                       border-none bg-transparent"
            style={{ color: '#9A928A' }}
          >
            Already have an account? Sign in
          </button>
        </div>

        {/* Footer */}
        <p className="text-center text-xs mt-6" style={{ color: '#9A928A' }}>
          built with ♥ by <strong style={{ color: '#1A6B6B' }}>Prithvvi</strong>
        </p>
      </motion.div>
    </div>
  )
}