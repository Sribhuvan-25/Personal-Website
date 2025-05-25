import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Get current directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const exportContent = async () => {
  // Create output directory
  const outputDir = path.join(__dirname, "../content-export");

  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  // Create subdirectories
  const dirs = ["personal", "projects", "blog", "images"];
  dirs.forEach((dir) => {
    const dirPath = path.join(outputDir, dir);
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }
  });

  // Export personal info
  const personalInfo = {
    name: "Sribhuvan Reddy Yellu",
    position: "Developer",
    description: [
      "I am Sribhuvan Reddy Yellu, a passionate computer science professional with a robust academic foundation and diverse industry experience.",
      "I hold a Bachelor of Science in Computer Science from Georgia State University and am currently advancing my expertise with a Master's in Computer Science from the same institution, focusing on cutting-edge subjects like deep learning and computer vision.",
      "My professional journey includes impactful internships at Pearson VUE and NCR Corporation, where I honed my skills in full-stack and iOS development.",
      "As a research student, I've delved into innovative projects like endoscopic image classification and melody generation through deep learning models.",
      "Proficient across multiple programming languages and tools, I am driven by the challenge of integrating machine learning and computer vision techniques to address complex problems.",
    ],
    image: "personal/profile.jpg",
    location: "Atlanta, GA",
    email: "sribhuvan.y@gmail.com",
    social: {
      github: "https://github.com/Sribhuvan-25",
      linkedin: "https://linkedin.com/in/sribhuvan-yellu",
      twitter: "https://twitter.com/sribhuvan_yellu",
    },
    intro:
      "Welcome to my personal website! Here, you'll discover the highlights of my professional journey, encompassing my diverse work experience, impactful research, and personal passions. Dive into my portfolio to explore the cutting-edge projects I've developed, showcasing my expertise in software engineering and machine learning. Keep an eye out for updates as I continue to innovate and grow in my field. I hope you enjoy exploring my work as much as I've enjoyed creating it!",
  };

  // Export experience data
  const experience = [
    {
      id: 1,
      year: "Jan 2025 - Present",
      role: "Software Engineer Intern (AI/ML)",
      company: "Pearson VUE, Bloomington, MN",
      image: "images/Pearson.png",
      description: [
        "Built a Copilot agent with Teams Toolkit that surfaces precise answers from internal docs, slashing employee lookup time from minutes to seconds.",
        "Prototyped a CrewAI multi-agent workflow that auto-summarizes Teams meetings and emails minutes, eliminating manual note-taking and proving CrewAI's integration value.",
        "Integrated DiskANN vector indexing into the RAG service on PostgreSQL, 3x similarity-search speed and cutting retrieval latency.",
        "Built an MCP server on Bookings-API with Claude + Perplexity for one-chat scheduling and related recommendations.",
      ],
      technologies: [
        "Teams Toolkit",
        "CrewAI",
        "DiskANN",
        "PostgreSQL",
        "RAG",
        "Claude",
        "Perplexity",
      ],
    },
    {
      id: 2,
      year: "May 2024 - Dec 2024",
      role: "Software Engineer Intern (Full Stack Development)",
      company: "Pearson VUE, Bloomington, MN",
      image: "images/Pearson.png",
      description: [
        "Implemented Angular components and services to handle dynamic data binding and improve modularity, ensuring seamless integration of the ST Receipt feature with existing application architecture.",
        "Optimized performance by refactoring complex Angular code into reusable modules, reducing redundancy and enhancing maintainability.",
        "Created custom Angular directives and pipes for efficient manipulation and display of ST Receipt data, adhering to the DRY principle.",
        "Integrated backend APIs using Angular's HttpClient to fetch, post, and update data for the ST Receipt feature, ensuring robust communication between the frontend and backend.",
        "Enhanced error handling mechanisms in Angular services and components by implementing interceptor logic for consistent error messaging and logging.",
        "Conducted in-depth unit testing using Jasmine and Karma for Angular components and services, achieving >90% code coverage and ensuring application reliability.",
        "Designed and implemented database queries and transactions in SQL to manage ST Receipt data, optimizing execution time and ensuring accurate data handling.",
        "Configured and deployed Helm charts for Azure Kubernetes Service (AKS) clusters, enabling scalable and consistent deployment of containerized services.",
        "Set up and maintained CI/CD pipelines using Azure DevOps and YAML scripts, automating build and deployment processes to achieve faster delivery cycles.",
        "Debugged and resolved cross-environment issues by leveraging tools like Postman for API testing, Azure DevOps logs, and browser developer tools for frontend issues.",
        "Updated business rules in SQL scripts to accommodate evolving requirements, performing data migrations and maintaining backward compatibility across client systems.",
        "Managed complex deployment configurations in TeamCity, customizing build steps and deployment strategies to align with the project requirements.",
        "Collaborated with cross-functional teams, including QA and DevOps, to implement end-to-end testing frameworks and smooth deployment pipelines.",
        "Documented system updates and deployment procedures, ensuring future maintainability and clarity for development and operations teams.",
        "Monitored and resolved production bugs, using logs and monitoring tools like Azure Monitor and Application Insights to minimize downtime.",
      ],
      technologies: ["Angular", "Spring Boot", "Azure", "TeamCity", "SQL"],
    },
    {
      id: 3,
      year: "May 2023 - Aug 2023",
      role: "Software Engineer Intern (Full Stack Development)",
      company: "NCR Corporation, Atlanta, GA",
      image: "images/NCR_Corporation_logo.svg.png",
      description: [
        "Developed and deployed the 'Fees' feature in Aloha Order Direct, a critical enhancement impacting over 95% of customer transactions by enabling dynamic fee calculations and seamless integration with existing checkout workflows.",
        "Designed and implemented responsive and interactive UI components using Next.js, ensuring cross-browser compatibility and optimal performance across devices.",
        "Leveraged GraphQL middleware to streamline communication between the frontend and backend, reducing data retrieval times and enhancing application performance.",
        "Developed backend services with Nest.js, implementing robust fee calculation logic, secure API endpoints, and effective error-handling mechanisms to ensure system reliability.",
        "Collaborated closely with an 8-member Agile team, participating in sprint planning, backlog refinement, and daily stand-ups to deliver features on schedule while adhering to Agile best practices.",
        "Executed comprehensive unit and integration testing using Jest and React Testing Library, achieving 100% test coverage to ensure the feature's functionality and maintain high code quality standards.",
        "Created mocks and test doubles for GraphQL API responses, simulating backend interactions during testing to decouple dependencies and enhance test reliability.",
        "Optimized feature deployment using CI/CD pipelines, ensuring smooth and automated integration of the 'Fees' feature into production environments.",
        "Ensured backward compatibility of the 'Fees' feature by conducting regression testing and collaborating with QA teams to validate existing workflows and customer scenarios.",
        "Documented feature functionality, API contracts, and architectural design for the 'Fees' module, facilitating seamless handoffs and future maintenance.",
      ],
      technologies: [
        "Next.js",
        "GraphQL",
        "Nest.js",
        "Jest",
        "React Testing Library",
      ],
    },
    {
      id: 4,
      year: "May 2022 - Aug 2022",
      role: "Software Engineer Intern (iOS Development)",
      company: "NCR Corporation, Atlanta, GA",
      image: "images/NCR_Corporation_logo.svg.png",
      description: [
        "Spearheaded the intern team's proof of concept by successfully migrating 100% of RESTful API calls from NOLO legacy to Mercury, ensuring enhanced system scalability and improved performance.",
        "Refactored existing API endpoints to align with Mercury's modern architecture, optimizing request-response cycles and reducing latency by 25%.",
        "Implemented server-side rendering (SSR) to streamline data retrieval, reducing client-side processing load and improving page load times by 30%.",
        "Collaborated with backend engineers to design and implement a middleware layer, enabling secure and efficient API consumption for consumer-facing applications.",
        "Developed and deployed reusable customer-centric UI components using React.js, ensuring compatibility with Mercury's backend services and adhering to best coding practices.",
        "Optimized frontend performance by integrating lazy loading and memoization techniques, enhancing the efficiency of data-driven UI updates.",
        "Utilized Postman and Swagger to test and validate new API integrations, ensuring compliance with RESTful API standards and consistent behavior across endpoints.",
      ],
      technologies: ["iOS Development", "Swift", "RESTful API"],
    },
  ];

  // Export research data
  const research = [
    {
      id: 1,
      year: "Jan 2024 - Present",
      role: "Graduate Research Assistant",
      company: "TReNDS Center, Atlanta, GA",
      image: "images/TReNDS.jpeg",
      description: [
        "Engineered end-to-end endoscopic image classification system using DenseNet and Grad-CAM++, achieving 90% accuracy.",
        "Designed guided patch extraction and adaptive thresholding for precise polyp detection, enhancing model performance.",
        "Created a meta-classifier ensemble with RandomForest, GradientBoosting, and LogisticRegression, boosting recall to 91%.",
      ],
      technologies: [
        "Deep Learning",
        "GradCAM++",
        "Tensorflow",
        "Pytorch",
        "Image Processing",
      ],
    },
    {
      id: 2,
      year: "Nov 2021 - May 2023",
      role: "Undergraduate Research Student",
      company: "Georgia State University, Atlanta, GA",
      image: "images/GSU.jpg",
      description: [
        "Formulated a CNN LSTM deep learning model to generate intricate melodies, incorporating features such as pitch, duration, and offset.",
        "Processed model on 1000+ German folk music pieces, leveraging TensorFlow and the music21 library.",
        "Executed an optimization concept involving 'placing matrix,' resulting in an 86% reduction in training time.",
      ],
      technologies: ["Deep Learning", "Music Theory", "TensorFlow", "music21"],
    },
  ];

  // Export projects data
  const projects = [
    {
      id: 1,
      title: "Drive-Thru Vision [Hackathon Project]",
      description: [
        "Executed automated license plate recognition within drive-thru systems, enabling personalized menus for customers.",
        "Implemented a machine learning algorithm and computer vision model using OpenCV and Tesseract OCR, achieving 80% accuracy.",
        "Integrated this model into an existing product at NCR with a Flask backend, working with MongoDB for data management.",
      ],
      image: "projects/driveThru.png",
      technologies: ["OpenCV", "Tesseract OCR", "Flask", "MongoDB"],
    },
    {
      id: 2,
      title: "Tumor Detection",
      description: [
        "Proposed and performed tumor detection using advanced image classification techniques tailored for brain MRIs.",
        "Prepared 3 distinct CNN architectures and 2 traditional ML models, processing 500+ images across 4 different classes.",
        "Achieved 84% accuracy, 81% precision, and reduced processing time by 20% with MobileResNet.",
      ],
      image: "projects/TumorDetection.png",
      technologies: ["Deep Learning", "Tensorflow", "Image Classification"],
      github: "https://github.com/Sribhuvan-25/Tumor-Detection",
    },
    {
      id: 3,
      title: "CipherCloud",
      description: [
        "Developed a zero-knowledge cloud storage architecture where the cloud provider has no usable knowledge of user data or keys without sacrificing speed or usability.",
        "Implemented client-side encryption with AES-256-GCM for file sealing and RSA-OAEP for wrapping 256-bit Data-Encryption Keys, ensuring private keys never leave the user's device.",
        "Created an append-only, SHA-256 hash-chained audit log for every operation (upload, download, key rotation), providing verifiable proof of integrity and forensic trail.",
        "Built prototype with Streamlit frontend, FastAPI backend, and SQLite storage, featuring per-file DEKs, manual/automated key rotation, and JWT-based sessions.",
        "Conducted comprehensive security testing covering key-substitution, replay, and log-tampering scenarios to validate enterprise-ready solution.",
        "Demonstrated practical viability of zero-knowledge cloud storage ensuring confidentiality, integrity, and accountability without trusting the server with plaintext or keys.",
      ],
      image: "projects/CipherCloud.png",
      technologies: [
        "AES-256-GCM",
        "RSA-OAEP",
        "SHA-256",
        "Streamlit",
        "FastAPI",
        "SQLite",
        "JWT",
      ],
      github: "https://github.com/Sribhuvan-25/CipherCloud",
    },
    {
      id: 4,
      title: "FitFusion-AI",
      description: [
        "Developed an AI-driven platform providing personalized health and fitness guidance through advanced Retrieval-Augmented Generation (RAG) architecture.",
        "Integrated Pinecone's vector database and OpenAI's GPT-4 model to efficiently process user queries and deliver context-aware, real-time responses.",
        "Achieved 87% relevance accuracy by leveraging semantic query embeddings for retrieving relevant documents based on cosine similarity.",
        "Reduced query latency to 9 seconds by streamlining embedding generation process, document retrieval workflows, and response generation using GPT-4.",
        "Implemented iterative conversational capabilities to maintain context between queries, enabling seamless follow-up questions and achieving 85% user satisfaction.",
        "Designed scalable and responsive system utilizing OpenAI's embedding models and optimized pipeline for end-to-end query processing.",
      ],
      image: "projects/FitFusion.png",
      technologies: [
        "RAG",
        "Pinecone",
        "OpenAI GPT-4",
        "Python",
        "NLP",
        "Vector Databases",
      ],
      github: "https://github.com/Sribhuvan-25/FitFusion-AI",
    },
    {
      id: 5,
      title: "Melody Generator",
      description: [
        "Designed and implemented a CNN-LSTM deep learning model to generate intricate musical melodies using advanced AI techniques for creative applications.",
        "Utilized three key musical features—pitch, duration, and offset—to produce high-quality compositions with sophisticated musical structure.",
        "Processed over 1,000 German folk music pieces as input data, utilizing TensorFlow for model training and music21 library for data preprocessing and feature extraction.",
        "Implemented novel 'placing matrix' optimization strategy, achieving 86% reduction in training time while maintaining model performance.",
        "Demonstrated expertise in combining deep learning and domain-specific knowledge to create innovative solution for melody generation.",
      ],
      image: "projects/Melody.png",
      technologies: [
        "CNN-LSTM",
        "TensorFlow",
        "music21",
        "Deep Learning",
        "Music Theory",
      ],
      github: "https://github.com/Sribhuvan-25/Melody-Generator",
    },
    {
      id: 6,
      title: "sLang",
      description: [
        "Developed a comprehensive lexical and syntax analyzer to process and validate source code for a simplified programming language using Python.",
        "Implemented lexical analysis phase that scans source code to generate structured sequence of tokens, identifying keywords, identifiers, operators, and literals.",
        "Created syntax analysis phase that validates relationships between tokens by constructing parse trees, ensuring code structure aligns with language grammar.",
        "Designed layered approach for detecting syntactical errors and providing framework for further stages like semantic analysis or code generation.",
        "Applied core compiler design principles including tokenization and data structures like stacks for managing operator precedence and nested constructs.",
        "Demonstrated expertise in language parsing and application of foundational computer science principles in custom programming language design and validation.",
      ],
      image: "projects/sLang.png",
      technologies: [
        "Python",
        "Lexical Analysis",
        "Syntax Analysis",
        "Compiler Design",
        "Parsing",
      ],
      github: "https://github.com/Sribhuvan-25/Lexical_And_Syntax_Analyzer",
    },
  ];

  // Export technologies/skills
  const technologies = [
    {
      category: "Languages",
      items: [
        "JavaScript",
        "TypeScript",
        "Python",
        "Java",
        "Swift",
        "C++",
        "SQL",
      ],
    },
    {
      category: "Frontend",
      items: [
        "React",
        "Angular",
        "Next.js",
        "HTML5",
        "CSS3",
        "Tailwind CSS",
        "Bootstrap",
      ],
    },
    {
      category: "Backend",
      items: [
        "Node.js",
        "Express",
        "Nest.js",
        "FastAPI",
        "Spring Boot",
        "Flask",
        "GraphQL",
      ],
    },
    {
      category: "AI/ML",
      items: [
        "TensorFlow",
        "PyTorch",
        "Scikit-learn",
        "OpenAI API",
        "Pinecone",
        "RAG",
        "Computer Vision",
      ],
    },
    {
      category: "Databases",
      items: ["PostgreSQL", "MongoDB", "SQLite", "Vector Databases", "DiskANN"],
    },
    {
      category: "Cloud & DevOps",
      items: [
        "Azure",
        "AWS",
        "Docker",
        "Kubernetes",
        "CI/CD",
        "TeamCity",
        "Azure DevOps",
      ],
    },
    {
      category: "Tools & Others",
      items: [
        "Git",
        "Postman",
        "Jest",
        "Jasmine",
        "Karma",
        "Teams Toolkit",
        "CrewAI",
      ],
    },
  ];

  // Blog posts structure (for AI-generated content)
  const blogIndex = [
    {
      slug: "welcome-to-my-blog",
      title: "Welcome to My Tech Blog",
      excerpt:
        "An introduction to my journey in AI/ML and software development, and what you can expect from this blog.",
      date: "2024-01-15",
      tags: ["Introduction", "AI", "Software Development"],
      hero: "blog/images/welcome-hero.jpg",
      author: "Sribhuvan Reddy Yellu",
    },
  ];

  // Write files
  try {
    fs.writeFileSync(
      path.join(outputDir, "personal/bio.json"),
      JSON.stringify(personalInfo, null, 2)
    );

    fs.writeFileSync(
      path.join(outputDir, "personal/experience.json"),
      JSON.stringify(experience, null, 2)
    );

    fs.writeFileSync(
      path.join(outputDir, "personal/research.json"),
      JSON.stringify(research, null, 2)
    );

    fs.writeFileSync(
      path.join(outputDir, "personal/skills.json"),
      JSON.stringify(technologies, null, 2)
    );

    fs.writeFileSync(
      path.join(outputDir, "projects/index.json"),
      JSON.stringify(projects, null, 2)
    );

    fs.writeFileSync(
      path.join(outputDir, "blog/index.json"),
      JSON.stringify(blogIndex, null, 2)
    );

    // Create package.json for the export script
    const packageJson = {
      type: "module",
      scripts: {
        export: "node exportContent.js",
      },
    };

    fs.writeFileSync(
      path.join(__dirname, "package.json"),
      JSON.stringify(packageJson, null, 2)
    );

    // Create README for content repo
    const readmeContent = `# Personal Website Content

This repository contains all content for Sribhuvan Reddy Yellu's personal website including:

- Personal information and bio
- Work experience and research
- Projects portfolio
- Blog posts (AI-generated and manual)
- Images and media assets

## Structure

\`\`\`
├── personal/
│   ├── bio.json          # Personal information and contact
│   ├── experience.json   # Work experience
│   ├── research.json     # Research experience
│   └── skills.json       # Technologies and skills
├── projects/
│   ├── index.json        # Projects listing
│   └── images/           # Project images
├── blog/
│   ├── index.json        # Blog posts index
│   ├── posts/            # Individual blog posts
│   └── images/           # Blog images
└── images/               # General images (logos, etc.)
\`\`\`

## Usage

This content is consumed by the main website via the GitHub API. The website includes:
- Caching for performance
- Fallback mechanisms for reliability
- Error handling for network issues

## AI Blog Pipeline

The AI blog generation system automatically commits new posts to this repository following the established JSON structure.

## Image Management

All images are stored in appropriate subdirectories:
- \`personal/\` - Profile and personal images
- \`projects/\` - Project screenshots and demos
- \`blog/images/\` - Blog post hero images
- \`images/\` - Company logos and general assets

## Content Updates

Content can be updated by:
1. Direct editing via GitHub web interface
2. Pull requests for collaborative editing
3. Automated commits from the AI blog pipeline
4. Manual commits for immediate updates
`;

    fs.writeFileSync(path.join(outputDir, "README.md"), readmeContent);

    console.log("✅ Content exported successfully to:", outputDir);
    console.log("\nFiles created:");
    console.log("- personal/bio.json");
    console.log("- personal/experience.json");
    console.log("- personal/research.json");
    console.log("- personal/skills.json");
    console.log("- projects/index.json");
    console.log("- blog/index.json");
    console.log("- README.md");
    console.log("\nNext steps:");
    console.log(
      '1. Create a new GitHub repository called "Personal-Website-Content"'
    );
    console.log("2. Upload the exported content to that repository");
    console.log("3. Copy your existing images to the appropriate directories");
    console.log("4. Update your website to use the content service");
    console.log("5. Test the integration thoroughly");
    console.log("6. Update your AI blog pipeline to use the new repository");
  } catch (error) {
    console.error("❌ Error exporting content:", error);
  }
};

// Run the export
exportContent();
