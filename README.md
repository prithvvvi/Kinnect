# Kinnect 🌿

> **Connecting elderly residents with their families** — a real-time web app built for care homes.

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Vercel-black?style=flat-square&logo=vercel)](https://kinnect-web.vercel.app)
[![Built with React](https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript)](https://typescriptlang.org)
[![Supabase](https://img.shields.io/badge/Supabase-PostgreSQL-3ECF8E?style=flat-square&logo=supabase)](https://supabase.com)

---

## What is Kinnect?

Kinnect is a three-sided platform that bridges the gap between elderly care home residents, their families, and care home staff.

Inspired by volunteering at a local old age home in Oakville, I noticed residents feeling disconnected from their families — not from lack of love, but from lack of easy, accessible connection. Kinnect solves this.

### Three views, one purpose

| View | Who uses it | Core function |
|------|------------|---------------|
| **Resident** | Elderly residents | One-tap family call, daily mood check-in, view family photos & voice messages |
| **Family** | Sons, daughters, grandchildren | See live mood updates, share photos/voice notes, video call with one tap |
| **Staff** | Nurses, care managers | Monitor all residents, receive alerts, generate weekly reports |

---

## Tech stack

| Layer | Technology | Why |
|-------|-----------|-----|
| Frontend | React 18 + TypeScript | Industry standard, type-safe, co-op employer expectation |
| Styling | Tailwind CSS | Mobile-first, fast iteration, consistent design tokens |
| Animations | Framer Motion | Production-quality micro-interactions |
| Backend | Supabase | PostgreSQL + Auth + Realtime + Storage — all in one |
| Deployment | Vercel | Instant deploys from GitHub, free tier |
| Video calling | Daily.co (Phase 6) | WebRTC video, 5-line integration |

---

## Getting started

```bash
# Clone the repo
git clone https://github.com/Prithvvi/kinnect-web.git
cd kinnect-web

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Fill in your Supabase URL and anon key

# Start development server
npm run dev
```

---

## Project structure

```
src/
├── views/          # The 3 main views (Resident, Family, Staff)
├── components/
│   ├── layout/     # Header, BottomNav
│   └── shared/     # MoodRow, VoiceCard, CallButton
├── lib/            # Supabase client
└── types/          # TypeScript interfaces
```

---

## Roadmap

- [x] Phase 0 — Project setup + Vercel deployment
- [x] Phase 1 — Design system + static UI (all 3 views)
- [ ] Phase 2 — Authentication + role-based routing
- [ ] Phase 3 — Real-time mood tracking
- [ ] Phase 4 — Family features (photos, voice, messages)
- [ ] Phase 5 — Staff dashboard with alerts
- [ ] Phase 6 — Video calling (Daily.co)
- [ ] Phase 7 — Polish, PWA, production launch

---

## Built by

**Prithvvi** — Grade 11 student at Abbey Park High School, Oakville.
Targeting Computer Science / Engineering at University of Waterloo and University of Toronto.

*Inspired by Sparsh · स्पर्श · touch*
