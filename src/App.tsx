import { useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { supabase, getUserRole } from './lib/supabase'
import LoginView from './views/LoginView'
import SignupView from './views/SignupView'
import ResidentView from './views/ResidentView'
import FamilyView from './views/FamilyView'
import StaffView from './views/StaffView'

const viewVariants = {
  enter: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -12 },
}

export default function App() {
  const [user, setUser] = useState<object | null>(null)
  const [loading, setLoading] = useState(true)
  const [showSignup, setShowSignup] = useState(false)
  const [role, setRole] = useState<'resident' | 'family' | 'staff' | null>(null)

  useEffect(() => {
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      setUser(session?.user ?? null)
      if (session?.user) {
        const userRole = await getUserRole()
        setRole(userRole)
      }
      setLoading(false)
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        setUser(session?.user ?? null)
        if (session?.user) {
          const userRole = await getUserRole()
          setRole(userRole)
        }
      }
    )

    return () => subscription.unsubscribe()
  }, [])

  // Show loading screen
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center"
           style={{ backgroundColor: '#FFF8F1' }}>
        <p className="text-sm font-semibold" style={{ color: '#9A928A' }}>
          Loading Kinnect...
        </p>
      </div>
    )
  }

  // Show signup or login if not logged in
  if (!user) {
    if (showSignup) {
      return (
        <SignupView
          onSignup={() => setShowSignup(false)}
          onBackToLogin={() => setShowSignup(false)}
        />
      )
    }
    return (
      <LoginView
        onLogin={() => {}}
        onSignup={() => setShowSignup(true)}
      />
    )
  }

  // Show correct view based on role
  return (
    <div className="min-h-screen flex flex-col items-center py-4 px-3 pb-10"
         style={{ backgroundColor: '#FFF8F1' }}>

      {/* Sign out button */}
      <div className="w-full max-w-[480px] flex justify-end mb-4">
        <button
          onClick={() => {
            supabase.auth.signOut()
            setRole(null)
          }}
          className="text-xs font-semibold px-3 py-1.5 rounded-full border
                     cursor-pointer transition-colors"
          style={{ color: '#9A928A', borderColor: '#E8E4DE' }}
        >
          Sign out
        </button>
      </div>

      {/* Role based view */}
      <div className="w-full max-w-[480px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={role}
            variants={viewVariants}
            initial="enter"
            animate="visible"
            exit="exit"
          >
            {role === 'resident' && <ResidentView userId={(user as { id: string }).id} />}
            {role === 'family'   && <FamilyView />}
            {role === 'staff'    && <StaffView />}
            {!role && (
              <div className="text-center py-20">
                <p className="text-sm font-semibold" style={{ color: '#9A928A' }}>
                  Loading your dashboard...
                </p>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}