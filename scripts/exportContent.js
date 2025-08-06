import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Get current directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Content Management Utility
 *
 * This script provides utilities for managing content repository operations:
 * - Creating content templates
 * - Validating content structure
 * - Backup operations
 *
 * Note: The actual content is now stored in the GitHub repository.
 * This script no longer contains hardcoded content data.
 */

// Content structure templates for new content types
const contentTemplates = {
  personalInfo: {
    name: "",
    position: "",
    description: [],
    image: "personal/profile.jpg",
    location: "",
    email: "",
    social: {
      github: "",
      linkedin: "",
      twitter: "",
    },
    intro: "",
  },

  experienceItem: {
    id: 0,
    year: "",
    role: "",
    company: "",
    image: "",
    description: [],
    technologies: [],
  },

  researchItem: {
    id: 0,
    year: "",
    role: "",
    company: "",
    image: "",
    description: [],
    technologies: [],
  },

  projectItem: {
    id: 0,
    title: "",
    description: [],
    image: "",
    technologies: [],
    github: "",
  },

  blogPost: {
    slug: "",
    title: "",
    excerpt: "",
    date: "",
    tags: [],
    hero: "",
    author: "Sribhuvan Reddy Yellu",
  },

  skillCategory: {
    category: "",
    items: [],
  },
};

const createContentTemplate = (type) => {
  if (!contentTemplates[type]) {
    console.error(`❌ Unknown template type: ${type}`);
    console.log(`Available types: ${Object.keys(contentTemplates).join(", ")}`);
    return;
  }

  const template = JSON.stringify(contentTemplates[type], null, 2);
  console.log(`📝 Template for ${type}:`);
  console.log(template);
  return contentTemplates[type];
};

const validateContentStructure = (content, type) => {
  const template = contentTemplates[type];
  if (!template) {
    return { valid: false, error: `Unknown content type: ${type}` };
  }

  // Basic structure validation
  const templateKeys = Object.keys(template);
  const contentKeys = Object.keys(content);

  const missingKeys = templateKeys.filter((key) => !contentKeys.includes(key));
  const extraKeys = contentKeys.filter((key) => !templateKeys.includes(key));

  if (missingKeys.length > 0) {
    return {
      valid: false,
      error: `Missing required fields: ${missingKeys.join(", ")}`,
    };
  }

  return {
    valid: true,
    warnings:
      extraKeys.length > 0
        ? `Extra fields found: ${extraKeys.join(", ")}`
        : null,
  };
};

const createDirectoryStructure = () => {
  const outputDir = path.join(__dirname, "../content-export");

  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  // Create subdirectories
  const dirs = [
    "personal",
    "projects",
    "blog",
    "blog/posts",
    "blog/images",
    "images",
    "projects",
  ];
  dirs.forEach((dir) => {
    const dirPath = path.join(outputDir, dir);
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }
  });

  console.log("✅ Directory structure created");
  return outputDir;
};

const createReadme = (outputDir) => {
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

## Content Templates

Use the content management utility to generate templates for new content:

\`\`\`bash
node scripts/exportContent.js template <type>
\`\`\`

Available template types:
- personalInfo
- experienceItem
- researchItem
- projectItem
- blogPost
- skillCategory
`;

  fs.writeFileSync(path.join(outputDir, "README.md"), readmeContent);
  console.log("✅ README.md created");
};

const main = () => {
  const args = process.argv.slice(2);
  const command = args[0];

  switch (command) {
    case "template":
      const type = args[1];
      if (!type) {
        console.log("Usage: node exportContent.js template <type>");
        console.log(
          `Available types: ${Object.keys(contentTemplates).join(", ")}`
        );
        return;
      }
      createContentTemplate(type);
      break;

    case "validate":
      console.log("Content validation feature - to be implemented");
      console.log("This would validate content structure against templates");
      break;

    case "setup":
      console.log("Setting up content repository structure...");
      const outputDir = createDirectoryStructure();
      createReadme(outputDir);

      // Create package.json for the export script
      const packageJson = {
        type: "module",
        scripts: {
          template: "node exportContent.js template",
          validate: "node exportContent.js validate",
          setup: "node exportContent.js setup",
        },
      };

      fs.writeFileSync(
        path.join(__dirname, "package.json"),
        JSON.stringify(packageJson, null, 2)
      );

      console.log("✅ Content repository setup complete");
      console.log("\nNext steps:");
      console.log("1. The content is now managed in the GitHub repository");
      console.log(
        "2. Use 'node exportContent.js template <type>' to create new content templates"
      );
      console.log(
        "3. Edit content directly in the GitHub repository or via git"
      );
      console.log("4. The website will automatically load updated content");
      break;

    default:
      console.log("Content Management Utility");
      console.log("\nAvailable commands:");
      console.log("  setup     - Create directory structure and README");
      console.log("  template  - Generate content templates");
      console.log("  validate  - Validate content structure (coming soon)");
      console.log("\nExamples:");
      console.log("  node exportContent.js setup");
      console.log("  node exportContent.js template projectItem");
      console.log("  node exportContent.js template blogPost");
  }
};

// Export functions for use in other scripts
export {
  createContentTemplate,
  validateContentStructure,
  contentTemplates,
  createDirectoryStructure,
  createReadme,
};

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}
