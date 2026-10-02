import React, { useMemo, useState } from "react";
import "./companies.css";

const initialCompanies = [
  {
    name: "Google",
    logo: "G",
    industry: "Internet & Software",
    location: "Mountain View, CA",
    size: "10,001+ employees",
    rating: 4.9,
    roles: 18,
    tags: ["Cloud", "AI", "Remote"],
    accent: "google",
    category: "Technology",
    followed: false,
  },
  {
    name: "Microsoft",
    logo: "M",
    industry: "Software & Cloud",
    location: "Redmond, WA",
    size: "10,001+ employees",
    rating: 4.8,
    roles: 24,
    tags: ["Azure", "Security", "Hybrid"],
    accent: "microsoft",
    category: "Technology",
    followed: true,
  },
  {
    name: "Amazon",
    logo: "A",
    industry: "E-commerce & Logistics",
    location: "Seattle, WA",
    size: "10,001+ employees",
    rating: 4.7,
    roles: 31,
    tags: ["Retail", "Operations", "Data"],
    accent: "amazon",
    category: "Startup",
    followed: false,
  },
  {
    name: "Spotify",
    logo: "S",
    industry: "Media & Entertainment",
    location: "Stockholm, Sweden",
    size: "1,001-5,000",
    rating: 4.6,
    roles: 9,
    tags: ["Design", "Product", "Music"],
    accent: "spotify",
    category: "Remote",
    followed: false,
  },
  {
    name: "Stripe",
    logo: "St",
    industry: "Fintech",
    location: "San Francisco, CA",
    size: "501-1,000",
    rating: 4.9,
    roles: 14,
    tags: ["Payments", "Growth", "Platform"],
    accent: "stripe",
    category: "Finance",
    followed: false,
  },
  {
    name: "Slack",
    logo: "SL",
    industry: "Communication",
    location: "San Francisco, CA",
    size: "1,001-5,000",
    rating: 4.5,
    roles: 11,
    tags: ["Product", "Collaboration", "Remote"],
    accent: "slack",
    category: "Technology",
    followed: false,
  },
];

const stats = [
  { value: "145K", label: "Companies" },
  { value: "2.8K", label: "New this week" },
  { value: "86%", label: "Hiring rate" },
  { value: "12K", label: "Open positions" },
];

const filters = ["All", "Technology", "Finance", "Healthcare", "Startup", "Remote"];

const hiring = [
  { company: "Google", roles: "18 openings" },
  { company: "Microsoft", roles: "24 openings" },
  { company: "Stripe", roles: "14 openings" },
];

const savedSearches = ["Product Designers", "Remote Frontend", "AI Engineers", "Business Analysts"];

export default function CompaniesPage({ searchTerm: globalSearchTerm = "" }: { searchTerm?: string }) {
  const [companies, setCompanies] = useState(initialCompanies);
  const [activeFilter, setActiveFilter] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("Most relevant");
  const [selectedCompany, setSelectedCompany] = useState("Google");

  const activeSearchTerm = (globalSearchTerm || searchTerm).trim().toLowerCase();

  const visibleCompanies = useMemo(() => {
    const filtered = companies.filter((company) => {
      const matchesCategory = activeFilter === "All" || company.category === activeFilter;
      const matchesSearch = !activeSearchTerm ||
        company.name.toLowerCase().includes(activeSearchTerm) ||
        company.industry.toLowerCase().includes(activeSearchTerm) ||
        company.tags.some((tag) => tag.toLowerCase().includes(activeSearchTerm));
      return matchesCategory && matchesSearch;
    });

    if (sortBy === "Highest rated") {
      filtered.sort((a, b) => b.rating - a.rating);
    }
    if (sortBy === "Largest team") {
      filtered.sort((a, b) => Number(b.size.split("-")[0]?.replace(/[^\d]/g, "") || 0) - Number(a.size.split("-")[0]?.replace(/[^\d]/g, "") || 0));
    }

    return filtered;
  }, [companies, activeFilter, searchTerm, sortBy]);

  const toggleFollow = (companyName: string) => {
    setCompanies((current) =>
      current.map((company) =>
        company.name === companyName ? { ...company, followed: !company.followed } : company
      )
    );
  };

  return (
    <div className="companies-page">
      <header className="company-header">
        <div>
          <p className="eyebrow">Discover companies</p>
          <h1>Companies</h1>
        </div>
      </header>

      <section className="company-stats">
        {stats.map((item) => (
          <div className="stat-box" key={item.label}>
            <strong>{item.value}</strong>
            <span>{item.label}</span>
          </div>
        ))}
      </section>

      <div className="companies-layout">
        <main className="company-main">
          <div className="company-toolbar">
            <div className="search-box">
              <span>⌕</span>
              <input
                type="text"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                placeholder="Search companies"
                aria-label="Search companies"
              />
            </div>
            <select aria-label="Filter companies" value={sortBy} onChange={(event) => setSortBy(event.target.value)}>
              <option>Most relevant</option>
              <option>Highest rated</option>
              <option>Largest team</option>
            </select>
          </div>

          <div className="filter-row">
            {filters.map((filter) => (
              <button
                key={filter}
                type="button"
                className={filter === activeFilter ? "chip chip--active" : "chip"}
                onClick={() => setActiveFilter(filter)}
              >
                {filter}
              </button>
            ))}
          </div>

          <div className="company-list">
            {visibleCompanies.map((company) => (
              <article
                className={selectedCompany === company.name ? "company-card company-card--selected" : "company-card"}
                key={company.name}
              >
                <div className={`company-logo ${company.accent}`}>
                  {company.logo}
                </div>

                <div className="company-info">
                  <div className="company-topline">
                    <div>
                      <h3>{company.name}</h3>
                      <p>{company.industry}</p>
                    </div>
                    <button type="button" className="follow-button" onClick={() => toggleFollow(company.name)}>
                      {company.followed ? "Following" : "Follow"}
                    </button>
                  </div>

                  <div className="company-meta">
                    <span>📍 {company.location}</span>
                    <span>👥 {company.size}</span>
                    <span>★ {company.rating}</span>
                  </div>

                  <div className="company-tags">
                    {company.tags.map((tag) => (
                      <span key={tag} className="company-tag">{tag}</span>
                    ))}
                  </div>

                  <div className="company-footer">
                    <span>{company.roles} open roles</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </main>

        <aside className="company-sidebar">
          <section className="card company-panel">
            <h4 className="card__title">Top Hiring</h4>
            <ul className="mini-list">
              {hiring.map((item) => (
                <li key={item.company}>
                  <div>
                    <strong>{item.company}</strong>
                    <small>{item.roles}</small>
                  </div>
                  <span className="dot" />
                </li>
              ))}
            </ul>
          </section>
        </aside>
      </div>
    </div>
  );
}
