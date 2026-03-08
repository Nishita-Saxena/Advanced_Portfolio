import { Achievement } from "./types";

// TODO: Replace with your real achievements
export const achievements: Achievement[] = [
  {
    id: "hackathon-1",
    title: "1st Place — AI Innovation Hackathon",
    context: "// TODO: Hackathon name and organizer",
    date: "2025",
    description: "Built an AI-powered solution that won first place among 50+ teams.",
    tier: "gold",
  },
  {
    id: "kaggle-1",
    title: "Top 5% — Kaggle Competition",
    context: "// TODO: Competition name",
    date: "2024",
    description: "Achieved top 5% ranking in a Kaggle machine learning competition.",
    tier: "gold",
  },
  {
    id: "coding-1",
    title: "3-Star Coder on CodeChef",
    context: "CodeChef Competitive Programming",
    date: "2024",
    description: "Achieved 3-star rating through consistent competitive programming practice.",
    tier: "silver",
  },
  {
    id: "paper-1",
    title: "Research Paper Published",
    context: "// TODO: Journal/Conference name",
    date: "2025",
    description: "Published a research paper on deep learning applications.",
    tier: "gold",
  },
];

export const achievementStats = {
  hackathons: 5,
  competitions: 8,
  awards: 4,
};
