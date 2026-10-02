import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { JobApplication, JobPosting } from "../../appTypes";
import "./jobs.css";

const defaultJobs = [
  {
    title: "Senior Product Designer",
    company: "Pixel Studio",
    type: "Full Time",
    location: "Remote",
    salary: "$90k - $120k",
    description: "Lead product redesigns and improve conversion across web and mobile flows.",
    skills: ["Figma", "UX Strategy", "Design Systems"],
    accent: "red",
  },
  {
    title: "Frontend Engineer",
    company: "Northstar Labs",
    type: "Remote",
    location: "Remote",
    salary: "$110k - $140k",
    description: "Build polished interfaces and collaborate closely with design and product teams.",
    skills: ["React", "TypeScript", "API Integration"],
    accent: "blue",
  },
  {
    title: "Marketing Manager",
    company: "BrandWorks",
    type: "Contract",
    location: "New York, NY",
    salary: "$70k - $95k",
    description: "Plan campaigns, optimize funnels, and drive measurable growth across channels.",
    skills: ["SEO", "Campaigns", "Analytics"],
    accent: "green",
  },
];

const getStoredJobs = (): JobPosting[] => {
  if (typeof window === "undefined") {
    return defaultJobs;
  }

  try {
    const stored = localStorage.getItem("postedJobs");
    return stored ? JSON.parse(stored) as JobPosting[] : defaultJobs;
  } catch {
    return defaultJobs;
  }
};

const getAppliedJobs = (): JobApplication[] => {
  if (typeof window === "undefined") return [];

  try {
    return JSON.parse(localStorage.getItem("jobApplications") || "[]") as JobApplication[];
  } catch {
    return [];
  }
};

export default function JobsPage({ searchTerm = "" }: { searchTerm?: string }) {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState(getStoredJobs);
  const [appliedJobs, setAppliedJobs] = useState(getAppliedJobs);
  const normalizedSearch = searchTerm.trim().toLowerCase();

  const removeApplication = (job: JobPosting) => {
    const remainingApplications = appliedJobs.filter(
      (application) => application.jobTitle !== job.title || application.company !== job.company
    );
    localStorage.setItem("jobApplications", JSON.stringify(remainingApplications));
    setAppliedJobs(remainingApplications);
  };

  const visibleJobs = jobs.filter((job) => {
    if (!normalizedSearch) return true;
    return (
      job.title.toLowerCase().includes(normalizedSearch) ||
      job.company.toLowerCase().includes(normalizedSearch) ||
      job.location.toLowerCase().includes(normalizedSearch) ||
      job.description.toLowerCase().includes(normalizedSearch) ||
      job.skills.some((skill) => skill.toLowerCase().includes(normalizedSearch))
    );
  });

  return (
    <div className="jobs-page">
      <header className="page-header jobs-header">
        <div>
          <p className="eyebrow">Find your next role</p>
          <h1>Jobs</h1>
        </div>
      </header>

      <div className="jobs-list">
        {visibleJobs.length ? visibleJobs.map((job) => {
          const isApplied = appliedJobs.some(
            (application) => application.jobTitle === job.title && application.company === job.company
          );

          return (
            <article key={job.title} className="job-card">
              <div className={`job-badge ${job.accent}`}>{job.type}</div>
            <div className="job-header">
              <div>
                <h3>{job.title}</h3>
                <p>{job.company}</p>
              </div>
            </div>

            <div className="job-meta">
              <span>📍 {job.location}</span>
              <span>💰 {job.salary}</span>
            </div>

            <p className="job-description">{job.description}</p>

            <div className="job-skills">
              {job.skills.map((skill) => (
                <span key={skill}>{skill}</span>
              ))}
            </div>

            <div className="job-actions">
              {isApplied ? (
                <button
                  type="button"
                  className="btn btn--ghost"
                  onClick={() => removeApplication(job)}
                >
                  Remove application
                </button>
              ) : (
                <button
                  type="button"
                  className="btn btn--red"
                  onClick={() => navigate("/applying", { state: { job } })}
                >
                  Apply
                </button>
              )}
            </div>
            </article>
          );
        }) : <p className="muted empty-state">No matching jobs found.</p>}
      </div>
    </div>
  );
}
