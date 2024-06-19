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
      "Grad-CAM++",
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
    description:
      "Executed automated licence plate recognition within drive-thru systems, that enables to provide personalized menu to customers. Implemented a ML algorithm & Computer vision model using OpenCV and used Tesseract OCR, achieving an accuracy of 80%. Integrated this model to an existing product at NCR with a flask backend and worked with MongoDB for data management.",
    technologies: ["OpenCV", "Tesseract OCR", "Flask", "MongoDB"],
  },
  {
    title: "Tumor Detection",
    description:
      "Proposed and performed tumor detection using advanced image classification techniques specifically tailored for brain MRIs. Prepared 3 distinct CNN architectures and 2 traditional ML models processed on over 500+ images of 4 different classes. Achieved an accuracy of 84%, precision of 81% and reduction of processing time by 20% leveraging the MobileResNet model.",
    technologies: ["CNN", "MobileResNet", "Image Classification", "MRI"],
  },
];

export const CONTACT = {
  email: "sribhuvan.y@gmail.com",
};

// import project1 from "../assets/projects/project-1.jpg";
// import project2 from "../assets/projects/project-2.jpg";
// import project3 from "../assets/projects/project-3.jpg";
// import project4 from "../assets/projects/project-4.jpg";

// export const HERO_CONTENT = `I am a passionate full stack developer with a knack for crafting robust and scalable web applications. With 5 years of hands-on experience, I have honed my skills in front-end technologies like React and Next.js, as well as back-end technologies like Node.js, MySQL, PostgreSQL, and MongoDB. My goal is to leverage my expertise to create innovative solutions that drive business growth and deliver exceptional user experiences.`;

// export const ABOUT_TEXT = `I am a dedicated and versatile full stack developer with a passion for creating efficient and user-friendly web applications. With 5 years of professional experience, I have worked with a variety of technologies, including React, Next.js, Node.js, MySQL, PostgreSQL, and MongoDB. My journey in web development began with a deep curiosity for how things work, and it has evolved into a career where I continuously strive to learn and adapt to new challenges. I thrive in collaborative environments and enjoy solving complex problems to deliver high-quality solutions. Outside of coding, I enjoy staying active, exploring new technologies, and contributing to open-source projects.`;

// export const EXPERIENCES = [
//   {
//     year: "2023 - Present",
//     role: "Senior Full Stack Developer",
//     company: "Google Inc.",
//     description: `Led a team in developing and maintaining web applications using JavaScript, React.js, and Node.js. Implemented RESTful APIs and integrated with MongoDB databases. Collaborated with stakeholders to define project requirements and timelines.`,
//     technologies: ["Javascript", "React.js", "Next.js", "mongoDB"],
//   },
//   {
//     year: "2022 - 2023",
//     role: "Frontend Developer",
//     company: "Adobe",
//     description: `Designed and developed user interfaces for web applications using Next.js and React. Worked closely with backend developers to integrate frontend components with Node.js APIs. Implemented responsive designs and optimized frontend performance.`,
//     technologies: ["HTML", "CSS", "Vue.js", "mySQL"],
//   },
//   {
//     year: "2021 - 2022",
//     role: "Full Stack Developer",
//     company: "Facebook",
//     description: `Developed and maintained web applications using JavaScript, React.js, and Node.js. Designed and implemented RESTful APIs for data communication. Collaborated with cross-functional teams to deliver high-quality software products on schedule.`,
//     technologies: ["Python", "Svelte", "Three.js", "Postgres"],
//   },
//   {
//     year: "2020 - 2021",
//     role: "Software Engineer",
//     company: "Paypal",
//     description: `Contributed to the development of web applications using JavaScript, React.js, and Node.js. Managed databases and implemented data storage solutions using MongoDB. Worked closely with product managers to prioritize features and enhancements.`,
//     technologies: ["Ruby", "Rails", "PHP", "Sqlite"],
//   },
// ];

// export const PROJECTS = [
//   {
//     title: "E-Commerce Website",
//     // image: project1,
//     description:
//       "A fully functional e-commerce website with features like product listing, shopping cart, and user authentication.",
//     technologies: ["HTML", "CSS", "React", "Node.js", "MongoDB"],
//   },
//   {
//     title: "Task Management App",
//     // image: project2,
//     description:
//       "An application for managing tasks and projects, with features such as task creation, assignment, and progress tracking.",
//     technologies: ["HTML", "CSS", "Angular", "Firebase"],
//   },
//   {
//     title: "Portfolio Website",
//     // image: project3,
//     description:
//       "A personal portfolio website showcasing projects, skills, and contact information.",
//     technologies: ["HTML", "CSS", "React", "Bootstrap"],
//   },
//   {
//     title: "Blogging Platform",
//     // image: project4,
//     description:
//       "A platform for creating and publishing blog posts, with features like rich text editing, commenting, and user profiles.",
//     technologies: ["HTML", "CSS", "Vue.js", "Express", "mySQL"],
//   },
// ];

// export const CONTACT = {
//   address: "Address",
//   phoneNo: "+1 123-456-7890 ",
//   email: "super@gmail.com",
// };
