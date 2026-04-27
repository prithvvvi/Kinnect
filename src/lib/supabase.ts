import { createClient } from '@supabase/supabase-js'

// These come from your .env file (never commit the real values)
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn(
    '⚠️  Supabase env vars not set. Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to your .env file.'
  )
}

export const supabase = createClient(supabaseUrl ?? '', supabaseAnonKey ?? '')

// ── Helper: get current user role ──────────────────────────────────────────
export async function getUserRole(): Promise<'resident' | 'family' | 'staff' | null> {
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return null

  const { data } = await supabase
    .from('users')
    .select('role')
    .eq('id', user.id)
    .single()

  return data?.role ?? null
}
