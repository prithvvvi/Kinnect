# Changelog — Kinnect

All notable changes to this project are documented here.

---

## Phase 0 — Setup & Foundation
**Week 1 | Status: Complete**

### What was built
- Scaffolded React + TypeScript project with Vite
- Configured Tailwind CSS with full Kinnect design token system
- Set up Supabase project and connected environment variables
- Deployed to Vercel — live URL active
- Created GitHub repo with public visibility, dev branch, and Projects kanban board
- Written README with project description, tech stack, and roadmap

### What was learned
- Vite is significantly faster than Create React App for development
- Tailwind's config file is the right place to define brand colour tokens
- Vercel's GitHub integration means every push to dev gets an automatic preview URL

### What's next
- Phase 1: Rebuild all 3 views (Resident, Family, Staff) in React — pixel-perfect from the HTML prototype

---

## Phase 1 — Design System + Static UI
**Weeks 2–3 | Status: Complete**

### What was built
- Full Kinnect colour palette as Tailwind tokens (teal, amber, slate, cream, muted, ink)
- Reusable component library: Header, MoodRow, VoiceCard, CallButton, PhotoStrip
- All 3 views fully rebuilt in React + TypeScript
- Framer Motion animations: tab switching, mood button press, call button pulse
- Fully responsive on iPhone SE (375px) through iPad (768px)

### What was learned
- Framer Motion's AnimatePresence with mode="wait" gives clean view transitions
- Tailwind's JIT compiler means custom values like bg-[#FFF8F1] work inline
- Building components before views saves significant time on the views themselves

### What's next
- Phase 2: Supabase Auth — login, signup, role-based routing
