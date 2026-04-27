// ── App-wide TypeScript types for Kinnect ──────────────────────────────────

export type ActiveTab = 'resident' | 'family' | 'staff'

export type Mood = 'happy' | 'okay' | 'sad'

export type MessageType = 'voice' | 'photo' | 'text' | 'call' | 'memory'

export type AlertType = 'danger' | 'warning' | 'info'

export interface MoodOption {
  value: Mood
  emoji: string
  label: string
}

export interface VoiceMessage {
  id: string
  from: string
  preview: string
  duration: string
}

export interface Photo {
  id: string
  emoji: string
  label: string
  gradient: string
}

export interface ActivityItem {
  id: string
  icon: string
  iconBg: string
  title: string
  subtitle: string
  ago: string
}

export interface ResidentRow {
  id: string
  initials: string
  name: string
  room: string
  wing: string
  mood: Mood | null
  status: 'connected' | 'no-contact' | 'not-checked-in'
  avatarColor: string
}

export interface AlertItem {
  id: string
  type: AlertType
  emoji: string
  title: string
  subtitle: string
  action: string
}

export interface StatCard {
  value: number
  label: string
  sub: string
  color: 'teal' | 'green' | 'amber' | 'red'
}

export interface MoodStat {
  emoji: string
  label: string
  count: number
  total: number
}
