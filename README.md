# Workwise

A professional social network and job portal interface built with **React** and **TypeScript**. Workwise combines the core features of a job board with a LinkedIn-style social feed, letting users build a profile, browse and post jobs, and follow other professionals — all in a fully responsive layout.

🔗 **Live Demo:** [social-media-brown-nine.vercel.app](https://social-media-brown-nine.vercel.app/)

---

## ✨ Features

- **User Profile Card** — displays avatar, name, title, and follower/following stats.
- **Job & Project Feed** — scrollable feed of job posts with tags, skills, likes, and comments.
- **Suggested Connections** — a sidebar of recommended profiles to follow.
- **Top Jobs & Top Profiles** — highlighted sections for trending jobs and popular users.
- **Post Actions** — like and interact with posts directly from the feed.
- **Fully Responsive Design** — adapts cleanly across desktop, tablet, and mobile screens.

## 🛠️ Built With

- **React** — component-based UI architecture
- **TypeScript** — static typing for safer, more maintainable code
- **React Router** — client-side routing between pages/sections
- **localStorage** — persists user data in the browser between sessions
- **CSS** — custom responsive styling (Flexbox/Grid, media queries)

## 📂 Project Structure

```
workwise/
├── public/
├── src/
│   ├── components/     # Reusable UI components (ProfileCard, JobPost, etc.)
│   ├── pages/          # Route-level pages
│   ├── types/          # TypeScript interfaces & types
│   ├── App.tsx
│   └── main.tsx
├── index.html
├── package.json
├── tsconfig.json
└── vite.config.ts
```

## 🚀 Getting Started

```bash
# Clone the repository
git clone https://github.com/Yousof999/workwise.git
cd workwise

# Install dependencies
npm install

# Run the development server
npm run dev

# Build for production
npm run build
```

## 📌 Key Implementation Notes

- UI is broken into small, reusable, strongly-typed components to keep the codebase maintainable.
- Navigation between the main sections (home, profiles, jobs) is handled with **React Router**.
- User data is persisted on the client with the **localStorage API**, so state survives page reloads.
- TypeScript interfaces define the shape of users, posts, and jobs across the app, reducing runtime errors.

## 👤 Author

**Yousof Alaa**
Front-End Developer
- GitHub: [@Yousof999](https://github.com/Yousof999)
- LinkedIn: [yousof-alaa-8b07783ab](https://www.linkedin.com/in/yousof-alaa-8b07783ab)
