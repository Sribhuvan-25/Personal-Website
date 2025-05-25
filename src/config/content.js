// Content repository configuration
export const CONTENT_CONFIG = {
  // GitHub repository details
  owner: "Sribhuvan-25", // Updated to match actual GitHub username
  repo: "Personal-Website-Content",
  branch: "main",

  // API URLs
  apiUrl:
    "https://api.github.com/repos/Sribhuvan-25/Personal-Website-Content/contents",
  rawUrl:
    "https://raw.githubusercontent.com/Sribhuvan-25/Personal-Website-Content/main",

  // Cache settings
  cacheTimeout: 5 * 60 * 1000, // 5 minutes in milliseconds

  // Development mode (set to true to use local fallback data)
  isDevelopment: process.env.NODE_ENV === "development",

  // Content paths
  paths: {
    personal: {
      bio: "personal/bio.json",
      experience: "personal/experience.json",
      research: "personal/research.json",
      skills: "personal/skills.json",
    },
    projects: {
      index: "projects/index.json",
    },
    blog: {
      index: "blog/index.json",
      posts: "blog/posts",
    },
    images: {
      personal: "personal",
      projects: "projects",
      blog: "blog/images",
      general: "images",
    },
  },

  // Fallback data for development/offline mode
  fallbackData: {
    "personal/bio.json": {
      name: "Sribhuvan Reddy Yellu",
      position: "Developer",
      description: ["Passionate about AI/ML and full-stack development."],
      image: "/default-avatar.jpg",
      location: "Atlanta, GA",
      email: "sribhuvan.y@gmail.com",
      social: {
        github: "https://github.com/Sribhuvan-25",
        linkedin: "https://linkedin.com/in/sribhuvan-yellu",
      },
    },
    "personal/experience.json": [],
    "personal/research.json": [],
    "personal/skills.json": [],
    "projects/index.json": [],
    "blog/index.json": [],
  },
};

export default CONTENT_CONFIG;
