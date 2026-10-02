import React, { useState } from "react";
import "./notification.css";

const initialNotifications = [
  { id: 1, title: "New job match", text: "A Senior UI Designer role matches your profile.", time: "5 min ago", read: false },
  { id: 2, title: "Project invite", text: "Olivia invited you to collaborate on a branding project.", time: "1 hour ago", read: false },
  { id: 3, title: "Message received", text: "Noah sent you a follow-up on your portfolio review.", time: "Today", read: true },
  { id: 4, title: "Profile viewed", text: "Your profile has been viewed by 8 recruiters this week.", time: "Yesterday", read: true },
];

export default function NotificationPage({ searchTerm = "" }: { searchTerm?: string }) {
  const [notifications, setNotifications] = useState(initialNotifications);
  const normalizedSearch = searchTerm.trim().toLowerCase();

  const visibleNotifications = notifications.filter((item) => {
    if (!normalizedSearch) return true;
    return `${item.title} ${item.text}`.toLowerCase().includes(normalizedSearch);
  });

  const markAllRead = () => {
    setNotifications((current) => current.map((item) => ({ ...item, read: true })));
  };

  return (
    <div className="notification-page">
      <header className="page-header">
        <div>
          <p className="eyebrow">Updates</p>
          <h1>Notifications</h1>
        </div>
        <button type="button" className="btn btn--red" onClick={markAllRead}>Mark all as read</button>
      </header>

      <div className="notification-list">
        {visibleNotifications.length ? visibleNotifications.map((item) => (
          <div key={item.id} className={item.read ? "notification-item read" : "notification-item"}>
            <span className="notification-dot" />
            <div className="notification-content">
              <div className="notification-top">
                <strong>{item.title}</strong>
                <small>{item.time}</small>
              </div>
              <p>{item.text}</p>
            </div>
          </div>
        )) : <p className="muted empty-state">No matching notifications found.</p>}
      </div>
    </div>
  );
}
