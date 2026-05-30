<div align="center">

![nextjs](https://img.shields.io/badge/Next.js_15-000000.svg?style=for-the-badge&logo=nextdotjs&logoColor=white)
![typescript](https://img.shields.io/badge/TypeScript-000000.svg?style=for-the-badge&logo=typescript&logoColor=white)
![tailwind](https://img.shields.io/badge/Tailwind_CSS-000000.svg?style=for-the-badge&logo=tailwindcss&logoColor=white)
![nextauth](https://img.shields.io/badge/NextAuth.js-000000.svg?style=for-the-badge&logo=auth0&logoColor=white)

# 🏠 HostelIQ

### Full-Stack Hostel Management System

<!-- Replace with actual screenshot or GIF -->
<!-- ![preview](assets/preview.png) -->

[![License: MIT](https://img.shields.io/static/v1.svg?style=for-the-badge&label=License&message=MIT&logoColor=d9e0ee&colorA=363a4f&colorB=b7bdf8)](#license)

</div>

---

HostelIQ is a modern, full-stack hostel management platform built with **Next.js 15** and **Tailwind CSS**. It provides two separate portals — one for **admins** managing the hostel, and one for **students** managing their own stay — with a brutalist black & white design language throughout.

---

## 🖥️ Portals

| Portal | Route | Access |
|---|---|---|
| Landing Page | `/` | Public — choose your portal |
| Admin Portal | `/login` | Hostel administrators |
| Student Portal | `/student-login` | Enrolled students |

**Demo credentials**

```
Admin     →  admin@hosteliq.in   /  admin123
Student   →  arjun@example.com   /  arjun123
```

---

## ✨ Features

### 🔐 Authentication
- Email & password login for both Admin and Student portals
- Google OAuth integration via NextAuth.js
- Separate session scopes per portal
- Clickable demo accounts on the login screen

### 🛠️ Admin Portal

| Module | Capabilities |
|---|---|
| **Dashboard** | Live stats, fee collection bar chart, occupancy line chart, recent complaints feed |
| **Students** | Register, search, filter, view profiles, track fee progress per student |
| **Rooms** | Grid & list view, room status management, occupancy visualiser, add rooms |
| **Fees** | Add fee records, mark payments, overdue tracking, collection progress bar |
| **Complaints** | View all complaints, status workflow, priority management |
| **Attendance** | Daily marking (Present / Absent / Late / Leave), monthly summary heatmap |
| **Notifications** | Broadcast messages to all students, type categories, read tracking |

### 🎓 Student Portal

| Module | Capabilities |
|---|---|
| **Dashboard** | Personalised welcome banner, fee summary, room card, recent activity |
| **My Room** | Room details, amenities, roommate list, hostel rules |
| **My Fees** | Fee history, overdue alerts, payment progress, Pay Now modal (UPI / NetBanking / Card) |
| **My Complaints** | Raise complaints, live step-by-step status tracker |
| **My Attendance** | Monthly calendar grid, attendance rate gauge, low-attendance warning |
| **Notifications** | View hostel broadcasts, mark read / mark all read |
| **My Profile** | View & edit personal details, guardian info, fee summary |

---

## 🗂️ Project Structure

```
hostel-mgmt/
│
├── app/
│   ├── page.tsx                        # Landing — dual portal entry
│   ├── login/                          # Admin login
│   ├── student-login/                  # Student login
│   │
│   ├── (main)/                         # Admin portal layout group
│   │   ├── layout.tsx                  # Sidebar + Header + Ticker
│   │   ├── dashboard/
│   │   ├── students/
│   │   ├── rooms/
│   │   ├── fees/
│   │   ├── complaints/
│   │   ├── attendance/
│   │   └── notifications/
│   │
│   ├── (student)/                      # Student portal layout group
│   │   ├── layout.tsx                  # Student Sidebar + Header + Ticker
│   │   └── student/
│   │       ├── dashboard/
│   │       ├── room/
│   │       ├── fees/
│   │       ├── complaints/
│   │       ├── attendance/
│   │       ├── notifications/
│   │       └── profile/
│   │
│   └── api/
│       ├── students/route.ts
│       ├── rooms/route.ts
│       ├── fees/route.ts
│       ├── complaints/route.ts
│       ├── attendance/route.ts
│       ├── notifications/route.ts
│       └── auth/[...nextauth]/route.ts
│
├── components/
│   ├── layout/                         # Admin Sidebar, Header, Ticker
│   ├── student/                        # Student Sidebar, Header, Ticker
│   └── ui/                             # Badge, StatCard, Modal
│
├── data/
│   └── mock.ts                         # Seeded demo data
│
├── types/
│   └── index.ts                        # TypeScript interfaces
│
└── lib/
    └── utils.ts                        # cn(), formatCurrency(), formatDate()
```

---

## 🔌 API Reference

All endpoints are under `/api/` and accept/return JSON.

### `/api/students`
| Method | Params / Body | Description |
|---|---|---|
| `GET` | `?status=active&search=name` | List students |
| `POST` | `{ name, email, phone, course, year, ... }` | Register student |

### `/api/rooms`
| Method | Params / Body | Description |
|---|---|---|
| `GET` | `?status=available&type=single` | List rooms |
| `POST` | `{ number, floor, type, capacity, pricePerMonth }` | Add room |

### `/api/fees`
| Method | Params / Body | Description |
|---|---|---|
| `GET` | `?status=overdue&studentId=S001` | List fees + totals |
| `POST` | `{ studentId, amount, dueDate, type, month }` | Add fee record |
| `PATCH` | `{ id, status: "paid" }` | Mark as paid |

### `/api/complaints`
| Method | Params / Body | Description |
|---|---|---|
| `GET` | `?status=open&priority=urgent` | List complaints |
| `POST` | `{ title, description, category, priority, ... }` | File complaint |
| `PATCH` | `{ id, status: "resolved" }` | Update status |

### `/api/attendance`
| Method | Params / Body | Description |
|---|---|---|
| `GET` | `?date=2025-01-15&studentId=S001` | Get records |
| `POST` | `{ studentId, date, status, checkIn? }` | Mark attendance |

### `/api/notifications`
| Method | Params / Body | Description |
|---|---|---|
| `GET` | — | All notifications + unread count |
| `POST` | `{ title, message, type, target }` | Broadcast notification |
| `PATCH` | `{ id }` or `{ markAllRead: true }` | Mark as read |

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Framework | [Next.js 15](https://nextjs.org/) (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| Auth | [NextAuth.js](https://next-auth.js.org/) — Google + Credentials |
| Charts | [Recharts](https://recharts.org/) |
| Icons | [Lucide React](https://lucide.dev/) |
| Fonts | Syne (display) + Space Mono (monospace) |

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### 1. Clone the repo
```bash
git clone https://github.com/YOUR_USERNAME/hostel-mgmt.git
cd hostel-mgmt
```

### 2. Install dependencies
```bash
npm install
```

### 3. Configure environment variables
```bash
cp .env.example .env.local
```

Edit `.env.local`:
```env
# Required for NextAuth
NEXTAUTH_SECRET=your_random_secret_here
NEXTAUTH_URL=http://localhost:3000

# Google OAuth (optional — email login works without it)
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
```

### 4. Start the dev server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### Build for production
```bash
npm run build
npm start
```

---

## 🔑 Google OAuth Setup (Optional)

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a project → Enable **Google+ API**
3. Create OAuth 2.0 credentials (Web application)
4. Add authorised redirect URI: `http://localhost:3000/api/auth/callback/google`
5. Paste Client ID and Secret into `.env.local`

> Email/password login works out of the box with no Google setup required.

---

## 🎨 Design System

HostelIQ uses a **brutalist black & white** aesthetic:

- **2px solid black borders** on all components
- **Admin sidebar** — pure black `#000000`
- **Student sidebar** — deep charcoal `#0a0a0a`
- **Typography** — Syne for headings, Space Mono for data & labels
- **Ticker tape** — live scrolling announcements on both portals
- **Card hover** — 4px offset black drop shadow on interaction

---

## 📦 Connecting a Real Database

The app currently uses in-memory mock data in `data/mock.ts`. To connect a real database:

1. Install Prisma:
```bash
npm install prisma @prisma/client
npx prisma init
```
2. Define your schema — the TypeScript interfaces in `types/index.ts` map directly to tables
3. Replace the array operations in each `app/api/*/route.ts` with Prisma queries

---

## 🗺️ Roadmap

- [ ] PostgreSQL / MongoDB via Prisma
- [ ] Razorpay / Stripe payment gateway
- [ ] Email & SMS notifications
- [ ] PDF fee receipt generation
- [ ] CSV / Excel export for admin reports
- [ ] Mobile responsive improvements
- [ ] Dark mode

---

## 🤝 Contributing

```bash
git checkout -b feature/your-feature
git commit -m "feat: describe your change"
git push origin feature/your-feature
# Open a Pull Request
```

---

## 📄 License

This project is licensed under the **MIT License** — see [LICENSE](LICENSE) for details.

---

<div align="center">
  <sub>Built with Next.js 15 · Tailwind CSS · TypeScript</sub>
</div>