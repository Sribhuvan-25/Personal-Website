import Tumor from "../assets/TumorDetection.png";
import DriveThruImage from "../assets/driveThru.png";
import FitFusion from "../assets/FitFusion.png";
import CipherCloud from "../assets/CipherCloud.png";
import MelodyGenerator from "../assets/Melody.png";
import sLang from "../assets/sLang.png";
import NCR from "../assets/NCR_Corporation_logo.svg.png";
import Pearson from "../assets/Pearson.png";
import GSU from "../assets/GSU.jpg";
import TReNDS from "../assets/TReNDS.jpeg";

export const INTRO_CONTENT = `Welcome to my personal website! Here, you'll discover the highlights of my professional journey, encompassing my diverse work experience, impactful research, and personal passions. Dive into my portfolio to explore the cutting-edge projects I've developed, showcasing my expertise in software engineering and machine learning. Keep an eye out for updates as I continue to innovate and grow in my field. I hope you enjoy exploring my work as much as I've enjoyed creating it!`;
export const ABOUT_TEXT =
  "I am Sribhuvan Reddy Yellu, a passionate computer science professional with a robust academic foundation and diverse industry experience. I hold a Bachelor of Science in Computer Science from Georgia State University and am currently advancing my expertise with a Master's in Computer Science from the same institution, focusing on cutting-edge subjects like deep learning and computer vision. My professional journey includes impactful internships at Pearson VUE and NCR Corporation, where I honed my skills in full-stack and iOS development. As a research student, I've delved into innovative projects like endoscopic image classification and melody generation through deep learning models. Proficient across multiple programming languages and tools, I am driven by the challenge of integrating machine learning and computer vision techniques to address complex problems.";

