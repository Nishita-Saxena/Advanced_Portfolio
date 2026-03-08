import { SkillCategory } from "./types";

// TODO: Update proficiency levels and add/remove skills as needed
export const skillCategories: SkillCategory[] = [
  {
    category: "Languages",
    skills: [
      { name: "Python", level: 3, projectCount: 8 },
      { name: "C++", level: 2, projectCount: 3 },
      { name: "JavaScript", level: 2, projectCount: 4 },
      { name: "TypeScript", level: 2, projectCount: 2 },
      { name: "SQL", level: 2, projectCount: 3 },
    ],
  },
  {
    category: "AI/ML Frameworks",
    skills: [
      { name: "TensorFlow", level: 3, projectCount: 5 },
      { name: "PyTorch", level: 2, projectCount: 3 },
      { name: "Scikit-learn", level: 3, projectCount: 6 },
      { name: "Keras", level: 2, projectCount: 4 },
      { name: "OpenCV", level: 2, projectCount: 2 },
    ],
  },
  {
    category: "Web Development",
    skills: [
      { name: "React", level: 2, projectCount: 3 },
      { name: "Node.js", level: 2, projectCount: 2 },
      { name: "HTML/CSS", level: 3, projectCount: 5 },
      { name: "Tailwind CSS", level: 2, projectCount: 2 },
      { name: "Flask", level: 2, projectCount: 3 },
    ],
  },
  {
    category: "Databases",
    skills: [
      { name: "MySQL", level: 2, projectCount: 3 },
      { name: "MongoDB", level: 2, projectCount: 2 },
      { name: "SQLite", level: 2, projectCount: 2 },
    ],
  },
  {
    category: "Tools & DevOps",
    skills: [
      { name: "Git", level: 3, projectCount: 10 },
      { name: "VS Code", level: 3 },
      { name: "Jupyter", level: 3, projectCount: 8 },
      { name: "Docker", level: 1, projectCount: 1 },
      { name: "Linux", level: 2, projectCount: 4 },
    ],
  },
];
