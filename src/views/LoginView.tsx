import { useState } from 'react'
import { motion } from 'framer-motion'
import { supabase } from '../lib/supabase'

interface LoginViewProps {
  onLogin: () => void
  onSignup: () => void
}

export default function LoginView({ onLogin, onSignup }: LoginViewProps) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleLogin() {
    // Basic validation
    if (!email || !password) {
      setError('Please enter your email and password.')
      return
    }

    setLoading(true)
    setError('')

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      setError('Incorrect email or password. Please try again.')
      setLoading(false)
      return
    }

    // Login successful
    onLogin()
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-5"
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
            Stay close to those you love
          </p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-3xl p-8 shadow-card">
          <h2 className="text-xl font-bold mb-1" style={{ color: '#1E1A14' }}>
            Welcome back
          </h2>
          <p className="text-sm mb-6" style={{ color: '#9A928A' }}>
            Sign in to your Kinnect account
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
              className="w-full rounded-xl px-4 py-3 text-sm outline-none border transition-colors"
              style={{ borderColor: '#E8E4DE', backgroundColor: '#FAFAF7' }}
              onKeyDown={e => e.key === 'Enter' && handleLogin()}
            />
          </div>

          {/* Password field */}
          <div className="mb-6">
            <label className="text-xs font-bold uppercase tracking-wide mb-2 block"
                   style={{ color: '#9A928A' }}>
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full rounded-xl px-4 py-3 text-sm outline-none border transition-colors"
              style={{ borderColor: '#E8E4DE', backgroundColor: '#FAFAF7' }}
              onKeyDown={e => e.key === 'Enter' && handleLogin()}
            />
          </div>

          {/* Login button */}
          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={handleLogin}
            disabled={loading}
            className="w-full py-4 rounded-2xl text-white font-bold text-sm cursor-pointer border-none"
            style={{ backgroundColor: loading ? '#9A928A' : '#1A6B6B' }}
          >
            {loading ? 'Signing in...' : 'Sign in'}
          </motion.button>
        </div>
          {/* Sign up link */}
          <button
            onClick={onSignup}
            className="w-full py-2 text-sm font-semibold cursor-pointer border-none bg-transparent mt-3"
            style={{ color: '#9A928A' }}
          >
            Don't have an account? Sign up
        </button>
        {/* Footer */}
        <p className="text-center text-xs mt-6" style={{ color: '#9A928A' }}>
          built with ♥ by <strong style={{ color: '#1A6B6B' }}>Prithvvi</strong>
        </p>
      </motion.div>
    </div>
  )
}