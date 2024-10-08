import tumor from "../assets/tumor.png";
import driveThru from "../assets/driveThru.png";
import NCR from "../assets/NCR_Corporation_logo.svg.png";
import Pearson from "../assets/Pearson.png";
import GSU from "../assets/GSU.jpg";
import TReNDS from "../assets/TReNDS.jpeg";

export const INTRO_CONTENT = `Welcome to my personal website! Here, you'll discover the highlights of my professional journey, encompassing my diverse work experience, impactful research, and personal passions. Dive into my portfolio to explore the cutting-edge projects I've developed, showcasing my expertise in software engineering and machine learning. Keep an eye out for updates as I continue to innovate and grow in my field. I hope you enjoy exploring my work as much as I’ve enjoyed creating it!`
export const ABOUT_TEXT =
  " am Sribhuvan Reddy Yellu, a passionate computer science professional with a robust academic foundation and diverse industry experience. I hold a Bachelor of Science in Computer Science from Georgia State University and am currently advancing my expertise with a Master’s in Computer Science from the same institution, focusing on cutting-edge subjects like deep learning and computer vision. My professional journey includes impactful internships at Pearson VUE and NCR Corporation, where I honed my skills in full-stack and iOS development. As a research student, I've delved into innovative projects like endoscopic image classification and melody generation through deep learning models. Proficient across multiple programming languages and tools, I am driven by the challenge of integrating machine learning and computer vision techniques to address complex problems.";

export const EXPERIENCES = [
  {
    year: "May 2024 - Aug 2024",
    image: Pearson,
    role: "Software Engineer Intern (Full Stack Development)",
    company: "Pearson VUE, Bloomington, MN",
    description: [
      "Enhanced frontend using Angular by adding the ST Receipt, updating verbiage, and integrating backend endpoints.",
      "Developed unit tests for Angular code, enhancing reliability and adhering to best software development practices.",
      "Followed SDLC and Agile Kanban methodologies to deliver code, collaborating across teams for timely efficient deployments.",
      "Established CI/CD pipelines with Azure DevOps and TeamCity, and added Helm charts to streamline development.",
      "Updated SQL scripts to update keys for all clients, ensuring data integrity during crucial information updates.",
    ],
    technologies: ["Angular", "Spring Boot", "Azure", "TeamCity", "SQL"],
  },
  {
    year: "May 2023 - Aug 2023",
    image: NCR,
    role: "Software Engineer Intern (Full Stack Development)",
    company: "NCR Corporation, Atlanta, GA",
    description: [
      "Developed 'Fees' feature in Aloha Order Direct, impacting over 95% of total customer transaction experiences.",
      "Coordinated with an 8-member Agile team and used Next.js for frontend, GraphQL middleware, and Nest.js for backend.",
      "Executed unit testing using Jest and React Testing Library, ensuring 100% coverage and robust functionality.",
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
      "Spearheaded the intern team's proof of concept by migrating 100% of RESTful API calls from NOLO legacy to Mercury.",
      "Streamlined data retrieval and improved consumer request processing by moving from client-side to server-side rendering.",
      "Integrated customer-centric UI components with 3 engineers, seamlessly connecting front-end and back-end infrastructure.",
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
    image: driveThru,
    description: [
      "Executed automated license plate recognition within drive-thru systems, enabling personalized menus for customers.",
      "Implemented a machine learning algorithm and computer vision model using OpenCV and Tesseract OCR, achieving 80% accuracy.",
      "Integrated this model into an existing product at NCR with a Flask backend, working with MongoDB for data management.",
    ],
    technologies: ["OpenCV", "Tesseract OCR", "Flask", "MongoDB"],
  },
  {
    title: "Tumor Detection",
    image: tumor,
    description: [
      "Proposed and performed tumor detection using advanced image classification techniques tailored for brain MRIs.",
      "Prepared 3 distinct CNN architectures and 2 traditional ML models, processing 500+ images across 4 different classes.",
      "Achieved 84% accuracy, 81% precision, and reduced processing time by 20% with MobileResNet.",
    ],
    technologies: ["Deep Learning", "Tensorflow", "Image Classification"],
  },
];

export const CONTACT = {
  email: "sribhuvan.y@gmail.com",
};
