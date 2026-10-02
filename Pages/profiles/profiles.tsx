import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./profiles.css";

const profiles = [
  {
    name: "Maya Cooper",
    title: "UI/UX Designer",
    location: "San Francisco, CA",
    availability: "Available for freelance",
    rate: "$45/hr",
    skills: ["Figma", "User Flows", "Design Systems"],
    color: "red",
  },
  {
    name: "Oliver Smith",
    title: "Frontend Developer",
    location: "New York, NY",
    availability: "Open to remote",
    rate: "$55/hr",
    skills: ["React", "JavaScript", "CSS"],
    color: "blue",
  },
  {
    name: "Aisha Rahman",
    title: "Product Manager",
    location: "London, UK",
    availability: "Full-time available",
    rate: "$70/hr",
    skills: ["Roadmaps", "Analytics", "Stakeholder Mgmt"],
    color: "green",
  },
];

export default function ProfilesPage({ searchTerm = "" }: { searchTerm?: string }) {
  const [followed, setFollowed] = useState<Record<string, boolean>>({});
  const [selectedProfile, setSelectedProfile] = useState(profiles[0]);
  const normalizedSearch = searchTerm.trim().toLowerCase();

  const visibleProfiles = profiles.filter((profile) => {
    if (!normalizedSearch) return true;
    return (
      profile.name.toLowerCase().includes(normalizedSearch) ||
      profile.title.toLowerCase().includes(normalizedSearch) ||
      profile.location.toLowerCase().includes(normalizedSearch) ||
      profile.skills.some((skill) => skill.toLowerCase().includes(normalizedSearch))
    );
  });

  const activeProfile = visibleProfiles.find((profile) => profile.name === selectedProfile.name) || selectedProfile;

  return (
    <div className="profiles-page">
      <header className="page-header">
        <div>
          <p className="eyebrow">Top talent</p>
          <h1>Profiles</h1>
        </div>
      </header>

      <div className="profiles-layout">
        <div className="profile-grid">
          {visibleProfiles.length ? visibleProfiles.map((profile) => (
            <article key={profile.name} className={activeProfile.name === profile.name ? "profile-card selected" : "profile-card"}>
              <div className={`profile-avatar ${profile.color}`}>
                {profile.name
                  .split(" ")
                  .map((part) => part[0])
                  .join("")
                  .slice(0, 2)}
              </div>

              <div className="profile-main">
                <div className="profile-header">
                  <div>
                    <h3>{profile.name}</h3>
                    <p>{profile.title}</p>
                  </div>
                  <button
                    type="button"
                    className={followed[profile.name] ? "follow-button following" : "follow-button"}
                    onClick={() => setFollowed((current) => ({ ...current, [profile.name]: !current[profile.name] }))}
                  >
                    {followed[profile.name] ? "Following" : "Follow"}
                  </button>
                </div>

                <div className="profile-meta">
                  <span>📍 {profile.location}</span>
                  <span>{profile.availability}</span>
                  <span>Rate: {profile.rate}</span>
                </div>

                <div className="profile-skills">
                  {profile.skills.map((skill) => (
                    <span key={skill}>{skill}</span>
                  ))}
                </div>

                <button
                  type="button"
                  className="btn btn--ghost profile-btn"
                  onClick={() => setSelectedProfile(profile)}
                >
                  View Profile
                </button>
              </div>
            </article>
          )) : <p className="muted empty-state">No matching profiles found.</p>}
        </div>

        <aside className="profile-sidebar">
          <div className="card profile-detail">
            <div className={`profile-detail__avatar ${activeProfile.color}`}>
              {activeProfile.name
                .split(" ")
                .map((part) => part[0])
                .join("")
                .slice(0, 2)}
            </div>

            <div className="profile-detail__header">
              <div>
                <p className="eyebrow">Profile overview</p>
                <h2>{activeProfile.name}</h2>
              </div>
              <button
                type="button"
                className={followed[activeProfile.name] ? "follow-button following" : "follow-button"}
                onClick={() => setFollowed((current) => ({ ...current, [activeProfile.name]: !current[activeProfile.name] }))}
              >
                {followed[activeProfile.name] ? "Following" : "Follow"}
              </button>
            </div>

            <p className="profile-detail__title">{activeProfile.title}</p>

            <div className="profile-detail__meta">
              <span>📍 {activeProfile.location}</span>
              <span>{activeProfile.availability}</span>
              <span>Rate: {activeProfile.rate}</span>
            </div>

            <div className="profile-detail__summary">
              <h3>About</h3>
              <p>
                Creative specialist with a strong track record in building intuitive interfaces,
                aligning product ideas with user needs, and shipping polished experiences that
                convert attention into action.
              </p>
            </div>

            <div className="profile-detail__skills">
              {activeProfile.skills.map((skill) => (
                <span key={skill}>{skill}</span>
              ))}
            </div>

            <div className="profile-detail__cta">
              <Link to="/messages" className="btn btn--ghost">Message</Link>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
