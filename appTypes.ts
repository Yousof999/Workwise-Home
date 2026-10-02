export interface PostedProject {
  title: string;
  type: string;
  budget: string;
  deadline: string;
  applicants: number;
  status: string;
  description: string;
  skills: string[];
  accent: string;
}

export interface JobPosting {
  title: string;
  company: string;
  type: string;
  location: string;
  salary: string;
  description: string;
  skills: string[];
  accent: string;
}

export interface JobApplication {
  jobTitle: string;
  company: string;
  fullName: string;
  email: string;
  phone: string;
  portfolio: string;
  coverLetter: string;
  resume: string;
}

export interface Conversation {
  name: string;
  role: string;
  time: string;
  unread: number;
  active: boolean;
}

export interface ChatMessage {
  sender: "me" | "them";
  text: string;
}

export interface Account {
  username: string;
  email: string;
  password: string;
}