import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./postProject.css";

interface ProjectForm {
  title: string;
  category: string;
  budget: string;
  deadline: string;
  description: string;
  skills: string;
  location: string;
}

const initialForm: ProjectForm = {
  title: "",
  category: "Web Development",
  budget: "",
  deadline: "",
  description: "",
  skills: "React, UI Design, API Integration",
  location: "Remote",
};

export default function PostProjectPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<ProjectForm>(initialForm);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const storedProjects = JSON.parse(localStorage.getItem("postedProjects") || "[]");
    const accentMap: Record<string, string> = {
      "Web Development": "blue",
      "UI/UX Design": "red",
      Branding: "green",
      Marketing: "blue",
      "Mobile App": "red",
    };

    const newProject = {
      title: formData.title || "New Project Opportunity",
      type: formData.category || "Project",
      budget: formData.budget || "Project-based",
      deadline: formData.deadline || "Flexible",
      applicants: 0,
      status: "Open",
      description: formData.description || "New project opportunity posted by a client.",
      skills: (formData.skills || "")
        .split(",")
        .map((skill) => skill.trim())
        .filter(Boolean),
      accent: accentMap[formData.category] || "blue",
    };

    localStorage.setItem("postedProjects", JSON.stringify([newProject, ...storedProjects]));
    setSubmitted(true);
    setTimeout(() => {
      navigate("/projects");
    }, 1200);
  };

  return (
    <div className="post-project-page">
      <div className="post-project-shell">
        <div className="post-project-header">
          <div>
            <p className="eyebrow">Create opportunity</p>
            <h1>Post a Project</h1>
          </div>
          <button type="button" className="btn btn--ghost" onClick={() => navigate("/projects")}>
            Back to Projects
          </button>
        </div>

        <form className="project-form" onSubmit={handleSubmit}>
          <div className="form-grid">
            <label>
              <span>Project title</span>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="e.g. Website Redesign"
                required
              />
            </label>

            <label>
              <span>Category</span>
              <select name="category" value={formData.category} onChange={handleChange}>
                <option>Web Development</option>
                <option>UI/UX Design</option>
                <option>Branding</option>
                <option>Marketing</option>
                <option>Mobile App</option>
              </select>
            </label>

            <label>
              <span>Price</span>
              <input
                type="number"
                name="budget"
                value={formData.budget}
                onChange={handleChange}
                placeholder="$1500"
                required
              />
            </label>

            <label>
              <span>Deadline</span>
              <input
                type="date"
                name="deadline"
                value={formData.deadline}
                onChange={handleChange}
                required
              />
            </label>

            <label className="full-width">
              <span>Project description</span>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={5}
                placeholder="Describe the project goals, deliverables, and expectations..."
                required
              />
            </label>

            <label>
              <span>Required skills</span>
              <input
                type="text"
                name="skills"
                value={formData.skills}
                onChange={handleChange}
                placeholder="React, UI Design, Figma"
                required
              />
            </label>

            <label>
              <span>Location</span>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="Remote / City"
                required
              />
            </label>
          </div>

          <div className="form-actions">
            <button type="button" className="btn btn--ghost" onClick={() => setFormData(initialForm)}>
              Clear
            </button>
            <button type="submit" className="btn btn--red">
              {submitted ? "Posted Successfully" : "Publish Project"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
