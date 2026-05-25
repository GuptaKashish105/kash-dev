import React from "react";
import { Code2, Layers, Database, Wrench, Bot, Layout } from "lucide-react";
import {
  SkillGroup,
  Experience,
  Project,
  Education,
  Certificate,
} from "./types";

export const PERSONAL_INFO = {
  name: "Kashish Gupta",
  title: "Frontend-focused Software Engineer",
  profileImage:
    "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=1000",
  location: "Noida, India",
  phone: "8077863344",
  email: "kashishgupta142@gmail.com",
  linkedin: "https://www.linkedin.com/in/kashishgupta142/",
  github: "https://github.com/GuptaKashish105/",
  // portfolio: "https://bold.pro/my/kashish-gupta-250403000258",
  summary:
    "Frontend-focused Software Engineer with 3 years of experience building scalable SaaS applications using React.js, TypeScript, Next.js, and Node.js for enterprise clients like Kapture and Zepto. Achievements include improving UI latency by 30-40% through targeted performance optimizations and architecting a microfrontend platform that enhanced release efficiency across 5-6 tech teams. Awarded 'Above and Beyond' for outstanding performance in project delivery and successfully delivered client requirements to over 1,000 clients in Kapture’s AI-powered CRM systems.",
};

export const SKILL_GROUPS: (SkillGroup & { icon: React.ReactNode })[] = [
  {
    category: "AI & Automation",
    items: [
      "Prompt-based feature generation",
      "AI-assisted UX",
      "ChatGPT",
      "Claude AI",
      "OpenAI APIs",
      "GitHub Copilot",
    ],
    icon: <Bot className="w-5 h-5 text-purple-400" />,
  },
  {
    category: "Frontend",
    items: [
      "React.js",
      "TypeScript",
      "Next.js",
      "JavaScript (ES6+)",
      "Tailwind CSS",
      "Material UI",
    ],
    icon: <Layout className="w-5 h-5 text-blue-400" />,
  },
  {
    category: "Architecture",
    items: [
      "Micro-Frontends",
      "Component-driven design",
      "Scalable UI systems",
    ],
    icon: <Layers className="w-5 h-5 text-emerald-400" />,
  },
  {
    category: "Backend Basics",
    items: ["Node.js", "REST APIs", "MongoDB"],
    icon: <Database className="w-5 h-5 text-orange-400" />,
  },
  {
    category: "Tools",
    items: [
      "Git",
      "GitHub",
      "Bitbucket",
      "Jira",
      "Postman",
      "VS Code",
      "Cursor",
    ],
    icon: <Wrench className="w-5 h-5 text-pink-400" />,
  },
];

export const EXPERIENCES: Experience[] = [
  {
    company: "Kapture CX",
    role: "Software Development Engineer - II",
    period: "Jan 2023 – Feb 2026",
    description:
      "Frontend developer for core Ticketing and Order Management modules of Kapture’s enterprise CRM platform. Specialize in React.js, TypeScript, and micro frontend architecture.",
    responsibilities: [
      "Developed and maintained highly modular and scalable UI components using React, JavaScript, TypeScript, and Tailwind CSS.",
      "Worked extensively on implementing and maintaining micro frontend architecture to improve code maintainability.",
      "Collaborated closely with cross-functional teams to gather requirements and deliver features.",
      "Guided new interns, performed code reviews, and ensured adherence to coding standards.",
    ],
    achievements: [
      "Reduced frontend deployment and release cycle time by ~30% by implementing independent micro-frontend deployments.",
      "Improved client onboarding and feature go-live speed by ~25% through AI Builder’s prompt-based UI generation.",
      "Recognized as 'Above and Beyond' employee for consistent delivery and high-impact contributions.",
    ],
    techStack: [
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Micro Frontends",
      "Claude AI",
      "Node",
    ],
  },
  {
    company: "Timidlly",
    role: "Web Development Intern",
    period: "Nov 2022 - Jan 2023",
    description:
      "Developed responsive UI components and collaborated on design implementation to improve user experience.",
    responsibilities: [
      "Developed responsive UI components using React and JavaScript.",
      "Built a personal portfolio and photography site with Redux and basic Node.js.",
      "Collaborated with the team to follow best coding practices and deliver clean, maintainable code.",
    ],
    achievements: [],
    techStack: ["JavaScript", "HTML", "CSS", "Node", "React", "Redux"],
  },
];

