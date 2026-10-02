import React, { useEffect, useState } from "react";
import type { ChatMessage, Conversation } from "../../appTypes";
import "./messages.css";

const conversationsStorageKey = "workwiseConversations";
const messagesStorageKey = "workwiseMessages";

const conversations = [
  { name: "Maya Cooper", role: "UI/UX Designer", time: "2m ago", unread: 2, active: true },
  { name: "Oliver Smith", role: "Frontend Developer", time: "25m ago", unread: 0, active: false },
  { name: "Aisha Rahman", role: "Product Manager", time: "1h ago", unread: 1, active: false },
];

const initialMessages: Record<string, ChatMessage[]> = {
  "Maya Cooper": [
    { sender: "them", text: "Hi! I reviewed your portfolio and loved the project flow." },
    { sender: "me", text: "Thanks! I’d be happy to share more details about the process." },
    { sender: "them", text: "Perfect. Can we schedule a quick call tomorrow morning?" },
  ],
  "Oliver Smith": [
    { sender: "them", text: "Hey! Are you available to discuss the new frontend project?" },
  ],
  "Aisha Rahman": [
    { sender: "them", text: "Thanks for connecting. I would love to learn more about your experience." },
  ],
};

const conversationUpdates: Record<string, { name: string; role: string }> = {
  "Olivia Johnson": { name: "Maya Cooper", role: "UI/UX Designer" },
  "Noah Kim": { name: "Oliver Smith", role: "Frontend Developer" },
  "Emma Lee": { name: "Aisha Rahman", role: "Product Manager" },
};

const getStoredValue = <T,>(key: string, fallback: T): T => {
  if (typeof window === "undefined") return fallback;

  try {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) as T : fallback;
  } catch {
    return fallback;
  }
};

export default function MessagesPage({ searchTerm = "" }: { searchTerm?: string }) {
  const [selected, setSelected] = useState("Maya Cooper");
  const [conversationList, setConversationList] = useState(() =>
    getStoredValue<Conversation[]>(conversationsStorageKey, conversations).map((chat) => ({
      ...chat,
      ...conversationUpdates[chat.name],
    }))
  );
  const [chatMessages, setChatMessages] = useState(() => {
    const storedMessages = getStoredValue<Record<string, ChatMessage[]>>(messagesStorageKey, initialMessages);
    return Object.fromEntries(Object.entries(storedMessages).map(([name, messages]) => [
      conversationUpdates[name]?.name ?? name,
      messages,
    ]));
  });
  const [messageText, setMessageText] = useState("");
  const normalizedSearch = searchTerm.trim().toLowerCase();
  const selectedConversation = conversationList.find((chat) => chat.name === selected) || conversationList[0];

  useEffect(() => {
    localStorage.setItem(conversationsStorageKey, JSON.stringify(conversationList));
  }, [conversationList]);

  useEffect(() => {
    localStorage.setItem(messagesStorageKey, JSON.stringify(chatMessages));
  }, [chatMessages]);

  const visibleConversations = conversationList.filter((chat) => {
    if (!normalizedSearch) return true;
    return `${chat.name} ${chat.role}`.toLowerCase().includes(normalizedSearch);
  });

  const handleSelectConversation = (name: string) => {
    setSelected(name);
    setConversationList((current) => current.map((chat) => (
      chat.name === name ? { ...chat, unread: 0 } : chat
    )));
  };

  const handleSendMessage = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const text = messageText.trim();

    if (!text) return;

    setChatMessages((current) => ({
      ...current,
      [selected]: [...(current[selected] || []), { sender: "me", text }],
    }));
    setMessageText("");
  };

  const handleDeleteMessage = (messageIndex: number) => {
    setChatMessages((current) => ({
      ...current,
      [selected]: (current[selected] || []).filter((_, index) => index !== messageIndex),
    }));
  };

  return (
    <div className="messages-page">
      <header className="page-header">
        <div>
          <p className="eyebrow">Inbox</p>
          <h1>Messages</h1>
        </div>
      </header>

      <div className="messages-layout">
        <aside className="conversation-list">
          {visibleConversations.length ? visibleConversations.map((chat) => (
            <button
              key={chat.name}
              type="button"
              className={selected === chat.name ? "conversation active" : "conversation"}
              onClick={() => handleSelectConversation(chat.name)}
            >
              <span className="avatar small">{chat.name.split(" ").map((part) => part[0]).join("").slice(0, 2)}</span>
              <div className="conversation-body">
                <div className="conversation-top">
                  <strong>{chat.name}</strong>
                  <small>{chat.time}</small>
                </div>
                <span>{chat.role}</span>
              </div>
              {chat.unread > 0 && <span className="unread">{chat.unread}</span>}
            </button>
          )) : <p className="muted empty-state">No matching conversations found.</p>}
        </aside>

        <main className="chat-panel">
          <div className="chat-header">
            <div className="chat-user">
              <span className="avatar">{selectedConversation.name.split(" ").map((part) => part[0]).join("").slice(0, 2)}</span>
              <div>
                <strong>{selectedConversation.name}</strong>
                <small>{selectedConversation.role}</small>
              </div>
            </div>
          </div>

          <div className="chat-thread">
            {(chatMessages[selected] || []).map((message, index) => (
              <div key={index} className={`message-row${message.sender === "me" ? " message-row--me" : ""}`}>
                <div className={message.sender === "me" ? "bubble me" : "bubble them"}>
                  {message.text}
                </div>
                {message.sender === "me" && (
                  <button
                    type="button"
                    className="message-delete"
                    aria-label={`Delete message: ${message.text}`}
                    onClick={() => handleDeleteMessage(index)}
                  >
                    Delete
                  </button>
                )}
              </div>
            ))}
          </div>

          <form className="chat-input-row" onSubmit={handleSendMessage}>
            <input
              type="text"
              placeholder={`Message ${selectedConversation.name}...`}
              value={messageText}
              onChange={(event) => setMessageText(event.target.value)}
            />
            <button type="submit" className="btn btn--red">Send</button>
          </form>
        </main>
      </div>
    </div>
  );
}
