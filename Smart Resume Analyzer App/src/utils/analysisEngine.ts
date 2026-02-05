
// This is a simulation of the backend NLP logic.
// In a real production app, this would be a Python backend with scikit-learn/spaCy.

export interface AnalysisResult {
  matchPercentage: number;
  matchedSkills: string[];
  missingSkills: string[];
  keywords: {
    found: string[];
    missing: string[];
  };
  sectionCheck: {
    summary: boolean;
    education: boolean;
    projects: boolean;
    experience: boolean;
    skills: boolean;
  };
  qualityScore: {
    skillsMatch: number; // out of 40
    keywords: number;    // out of 30
    sections: number;    // out of 20
    formatting: number;  // out of 10
    total: number;
  };
  suggestions: string[];
}

const COMMON_SKILLS = [
  "React", "Python", "JavaScript", "TypeScript", "Node.js", "SQL", "NoSQL", 
  "AWS", "Docker", "Kubernetes", "Git", "CI/CD", "Agile", "Scrum", 
  "Communication", "Leadership", "Problem Solving", "Teamwork", 
  "Java", "C++", "C#", "Go", "Rust", "HTML", "CSS", "Tailwind", 
  "Machine Learning", "Data Analysis", "Project Management", "Marketing"
];

const KEYWORDS = [
  "scalable", "robust", "optimization", "performance", "deployment", 
  "architecture", "collaboration", "innovative", "stakeholders", 
  "strategy", "driven", "passionate", "lifecycle", "mentorship"
];

export const analyzeResume = (resumeText: string, jobDescription: string): AnalysisResult => {
  const resumeLower = resumeText.toLowerCase();
  const jdLower = jobDescription.toLowerCase();

  // 1. Skill Matching
  const jdSkills = COMMON_SKILLS.filter(skill => jdLower.includes(skill.toLowerCase()));
  const matchedSkills = jdSkills.filter(skill => resumeLower.includes(skill.toLowerCase()));
  const missingSkills = jdSkills.filter(skill => !resumeLower.includes(skill.toLowerCase()));

  // 2. Keyword Analysis
  const jdKeywords = KEYWORDS.filter(kw => jdLower.includes(kw));
  const foundKeywords = jdKeywords.filter(kw => resumeLower.includes(kw));
  const missingKeywords = jdKeywords.filter(kw => !resumeLower.includes(kw));

  // 3. Section Check (heuristic: look for section headers)
  const sections = {
    summary: /summary|profile|about/i.test(resumeLower),
    education: /education|university|college|degree/i.test(resumeLower),
    projects: /projects|portfolio/i.test(resumeLower),
    experience: /experience|employment|work history/i.test(resumeLower),
    skills: /skills|technologies|stack/i.test(resumeLower),
  };

  // 4. Scoring Logic
  const skillsScore = jdSkills.length > 0 ? (matchedSkills.length / jdSkills.length) * 40 : 40;
  const keywordsScore = jdKeywords.length > 0 ? (foundKeywords.length / jdKeywords.length) * 30 : 30;
  
  const sectionCount = Object.values(sections).filter(Boolean).length;
  const sectionsScore = (sectionCount / 5) * 20;
  
  const formattingScore = 10; // Assume good formatting for text input
  
  const totalScore = Math.round(skillsScore + keywordsScore + sectionsScore + formattingScore);

  // 5. Suggestions
  const suggestions = [];
  if (missingSkills.length > 0) {
    suggestions.push(`Add missing skills: ${missingSkills.slice(0, 3).join(", ")}`);
  }
  if (!sections.summary) {
    suggestions.push("Add a Professional Summary section to highlight your goals.");
  }
  if (!sections.projects) {
    suggestions.push("Include a Projects section to showcase practical experience.");
  }
  if (missingKeywords.length > 0) {
    suggestions.push(` Incorporate key industry terms like "${missingKeywords[0]}"`);
  }
  if (resumeText.length < 500) {
    suggestions.push("Your resume seems short. Elaborate on your experiences.");
  }

  return {
    matchPercentage: totalScore,
    matchedSkills,
    missingSkills,
    keywords: {
      found: foundKeywords,
      missing: missingKeywords
    },
    sectionCheck: sections,
    qualityScore: {
      skillsMatch: Math.round(skillsScore),
      keywords: Math.round(keywordsScore),
      sections: Math.round(sectionsScore),
      formatting: formattingScore,
      total: totalScore
    },
    suggestions
  };
};
