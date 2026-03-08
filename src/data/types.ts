// Types for all portfolio data

export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  whyBuilt: string;
  category: "Full Stack" | "AI/ML" | "Experiment";
  techStack: string[];
  thumbnail?: string;
  images?: string[];
  demoUrl?: string;
  githubUrl?: string;
  videoUrl?: string;
  date: string;
  duration?: string;
  team?: string;
  status?: string;
  learnings?: string[];
  challenges?: { problem: string; solution: string }[];
  thinkingProcess?: string;
}

export interface Skill {
  name: string;
  icon?: string;
  level: 1 | 2 | 3; // 1=beginner, 2=intermediate, 3=advanced
  projectCount?: number;
}

export interface SkillCategory {
  category: string;
  skills: Skill[];
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  duration: string;
  grade?: string;
  highlights: string[];
  logo?: string;
}

export interface Certification {
  id: string;
  name: string;
  platform: string;
  issuer: string;
  date: string;
  url?: string;
  prestigious?: boolean;
}

export interface Achievement {
  id: string;
  title: string;
  context: string;
  date: string;
  description: string;
  tier?: "gold" | "silver" | "bronze";
  proofUrl?: string;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  category: "AI" | "ML" | "Dev" | "Personal";
  date: string;
  readTime: string;
  coverImage?: string;
  externalUrl?: string;
}

export interface Research {
  id: string;
  title: string;
  type: "Literature Review" | "Experiment" | "Mini Research" | "Dataset Analysis";
  abstract: string;
  tags: string[];
  methodology?: string;
  findings?: string;
  conclusions?: string;
  references?: string[];
}
