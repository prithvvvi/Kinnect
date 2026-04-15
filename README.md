# Kinnect 🤝
### *Stay close to those you love*

> **Inspired by Sparsh (स्पर्श)** — the Sanskrit word for *touch*.  
> Built by **Prithvvi** — Grade 11, Abbey Park High School, Oakville, Ontario.

---

## 🌟 Why I Built This

While volunteering at a senior care home in Oakville, I noticed something that stayed with me.

The elderly residents weren't struggling because of health problems. They were struggling because they felt *disconnected* — from their families, from daily life, from the people who loved them. Family members wanted to stay in touch, but smartphones were confusing for elderly users. Nurses spent time on phone calls that a simple app could handle. And residents went days without hearing from their families — not because families didn't care, but because there was no easy bridge between them.

I built **Kinnect** to be that bridge.

---

## 📱 What is Kinnect?

Kinnect is a **compassionate connectivity app** designed for three groups of people:

| User | What they get |
|------|--------------|
| 👴 **Elderly Residents** | One-tap family calls, daily mood check-in, family photo stream, voice messages |
| 👨‍👩‍👧 **Family Members** | Real-time mood updates, photo sharing, voice notes, activity feed |
| 👩‍⚕️ **Care Home Staff** | Resident mood dashboard, alerts, weekly reports, roster management |

---

## ✨ Key Features

### For Residents
- **One-tap call button** — giant, pulsing, impossible to miss. One tap connects to family instantly
- **Daily mood check-in** — three simple emoji faces. Family notified automatically
- **Family photo stream** — family shares photos of daily life. Resident sees them without doing anything
- **Voice messages** — hear a loved one's voice any time, no typing required
- **Memory journal** — staff records short stories from residents, preserved for families

### For Families
- **Live mood dashboard** — see how your loved one is feeling today, right now
- **One-tap photo sharing** — share a photo from your phone in seconds
- **Voice note recorder** — record a message that plays on the resident's tablet
- **Activity feed** — see every call, photo, and check-in in one place

### For Care Home Staff
- **Morning mood overview** — bar chart of all residents' moods at a glance
- **Smart alerts** — residents who are sad, haven't checked in, or have birthdays coming
- **Resident roster** — every resident's mood and connection status in one screen
- **Staff quick actions** — group messages, activity scheduling, weekly reports
- **Weekly engagement reports** — track which residents are most and least connected

---

## 🛠️ Tech Stack

| Layer | Technology | Why |
|-------|-----------|-----|
| Frontend | HTML5 / CSS3 / Vanilla JS | Accessible on any device, no installation needed |
| Styling | Custom CSS with design system | Fast, lightweight, works on older tablets |
| Backend *(coming)* | Firebase Firestore | Real-time sync, free tier, no server needed |
| Auth *(coming)* | Firebase Authentication | Secure family + staff login |
| Hosting *(coming)* | Vercel | Free, instant deployment |

---

## 🗺️ Project Roadmap

- [x] **Phase 1** — UI Design & Prototype (HTML/CSS/JS)
  - [x] Resident home screen
  - [x] Family dashboard
  - [x] Staff management dashboard
  - [x] 3-view navigation with tab bar
- [ ] **Phase 2** — Firebase Backend Integration
  - [ ] Mood check-ins saved to Firestore database
  - [ ] Real-time mood updates pushed to family view
  - [ ] Photo upload and storage
- [ ] **Phase 3** — Voice Messages
  - [ ] Record and store voice messages
  - [ ] Playback on resident device
- [ ] **Phase 4** — Authentication & Multi-resident Support
  - [ ] Staff login with care home code
  - [ ] Family login linked to specific resident
  - [ ] Multiple residents per care home
- [ ] **Phase 5** — Pilot at Oakville Care Home
  - [ ] Deploy on tablet in common room
  - [ ] Onboard 5–10 residents
  - [ ] Collect feedback and iterate

---

## 🖥️ Screenshots

### Resident View (Teal)
Designed for elderly users — large text, one big button, zero confusion.

### Family View (Amber)  
Warm and informative — real-time mood, quick actions, full activity history.

### Staff Dashboard (Dark Slate)
Professional tools — mood analytics, smart alerts, resident roster, quick actions.

> *Screenshots coming as development progresses*

---

## 🚀 Getting Started

### Run locally (current prototype)
```bash
# Clone the repository
git clone https://github.com/[your-username]/kinnect.git

# Open the prototype
open kinnect_complete.html
# or just drag the file into any web browser
```

### No installation needed for the prototype.
The current version runs entirely in the browser with no dependencies.

---

## 📁 Project Structure

```
kinnect/
│
├── kinnect_complete.html     # Full 3-view prototype (resident + family + staff)
├── README.md                 # This file
│
├── docs/
│   ├── wireframes/           # Initial wireframe sketches
│   └── user-research/        # Notes from care home visits
│
└── src/                      # Coming in Phase 2
    ├── components/
    ├── firebase/
    └── styles/
```

---

## 💡 Design Philosophy

> *"I named it Kinnect because every Canadian senior should immediately understand what it does. But its soul is Sparsh — a Sanskrit word meaning touch. Because what elderly residents miss most isn't video quality or features. It's the feeling of being touched by someone they love."*

**Three design principles:**

1. **Elderly-first** — If a 78-year-old with no tech experience can't use it in 30 seconds, it's not done
2. **Family-second** — If busy families find it inconvenient, they won't use it — and residents lose out
3. **Staff-third** — If staff find it adds to their workload instead of reducing it, it won't last

---

## 📊 Problem Statement

According to research on senior care in Canada:
- **60%** of nursing home residents report feeling lonely on a daily basis
- Families average fewer than **2 visits per month** due to distance and busy schedules
- Most care homes rely on **phone calls and paper forms** to track resident wellbeing

Kinnect addresses all three gaps with one simple, compassionate product.

---

## 🙏 Acknowledgements

This project was born at a senior care home in Oakville, Ontario, where I volunteer.  
Thank you to the residents who inspired it, and to the staff who showed me what real care looks like.

The name **Kinnect** comes from the word *connect* — with a K for *kin*, meaning family.  
The soul of the app is **Sparsh (स्पर्श)** — Sanskrit for *touch* — because that is what this app is really trying to give back to people who miss it.

---

## 📬 Contact

**Prithvvi**  
Grade 11 — Abbey Park High School, Oakville, Ontario  
GitHub: [@prithvvi](https://github.com/prithvvi)

---

*"The best engineering solves human problems, not technical ones."*

---

![Built with heart](https://img.shields.io/badge/built%20with-%E2%9D%A4%EF%B8%8F-red)
![Status](https://img.shields.io/badge/status-in%20development-yellow)
![Made in Canada](https://img.shields.io/badge/made%20in-Canada%20🍁-red)
