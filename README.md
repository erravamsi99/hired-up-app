# HiredUp 🌍
**Your Gateway to Visa-Friendly Tech Jobs**

HiredUp helps international students and job seekers find jobs that **sponsor visas** or are **cap-exempt**, with modern filtering, saved jobs, and persistent login — all in a polished, mobile-first UI.

---

## 🚀 Live Demo
👉 [https://hired-up-app.onrender.com](https://hired-up-app.onrender.com)

---

## ✨ Features

✅ Google & Email Authentication (via Clerk)  
✅ Filter jobs by visa type (H1B, Cap-Exempt)  
✅ Search by job title, category, location, and more  
✅ Save or mark jobs as applied — persists across sessions  
✅ Salary range filtering  
✅ Responsive design (desktop + mobile)  
✅ Backend with PostgreSQL + Prisma

---

## 🧠 Tech Stack

- **Frontend**: React, Tailwind CSS, Clerk Auth
- **Backend**: Node.js / Express (or Next.js API routes)
- **Database**: PostgreSQL (via Prisma ORM)
- **Deployment**: Render

---

## 📂 Project Structure (if Next.js)

/
├── prisma/ # Prisma schema + migrations
├── pages/ # Next.js API and frontend routes
│ └── api/ # Job + user routes
├── components/ # Reusable UI components
├── lib/ # DB, auth, utils
├── public/ # Static assets
├── styles/ # Tailwind / global CSS
└── README.md

---

## 🛠 Setup Locally

```bash
# 1. Clone repo
git clone https://github.com/your-username/hiredup.git && cd hiredup

# 2. Install dependencies
npm install

# 3. Setup environment variables
cp .env.example .env
# Fill in DATABASE_URL, CLERK_API keys, etc.

# 4. Run migrations
npx prisma migrate dev --name init

# 5. Start dev server
npm run dev

🧪 Environment Variables
env
Copy
Edit
DATABASE_URL=postgresql://...
CLERK_SECRET_KEY=...
CLERK_PUBLISHABLE_KEY=...
NEXT_PUBLIC_CLERK_FRONTEND_API=...

📌 TODO / Improvements
 Add animations and transition effects

 Add job detail page routing (/jobs/:id)

 Improve loading states

 Unit tests with Jest + React Testing Library

🧑‍💼 Author
Built with ❤️ by Erra Vamsi