export const EXPERIENCES = [
  {
    year: "Jan 2025 - Present",
    image: Pearson,
    role: "Software Engineer Intern (AI/ML)",
    company: "Pearson VUE, Bloomington, MN",
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
    year: "May 2024 - Dec 2024",
    image: Pearson,
    role: "Software Engineer Intern (Full Stack Development)",
    company: "Pearson VUE, Bloomington, MN",
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
    year: "May 2023 - Aug 2023",
    image: NCR,
    role: "Software Engineer Intern (Full Stack Development)",
    company: "NCR Corporation, Atlanta, GA",
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
    year: "May 2022 - Aug 2022",
    image: NCR,
    role: "Software Engineer Intern (iOS Development)",
    company: "NCR Corporation, Atlanta, GA",
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

export const RESEARCH = [
  {
    year: "Jan 2024 - Present",
    image: TReNDS,
    role: "Graduate Research Assistant",
    company: "TReNDS Center, Atlanta, GA",
    description: [
      "Engineered end-to-end endoscopic image classification system using DenseNet and Grad-CAM++, achieving 90% accuracy.",
      "Designed guided patch extraction and adaptive thresholding for precise polyp detection, enhancing model performance.",
      "Created a meta-classifier ensemble with RandomForest, GradientBoosting, and LogisticRegression, boosting recall to 91%.",
    ],
    technologies: [
      "Deep Learning",
      "GradCAM++",
      "Tensroflow",
      "Pytorch",
      "Image Processing",
    ],
  },
  {
    year: "Nov 2021 - May 2023",
    image: GSU,
    role: "Undergraduate Research Student",
    company: "Georgia State University, Atlanta, GA",
    description: [
      "Formulated a CNN LSTM deep learning model to generate intricate melodies, incorporating features such as pitch, duration, and offset.",
      "Processed model on 1000+ German folk music pieces, leveraging TensorFlow and the music21 library.",
      "Executed an optimization concept involving 'placing matrix,' resulting in an 86% reduction in training time.",
    ],
    technologies: ["Deep Learning", "Music Theory", "TensorFlow", "music21"],
  },
];

export const PROJECTS = [
  {
    title: "Drive-Thru Vision [Hackathon Project]",
    image: DriveThruImage,
    description: [
      "Executed automated license plate recognition within drive-thru systems, enabling personalized menus for customers.",
      "Implemented a machine learning algorithm and computer vision model using OpenCV and Tesseract OCR, achieving 80% accuracy.",
      "Integrated this model into an existing product at NCR with a Flask backend, working with MongoDB for data management.",
    ],
    technologies: ["OpenCV", "Tesseract OCR", "Flask", "MongoDB"],
  },
  {
    title: "Tumor Detection",
    image: Tumor,
    description: [
      "Proposed and performed tumor detection using advanced image classification techniques tailored for brain MRIs.",
      "Prepared 3 distinct CNN architectures and 2 traditional ML models, processing 500+ images across 4 different classes.",
      "Achieved 84% accuracy, 81% precision, and reduced processing time by 20% with MobileResNet.",
    ],
    technologies: ["Deep Learning", "Tensorflow", "Image Classification"],
    github: "https://github.com/Sribhuvan-25/Tumor-Detection",
  },
  {
    title: "CipherCloud",
    image: CipherCloud,
    description: [
      "Developed a zero-knowledge cloud storage architecture where the cloud provider has no usable knowledge of user data or keys without sacrificing speed or usability.",
      "Implemented client-side encryption with AES-256-GCM for file sealing and RSA-OAEP for wrapping 256-bit Data-Encryption Keys, ensuring private keys never leave the user's device.",
      "Created an append-only, SHA-256 hash-chained audit log for every operation (upload, download, key rotation), providing verifiable proof of integrity and forensic trail.",
      "Built prototype with Streamlit frontend, FastAPI backend, and SQLite storage, featuring per-file DEKs, manual/automated key rotation, and JWT-based sessions.",
      "Conducted comprehensive security testing covering key-substitution, replay, and log-tampering scenarios to validate enterprise-ready solution.",
      "Demonstrated practical viability of zero-knowledge cloud storage ensuring confidentiality, integrity, and accountability without trusting the server with plaintext or keys.",
    ],
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
    title: "FitFusion-AI",
    image: FitFusion,
    description: [
      "Developed an AI-driven platform providing personalized health and fitness guidance through advanced Retrieval-Augmented Generation (RAG) architecture.",
      "Integrated Pinecone's vector database and OpenAI's GPT-4 model to efficiently process user queries and deliver context-aware, real-time responses.",
      "Achieved 87% relevance accuracy by leveraging semantic query embeddings for retrieving relevant documents based on cosine similarity.",
      "Reduced query latency to 9 seconds by streamlining embedding generation process, document retrieval workflows, and response generation using GPT-4.",
      "Implemented iterative conversational capabilities to maintain context between queries, enabling seamless follow-up questions and achieving 85% user satisfaction.",
      "Designed scalable and responsive system utilizing OpenAI's embedding models and optimized pipeline for end-to-end query processing.",
    ],
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
    title: "Melody Generator",
    image: MelodyGenerator,
    description: [
      "Designed and implemented a CNN-LSTM deep learning model to generate intricate musical melodies using advanced AI techniques for creative applications.",
      "Utilized three key musical features—pitch, duration, and offset—to produce high-quality compositions with sophisticated musical structure.",
      "Processed over 1,000 German folk music pieces as input data, utilizing TensorFlow for model training and music21 library for data preprocessing and feature extraction.",
      "Implemented novel 'placing matrix' optimization strategy, achieving 86% reduction in training time while maintaining model performance.",
      "Demonstrated expertise in combining deep learning and domain-specific knowledge to create innovative solution for melody generation.",
    ],
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
    title: "sLang",
    image: sLang,
    description: [
      "Developed a comprehensive lexical and syntax analyzer to process and validate source code for a simplified programming language using Python.",
      "Implemented lexical analysis phase that scans source code to generate structured sequence of tokens, identifying keywords, identifiers, operators, and literals.",
      "Created syntax analysis phase that validates relationships between tokens by constructing parse trees, ensuring code structure aligns with language grammar.",
      "Designed layered approach for detecting syntactical errors and providing framework for further stages like semantic analysis or code generation.",
      "Applied core compiler design principles including tokenization and data structures like stacks for managing operator precedence and nested constructs.",
      "Demonstrated expertise in language parsing and application of foundational computer science principles in custom programming language design and validation.",
    ],
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

export const CONTACT = {
  email: "sribhuvan.y@gmail.com",
};
