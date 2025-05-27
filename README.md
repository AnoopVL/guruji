# Guruji - [live demo](https://guruji.anoopvl.pro)

**Guruji** is an AI-powered interview platform that automates the creation, scheduling, and execution of technical interviews. Leveraging modern web technologies and AI/voice services, Guruji offers a seamless experience for recruiters and candidates alike.

---

## 🚀 Tech Stack

- **Next.js 15** (App Router) — Server-side rendering, dynamic routes, API routes
- **React** — Client-side UI
- **Tailwind CSS** & **ShadCN UI** — Utility-first styling and component library
- **Supabase** — Authentication, PostgreSQL database, CRUD operations
- **Vapi.ai** — AI voice assistant (interview conductor)
- **Lucide Icons** & **React-Icons** — SVG iconography
- **Framer Motion** — Animations for smooth UI transitions
- **Sonner** — Toast notifications
- **PNPM** — Fast package management

---

## 📁 Project Structure

```
guruji/
├─ app/
│  ├─ (main)/dashboard/        # Protected dashboard routes
│  │   ├─ create-interview/     # Interview creation flow
│  │   ├─ _components/          # Shared UI components
│  │   └─ page.jsx              # Dashboard landing
│  ├─ (main)/all-interviews/    # List all interviews
│  ├─ (main)/schedule-interview/ # Interviews with feedback
│  ├─ (main)/layout.js          # Nested layouts + provider
│  ├─ auth/page.jsx             # OAuth login page
│  ├─ interview/[id]/start/     # Live interview session
│  ├─ interview/[id]/completed/ # Interview completed screen
│  └─ provider.jsx              # Supabase auth wrapper & context
├─ components/                  # Shared Shadcn UI components
├─ services/                    # API clients (Supabase, Constants)
├─ public/                      # Static assets
├─ styles/                      # Global CSS and Tailwind config
├─ next.config.mjs              # Next.js config
└─ package.json                 # Scripts & dependencies
```

---

## 🧭 Project Flow & User Guide

### 1. Landing & Authentication

- Open `https://guruji.anoopvl.pro`
- Click **Sign in** on the landing page
- Log in using **Google** or **GitHub** (via Supabase)
- Upon success, you're redirected to your **Dashboard**

### 2. Dashboard Overview

From here, you can:

- Create new interviews (`/dashboard/create-interview`)
- View all interviews (`/all-interviews`)
- View scheduled interviews and feedback (`/schedule-interview`)

### 3. Creating an Interview

**Route:** `/dashboard/create-interview`

- **Step 1:** Enter job details (title, description, duration)
- **Step 2:** AI generates questions.
- **Step 3:** Review and save questions — a unique **Interview ID** and **URL** are created

### 4. Managing Interviews

**Route:** `/all-interviews`

- View all created interviews
- Copy and share interview links

### 5. Schedule & Feedback

**Route:** `/schedule-interview`

- View completed interviews along with feedback
- Delete interviews via smooth UI interactions

### 6. Conducting a Live Interview

**Route:** `/interview/[id]/start`

- Vapi.ai conducts the voice interview session
- The AI asks questions, transcribes answers, and ends the session
- Feedback is generated via and saved
- Redirects user to the completed screen

### 7. Viewing Completed Feedback

**Route:** `/interview/[id]/completed`

- Displays summary and analysis
- Guides you on potential next steps

---

## ⚙️ Installation & Setup

1. **Clone the repo**

```bash
git clone https://github.com/AnoopVL/guruji.git
cd guruji
```

2. **Install dependencies**

```bash
pnpm install
```

3. **Configure environment variables**  
   Create a `.env.local` file:

```env
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_VAPI_PUBLIC_KEY=<your_vapi_key>
NEXT_PUBLIC_SUPABASE_URL=<your_supabase_url>
NEXT_PUBLIC_SUPABASE_KEY=<your_supabase_anon_key>
```

4. **Run development server**

```bash
pnpm run dev
```

5. **Open in browser**  
   Go to `http://localhost:3000`

---

## 📸 Screenshots

> _Visuals from the project (stored in `/screenshots`)_

### Landing Page

![Landing](./screenshots/landing.png)

### Dashboard

![Dashboard](./screenshots/dashboard.png)

### Create Interview

![Create Interview](./screenshots/create_interview.png)

### Live Interview

![Live Interview](./screenshots/live_interview.png)

### Feedback Page

![Feedback](./screenshots/feedback.png)

---

## 📈 Deployment

1. **Build the app**

```bash
pnpm run build
```

2. **Start in production**

```bash
pnpm run start
```

3. **Deployment options**

- Vercel (recommended)
- Netlify
- Self-hosted (EC2 + Nginx)

---

## 🤝 Contributing

Pull requests and issues are welcome. Open for enhancements and feature requests.

---
