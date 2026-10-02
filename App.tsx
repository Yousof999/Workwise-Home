import React, { useState } from "react";
import { Link, NavLink, Routes, Route, useLocation, useNavigate } from "react-router-dom";
import type { PostedProject } from "./appTypes";
import CompaniesPage from "./Pages/companies/companies.tsx";
import ProfilesPage from "./Pages/profiles/profiles.tsx";
import JobsPage from "./Pages/jobs/jobs.tsx";
import ProjectPage from "./Pages/Project/project.tsx";
import MessagesPage from "./Pages/messages/messages.tsx";
import ApplyingPage from "./Pages/applying/applying.tsx";
import PostProjectPage from "./Pages/posting project/postProject.tsx";
import SignInPage from "./Pages/sign in/sign in.tsx";
import SignUpPage from "./Pages/sign up/sign up.tsx";

const navLinks = [
  { label: "Home", path: "/home" },
  { label: "Companies", path: "/companies" },
  { label: "Projects", path: "/projects" },
  { label: "Profiles", path: "/profiles" },
  { label: "Jobs", path: "/jobs" },
  { label: "Messages", path: "/messages" },
];

const suggestions = [
  { name: "Jessica William", role: "Graphic Designer" },
  { name: "John Doe", role: "PHP Developer" },
  { name: "Poonam", role: "Wordpress Developer" },
  { name: "Bill Gates", role: "C & C++ Developer" },
  { name: "Jessica William", role: "Graphic Designer" },
];

const topJobs = [
  { title: "Senior Product Designer", salary: "$15/hr" },
  { title: "Senior UI, UX Designer", salary: "$20/hr" },
  { title: "Junior Seo Designer", salary: "$25/hr" },
  { title: "Senior PHP Designer", salary: "$25/hr" },
  { title: "Senior Developer", salary: "$25/hr" },
];

const getStoredProjects = (): PostedProject[] => {
  if (typeof window === "undefined") return [];

  try {
    const stored = localStorage.getItem("postedProjects");
    return stored ? JSON.parse(stored) as PostedProject[] : [];
  } catch {
    return [];
  }
};

const Avatar = ({ name, size = 40 }: { name: string; size?: number }) => (
  <span className="avatar" style={{ width: size, height: size, fontSize: size * 0.4 }}>
    {name.split(" ").map((w) => w[0]).join("").slice(0, 2)}
  </span>
);

function Navbar({ userName }: { userName: string }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="navbar__inner">
        <Link to="/home" className="logo">W</Link>
        <button
          type="button"
          className="nav-toggle"
          aria-expanded={menuOpen}
          aria-controls="primary-navigation"
          aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span />
          <span />
          <span />
        </button>
        <div id="primary-navigation" className={`nav-links${menuOpen ? " nav-links--open" : ""}`}>
          {navLinks.map(({ label, path }) => (
            <NavLink key={label} to={path} onClick={() => setMenuOpen(false)} className={({ isActive }) => (isActive ? "active" : "") }>{label}</NavLink>
          ))}
        </div>
        <div className="nav-user"><Avatar name={userName} size={28} /> {userName}</div>
      </div>
    </nav>
  );
}

function ProfileCard({ userName }: { userName: string }) {
  return (
    <section className="card profile-card">
      <div className="profile-card__cover" />
      <Avatar name={userName} size={64} />
      <h3>{userName}</h3>
      <p className="muted">Graphic Designer at Self Employed</p>
      <div className="stat"><span className="muted">Following</span><strong>34</strong></div>
      <div className="stat"><span className="muted">Followers</span><strong>155</strong></div>
      <a href="#" className="link-red">View Profile</a>
    </section>
  );
}


function PostBar({ userName }: { userName: string }) {
  const navigate = useNavigate();
  const [jobLabel, setJobLabel] = useState("Post a Project");

  return (
    <section className="card post-bar">
      <Avatar name={userName} size={40} />
      <div className="post-bar__actions">
        <button type="button" className="btn btn--red" onClick={() => {
          setJobLabel("Job posted successfully");
          navigate("/post-project");
        }}>
          {jobLabel}
        </button>
      </div>
    </section>
  );
}

function ProjectPost({ userName, project }: { userName: string; project: PostedProject }) {
  const [liked, setLiked] = useState(false);
  return (
    <section className="card">
      <div className="post-head">
        <Avatar name={userName} size={40} />
        <div><strong>{userName}</strong><small className="muted">3 min ago</small></div>
      </div>
      <div className="tags">
        <span className="pill pill--blue">{project.type}</span>
        <span className="pill">Budget {project.budget}</span>
      </div>
      <h4>{project.title}</h4>
      <p className="muted">{project.description}</p>
      <div className="tags">
        <span className="pill pill--soft">Deadline: {project.deadline}</span>
        {project.skills.map((skill) => <span key={skill} className="pill pill--soft">{skill}</span>)}
      </div>
      <div className="post-foot">
        <button className={"btn-like" + (liked ? " on" : "")} onClick={() => setLiked(!liked)}>
          ♥ Like {liked ? 26 : 25}
        </button>
        <span className="muted">Comments 15</span>
        <span className="muted">Views 50</span>
      </div>
    </section>
  );
}

function TopJobs() {
  return (
    <section className="card">
      <h4 className="card__title">Top Jobs</h4>
      <ul className="jobs">
        {topJobs.map((j, i) => (
          <li key={i}><span>{j.title}</span><strong>{j.salary}</strong></li>
        ))}
      </ul>
    </section>
  );
}

function HomePage({ searchTerm = "", userName }: { searchTerm?: string; userName: string }) {
  const [projects] = useState(getStoredProjects);
  const normalizedSearch = searchTerm.trim().toLowerCase();

  const filteredSuggestions = normalizedSearch
    ? suggestions.filter((person) =>
        `${person.name} ${person.role}`.toLowerCase().includes(normalizedSearch)
      )
    : suggestions;

  return (
    <main className="layout">
      <aside className="col col--side">
        <ProfileCard userName={userName} />
      </aside>
      <div className="col col--main">
        <PostBar userName={userName} />
        {projects.length ? projects.map((project) => (
          <ProjectPost key={project.title} userName={userName} project={project} />
        )) : <p className="muted empty-state">You don't have any project</p>}
      </div>
      <aside className="col col--side"><TopJobs /></aside>
    </main>
  );
}

export default function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [userName, setUserName] = useState(() => localStorage.getItem("workwiseCurrentUser") || "User");
  const location = useLocation();
  const isAuthPage = location.pathname === "/" || location.pathname === "/sign-up";

  return (
    <>
      {!isAuthPage && <Navbar userName={userName} />}
      <Routes>
        <Route path="/" element={<SignInPage onSignedIn={setUserName} />} />
        <Route path="/sign-up" element={<SignUpPage />} />
        <Route path="/home" element={<HomePage searchTerm={searchTerm} userName={userName} />} />
        <Route path="/projects" element={<ProjectPage />}></Route>
        <Route path="/companies" element={<CompaniesPage searchTerm={searchTerm} />} />
        <Route path="/profiles" element={<ProfilesPage searchTerm={searchTerm} />} />
        <Route path="/jobs" element={<JobsPage searchTerm={searchTerm} />} />
        <Route path="/messages" element={<MessagesPage searchTerm={searchTerm} />} />
        <Route path="/applying" element={<ApplyingPage />} />
        <Route path="/post-project" element={<PostProjectPage />} />
        <Route path="*" element={<HomePage searchTerm={searchTerm} userName={userName} />} />
      </Routes>
    </>
  );
}
