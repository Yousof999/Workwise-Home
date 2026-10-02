import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { PostedProject } from "../../appTypes";
import "./project.css";

const initialProjects: PostedProject[] = [];

const exampleProjectTitles = new Set([
  "E-commerce Redesign",
  "Website Development",
  "Brand Identity Pack",
]);

const getStoredProjects = (): PostedProject[] => {
  if (typeof window === "undefined") {
    return initialProjects;
  }

  try {
    const stored = localStorage.getItem("postedProjects");
    const projects = stored ? JSON.parse(stored) as PostedProject[] : initialProjects;
    return projects.filter((project) => !exampleProjectTitles.has(project.title));
  } catch {
    return initialProjects;
  }
};

export default function ProjectPage({ searchTerm = "" }: { searchTerm?: string }) {
  const navigate = useNavigate();
  const [projects, setProjects] = useState(getStoredProjects);

  const normalizedSearch = searchTerm.trim().toLowerCase();

  const visibleProjects = projects.filter((project) => {
    if (!normalizedSearch) return true;
    return (
      project.title.toLowerCase().includes(normalizedSearch) ||
      project.type.toLowerCase().includes(normalizedSearch) ||
      project.description.toLowerCase().includes(normalizedSearch) ||
      project.skills.some((skill) => skill.toLowerCase().includes(normalizedSearch))
    );
  });

  const handlePostProject = () => {
    navigate("/post-project");
  };

  const handleDeleteProject = (titleToDelete: string) => {
    const updatedProjects = projects.filter((project) => project.title !== titleToDelete);
    setProjects(updatedProjects);

    if (typeof window !== "undefined") {
      localStorage.setItem("postedProjects", JSON.stringify(updatedProjects));
    }
  };

  return (
    <div className="project-page">
      <header className="page-header project-header">
        <div>
          <p className="eyebrow">Your Projects</p>
          <h1>Projects</h1>
        </div>
        <button type="button" className="job-create-btn" onClick={handlePostProject}>
          <span className="job-create-btn__icon">＋</span>
          <span>Post a Project</span>
        </button>
      </header>

      <div className="project-list">
        {visibleProjects.length ? visibleProjects.map((project) => (
          <article key={project.title} className="project-card">
            <div className={`project-badge ${project.accent}`}>{project.type}</div>
            <div className="project-head">
              <div>
                <h3>{project.title}</h3>
                <p>{project.description}</p>
              </div>
              <span className="status-pill">{project.status}</span>
            </div>

            <div className="project-meta">
              <span>Budget: {project.budget}</span>
              <span>Deadline: {project.deadline}</span>
              <span>Applicants: {project.applicants}</span>
            </div>

            <div className="project-skills">
              {project.skills.map((skill) => <span key={skill}>{skill}</span>)}
            </div>

            <div className="project-actions">
              <button
                type="button"
                className="btn btn--ghost"
                onClick={() => handleDeleteProject(project.title)}
              >
                Delete
              </button>
            </div>
          </article>
        )) : <p className="muted empty-state">You don't have any project</p>}
      </div>
    </div>
  );
}
