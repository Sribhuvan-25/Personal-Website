import axios from "axios";

// Configuration for content sources
const CONTENT_CONFIG = {
  // Local content repository (for development)
  local: {
    baseURL: "/personal-website-content",
  },
  // GitHub content repository (for production)
  github: {
    baseURL: "https://raw.githubusercontent.com",
    repo:
      import.meta.env.VITE_CONTENT_REPO ||
      "your-username/personal-website-content",
    branch: "main",
  },
  // For images, you can use Cloudinary, AWS S3, or similar
  images: {
    baseURL:
      import.meta.env.VITE_IMAGE_CDN_URL ||
      "https://res.cloudinary.com/your-cloud-name",
  },
};

// Content Service Class
class ContentService {
  constructor() {
    this.githubClient = axios.create({
      baseURL: CONTENT_CONFIG.github.baseURL
    });
  }

  // Get the appropriate base URL based on environment
  getBaseURL() {
    // In development, use local files
    if (import.meta.env.DEV) {
      return CONTENT_CONFIG.local.baseURL;
    }
    // In production, use GitHub raw files
    return `${CONTENT_CONFIG.github.baseURL}/${CONTENT_CONFIG.github.repo}/${CONTENT_CONFIG.github.branch}`;
  }

  // Fetch personal information
  async getPersonalInfo() {
    try {
      const response = await this.githubClient.get(
        `/${CONTENT_CONFIG.github.repo}/${CONTENT_CONFIG.github.branch}/data/personal-info.json`
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching personal info:", error);
      return this.getLocalPersonalInfo();
    }
  }

  // Fetch experiences
  async getExperiences() {
    try {
      const response = await this.githubClient.get(
        `/${CONTENT_CONFIG.github.repo}/${CONTENT_CONFIG.github.branch}/data/experiences.json`
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching experiences:", error);
      return this.getLocalExperiences();
    }
  }

  // Fetch projects
  async getProjects() {
    try {
      const response = await this.githubClient.get(
        `/${CONTENT_CONFIG.github.repo}/${CONTENT_CONFIG.github.branch}/data/projects.json`
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching projects:", error);
      return this.getLocalProjects();
    }
  }

  // Fetch research
  async getResearch() {
    try {
      const response = await this.githubClient.get(
        `/${CONTENT_CONFIG.github.repo}/${CONTENT_CONFIG.github.branch}/data/research.json`
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching research:", error);
      return this.getLocalResearch();
    }
  }

  // Fetch tech stack
  async getTechStack() {
    try {
      const response = await this.githubClient.get(
        `/${CONTENT_CONFIG.github.repo}/${CONTENT_CONFIG.github.branch}/data/tech-stack.json`
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching tech stack:", error);
      return this.getLocalTechStack();
    }
  }

  // Get optimized image URL
  getImageUrl(imagePath, options = {}) {
    const { width, height, quality = 80, format = "auto" } = options;

    if (imagePath.startsWith("http")) {
      return imagePath;
    }

    // If using Cloudinary (only if explicitly configured)
    if (
      import.meta.env.VITE_IMAGE_CDN_URL &&
      CONTENT_CONFIG.images.baseURL.includes("cloudinary")
    ) {
      const transformations = [];
      if (width) transformations.push(`w_${width}`);
      if (height) transformations.push(`h_${height}`);
      transformations.push(`q_${quality}`, `f_${format}`);

      return `${
        CONTENT_CONFIG.images.baseURL
      }/image/upload/${transformations.join(",")}/${imagePath}`;
    }

    // Use GitHub raw content for public repo
    return `${CONTENT_CONFIG.github.baseURL}/${CONTENT_CONFIG.github.repo}/${CONTENT_CONFIG.github.branch}/images/${imagePath}`;
  }

  // Local fallback data (your current constants)
  getLocalPersonalInfo() {
    return {
      name: "Sribhuvan Reddy Yellu",
      title: "Software Engineer",
      about:
        "I am Sribhuvan Reddy Yellu, a passionate computer science professional with a robust academic foundation and diverse industry experience. I hold a Bachelor of Science in Computer Science from Georgia State University and am currently advancing my expertise with a Master's in Computer Science from the same institution, focusing on cutting-edge subjects like deep learning and computer vision. My professional journey includes impactful internships at Pearson VUE and NCR Corporation, where I honed my skills in full-stack and iOS development. As a research student, I've delved into innovative projects like endoscopic image classification and melody generation through deep learning models. Proficient across multiple programming languages and tools, I am driven by the challenge of integrating machine learning and computer vision techniques to address complex problems.",
      intro:
        "Welcome to my personal website! Here, you'll discover the highlights of my professional journey, encompassing my diverse work experience, impactful research, and personal passions. Dive into my portfolio to explore the cutting-edge projects I've developed, showcasing my expertise in software engineering and machine learning. Keep an eye out for updates as I continue to innovate and grow in my field. I hope you enjoy exploring my work as much as I've enjoyed creating it!",
      contact: {
        email: "sribhuvan.y@gmail.com",
        linkedin: "",
        github: "",
        twitter: "",
      },
      profileImage: "companies/profile.jpg",
      aboutImage: "companies/nameLogo.png",
    };
  }

  getLocalExperiences() {
    return [
      {
        year: "May 2025 - Present",
        image: "companies/pearson.png",
        role: "Software Engineer Intern (AI/ML)",
        company: "Pearson VUE, Bloomington, MN",
        description: [
          "Engineered real-time AI proctoring with Gemini-2.5-Flash at 30 FPS 92% detection confidence across 6 violation categories.",
          "Developed GPT-4.1 CAG pipeline that generates self-help articles from client-guides, slashing article-creation time by 80%.",
          "Engineered MCP server integrating Booking API for real-time appointment data, reducing manual support by 30%.",
          "Prototyped LangGraph+Gemini multi-agent assistant automating exam scheduling, rescheduling, and results retrieval.",
        ],
        technologies: [
          "Gemini-2.5-Flash",
          "Gemini-2.0-Flash",
          "Python",
          "GCP Vertex AI",
          "Computer Vision",
          "Facial Recognition",
        ],
      },
    ];
  }

  getLocalProjects() {
    return [
      {
        title: "Sample Project",
        description: ["This is a sample project description."],
        technologies: ["React", "Node.js"],
        image: "projects/sample.png",
        github: "https://github.com/example",
        live: "https://example.com",
      },
    ];
  }

  getLocalResearch() {
    return [
      {
        year: "2024",
        image: "research/sample.jpeg",
        role: "Research Assistant",
        company: "Sample University",
        description: ["This is a sample research description."],
        technologies: ["Python", "Machine Learning"],
      },
    ];
  }

  getLocalTechStack() {
    return {
      languages: [
        "Python",
        "JavaScript",
        "TypeScript",
        "Java",
        "Swift",
        "SQL",
        "HTML/CSS",
      ],
      frameworks: [
        "React",
        "Next.js",
        "Angular",
        "Nest.js",
        "FastAPI",
        "Flask",
        "Spring Boot",
      ],
      databases: ["PostgreSQL", "MongoDB", "SQLite", "Pinecone", "Redis"],
      cloud: ["AWS", "Azure", "GCP", "Docker", "Kubernetes"],
      ai_ml: [
        "TensorFlow",
        "PyTorch",
        "OpenAI GPT-4",
        "Gemini",
        "Claude",
        "Computer Vision",
        "NLP",
        "RAG",
      ],
      tools: [
        "Git",
        "GitHub",
        "VS Code",
        "Postman",
        "Jupyter",
        "TeamCity",
        "Azure DevOps",
      ],
    };
  }
}

export default new ContentService();