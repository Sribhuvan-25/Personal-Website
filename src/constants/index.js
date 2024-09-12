import tumor from "../assets/tumor.png";
import driveThru from "../assets/driveThru.png";

export const INTRO_CONTENT = `Welcome to my personal website! Here, you'll find information about my professional journey, including my work experience, research projects, and personal endeavors. Explore my portfolio to see the innovative projects I've developed, and learn more about my passion for full software engineering and machine learning. Stay tuned for more updates on my work. Enjoy your visit!`;

export const ABOUT_TEXT =
  "I am Sribhuvan Reddy Yellu, a highly skilled and dedicated computer science professional with a strong academic background and diverse industry experience. I hold a Bachelor of Science in Computer Science from Georgia State University and am currently pursuing a Master’s in Computer Science from the same institution, with coursework covering advanced topics like deep learning and computer vision. My professional experience includes internships at Pearson VUE and NCR Corporation, where I excelled in full-stack and iOS development. Additionally, I have been working as a research student, notably in endoscopic image classification and melody generation using deep learning models. My technical proficiency spans multiple programming languages and tools, and my projects demonstrate my ability to integrate machine learning and computer vision techniques to solve complex problems.";

export const EXPERIENCES = [
  {
    year: "May 2024 - Aug 2024",
    role: "Software Engineer Intern (Full Stack Development)",
    company: "Pearson VUE, Bloomington, MN",
    description: `Developed ‘System Test Receipt’ feature for OnVue, providing breakdowns of test failures to enhance support efficiency. Architected and deployed a new service using Azure and TeamCity, integrating seamlessly into the existing system. Implemented the feature using Angular for frontend and Spring Boot for backend, streamlining the support process.`,
    technologies: ["Angular", "Spring Boot", "Azure", "TeamCity"],
  },
  {
    year: "May 2023 - Aug 2023",
    role: "Software Engineer Intern (Full Stack Development)",
    company: "NCR Corporation, Atlanta, GA",
    description: `Developed ‘Fees’ feature in Aloha Order Direct which impacts over 95% of total customer transaction experiences. Coordinated with 8 member Agile team and used Next.js for frontend, GraphQL middleware and Nest.js for backend. Executed unit testing using Jest and React Testing Library to ensure 100% coverage and robust functionality.`,
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
    role: "Software Engineer Intern (iOS Development)",
    company: "NCR Corporation, Atlanta, GA",
    description: `Spearheaded the intern team’s proof of concept by migrating 100% RESTful API calls from NOLO legacy to Mercury. Streamlined data retrieval and faster consumer request processing by moving from client side to server side rendering. Integrated customer-centric UI components with 3 engineers, seamlessly connecting front-end and back-end infrastructure.`,
    technologies: ["iOS", "RESTful API", "Mercury", "UI Components"],
  },
];

export const RESEARCH = [
  {
    year: "Jan 2024 - Present",
    role: "Graduate Research Assistant",
    company: "TReNDS Center, Atlanta, GA",
    description: `Engineered end-to-end endoscopic image classification system using DenseNet and Grad-CAM++, achieving 90% accuracy. Designed guided patch extraction and adaptive thresholding for precise polyp detection, enhancing model performance. Created a meta-classifier ensemble with RandomForest, GradientBoosting, and LogisticRegression, boosting recall to 91%.`,
    technologies: [
      "DenseNet",
      "GradCAM++",
      "RandomForest",
      "GradientBoosting",
      "LogisticRegression",
    ],
  },
  {
    year: "Nov 2021 - May 2023",
    role: "Undergraduate Research Student",
    company: "Georgia State University, Atlanta, GA",
    description: `Formulated a CNN LSTM deep learning model to generate intricate melodies, incorporating features such as pitch, duration, and offset. Processed model on 1000+ German folk music pieces, leveraging TensorFlow and the music21 library. Executed an optimization concept involving ‘placing matrix’ which resulted in an 86% reduction in training time.`,
    technologies: ["CNN", "LSTM", "TensorFlow", "music21"],
  },
];

export const PROJECTS = [
  {
    title: "Drive-Thru Vision [Hackathon Project]",
    image: driveThru,
    description:
      "Executed automated licence plate recognition within drive-thru systems, that enables to provide personalized menu to customers. Implemented a ML algorithm & Computer vision model using OpenCV and used Tesseract OCR, achieving an accuracy of 80%. Integrated this model to an existing product at NCR with a flask backend and worked with MongoDB for data management.",
    technologies: ["OpenCV", "Tesseract OCR", "Flask", "MongoDB"],
  },
  {
    title: "Tumor Detection",
    image: tumor,
    description:
      "Proposed and performed tumor detection using advanced image classification techniques specifically tailored for brain MRIs. Prepared 3 distinct CNN architectures and 2 traditional ML models processed on over 500+ images of 4 different classes. Achieved an accuracy of 84%, precision of 81% and reduction of processing time by 20% leveraging the MobileResNet model.",
    technologies: ["CNN", "MobileResNet", "Image Classification", "MRI"],
  },
];

export const CONTACT = {
  email: "sribhuvan.y@gmail.com",
};
