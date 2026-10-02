import { useLocation, useNavigate } from "react-router-dom";
import React, { useRef, useState } from "react";
import type { JobApplication, JobPosting } from "../../appTypes";
import "./applying.css";

interface ApplicationForm {
  fullName: string;
  email: string;
  phone: string;
  portfolio: string;
  coverLetter: string;
  resume: string;
}

type ApplicationJob = Partial<JobPosting> & { role?: string };

const defaultApplicationSummary = {
  role: "Senior Product Designer",
  company: "Pixel Studio",
  location: "Remote",
  salary: "$90k - $120k",
};

export default function ApplyingPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const selectedJob: ApplicationJob = (location.state as { job?: ApplicationJob } | null)?.job ?? defaultApplicationSummary;
  const applicationSummary = {
    role: selectedJob.title ?? selectedJob.role ?? defaultApplicationSummary.role,
    company: selectedJob.company ?? defaultApplicationSummary.company,
    location: selectedJob.location ?? defaultApplicationSummary.location,
    salary: selectedJob.salary ?? defaultApplicationSummary.salary,
  };

  const [form, setForm] = useState<ApplicationForm>({
    fullName: "John Doe",
    email: "john@example.com",
    phone: "+1 (555) 234-8899",
    portfolio: "https://portfolio.example.com",
    coverLetter: "I’m excited to apply for this role because I enjoy turning product problems into elegant user experiences and measurable outcomes.",
    resume: "resume.pdf",
  });

  const [uploadError, setUploadError] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const fileExtension = file.name.slice(file.name.lastIndexOf(".")).toLowerCase();
    if (![".pdf", ".doc", ".docx"].includes(fileExtension)) {
      setUploadError("Please upload a PDF, DOC, or DOCX file.");
      event.target.value = "";
      return;
    }

    setUploadError("");
    setForm((current) => ({ ...current, resume: file.name }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const storedApplications: JobApplication[] = JSON.parse(localStorage.getItem("jobApplications") || "[]");
    const application = {
      jobTitle: applicationSummary.role,
      company: applicationSummary.company,
      ...form,
    };
    const alreadyApplied = storedApplications.some(
      (item) => item.jobTitle === application.jobTitle && item.company === application.company
    );

    if (!alreadyApplied) {
      localStorage.setItem("jobApplications", JSON.stringify([...storedApplications, application]));
    }
    navigate("/jobs");
  };

  return (
    <div className="applying-page">
      <div className="applying-shell">
        <aside className="applying-sidebar card">
          <p className="eyebrow">Application</p>
          <h1>{applicationSummary.role}</h1>
          <div className="company-block">
            <div className="company-mark">P</div>
            <div>
              <strong>{applicationSummary.company}</strong>
              <span>{applicationSummary.location}</span>
            </div>
          </div>

          <ul className="info-list">
            <li><span>Salary</span><strong>{applicationSummary.salary}</strong></li>
            <li><span>Type</span><strong>Full-time</strong></li>
            <li><span>Experience</span><strong>5+ years</strong></li>
          </ul>

          <div className="highlights">
            <span>Figma</span>
            <span>UX Writing</span>
            <span>Design Systems</span>
            <span>Research</span>
          </div>
        </aside>

        <main className="applying-main card">
          <div className="section-head">
            <div>
              <p className="eyebrow">Submit your profile</p>
              <h2>Apply for this position</h2>
            </div>
          </div>

          <form className="application-form" onSubmit={handleSubmit}>
            <div className="field-row two-col">
              <label>
                Full name
                <input name="fullName" value={form.fullName} onChange={handleChange} />
              </label>
              <label>
                Email address
                <input type="email" name="email" value={form.email} onChange={handleChange} />
              </label>
            </div>

            <div className="field-row two-col">
              <label>
                Phone number
                <input name="phone" value={form.phone} onChange={handleChange} />
              </label>
              <label>
                Portfolio URL
                <input name="portfolio" value={form.portfolio} onChange={handleChange} />
              </label>
            </div>

            <label>
              Cover letter
              <textarea name="coverLetter" rows={6} value={form.coverLetter} onChange={handleChange} />
            </label>

            <div className="upload-row">
              <label>
                Resume
                <input
                  ref={fileInputRef}
                  className="file-input-hidden"
                  type="file"
                  name="resume"
                  accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                  onChange={handleFileChange}
                />
                <span className="file-name">{form.resume}</span>
              </label>
              <button type="button" className="btn btn--ghost upload-btn" onClick={() => fileInputRef.current?.click()}>
                Upload file
              </button>
            </div>

            {uploadError && <div className="upload-error">{uploadError}</div>}

            <div className="form-actions">
              <button type="button" className="btn btn--ghost" onClick={() => navigate("/jobs")}>Cancel</button>
              <button type="submit" className="btn btn--red">Submit application</button>
            </div>

          </form>
        </main>
      </div>
    </div>
  );
}