export const PROJECTS: Project[] = [
  {
    title: "HireAI-Agent",
    period: "Aug 2025",
    role: "AI Engineering – React 19 + Gemini",
    about:
      "An autonomous AI job application agent powered by Google Gemini. Optimized for the Indian market, it sources matching roles from LinkedIn, Naukri, and Indeed, localizes salaries to INR/LPA, and drafts hyper-tailored application materials.",
    highlights: [
      "Autonomous sourcing from LinkedIn, Naukri, and Indeed.",
      "Smart localization of salaries to INR/LPA formats.",
      "Drafts hyper-tailored cover letters and application materials.",
    ],
    techStack: ["React 19", "TypeScript", "Gemini API", "Tailwind CSS"],
    image:
      "https://images.unsplash.com/photo-1614741118887-7a4ee193a5fa?auto=format&fit=crop&q=80&w=800",
  },
  {
    title: "KaptureCRM – Large Scale CRM SaaS Software",
    period: "Jan 2023 – Feb 2026",
    role: "Frontend Developer – Enterprise CRM (AI-Enabled)",
    about:
      "KaptureCRM is a customer support automation platform designed to streamline service operations.",
    highlights: [
      "Built scalable React + TypeScript UI for enterprise CRM.",
      "Implemented micro-frontend architecture.",
      "Link: https://kapdemo.kapturecrm.com/nui/",
    ],
    techStack: ["React", "TypeScript", "Micro-frontends", "Tailwind"],
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800",
  },
  {
    title: "AI Chatbot Plugin Interface",
    period: "May 2025",
    role: "Frontend Developer – AI Chat Interface",
    about:
      "Intelligent chatbot interface enhanced with smart slash command suggestions.",
    highlights: [
      "Built AI-powered chatbot UI with slash commands.",
      "Designed plugin-based architecture for LLMs.",
      "Source: github.com/GuptaKashish105/ai-chatbot",
    ],
    techStack: ["TypeScript", "Tailwind", "React", "Copilot"],
    image:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
  },
  {
    title: "Facebook Clone",
    period: "Personal Project",
    role: "Frontend Developer",
    about:
      "Social Media UI recreation with dynamic feed and responsive layouts.",
    highlights: [
      "Complex social networking UI components.",
      "Responsive navigation and post interactions.",
      "Source: github.com/GuptaKashish105/fbclone",
    ],
    techStack: ["React", "Tailwind CSS", "JavaScript"],
    image:
      "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&q=80&w=800",
  },
  {
    title: "Smart ToDo App",
    period: "Aug 2025",
    role: "Full-Stack Developer",
    about: "Task management app with automatic deadline-based categorization.",
    highlights: [
      "Smart task organization logic.",
      "React UI + Node.js REST APIs integration.",
      "Source: github.com/GuptaKashish105/todo",
    ],
    techStack: ["React", "Node.js", "MongoDB", "Express"],
    image:
      "https://images.unsplash.com/photo-1540350394557-8d14678e7f91?auto=format&fit=crop&q=80&w=800",
  },
  {
    title: "E-Commerce Website",
    period: "Personal Project",
    role: "Full-Stack Developer",
    about:
      "Complete e-commerce platform with catalog, cart, and checkout flow.",
    highlights: [
      "Full product lifecycle and cart management.",
      "Integrated checkout simulations.",
      "Source: github.com/GuptaKashish105/ecommerce",
    ],
    techStack: ["React", "Node.js", "MongoDB", "Tailwind"],
    image:
      "https://images.unsplash.com/photo-1557821552-17105176677c?auto=format&fit=crop&q=80&w=800",
  },
];

export const EDUCATION: Education = {
  degree: "Bachelor of Technology in Computer Science",
  institution: "ABES Institute of Technology",
  period: "2019 – 2023",
  location: "Ghaziabad, Uttar Pradesh",
  gpa: "8.9 / 10",
};

export const CERTIFICATES: Certificate[] = [
  {
    name: "Above and Beyond Certified Employee",
    issuer: "Kapture CX",
    url: "https://www.linkedin.com/posts/kashishgupta142_appreciation-certificate-activity-7331190762010812416-udMN?utm_source=social_share_send&utm_medium=member_desktop_web&rcm=ACoAAC7MXLgBddcNYp8wfWR55RYJyX7yWUzxAOw",
  },
  {
    name: "Kapture Hackathon Winner",
    issuer: "Kapture CX",
    url: "https://credsverse.com/credentials/3bb962a1-3bfc-411b-8079-849aa2cae5b5",
  },
];

export const PROJECT_LINKS: Record<string, string> = {
  "HireAI-Agent":
    "https://aistudio.google.com/apps/drive/1efERimQd4CmiA_qJUhuOKqCXRy8B-ATN?showAssistant=true&resourceKey=&showPreview=true&fullscreenApplet=true",
  "KaptureCRM – Large Scale CRM SaaS Software":
    "https://kapdemo.kapturecrm.com/nui/",
  "Smart ToDo App": "https://github.com/GuptaKashish105/smart-todo-app",
  "AI Chatbot Plugin Interface":
    "https://github.com/GuptaKashish105/ai-chatbot-plugin-interface",
  "Facebook Clone": "https://github.com/GuptaKashish105/fbclone",
  "E-Commerce Website": "https://github.com/GuptaKashish105/ecommerce",
};
